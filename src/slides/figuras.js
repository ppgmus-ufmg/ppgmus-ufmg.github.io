// figuras.js — gráficos do capítulo "O que o conceito mede", reconstruídos
// como HTML/SVG nativos (sem capturas de tela). Dados: Plataforma Sucupira
// (CAPES), Avaliação Quadrienal 2025, congelados em 2026-08-25.
//
// Referência visual: https://panoramapqmus.ecris.cc/conceito
// (scratchpad 1_variacao_nota.html, 2_onde_no_pais.html, 3_distribuicao_notas.html).

const FIGURAS = {};

// ---------------------------------------------------------------------------
// 1. Variação de nota (dumbbell): ponto vazado = nota 2017-2020,
//    ponto cheio = nota 2021-2024. Verde = subiu; cinza = manteve.
// ---------------------------------------------------------------------------
FIGURAS.variacao = (() => {
  const X = { 3: 0, 4: 136.5, 5: 273, 6: 409.5, 7: 546 };
  const VERDE = "#008300";
  const CINZA = "#6b6860";
  const dados = [
    ["UNICAMP", 6, 7], ["UFRGS", 7, 7], ["UFMG", 5, 6], ["USP", 6, 6],
    ["UFPB", 4, 5], ["UFPR", 4, 5], ["UFRJ", 4, 5], ["UDESC", 5, 5],
    ["UNIRIO", 5, 5, true], ["UEM", 3, 4], ["UFPE", 3, 4], ["UFU", 3, 4],
    ["UNESPAR", 3, 4], ["UFBA", 4, 4], ["UFRN", 4, 4], ["UNB", 4, 4, true],
    ["UNESP", 4, 4], ["UFSJ", 3, 3, true],
  ];
  const grid = [3, 4, 5, 6, 7]
    .map((n) => `
        <line x1="${X[n]}" x2="${X[n]}" y1="-8" y2="468" stroke="#e2e0db"/>
        <text x="${X[n]}" y="-14" text-anchor="middle" font-size="11" fill="#6b6860">${n}</text>`)
    .join("");
  const linhas = dados
    .map(([sigla, a, n, rec], i) => {
      const yLabel = 17 + i * 26;
      const y = yLabel - 4;
      const marca = rec ? " \u2733" : "";
      let g = `<text x="-66" y="${yLabel}" font-size="12" font-weight="600" fill="#1a1a1a">${sigla}${marca}</text>`;
      if (a === n) {
        g += `<circle cx="${X[n]}" cy="${y}" r="5" fill="${CINZA}" opacity="0.55"><title>${sigla}: manteve ${n}</title></circle>`;
      } else {
        g += `
        <line x1="${X[a]}" x2="${X[n]}" y1="${y}" y2="${y}" stroke="${VERDE}" stroke-width="3"/>
        <circle cx="${X[a]}" cy="${y}" r="5" fill="#fff" stroke="${VERDE}" stroke-width="2"/>
        <circle cx="${X[n]}" cy="${y}" r="6" fill="${VERDE}"><title>${sigla}: ${a} \u2192 ${n}</title></circle>`;
      }
      return g;
    })
    .join("");
  return `
  <div class="pg-variacao">
    <svg viewBox="0 0 640 504" class="pg-svg" role="img" aria-label="Nota de cada programa antes e depois da Avalia\u00e7\u00e3o Quadrienal 2025">
      <g transform="translate(70,28)">${grid}${linhas}</g>
    </svg>
    <div class="pg-legenda">
      <span><i style="background:#008300"></i>Subiu de nota (9)</span>
      <span><i style="background:#6b6860;opacity:0.55"></i>Nota mantida (9)</span>
      <span>\u2733 foi \u00e0 reconsidera\u00e7\u00e3o e manteve a nota</span>
    </div>
    <p class="pg-nota"><strong>Ningu\u00e9m caiu.</strong> Fora do gr\u00e1fico: UEPA (primeira nota 3) e UFG (sem nota, em implanta\u00e7\u00e3o).</p>
  </div>`;
})();

// ---------------------------------------------------------------------------
// 2. Onde cada programa está no país (percentil médio na distribuição nacional
//    e na área ARTES).
// ---------------------------------------------------------------------------
FIGURAS.percentil = (() => {
  const dados = [
    ["UFRGS", 7, 96, 97], ["UNICAMP", 7, 96, 97], ["UFMG", 6, 87, 88], ["USP", 6, 87, 88],
    ["UDESC", 5, 68, 70], ["UFPB", 5, 68, 70], ["UFPR", 5, 68, 70], ["UFRJ", 5, 68, 70],
    ["UNIRIO", 5, 68, 70], ["UEM", 4, 34, 36], ["UFBA", 4, 34, 36], ["UFPE", 4, 34, 36],
    ["UFRN", 4, 34, 36], ["UFU", 4, 34, 36], ["UNB", 4, 34, 36], ["UNESP", 4, 34, 36],
    ["UNESPAR", 4, 34, 36], ["UEPA", 3, 7, 7], ["UFSJ", 3, 7, 7],
  ];
  const cor = (n) => ({ 7: "#0d366b", 6: "#0d366b", 5: "#256abf", 4: "#6da7ec", 3: "#cde2fb" }[n]);
  const rows = dados
    .map(([sigla, nota, br, art]) => `
      <div class="pg-linha">
        <span class="pg-linha-rotulo">${sigla}</span>
        <span class="pg-linha-trilho"><span style="width:${br}%;background:${cor(nota)}"></span></span>
        <span class="pg-linha-nums"><b>${nota}</b><span>${br}%</span><span>${art}%</span></span>
      </div>`)
    .join("");
  return `
  <div class="pg-barras">
    <div class="pg-barras-titulo">PERCENTIL NO BRASIL (4.555 PROGRAMAS)</div>
    <div class="pg-barras-head">
      <span></span>
      <span>percentil no Brasil</span>
      <span class="pg-barras-head-nums"><span>nota</span><span>Brasil</span><span>ARTES</span></span>
    </div>
    ${rows}
    <p class="pg-nota">Percentil <strong>m\u00e9dio</strong>: a nota tem cinco n\u00edveis e h\u00e1 centenas de empates; base de 4.555 programas no pa\u00eds e 74 na \u00e1rea ARTES.</p>
  </div>`;
})();

// ---------------------------------------------------------------------------
// 3. Distribuição de notas: Música vs. ARTES vs. Brasil.
// ---------------------------------------------------------------------------
FIGURAS.distribuicao = (() => {
  const badge = { 1: "#c0392b", 2: "#e67e22", 3: "#f1c40f", 4: "#27ae60", 5: "#16a085", 6: "#2980b9", 7: "#8e44ad" };
  const dados = [
    [1, 0, 1, "4"], [2, 0, 0, "40"], [3, 2, 9, "595"], [4, 8, 34, "1.844"],
    [5, 5, 16, "1.245"], [6, 2, 10, "489"], [7, 2, 4, "338"],
  ];
  const barra = (n, cor) =>
    n > 0
      ? `<span class="pg-dist-barra"><span style="width:${((n / 34) * 100).toFixed(1)}%;background:${cor}"></span></span><span class="pg-dist-num">${n}</span>`
      : `<span class="pg-dist-barra"><span style="width:0%"></span></span>`;
  const rows = dados
    .map(([n, m, a, b]) => `
      <tr>
        <td><span class="pg-dist-badge" style="background:${badge[n]};${n === 3 ? "color:#333" : ""}">${n}</span></td>
        <td>${barra(m, "#256abf")}</td>
        <td>${barra(a, "#4a3aa7")}</td>
        <td class="pg-dist-br">${b}</td>
      </tr>`)
    .join("");
  return `
  <table class="pg-dist">
    <thead><tr><th>Nota</th><th>PPGs M\u00fasica (20)</th><th>PPGs Artes (74)</th><th>PPGs Todos (4.555)</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>`;
})();

// ---------------------------------------------------------------------------
// 4. Nossa produção 2021-2024: distribuição por estrato/conceito (barras
//    horizontais). Dados do parecer da Avaliação Quadrienal (ficha de
//    recomendação) e da ficha de área de Artes, congelados em 2026-08.
// ---------------------------------------------------------------------------

// Barra horizontal genérica: cada item é [rótulo, n, "percentual", cor?].
// A largura da barra é proporcional ao maior n da lista; "cor?" sobrescreve
// a cor padrão (usada pra destacar estratos "sem estrato", ex.: TNC/LNC).
function barrasEstrato(itens, nota, corPadrao) {
  const max = Math.max(...itens.map((item) => item[1]));
  const linhas = itens
    .map(([rotulo, n, pct, cor]) => {
      const w = max > 0 ? ((n / max) * 100).toFixed(1) : "0";
      return `
      <div class="pg-estrato-linha">
        <span class="pg-estrato-rotulo">${rotulo}</span>
        <span class="pg-estrato-trilho"><span style="width:${w}%;background:${cor || corPadrao}"></span></span>
        <span class="pg-estrato-num">${n} · ${pct}</span>
      </div>`;
    })
    .join("");
  return `<div class="pg-estratos">${linhas}<p class="pg-nota">${nota}</p></div>`;
}

const AZUL = "#0f6e8c";
const LARANJA = "#f17807";

FIGURAS.producaoPeriodicos = (() => {
  const itens = [
    ["A1", 51, "35,9%"], ["A2", 20, "14,1%"], ["A3", 11, "7,7%"], ["A4", 30, "21,1%"],
    ["B1", 12, "8,5%"], ["B2", 5, "3,5%"], ["B3", 6, "4,2%"], ["B4", 2, "1,4%"],
    ["C", 3, "2,1%"], ["NP", 2, "1,4%"],
  ];
  return barrasEstrato(
    itens,
    "Metade dos artigos (50%) está em <strong>A1 ou A2</strong> e 78,9% em estrato <strong>A</strong>. No quadriênio anterior (2017–2020, 78 artigos), o A1 era de 11,5%; hoje chega a 35,9%, um salto de qualidade editorial mesmo com a base quase dobrando (78 → 142).",
    AZUL
  );
})();

FIGURAS.producaoEventos = (() => {
  const itens = [
    ["A1", 1, "0,9%"], ["A2", 71, "64,5%", LARANJA], ["A3", 6, "5,5%"], ["A4", 8, "7,3%"],
    ["B2", 9, "8,2%"], ["B3", 5, "4,5%"], ["B4", 2, "1,8%"], ["C", 8, "7,3%"],
  ];
  return barrasEstrato(
    itens,
    "71 dos 110 trabalhos (64,5%) estão em um único estrato, o <strong>A2</strong>; os demais formam uma cauda fina.",
    AZUL
  );
})();

FIGURAS.producaoArtisticas = (() => {
  const itens = [
    ["A2", 12, "11,9%"], ["A3", 23, "22,8%"], ["A4", 34, "33,7%"],
    ["B1", 16, "15,8%"], ["B2", 10, "9,9%"], ["ANC", 6, "5,9%"],
  ];
  return barrasEstrato(
    itens,
    "68,3% da produção artística está em faixa <strong>A</strong> (A2–A4), refletindo o peso de performance, composição e regência nas linhas de Performance Musical e Processos Analíticos e Criativos, dimensão elogiada no item de excelência da ficha.",
    AZUL
  );
})();

FIGURAS.producaoTecnicas = (() => {
  const itens = [
    ["T1–T4", 25, "35,2%"], ["TNC", 46, "64,8%", LARANJA],
  ];
  return barrasEstrato(
    itens,
    "46 dos 71 itens (64,8%) caem em <strong>TNC</strong> (sem estrato T1–T4) e só 25 (35,2%) em T1–T4. É o tipo com pior aproveitamento relativo em estratos avaliados.",
    AZUL
  );
})();

FIGURAS.producaoLivros = (() => {
  const itens = [
    ["L1", 2, "4,3%"], ["L2", 10, "21,3%"], ["L3", 12, "25,5%"], ["L4", 4, "8,5%"],
    ["L5", 2, "4,3%"], ["LNC", 17, "36,2%", LARANJA],
  ];
  return barrasEstrato(
    itens,
    "Cerca de 60% da produção de livros está classificada em estrato <strong>L</strong>; 17 itens (36,2%) ficam sem estrato específico (LNC).",
    AZUL
  );
})();

FIGURAS.producaoDestaques = (() => {
  const cores = {
    "Muito bom": "#16a085",
    "Bom": "#2f7dc4",
    "Regular": "#f1c40f",
    "Insuficiente": "#e67e22",
    "Não aderente": "#c0392b",
    "Fraco": "#7f8c8d",
  };
  const itens = [
    ["Muito bom", 57, "48,7%", cores["Muito bom"]],
    ["Bom", 33, "28,2%", cores["Bom"]],
    ["Regular", 8, "6,8%", cores["Regular"]],
    ["Insuficiente", 10, "8,5%", cores["Insuficiente"]],
    ["Não aderente", 8, "6,8%", cores["Não aderente"]],
    ["Fraco", 1, "0,9%", cores["Fraco"]],
  ];
  return barrasEstrato(
    itens,
    "76,9% das produções de docentes destacadas obtiveram <strong>Muito Bom ou Bom</strong>; 23,1% ficaram entre Regular e Fraco/Não aderente. Esse resultado sustenta os 8 pontos do PDDP, complementando os 10 do PCA.",
    AZUL
  );
})();
