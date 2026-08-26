// sankey.js — diagrama Sankey feito à mão (sem d3-sankey) comparando pesos
// antigos e novos da Ficha de Avaliação CAPES.
//
// Por que não usar d3-sankey: a biblioteca sempre desenha a altura de um nó
// como a SOMA dos links que chegam nele — ou seja, força "conservação de
// fluxo". Mas aqui os dois lados medem coisas diferentes: a soma herdada
// dos itens antigos e o peso que a ficha nova DECLAROU para o item (que
// pode ser diferente por decisão da CAPES — um "enxugamento" ou expansão
// deliberado, que é justamente o achado pedagógico do slide). Por isso
// cada nó é desenhado com altura proporcional ao seu PRÓPRIO peso
// (old.peso à esquerda, new.peso à direita), e os links entre eles são
// fitas AFUNILADAS (largura na ponta = valor herdado daquele link em
// relação ao total do nó de origem; largura na chegada = fatia
// proporcional do nó de destino) — a fita mais estreita ou mais larga na
// chegada É o enxugamento/expansão, visível directamente no desenho, não
// só no rótulo.
//
// Nó "fantasma" (peso: null): usado quando um item antigo não vira um
// item novo de verdade dentro deste quesito — ele migra inteiro para
// outro quesito/item (ex.: 2.5 → sub-indicador 1.1.5 dentro do Quesito 1).
// Em vez de desenhar um retângulo com altura arbitrária pra esse "nó" que
// não existe de fato na ficha nova, a fita afunila até um PONTO (altura
// zero) e o texto vira uma nota entre parênteses (`nota` no dado), sem
// retângulo — é o item "sumindo" do quesito, não um item novo.
//
// Altura do diagrama (viewBox) é calculada a partir do conteúdo (linhas de
// texto de cada rótulo, incluindo a descrição — ver blocoAltura()), não é
// fixa. O <svg> não usa mais preserveAspectRatio pra caber num container
// de altura fixa: ele tem `width:100%; height:auto` (CSS), então cresce
// na vertical até sua altura natural. `.sankey-container` tem um
// max-height/overflow-y:auto (CSS) como teto — a maioria dos diagramas
// cabe inteira; quando um item tem descrição muito longa (ex.: 1.3 do
// Quesito 1) e o diagrama passa do teto, rola dentro do próprio container
// em vez de cortar conteúdo (o slide inteiro não tem scroll — .reveal usa
// overflow:hidden sobre um canvas de design fixo 1280×720 — cortaria de
// vez, sem chance de ver o resto).

const COR_ANTIGA = "#b7b7b7";
const COR_NOVA = "#df7f19";
const COR_LINK = "#7bafdd";

const FONTE_TITULO_PX = 11.5;
const ALTURA_TITULO = 14;
const MAX_CHARS_TITULO = 40;

const FONTE_TAG_PX = 8.5;
const ALTURA_TAG = 11;

const FONTE_DESC_PX = 8;
const ALTURA_DESC = 9.5;
const MAX_CHARS_DESC = 58;

const GAP_TITULO_DESC = 3;
const ALTURA_BARRAS = 75; // "orçamento" vertical pras barras, independente da contagem de nós
const BUFFER_PADDING = 8; // respiro extra além do bloco de texto mais alto

function renderSankey(container, slideData) {
  desenharSankey(container, slideData);
}

// Paleta de cores nomeadas aceitas em <mark data-color="...">, em sincronia
// com --cor-marca-* em tema-comape.css (mesmos nomes, mesma cor — troca lá
// troca aqui). Cor inválida/ausente cai em "laranja" (era o único
// comportamento antes de data-color existir, mantido como default).
const CORES_MARCA_VALIDAS = ["vermelho", "laranja", "amarelo", "verde", "azul", "roxo", "rosa", "marrom", "indigo", "ciano", "lima", "grafite"];
const COR_MARCA_PADRAO = "laranja";

// Marcação leve aceita em `titulo`/`tituloUnificado`/`descricao` dos nós
// (em dados.js): <b> ou <strong> (negrito) e <mark data-color="NOME">
// (negrito + cor nomeada — ver CORES_MARCA_VALIDAS acima; data-color é
// opcional). Não são tags HTML de verdade — o diagrama é desenhado em
// <text>/<tspan> puro do SVG, que não interpreta markup — então esse
// parser troca as tags por uma marca {negrito, cor} POR PALAVRA antes da
// quebra de linha. quebrarLinhas() já conta só o texto visível (sem as
// tags) pro limite de caracteres por linha continuar correto independente
// de quanto markup tiver. Ex.: "peso fixado em <b>60%</b>" ou
// "<mark data-color=\"verde\">expansão</mark> de 10 pontos" — o valor do
// atributo aceita aspas duplas, simples, ou nenhuma (data-color=verde),
// igual ao parser HTML de verdade do navegador.
function analisarRico(texto) {
  const partes = [];
  const re = /<(b|strong|mark)((?:\s+[\w-]+(?:=(?:"[^"]*"|'[^']*'|[^\s>]+))?)*)\s*>([\s\S]*?)<\/\1>/gi;
  let ultimo = 0;
  let m;
  while ((m = re.exec(texto))) {
    if (m.index > ultimo) partes.push({ texto: texto.slice(ultimo, m.index), tag: null });
    const ehMark = m[1].toLowerCase() === "mark";
    const corAttr = /data-color=(?:"([a-z]+)"|'([a-z]+)'|([a-z]+))/i.exec(m[2] || "");
    const cor = corAttr ? (corAttr[1] || corAttr[2] || corAttr[3]).toLowerCase() : COR_MARCA_PADRAO;
    partes.push({
      texto: m[3],
      tag: ehMark ? "mark" : "b",
      cor: ehMark && CORES_MARCA_VALIDAS.includes(cor) ? cor : COR_MARCA_PADRAO,
    });
    ultimo = re.lastIndex;
  }
  if (ultimo < texto.length) partes.push({ texto: texto.slice(ultimo), tag: null });

  // "colado" = sem espaço antes desta palavra em relação à anterior — o
  // caso comum é pontuação logo depois de uma tag fechando ("<mark>x</mark>."),
  // onde não há espaço nenhum no texto de origem na junção. Checar isso
  // exige olhar a junção entre partes (fim da anterior / início desta), não
  // só o início do texto desta parte — senão "de <mark>equidade</mark>."
  // ganha um espaço espúrio antes do ponto final.
  const tokens = [];
  partes.forEach((parte, idxParte) => {
    const palavras = parte.texto.match(/\S+/g) || [];
    const anterior = partes[idxParte - 1];
    const temEspacoNaJuncao =
      idxParte === 0 || /\s$/.test(anterior.texto) || /^\s/.test(parte.texto);
    palavras.forEach((palavra, i) => {
      tokens.push({
        texto: palavra,
        negrito: parte.tag === "b",
        destaque: parte.tag === "mark",
        cor: parte.cor,
        colado: i === 0 && !temEspacoNaJuncao,
      });
    });
  });
  return tokens;
}

// Quebra de linha (greedy, por largura em nº de caracteres) operando sobre
// os tokens já analisados por analisarRico — cada "linha" retornada é um
// array de tokens, não mais uma string, pra preservar negrito/destaque
// através da quebra.
function quebrarLinhas(texto, maxChars) {
  const tokens = analisarRico(texto);
  const linhas = [];
  let atual = [];
  let atualLen = 0;
  tokens.forEach((tok) => {
    const gap = atualLen === 0 || tok.colado ? 0 : 1;
    const novoLen = atualLen + gap + tok.texto.length;
    if (novoLen > maxChars && atual.length) {
      linhas.push(atual);
      atual = [tok];
      atualLen = tok.texto.length;
    } else {
      atual.push(tok);
      atualLen = novoLen;
    }
  });
  if (atual.length) linhas.push(atual);
  return linhas;
}

// Preenche uma seleção <text> já posicionada (x/y/text-anchor) com um
// <tspan> por token — plain, ou com classe de negrito/destaque — mais um
// prefixo/sufixo (aspas da descrição) sem estilo próprio, colados sem
// espaço à primeira/última palavra.
function renderizarTokens(sel, tokens, prefixo, sufixo) {
  if (prefixo) sel.append("tspan").text(prefixo);
  tokens.forEach((tok, i) => {
    const espaco = i === 0 || tok.colado ? "" : " ";
    const classes = [];
    if (tok.negrito) classes.push("sankey-tspan-negrito");
    if (tok.destaque) classes.push(`sankey-tspan-cor-${tok.cor}`);
    const tspan = sel.append("tspan").text(espaco + tok.texto);
    if (classes.length) tspan.attr("class", classes.join(" "));
  });
  if (sufixo) sel.append("tspan").text(sufixo);
}

// tituloUnificado (opcional, no dado de origem): quando o item de um lado
// e o do outro são substancialmente o mesmo — a redação mudou entre as
// fichas mas o conteúdo é o mesmo —, os dois nós do par usam o mesmo NOME,
// prefixado pelo código de item que CADA nó já tinha (1.4/1.2, 2.3/2.2...
// — a numeração continua vindo do id, só o texto descritivo é compartilhado
// entre os dois lados). Sinaliza visualmente "é o mesmo item" sem esconder
// a numeração oficial de cada ficha.
function prepararNo(n) {
  const semAno = n.id.replace(/^\d{2}-\d{2} · /, "");
  const codigo = (semAno.match(/^[\d.]+/) || [""])[0];
  const titulo = n.tituloUnificado ? `${codigo} ${n.tituloUnificado}`.trim() : semAno;
  return {
    ...n,
    titulo,
    linhasTitulo: quebrarLinhas(titulo, MAX_CHARS_TITULO),
    linhasDesc: n.descricao ? quebrarLinhas(n.descricao, MAX_CHARS_DESC) : [],
  };
}

// Altura (em unidades do viewBox) do bloco de texto de um nó: título
// (1+ linhas) + peso (1 linha) + tag (0-1 linha) + descrição (0+ linhas), ou só 1 linha pra
// nota de migração num nó fantasma (peso null).
function blocoAltura(n) {
  if (n.peso == null) return ALTURA_TITULO;
  const temDesc = n.linhasDesc.length > 0;
  const temTag = Boolean(n.tag);
  return (
    n.linhasTitulo.length * ALTURA_TITULO +
    ALTURA_TITULO +
    (temTag ? ALTURA_TAG : 0) +
    (temDesc ? GAP_TITULO_DESC + n.linhasDesc.length * ALTURA_DESC : 0)
  );
}

function desenharSankey(container, slideData) {
  const W = 1090;
  const nodeWidth = 12;
  const margemLabel = 350;
  const xOldRight = margemLabel;
  const xOldLeft = margemLabel - nodeWidth;
  const xNewLeft = W - margemLabel;
  const xNewRight = W - margemLabel + nodeWidth;

  const nodesOld = slideData.nodes_old.map(prepararNo);
  const nodesNew = slideData.nodes_new.map(prepararNo);
  const idsAntigos = new Set(nodesOld.map((n) => n.id));

  const nodePadding =
    Math.max(...[...nodesOld, ...nodesNew].map(blocoAltura)) + BUFFER_PADDING;
  const maxContagem = Math.max(nodesOld.length, nodesNew.length);
  const plotHeight = ALTURA_BARRAS + nodePadding * Math.max(0, maxContagem - 1);
  // Margem topo/base = metade do bloco de texto mais alto: sem isso, o
  // texto do primeiro/último nó (centralizado na barra) estoura pra fora
  // da área do diagrama quando a barra fica perto do topo/base.
  const plotTop = nodePadding / 2;
  const H = plotTop * 2 + plotHeight;

  function empilhar(nodes) {
    const total = nodes.reduce((acc, n) => acc + (n.peso || 0), 0) || 1;
    const alturaUtil = plotHeight - nodePadding * Math.max(0, nodes.length - 1);
    let y = plotTop;
    const porId = new Map();
    nodes.forEach((n) => {
      const h = n.peso != null ? Math.max(2, (n.peso / total) * alturaUtil) : 0;
      porId.set(n.id, { ...n, y0: y, y1: y + h });
      y += h + nodePadding;
    });
    return porId;
  }

  const oldPorId = empilhar(nodesOld);
  const newPorId = empilhar(nodesNew);

  // Distribui os links dentro do intervalo vertical de cada nó,
  // proporcionalmente ao valor de cada link em relação ao total que
  // toca aquele nó NAQUELA ponta — por isso a largura de uma mesma fita
  // pode ser diferente na origem e no destino (o afunilamento é a
  // "perda"/"ganho" do enxugamento). Num nó fantasma (y0 === y1, altura
  // zero), isso já resulta numa fita que converge pra um único ponto.
  function distribuirNaPonta(links, pegarId, porId, chaveInicio, chaveFim) {
    const porNo = new Map();
    links.forEach((l) => {
      const id = pegarId(l);
      if (!porNo.has(id)) porNo.set(id, []);
      porNo.get(id).push(l);
    });
    const faixas = new Map();
    porNo.forEach((lista, id) => {
      const no = porId.get(id);
      if (!no) return;
      const total = lista.reduce((acc, l) => acc + l.value, 0) || 1;
      const altura = no.y1 - no.y0;
      let y = no.y0;
      lista.forEach((l) => {
        const h = (l.value / total) * altura;
        faixas.set(l, { ...(faixas.get(l) || {}), [chaveInicio]: y, [chaveFim]: y + h });
        y += h;
      });
    });
    return faixas;
  }

  const linksValidos = slideData.links.filter((l) => oldPorId.has(l.source) && newPorId.has(l.target));
  const faixasOrigem = distribuirNaPonta(linksValidos, (l) => l.source, oldPorId, "y0s", "y1s");
  const faixasDestino = distribuirNaPonta(linksValidos, (l) => l.target, newPorId, "y0t", "y1t");

  const linksGeom = linksValidos.map((l) => {
    const o = faixasOrigem.get(l) || {};
    const d = faixasDestino.get(l) || {};
    return { ...l, y0s: o.y0s, y1s: o.y1s, y0t: d.y0t, y1t: d.y1t };
  });

  const svg = d3
    .select(container)
    .append("svg")
    .attr("viewBox", `0 0 ${W} ${H}`)
    .attr("preserveAspectRatio", "xMidYMid meet");

  // Fitas afuniladas
  svg
    .append("g")
    .selectAll("path")
    .data(linksGeom)
    .join("path")
    .attr("class", "sankey-link")
    .attr("fill", COR_LINK)
    .attr("d", (d) => {
      const x0 = xOldRight;
      const x1 = xNewLeft;
      const cx = (x0 + x1) / 2;
      return `M${x0},${d.y0s}
        C${cx},${d.y0s} ${cx},${d.y0t} ${x1},${d.y0t}
        L${x1},${d.y1t}
        C${cx},${d.y1t} ${cx},${d.y1s} ${x0},${d.y1s}
        Z`;
    });

  // Nós — só os reais (peso != null) ganham retângulo; um nó fantasma é
  // só o ponto de convergência da fita (y0 === y1), sem barra.
  const todosNos = [...oldPorId.values(), ...newPorId.values()];
  const grupoNos = svg
    .append("g")
    .selectAll("g")
    .data(todosNos)
    .join("g")
    .attr("class", (d) => "sankey-node " + (idsAntigos.has(d.id) ? "sankey-node--old" : "sankey-node--new"));

  grupoNos
    .filter((d) => d.peso != null)
    .append("rect")
    .attr("x", (d) => (idsAntigos.has(d.id) ? xOldLeft : xNewLeft))
    .attr("y", (d) => d.y0)
    .attr("width", nodeWidth)
    .attr("height", (d) => Math.max(1, d.y1 - d.y0))
    .attr("fill", (d) => (idsAntigos.has(d.id) ? COR_ANTIGA : COR_NOVA));

  grupoNos.each(function (d) {
    const antigo = idsAntigos.has(d.id);
    const x = antigo ? xOldLeft - 10 : xNewRight + 10;
    const ancora = antigo ? "end" : "start";
    const grupo = d3.select(this);

    if (d.peso == null) {
      grupo
        .append("text")
        .attr("class", "nota-migracao")
        .attr("x", x)
        .attr("y", d.y0)
        .attr("text-anchor", ancora)
        .attr("dy", "0.32em")
        .text(`(${d.nota || "não é mais um item autônomo"})`);
      return;
    }

    const temDesc = d.linhasDesc.length > 0;
    const temTag = Boolean(d.tag);
    const cy = (d.y0 + d.y1) / 2;
    const totalH =
      d.linhasTitulo.length * ALTURA_TITULO +
      ALTURA_TITULO +
      (temTag ? ALTURA_TAG : 0) +
      (temDesc ? GAP_TITULO_DESC + d.linhasDesc.length * ALTURA_DESC : 0);
    let y = cy - totalH / 2 + ALTURA_TITULO / 2;

    d.linhasTitulo.forEach((linha) => {
      const selTitulo = grupo
        .append("text")
        .attr("class", "sankey-titulo")
        .attr("x", x)
        .attr("y", y)
        .attr("text-anchor", ancora)
        .attr("dy", "0.32em");
      renderizarTokens(selTitulo, linha, "", "");
      y += ALTURA_TITULO;
    });

    grupo
      .append("text")
      .attr("class", "peso")
      .attr("x", x)
      .attr("y", y)
      .attr("text-anchor", ancora)
      .attr("dy", "0.32em")
      .text(d.peso + "%");
    y += ALTURA_TITULO;

    if (temTag) {
      const tagCls = d.tagTipo ? `sankey-tag sankey-tag--${d.tagTipo}` : "sankey-tag";
      grupo
        .append("text")
        .attr("class", tagCls)
        .attr("x", x)
        .attr("y", y)
        .attr("text-anchor", ancora)
        .attr("dy", "0.32em")
        .text(`[${d.tag}]`);
      y += ALTURA_TAG;
    }

    if (temDesc) {
      y += GAP_TITULO_DESC;
      d.linhasDesc.forEach((linha, i) => {
        const prefixo = i === 0 ? "“" : "";
        const sufixo = i === d.linhasDesc.length - 1 ? "”" : "";
        const selDesc = grupo
          .append("text")
          .attr("class", "descricao")
          .attr("x", x)
          .attr("y", y)
          .attr("text-anchor", ancora)
          .attr("dy", "0.32em");
        renderizarTokens(selDesc, linha, prefixo, sufixo);
        y += ALTURA_DESC;
      });
    }
  });
}
