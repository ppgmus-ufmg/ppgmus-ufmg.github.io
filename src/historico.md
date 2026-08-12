---
layout: layouts/base.njk
title: Histórico
permalink: /historico/
descricao: Histórico dos Fóruns de Autoavaliação e Planejamento Estratégico do PPGMUS.
---

<section class="secao">
  <div class="container prosa">
    <h1>Histórico</h1>
    <p>
      Edições anteriores do Fórum de Autoavaliação e Planejamento Estratégico
      do PPGMUS.
    </p>
  </div>
</section>

<section class="secao secao--alt">
  <div class="container">
    <div class="grade">
      {% for edicao in collections.historico %}
      <div class="cartao">
        <p class="etiqueta">{{ edicao.data.edicao }}º Fórum</p>
        <h3>{{ edicao.data.title }}</h3>
        {% if edicao.data.data %}<p><strong>{{ edicao.data.data }}</strong></p>{% endif %}
        {{ edicao.templateContent | safe }}
      </div>
      {% endfor %}
    </div>
  </div>
</section>
