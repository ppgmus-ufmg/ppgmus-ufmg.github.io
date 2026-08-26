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
    <br/><br/>
    <h3>COMAPE 2026-2028:</h3>
    <ul class="lista-pessoas">
      {%- for pessoa in collections.pessoas %}
      <li>
        <strong>{{ pessoa.data.title }}</strong>{% if pessoa.data.funcao %} — {{ pessoa.data.funcao }}{% endif %}
      </li>
      {%- endfor %}
    </ul>
  <br/><br/>
    <h3>COMAPE 2023-2025:</h3>
    <ul class="lista-pessoas">
      <li><strong>Prof. Dr. Flavio Barbeitas</strong> — Presidente da COMAPE</li>
      <li><strong>Prof. Dr. Maurício Loureiro</strong></li>
      <li><strong>Prof. Dr. Sérgio Freire</strong></li>
      <li><strong>Profa. Dra. Ana Cláudia Assis</strong></li>
      <li><strong>Profa. Dra. Luciana Monteiro</strong></li>
      <li><strong>Profa. Dra. Edite Rocha</strong></li>
      <li><strong>Profa. Dra. Helena Lopes</strong> (a partir de 2024)</li>
      <li><strong>Prof. Dr. Igor Maia</strong> (a partir de 2024)</li>
      <li><strong>Luigi Brandão</strong> — Representante discente</li>
    </ul>
  </div>
</section>
