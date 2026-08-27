// dados.js: conteúdo do deck "Informações para Ingressantes" (4º Fórum
// COMAPE). Mesmo formato de dados.js de ../04-planoestrategico-esboco/
// (const DECK = {...}), consumido por index.html nesta mesma pasta.
//
// Fonte: preparacao/ingressantes/Informativo  PPGMUS - novatos 2025.pdf
// (documento da Coordenação/Secretaria do PPGMUS, 14/08/2025) — 1 slide
// por item do Informativo (itens 1 a 14), sem combinar itens adjacentes
// num mesmo slide. O item 15 (Plataforma Sucupira/Censo da CAPES) foi
// acrescentado depois, a pedido da Coordenação — não está no PDF
// original.
//
// Ordem de apresentação: a seção "Antes de Tudo" (itens 14-15, Lattes e
// Censo da CAPES) vem PRIMEIRO, antes da trajetória acadêmica (item 1) —
// pedido explícito da Coordenação, quebrando a ordem numérica do PDF só
// nessa exceção. Os títulos dos slides mantêm o número original do
// Informativo, mesmo fora de ordem, para preservar a referência à fonte.
//
// Cores do Rough Notation seguem uma convenção própria deste deck (por
// tipo de informação, não por eixo como no 04) — 4 famílias, cada uma com
// duas variantes: pastel pro "highlight" (grifo de marca-texto, precisa
// ser claro pra não escurecer o texto por baixo) e saturada pro
// "underline" (traço fino, precisa de mais contraste pra não sumir):
//   vermelho — prazos/atenção:        highlight #f4cccc · underline #c0392b
//   azul     — números estruturais:   highlight #c9daf8 · underline #0f6e8c
//   verde    — financiamento:         highlight #d9ead3 · underline #1b5e20
//   roxo     — destaque "máximo" (Lattes): highlight #d9d2e9 · underline #6a1b9a
//   rosa     — equidade/ações afirmativas (só underline #ad1457, mesma cor
//              usada pra esse tema no deck 01) — sem variante highlight
//              ainda, porque só aparece uma vez neste deck.
// Pastéis reaproveitados do grifo do objetivo geral em
// ../04-planoestrategico-esboco/dados.js (mesmas cores do highlight
// original do Google Docs), pra manter a mesma "família" de grifo entre
// os decks do Fórum. Nunca <mark> nesse deck — todo destaque via Rough
// Notation.
const DECK = {
  "deck": {
    "title": "Informações para Ingressantes",
    "subtitle": "O que todo mestrando/doutorando novo do PPGMUS precisa saber",
    "autores": "Coordenação e Secretaria do PPGMUS",
    "ano": "2026",
    "data": "26 de agosto de 2026",
    "local": "Belo Horizonte/MG",
    "sections": [
      {
        "id": "sec0-lattes",
        "title": "Antes de Tudo",
        "resumo": "Os hábitos mais importantes para toda a sua trajetória no Programa (itens 14-15).",
        "slides": [
          {
            "id": "0a",
            "kind": "concept",
            "title": "14 · Mantenha o Lattes sempre atualizado",
            "body": [
              "É <span class=\"rn\" data-tipo=\"highlight\" data-cor=\"#d9d2e9\">absolutamente fundamental</span> que discentes mantenham o currículo Lattes <span class=\"rn\" data-tipo=\"underline\" data-cor=\"#6a1b9a\">atualizado e corretamente preenchido</span>.",
              "Além de ser uma prática incontornável da vida acadêmica, isso ajuda a manter elevado o conceito do Programa na avaliação da CAPES — a mesma avaliação que já vimos nas seções anteriores do Fórum.",
              "Dúvidas? Procure sempre se orientar primeiro pelo site <strong>musica.ufmg.br/ppgmus</strong>, para não sobrecarregar a equipe técnico-administrativa.",
              "<strong>Coordenação do Programa</strong>: Profa. Dra. Helena Lopes da Silva (Coordenadora) e Prof. Dr. José Henrique Padovani Velloso (Subcoordenador).",
              "<strong>Equipe da Secretaria</strong>: Ariálisson de Freitas Fonseca, Geralda Martins Moreira, Luciana Aparecida Criste e Thaiz Lazarini Roque Magalhães."
            ]
          },
          {
            "id": "0b",
            "kind": "concept",
            "title": "15 · Plataforma Sucupira e Censo da Pós-Graduação",
            "body": [
              "Cadastre-se também na <span class=\"rn\" data-tipo=\"highlight\" data-cor=\"#d9d2e9\">Plataforma Sucupira</span>, sistema da CAPES de coleta de dados de todos os Programas de Pós-Graduação do Brasil.",
              "É <span class=\"rn\" data-tipo=\"underline\" data-cor=\"#c0392b\">obrigatório</span> responder às solicitações da Coordenação para preenchimento do <strong>Censo da Pós-Graduação da CAPES</strong>, dentro do prazo indicado.",
              "A não resposta pode acarretar <span class=\"rn\" data-tipo=\"highlight\" data-cor=\"#f4cccc\">sanções ao PPGMUS</span> junto à CAPES — comprometendo, por exemplo, bolsas e auxílios de todo o Programa."
            ]
          }
        ]
      },
      {
        "id": "sec1-trajetoria",
        "title": "Trajetória Acadêmica",
        "resumo": "Duração, matrícula, estrutura curricular e aproveitamento de créditos (itens 1-4).",
        "slides": [
          {
            "id": "1a",
            "kind": "concept",
            "title": "1 · Duração do curso (mestrado e doutorado)",
            "body": [
              "<strong>Mestrado</strong>: integralização em, no mínimo, 1 ano e, no máximo, <span class=\"rn\" data-tipo=\"highlight\" data-cor=\"#c9daf8\">24 meses</span> a partir da primeira matrícula.",
              "<strong>Doutorado</strong>: integralização em, no mínimo, 2 anos e, no máximo, <span class=\"rn\" data-tipo=\"highlight\" data-cor=\"#c9daf8\">48 meses</span> a partir da primeira matrícula."
            ]
          },
          {
            "id": "1b",
            "kind": "concept",
            "title": "2 · Matrícula semestral obrigatória",
            "body": [
              "<strong>Matrícula</strong>: renovação <span class=\"rn\" data-tipo=\"underline\" data-cor=\"#0f6e8c\">semestral obrigatória</span> em minha.ufmg.br, com anuência do orientador — fique de olho no calendário!",
              "Pelas Normas Gerais da UFMG: <span class=\"rn\" data-tipo=\"highlight\" data-cor=\"#f4cccc\">\"será excluído do curso o aluno que deixar de renovar a matrícula\"</span> em cada período letivo."
            ]
          },
          {
            "id": "1c",
            "kind": "concept",
            "title": "3 · Estrutura curricular e créditos",
            "body": [
              "<strong>Créditos</strong>: Mestrado — 240h, <span class=\"rn\" data-tipo=\"underline\" data-cor=\"#0f6e8c\">16 créditos</span> (8 obrigatórias + 8 optativas). Doutorado — 360h, <span class=\"rn\" data-tipo=\"underline\" data-cor=\"#0f6e8c\">24 créditos</span> (16 obrigatórias + 8 optativas)."
            ]
          },
          {
            "id": "1d",
            "kind": "concept",
            "title": "4 · Aproveitamento de disciplina/crédito",
            "body": [
              "Com anuência do orientador, é possível aproveitar até <span class=\"rn\" data-tipo=\"highlight\" data-cor=\"#c9daf8\">6 créditos</span> cursados como disciplina isolada em outro PPG stricto sensu.",
              "Doutorandos também podem requerer o aproveitamento/revalidação de créditos já cursados no mestrado.",
              "Em ambos os casos: formulário específico + ementas + comprovação de nota, para análise do <strong>Colegiado do Programa</strong>."
            ]
          }
        ]
      },
      {
        "id": "sec2-financiamento",
        "title": "Financiamento",
        "resumo": "Auxílio financeiro para eventos/campo e bolsas de estudo do Programa (itens 5-6).",
        "slides": [
          {
            "id": "2a",
            "kind": "concept",
            "title": "5 · Auxílio financeiro",
            "body": [
              "<strong>Auxílio financeiro</strong> (com anuência do orientador): custeia apresentação de trabalho em eventos científicos ou trabalho de campo.",
              "Passos: formulário específico → envio por e-mail em DOC → documentação de apoio em PDF (comprovante de matrícula, carta de aceite, resumo, programação do evento) → assinatura posterior via SEI."
            ]
          },
          {
            "id": "2b",
            "kind": "concept",
            "title": "6 · Bolsas de estudo",
            "body": [
              "A cada ano, o PPGMUS abre uma <strong>Chamada de Bolsas</strong> própria — inscrição obrigatória mesmo para quem já é bolsista e quer manter o benefício.",
              "Critérios (Comissão de Bolsas do PPGMUS, Resolução nº 08/2023 do CEPE/UFMG): prioridade para <span class=\"rn\" data-tipo=\"highlight\" data-cor=\"#d9ead3\">vulnerabilidade socioeconômica</span> combinada com <span class=\"rn\" data-tipo=\"underline\" data-cor=\"#ad1457\">ações afirmativas</span> — depois, cada critério isoladamente: maternidade/parentalidade, nota do processo seletivo, antiguidade, idade.",
              "Candidatos/as com atividade remunerada concorrem com <span class=\"rn\" data-tipo=\"underline\" data-cor=\"#c0392b\">prioridade mínima</span>.",
              "Inscrição só pelo formulário online da Chamada vigente, com prazo <span class=\"rn\" data-tipo=\"highlight\" data-cor=\"#f4cccc\">impreterível</span> — fique de olho na Chamada do ano.",
              "Análise socioeconômica pela Fump é <strong>facultativa</strong>, mas dá prioridade por vulnerabilidade — tem prazos próprios, verifique a Chamada vigente.",
              "Inscrever-se <span class=\"rn\" data-tipo=\"underline\" data-cor=\"#c0392b\">não garante</span> bolsa: critérios, concessão e alocação são sempre decisão do PPGMUS. E atenção — as normas gerais da UFMG para bolsas seguem em <strong>constante revisão</strong> pela Administração Central."
            ]
          }
        ]
      },
      {
        "id": "sec3-marcos",
        "title": "Marcos da Formação",
        "resumo": "Estágio-docência, 2ª língua, recital, qualificação, portfólio e defesa (itens 7-12).",
        "slides": [
          {
            "id": "3a",
            "kind": "concept",
            "title": "7 · Estágio-docência",
            "body": [
              "<strong>Estágio-docência</strong> (obrigatório para todos os bolsistas): <span class=\"rn\" data-tipo=\"highlight\" data-cor=\"#c9daf8\">1 semestre</span> para mestrandos, <span class=\"rn\" data-tipo=\"highlight\" data-cor=\"#c9daf8\">2 semestres</span> para doutorandos.",
              "Professores de ensino superior, ou de ensino médio público em articulação com a UFMG, podem solicitar dispensa."
            ]
          },
          {
            "id": "3b",
            "kind": "concept",
            "title": "8 · Proficiência em 2ª língua estrangeira",
            "body": [
              "<strong>2ª língua estrangeira</strong>: comprovante de proficiência no prazo estipulado pelo edital de seleção, se ainda não enviado na inscrição.",
              "Estrangeiros selecionados: comprovar <span class=\"rn\" data-tipo=\"underline\" data-cor=\"#c0392b\">proficiência em português</span> (Celpe-Bras ou equivalente) em até 12 meses (mestrado) ou 24 meses (doutorado)."
            ]
          },
          {
            "id": "3c",
            "kind": "concept",
            "title": "9 · Recital de Prática Instrumental Avançada II",
            "body": [
              "<strong>Recital de Prática Instrumental Avançada II</strong> (só doutorandos da linha Performance Musical): banca com o orientador e mais dois doutores, um deles externo ao Programa."
            ]
          },
          {
            "id": "3d",
            "kind": "concept",
            "title": "10 · Exame de Qualificação",
            "body": [
              "<strong>Exame de Qualificação</strong> — Mestrado: agendar até o <span class=\"rn\" data-tipo=\"underline\" data-cor=\"#c0392b\">final do 3º semestre</span> de curso.",
              "<strong>Exame de Qualificação</strong> — Doutorado: agendar até o <span class=\"rn\" data-tipo=\"underline\" data-cor=\"#c0392b\">final do 3º ano</span>, com 30 dias de antecedência; banca de 3 membros titulares, um deles externo à UFMG."
            ]
          },
          {
            "id": "3e",
            "kind": "concept",
            "title": "11 · Portfólio de produção intelectual",
            "body": [
              "<strong>Portfólio de produção intelectual</strong> (só doutorado): equivalente a <span class=\"rn\" data-tipo=\"highlight\" data-cor=\"#c9daf8\">4 créditos</span>, avaliado pela mesma banca do exame de qualificação."
            ]
          },
          {
            "id": "3f",
            "kind": "concept",
            "title": "12 · Defesa de Dissertação/Tese",
            "body": [
              "<strong>Defesa de Dissertação</strong> (Mestrado): agendar na Secretaria com <span class=\"rn\" data-tipo=\"highlight\" data-cor=\"#f4cccc\">30 dias</span> de antecedência e anuência do orientador.",
              "<strong>Defesa de Tese</strong> (Doutorado): agendar na Secretaria com <span class=\"rn\" data-tipo=\"highlight\" data-cor=\"#f4cccc\">45 dias</span> de antecedência e anuência do orientador."
            ]
          }
        ]
      },
      {
        "id": "sec4-pdse",
        "title": "Doutorado Sanduíche (PDSE)",
        "resumo": "Bolsa CAPES/PDSE para estágio no exterior (item 13).",
        "slides": [
          {
            "id": "4a",
            "kind": "concept",
            "title": "13 · Doutorado sanduíche (PDSE)",
            "body": [
              "Doutorandos interessados em estágio no exterior com <span class=\"rn\" data-tipo=\"highlight\" data-cor=\"#d9ead3\">Bolsa CAPES/PDSE</span> devem acompanhar as Chamadas Internas da PRPG (CAPES-PRINT).",
              "O <strong>certificado de proficiência em língua estrangeira</strong> é documento obrigatório para formalizar a candidatura — não deixe para última hora.",
              "Alternativa: <span class=\"rn\" data-tipo=\"underline\" data-cor=\"#1b5e20\">Bolsa CNPq/SWE</span>, que pode ser solicitada em fluxo contínuo diretamente na agência."
            ]
          }
        ]
      }
    ]
  }
};
