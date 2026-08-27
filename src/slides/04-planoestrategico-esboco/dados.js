// dados.js: conteúdo do deck "Plano Estratégico PPGMUS 2025-2028" (esboço,
// 4º Fórum COMAPE). Mesmo formato de dados.js de ../02-questoes-gts/
// (const DECK = {...}), consumido por index.html nesta mesma pasta.
//
// Fonte: preparacao/plano_estrategico/plano_25-28/Plano Estratégico PPGMUS
// 2025-2028 - esboço.md: cada ação traz subtítulo, Meta, Estratégias e
// Aferimento (a "Avaliação" do documento fonte, renomeada a pedido).
//
// Cores dos 4 eixos = os mesmos hex de --cor-marca-indigo/amarelo/azul/ciano
// em ../tema-comape.css (reuso proposital, não são cores novas). Cores do
// objetivo geral (seção "rn" abaixo) = extraídas do
// preparacao/plano_estrategico/PlanoEstratgicoPPGMUS20252028esboo.html
// (highlight original do documento no Google Docs), para o slide reproduzir
// exatamente o mesmo destaque que a COMAPE já usa no esboço.
//
// Toda marcação de destaque usa <span class="rn" data-tipo="..."
// data-cor="...">, anotado via Rough Notation em tempo de execução (ver
// index.html); não usamos <mark> aqui de propósito (pedido do usuário).
const DECK = {
  "deck": {
    "title": "Plano Estratégico PPGMUS 2025-2028",
    "subtitle": "Esboço para discussão coletiva no 4º Fórum COMAPE",
    "autores": "COMAPE",
    "ano": "2026",
    "data": "26 de agosto de 2026",
    "local": "Belo Horizonte/MG",
    "sections": [
      {
        "id": "sec1-fundamentos",
        "title": "Apresentação e Fundamentos",
        "resumo": "Por que um Plano Estratégico agora, e com quais quatro pontos de partida.",
        "slides": [
          {
            "id": "1",
            "kind": "concept",
            "title": "Por que um Plano Estratégico agora?",
            "body": [
              "O PPGMUS entra no quadriênio 2025-2028 num momento de consolidação de mais de duas décadas de trajetória e de reflexão sobre os novos desafios do Programa.",
              "O novo ciclo avaliativo da CAPES amplia a autonomia dos PPGs para definir suas próprias diretrizes de planejamento e autoavaliação: este Plano Estratégico é nossa resposta a essa abertura.",
              "<strong>Repensar e realinhar os objetivos do Programa</strong>, atualizando a missão à realidade atual: nova linha (Musicoterapia), fusão das linhas Processos Analíticos e Criativos (PAC) e Sonologia (SO), renovação do corpo docente, novos contextos tecnológicos (IA) e papel social e formativo mais aprofundado.",
              "<strong>Delimitar Eixos Estratégicos</strong> que sirvam de pilares para diagnóstico, planejamento, ação e autoavaliação ao longo do quadriênio.",
              "<strong>Estabelecer ferramentas, ações e parâmetros objetivos</strong> para acompanhar e autoavaliar o progresso com transparência e método.",
              "<strong>Operacionalizar um mecanismo cíclico e contínuo de aperfeiçoamento</strong>: um documento vivo, revisado a partir de uma postura autocrítica."
            ]
          }
        ]
      },
      {
        "id": "sec2-identidade",
        "title": "Identidade e Objetivos do PPGMUS",
        "resumo": "Nosso objetivo geral hoje, e as perguntas para refinar cada termo dele.",
        "slides": [
          {
            "id": "2a",
            "kind": "concept",
            "title": "Nosso objetivo geral, hoje",
            "body": [
              "A partir de diagnóstico inicial e diálogo com a comunidade, propomos reavaliar e refinar os valores que fundamentam a identidade do PPGMUS, mantendo a memória histórica, mas com uma postura mais ativa, colocando a atuação formativa em primeiro plano.",
              "Atualmente, o PPGMUS estabelece como objetivo geral:<br/><i>\"a <span class=\"rn\" data-tipo=\"highlight\" data-cor=\"#fce5cd\">formação</span>, caracterizada por <span class=\"rn\" data-tipo=\"highlight\" data-cor=\"#d9ead3\">transversalidade</span>, <span class=\"rn\" data-tipo=\"highlight\" data-cor=\"#c9daf8\">inovação</span> e <span class=\"rn\" data-tipo=\"highlight\" data-cor=\"#d9d2e9\">consciência sociocultural</span>, de pessoal <span class=\"rn\" data-tipo=\"highlight\" data-cor=\"#fff2cc\">qualificado em termos artísticos e científicos</span> para o exercício de <span class=\"rn\" data-tipo=\"highlight\" data-cor=\"#f4cccc\">atividades profissionais</span>, de <span class=\"rn\" data-tipo=\"highlight\" data-cor=\"#d0e0e3\">ensino e de pesquisa</span> tanto em música como em áreas afins que tenham clara interface com música\"</i>.",
              "Depois de refletir sobre cada termo, parece importante repensar essa formulação, refinando o que ela transmite como identidade e prioridades."
            ]
          },
          {
            "id": "2b",
            "kind": "concept",
            "title": "Perguntas para refinar cada termo",
            "body": [
              "Como priorizamos, na prática, o papel <span class=\"rn\" data-tipo=\"highlight\" data-cor=\"#fce5cd\">formativo</span> do PPGMUS: do diagnóstico ao planejamento, à ação e à avaliação?",
              "O que entendemos por <span class=\"rn\" data-tipo=\"highlight\" data-cor=\"#d9ead3\">transversalidade</span>: no currículo, nas produções, na pesquisa e nas interfaces com a graduação, a extensão e a sociedade?",
              "O que caracteriza nosso papel <span class=\"rn\" data-tipo=\"highlight\" data-cor=\"#c9daf8\">inovador</span>: educacional, acadêmico, artístico, social, epistêmico, institucional, tecnológico?",
              "O que significa, na prática, <span class=\"rn\" data-tipo=\"highlight\" data-cor=\"#d9d2e9\">consciência sociocultural</span>: em ações afirmativas, políticas de equidade e interface com a sociedade?",
              "Como conjugamos <span class=\"rn\" data-tipo=\"highlight\" data-cor=\"#fff2cc\">qualificação artística e científica</span> em disciplinas, projetos e produções?",
              "Como estruturamos a formação visando às <span class=\"rn\" data-tipo=\"highlight\" data-cor=\"#f4cccc\">atividades profissionais</span> dos discentes?",
              "Como conjugamos <span class=\"rn\" data-tipo=\"highlight\" data-cor=\"#d0e0e3\">ensino e pesquisa</span> para dar base à atuação profissional de nossos egressos?"
            ]
          }
        ]
      },
      {
        "id": "sec3-eixos",
        "title": "Eixos Estratégicos 2025-2028",
        "resumo": "Os quatro eixos, os quesitos da nova ficha a que cada um responde e o ciclo anual que os movimenta.",
        "slides": [
          {
            "id": "3a",
            "kind": "eixos-quesitos",
            "title": "Eixos estratégicos",
            "descricao": "Cada eixo se correlaciona com um quesito da <a href=\"https://comape.musica.ufmg.br/assets/documentos/2025_CAPES_25-28/25-28_CAPES_ficha_avalia%C3%A7%C3%A3o.pdf\" target=\"_blank\" rel=\"noopener\">ficha de avaliação da Área de Artes da CAPES para 2025-2028</a>, indicado na etiqueta ao lado.",
            "eixos": [
              { "numero": 1, "nome": "Gestão, Identidade e Planejamento Estratégico", "cor": "#81C39F", "quesito": { "cod": 1, "nome": "Programa" } },
              { "numero": 2, "nome": "Formação, Vida Discente e Trajetória de Egressos", "cor": "#6181D8", "quesito": { "cod": 2, "nome": "Formação e produção intelectual" } },
              { "numero": 3, "nome": "Pesquisa e Produção Intelectual Qualificada", "cor": "#9975D6", "quesito": { "cod": 2, "nome": "Formação e produção intelectual" } },
              { "numero": 4, "nome": "Impacto, Inserção e Diálogo com a Sociedade", "cor": "#E87568", "quesito": { "cod": 3, "nome": "Impacto" } }
            ]
          },
          {
            "id": "3b",
            "kind": "concept",
            "title": "Como isso vai funcionar: o ciclo anual",
            "body": [
              "A implementação será guiada por um ciclo anual de aprimoramento: <strong>Diagnóstico → Planejamento → Ação → Avaliação</strong>.",
              "Eventos-chave: o <strong>Fórum Anual de Autoavaliação e Planejamento</strong> (final do ano letivo) e a <strong>Assembleia Docente de Abertura</strong> (início do ano letivo).",
              "Para cada eixo, o Plano detalha ações prioritárias, metas, estratégias e indicadores de acompanhamento. É isso que vemos a seguir, eixo a eixo."
            ]
          }
        ]
      },
      {
        "id": "sec4-eixo1",
        "title": "Eixo 1: Gestão, Identidade e Planejamento Estratégico",
        "resumo": "Autoavaliação, credenciamento, fluxo de processos e prevenção de conflitos.",
        "slides": [
          {
            "id": "4.1",
            "kind": "acao",
            "cod": "1.1",
            "titulo": "Refinamento da Identidade e Objetivos do PPGMUS",
            "corEixo": "#1F317F",
            "meta": "Definir e aprovar coletivamente a nova formulação dos objetivos do Programa até o final do segundo ano do quadriênio.",
            "estrategias": [
              "Realizaremos debates no Fórum Anual e consultas via questionários para coletar propostas da comunidade.",
              "As deliberações principais ocorrerão em Assembleia Docente, com encaminhamento para consolidação pela COMAPE e referendamento pelo Colegiado."
            ],
            "aferimento": [
              "aprovação da nova formulação em ata",
              "divulgação no site e nos documentos oficiais do Programa"
            ]
          },
          {
            "id": "4.2",
            "kind": "acao",
            "cod": "1.2",
            "titulo": "Fortalecimento da Cultura de Autoavaliação",
            "corEixo": "#1F317F",
            "meta": "Aumentar a participação de discentes e docentes nos processos de autoavaliação, consolidando uma cultura de diagnóstico e planejamento contínuos.",
            "estrategias": [
              "Serão realizadas campanhas de comunicação para destacar a importância do processo.",
              "Os Fóruns Anuais serão consolidados como evento central do calendário, e os questionários serão otimizados (mais curtos e focados) para facilitar a participação."
            ],
            "aferimento": [
              "taxa de resposta dos questionários",
              "listas de presença e atas dos Fóruns",
              "produção de um Relatório de Planejamento anual derivado diretamente das discussões do Fórum"
            ]
          },
          {
            "id": "4.3",
            "kind": "acao",
            "titulo": "Ações em elaboração",
            "corEixo": "#1F317F",
            "pendentes": [
              "1.3 · Aprimoramento da Política de Credenciamento/Recredenciamento",
              "1.4 · Estruturação de Fluxo de Processos (Secretaria)",
              "1.5 · Abordagem Preventiva em Relação a Conflitos"
            ]
          }
        ]
      },
      {
        "id": "sec5-eixo2",
        "title": "Eixo 2: Formação, Vida Discente e Trajetória de Egressos",
        "resumo": "Acolhimento, bolsas, egressos e prospecção de futuros candidatos.",
        "slides": [
          {
            "id": "5.1",
            "kind": "acao",
            "cod": "2.1",
            "titulo": "Aprimoramento do Acolhimento Discente",
            "corEixo": "#9D7512",
            "meta": "Aperfeiçoar a recepção anual e a orientação para todos os novos discentes a partir do segundo ano do quadriênio.",
            "estrategias": [
              "Transformar a Reunião de Recepção semestral/anual em um pequeno evento de acolhimento com duração de um dia.",
              "Apresentar, como recorrente, as regras, normas e dinâmicas do PPGMUS em uma reunião.",
              "Sistematizar tais informações em um Manual do Discente digital e acessível.",
              "Apresentar os grupos de pesquisa e as estruturas disponíveis voltadas à boa realização dos projetos de mestrado/doutorado.",
              "Apresentar diretrizes gerais do que são consideradas produções qualificadas, de impacto e inovadoras, com aderência a projetos e à identidade do PPGMUS.",
              "Estabelecer um canal direto de comunicação entre o Colegiado do PPGMUS e os discentes."
            ],
            "aferimento": [
              "realização do evento registrada em ata e com material de divulgação publicizado",
              "publicação do Manual Discente",
              "feedback positivo dos discentes em questionários de avaliação"
            ]
          },
          {
            "id": "5.2",
            "kind": "acao",
            "cod": "2.2",
            "titulo": "Consolidação das Políticas de Permanência e Bolsa",
            "corEixo": "#9D7512",
            "meta": "Revisar e tornar transparentes os critérios de concessão de bolsas, alinhando-os às políticas de ações afirmativas da UFMG e contemplando aspectos de maternidade e parentalidade.",
            "estrategias": [
              "A Comissão de Bolsas atuará na definição dos critérios, que serão aprovados e publicizados pelo Colegiado.",
              "Um diagnóstico anual do perfil dos bolsistas guiará os ajustes na política."
            ],
            "aferimento": [
              "publicação de uma resolução de bolsas atualizada",
              "relatório anual sobre a distribuição de bolsas (com dados sobre ações afirmativas)"
            ]
          },
          {
            "id": "5.3",
            "kind": "acao",
            "cod": "2.3",
            "titulo": "Mapeamento da Trajetória de Egressos",
            "corEixo": "#9D7512",
            "meta": "Mapear a atuação profissional da maioria dos egressos titulados, consolidando uma cultura de contato e fortalecendo a rede do PPGMUS.",
            "estrategias": [
              "Utilizaremos questionários anuais e criaremos uma Rede de Egressos com canais de comunicação (newsletter, redes sociais).",
              "A mediação do contato será feita tanto pela coordenação quanto pelos ex-orientadores."
            ],
            "aferimento": [
              "consolidação de um banco de dados de egressos",
              "promoção de eventos com a participação de egressos",
              "elaboração de um relatório quadrienal sobre o perfil de atuação profissional deles"
            ]
          },
          {
            "id": "5.4",
            "kind": "acao",
            "cod": "2.4",
            "titulo": "Prospecção de Candidatos e Mapeamento de Interesses",
            "corEixo": "#9D7512",
            "meta": "Identificar o perfil, os interesses e as expectativas de potenciais candidatos ao PPGMUS, mapeando suas áreas de interesse em relação às linhas de pesquisa e temáticas do Programa.",
            "estrategias": [
              "Implementaremos um questionário de prospecção a ser aplicado antes ou durante o processo seletivo.",
              "Realizaremos eventos de PPG de Portas Abertas semestralmente ou anualmente, apresentando o Programa e suas linhas de pesquisa.",
              "Faremos levantamentos estatísticos sistemáticos a cada entrada de novos discentes, identificando a origem dos alunos (graduação UFMG, outras IES, etc.), suas formações prévias e motivações para ingresso."
            ],
            "aferimento": [
              "consolidação de um banco de dados/tabela com o perfil dos candidatos e ingressantes",
              "realização regular dos eventos de Portas Abertas (com registro de presença e feedback)",
              "produção de relatórios anuais sobre o perfil dos ingressantes e suas áreas de interesse, subsidiando decisões sobre oferta de disciplinas, orientação e políticas de divulgação do Programa"
            ]
          }
        ]
      },
      {
        "id": "sec6-eixo3",
        "title": "Eixo 3: Pesquisa e Produção Intelectual Qualificada",
        "resumo": "Pesquisa transversal e qualificação da produção intelectual.",
        "slides": [
          {
            "id": "6.1",
            "kind": "acao",
            "cod": "3.1",
            "titulo": "Fomento à Pesquisa Transversal",
            "corEixo": "#116989",
            "meta": "Estabelecer o Espaço Transversal de Pesquisa (ETPq) como um núcleo regular e produtivo de colaboração entre docentes e pesquisadores.",
            "estrategias": [
              "Realizaremos encontros quinzenais no ETPq com pautas definidas.",
              "Faremos um mapeamento de competências para identificar sinergias entre os pesquisadores."
            ],
            "aferimento": [
              "frequência de participação nos encontros",
              "aumento no número de projetos de pesquisa submetidos a agências de fomento",
              "número de publicações em coautoria originadas a partir dessas colaborações"
            ]
          },
          {
            "id": "6.2",
            "kind": "acao",
            "cod": "3.2",
            "titulo": "Qualificação da Produção Intelectual",
            "corEixo": "#116989",
            "meta": "Aumentar o percentual de teses e dissertações que resultem em produção intelectual qualificada (artística, técnica ou bibliográfica) associada e publicada.",
            "estrategias": [
              "Ofereceremos workshops focados em aderência e impacto das produções.",
              "As normas do PPG serão revisadas para valorizar a produção associada.",
              "Criaremos um Portfólio de Produção Discente/Docente de destaque no site."
            ],
            "aferimento": [
              "percentual de TCCs com produção associada registrada na Sucupira",
              "número de produções discentes destacadas anualmente pelo Programa",
              "indicadores quantitativos e qualitativos de impacto da produção"
            ]
          }
        ]
      },
      {
        "id": "sec7-eixo4",
        "title": "Eixo 4: Impacto, Inserção e Diálogo com a Sociedade",
        "resumo": "Documentar impacto, ampliar visibilidade e cooperar com outros PPGs.",
        "slides": [
          {
            "id": "7.1",
            "kind": "acao",
            "cod": "4.1",
            "titulo": "Sistematização e Documentação do Impacto",
            "corEixo": "#0E75A3",
            "meta": "Consolidar entre a comunidade acadêmica uma cultura de planejamento e produção de conhecimento com impacto social, científico, artístico e institucional.",
            "estrategias": [
              "Realizaremos Workshops de Impacto para capacitar docentes e discentes.",
              "Promoveremos uma análise interna anual das principais produções, avaliando sua aderência a projetos e seu efeito transformador."
            ],
            "aferimento": [
              "registro qualificado das produções de impacto nas plataformas da CAPES",
              "criação de um banco de evidências interno (prêmios, mídia)",
              "qualidade dos 'Casos de Impacto' submetidos",
              "reconhecimento externo obtido"
            ]
          },
          {
            "id": "7.2",
            "kind": "acao",
            "cod": "4.2",
            "titulo": "Ampliação da Visibilidade e Comunicação",
            "corEixo": "#0E75A3",
            "meta": "Aprimorar o site e os canais de comunicação do PPGMUS, estabelecendo uma presença digital regular e estratégica até o final do segundo ano.",
            "estrategias": [
              "Elaboraremos um Plano de Comunicação.",
              "Designaremos um responsável pela gestão das mídias (bolsista/parceria).",
              "Iniciaremos a produção de conteúdo diversificado (podcasts, vídeos, etc.)."
            ],
            "aferimento": [
              "site aprimorado publicado",
              "acompanhamento das métricas de engajamento das redes sociais",
              "feedback da comunidade sobre a melhoria da comunicação"
            ]
          },
          {
            "id": "7.3",
            "kind": "acao",
            "cod": "4.3",
            "titulo": "Compromisso com a Inserção Regional/Nacional e com a Solidariedade com outros Programas",
            "corEixo": "#0E75A3",
            "meta": "Realizar pelo menos uma ação de cooperação ou solidariedade de grande porte com outro PPG da área de Artes durante o quadriênio.",
            "estrategias": [
              "Faremos um mapeamento de PPGs parceiros.",
              "Promoveremos ações de colaboração, como eventos conjuntos, participação em bancas ou oferta de disciplinas em rede."
            ],
            "aferimento": [
              "registro das ações de cooperação realizadas",
              "relatório de avaliação sobre os benefícios e desafios da colaboração, servindo de base para futuras parcerias"
            ]
          }
        ]
      }
    ]
  }
};
