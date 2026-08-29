---
layout: layouts/estatico.njk
templateEngineOverride: njk
title: "COMAPE — materiais (uso interno)"
permalink: /materiais/
eleventyExcludeFromCollections: true
---

<div class="pagina-materiais">
  <h1>Materiais para divulgação</h1>
  <p class="pagina-materiais__intro">
    Ferramentas de uso interno para gerar o vídeo de Reels, o post de
    Instagram e o pôster A3 a partir do mesmo hero animado do site. Só
    funcionam rodando o site localmente (<code>npm start</code>) — não vão
    para o site publicado.
  </p>

  <section class="cartao-material">
    <h2>Vídeo para Reels/Stories (9:16)</h2>
    <p>
      Jeito recomendado: no terminal, com o servidor de dev rodando
      (<code>npx eleventy --serve --port=8082</code>), rode
      <code>npm run reel</code> — gera o MP4 automaticamente (Puppeteer),
      sem precisar abrir nada manualmente. Detalhes e opções no README,
      seção "Gerar o vídeo do teaser para Instagram Reels".
    </p>
    <p>
      Alternativa manual (grava a própria aba do navegador, sem Puppeteer):
    </p>
    <button type="button" class="botao-material"
      onclick="abrirMaterial('{{ '/materiais/reels/teaser2/' | rel }}', 480, 854)">
      Abrir gravador manual (teaser2)
    </button>
  </section>

  <section class="cartao-material">
    <h2>Post para Instagram (4:5, 1080×1350px)</h2>
    <p>
      Abre numa janela nova; espere a animação terminar (~4s) e, no
      DevTools (F12) → aba <strong>Elements</strong>, clique com o botão
      direito na <code>&lt;div class="tela-post"&gt;</code> →
      <strong>Capture node screenshot</strong>. Sai um PNG 1080×1350px
      exato, pronto para postar.
    </p>
    <div class="cartao-material__botoes">
      <button type="button" class="botao-material"
        onclick="abrirMaterial('{{ '/materiais/instagram/' | rel }}', 1080, 1350)">
        Abrir post (com "Programação em breve")
      </button>
      <button type="button" class="botao-material"
        onclick="abrirMaterial('{{ '/materiais/instagram/sem-programacao/' | rel }}', 1080, 1350)">
        Abrir post (sem "Programação em breve")
      </button>
    </div>
  </section>

  <section class="cartao-material">
    <h2>Banner do site (2000×743px)</h2>
    <p>
      Abre numa janela nova; espere a animação terminar (~4s) e, no
      DevTools (F12) → aba <strong>Elements</strong>, clique com o botão
      direito na <code>&lt;div class="tela-banner"&gt;</code> →
      <strong>Capture node screenshot</strong>. Sai um PNG 2000×743px
      exato.
    </p>
    <div class="cartao-material__botoes">
      <button type="button" class="botao-material"
        onclick="abrirMaterial('{{ '/materiais/banner/' | rel }}', 2000, 743)">
        Abrir banner
      </button>
    </div>
  </section>

  <section class="cartao-material">
    <h2>Pôster A3 retrato (297×420mm)</h2>
    <p>
      Abre numa janela nova; espere a animação terminar (~4s) e use
      Ctrl/Cmd+P → destino "Salvar como PDF" → papel <strong>A3</strong>,
      margens <strong>nenhuma</strong>, sem cabeçalho/rodapé, escala 100%.
    </p>
    <div class="cartao-material__botoes">
      <button type="button" class="botao-material"
        onclick="abrirMaterial('{{ '/materiais/poster/a3/' | rel }}', 630, 891)">
        Abrir pôster (com "Programação em breve")
      </button>
      <button type="button" class="botao-material"
        onclick="abrirMaterial('{{ '/materiais/poster/a3-sem-programacao/' | rel }}', 630, 891)">
        Abrir pôster (sem "Programação em breve")
      </button>
    </div>
  </section>
</div>

<script>
  // Abre a página do material numa janela nova já dimensionada na
  // proporção certa (mesmo mecanismo do botão "Abrir em janela 9:16" do
  // teaser2) — só um atalho de conveniência: o tamanho da janela não afeta
  // o resultado final (screenshot de nó ou impressão em PDF já são
  // exatos independente da janela), mas ver a página já no formato
  // aproximado ajuda a conferir o resultado antes de capturar.
  function abrirMaterial(url, larguraBase, alturaBase) {
    const margem = 80;
    const alturaDisponivel = (window.screen.availHeight || 900) - margem;
    const larguraDisponivel = (window.screen.availWidth || 1200) - margem;
    const escala = Math.min(1, alturaDisponivel / alturaBase, larguraDisponivel / larguraBase);
    const largura = Math.round(larguraBase * escala);
    const altura = Math.round(alturaBase * escala);
    const left = Math.round(((window.screen.width || largura) - largura) / 2);
    const top = Math.round(((window.screen.height || altura) - altura) / 2);
    window.open(
      url,
      "_blank",
      `width=${largura},height=${altura},left=${left},top=${top},resizable=yes,toolbar=no,menubar=no,location=no,status=no`
    );
  }
</script>
