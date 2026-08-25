---
layout: layouts/base.njk
templateEngineOverride: njk
title: Histórico
permalink: /historico/
descricao: Histórico dos Fóruns de Autoavaliação e Planejamento Estratégico do PPGMUS.
---

{%- macro iconeTipo(tipo) %}
{%- if tipo == "Slides" %}
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="1"/><line x1="8" y1="20" x2="16" y2="20"/><line x1="12" y1="16" x2="12" y2="20"/></svg>
{%- else %}
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2h9l5 5v15H6z"/><path d="M15 2v5h5"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/></svg>
{%- endif %}
{%- endmacro %}

{%- macro iconeFormato() %}
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M4 19h16"/></svg>
{%- endmacro %}

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
      {%- if edicao.data.coordenacao_ppgmus %}<b>Coordenação do PPGMUS:</b> {{ edicao.data.coordenacao_ppgmus }}{% endif -%}
      {%- if edicao.data.coordenacao_ppgmus and edicao.data.comape %}<br/>{% endif -%}
      {%- if edicao.data.comape %}<b>COMAPE:</b> {{ edicao.data.comape }}{% endif -%}
    </p>
    {%- endif %}

    <h3>Resumo</h3>
    {{ edicao.templateContent | safe }}

    {%- if edicao.data.programacao %}
    <h4>Programação</h4>
    {%- for dia in edicao.data.programacao %}
    <p style="margin-bottom: 0.35em;"><strong>{{ dia.dia }}</strong>{% if dia.local %} · {{ dia.local }}{% endif %}</p>
    <ul style="margin-top: 0;">
      {%- for atividade in dia.atividades %}
      <li>
        <strong>{{ atividade.horario }}</strong> — {{ atividade.titulo }}
        {%- if atividade.responsavel %} <em>({{ atividade.responsavel }})</em>{% endif -%}
      </li>
      {%- endfor %}
    </ul>
    {%- endfor %}
    {%- endif %}

    {%- if edicao.data.participantes %}
    <h3>Participantes</h3>
    <p>{{ edicao.data.participantes }}</p>
    {%- endif %}

    <h3>Documentos</h3>
    <ul class="lista-documentos-compacta">
      {%- for doc in edicao.data.arquivos %}
      {%- set formato = doc.arquivo.split(".") | last | upper %}
      <li>
        <a href="{{ doc.arquivo | rel }}" class="lista-documentos-compacta__item">
          <span class="lista-documentos-compacta__tipo">
            {{ iconeTipo(doc.tipo) }}
            {{ doc.tipo }}
            <span class="lista-documentos-compacta__formato">{{ iconeFormato() }}{{ formato }}</span>
          </span>
          <span class="lista-documentos-compacta__desc"><strong>{{ doc.titulo }}</strong> — {{ doc.descricao }}</span>
        </a>
      </li>
      {%- endfor %}
    </ul>
    {%- endfor %}
  </div>
</section>
