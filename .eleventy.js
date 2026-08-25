const { DateTime } = require("luxon");
const fs = require("fs");
const path = require("path");

// CSS usado só pelas ferramentas locais de src/materiais/, que nunca são
// publicadas (o permalink delas é zerado em modo "build" — ver
// src/materiais/materiais.11tydata.js). Sem a exclusão abaixo esses arquivos
// eram copiados para o _site/ mesmo sem nenhuma página publicada referenciá-los.
// Em `npm start` continuam sendo servidos normalmente, para as ferramentas
// locais seguirem funcionando.
const CSS_SO_LOCAL = new Set(["estatico.css", "reel.css"]);

module.exports = function (eleventyConfig) {
  if (process.env.ELEVENTY_RUN_MODE === "build") {
    for (const arquivo of fs.readdirSync(path.join(__dirname, "src", "css"))) {
      if (!CSS_SO_LOCAL.has(arquivo)) {
        eleventyConfig.addPassthroughCopy({ [`src/css/${arquivo}`]: `css/${arquivo}` });
      }
    }
  } else {
    eleventyConfig.addPassthroughCopy("src/css");
  }
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({ "src/favicon.svg": "favicon.svg" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });

  eleventyConfig.addCollection("documentos", (api) =>
    api.getFilteredByGlob("src/documentos/*.md").sort((a, b) => {
      return (a.data.ordem ?? 99) - (b.data.ordem ?? 99);
    })
  );

  eleventyConfig.addCollection("historico", (api) =>
    api.getFilteredByGlob("src/historico/*.md").sort((a, b) => {
      return (b.data.edicao ?? 0) - (a.data.edicao ?? 0);
    })
  );

  eleventyConfig.addCollection("pessoas", (api) =>
    api.getFilteredByGlob("src/pessoas/*.md").sort((a, b) => {
      return (a.data.ordem ?? 99) - (b.data.ordem ?? 99);
    })
  );

  // Converte um caminho absoluto ("/css/style.css", "/documentos/", "/")
  // no caminho relativo correto a partir da página sendo renderizada, para
  // o site funcionar em qualquer raiz (domínio, subpasta, container Docker
  // servindo de qualquer lugar) sem precisar saber o prefixo de antemão.
  // Links externos, âncoras (#...) e mailto: passam direto, sem alteração.
  eleventyConfig.addFilter("rel", function (target) {
    if (!target || /^([a-z][a-z0-9+.-]*:)?\/\//i.test(target) || target.startsWith("#") || target.startsWith("mailto:")) {
      return target;
    }
    const from = (this.page && this.page.url) || "/";
    const fromDir = from.endsWith("/") ? from : path.posix.dirname(from) + "/";
    let rel = path.posix.relative(fromDir, target);
    if (rel === "") rel = ".";
    if (target.endsWith("/") && !rel.endsWith("/")) rel += "/";
    if (!rel.startsWith(".")) rel = "./" + rel;
    return rel;
  });

  eleventyConfig.addFilter("dataLonga", (isoDate) => {
    if (!isoDate) return "";
    return DateTime.fromISO(isoDate, { zone: "utc" })
      .setLocale("pt-BR")
      .toFormat("dd 'de' LLLL 'de' yyyy");
  });

  // Tira o <p>...</p> que o markdown-it envolve em torno de um corpo de
  // texto curto (ex.: a descrição de um documento em src/documentos/*.md),
  // para poder encaixar esse HTML dentro de um <span> inline.
  eleventyConfig.addFilter("semParagrafo", (html) =>
    (html || "").trim().replace(/^<p>([\s\S]*)<\/p>$/, "$1")
  );

  // Formato de um link de documento, para o selo exibido em
  // lista-documentos.njk: extensão real do arquivo (PDF, DOCX...) quando
  // houver uma antes do fim da URL (ignorando pontos do domínio, ex.
  // "www.ufmg.br"), ou "LINK" para páginas externas sem extensão de
  // arquivo (ex. o Regimento Geral da UFMG, uma página HTML).
  eleventyConfig.addFilter("formatoArquivo", (url) => {
    const m = /\.([a-z0-9]{2,5})(?:[?#]|$)/i.exec(url || "");
    return m ? m[1].toUpperCase() : "LINK";
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
