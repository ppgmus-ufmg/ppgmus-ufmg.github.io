---
layout: layouts/base.njk
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
      {% for doc in collections.documentos %}
      <div class="cartao">
        {% if doc.data.categoria %}<p class="etiqueta">{{ doc.data.categoria }}</p>{% endif %}
        <h3>{{ doc.data.title }}</h3>
        {{ doc.templateContent | safe }}
        {% if doc.data.arquivo %}<p><a class="botao botao--secundario" href="{{ doc.data.arquivo }}">Abrir documento</a></p>{% endif %}
      </div>
      {% endfor %}
    </div>
  </div>
</section>
