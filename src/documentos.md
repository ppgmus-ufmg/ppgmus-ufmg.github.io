---
layout: layouts/base.njk
templateEngineOverride: njk
title: Documentos
permalink: /documentos/
descricao: Documentos e materiais de apoio da COMAPE e do PPGMUS.
---

{%- from "partials/lista-documentos.njk" import linhaDocumento with context %}

{%- macro descricaoComCategoria(doc) %}
{%- set corpo = doc.templateContent | semParagrafo %}
{%- if doc.data.categoria %}<em>{{ doc.data.categoria }}.</em> {{ corpo | safe }}{% else %}{{ corpo | safe }}{% endif %}
{%- endmacro %}

<section class="secao">
  <div class="container">
    <h1>Documentos</h1>
    <p>
      Fichas de avaliação, relatórios e materiais de apoio do processo de
      autoavaliação do PPGMUS.
    </p>

    <h2>Documentos PPGMUS</h2>
    <ul class="lista-documentos-compacta">
      {%- for doc in collections.documentos %}
      {%- if doc.data.grupo == "ppgmus" %}
      {{ linhaDocumento(doc.data.title, doc.data.tipo, doc.data.arquivo, descricaoComCategoria(doc)) }}
      {%- endif %}
      {%- endfor %}
    </ul>

    <h2>Administração Central da UFMG e PRPG</h2>
    <ul class="lista-documentos-compacta">
      {%- for doc in collections.documentos %}
      {%- if doc.data.grupo == "central-ufmg" %}
      {{ linhaDocumento(doc.data.title, doc.data.tipo, doc.data.arquivo, doc.templateContent | semParagrafo) }}
      {%- endif %}
      {%- endfor %}
    </ul>

    <h2>Documentos CAPES</h2>
    <h3>Quadriênio 2025–28</h3>
    <ul class="lista-documentos-compacta">
      {%- for doc in collections.documentos %}
      {%- if doc.data.grupo == "atual" %}
      {{ linhaDocumento(doc.data.title, doc.data.tipo, doc.data.arquivo, descricaoComCategoria(doc)) }}
      {%- endif %}
      {%- endfor %}
    </ul>

    <h3>Quadriênio 2021–24</h3>
    <p>Materiais do quadriênio anterior, usados como referência.</p>
    <ul class="lista-documentos-compacta">
      {%- for doc in collections.documentos %}
      {%- if doc.data.grupo == "2021-2024" %}
      {{ linhaDocumento(doc.data.title, doc.data.tipo, doc.data.arquivo, descricaoComCategoria(doc)) }}
      {%- endif %}
      {%- endfor %}
    </ul>
  </div>
</section>
