---
layout: layouts/estatico.njk
templateEngineOverride: njk
title: "COMAPE — post Instagram"
permalink: /materiais/instagram/
eleventyExcludeFromCollections: true
---

<div class="aviso-captura">
  Espere a animação terminar (~4s). Depois, no DevTools (F12) → aba
  <strong>Elements</strong>, clique com o botão direito na tag
  <code>&lt;div class="tela-post"&gt;</code> → <strong>Capture node
  screenshot</strong>. Sai um PNG 1080×1350px exato, pronto para postar.
  Sem a chamada "Programação em breve"? Use
  <a href="{{ '/materiais/instagram/sem-programacao/' | rel }}">esta versão</a>.
  <br><a href="{{ '/materiais/' | rel }}">← voltar para Materiais</a>
</div>

<div class="tela-post">
  <section class="hero hero--media tela-post__hero">
    <div class="hero__media">
      <img src="{{ '/assets/img/hero-ufmg-pb.jpg' | rel }}" alt="">
    </div>
    <div class="tela-post__conteudo">
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
