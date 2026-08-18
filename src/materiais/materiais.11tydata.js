// Data file de diretório (convenção do Eleventy: <pasta>/<pasta>.11tydata.js
// se aplica a tudo dentro de src/materiais/). Estas páginas são ferramentas
// de geração de material (Reels, Instagram, pôster) para uso só local —
// pressupõem captura manual de tela, impressão em PDF ou o script
// scripts/gravar-reel.js (Puppeteer) — e nunca devem ir parar no site
// publicado no GitHub Pages.
//
// eleventy.env.runMode é "build" durante `eleventy`/`npm run build` (o que
// o workflow de deploy roda) e "serve"/"watch" durante `npm start`. Zerar o
// permalink em modo "build" faz o Eleventy pular a escrita da página em
// _site/ — mas ela continua funcionando normalmente com `npm start`. Isso
// referencia o `permalink` já definido no front matter de cada página (ver
// docs do Eleventy sobre "eleventyComputed" transformando um valor
// existente da cascata de dados).
module.exports = {
  eleventyExcludeFromCollections: true,
  eleventyComputed: {
    permalink: (data) => (data.eleventy.env.runMode === "build" ? false : data.permalink),
  },
};
