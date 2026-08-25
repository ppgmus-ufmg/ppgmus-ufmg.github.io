---
layout: layouts/base.njk
templateEngineOverride: njk
title: Histórico
permalink: /historico/
descricao: Histórico dos Fóruns de Autoavaliação e Planejamento Estratégico do PPGMUS.
---

{%- from "partials/lista-documentos.njk" import linhaDocumento %}

<section class="secao">
  <div class="container">
    <h1>Histórico</h1>
    <p>
      Edições anteriores do Fórum de Autoavaliação e Planejamento
      Estratégico do PPGMUS, com os materiais e apresentações de cada uma.
    </p>

    {%- for edicao in collections.historico %}
    <h2>{{ edicao.data.title }}</h2>
    {%- if edicao.data.data %}<p class="etiqueta">{{ edicao.data.data }}</p>{% endif %}
    {%- if edicao.data.coordenacao_ppgmus or edicao.data.comape %}
    <p style="color: var(--cor-texto-suave); font-size: var(--texto-sm);">
      {%- if edicao.data.coordenacao_ppgmus %}<b>Coordenação do PPGMUS:</b> {{ edicao.data.coordenacao_ppgmus }}{% endif -%}
      {%- if edicao.data.coordenacao_ppgmus and edicao.data.comape %}<br/>{% endif -%}
      {%- if edicao.data.comape %}<b>COMAPE:</b> {{ edicao.data.comape }}{% endif -%}
    </p>
    {%- endif %}

    <h3>Resumo</h3>
    {{ edicao.templateContent | safe }}

    {%- if edicao.data.participantes %}
    <br/>
    <h3>Participantes</h3>
    <p>{{ edicao.data.participantes }}</p>
    {%- endif %}

    <h3>Documentos</h3>
    <ul class="lista-documentos-compacta">
      {%- for doc in edicao.data.arquivos %}
      {{ linhaDocumento(doc.titulo, doc.tipo, doc.arquivo, doc.descricao) }}
      {%- endfor %}
    </ul>
    {%- endfor %}
  </div>
</section>
