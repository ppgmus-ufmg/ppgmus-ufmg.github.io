const { DateTime } = require("luxon");

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
