# Site da COMAPE — PPGMUS/UFMG

Site institucional da **COMAPE** (Comissão de Autoavaliação e Planejamento
Estratégico do PPGMUS), com as informações do **4º Fórum de Autoavaliação e
Planejamento Estratégico** (26 a 28 de agosto de 2026).

Site estático gerado com [Eleventy](https://www.11ty.dev/), publicado via
GitHub Pages como página principal da organização
[`ppgmus-ufmg`](https://github.com/ppgmus-ufmg) — **https://ppgmus-ufmg.github.io/**.

## Estrutura

```
src/
  _data/site.json          → dados globais (nome, e-mail de contato, menu de navegação)
  _includes/                → layout base (layouts/base.njk), navegação e o logo animado (partials/logo-forum.njk)
  css/tokens.css            → design tokens: cores, tipografia, espaçamento
  css/style.css             → estilos do site, consumindo os tokens
  assets/logos/             → logos institucionais (UFMG, PPGMUS, EMUS 100 anos, CAPES)
  assets/documentos/        → PDFs públicos referenciados em src/documentos/*.md
  assets/img/                → imagens usadas no site (ex.: foto de fundo do topo)
  assets/logo-forum/         → sketch p5.js do logo animado do Fórum
  index.md                  → página inicial (home + Programação do 4º Fórum, tudo em uma página)
  documentos.md              → aba "Documentos" (lista a coleção abaixo, em duas seções)
  documentos/*.md             → um arquivo por documento
  historico.md                → aba "Histórico"
  pessoas.md                   → aba "Pessoas" (lista a coleção abaixo)
  pessoas/*.md                  → um arquivo por membro da COMAPE
  formularios.md                → aba "Formulários" (links de Google Forms, a preencher)
  contato.md                     → aba "Contato"
  reels/*.md                      → páginas 9:16 para gerar o vídeo de teaser (ver seção abaixo)
scripts/
  gravar-reel.js           → gera o MP4 do teaser para Reels (npm run reel)
```

## Como testar localmente (offline)

Pré-requisitos: [Node.js](https://nodejs.org/) 20+ (veja `.nvmrc`).

```bash
npm install
npm start
```

Abra `http://localhost:8080` no navegador. O servidor recarrega
automaticamente a cada alteração salva. Para simular a visualização em
celular, use o modo de dispositivo do navegador (F12 → ícone de
celular/tablet) ou redimensione a janela.

Para gerar o build de produção localmente (sem servidor), sem publicar nada:

```bash
npm run build
```

O resultado fica em `_site/` (pasta ignorada pelo git).

## Como editar o conteúdo

Todo o conteúdo é Markdown com um cabeçalho (front matter) no topo. Duas
formas de editar:

1. **Localmente**: edite os arquivos `.md` no seu editor de texto, rode
   `npm start` para conferir, depois `git commit` + `git push`.
2. **Direto pelo GitHub** (sem instalar nada): abra o arquivo desejado no
   site do GitHub, clique no ícone de lápis (editar), altere o texto e
   clique em "Commit changes" direto na branch `main`. Cerca de 1 minuto
   depois, a Action de deploy publica a mudança automaticamente no site.
   Para criar uma pessoa/documento nova, use "Add file → Create new
   file" dentro da pasta correspondente (`src/pessoas/`, `src/documentos/`)
   e copie o modelo de um dos arquivos já existentes.

### Adicionar um documento

Crie `src/documentos/nome-do-documento.md`. Para enviar o PDF junto, coloque-o
em `src/assets/documentos/` e aponte `arquivo` para `/assets/documentos/nome-do-arquivo.pdf`.

```markdown
---
title: "Nome do documento"
categoria: "Avaliação"
arquivo: "/assets/documentos/nome-do-arquivo.pdf"
grupo: atual
permalink: false
---

Uma breve descrição do documento (opcional).
```

`grupo: atual` faz o documento aparecer na seção principal da página. Use
`grupo: 2021-2024` para ele aparecer na seção "Documentos 2021–2024".

### Adicionar uma pessoa

Crie `src/pessoas/nome-da-pessoa.md`:

```markdown
---
title: "Nome Completo"
funcao: "Função na COMAPE"
permalink: false
---
```

> `permalink: false` evita que o item gere uma página própria — ele só
> aparece como item dentro da respectiva aba (Documentos/Pessoas).

### Atualizar a Programação do 4º Fórum

A tabela de programação fica direto em `src/index.md` (seção com
`id="programacao"`), junto com o resto da página inicial.

## Design tokens

Todo o esquema visual (cores, tipografia, espaçamento, raios de borda,
sombra) fica centralizado em `src/css/tokens.css` como variáveis CSS. O
site usa **um único esquema de cores fixo** (não há alternância entre modo
claro/escuro) — para trocar a paleta, basta editar os valores desse
arquivo; o restante do CSS (`src/css/style.css`) consome as variáveis e não
precisa ser alterado.

## O logo animado e a entrada da página inicial

A home (`src/index.md`) tem uma animação de entrada em 3 fases, coordenada
entre p5.js e CSS — ver comentários em `src/_includes/partials/logo-forum.njk`
e nas seções `.hero--media` / `.anim-entrada` de `src/css/style.css`:

1. Fundo branco: o símbolo (painéis) abre, centralizado.
2. O símbolo desliza para a esquerda e o texto "4º Fórum..." aparece em preto.
3. A foto de fundo entra em fade, o texto passa a branco, e o menu, a data,
   o texto de chamada e a seta de "confira a programação" aparecem juntos.

## Gerar o vídeo do teaser para Instagram Reels

As páginas `src/reels/teaser1.md` e `src/reels/teaser2.md` reproduzem a
animação de entrada da home em formato de celular (9:16), para virar vídeo
de Reels. O jeito recomendado de gerar o vídeo é o script
`scripts/gravar-reel.js`, que abre `/reels/teaser1/` num Chrome headless e
captura a animação **frame a frame, de forma determinística** (o relógio da
animação é controlado passo a passo pelo script), o que garante 30fps
constantes sem frames perdidos — ver histórico e racional em
`problema_reels.md`.

Pré-requisitos: `npm install` já feito, `ffmpeg` no PATH e o servidor de
dev rodando na porta 8082:

```bash
npx eleventy --serve --port=8082
```

Em outro terminal, na raiz do repositório:

```bash
# 10 segundos (padrão), salva em ~/Desktop/teaser-comape.mp4
npm run reel

# duração e arquivo de saída específicos
npm run reel -- --dur 15 --out ~/Desktop/teaser-15s.mp4
```

Opções (o `--` após `npm run reel` é obrigatório; `--help` lista todas):

- `--dur <segundos>` — duração **total** do vídeo. A animação em si dura
  ~5,5s; o restante é preenchido segurando o frame final.
- `--fps <n>` — padrão 30.
- `--out <arquivo>` — padrão `~/Desktop/teaser-comape.mp4` (sobrescreve se
  já existir).
- `--url <url>` — padrão `http://localhost:8082/reels/teaser1/`.

O resultado é um MP4 1080x1920 (H.264, `+faststart`), pronto para o
Instagram. Cada execução gera uma animação ligeiramente diferente — o
sorteio das janelas do símbolo é aleatório, por design. Se o Puppeteer
reclamar de browser ausente (máquina nova), rode
`npx puppeteer browsers install chrome`.

A página `/reels/teaser2/` é a alternativa manual: um botão grava a aba
pelo próprio navegador (`getDisplayMedia`), útil fora do ambiente de dev,
mas menos confiável (metadados de duração imprecisos; testada só no Chrome).

## Publicação (GitHub Pages)

Este repositório **é** a página principal da organização `ppgmus-ufmg`
(nome do repo: `ppgmus-ufmg.github.io`), então basta:

1. Em **Settings → Pages**, em "Build and deployment", selecionar **Source:
   GitHub Actions** (só precisa ser feito uma vez).
2. A cada push em `main` (incluindo edições feitas direto pelo GitHub), o
   workflow em `.github/workflows/deploy.yml` builda o site com Eleventy e
   publica automaticamente em **https://ppgmus-ufmg.github.io/**.

## Sobre materiais internos

Documentos internos de planejamento (rascunhos, atas, propostas em
discussão da COMAPE) **não ficam neste repositório**, que é público. Fotos
originais e material de referência de design (`fotos_ufmg/`,
`esquemas_de_cores_modelo_logo/`) e a pasta bruta `documentos/` também
ficam fora do git (ver `.gitignore`) — os PDFs já revisados para publicação
são copiados para `src/assets/documentos/`.
