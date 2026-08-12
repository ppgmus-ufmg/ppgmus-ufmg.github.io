---
layout: layouts/base.njk
title: Pessoas
permalink: /pessoas/
descricao: Membros da COMAPE — PPGMUS/UFMG.
---

<section class="secao">
  <div class="container prosa">
    <h1>Pessoas</h1>
    <p>Membros da COMAPE.</p>
  </div>
</section>

<section class="secao secao--alt">
  <div class="container">
    <div class="grade">
      {% for pessoa in collections.pessoas %}
      <div class="cartao">
        {% if pessoa.data.foto %}<img src="{{ pessoa.data.foto }}" alt="{{ pessoa.data.title }}" style="border-radius: var(--raio-md); margin-bottom: var(--espaco-1);">{% endif %}
        <h3>{{ pessoa.data.title }}</h3>
        {% if pessoa.data.funcao %}<p class="etiqueta">{{ pessoa.data.funcao }}</p>{% endif %}
        {{ pessoa.templateContent | safe }}
      </div>
      {% endfor %}
    </div>
  </div>
</section>
