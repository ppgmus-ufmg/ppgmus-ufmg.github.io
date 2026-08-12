# Site da COMAPE — PPGMUS/UFMG

Site institucional da **COMAPE** (Comissão de Autoavaliação e Planejamento
Estratégico do PPGMUS), com as informações do **4º Fórum de Autoavaliação e
Planejamento Estratégico** (26 a 28 de agosto de 2026).

Site estático gerado com [Eleventy](https://www.11ty.dev/), publicado via
GitHub Pages a partir da organização [`ppgmus-ufmg`](https://github.com/organizations/ppgmus-ufmg).

## Estrutura

```
src/
  _data/site.json        → dados globais (nome, e-mail de contato, menu de navegação)
  _includes/              → layout base (src/_includes/layouts/base.njk) e navegação
  css/tokens.css          → design tokens: cores, tipografia, espaçamento
  css/style.css           → estilos do site, consumindo os tokens
  assets/logos/           → logos institucionais (UFMG, PPGMUS, EMUS 100 anos, CAPES)
  index.md                → aba "Atual" (página inicial)
  programacao.md          → aba "Programação" (4º Fórum em destaque)
  documentos.md           → aba "Documentos" (lista a coleção abaixo)
  documentos/*.md         → um arquivo por documento
  historico.md            → aba "Histórico" (lista a coleção abaixo)
  historico/*.md          → um arquivo por edição anterior do Fórum
  pessoas.md              → aba "Pessoas" (lista a coleção abaixo)
  pessoas/*.md            → um arquivo por membro da COMAPE
  contato.md              → aba "Contato"
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
   Para criar uma pessoa/documento/edição nova, use "Add file → Create new
   file" dentro da pasta correspondente (`src/pessoas/`, `src/documentos/`,
   `src/historico/`) e copie o modelo de um dos arquivos de exemplo já
   existentes.

### Adicionar um documento

Crie `src/documentos/nome-do-documento.md`:

```markdown
---
title: "Nome do documento"
categoria: "Avaliação"
arquivo: "https://link-para-o-arquivo"
permalink: false
---

Uma breve descrição do documento (opcional).
```

### Adicionar uma pessoa

Crie `src/pessoas/nome-da-pessoa.md`:

```markdown
---
title: "Nome Completo"
funcao: "Função na COMAPE"
permalink: false
---

Uma breve apresentação (opcional).
```

### Adicionar uma edição ao Histórico

Crie `src/historico/N-forum.md`:

```markdown
---
title: "Nº Fórum de Autoavaliação e Planejamento Estratégico"
edicao: N
data: "mês/ano"
permalink: false
---

Resumo da edição.
```

> `permalink: false` evita que o item gere uma página própria — ele só
> aparece como cartão dentro da respectiva aba (Documentos/Pessoas/Histórico).

### Atualizar a Programação do 4º Fórum

Edite `src/programacao.md` diretamente — quando a grade de horários da
COMAPE estiver fechada, substitua o aviso "programação detalhada em
fechamento" pela tabela/lista de mesas por dia e horário (há um comentário
no próprio arquivo com um exemplo de estrutura em Markdown).

## Design tokens

Todo o esquema visual (cores, tipografia, espaçamento, raios de borda,
sombra) fica centralizado em `src/css/tokens.css` como variáveis CSS. O
site usa **um único esquema de cores fixo** (não há alternância entre modo
claro/escuro) — para trocar a paleta, basta editar os valores desse
arquivo; o restante do CSS (`src/css/style.css`) consome as variáveis e não
precisa ser alterado.

## Publicação (GitHub Pages)

1. Crie o repositório na organização `ppgmus-ufmg` (ex.: `ppgmus-ufmg/comape`)
   e envie este código para a branch `main`.
2. Em **Settings → Pages**, em "Build and deployment", selecione **Source:
   GitHub Actions**.
3. A cada push em `main` (incluindo edições feitas direto pelo GitHub), o
   workflow em `.github/workflows/deploy.yml` builda o site com Eleventy e
   publica automaticamente.

## Sobre materiais internos

Documentos internos de planejamento (rascunhos, atas, propostas em
discussão da COMAPE) **não ficam neste repositório**, que é público. Eles
são mantidos em uma pasta separada fora da árvore do projeto. Apenas
material já revisado e aprovado para divulgação deve entrar em
`src/documentos/`.
