// logo-classes.js — Classes compartilhadas: LogoSymbol e LogoText
// ─────────────────────────────────────────────────────────────────────────────


// =============================================================================
// class LogoSymbol
// =============================================================================
//
// Config options
// ──────────────
//  Transform:
//    x, y, z           – posição no espaço de canvas   (padrão 0)
//    scale             – escala uniforme                (padrão 1)
//    rotX, rotY, rotZ  – rotações em graus              (padrões: -35, -45, 0)
//
//  Geometria:
//    panelW     – largura de um painel em px   (padrão 50)
//    panelH     – altura  de um painel em px   (padrão 200)
//    panelCount – número de painéis, deve ser par (padrão 6)
//
//  Cor:
//    colorMode – "brand" | "grayscale_light" | "grayscale_medium"
//                "grayscale_dark" | "grayscale_custom"  (padrão "brand")
//    brandA    – cor primária   [r,g,b]  (padrão [230,130,50])
//    brandB    – cor secundária [r,g,b]  (padrão [171,72,10])
//    grayA,grayB – par de cinzas [r,g,b] (só com "grayscale_custom")
//
//  Animação:
//    anim           – "none" | "openClose" | "cycle" | "randomSwitch"
//    animSpeed      – multiplicador de velocidade       (padrão 1)
//    openAngle      – ângulo máximo de abertura (graus) (padrão 49)
//    allowedAngles  – ângulos estáticos para anim="none" (padrão [49])
//    switchInterval – frames entre trocas ("randomSwitch") (padrão 120)
//
class LogoSymbol {
  constructor(config = {}) {
    // Transform
    this.x          = config.x          ?? 0;
    this.y          = config.y          ?? 0;
    this.z          = config.z          ?? 0;
    this.scale      = config.scale      ?? 1;
    this.rotX       = config.rotX       ?? -35;
    this.rotY       = config.rotY       ?? -45;
    this.rotZ       = config.rotZ       ?? 0;

    // Geometry
    this.panelW     = config.panelW     ?? 50;
    this.panelH     = config.panelH     ?? 200;
    this.panelCount = config.panelCount ?? 6;

    // Color
    this.colorMode  = config.colorMode  ?? "brand";
    this.brandA     = config.brandA     ?? [230, 130,  50];
    this.brandB     = config.brandB     ?? [171,  72,  10];
    this.grayA      = config.grayA      ?? [190, 190, 190];
    this.grayB      = config.grayB      ?? [120, 120, 120];

    // Animation
    this.anim           = config.anim           ?? "none";
    this.animSpeed      = config.animSpeed      ?? 1;
    this.openAngle      = config.openAngle      ?? 49;
    this.allowedAngles  = config.allowedAngles  ?? [49];
    this.switchInterval = config.switchInterval ?? 120;
    // Força todas as janelas fechadas no estado inicial (ignora sorteio aleatório).
    // Útil quando a animação de abertura é controlada externamente.
    this.startClosed    = config.startClosed    ?? false;

    // Internal state — populated by init()
    this._panelColors  = [];
    this._windowAngles = [];   // Array<[angle0, angle1]> por painel
    this._switchTimer  = 0;
    this._initialized  = false;
  }

  // Chamar uma vez em p5 setup() após createCanvas().
  init() {
    this._buildPanelColors();
    this._initWindowAngles();
    this._initialized = true;
  }

  // Define manualmente o ângulo de uma janela específica.
  // Útil para animações externas (state machine em sketches dedicados).
  setWindowAngle(panelIdx, segIdx, angle) {
    if (this._windowAngles[panelIdx]) {
      this._windowAngles[panelIdx][segIdx] = angle;
    }
  }

  // ── privados ───────────────────────────────────────────────────────────────

  _buildPanelColors() {
    const presets = {
      grayscale_light:  { a: [220, 220, 220], b: [150, 150, 150] },
      grayscale_medium: { a: [190, 190, 190], b: [120, 120, 120] },
      grayscale_dark:   { a: [145, 145, 145], b: [80,   80,  80] }
    };

    let cA, cB;
    if (this.colorMode === "brand") {
      cA = color(...this.brandA);
      cB = color(...this.brandB);
    } else if (this.colorMode === "grayscale_custom") {
      cA = color(...this.grayA);
      cB = color(...this.grayB);
    } else {
      const p = presets[this.colorMode] ?? presets.grayscale_medium;
      cA = color(...p.a);
      cB = color(...p.b);
    }

    this._panelColors = [];
    for (let i = 0; i < this.panelCount; i++) {
      const c = i % 2 === 0 ? cA : cB;
      this._panelColors.push({ main: c, window: c });
    }
  }

  // Retorna [[panelIdx, segIdx], ...] de todas as janelas abre-fecha.
  _getWindowSlots() {
    const slots = [];
    for (let i = 0; i < this.panelCount; i += 2) {
      slots.push([i, 0]);
      slots.push([i, 1]);
    }
    return slots;
  }

  _initWindowAngles() {
    this._windowAngles = Array.from({ length: this.panelCount }, () => [0, 0]);
    if (this.anim !== "none" || this.startClosed) return;

    const slots = this._getWindowSlots();
    for (let i = slots.length - 1; i > 0; i--) {
      const j = floor(random(i + 1));
      [slots[i], slots[j]] = [slots[j], slots[i]];
    }
    const openCount = floor(random(1, min(4, slots.length / 2 + 1)));
    for (let k = 0; k < openCount; k++) {
      const [pi, si] = slots[k];
      this._windowAngles[pi][si] =
        this.allowedAngles[floor(random(this.allowedAngles.length))];
    }
  }

  // ── públicos ───────────────────────────────────────────────────────────────

  // Chamar uma vez por frame antes de draw().
  update() {
    if (!this._initialized) return;

    if (this.anim === "openClose") {
      const angle =
        this.openAngle * (0.5 + 0.5 * sin(frameCount * this.animSpeed * 1.5 - 90));
      for (const [pi, si] of this._getWindowSlots()) {
        this._windowAngles[pi][si] = angle;
      }

    } else if (this.anim === "cycle") {
      const slots         = this._getWindowSlots();
      const framesPerSlot = 60;
      const totalT        = frameCount * this.animSpeed;
      const activeIdx     = floor(totalT / framesPerSlot) % slots.length;
      const localT        = (totalT % framesPerSlot) / framesPerSlot;
      for (let i = 0; i < this.panelCount; i++) this._windowAngles[i] = [0, 0];
      const [pi, si] = slots[activeIdx];
      this._windowAngles[pi][si] = this.openAngle * sin(localT * 180);

    } else if (this.anim === "randomSwitch") {
      this._switchTimer++;
      if (this._switchTimer >= this.switchInterval) {
        this._switchTimer = 0;
        for (let i = 0; i < this.panelCount; i++) this._windowAngles[i] = [0, 0];
        const slots = this._getWindowSlots();
        for (let i = slots.length - 1; i > 0; i--) {
          const j = floor(random(i + 1));
          [slots[i], slots[j]] = [slots[j], slots[i]];
        }
        const openCount = floor(random(1, min(4, slots.length / 2 + 1)));
        for (let k = 0; k < openCount; k++) {
          const [pi, si] = slots[k];
          this._windowAngles[pi][si] =
            this.allowedAngles[floor(random(this.allowedAngles.length))];
        }
      }
    }
  }

  // Renderiza o símbolo. Chamar todo frame em p5 draw().
  draw() {
    if (!this._initialized) return;
    const segH = this.panelH / 3;

    push();
    translate(this.x, this.y, this.z);
    scale(this.scale);
    rotateX(this.rotX);
    rotateZ(this.rotZ);
    rotateY(this.rotY);
    translate(-this.panelW * 1.9, 0, 0);

    for (let i = 0; i < this.panelCount; i++) {
      push();
      translate(this.panelW / 2, 0, 0);
      if (i % 2 === 0) {
        this._drawWindowPanel(i, segH);
      } else {
        this._drawSolidPanel(i);
      }
      pop();
      if (i < this.panelCount - 1) {
        translate(this.panelW, 0, 0);
        rotateY(i % 2 === 0 ? 90 : -90);
      }
    }
    pop();
  }

  _drawSolidPanel(i) {
    noStroke();
    fill(this._panelColors[i].main);
    plane(this.panelW, this.panelH);
  }

  _drawWindowPanel(i, segH) {
    const totalH = segH * 3;
    for (let seg = 0; seg < 3; seg++) {
      const topY = -totalH / 2 + seg * segH;
      noStroke();
      fill(seg === 2 ? this._panelColors[i].main : this._panelColors[i].window);
      if (seg < 2) {
        const angle = this._windowAngles[i]?.[seg] ?? 0;
        push();
        translate(0, topY, 0);
        rotateX(angle);
        translate(0, segH / 2, 0);
        plane(this.panelW, segH);
        pop();
      } else {
        push();
        translate(0, topY + segH / 2, 0);
        plane(this.panelW, segH);
        pop();
      }
    }
  }
}


// =============================================================================
// class LogoText
// =============================================================================
//
// Config options
// ──────────────
//  Conteúdo:
//    content   – string a exibir  ("\n" para quebras de linha)
//
//  Posição:
//    x, y      – deslocamento em px a partir do centro do canvas
//
//  Tipografia:
//    sizePx    – tamanho base da fonte em px   (padrão 54)
//    scale     – multiplicador de escala       (padrão 1)
//    colorRGB  – [r,g,b] cor do texto          (padrão [0,0,0])
//    colorMode – "light" (usa colorRGB) | "dark" (força branco)
//    style     – "normal" | "bold" | "italic"
//    alignH    – "left"   | "center" | "right"
//    alignV    – "top"    | "center" | "bottom"
//
//  Fonte:
//    font.mode         – "local" | "system"
//    font.localPath    – caminho para .ttf/.otf (modo "local")
//    font.systemFamily – CSS font stack         (fallback / modo "system")
//
//  Animação (intro, toca uma vez):
//    anim        – "none" | "fadeIn" | "typewriter" | "slideIn" | "expand" | "letterFly"
//    animSpeed   – multiplicador de velocidade  (padrão 1)
//    slideDir    – "left"|"right"|"up"|"down"   (de onde o texto entra)
//    slideOffset – deslocamento inicial em px   (padrão 80)
//
//  Controle externo:
//    setProgress(t) – define o progresso (0..1) manualmente, ignorando
//                     o timer interno. Útil em state machines externas.
//
class LogoText {
  constructor(config = {}) {
    this.content     = config.content     ?? "PPGMUS";
    this.x           = config.x           ?? 0;
    this.y           = config.y           ?? 0;
    this.sizePx      = config.sizePx      ?? 54;
    this.scale       = config.scale       ?? 1;
    this.colorRGB    = config.colorRGB    ?? [0, 0, 0];
    this.colorMode   = config.colorMode   ?? "light";
    this.style       = config.style       ?? "bold";
    this.alignH      = config.alignH      ?? "center";
    this.alignV      = config.alignV      ?? "center";
    this.font        = config.font        ?? { mode: "system", systemFamily: "Arial, sans-serif" };
    this.anim        = config.anim        ?? "none";
    this.animSpeed   = config.animSpeed   ?? 1;
    this.slideDir    = config.slideDir    ?? "left";
    this.slideOffset = config.slideOffset ?? 80;

    this._loadedFont   = null;
    this._animT        = 0;
    this._done         = false;
    this._externalCtrl = false;  // true quando setProgress() foi chamado
  }

  // Chamar em p5 preload() para carregar fonte local.
  preload() {
    if (this.font.mode === "local" && this.font.localPath) {
      this._loadedFont = loadFont(
        this.font.localPath,
        () => {},
        () => { this._loadedFont = null; }
      );
    }
  }

  // Define o progresso da animação externamente (0 = início, 1 = fim).
  // Ao chamar este método, o avanço automático por update() é desativado.
  setProgress(t) {
    this._externalCtrl = true;
    this._animT = constrain(t, 0, 1);
    this._done  = (this._animT >= 1);
  }

  // Avança a animação intro. Chamar uma vez por frame antes de draw().
  // Sem efeito se setProgress() foi chamado ao menos uma vez.
  update() {
    if (this._done || this.anim === "none" || this._externalCtrl) return;
    this._animT = min(1, this._animT + 0.016 * this.animSpeed);
    if (this._animT >= 1) this._done = true;
  }

  // Renderiza o texto em um p5.Graphics layer.
  draw(layer) {
    const t     = (this.anim === "none") ? 1 : this._animT;
    const eased = _easeOutCubic(t);

    let alpha   = 255;
    let offX    = 0;
    let offY    = 0;
    let content = this.content;

    const resolved = (this.colorMode === "dark") ? [255, 255, 255] : this.colorRGB;
    const cx = layer.width  / 2 + this.x;
    const cy = layer.height / 2 + this.y;

    const alignX = this.alignH === "left"   ? LEFT   : this.alignH === "right"  ? RIGHT  : CENTER;
    const alignY = this.alignV === "top"    ? TOP    : this.alignV === "bottom" ? BOTTOM : CENTER;
    const tStyle = this.style  === "bold"   ? BOLD   : this.style  === "italic" ? ITALIC : NORMAL;

    layer.noStroke();
    layer.textAlign(alignX, alignY);
    layer.textStyle(tStyle);
    layer.textSize(this.sizePx * this.scale);

    if (this._loadedFont) {
      layer.textFont(this._loadedFont);
    } else if (this.font.systemFamily) {
      layer.textFont(this.font.systemFamily);
    }

    if (this.anim === "fadeIn") {
      alpha = 255 * eased;
      layer.fill(resolved[0], resolved[1], resolved[2], alpha);
      layer.text(content, cx + offX, cy + offY);

    } else if (this.anim === "typewriter") {
      content = this.content.slice(0, ceil(this.content.length * eased));
      layer.fill(resolved[0], resolved[1], resolved[2], 255);
      layer.text(content, cx, cy);

    } else if (this.anim === "slideIn") {
      alpha      = 255 * eased;
      const dist = this.slideOffset * (1 - eased);
      if      (this.slideDir === "left")  offX = -dist;
      else if (this.slideDir === "right") offX =  dist;
      else if (this.slideDir === "up")    offY = -dist;
      else if (this.slideDir === "down")  offY =  dist;
      layer.fill(resolved[0], resolved[1], resolved[2], alpha);
      layer.text(content, cx + offX, cy + offY);

    } else if (this.anim === "expand") {
      // Escala horizontal de 0→1 ancorada no ponto de alinhamento (cx, cy).
      // O texto "descomprime" horizontalmente a partir do seu lado esquerdo.
      layer.fill(resolved[0], resolved[1], resolved[2], 255);
      layer.drawingContext.save();
      layer.drawingContext.translate(cx, cy);
      layer.drawingContext.scale(eased, 1);
      layer.drawingContext.translate(-cx, -cy);
      layer.text(content, cx, cy);
      layer.drawingContext.restore();

    } else if (this.anim === "letterFly") {
      // Cada letra parte do ponto da primeira letra (P) e voa até sua posição
      // final. As letras são escalonadas no tempo: a primeira chega primeiro,
      // a última por último.
      const lines      = this.content.split("\n");
      const leading    = this.sizePx * this.scale * 1.25;
      const totalChars = this.content.replace(/\n/g, "").length;

      // Y da primeira linha respeitando alignV
      let firstLineY;
      if      (this.alignV === "top")    firstLineY = cy;
      else if (this.alignV === "bottom") firstLineY = cy - (lines.length - 1) * leading;
      else                               firstLineY = cy - (lines.length - 1) * leading / 2;

      // X de origem = posição do primeiro caractere (a letra P)
      let originX;
      if      (this.alignH === "center") originX = cx - layer.textWidth(lines[0]) / 2;
      else if (this.alignH === "right")  originX = cx - layer.textWidth(lines[0]);
      else                               originX = cx;
      const originY = firstLineY;

      // Fração do tempo total consumida pelos atrasos entre letras
      const STAGGER = 0.55;

      let charIdx = 0;
      for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
        const line  = lines[lineIdx];
        const lineY = firstLineY + lineIdx * leading;

        let lineStartX;
        if      (this.alignH === "center") lineStartX = cx - layer.textWidth(line) / 2;
        else if (this.alignH === "right")  lineStartX = cx - layer.textWidth(line);
        else                               lineStartX = cx;

        let xPos = lineStartX;
        for (let ci = 0; ci < line.length; ci++) {
          const ch      = line[ci];
          const chWidth = layer.textWidth(ch);
          const finalX  = xPos + chWidth / 2;  // centro horizontal do char
          const finalY  = lineY;

          // progresso individual com stagger por índice de caractere
          const delay     = (charIdx / Math.max(totalChars - 1, 1)) * STAGGER;
          const localT    = constrain((t - delay) / (1 - STAGGER), 0, 1);
          const charEased = _easeOutCubic(localT);

          const drawX = lerp(originX, finalX, charEased);
          const drawY = lerp(originY, finalY, charEased);
          const alpha = 255 * min(localT * 5, 1);  // aparece rápido

          layer.fill(resolved[0], resolved[1], resolved[2], alpha);
          layer.textAlign(CENTER, CENTER);
          layer.text(ch, drawX, drawY);

          xPos += chWidth;
          charIdx++;
        }
      }

    } else {
      // "none"
      layer.fill(resolved[0], resolved[1], resolved[2], 255);
      layer.text(content, cx, cy);
    }
  }
}

// Easing compartilhado (função livre, usada pelas classes acima)
function _easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}
