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
  const cnv = createCanvas(800, 160, WEBGL);
  cnv.parent("wrapper");
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
