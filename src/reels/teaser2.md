---
layout: layouts/reel.njk
templateEngineOverride: njk
title: "COMAPE — teaser 2"
permalink: /reels/teaser2/
eleventyExcludeFromCollections: true
---

<script>
  // Fica em branco até clicar em "Gravar" — ver script no fim da página.
  // Precisa rodar antes dos scripts do p5 (incluídos abaixo, em
  // partials/logo-forum.njk), que checam essa flag em setup() pra decidir
  // se já começam a desenhar ou esperam.
  window.COMAPE_AGUARDAR_INICIO = true;
  document.body.classList.add("aguardando-inicio");
</script>

<button id="botao-gravar" type="button" class="botao-gravar">Gravar e iniciar</button>

<div class="tela-fone tela-fone--fluida">
  <section class="hero hero--media tela-fone__hero">
    <div class="hero__media">
      <img src="/assets/img/hero-ufmg-pb.jpg" alt="">
    </div>
    <div class="tela-fone__conteudo">
      {% include "partials/logo-forum.njk" %}

      <div class="subtitulo-forum anim-entrada anim-entrada--eyebrow">
        <span class="subtitulo-forum__ppgmus">PPGMUS</span>
        <span class="subtitulo-forum__barra">|</span>
        <img class="subtitulo-forum__ufmg" src="/assets/logos/logo-ufmg-branco.svg" alt="UFMG">
      </div>

      <p class="data-forum anim-entrada anim-entrada--data">26 a 28 de agosto de 2026</p>

      <p class="hero__lead anim-entrada anim-entrada--lead">
        Três dias de atividades abertas à comunidade do PPGMUS (docentes,
        discentes, egressos e TAEs), dedicados à <strong>construção coletiva</strong> do Programa, à
        <strong>autoavaliação</strong>, ao <strong>planejamento estratégico</strong> e à <strong>recepção de novos/as discentes</strong> do Programa.
      </p>

      <div class="brevemente-rotacao">
        <p class="brevemente anim-entrada anim-entrada--seta">Programação em breve!</p>
      </div>
    </div>
  </section>
</div>

<script>
  // Grava a própria aba com getDisplayMedia + MediaRecorder — captura os
  // pixels e o framerate reais do navegador, sem OBS ou qualquer app externo.
  // Redimensione a janela do navegador para o formato desejado (ex.: estreita
  // e alta, tipo celular) ANTES de clicar em "Gravar": a .tela-fone preenche
  // 100% da viewport nesta página (ver .tela-fone--fluida em reel.css), então
  // o vídeo final sai exatamente do tamanho da janela.
  (function () {
    const DURACAO_MS = 15000; // duração da gravação — ajuste aqui
    const botao = document.getElementById("botao-gravar");

    botao.addEventListener("click", async () => {
      botao.disabled = true;
      botao.textContent = "Escolha \"Esta guia\" na caixa do navegador…";

      let stream;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia({
          video: { frameRate: { ideal: 60 } },
          audio: false,
        });
      } catch (err) {
        botao.disabled = false;
        botao.textContent = "Gravar e iniciar";
        alert("Não foi possível iniciar a captura: " + err.message);
        return;
      }

      const candidatosMime = [
        "video/mp4;codecs=avc1",
        "video/webm;codecs=vp9",
        "video/webm;codecs=vp8",
        "video/webm",
      ];
      const mimeType = candidatosMime.find((m) => MediaRecorder.isTypeSupported(m)) || "";
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      const pedacos = [];
      recorder.ondataavailable = (e) => { if (e.data.size > 0) pedacos.push(e.data); };

      recorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(pedacos, { type: mimeType || "video/webm" });
        const extensao = (mimeType || "").includes("mp4") ? "mp4" : "webm";
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "teaser-comape." + extensao;
        document.body.appendChild(a);
        a.click();
        a.remove();
      };

      botao.style.display = "none";
      recorder.start();

      // Dispara a animação no exato instante em que a gravação já está rodando.
      document.body.classList.remove("aguardando-inicio");
      if (typeof window.loop === "function") window.loop();

      setTimeout(() => {
        if (recorder.state !== "inactive") recorder.stop();
      }, DURACAO_MS);

      // Se a pessoa parar o compartilhamento pelo controle nativo do navegador.
      stream.getVideoTracks()[0].addEventListener("ended", () => {
        if (recorder.state !== "inactive") recorder.stop();
      });
    });
  })();
</script>
