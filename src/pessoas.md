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
    <p><strong>Comissão de Autoavaliação e Planejamento Estratégico (COMAPE) - 2026-2028:</strong></p>
    <ul class="lista-pessoas">
      {%- for pessoa in collections.pessoas %}
      <li>
        <strong>{{ pessoa.data.title }}</strong>{% if pessoa.data.funcao %} — {{ pessoa.data.funcao }}{% endif %}
      </li>
      {%- endfor %}
    </ul>
  </div>
</section>
