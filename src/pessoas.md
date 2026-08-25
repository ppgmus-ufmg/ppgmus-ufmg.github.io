---
layout: layouts/base.njk
templateEngineOverride: njk
title: Pessoas
permalink: /pessoas/
descricao: Membros da COMAPE — PPGMUS/UFMG.
---

<section class="secao">
  <div class="container">
    <h1>Pessoas</h1>
    <h2>Comissão de Autoavaliação e Planejamento Estratégico (COMAPE) - 2026-2028:</h2>
    <ul class="lista-pessoas">
      {%- for pessoa in collections.pessoas %}
      <li>
        <strong>{{ pessoa.data.title }}</strong>{% if pessoa.data.funcao %} — {{ pessoa.data.funcao }}{% endif %}
      </li>
      {%- endfor %}
    </ul>

    <p style="margin-top: var(--espaco-4);"><strong>Comissão de Autoavaliação e Planejamento Estratégico (COMAPE) - 2023-2025:</strong></p>
    <ul class="lista-pessoas">
      <li><strong>Flavio Barbeitas</strong> — Presidente da COMAPE</li>
      <li><strong>Maurício Loureiro</strong></li>
      <li><strong>Sérgio Freire</strong></li>
      <li><strong>Ana Cláudia Assis</strong></li>
      <li><strong>Luciana Monteiro</strong></li>
      <li><strong>Edite Rocha</strong></li>
      <li><strong>Helena Lopes</strong> — a partir de 2024</li>
      <li><strong>Igor Rocha</strong> — a partir de 2024</li>
      <li><strong>Luigi Brandão</strong> — Representante discente</li>
    </ul>
  </div>
</section>
