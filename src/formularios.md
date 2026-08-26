---
layout: layouts/base.njk
templateEngineOverride: njk
title: Formulários
permalink: /formularios/
descricao: Formulários do IV Fórum e da COMAPE — PPGMUS/UFMG.
---

{%- from "partials/lista-documentos.njk" import linhaDocumento with context %}

<section class="secao">
  <div class="container">
    <h1>Formulários</h1>
    <ul class="lista-documentos-compacta">
      {{ linhaDocumento("Formulário para perguntas, observações, sugestões, propostas, etc.", "Formulário", "https://forms.gle/wCPSZCJ56gBip5KP6", "Use o formulário para enviar perguntas, observações, sugestões ou propostas à comissão organizadora do Fórum. As contribuições recebidas serão consideradas na condução dos debates e no planejamento estratégico do programa.") }}
    </ul>

    <div style="text-align: right; margin-top: var(--espaco-3);">
      <a href="https://forms.gle/wCPSZCJ56gBip5KP6" target="_blank" rel="noopener">
        <img src="{{ '/assets/img/qrcode-formulario.png' | rel }}" alt="QR code para o formulário de perguntas, observações, sugestões e propostas" style="width: 220px; max-width: 100%; display: inline-block;">
      </a>
      <p style="color: var(--cor-texto-suave); font-size: var(--texto-sm); margin-top: var(--espaco-1);">
        Aponte a câmera do celular para acessar o formulário.
      </p>
    </div>
  </div>
</section>
