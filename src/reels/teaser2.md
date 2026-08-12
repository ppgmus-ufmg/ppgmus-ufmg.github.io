---
layout: layouts/reel.njk
templateEngineOverride: njk
title: "COMAPE — teaser 2"
permalink: /reels/teaser2/
eleventyExcludeFromCollections: true
---

<script>
  // Fica em branco até clicar em "Gravar" — ver script no fim da página.
  // Precisa rodar antes dos scripts do p5 (incluídos abaixo, em
  // partials/logo-forum.njk), que checam essa flag em setup() pra decidir
  // se já começam a desenhar ou esperam.
  window.COMAPE_AGUARDAR_INICIO = true;
  document.body.classList.add("aguardando-inicio");
</script>

<div class="botoes-teaser2">
  <button id="botao-janela" type="button" class="botao-gravar botao-gravar--secundario">Abrir em janela 9:16</button>
  <button id="botao-gravar" type="button" class="botao-gravar">Gravar e iniciar</button>
</div>

<div class="tela-fone tela-fone--fluida">
  <section class="hero hero--media tela-fone__hero">
    <div class="hero__media">
      <img src="/assets/img/hero-ufmg-pb.jpg" alt="">
    </div>
    <div class="tela-fone__conteudo">
      {% include "partials/logo-forum.njk" %}

      <div class="subtitulo-forum anim-entrada anim-entrada--eyebrow">
        <span class="subtitulo-forum__ppgmus">PPGMUS</span>
        <span class="subtitulo-forum__barra">|</span>
        <img class="subtitulo-forum__ufmg" src="/assets/logos/logo-ufmg-branco.svg" alt="UFMG">
      </div>

      <p class="data-forum anim-entrada anim-entrada--data">26 a 28 de agosto de 2026</p>

      <p class="hero__lead anim-entrada anim-entrada--lead">
        Três dias de atividades abertas à comunidade do PPGMUS (docentes,
        discentes, egressos e TAEs), dedicados à <strong>construção coletiva</strong> do Programa, à
        <strong>autoavaliação</strong>, ao <strong>planejamento estratégico</strong> e à <strong>recepção de novos/as discentes</strong> do Programa.
      </p>

      <div class="brevemente-rotacao">
        <p class="brevemente anim-entrada anim-entrada--seta">Programação em breve!</p>
      </div>
    </div>
  </section>
</div>

<script>
  // "Abrir em janela 9:16" — não dá pra redimensionar a janela principal do
  // navegador via JS (bloqueado por segurança), mas window.open() aceita
  // width/height pra uma janela NOVA. Abre esta mesma página numa janela já
  // no formato certo — é essa janela que deve ser gravada.
  document.getElementById("botao-janela").addEventListener("click", () => {
    const largura = 480;
    const altura = Math.round((largura * 16) / 9);
    const left = Math.round((screen.width - largura) / 2);
    const top = Math.round((screen.height - altura) / 2);
    window.open(
      location.href,
      "_blank",
      `width=${largura},height=${altura},left=${left},top=${top},resizable=yes,toolbar=no,menubar=no,location=no,status=no`
    );
  });
</script>

<script>
  // Grava a própria aba com getDisplayMedia + MediaRecorder — captura os
  // pixels e o framerate reais do navegador, sem OBS ou qualquer app externo.
  // Se abriu pelo botão "Abrir em janela 9:16", clique em "Gravar e iniciar"
  // DENTRO da janela nova (ela já está no formato certo); a .tela-fone
  // preenche 100% da viewport (ver .tela-fone--fluida em reel.css), então o
  // vídeo final sai exatamente do tamanho da janela gravada.
  (function () {
    const DURACAO_MS = 10000; // duração da gravação — ajuste aqui
    const botao = document.getElementById("botao-gravar");
    let recorder = null;

    // Aperta espaço durante a gravação para encerrar antes do tempo — o que
    // já foi capturado até ali é baixado normalmente (não descarta nada).
    document.addEventListener("keydown", (e) => {
      if (e.code !== "Space" && e.key !== " ") return;
      if (!recorder || recorder.state !== "recording") return;
      e.preventDefault();
      recorder.stop();
    });

    botao.addEventListener("click", async () => {
      botao.disabled = true;
      botao.textContent = "Escolha esta janela (não a aba/tela) na caixa…";

      // Largura/altura reais em pixels de tela (CSS px × devicePixelRatio).
      // getDisplayMedia só aceita "ideal" aqui (não "exact" — a API rejeita
      // a chamada inteira se usar "exact" em width/height), mas na prática o
      // Chrome respeita esse valor ao capturar uma aba (diferente de captura
      // de tela, a aba pode ser escalada para qualquer tamanho pedido).
      const dpr = window.devicePixelRatio || 1;
      const larguraCaptura = Math.round(window.innerWidth * dpr);
      const alturaCaptura = Math.round(window.innerHeight * dpr);

      let stream;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia({
          video: {
            // Pede captura de JANELA (não aba, não tela toda) — dá pra
            // escolher "esta janela" na caixa do navegador. É esse modo que
            // deu o resultado bom (qualidade + cursor escondido) antes.
            displaySurface: "window",
            frameRate: { ideal: 60 },
            width: { ideal: larguraCaptura },
            height: { ideal: alturaCaptura },
            // Tira o cursor do mouse da gravação — não dá pra fazer isso via
            // CSS porque o cursor é do sistema, não desenhado pela página.
            cursor: "never",
          },
          audio: false,
        });
      } catch (err) {
        botao.disabled = false;
        botao.textContent = "Gravar e iniciar";
        alert("Não foi possível iniciar a captura: " + err.message);
        return;
      }

      const candidatosMime = [
        "video/mp4;codecs=avc1",
        "video/webm;codecs=vp9",
        "video/webm;codecs=vp8",
        "video/webm",
      ];
      const mimeType = candidatosMime.find((m) => MediaRecorder.isTypeSupported(m)) || "";
      recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      const pedacos = [];
      recorder.ondataavailable = (e) => { if (e.data.size > 0) pedacos.push(e.data); };

      recorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(pedacos, { type: mimeType || "video/webm" });
        // H.264/AAC em contêiner mp4 abre igual num .mov (QuickTime não
        // distingue o conteúdo, só a extensão) — nomeia como .mov, que foi
        // o formato que funcionou bem para subir no Instagram.
        const extensao = (mimeType || "").includes("mp4") ? "mov" : "webm";
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "teaser-comape." + extensao;
        document.body.appendChild(a);
        a.click();
        a.remove();
      };

      document.querySelector(".botoes-teaser2").style.display = "none";
      recorder.start();

      // Dispara a animação no exato instante em que a gravação já está rodando.
      document.body.classList.remove("aguardando-inicio");
      if (typeof window.loop === "function") window.loop();

      setTimeout(() => {
        if (recorder.state !== "inactive") recorder.stop();
      }, DURACAO_MS);

      // Se a pessoa parar o compartilhamento pelo controle nativo do navegador.
      stream.getVideoTracks()[0].addEventListener("ended", () => {
        if (recorder.state !== "inactive") recorder.stop();
      });
    });
  })();
</script>
