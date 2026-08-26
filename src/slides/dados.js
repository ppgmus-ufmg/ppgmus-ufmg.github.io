// dados.js — conteúdo do deck, convertido de
// 01_4o-forum_slide1_avaliacao_quadrienios.json (mesmo conteúdo de dados,
// sem alterações — ver esse .json/.md para as fontes de cada dado). Os
// campos title/subtitle/autores/data/local abaixo são só do slide de
// título desta apresentação específica, não vêm do JSON de origem.
const DECK = {
  "deck": {
    "title": "A avaliação do PPGMUS no contexto da CAPES",
    "subtitle": "",
    "autores": "José Henrique Padovani e Helena Lopes",
    "ano": "2026",
    "linkPublicacao": "[inserir link após publicação]",
    "data": "26 de agosto de 2026",
    "local": "Belo Horizonte/MG",
    "sections": [
      {
        "id": "sec1-mecanica",
        "title": "Como funciona a Avaliação de Permanência",
        "resumo": "O ciclo avaliativo e como a nota final é formada.",
        "slides": [
          {
            "id": "1.1",
            "kind": "concept",
            "title": "O ciclo avaliativo e como a nota é formada",
            "body": [
              "Dois processos: <mark>Avaliação de Entrada</mark> (APCN, cursos novos) e <mark>Avaliação de Permanência</mark> (programas em funcionamento).",
              "Ciclos de <strong>4 anos</strong>: dados enviados todo ano via <strong>Plataforma Sucupira</strong>, consolidados e julgados só ao final, na <mark>Avaliação Quadrienal</mark>.",
              "É <strong>comparativo</strong>: a nota de um PPG existe em relação ao desempenho do conjunto de programas da mesma área no ciclo.",
              "Na Ficha de Avaliação, <strong>3 Quesitos</strong>: <mark data-color=\"marrom\">Programa</mark>, <mark data-color=\"azul\">Formação e Produção Intelectual</mark> e <mark data-color=\"grafite\">Impacto</mark>.",
              "Cada Quesito recebe um conceito em <strong>escala de 5 níveis</strong>: <strong>Muito Bom</strong>, Bom, Regular, Fraco, Insuficiente.",
              "Os 3 conceitos se combinam (não é média simples) numa <mark>nota final de 1 a 7</mark>. O <strong>Quesito 2 (Formação)</strong> é decisivo: sem <strong>Muito Bom</strong> ali, a nota não passa de <strong>4</strong>."
            ],
            "source": "Diretrizes Comuns 2025-2028 — Processos avaliativos; Unidade de análise; Metodologia de avaliação"
          },
          {
            "id": "1.2",
            "kind": "concept",
            "title": "O conceito da CAPES, na prática",
            "body": [
              "Nota <strong>1</strong> ou <strong>2</strong>: <strong>descredenciamento</strong> do curso.",
              "Nota <strong>3 a 5</strong>: credenciado, em nível crescente de qualidade.",
              "Na Música, as notas se concentram em <strong>4</strong> e <strong>5</strong>: 8 programas com nota 4, 5 com 5, 2 com 6 e 2 com 7.",
              {
                "text": "Nota <strong>6</strong> ou <strong>7</strong>: <strong>excelência</strong>, que migra ao <mark>PROEX</mark> (Programa de Excelência Acadêmica)",
                "sub": [
                  {
                    "text": "<strong>Benefícios</strong>",
                    "sub": [
                      "<mark>Autonomia orçamentária</mark> e de gestão (verba direta, agilidade, APC).",
                      "<mark>Cota maior de bolsas</mark> (M/D/PD), blindadas de cortes.",
                      "<mark data-color=\"ciano\">Internacionalização</mark> facilitada (prioridade no CNPq, FAPs e editais)."
                    ]
                  },
                  {
                    "text": "<strong>Obrigações</strong>",
                    "sub": [
                      "<mark data-color=\"ciano\">Internacionalização</mark> e visibilidade globais.",
                      "<mark>Solidariedade entre programas</mark>: apoiar programas em consolidação (cooperação, nucleação, MINTER/DINTER).",
                      {
                        "text": "<mark>ODS</mark>: aderência aos 17 Objetivos de Desenvolvimento Sustentável",
                        "sub": [
                          "<strong>Mapeamento</strong> (Sucupira): classificar produção e projetos por ODS.",
                          "<strong>Casos de impacto</strong>: narrativas de como o conhecimento resolve problemas reais.",
                          "<strong>Planejamento e autoavaliação</strong>: metas e indicadores de sustentabilidade e diversidade.",
                          "<strong>Ações afirmativas e inclusão</strong>: cotas, equidade de gênero, extensão e divulgação acessível."
                        ]
                      },
                      "<mark>Ciência aberta</mark>: transparência e abertura da produção."
                    ]
                  }
                ]
              },

            ],
            "source": "Diretrizes Comuns 2025-2028 — A Avaliação da Pós-Graduação; Objetivos da avaliação + Panorama da Pesquisa em Música no Brasil"
          }
        ]
      },
      {
        "id": "sec2-ficha-21-24",
        "title": "Ficha 2021-2024 — pesos por quesito (Programas Acadêmicos)",
        "resumo": "Os três quesitos da ficha anterior e seus pesos internos.",
        "slides": [
          {
            "id": "2.1",
            "kind": "weight-table",
            "title": "Os três quesitos e seus pesos internos",
            "source": "ArtesFicha.md — Resumo Geral, coluna Acadêmico",
            "data": {
              "quesitos": [
                {
                  "cod": 1,
                  "nome": "Programa",
                  "itens": [
                    { "cod": "1.1", "label": "Articulação, currículo e infraestrutura", "peso": 40, "descricao": "Articulação, aderência e atualização das áreas de concentração, linhas de pesquisa, projetos em andamento e estrutura curricular, bem como a infraestrutura disponível, em relação aos objetivos, missão e modalidade do programa." },
                    { "cod": "1.2", "label": "Perfil do corpo docente", "peso": 30, "descricao": "Perfil do corpo docente, e sua compatibilidade e adequação à Proposta do Programa." },
                    { "cod": "1.3", "label": "Planejamento estratégico", "peso": 20, "descricao": "Planejamento estratégico do programa, considerando também articulações com o planejamento estratégico da instituição, com vistas à gestão do seu desenvolvimento futuro, adequação e melhorias da infraestrutura e melhor formação de seus alunos, vinculada à produção intelectual — bibliográfica, técnica e/ou artística — e ainda às políticas afirmativas de inclusão, permanência e acessibilidade." },
                    { "cod": "1.4", "label": "Autoavaliação", "peso": 10, "descricao": "Os processos, procedimentos e resultados da autoavaliação do programa, com foco na formação discente e produção intelectual." }
                  ]
                },
                {
                  "cod": 2,
                  "nome": "Formação",
                  "itens": [
                    { "cod": "2.1", "label": "Teses e dissertações", "peso": 25, "descricao": "Qualidade e adequação das teses, dissertações ou equivalente em relação às áreas de concentração e linhas de pesquisa do programa." },
                    { "cod": "2.2", "label": "Produção de discentes e egressos", "peso": 20, "descricao": "Qualidade da produção intelectual de discentes e egressos." },
                    { "cod": "2.3", "label": "Destino dos egressos", "peso": 15, "descricao": "Destino, atuação e avaliação dos egressos do programa em relação à formação recebida." },
                    { "cod": "2.4", "label": "Produção do corpo docente", "peso": 20, "descricao": "Qualidade das atividades de pesquisa e da produção intelectual do corpo docente no programa." },
                    { "cod": "2.5", "label": "Envolvimento docente na formação", "peso": 20, "descricao": "Qualidade e envolvimento do corpo docente em relação às atividades de formação no programa." }
                  ]
                },
                {
                  "cod": 3,
                  "nome": "Impacto na sociedade",
                  "itens": [
                    { "cod": "3.1", "label": "Impacto e inovação da produção", "peso": 30, "descricao": "Impacto e caráter inovador da produção intelectual em função da natureza do programa." },
                    { "cod": "3.2", "label": "Impacto econômico, social e cultural", "peso": 40, "descricao": "Impacto econômico, social e cultural do programa." },
                    { "cod": "3.3", "label": "Internacionalização, inserção e visibilidade", "peso": 30, "descricao": "Internacionalização, inserção (local, regional, nacional) e visibilidade do programa." }
                  ]
                }
              ]
            }
          }
        ]
      },
      {
        "id": "sec3-avaliacao-recebida",
        "title": "Como fomos avaliados — PPGMUS-UFMG, quadriênio 2021-2024",
        "resumo": "O resultado real do PPGMUS-UFMG no quadriênio: nota 6.",
        "slides": [
          {
            "id": "3.1",
            "kind": "evaluation-table",
            "title": "Quesito 1 · Programa",
            "conceito_quesito": "MB",
            "itens": [
              { "cod": "1.1", "label": "Articulação, currículo e infraestrutura", "peso": 40, "conceito": "MB", "descricao": "Articulação, aderência e atualização das áreas de concentração, linhas de pesquisa, projetos em andamento e estrutura curricular, bem como a infraestrutura disponível, em relação aos objetivos, missão e modalidade do programa." },
              { "cod": "1.2", "label": "Perfil do corpo docente", "peso": 30, "conceito": "MB", "descricao": "Perfil do corpo docente, e sua compatibilidade e adequação à Proposta do Programa." },
              { "cod": "1.3", "label": "Planejamento estratégico", "peso": 20, "conceito": "MB", "descricao": "Planejamento estratégico do programa, considerando também articulações com o planejamento estratégico da instituição, com vistas à gestão do seu desenvolvimento futuro, adequação e melhorias da infraestrutura e melhor formação de seus alunos, vinculada à produção intelectual — bibliográfica, técnica e/ou artística — e ainda às políticas afirmativas de inclusão, permanência e acessibilidade." },
              { "cod": "1.4", "label": "Autoavaliação", "peso": 10, "conceito": "MB", "descricao": "Os processos, procedimentos e resultados da autoavaliação do programa, com foco na formação discente e produção intelectual." }
            ],
            "destaques": [
              "46 docentes ao longo do quadriênio (36 permanentes + 10 colaboradores); 33 permanentes + 6 colaboradores em 2024.",
              "84,62% de docentes permanentes (exigência mínima da área: 70%).",
              "19 docentes com experiência internacional (sanduíche/pleno, pós-doutorado, cooperação).",
              "Autoavaliação com comissão própria e assessoria de membro externo."
            ],
            "source": "ficha_recomendacao_32001010058P9.md — Quesito 1, publicado 12/01/2026"
          },
          {
            "id": "3.2",
            "kind": "evaluation-table",
            "title": "Quesito 2 · Formação",
            "conceito_quesito": "MB",
            "itens": [
              { "cod": "2.1", "label": "Teses e dissertações", "peso": 25, "conceito": "MB", "descricao": "Qualidade e adequação das teses, dissertações ou equivalente em relação às áreas de concentração e linhas de pesquisa do programa." },
              { "cod": "2.2", "label": "Produção de discentes e egressos", "peso": 20, "conceito": "MB", "descricao": "Qualidade da produção intelectual de discentes e egressos." },
              { "cod": "2.3", "label": "Destino dos egressos", "peso": 15, "conceito": "MB", "descricao": "Destino, atuação e avaliação dos egressos do programa em relação à formação recebida." },
              { "cod": "2.4", "label": "Produção do corpo docente", "peso": 20, "conceito": "MB", "descricao": "Qualidade das atividades de pesquisa e da produção intelectual do corpo docente no programa." },
              { "cod": "2.5", "label": "Envolvimento docente na formação", "peso": 20, "conceito": "MB", "descricao": "Qualidade e envolvimento do corpo docente em relação às atividades de formação no programa." }
            ],
            "destaques": [
              "272 discentes matriculados, 178 titulados no quadriênio.",
              "281 produtos destacados: 93 artísticos, 75 artigos, 59 em anais, 29 livros/capítulos, 25 técnicos.",
              "50% da produção destacada é de discentes/egressos — cumprindo a recomendação da área.",
              "28 de 36 docentes permanentes (77,8%) com produção qualificada.",
              "3 dos 5 TCC destacados foram premiados (1 institucional + 2 Menções Honrosas do Prêmio CAPES de Teses)."
            ],
            "source": "ficha_recomendacao_32001010058P9.md — Quesito 2, publicado 12/01/2026"
          },
          {
            "id": "3.3",
            "kind": "evaluation-table",
            "title": "Quesito 3 · Impacto na sociedade",
            "conceito_quesito": "MB",
            "itens": [
              { "cod": "3.1", "label": "Impacto e inovação da produção", "peso": 30, "conceito": "MB", "descricao": "Impacto e caráter inovador da produção intelectual em função da natureza do programa." },
              { "cod": "3.2", "label": "Impacto econômico, social e cultural", "peso": 40, "conceito": "MB", "descricao": "Impacto econômico, social e cultural do programa." },
              { "cod": "3.3", "label": "Internacionalização, inserção e visibilidade", "peso": 30, "conceito": "MB", "descricao": "Internacionalização, inserção (local, regional, nacional) e visibilidade do programa." }
            ],
            "destaques": [
              "18 pontos no total (10 PCA + 8 PDDP).",
              "Cotutela internacional em atividade; redes com Alemanha, Canadá, Estados Unidos, França, Portugal e Suíça.",
              "Site do programa disponível em inglês e espanhol.",
              "Ressalva da comissão: \"O relatório não apresenta, no item visibilidade, outras formas de difusão das atividades que realiza.\""
            ],
            "source": "ficha_recomendacao_32001010058P9.md — Quesito 3, publicado 12/01/2026"
          },
          {
            "id": "3.4",
            "kind": "summary",
            "title": "Síntese: Nota 6",
            "quesitos": [
              { "cod": 1, "nome": "Programa", "conceito": "MB" },
              { "cod": 2, "nome": "Formação", "conceito": "MB" },
              { "cod": 3, "nome": "Impacto", "conceito": "MB" }
            ],
            "nota": 6,
            "body": [
              "Excelência, ratificada pelo Conselho Técnico-Científico da Educação Superior (CTC-ES) na 240ª reunião.",
              "Todos os 12 itens da ficha, sem exceção, receberam Muito Bom."
            ],
            "source": "ficha_recomendacao_32001010058P9.md — Parecer do Conselho Técnico-Científico da Educação Superior sobre o mérito da proposta"
          },
          {
            "id": "3.5",
            "kind": "chart",
            "title": "Variação de nota na Música (2017–2020 → 2021–2024)",
            "figura": "variacao",
            "source": "Plataforma Sucupira — Avaliação Quadrienal 2025"
          },
          {
            "id": "3.6",
            "kind": "chart",
            "title": "Onde cada programa está no país",
            "figura": "percentil",
            "source": "Plataforma Sucupira — Avaliação Quadrienal 2025"
          },
          {
            "id": "3.7",
            "kind": "chart",
            "title": "Distribuição de notas: Música vs. Artes vs. Geral",
            "figura": "distribuicao",
            "source": "Plataforma Sucupira — Avaliação Quadrienal 2025"
          }
        ]
      },
      {
        "id": "sec-producao-21-24",
        "title": "Nossa produção - 2021-24",
        "resumo": "Um retrato da produção do programa: livros, artigos, produções artísticas e técnicas.",
        "slides": [
          {
            "id": "3b.1",
            "kind": "concept",
            "title": "Produção classificada no quadriênio",
            "body": [
              "Total de <strong>471 produções classificadas</strong> em estrato Qualis entre 2021 e 2024.",
              "Por tipo: <strong>artigos em periódicos</strong> 142 (30,1%), <strong>trabalhos em eventos</strong> 110 (23,4%), <strong>produções artísticas</strong> 101 (21,4%), <strong>produções técnicas</strong> 71 (15,1%) e <strong>livros/capítulos</strong> 47 (10,0%)."
            ]
          },
          {
            "id": "3b.1b",
            "kind": "data-table",
            "title": "Evolução ano a ano",
            "table": {
              "headers": ["Ano", "Periódicos", "Livros", "Eventos", "Técnicas", "Artísticas", "Total"],
              "rows": [
                ["2021", "27", "11", "28", "18", "12", "96"],
                ["2022", "38", "9", "21", "4", "21", "93"],
                ["2023", "38", "17", "29", "17", "31", "132"],
                ["2024", "39", "10", "32", "32", "37", "150"]
              ]
            },
            "nota": "Crescimento de <strong>56%</strong> entre 2021 e 2024 (96 → 150), com salto especialmente em 2023–2024. Coerente com o relatório do programa e com a leitura da comissão de que o PPG \"atende de forma expressiva seus objetivos de formação, com produção intelectual acima da média da área\"."
          },
          {
            "id": "3b.2",
            "kind": "chart",
            "title": "Artigos em periódicos: distribuição por estrato",
            "figura": "producaoPeriodicos"
          },
          {
            "id": "3b.3",
            "kind": "chart",
            "title": "Trabalhos em eventos: concentração em A2",
            "figura": "producaoEventos"
          },
          {
            "id": "3b.4",
            "kind": "chart",
            "title": "Produções artísticas: estratos médios-altos",
            "figura": "producaoArtisticas"
          },
          {
            "id": "3b.5",
            "kind": "chart",
            "title": "Produções técnicas: quase 2/3 sem estrato",
            "figura": "producaoTecnicas"
          },
          {
            "id": "3b.6",
            "kind": "chart",
            "title": "Livros e capítulos",
            "figura": "producaoLivros"
          },
          {
            "id": "3b.7",
            "kind": "chart",
            "title": "Destaques de docentes (PDDP): conceitos",
            "figura": "producaoDestaques"
          },
          {
            "id": "3b.9",
            "kind": "changes",
            "title": "Pontos de atenção",
            "consideracoes": [
              "<mark data-color=\"amarelo\">Produção de discentes/egressos</mark>: poucas produções estão vinculadas ao trabalho final (tese/dissertação). Precisamos melhorar nesse aspecto, inclusive na <mark data-color=\"azul\">produção em coautoria docente/discente</mark>.",
              "<mark data-color=\"azul\">Produção técnica</mark>: tem sido fraca, com cerca de 2/3 dos itens sem estrato.",
              "<mark data-color=\"azul\">Eventos</mark>: concentrados em A2. Deve melhorar com a diversidade e a qualidade das iniciativas em curso.",
              "<mark data-color=\"azul\">Livros</mark>: 36% sem estrato, indicando que essa produção não tem sido o nosso forte em termos qualitativos.",
              "<mark data-color=\"azul\">Artigos em periódicos</mark>: relativa estagnação no número de publicações de 2022 a 2024."
            ]
          }
        ]
      },
      {
        "id": "sec4-comparacao",
        "title": "A nova ficha de avaliação e o que mudou",
        "resumo": "Quesito a quesito, o que subiu, caiu, se fundiu ou migrou entre as fichas.",
        "slides": [
          {
            "id": "4.1",
            "kind": "legend",
            "title": "Como ler o diagrama",
            "body": [
              "Nó à esquerda (cinza) = item 2021-2024, com peso original. Nó à direita (laranja) = item 2025-2028 com peso novo.",
              "Fita afunilada = variação entre peso herdado e peso atribuído (enxugamento ou expansão deliberados pela CAPES).",
              "Dois nós à esquerda no mesmo nó à direita = fusão de itens antigos em um único item novo.",
              "Um nó apontando para fora ou afunilando a zero = migração de conteúdo entre quesitos diferentes."
            ]
          },
          {
            "id": "4.2",
            "kind": "sankey",
            "title": "Quesito 1 · Programa",
            "source": "ArtesFicha.md + 25-28_CAPES_ficha_avaliação.md — comparação de pesos",
            "quesito": 1,
            "nodes_old": [
              { "id": "21-24 · 1.1 Currículo e infraestrutura", "peso": 40, "descricao": "Articulação, aderência e atualização das áreas de concentração, linhas de pesquisa, projetos em andamento e estrutura curricular, bem como a infraestrutura disponível, em relação aos objetivos, missão e modalidade do programa." },
              { "id": "21-24 · 1.2 Perfil do corpo docente", "peso": 30, "descricao": "Perfil do corpo docente, e sua compatibilidade e adequação à Proposta do Programa." },
              { "id": "21-24 · 1.3 Planejamento estratégico", "peso": 20, "descricao": "Planejamento estratégico do programa, considerando também articulações com o planejamento estratégico da instituição, com vistas à gestão do seu desenvolvimento futuro, adequação e melhorias da infraestrutura e melhor formação de seus alunos, vinculada à produção intelectual — bibliográfica, técnica e/ou artística — e ainda às políticas afirmativas de inclusão, permanência e acessibilidade." },
              { "id": "21-24 · 1.4 Autoavaliação", "peso": 10, "tituloUnificado": "Autoavaliação", "descricao": "Os processos, procedimentos e resultados da autoavaliação do programa, com foco na formação discente e produção intelectual." }
            ],
            "nodes_new": [
              { "id": "25-28 · 1.1 Identidade e funcionamento", "peso": 60, "tag": "Fusão · 60% (era 70%)", "tagTipo": "fusao", "descricao": "<mark data-color=marrom>Identidade e condições de funcionamento do Programa</mark>: missão, corpo docente, infraestrutura, <mark data-color=marrom>articulação entre</mark> áreas de concentração, <mark data-color=marrom>linhas/projetos de pesquisa e estrutura curricular</mark>." },
              { "id": "25-28 · 1.2 Autoavaliação", "peso": 20, "tituloUnificado": "Autoavaliação", "tag": "Piso CTC-ES · 20% (era 10%)", "tagTipo": "piso", "descricao": "<mark data-color=indigo>Princípios, procedimentos e usos dos resultados da autoavaliação alinhados ao planejamento estratégico</mark> do Programa." },
              { "id": "25-28 · 1.3 Planejamento + equidade", "peso": 20, "tag": "Novo: Equidade obrigatória", "tagTipo": "destaque", "descricao": "<mark data-color=indigo>Planejamento estratégico do Programa em articulação com o Plano de Desenvolvimento Institucional</mark> ou equivalente, incluindo <mark data-color=rosa>as políticas afirmativas e de promoção de equidade</mark>." }
            ],
            "links": [
              { "source": "21-24 · 1.1 Currículo e infraestrutura", "target": "25-28 · 1.1 Identidade e funcionamento", "value": 40 },
              { "source": "21-24 · 1.2 Perfil do corpo docente", "target": "25-28 · 1.1 Identidade e funcionamento", "value": 30 },
              { "source": "21-24 · 1.4 Autoavaliação", "target": "25-28 · 1.2 Autoavaliação", "value": 10 },
              { "source": "21-24 · 1.3 Planejamento estratégico", "target": "25-28 · 1.3 Planejamento + equidade", "value": 20 }
            ]
          },
          {
            "id": "4.3",
            "kind": "sankey",
            "title": "Quesito 2 · Formação e produção intelectual",
            "source": "ArtesFicha.md + 25-28_CAPES_ficha_avaliação.md — comparação de pesos",
            "quesito": 2,
            "nodes_old": [
              { "id": "21-24 · 2.1 Teses e dissertações", "peso": 25, "descricao": "Qualidade e adequação das teses, dissertações ou equivalente em relação às áreas de concentração e linhas de pesquisa do programa." },
              { "id": "21-24 · 2.2 Produção de discentes/egressos", "peso": 20, "tituloUnificado": "Produção de discentes e egressos", "descricao": "Qualidade da produção intelectual de discentes e egressos." },
              { "id": "21-24 · 2.3 Destino dos egressos", "peso": 15, "tituloUnificado": "Trajetória de egressos", "descricao": "Destino, atuação e avaliação dos egressos do programa em relação à formação recebida." },
              { "id": "21-24 · 2.4 Produção do corpo docente", "peso": 20, "descricao": "Qualidade das atividades de pesquisa e da produção intelectual do corpo docente no programa." },
              { "id": "21-24 · 2.5 Envolvimento docente na formação", "peso": 20, "tag": "Migra para o Q1", "tagTipo": "migracao", "descricao": "Qualidade e envolvimento do corpo docente em relação às atividades de formação no programa." }
            ],
            "nodes_new": [
              { "id": "25-28 · 2.1 Teses e dissertações", "peso": 25, "tag": "Mantém 25%", "tagTipo": "destaque", "descricao": "<mark data-color=azul>Qualidade das teses, dissertações</mark> ou equivalentes e <mark data-color=marrom>adequação às</mark> áreas de concentração e <mark data-color=marrom>linhas de pesquisa</mark> do Programa." },
              { "id": "25-28 · 2.2 Egressos", "peso": 25, "tituloUnificado": "Trajetória de egressos", "tag": "Expansão · 25% (era 15%)", "tagTipo": "piso", "descricao": "<mark data-color=amarelo>Destino e atuação dos egressos</mark> do Programa em relação à formação recebida." },
              { "id": "25-28 · 2.3 Produção de discentes/egressos", "peso": 25, "tituloUnificado": "Produção de discentes e egressos", "tag": "Expansão · 25% (era 20%)", "tagTipo": "piso", "descricao": "Qualidade da <mark data-color=azul>produção intelectual</mark> de discentes e <mark data-color=amarelo>egressos</mark> do Programa." },
              { "id": "25-28 · 2.4 Produção do corpo docente", "peso": 25, "tag": "Expansão · 25% (era 20%)", "tagTipo": "piso", "descricao": "Qualidade das <mark data-color=azul>atividades de pesquisa e da produção intelectual</mark> do corpo docente do Programa." },
              { "id": "25-28 · 1.1.5 — dentro do Quesito 1", "peso": null, "nota": "migrou para o Quesito 1, item 1.1, subitem 1.1.5 [ver ficha]" }
            ],
            "links": [
              { "source": "21-24 · 2.1 Teses e dissertações", "target": "25-28 · 2.1 Teses e dissertações", "value": 25 },
              { "source": "21-24 · 2.3 Destino dos egressos", "target": "25-28 · 2.2 Egressos", "value": 15 },
              { "source": "21-24 · 2.2 Produção de discentes/egressos", "target": "25-28 · 2.3 Produção de discentes/egressos", "value": 20 },
              { "source": "21-24 · 2.4 Produção do corpo docente", "target": "25-28 · 2.4 Produção do corpo docente", "value": 20 },
              { "source": "21-24 · 2.5 Envolvimento docente na formação", "target": "25-28 · 1.1.5 — dentro do Quesito 1", "value": 20 }
            ]
          },
          {
            "id": "4.4",
            "kind": "sankey",
            "title": "Quesito 3 · Impacto",
            "source": "ArtesFicha.md + 25-28_CAPES_ficha_avaliação.md — comparação de pesos",
            "quesito": 3,
            "nodes_old": [
              { "id": "21-24 · 3.1 Impacto e inovação da produção", "peso": 30, "descricao": "Impacto e caráter inovador da produção intelectual em função da natureza do programa." },
              { "id": "21-24 · 3.2 Impacto econômico/social/cultural", "peso": 40, "descricao": "Impacto econômico, social e cultural do programa." },
              { "id": "21-24 · 3.3 Internacionalização/inserção/visibilidade", "peso": 30, "descricao": "Internacionalização, inserção (local, regional, nacional) e visibilidade do programa." }
            ],
            "nodes_new": [
              { "id": "25-28 · 3.1 Inserção e visibilidade", "peso": 40, "tag": "Expansão · 40% (era 30%)", "tagTipo": "piso", "descricao": "<mark data-color=\"ciano\">Inserção, visibilidade, popularização da ciência</mark>." },
              { "id": "25-28 · 3.2 Inovação e transferência", "peso": 30, "tag": "Mantém 30%", "tagTipo": "destaque", "descricao": "<mark data-color=\"lima\">Inovação, transferência e compartilhamento de conhecimento</mark>." },
              { "id": "25-28 · 3.3 Impactos para a sociedade", "peso": 30, "tag": "Redução · 30% (era 40%)", "tagTipo": "fusao", "descricao": "<mark data-color=\"grafite\">Impactos do Programa para a sociedade</mark>." }
            ],
            "links": [
              { "source": "21-24 · 3.1 Impacto e inovação da produção", "target": "25-28 · 3.2 Inovação e transferência", "value": 30 },
              { "source": "21-24 · 3.2 Impacto econômico/social/cultural", "target": "25-28 · 3.3 Impactos para a sociedade", "value": 30 },
              { "source": "21-24 · 3.2 Impacto econômico/social/cultural", "target": "25-28 · 3.1 Inserção e visibilidade", "value": 10 },
              { "source": "21-24 · 3.3 Internacionalização/inserção/visibilidade", "target": "25-28 · 3.1 Inserção e visibilidade", "value": 30 }
            ]
          },
          {
            "id": "4.4b",
            "kind": "changes",
            "title": "Mudanças e Análise: Visão Geral",
            "source": "ficha_recomendacao_32001010058P9.md, Quesitos 1–3, publicado 12/01/2026",
            "consideracoes": [
              "No Quesito 1 (Programa), o <mark data-color=\"marrom\">núcleo de identidade e estrutura</mark> perde peso relativo, de <strong>70% para 60%</strong>. Ele passa a reunir currículo, perfil docente e também o envolvimento docente que migrou do Quesito 2; mesmo absorvendo mais dimensões num único item, vale menos.",
              "Quase todo o peso liberado nessa fusão migra para a <mark data-color=\"indigo\">Autoavaliação</mark>, que dobra de <strong>10% para 20%</strong>, em parte por um novo piso mínimo nacional imposto pelo CTC-ES. A ficha nova acompanha mais o processo de monitoramento do programa sobre si mesmo do que sua estrutura estática.",
              "O <mark data-color=\"indigo\">Planejamento estratégico</mark> mantém o peso (<strong>20% → 20%</strong>), mas ganha conteúdo obrigatório. As <mark data-color=\"rosa\">políticas afirmativas de equidade</mark>, antes facultativas, agora são avaliadas por padrão.",
              "O Quesito 2 muda de nome, de 'Formação' para <strong>'Formação e produção intelectual'</strong>, e iguala os 4 itens remanescentes em <strong>25% cada</strong>, contra uma variação anterior de 15% a 25%. Nenhuma dimensão domina mais sobre as outras, mas cresce a importância da <mark data-color=\"amarelo\">trajetória de egressos</mark> e da <mark data-color=\"azul\">produção intelectual</mark> de discentes, egressos e docentes.",
              "Dentro do Quesito 2, o maior salto está no item de <mark data-color=\"amarelo\">trajetória dos egressos</mark>, que vai de <strong>15% para 25%</strong>, o maior ganho de peso relativo do quadriênio. A cobrança por evidências do destino profissional de quem se forma aumentou, e não só por dados da formação.",
              "O Quesito 3 (Impacto) troca de item líder. '<mark data-color=\"grafite\">Impacto econômico, social e cultural</mark>' cai de <strong>40% para 30%</strong>, enquanto '<mark data-color=\"ciano\">Inserção e visibilidade</mark>' sobe para <strong>40%</strong>, absorve toda a antiga internacionalização e passa a ser o item de maior peso do quesito."
            ]
          },
          {
            "id": "4.4c",
            "kind": "changes",
            "title": "Mudanças e Análise: O que foi incluído do zero",
            "consideracoes": [
              "O crivo da <mark data-color=\"azul\">produção intelectual</mark> fica mais fino. Não basta concluir a tese ou dissertação; passa a contar se dela nasceu <mark data-color=\"azul\">produção associada</mark>. A orientação também passa a ser avaliada pelo que gera depois de pronta: por isso a importância de <mark data-color=\"azul\">produções em coautoria discente+docente</mark>.",
              "A cobrança sobre <mark data-color=\"amarelo\">egressos</mark> ganha um indicador próprio. Não basta se formar; conta agora a proporção de titulados que conseguem ao menos um <mark data-color=\"azul\">produto classificado</mark> depois. O reforço acompanha o salto de peso do item, de 15% para 25%.",
              "A <mark data-color=\"azul\">produção docente</mark> também perde margem de interpretação. Um limiar explícito passa a exigir ao menos <mark data-color=\"azul\">dois produtos em estratos superiores por docente permanente</mark>, no lugar da leitura qualitativa que cabia à comissão.",
              "Muda também a escala usada para julgar essa <mark data-color=\"azul\">produção</mark>. Os estratos A1-B5, que a área de Artes calculava por conta própria, dão lugar ao Qualis Referência comum; a mesma linguagem MB / B / R / F / I dos conceitos da ficha passa a valer também para classificar produção.",
              "A <mark data-color=\"lima\">inovação</mark> ganha espaço além do artigo e do livro. Tecnologia social, manual/protocolo e empresa ou organização social inovadora entram como categorias novas de produto técnico-tecnológico, reconhecendo formas de produção que a ficha antiga não contemplava.",
              "No topo da escala, o CTC-ES padroniza o critério. Uma matriz formal passa a dizer, por escrito, quantos itens 'Bom' um programa ainda tolera para alcançar nota 6 ou 7; cada comissão de área perde espaço para decidir sozinha onde fica esse limite."
            ]
          }
        ]
      },
      {
        "id": "sec5-caminho-2028",
        "title": "O caminho até 2028",
        "resumo": "Sucupira, desafios de pesquisa e gestão: o que se impõe ao programa.",
        "slides": [
          {
            "id": "5.1",
            "kind": "concept",
            "title": "Sucupira em transformação: mais automação, mais individualização",
            "body": [
              "Diagnóstico da própria CAPES: hoje o preenchimento é <strong>manual</strong> e concentrado no coordenador; dados <mark>autodeclaratórios sem confirmação</mark>, produções em coautoria entre programas ficam <mark>duplicadas</mark> nas bases.",
              "O novo modelo inverte a lógica: a CAPES passa a <strong>buscar os dados nas fontes originárias</strong> (Lattes, ORCID, sistemas acadêmicos, repositórios institucionais, OpenAlex, Scopus/Web of Science) e só depois pede <mark>confirmação de quem gerou o dado</mark> (o \"dono\" da informação).",
              "Nasce o <mark>Portal Individual</mark>: cada docente e discente valida, um a um, os próprios vínculos, disciplinas, orientações, projetos e produções, respondendo: \"Essa informação pertence a você? Ela está correta?\"",
              "O coordenador do PPG deixa de digitar tudo e assume o papel de <strong>núcleo de gestão e aval</strong> da informação já coletada automaticamente.",
              "Os identificadores persistentes passam a ser obrigatórios: sem <mark data-color=\"ciano\">ORCID</mark>, <mark data-color=\"ciano\">ID Lattes</mark> e demais IDs bem cadastrados, o sistema <strong>não encontra o autor</strong> nas produções.",
              "O <mark>Censo da Pós-Graduação</mark> passa a coletar dados também pelo Portal Individual: a resposta de cada pessoa deixa de ser um simples número de adesão e alimenta diretamente o Observatório e a própria avaliação."
            ],
            "source": "GoPG — Novo Coleta e Portal Individual, lançamento 06/05/2025"
          },
          {
            "id": "5.2",
            "kind": "concept",
            "title": "Desafios já postos: equilíbrio de linhas, transversalidade e estruturação da pesquisa",
            "body": [
              "<mark>Equilíbrio e colaboração entre linhas de pesquisa</mark>: evitar concentração excessiva em poucas linhas ou orientadores e assegurar renovação e distribuição sustentável do corpo docente com atenção à demanda, à excelência do corpo docente e, ao mesmo tempo, fomentar a colaboração.",
              "<mark>Transversalidade</mark>: estimular pesquisas, projetos e disciplinas que atravessem linhas, em vez de reforçar apenas silos temáticos.",
              "<strong>Estruturação dos processos de pesquisa</strong>: profissionalizar a pesquisa e estimular a submissão de projetos a agências de fomento.",
              "<mark>Consolidação de grupos de pesquisa</mark>: consolidar coletivos já atuantes em estruturas reconhecidas (CNPq, institucionais) e promover sua visibilidade institucional.",
              "<mark data-color=\"ciano\">Cooperação interinstitucional</mark>: redes (Global.edu), cotutelas, MINTER/DINTER e parcerias que ampliem o alcance e a escala da produção do programa.",
              "Levantar dados, estruturar ações e implementar medidas visando a <mark data-color=\"ciano\">equidade</mark>, as <mark data-color=\"ciano\">políticas afirmativas</mark> e <mark data-color=\"ciano\">a prevenção/combate ao assédio</mark>.",
              "Esses desafios já existiam antes da nova ficha, que os torna <strong>estruturalmente decisivos</strong> para o próximo quadriênio."
            ]
          },
          {
            "id": "5.3",
            "kind": "concept",
            "title": "Gestão institucional: decisões estratégicas baseadas em dados",
            "body": [
              "No lugar de decisões pontuais/conjunturais, buscar <strong>decisões informadas por dados e guiadas por parâmetros claros</strong>: séries históricas de ingresso, evasão, tempo de titulação, produção e impacto orientam a gestão, e não apenas o preenchimento do Sucupira.",
              "<mark>Oferta de vagas</mark>: dimensionamento de vagas por linha/orientador a partir da capacidade real de orientação e da qualidade da formação, e não apenas da demanda.",
              "Institucionalizar regras, procedimentos e critérios para decisões diversas do Colegiado em resoluções bem fundamentadas.",
              "<mark>Credenciamento e recredenciamento docente</mark>: critérios explícitos, condizentes com o estágio atual do Programa.",
              "Profissionalizar a gestão de processos, demandas, agendamentos e demais tarefas na Secretaria do PPGMUS (novo sistema/site).",
              "Aperefeiçoar nossa comunicação institucional e nossa visibilidade (inclusive redes sociais).",
              "<mark>Modelo de processo seletivo</mark>: repensar critérios de ingresso à luz dos objetivos do programa, da nossa dimensão nacional/internacional e de contingências objetivas (IA, operacionalização, complexidade do processo, etc.).",
              "Essas escolhas não são só internas: definem como o PPGMUS se posiciona <strong>institucionalmente</strong> (na UFMG), <strong>regionalmente</strong> (em Minas Gerais), <strong>nacionalmente</strong> (na área de Música) e <strong>internacionalmente</strong>."
            ]
          },
          {
            "id": "5.4",
            "kind": "concept",
            "title": "Falta amarrar isso a um planejamento estratégico",
            "body": [
              "<strong>O que somos?</strong> Um diagnóstico honesto do programa hoje: forças, limites e identidade.",
              "<strong>O que queremos ser?</strong> Uma perspectiva de futuro negociada e compartilhada, não individualizada em pessoas, linhas ou grupos.",
              "<mark>Quais são nossos objetivos</mark> nesse contexto (mudanças no Sucupira, desafios de linhas, transversalidade e estruturação da pesquisa, profissionalização da gestão)?",
              "<strong>Como vamos agir</strong> para alcançar esses objetivos: quais decisões, prazos e responsáveis?",
              "<strong>Como aferimos</strong> se estamos indo na direção certa: quais indicadores e com que periodicidade?",
              "Sem essas respostas, cada mudança é enfrentada isoladamente."
            ]
          }
        ]
      },
      {
        "id": "sec6-plano-autoavaliacao",
        "title": "Plano de Autoavaliação e Planejamento Estratégico",
        "resumo": "Como vamos construir, coletivamente, o Plano — a partir de hoje.",
        "slides": [
          {
            "id": "6.1",
            "kind": "concept",
            "title": "Um plano a ser construído coletivamente",
            "body": [
              "O Plano de Autoavaliação e Planejamento Estratégico, previsto na resolução da COMAPE, precisa ser <strong>construído coletivamente</strong>.",
              "Além do trabalho inicial do Colegiado e da COMAPE, tem como ponto de partida, também, o <mark>diagnóstico já apresentado</mark> na avaliação recebida (nota 6!) e no trabalho consolidado a partir das últimas três edições do Fórum de Autoavaliação e Planejamento Estratégico.",
              "Passa pelo mesmo crivo que a CAPES aplica ao programa: a <mark data-color=\"indigo\">autoavaliação</mark> tem cada vez um peso maior e a coerência entre o que dizemos e o que fazemos importa cada vez mais.",
              "Depende, fundamentalmente, da construção coletiva: demandas, pontos de vista, proposições das pessoas que constroem PPGMUS: discentes, docentes, TAEs, egressos. Para isso, é fundamental o envolvimento e a disposição em colaborar.",
              "Resultado esperado: aproveitar esses quatro dias para reunir essas visões, conversar sobre o que queremos e podemos fazer, e planejar nosso percurso."
            ]
          },
          {
            "id": "6.2",
            "kind": "changes",
            "title": "Como o Plano será construído na programação",
            "consideracoes": [
              "<strong>Grupos de Trabalho (GTs)</strong>: na tarde de hoje, os participantes se dividem por pontos relevantes apontados pela Coordenação e por temáticas de interesse.",
              "<strong>Esboço inicial</strong>: a COMAPE apresentará amanhã o esboço atual do Plano.",
              "<strong>Propostas dos grupos</strong>: cada GT apresenta suas propostas ao conjunto.",
              "<strong>Estudantes e egressos</strong>: participam de forma integrada de todo o processo, trazendo sua perspectiva de ingressantes e egressos.",
              "<strong>Consultor externo</strong>: discute conosco a construção democrática da pós-graduação e nos traz uma visão externa do processo e das propostas construídas.",
              "<strong>Colegiado do PPGMUS, COMAPE e Consultor</strong>: refinam e organizam as constribuições, visando não meramenta a redação final do documento, mas a implementação das ideias construídas coletivamente."
            ]
          }
        ]
      }
    ]
  },
  "fontes": [
    "ArtesFicha.md — Ficha de Avaliação da Área de Artes, referente a 2021-2024",
    "21-24_CAPES_ficha_avaliação.md e 21-24_CAPES_anexo_ficha_avaliação.md — classificação da produção intelectual, 2021-2024",
    "25-28_CAPES_ficha_avaliação.md — Ficha de Avaliação da Área de Artes, 2025-2028",
    "25-28-CAPES-diretrizes_comuns.md — Diretrizes Comuns da Avaliação de Permanência, ciclo 2025-2028",
    "avaliação_PPGMUS_25/ficha_recomendacao_32001010058P9.md — parecer do PPGMUS-UFMG, publicado 12/01/2026",
    "13052025_Sucupira - Coleta novo e Portal Individual - lançamento 06-05.pdf — apresentação CAPES/GoPG"
  ]
};
