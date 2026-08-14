#!/usr/bin/env node
// Gera o vídeo do teaser para Instagram Reels (1080x1920) a partir da página
// /reels/teaser1/, com captura determinística frame a frame — ver a seção
// "Solução" em problema_reels.md para o racional completo.
//
// Uso:
//   npm run reel                        → 10s, salva em ~/Desktop/teaser-comape.mp4
//   npm run reel -- --dur 15            → 15s
//   npm run reel -- --dur 15 --out meu.mp4
//   node scripts/gravar-reel.js --help
//
// Requisitos:
//   - servidor de dev rodando (npx eleventy --serve --port=8082)
//   - ffmpeg no PATH
//
// Como funciona (resumo): a página carrega pausada (COMAPE_AGUARDAR_ESPACO);
// o sketch p5 é avançado manualmente via redraw() (cada redraw = 1 frame), e
// as transições CSS das fases 2/3 são pausadas e controladas por um relógio
// virtual via Web Animations API (anim.currentTime). Cada screenshot é tirado
// com a página estática — nenhum frame pode ser perdido por carga de
// composição. Depois que tudo se acomoda, o texto "Programação em breve!"
// continua pulsando (animação CSS infinita, pulsarBreve) — capturamos um
// ciclo completo dela e repetimos esses frames (via cópia de arquivo) até
// completar a duração pedida, em vez de congelar o último frame.

const puppeteer = require("puppeteer");
const { execFileSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");

// ── Argumentos ──────────────────────────────────────────────────────────────

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    dur: 10,
    fps: 30,
    out: path.join(os.homedir(), "Desktop", "teaser-comape.mp4"),
    url: "http://localhost:8082/reels/teaser1/",
  };
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--dur": opts.dur = parseFloat(args[++i]); break;
      case "--fps": opts.fps = parseInt(args[++i], 10); break;
      case "--out": opts.out = path.resolve(args[++i]); break;
      case "--url": opts.url = args[++i]; break;
      case "--help":
      case "-h":
        console.log(`Uso: node scripts/gravar-reel.js [opções]
  --dur <segundos>   duração total do vídeo (padrão: 10; mínimo: o que a animação durar, ~5.5s)
  --fps <n>          frames por segundo (padrão: 30)
  --out <arquivo>    arquivo de saída (padrão: ~/Desktop/teaser-comape.mp4)
  --url <url>        página a gravar (padrão: http://localhost:8082/reels/teaser1/)`);
        process.exit(0);
      default:
        console.error(`Opção desconhecida: ${args[i]} (use --help)`);
        process.exit(1);
    }
  }
  if (!Number.isFinite(opts.dur) || opts.dur <= 0) {
    console.error("--dur precisa ser um número de segundos > 0");
    process.exit(1);
  }
  return opts;
}

// ── Constantes da animação (têm que espelhar logo-forum.njk / style.css) ────

const FASE3_DELAY_MS = 1500; // setTimeout(iniciarFaseFoto, 1500) da página
const FASE3_TAIL_MS = 2000;  // transições da fase 3 (<=1.4s) + folga
// pulsarBreve (reel.css): "Programação em breve!" pulsa infinitamente com
// período de 2s, e os keyframes 0%/100% são idênticos (opacity 0.8, scale
// 1) — então qualquer janela de exatamente 2000ms dessa animação, capturada
// depois que ela já estiver rodando, é um loop perfeito.
const PULSE_LOOP_MS = 2000;

async function main() {
  const opts = parseArgs();
  const STEP_MS = 1000 / opts.fps;
  const P5_REDRAWS_PER_FRAME = Math.max(1, Math.round(60 / opts.fps));

  // Pré-checagens: servidor de dev e ffmpeg.
  try {
    const res = await fetch(opts.url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  } catch (e) {
    console.error(`Não consegui acessar ${opts.url} (${e.message}).`);
    console.error("O servidor de dev está rodando? → npx eleventy --serve --port=8082");
    process.exit(1);
  }
  try {
    execFileSync("ffmpeg", ["-version"], { stdio: "ignore" });
  } catch {
    console.error("ffmpeg não encontrado no PATH.");
    process.exit(1);
  }

  const framesDir = fs.mkdtempSync(path.join(os.tmpdir(), "reel-frames-"));

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--force-device-scale-factor=2.666667",
      "--hide-scrollbars",
      // Sem GPU real em headless: WebGL via SwiftShader (software).
      "--use-gl=angle",
      "--use-angle=swiftshader",
      "--enable-webgl",
      "--ignore-gpu-blocklist",
      "--enable-unsafe-swiftshader",
    ],
  });

  try {
    const page = await browser.newPage();
    // 405x720 CSS px * 2.666667 = 1080x1920 físicos.
    await page.setViewport({ width: 405, height: 720, deviceScaleFactor: 2.666667 });
    await page.goto(opts.url, { waitUntil: "networkidle0" });

    // Instala o relógio virtual de CSS e substitui mostrarTextoForum por uma
    // versão sem o setTimeout (a fase 3 será disparada manualmente). O
    // relógio precisa nascer ANTES de tirar a página do estado
    // "aguardando-espaco" e ser ticado a cada frame desde o início — nas
    // páginas de reels (reel.css), remover essa classe dispara o próprio
    // fade-in de entrada do símbolo (entradaLogoSimbolo, 3s ali, contra
    // 0.3s no site normal). Se essa animação só entrasse sob controle do
    // relógio depois (ex.: só quando mostrarTextoForum roda), a primeira
    // vez que tick() a encontrasse ela seria "pausada e recomeçada" em
    // t=0 — fazendo o símbolo (e o #logo-text, aninhado no mesmo
    // #wrapper) sumir e reaparecer bem no instante em que o texto do logo
    // é revelado. Animações herdadas de antes deste ponto (se houver)
    // ficam de fora via preExistentes.
    await page.evaluate(() => {
      window.__fase2 = false;
      const preExistentes = new Set(document.getAnimations());
      window.__cssClock = {
        master: 0,
        started: new Map(),
        // getAnimations() força flush de estilo, então transições/animações
        // criadas por classList.add no mesmo tick já aparecem aqui.
        tick(dt) {
          this.master += dt;
          for (const a of document.getAnimations()) {
            if (preExistentes.has(a)) continue;
            if (!this.started.has(a)) {
              a.pause();
              this.started.set(a, this.master);
            }
            a.currentTime = this.master - this.started.get(a);
          }
        },
      };
      window.mostrarTextoForum = function () {
        const outer = document.getElementById("logo-forum-outer");
        const texto = document.getElementById("logo-text");
        if (outer) outer.classList.add("mover-esquerda");
        if (texto) texto.classList.add("mostrar");
        window.__fase2 = true;
      };
      document.body.classList.remove("aguardando-espaco");
      window.__cssClock.tick(0); // captura o entradaLogoSimbolo recém-nascido em t=0
      // NÃO chama loop(): o avanço do sketch é manual, via redraw().
    });

    let frameIndex = 0;
    const shoot = async () => {
      const file = path.join(framesDir, `f-${String(frameIndex).padStart(5, "0")}.png`);
      await page.screenshot({ path: file, captureBeyondViewport: false });
      frameIndex++;
      process.stdout.write(`\rframes: ${frameIndex}`);
    };

    // Fase símbolo: avança o p5 em passos de N redraws (60fps → fps do
    // vídeo) e o relógio virtual de CSS em paralelo (STEP_MS por frame),
    // pra manter o entradaLogoSimbolo sincronizado com a mesma cadência.
    let fase2 = false;
    let guard = 0;
    while (!fase2 && guard < 600) {
      fase2 = await page.evaluate((n, dt) => {
        for (let i = 0; i < n && !window.__fase2; i++) window.redraw();
        window.__cssClock.tick(dt);
        return window.__fase2;
      }, P5_REDRAWS_PER_FRAME, STEP_MS);
      await shoot();
      guard++;
    }
    if (!fase2) throw new Error("Fase 2 nunca disparou — algo mudou no sketch?");

    // Fases 2 e 3: só o relógio virtual de CSS (o p5 já está em DONE/noLoop).
    const totalCssMs = FASE3_DELAY_MS + FASE3_TAIL_MS;
    let fase3 = false;
    for (let t = STEP_MS; t <= totalCssMs + STEP_MS / 2; t += STEP_MS) {
      await page.evaluate((dt, delay, jaFase3) => {
        window.__cssClock.tick(dt);
        if (!jaFase3 && window.__cssClock.master >= delay) {
          iniciarFaseFoto();
          window.__cssClock.tick(0);
          window.__fase3 = true;
        }
      }, STEP_MS, FASE3_DELAY_MS, fase3);
      fase3 = fase3 || (await page.evaluate(() => !!window.__fase3));
      await shoot();
    }

    // Tudo já se acomodou (foto, texto, cor) — só falta capturar um ciclo
    // completo da pulsação infinita do "Programação em breve!" pra poder
    // repeti-lo depois em vez de congelar o quadro final.
    const loopStartFrame = frameIndex;
    for (let t = STEP_MS; t <= PULSE_LOOP_MS + STEP_MS / 2; t += STEP_MS) {
      await page.evaluate((dt) => window.__cssClock.tick(dt), STEP_MS);
      await shoot();
    }
    process.stdout.write("\n");

    const loopFrameCount = frameIndex - loopStartFrame;
    const desiredTotalFrames = Math.round(opts.dur * opts.fps);
    const animSec = frameIndex / opts.fps;

    if (desiredTotalFrames <= frameIndex) {
      console.log(`Animação + 1 ciclo de pulsação: ${animSec.toFixed(2)}s — já cobre --dur ${opts.dur}s, sem repetição necessária.`);
    } else {
      const extra = desiredTotalFrames - frameIndex;
      console.log(`Animação + 1 ciclo de pulsação: ${animSec.toFixed(2)}s; repetindo o ciclo de pulsação ` +
        `(${loopFrameCount} frames) por mais ${extra} frames pra completar ${opts.dur}s mantendo a pulsação.`);
      for (let k = 0; k < extra; k++) {
        const srcIdx = loopStartFrame + (k % loopFrameCount);
        const src = path.join(framesDir, `f-${String(srcIdx).padStart(5, "0")}.png`);
        const dest = path.join(framesDir, `f-${String(frameIndex).padStart(5, "0")}.png`);
        fs.copyFileSync(src, dest);
        frameIndex++;
      }
    }

    execFileSync("ffmpeg", [
      "-y",
      "-framerate", String(opts.fps),
      "-i", path.join(framesDir, "f-%05d.png"),
      "-frames:v", String(desiredTotalFrames),
      "-c:v", "libx264",
      "-pix_fmt", "yuv420p",
      "-crf", "18",
      "-movflags", "+faststart",
      opts.out,
    ], { stdio: ["ignore", "ignore", "inherit"] });

    console.log(`✔ Vídeo gerado: ${opts.out}`);
  } finally {
    await browser.close();
    fs.rmSync(framesDir, { recursive: true, force: true });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
