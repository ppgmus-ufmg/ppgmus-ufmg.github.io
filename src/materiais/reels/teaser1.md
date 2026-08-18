---
layout: layouts/reel.njk
templateEngineOverride: njk
title: "COMAPE — teaser"
permalink: /reels/teaser1/
eleventyExcludeFromCollections: true
---

<script>
  // Página fica em branco (nada anima) até apertar espaço — pensada para
  // gravação manual de tela: dá pra ficar com a captura já rodando e
  // disparar a animação no momento exato. Precisa rodar antes dos scripts
  // do p5 (incluídos logo abaixo, em partials/logo-forum.njk), que checam
  // essa flag em setup() pra decidir se já começam a desenhar ou esperam.
  window.COMAPE_AGUARDAR_ESPACO = true;
  document.body.classList.add("aguardando-espaco");
  function iniciarTeaserAoApertarEspaco(e) {
    if (e.code !== "Space" && e.key !== " ") return;
    e.preventDefault();
    document.removeEventListener("keydown", iniciarTeaserAoApertarEspaco);
    document.body.classList.remove("aguardando-espaco");
    if (typeof window.loop === "function") window.loop();
  }
  document.addEventListener("keydown", iniciarTeaserAoApertarEspaco);
</script>

<div class="tela-fone">
  <section class="hero hero--media tela-fone__hero">
    <div class="hero__media">
      <img src="{{ '/assets/img/hero-ufmg-pb.jpg' | rel }}" alt="">
    </div>
    <div class="tela-fone__conteudo">
      {% include "partials/logo-forum.njk" %}

      <div class="subtitulo-forum anim-entrada anim-entrada--eyebrow">
        <span class="subtitulo-forum__ppgmus">PPGMUS</span>
        <span class="subtitulo-forum__barra">|</span>
        <img class="subtitulo-forum__ufmg" src="{{ '/assets/logos/logo-ufmg-branco.svg' | rel }}" alt="UFMG">
      </div>

      <p class="data-forum anim-entrada anim-entrada--data">26 a 28 de agosto de 2026</p>

      <p class="hero__lead anim-entrada anim-entrada--lead">
        Três dias de atividades abertas à comunidade do PPGMUS (docentes,
        discentes, egressos e TAEs), dedicados à <strong>construção coletiva</strong> do Programa, à
        <strong>autoavaliação</strong>, ao <strong>planejamento estratégico</strong> e à <strong>recepção de novos/as discentes</strong> do Programa.
      </p>

      <div class="brevemente-rotacao">
        <p class="brevemente anim-entrada anim-entrada--seta">Programação em breve!</p>
      </div>
    </div>
  </section>
</div>
