---
layout: layouts/base.njk
templateEngineOverride: njk
title: Documentos
permalink: /documentos/
descricao: Documentos e materiais de apoio da COMAPE e do PPGMUS.
---

<section class="secao">
  <div class="container prosa">
    <h1>Documentos</h1>
    <p>
      Fichas de avaliação, relatórios e materiais de apoio do processo de
      autoavaliação do PPGMUS.
    </p>
  </div>
</section>

<section class="secao secao--alt">
  <div class="container">
    <div class="grade">
      {%- for doc in collections.documentos %}
      {%- if doc.data.grupo != "2021-2024" %}
      <div class="cartao">
        {%- if doc.data.categoria %}<p class="etiqueta">{{ doc.data.categoria }}</p>{% endif -%}
        <h3>{{ doc.data.title }}</h3>
        {{ doc.templateContent | safe }}
        {%- if doc.data.arquivo %}<p><a class="botao botao--secundario" href="{{ doc.data.arquivo }}">Abrir documento</a></p>{% endif -%}
      </div>
      {%- endif %}
      {%- endfor %}
    </div>
  </div>
</section>

<section class="secao">
  <div class="container">
    <h2>Documentos 2021–2024</h2>
    <p class="prosa">Materiais do quadriênio anterior, usados como referência.</p>
    <div class="grade">
      {%- for doc in collections.documentos %}
      {%- if doc.data.grupo == "2021-2024" %}
      <div class="cartao">
        {%- if doc.data.categoria %}<p class="etiqueta">{{ doc.data.categoria }}</p>{% endif -%}
        <h3>{{ doc.data.title }}</h3>
        {{ doc.templateContent | safe }}
        {%- if doc.data.arquivo %}<p><a class="botao botao--secundario" href="{{ doc.data.arquivo }}">Abrir documento</a></p>{% endif -%}
      </div>
      {%- endif %}
      {%- endfor %}
    </div>
  </div>
</section>
