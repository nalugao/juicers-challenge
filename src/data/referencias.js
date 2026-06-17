const referencias = [
  {
    id: 1,
    titulo: "Esteroides anabolizantes e risco cardiovascular",
    categoria: "Cardiovascular",
    fonte: "Sociedade de Cardiologia do Rio Grande do Sul",
    descricao:
      "Material sobre possíveis impactos cardiovasculares associados ao uso de esteroides anabolizantes.",
    link: "http://sociedades.cardiol.br/sbc-rs/revista/2006/09/Artigo_07_Esteroides_Anabolizantes.pdf"
  },
  {
    id: 2,
    titulo: "Avaliação cardíaca por imagem em usuários de anabolizantes",
    categoria: "Cardiovascular",
    fonte: "ABC Imaging",
    descricao:
      "Artigo sobre alterações cardíacas avaliadas por métodos de imagem em contexto de uso de esteroides anabolizantes.",
    link: "https://www.abcimaging.org/wp-content/uploads/articles_xml/2675-312X-abcimg-37-01-e20230113/2675-312X-abcimg-37-01-e20230113.pdf"
  },
  {
    id: 3,
    titulo: "Manejo do risco cardiovascular em atletas usuários de AAS",
    categoria: "Cardiovascular",
    fonte: "American College of Cardiology",
    descricao:
      "Discussão clínica sobre abordagem de risco cardiovascular em atletas que usam esteroides anabolizantes androgênicos.",
    link: "https://www.acc.org/latest-in-cardiology/articles/2024/04/01/16/10/the-experts-approach-to-managing-cv-risk-among-athletes-using-anabolic-androgenic-steroids"
  },
  {
    id: 4,
    titulo: "Anabolizantes e funcionalidade do colesterol HDL",
    categoria: "Cardiovascular",
    fonte: "Jornal da USP",
    descricao:
      "Reportagem científica sobre como anabolizantes podem comprometer a funcionalidade do colesterol bom.",
    link: "https://jornal.usp.br/ciencias/ciencias-da-saude/ciencias-2811-anabolizantes-comprometem-funcionalidade-do-colesterol-bom/"
  },

  {
    id: 9,
    titulo: "Anabolizantes e eventos cardiovasculares",
    categoria: "Cardiovascular",
    fonte: "Journal of the American College of Cardiology",
    descricao:
      "Artigo científico publicado no JACC sobre possíveis eventos cardiovasculares associados ao uso de esteroides.",
    link: "https://www.jacc.org/doi/10.1016/S0735-1097(00)01083-4"
  },
  {
    id: 10,
    titulo: "Anabolizantes e saúde arterial em fisiculturistas",
    categoria: "Cardiovascular",
    fonte: "American Heart Association",
    descricao:
      "Estudo sobre estrutura arterial, função vascular e função cardíaca em fisiculturistas homens usuários de esteroides anabolizantes androgênicos.",
    link: "https://www.ahajournals.org/doi/10.1161/CIRCULATIONAHA.124.071117"
  },
  {
    id: 12,
    titulo: "Diferentes formas de lesão hepática por anabolizantes",
    categoria: "Fígado e metabolismo",
    fonte: "PubMed Central",
    descricao:
      "Relato de casos sobre lesões hepáticas associadas ao uso de esteroides anabolizantes",
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8766528/"
  },
  {
    id: 13,
    titulo: "Câncer hepático associado ao uso de anabolizantes",
    categoria: "Fígado e metabolismo",
    fonte: "PubMed Central",
    descricao:
      "Relato de casos sobre desenvolvimento de câncer hepático e de vias biliares em contexto de uso de esteroides anabolizantes.",
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9975287/"
  },
  {
    id: 14,
    titulo: "Marcadores hepáticos e uso de substâncias hormonais",
    categoria: "Fígado e metabolismo",
    fonte: "PubMed Central",
    descricao:
      "Referência útil para contextualizar acompanhamento laboratorial hepático em usuários de substâncias hormonais.",
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10412093/"
  },
  {
    id: 15,
    titulo: "Toxicologia e efeitos sistêmicos dos anabolizantes",
    categoria: "Fígado e metabolismo",
    fonte: "ScienceDirect",
    descricao:
      "Artigo sobre efeitos tóxicos e sistêmicos relacionados ao uso de esteroides anabolizantes.",
    link: "https://www.sciencedirect.com/science/article/pii/S0041008X25000146"
  },
  {
    id: 16,
    titulo: "Riscos urológicos do uso de anabolizantes",
    categoria: "Hormonal e urológico",
    fonte: "Portal da Urologia",
    descricao:
      "Material institucional sobre riscos urológicos associados ao uso de anabolizantes.",
    link: "https://portaldaurologia.org.br/sua-saude/dicas/riscos-urologicos-do-uso-de-anabolizantes"
  },
  {
    id: 17,
    titulo: "Uso indiscriminado de testosterona",
    categoria: "Hormonal e urológico",
    fonte: "Portal da Urologia",
    descricao:
      "Orientação sobre riscos do uso de testosterona sem indicação médica adequada.",
    link: "https://portaldaurologia.org.br/sua-saude/dicas/uso-indiscriminado-e-sem-indicacao-medica-de-testosterona"
  },
  {
    id: 18,
    titulo: "Testosterona, eixo hormonal e saúde reprodutiva",
    categoria: "Hormonal e urológico",
    fonte: "European Journal of Endocrinology",
    descricao:
      "Artigo relacionado a testosterona, endocrinologia e possíveis consequências hormonais do uso inadequado.",
    link: "https://academic.oup.com/ejendo/article/189/6/601/7475314"
  },
  {
    id: 19,
    titulo: "Anabolizantes, fertilidade e função hormonal",
    categoria: "Hormonal e urológico",
    fonte: "PubMed Central",
    descricao:
      "Referência científica sobre alterações hormonais e reprodutivas associadas ao uso de esteroides.",
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10497340/"
  },
  {
    id: 20,
    titulo: "Uso de AAS e saúde masculina",
    categoria: "Hormonal e urológico",
    fonte: "PubMed Central",
    descricao:
      "Estudo sobre impactos do uso de esteroides anabolizantes na saúde masculina e no eixo endócrino.",
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10078442/"
  },
  {
    id: 21,
    titulo: "Body dysmorphic disorder e uso de anabolizantes",
    categoria: "Saúde mental e comportamento",
    fonte: "The Primary Care Companion for CNS Disorders",
    descricao:
      "Revisão sobre associação entre dismorfia corporal, uso induzido de anabolizantes e desfechos de saúde mental.",
    link: "https://www.psychiatrist.com/pcc/association-body-dysmorphic-induced-anabolic-androgenic-steroid-use-mental-health-outcomes-systematic-review/"
  },
  {
    id: 22,
    titulo: "Anabolizantes e desfechos em saúde mental",
    categoria: "Saúde mental e comportamento",
    fonte: "ScienceDirect",
    descricao:
      "Artigo sobre possíveis relações entre uso de anabolizantes, comportamento e saúde mental.",
    link: "https://www.sciencedirect.com/science/article/pii/S0955395924003207"
  },
  {
    id: 23,
    titulo: "Efeitos psiquiátricos dos esteroides anabolizantes",
    categoria: "Saúde mental e comportamento",
    fonte: "Biological Psychiatry",
    descricao:
      "Referência sobre efeitos neuropsiquiátricos e comportamentais associados ao uso de esteroides.",
    link: "https://www.biologicalpsychiatryjournal.com/article/S0006-3223(16)32529-X/fulltext"
  },
  {
    id: 24,
    titulo: "Anabolizantes, agressividade e comportamento",
    categoria: "Saúde mental e comportamento",
    fonte: "ScienceDirect",
    descricao:
      "Estudo sobre comportamento, alterações de humor e possíveis efeitos psicológicos associados ao uso de AAS.",
    link: "https://www.sciencedirect.com/science/article/pii/0091305795020829"
  },
  {
    id: 25,
    titulo: "Saúde mental e uso de substâncias para performance",
    categoria: "Saúde mental e comportamento",
    fonte: "PubMed Central",
    descricao:
      "Referência científica sobre aspectos psicológicos e comportamentais ligados ao uso de substâncias de performance.",
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12705642/"
  },
  {
    id: 26,
    titulo: "Uso problemático de anabolizantes",
    categoria: "Dependência e uso problemático",
    fonte: "PubMed Central",
    descricao:
      "Estudo sobre padrões de uso problemático, dependência e riscos relacionados ao uso de esteroides anabolizantes.",
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8211877/"
  },
  {
    id: 27,
    titulo: "Anabolizantes, dependência e comportamento de risco",
    categoria: "Dependência e uso problemático",
    fonte: "PubMed Central",
    descricao:
      "Referência sobre dependência, continuidade de uso e fatores associados ao uso de AAS.",
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8233285/"
  },
  {
    id: 28,
    titulo: "Uso de anabolizantes e drogas associadas",
    categoria: "Dependência e uso problemático",
    fonte: "Drug and Alcohol Dependence / ScienceDirect",
    descricao:
      "Artigo sobre uso de substâncias, padrões de consumo e contexto de drogas relacionadas ao desempenho.",
    link: "https://www.sciencedirect.com/science/article/pii/S0376871620300399"
  },
  {
    id: 29,
    titulo: "Substâncias de performance e dependência",
    categoria: "Dependência e uso problemático",
    fonte: "ScienceDirect",
    descricao:
      "Referência sobre padrões de consumo e riscos de dependência relacionados a substâncias de performance.",
    link: "https://www.sciencedirect.com/science/article/pii/S0376871621000995"
  },
  {
    id: 30,
    titulo: "Uso de anabolizantes em esportes, saúde e sociedade",
    categoria: "Saúde pública e educação",
    fonte: "Medicine & Science in Sports & Exercise",
    descricao:
      "Posicionamento científico sobre uso de esteroides anabolizantes em esportes, saúde e contexto social.",
    link: "https://journals.lww.com/acsm-msse/fulltext/2021/08000/anabolic_androgenic_steroid_use_in_sports,_health,.26.aspx"
  },
  {
    id: 31,
    titulo: "Uso de anabolizantes e saúde coletiva",
    categoria: "Saúde pública e educação",
    fonte: "SciELO",
    descricao:
      "Artigo em português sobre uso de anabolizantes e aspectos de saúde coletiva.",
    link: "https://www.scielo.br/j/csp/a/Zsg5mPyZ5M5m4NdZKT8Bb6L/?lang=pt"
  },
  {
    id: 32,
    titulo: "Anabolizantes no contexto educacional e social",
    categoria: "Saúde pública e educação",
    fonte: "SciELO",
    descricao:
      "Referência nacional sobre anabolizantes, educação física, comportamento e contexto social.",
    link: "https://www.scielo.br/j/refuem/a/Yp3sBLmsrV7phpZMtsbmCpj/?format=html&lang=pt"
  },
  {
    id: 33,
    titulo: "Bomba tô fora",
    categoria: "Diretrizes e posicionamentos",
    fonte: "Sociedade Brasileira de Endocrinologia e Metabologia",
    descricao:
      "Material educativo da SBEM sobre riscos do uso de anabolizantes.",
    link: "https://s3.endocrino.org.br/bomba-to-fora-e-book-SBEM.pdf"
  },
  {
    id: 34,
    titulo: "Posicionamento da SBEM sobre anabolizantes",
    categoria: "Diretrizes e posicionamentos",
    fonte: "Sociedade Brasileira de Endocrinologia e Metabologia",
    descricao:
      "Documento institucional da SBEM sobre uso de anabolizantes e riscos associados.",
    link: "https://www.endocrino.org.br/wp-content/uploads/2022/09/Posicionamento-da-SBEM-Anabolizantes.docx.pdf"
  },
  {
    id: 35,
    titulo: "Acompanhamento clínico e redução de danos",
    categoria: "Diretrizes e posicionamentos",
    fonte: "Cleveland Clinic Journal of Medicine",
    descricao:
      "Referência clínica útil para discussão sobre acompanhamento, riscos e orientação profissional.",
    link: "https://www.ccjm.org/content/ccjom/74/5/341.full.pdf"
  }
];

export default referencias;