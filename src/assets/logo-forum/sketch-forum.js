// sketch-forum.js — Logo animado do 4º Fórum de Autoavaliação e Planejamento
// Estratégico (adaptado de esquemas_de_cores_modelo_logo/teste_logo_ppgmus/sketch01.js)
// Depende de logo-classes.js
// ─────────────────────────────────────────────────────────────────────────────
//
// Animação:
//  1. Pausa inicial breve (todas as janelas fechadas)
//  2. Sorteia 1–3 janelas; cada uma recebe um offset aleatório e abre
//     de forma independente dentro de FRAMES_OPENING_WINDOW frames
//  3. Pausa com todas abertas
//  4. Avisa a página (mostrarTextoForum) para revelar o texto — a
//     animação do texto em si é inteiramente CSS, este sketch cuida só do símbolo.
// ─────────────────────────────────────────────────────────────────────────────


// =============================================================================
// Configuração — cores alinhadas aos design tokens do site (terracota PPGMUS)
// =============================================================================

const logoSymbol = new LogoSymbol({
  x: -330, y: 0, z: 0,
  scale: 0.5,
  rotX: -35, rotY: -45, rotZ: 0,

  panelW: 50, panelH: 200, panelCount: 6,

  colorMode: "brand",
  brandA: [216, 134, 68],  // --cor-primaria-500
  brandB: [159, 78, 32],  // --cor-primaria-700

  startClosed: true,  // começa com todas as janelas fechadas
  anim: "none",        // ângulos controlados pela state machine
});


// =============================================================================
// Parâmetros da animação
// =============================================================================

const OPEN_ANGLE = 49;  // graus
const FRAMES_INIT_PAUSE = 10;  // pausa antes de começar a abrir
const FRAMES_OPENING_WINDOW = 90;  // intervalo total em que as aberturas ocorrem
const FRAMES_EACH_OPEN = 60;  // duração de cada abertura individual
const FRAMES_FINAL_PAUSE = 20;  // pausa com janelas abertas antes do texto


// =============================================================================
// State machine
// =============================================================================

const STATES = Object.freeze({
  INIT_PAUSE: "INIT_PAUSE",
  OPENING: "OPENING",
  FINAL_PAUSE: "FINAL_PAUSE",
  DONE: "DONE",
});

let state = STATES.INIT_PAUSE;
let stateTimer = 0;
let windowsToOpen = [];


// =============================================================================
// p5.js lifecycle
// =============================================================================

function setup() {
  setAttributes("alpha", true);
  // Sem isso, capturas de tela/aba (getDisplayMedia, usado em
  // /reels/teaser2/) às vezes não pegam o conteúdo de canvas WebGL — o
  // navegador pode ler um buffer já limpo entre frames. Custo de
  // performance desprezível pra um canvas deste tamanho.
  setAttributes("preserveDrawingBuffer", true);
  // O canvas nativo é 800x160, mas a caixa .logo-forum pode ser exibida bem
  // maior que isso (até ~1120px de largura) via CSS transform: scale(). Sem
  // uma densidade de pixel maior, esse esticamento deixa o símbolo
  // ligeiramente pixelado em telas de alta resolução (some ao dar zoom out
  // porque aí a ampliação total cai). 3x cobre o esticamento + retina.
  pixelDensity(3);
  const cnv = createCanvas(800, 160, WEBGL);
  cnv.parent("wrapper");
  // Trava em 60fps: a animação de abertura das janelas é cronometrada em
  // número de frames (FRAMES_INIT_PAUSE etc.), não em tempo real. Sem isso,
  // em telas de taxa de atualização alta (120Hz+) ou em ambientes sem
  // vsync real (ex.: captura headless para os vídeos do /reels/), o
  // requestAnimationFrame pode disparar mais rápido que 60Hz e a animação
  // toda — símbolo e a revelação de texto/foto que ela dispara depois —
  // acaba correndo mais rápido do que o previsto.
  frameRate(60);
  angleMode(DEGREES);
  logoSymbol.init();

  const count = floor(random(1, 4));
  const maxOffset = FRAMES_OPENING_WINDOW - FRAMES_EACH_OPEN;
  let picked;

  if (count === 3) {
    picked = [0, 2, 4].map(panelIdx => ({
      panelIdx,
      segIdx: floor(random(2))
    }));
    if (picked.every(s => s.segIdx === picked[0].segIdx)) {
      picked[floor(random(3))].segIdx ^= 1;
    }
  } else {
    const allSlots = [];
    for (let i = 0; i < 6; i += 2) {
      allSlots.push({ panelIdx: i, segIdx: 0 });
      allSlots.push({ panelIdx: i, segIdx: 1 });
    }
    for (let i = allSlots.length - 1; i > 0; i--) {
      const j = floor(random(i + 1));
      [allSlots[i], allSlots[j]] = [allSlots[j], allSlots[i]];
    }
    picked = allSlots.slice(0, count);
  }

  windowsToOpen = picked.map(slot => ({
    ...slot,
    startFrame: floor(random(0, maxOffset + 1))
  }));

  // Páginas de gravação (reels/teaser1 e teaser2): fica parado até apertar
  // espaço ou clicar em "Gravar" — ver os scripts inline em cada página,
  // que chamam loop() de volta.
  if (window.COMAPE_AGUARDAR_ESPACO || window.COMAPE_AGUARDAR_INICIO) {
    noLoop();
  }
}

function draw() {
  stateTimer++;

  switch (state) {

    case STATES.INIT_PAUSE:
      if (stateTimer >= FRAMES_INIT_PAUSE) _transition(STATES.OPENING);
      break;

    case STATES.OPENING: {
      for (const win of windowsToOpen) {
        const elapsed = stateTimer - win.startFrame;
        if (elapsed <= 0) continue;
        const t = constrain(elapsed / FRAMES_EACH_OPEN, 0, 1);
        const angle = OPEN_ANGLE * _easeInOut(t);
        logoSymbol.setWindowAngle(win.panelIdx, win.segIdx, angle);
      }

      if (stateTimer >= FRAMES_OPENING_WINDOW) {
        for (const win of windowsToOpen) {
          logoSymbol.setWindowAngle(win.panelIdx, win.segIdx, OPEN_ANGLE);
        }
        _transition(STATES.FINAL_PAUSE);
      }
      break;
    }

    case STATES.FINAL_PAUSE:
      if (stateTimer >= FRAMES_FINAL_PAUSE) {
        if (typeof window.mostrarTextoForum === "function") window.mostrarTextoForum();
        _transition(STATES.DONE);
        // O canvas não muda mais depois disso — para de redesenhar a cada
        // frame. Sem isso, o WebGL seguia consumindo CPU/composição à toa
        // bem no momento em que várias transições CSS disparam juntas
        // (texto, foto, cor), e isso podia atrapalhar a entrega de frames
        // de capturas de tela/aba (getDisplayMedia e a gravação automática
        // dos vídeos do /reels/), gerando saltos na transição em vez de
        // um fade suave.
        noLoop();
      }
      break;

    case STATES.DONE:
      break;
  }

  clear();
  ortho();
  noLights();
  logoSymbol.draw();
}


// =============================================================================
// Auxiliares
// =============================================================================

function _transition(nextState) {
  state = nextState;
  stateTimer = 0;
}

function _easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
