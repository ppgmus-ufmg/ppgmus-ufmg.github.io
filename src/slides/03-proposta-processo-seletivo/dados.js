// dados.js: conteúdo do deck "Proposta: Processo Seletivo 2027"
// (José Henrique Padovani, 4º Fórum COMAPE). Mesmo formato de dados.js de
// ../01-quadrienal-25-28/ (const DECK = {...}), consumido por index.html
// nesta mesma pasta.
const DECK = {
  "deck": {
    "title": "Proposta: Processo Seletivo 2027",
    "subtitle": "Diretrizes e síntese da proposta",
    "autores": "José Henrique Padovani",
    "ano": "2026",
    "data": "26 de agosto de 2026",
    "local": "Belo Horizonte/MG",
    "sections": [
      {
        "id": "sec1-diretrizes",
        "title": "Diretrizes gerais",
        "slides": [
          {
            "id": "1",
            "kind": "concept",
            "title": "Diretrizes gerais",
            "body": [
              "<strong>Manter o formato remoto</strong>: preserva e amplia o alcance nacional e latino-americano de inscritos, seguindo a diretriz da CAPES de reduzir assimetrias regionais e intrarregionais.",
              "<strong>Retirar a prova escrita</strong>: dificuldades operacionais (remoto e presencial), risco de uso de IA e baixo impacto real na pontuação diante das demais provas. Experiência já testada com sucesso na USP.",
              "<strong>Incluir portfólio por linha</strong>: cada linha define tipo e quantidade de produções aceitas, como produção artística, textos publicados (inclusive TCC) e outros materiais relevantes.",
              "<strong>Retirar a carta de intenção</strong>: com o pré-projeto anexo e obrigatoriamente anônimo, a carta cria mais problema do que solução e não cumpre bem o papel de verificar a aderência.",
              "<strong>Pré-projeto via formulário</strong> (não mais PDF anexo): reduz os problemas do anonimato obrigatório e uniformiza o material entregue às bancas.",
              "<strong>Primeira fase documental, segunda fase de arguições</strong>: simplifica o cronograma, já que o anonimato do pré-projeto exige a avaliação documental completa antes de qualquer arguição.",
              "<strong>Primeira fase eliminatória só pela média ponderada</strong> (não por prova isolada): evita que um único componente fraco elimine automaticamente um/a candidato/a, dando peso proporcional a cada prova."
            ]
          }
        ]
      },
      {
        "id": "sec2-sintese",
        "title": "Síntese da proposta",
        "slides": [
          {
            "id": "2.1",
            "kind": "phase-table",
            "title": "Estrutura da seleção: duas fases",
            "fases": [
              {
                "nome": "Fase 1 · Documental (eliminatória pela média ponderada)",
                "provas": [
                  { "cod": "Prova 1", "label": "Currículo/Histórico", "peso": "15 a 25%", "descricao": "Campos obrigatórios em formulário próprio." },
                  { "cod": "Prova 2", "label": "Pré-projeto anônimo/codificado", "peso": "15 a 25%", "descricao": "Escrito em formulário (não PDF anexo), com campos por seção." },
                  { "cod": "Prova 3", "label": "Portfólio", "peso": "50 a 70%", "descricao": "Tipo e quantidade de produções definidos por cada linha de pesquisa." }
                ]
              },
              {
                "nome": "Fase 2 · Arguição",
                "provas": [
                  { "cod": "Prova 4", "label": "Arguição (20 a 30 min)", "peso": "compõe a nota final", "descricao": "Cobre o projeto proposto e a bibliografia indicada pela linha." }
                ]
              }
            ]
          },
          {
            "id": "2.2",
            "kind": "cronograma-table",
            "title": "Cronograma proposto",
            "etapas": [
              { "periodo": "Fevereiro a março", "etapa": "Inscrições" },
              { "periodo": "1ª quinzena de abril", "etapa": "Primeira fase: avaliação pelas bancas" },
              { "periodo": "2ª quinzena de abril", "etapa": "Recursos da primeira fase" },
              { "periodo": "1ª quinzena de maio", "etapa": "Segunda fase: arguições" },
              { "periodo": "2ª quinzena de maio", "etapa": "Resultado e recursos da segunda fase" },
              { "periodo": "Junho", "etapa": "Resultado final" }
            ]
          },
          {
            "id": "2.3",
            "kind": "changes",
            "title": "Pontos em aberto",
            "consideracoes": [
              "<strong>Nota final</strong>: média ponderada de todas as provas (pesos a definir), mantendo a proporcionalidade das fases. O objetivo é uniformizar a seleção e dar peso real ao portfólio, e não apenas ao pré-projeto e ao currículo.",
              "Seria desejável usar os <strong>mesmos pesos e o mesmo cálculo para todas as linhas</strong>, para não recriar a fragmentação do edital por linha à qual o modelo atual levou.",
              "Pesos diferenciados para o <strong>doutorado</strong>? Currículo/histórico como visão geral do percurso formativo e ênfase na produção, mais focada na qualidade que na quantidade? Ou usamos os mesmos pesos do mestrado?",
              "Quais as consequências de cada peso? Ex: <mark>projetos ruins</mark> ou potencialmente escritos por outrem, <mark>portfólios fortes com projeto fraco</mark>, entre outras combinações possíveis?",
              "Retirar as fases tornaria o processo mais equilibrado, sem eliminação por etapa, mas aumentaria a carga de trabalho e a insatisfação docente em linhas de alta demanda (Performance Musical e Educação Musical). Vale a pena ou não?",
              "Os <strong>pesos finais das 4 provas</strong> ainda não estão definidos e seguem em aberto para discussão."
            ]
          }
        ]
      }
    ]
  }
};
