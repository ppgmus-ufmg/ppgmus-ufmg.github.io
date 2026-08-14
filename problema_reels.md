# Problema: frames perdidos durante a gravação do teaser para Reels

> **RESOLVIDO (12/ago/2026)** — via captura determinística frame a frame,
> sem `Emulation.setVirtualTimePolicy` (que travava) e sem `minterpolate`
> (não é mais necessário). Ver seção "Solução" no fim do arquivo.

## Contexto — como a animação da página funciona

A home (`src/index.md`) e as páginas de teaser para Instagram Reels
(`src/reels/teaser1.md`, `src/reels/teaser2.md`) compartilham o mesmo
partial `src/_includes/partials/logo-forum.njk`, que monta uma animação em
3 fases:

1. **Símbolo (p5.js/WebGL)** — `src/assets/logo-forum/sketch-forum.js`
   desenha um canvas WEBGL com "janelas" que abrem em sequência. É
   cronometrado em **número de frames** (constantes `FRAMES_INIT_PAUSE`,
   `FRAMES_OPENING_WINDOW`, `FRAMES_FINAL_PAUSE`), não em tempo real —
   por isso tem `frameRate(60)` travado explicitamente no `setup()` (fix
   aplicado recentemente; sem isso, em ambientes sem vsync real o
   `requestAnimationFrame` pode disparar mais rápido que 60Hz e a
   animação toda roda mais rápido que o projetado).
2. Ao terminar, o sketch chama `window.mostrarTextoForum()` (definida em
   `logo-forum.njk`): o símbolo desliza pra esquerda e o texto "4º
   Fórum..." (preto, fundo branco) aparece via CSS.
3. **1500ms depois** (via `setTimeout`), `iniciarFaseFoto()` dispara
   simultaneamente: a foto de fundo (`.hero__media`) faz fade-in de
   opacidade (`transition: opacity 1.4s`), 4 elementos (`.anim-entrada`:
   eyebrow/data/lead/seta) revelam com stagger (delays 0/0.15/0.3/0.45s,
   cada um com `transition: 0.6s`), e o texto do logo muda de preto pra
   branco (`transition: color 1s`). **Essa é a fase problemática.**

Todos os tempos de CSS são corretos e conferidos por instrumentação direta
(`performance.now()` + hooks nas funções — ver seção "o que já foi
confirmado" abaixo).

## As duas páginas de reels

- **`/reels/teaser1/`**: fica em branco até apertar espaço
  (`window.COMAPE_AGUARDAR_ESPACO`), pensada pra eu (Claude) gravar via
  Puppeteer automatizado.
- **`/reels/teaser2/`**: fica em branco até clicar num botão, que usa
  `getDisplayMedia`+`MediaRecorder` do próprio navegador do usuário pra
  gravar a aba. Teve uma longa saga de bugs (resolução errada, barra de
  endereço do Safari, cursor do mouse, arquivo corrompido por
  `track.applyConstraints()`, borda escura por causa da barra
  "compartilhando esta aba" do Chrome redimensionar a viewport DEPOIS da
  resolução do vídeo já fixada) — hoje está funcionando razoavelmente no
  Chrome (não testável no Safari/Firefox neste ambiente).

## O pipeline que eu uso para gerar vídeo (fora do navegador do usuário)

Como gravar pelo navegador do usuário é frágil (arquivo com metadados de
duração incorretos — Instagram rejeitava por achar o vídeo "menos de 3s"
mesmo tendo 10s+), passei a gerar o vídeo eu mesmo, direto da página, via
Puppeteer + ffmpeg. Scripts (fora do repo, em scratchpad de sessão):

- `record.js` — abre `http://localhost:8082/reels/teaser1/` num Chrome
  headless (`--use-gl=angle --use-angle=swiftshader ... --enable-unsafe-swiftshader`,
  já que não há GPU real disponível), dispara a animação via
  `document.body.classList.remove('aguardando-espaco'); window.loop();`,
  e captura frames em tempo real via CDP `Page.startScreencast` /
  `Page.screencastFrame`, salvando cada PNG + timestamp real
  (`Date.now() - startTime`) num `manifest.json`.
- `build-concat.js` — lê o `manifest.json` e gera um `concat.txt` pro
  ffmpeg, com `duration` de cada frame = diferença de tempo real pro
  próximo frame (`(next.t - cur.t) / 1000`).
- ffmpeg monta o vídeo final via `-f concat -safe 0 -i concat.txt`, com
  `-vf minterpolate=fps=30:mi_mode=mci:...` (interpolação de movimento,
  pra suavizar) + `scale`/`pad` pra 1080x1920 + `-movflags +faststart`.

Frames + manifest ficam em (sessão atual, **não é permanente**):
```
/private/tmp/claude-501/-Users-padovani-repositorios-meus-web-comape/137fe467-867e-4bc1-b2a1-407b5393dea6/scratchpad/reel-record/
  record.js
  build-concat.js
  frames/           <- PNGs + manifest.json + concat.txt da última captura
```

## O problema real (ainda não resolvido)

Durante a fase 3 (foto+texto+cor revelando juntos), a captura de frames
**perde frames** — o `manifest.json` mostra um gap real de várias
centenas de ms sem nenhum frame capturado (era ~700ms antes de duas
correções abaixo, caiu pra ~480-490ms depois delas — melhorou mas não
sumiu). Confirmado empiricamente: `mostrarTextoForum`/`iniciarFaseFoto`/
`transitionend` da foto disparam nos tempos CORRETOS quando medidos
por `performance.now()` dentro do navegador (não é bug de timing da
página) — o problema é especificamente a CAPTURA (`Page.screencastFrame`)
não conseguir entregar frames durante esse pico de carga de composição,
gerando um "corte seco" (estado antes → estado quase pronto) em vez de
transição gradual no vídeo final, mesmo com a duração do frame
corretamente contabilizada no `concat.txt` (ou seja, o TEMPO total bate,
mas falta o CONTEÚDO visual intermediário).

Você (usuário) reportou que entre os índices ~157–178 da última captura
a transição inteira acontece — ou seja, pouquíssimos frames pra cobrir
~1.4s+ de mudança visual simultânea em vários elementos.

## O que já foi tentado

1. **`frameRate(60)`** no `setup()` do sketch — resolveu um bug REAL e
   diferente (a animação do símbolo/abertura rodava rápido demais em
   ambiente sem vsync), confirmado por instrumentação. Não resolve o
   problema de frames perdidos na fase 3.
2. **`noLoop()`** no p5 assim que a state machine chega em `DONE` (parar
   de redesenhar o canvas, que não muda mais) — reduziu um pouco a
   contenção de CPU, mas não eliminou o gap.
3. **Remover `filter: grayscale(1)`** do CSS da foto de fundo — a
   imagem (`hero-ufmg-pb.jpg`) já é grayscale de verdade no arquivo
   (confirmado via `magick ... -format "%[colorspace]"` → `Gray`), então
   o filtro era 100% redundante e caro de recompor a cada frame durante
   o fade. Reduziu o gap de ~700ms pra ~480ms. Ajudou, não resolveu.
4. **`Emulation.setVirtualTimePolicy`** (captura determinística,
   avançando o relógio da página em incrementos fixos e tirando
   screenshot a cada avanço, em vez de depender de tempo real) — essa
   é a solução "certa" em teoria (imune a lentidão de renderização),
   mas `Page.captureScreenshot` trava/estoura timeout de forma
   consistente bem nessa mesma janela crítica (mesmo com retries e
   pequenos avanços extras de tempo virtual pra "cutucar" o renderer).
   Tentado várias vezes, inclusive depois das correções 1-3 acima —
   continua travando. **Abandonado por enquanto.**
5. **`minterpolate` (interpolação de movimento via ffmpeg)** — com o gap
   grande (~700ms) não ajudava nada (motion compensation não dá conta de
   um salto tão grande). Com o gap menor (~480ms, após os fixes 2 e 3),
   ajuda parcialmente: a maior parte da transição fica suave, mas ainda
   sobra um "pulo" perceptível logo no início da transição (salta pra
   ~60% do caminho de uma vez, depois sim degrade suavemente até o
   final). Testado e confirmado via amostragem de pixel
   (`magick ... -format "%[pixel:p{x,y}]"`) em sequência de frames
   extraídos a 20fps.

## Hipóteses ainda não testadas / próximos passos possíveis

- Simplificar/reduzir o número de coisas que animam ao mesmo tempo na
  fase 3 (ex.: não fazer todos os 4 `.anim-entrada` + a foto + a cor do
  texto dispararem no mesmíssimo instante) — pode reduzir o pico de
  carga de composição o suficiente pra captura em tempo real não perder
  frames. Mudaria a experiência visual na web também (não só no vídeo).
- Investigar se dá pra fazer o `Emulation.setVirtualTimePolicy` parar de
  travar — talvez usando `Page.captureScreenshot` com
  `captureBeyondViewport:false` explicitamente, ou trocando pra
  `HeadlessExperimental.beginFrame` (API mais antiga, específica pra
  captura determinística frame-a-frame, pode não existir mais no Chrome
  atual — não verificado).
- Gravar em resolução/DPR menor durante a captura (menos pixels pra
  compositar por frame) e fazer upscale depois — pode reduzir a carga o
  bastante pra não perder frames, ao custo de nitidez (mitigável com o
  upscale sendo moderado, ex. 2x).
- Aumentar ainda mais a suavização do `minterpolate` (mais frames
  interpolados) especificamente nesse trecho, ou aplicar um crossfade
  manual só nesse segmento em vez de depender de motion interpolation
  genérica.
- Considerar se vale a pena aceitar o pequeno "pulo" residual como
  suficientemente bom (o vídeo atual em `~/Desktop/teaser-comape-10s.mp4`
  já reflete o estado com os fixes 1-3 + minterpolate).

## Arquivos relevantes no repositório

- `src/assets/logo-forum/sketch-forum.js` — state machine da animação do
  símbolo (p5.js/WebGL).
- `src/_includes/partials/logo-forum.njk` — `mostrarTextoForum()`,
  `iniciarFaseFoto()`, `scaleLogoForum()`.
- `src/css/style.css` — `.hero--media`, `.anim-entrada`, `.logo-forum
  #logo-text` (cor preto→branco), `.hero__media img` (grayscale
  removido).
- `src/css/reel.css` — estilos específicos das páginas de reels
  (`.pagina-reel`, `.tela-fone`, `.botoes-teaser2` etc.).
- `src/reels/teaser1.md`, `src/reels/teaser2.md`.

## Solução (12/ago/2026): captura determinística sem tempo real

A causa era estrutural: `Page.startScreencast` grava em tempo real, então
qualquer pico de composição derruba frames — não há ajuste que resolva.
A saída foi eliminar o tempo real da captura, aproveitando que a página é
"pausável" por construção:

1. **Fase símbolo (p5)**: a página já carrega com `noLoop()`
   (`COMAPE_AGUARDAR_ESPACO`). Em vez de chamar `loop()`, o script chama
   `redraw()` manualmente — cada `redraw()` avança a state machine
   exatamente 1 frame (2 redraws por screenshot = 30fps de saída).
2. **Fases 2/3 (CSS)**: toda transição CSS é um objeto da Web Animations
   API. `mostrarTextoForum` é substituída por uma versão sem o
   `setTimeout`; assim que cada transição nasce ela é pausada
   (`anim.pause()`) e o tempo dela passa a ser controlado por um relógio
   virtual (`anim.currentTime = t`), avançado 33,3ms por screenshot.
   `iniciarFaseFoto()` é chamada manualmente quando o relógio virtual
   cruza 1500ms. `document.getAnimations()` força flush de estilo, então
   as transições recém-criadas por `classList.add` são congeladas em t=0
   no mesmo tick, sem vazamento de tempo real.
3. Cada screenshot (`page.screenshot`) é tirado com a página totalmente
   estática — sem prazo, sem contenção, **impossível perder frames**.
   Diferente do `setVirtualTimePolicy`, os relógios reais do renderer
   continuam rodando, então `captureScreenshot` não trava.

Resultado verificado por amostragem de pixel no fade da foto:
255→243→219→198→183→173→167→164→162 — curva de easing perfeitamente
gradual, sem salto. O ffmpeg monta direto com `-framerate 30` (cadência
constante, sem `concat` de durações variáveis nem `minterpolate`), com
`tpad=stop_mode=clone` segurando o frame final até fechar 10s.

Script permanente: `scripts/gravar-reel.js` (no repo; `npm run reel`,
aceita `--dur`, `--fps`, `--out`, `--url` — ver `--help`). Requer o
servidor de dev rodando e ffmpeg no PATH; puppeteer é devDependency.
Vídeo de referência: `~/Desktop/teaser-comape-deterministico.mp4` (10s,
1080x1920, 30fps, H.264 + faststart).
