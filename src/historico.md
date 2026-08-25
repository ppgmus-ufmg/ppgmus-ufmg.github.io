---
layout: layouts/base.njk
templateEngineOverride: njk
title: Histórico
permalink: /historico/
descricao: Histórico dos Fóruns de Autoavaliação e Planejamento Estratégico do PPGMUS.
---

<section class="secao">
  <div class="container prosa">
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
      {%- if edicao.data.coordenacao_ppgmus %}Coordenação do PPGMUS: {{ edicao.data.coordenacao_ppgmus }}{% endif -%}
      {%- if edicao.data.coordenacao_ppgmus and edicao.data.comape %} · {% endif -%}
      {%- if edicao.data.comape %}COMAPE: {{ edicao.data.comape }}{% endif -%}
    </p>
    {%- endif %}
    {{ edicao.templateContent | safe }}
    <ul class="lista-documentos">
      {%- for doc in edicao.data.arquivos %}
      <li>
        <strong>{{ doc.titulo }}</strong>
        <p>{{ doc.descricao }}</p>
        <p><a class="botao botao--secundario" href="{{ doc.arquivo | rel }}">Abrir documento</a></p>
      </li>
      {%- endfor %}
    </ul>
    {%- endfor %}
  </div>
</section>
