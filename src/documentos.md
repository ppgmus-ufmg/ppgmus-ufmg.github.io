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

    <h2>Documentos PPGMUS</h2>
    <ul class="lista-documentos">
      {%- for doc in collections.documentos %}
      {%- if doc.data.grupo == "ppgmus" %}
      <li>
        {%- if doc.data.categoria %}<p class="etiqueta">{{ doc.data.categoria }}</p>{% endif -%}
        <strong>{{ doc.data.title }}</strong>
        {{ doc.templateContent | safe }}
        {%- if doc.data.arquivo %}<p><a class="botao botao--secundario" href="{{ doc.data.arquivo | rel }}">Abrir documento</a></p>{% endif -%}
      </li>
      {%- endif %}
      {%- endfor %}
    </ul>

    <h2>Quadriênio 2025–28</h2>
    <ul class="lista-documentos">
      {%- for doc in collections.documentos %}
      {%- if doc.data.grupo == "atual" %}
      <li>
        {%- if doc.data.categoria %}<p class="etiqueta">{{ doc.data.categoria }}</p>{% endif -%}
        <strong>{{ doc.data.title }}</strong>
        {{ doc.templateContent | safe }}
        {%- if doc.data.arquivo %}<p><a class="botao botao--secundario" href="{{ doc.data.arquivo | rel }}">Abrir documento</a></p>{% endif -%}
      </li>
      {%- endif %}
      {%- endfor %}
    </ul>

    <h2>Quadriênio 2021–24</h2>
    <p>Materiais do quadriênio anterior, usados como referência.</p>
    <ul class="lista-documentos">
      {%- for doc in collections.documentos %}
      {%- if doc.data.grupo == "2021-2024" %}
      <li>
        {%- if doc.data.categoria %}<p class="etiqueta">{{ doc.data.categoria }}</p>{% endif -%}
        <strong>{{ doc.data.title }}</strong>
        {{ doc.templateContent | safe }}
        {%- if doc.data.arquivo %}<p><a class="botao botao--secundario" href="{{ doc.data.arquivo | rel }}">Abrir documento</a></p>{% endif -%}
      </li>
      {%- endif %}
      {%- endfor %}
    </ul>
  </div>
</section>
