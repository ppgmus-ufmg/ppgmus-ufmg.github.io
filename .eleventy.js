const { DateTime } = require("luxon");
const path = require("path");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({ "src/favicon.svg": "favicon.svg" });

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
