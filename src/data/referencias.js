const referencias = [
  {
    id: 1,
    titulo: "Anabolizantes, trombose e função endotelial",
    categoria: "Cardiovascular",
    fonte: "Sociedade de Cardiologia do Rio Grande do Sul",
    descricao:
      "Artigo sobre marcadores aterotrombóticos e função endotelial associados ao uso de anabolizantes.",
    link: "http://sociedades.cardiol.br/sbc-rs/revista/2006/09/Artigo_07_Esteroides_Anabolizantes.pdf"
  },
  {
    id: 2,
    titulo: "Avaliação cardíaca por imagem em usuários de anabolizantes",
    categoria: "Cardiovascular",
    fonte: "ABC Imaging",
    descricao:
      "Revisão sobre alterações cardíacas em usuários de anabolizantes avaliadas por ecocardiograma, tomografia e ressonância.",
    link: "https://www.abcimaging.org/wp-content/uploads/articles_xml/2675-312X-abcimg-37-01-e20230113/2675-312X-abcimg-37-01-e20230113.pdf"
  },
  {
    id: 3,
    titulo: "Manejo do risco cardiovascular em atletas usuários de Anabolizantes",
    categoria: "Cardiovascular",
    fonte: "American College of Cardiology",
    descricao:
      "Análise clínica sobre avaliação cardiovascular e manejo de atletas que usam anabolizantes.",
    link: "https://www.acc.org/latest-in-cardiology/articles/2024/04/01/16/10/the-experts-approach-to-managing-cv-risk-among-athletes-using-anabolic-androgenic-steroids"
  },
  {
    id: 4,
    titulo: "Anabolizantes e funcionalidade do colesterol HDL",
    categoria: "Cardiovascular",
    fonte: "Jornal da USP",
    descricao:
      "Reportagem sobre como anabolizantes podem prejudicar a função protetora do colesterol HDL.",
    link: "https://jornal.usp.br/ciencias/ciencias-da-saude/ciencias-2811-anabolizantes-comprometem-funcionalidade-do-colesterol-bom/"
  },
  {
    id: 5,
    titulo: "Anabolizantes e saúde arterial em fisiculturistas",
    categoria: "Cardiovascular",
    fonte: "Journal of the American College of Cardiology",
    descricao:
      "Estudo sobre estrutura arterial, função vascular e massa ventricular em fisiculturistas usuários de Anabolizantes.",
    link: "https://www.jacc.org/doi/10.1016/S0735-1097(00)01083-4"
  },
  {
    id: 6,
    titulo: "Anabolizantes e doenças cardiovasculares",
    categoria: "Cardiovascular",
    fonte: "American Heart Association",
    descricao:
       "Estudo sobre maior risco cardiovascular em usuários de anabolizantes.",
    link: "https://www.ahajournals.org/doi/10.1161/CIRCULATIONAHA.124.071117"
  },
  {
    id: 7,
    titulo: "Anabolizantes e cardiomiopatia",
    categoria: "Cardiovascular",
    fonte: "Frontiers in Cardiovascular Medicine",   
    descricao:
      "Revisão sobre lesão cardíaca e insuficiência cardíaca associadas ao uso de anabolizantes.",
      link: "https://www.frontiersin.org/journals/cardiovascular-medicine/articles/10.3389/fcvm.2023.1214374/full"
  },
  {
    id: 8,
    titulo: "Diferentes formas de lesão hepática por anabolizantes",
    categoria: "Fígado e metabolismo",
    fonte: "PubMed Central",
    descricao:
      "Relato de casos sobre diferentes lesões hepáticas associadas ao uso de anabolizantes.",
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8766528/"
  },
  {
    id: 9,
    titulo: "Câncer hepático associado ao uso de anabolizantes",
    categoria: "Fígado e metabolismo",
    fonte: "PubMed Central",
    descricao:
      "Relato de casos sobre câncer hepático e de vias biliares associado ao uso de anabolizantes e testosterona.",
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9975287/"
  },
  {
    id: 10,
    titulo: "Anabolizantes, efeitos cardiorrenais e metabólicos",
    categoria: "Efeitos sistêmicos",
    fonte: "ScienceDirect",
    descricao:
      "Artigo sobre danos cardiovasculares, renais e metabólicos associados ao uso de anabolizantes.",
    link: "https://www.sciencedirect.com/science/article/pii/S0041008X25000146"
  },
  {
    id: 11,
    titulo: "Anabolizantes e efeitos adversos no organismo",
    categoria: "Efeitos sistêmicos",
    fonte: "SciELO",
    descricao:
      "Revisão sobre efeitos adversos do uso abusivo de esteroides anabolizantes em diferentes sistemas do organismo.",
    link: "https://www.scielo.br/j/refuem/a/Yp3sBLmsrV7phpZMtsbmCpj/?format=html&lang=pt"
  },
  {
    id: 12,
    titulo: "Riscos urológicos do uso de anabolizantes",
    categoria: "Hormonal e urológico",
    fonte: "Portal da Urologia",
    descricao:
      "Orientação sobre a relação entre anabolizantes, disfunção erétil, infertilidade e atrofia testicular.",
    link: "https://portaldaurologia.org.br/sua-saude/dicas/riscos-urologicos-do-uso-de-anabolizantes"
  },
  {
    id: 13,
    titulo: "Uso indiscriminado de testosterona",
    categoria: "Hormonal e urológico",
    fonte: "Portal da Urologia",
    descricao:
      "Orientação da Sociedade Brasileira de Urologia sobre riscos do uso de testosterona sem prescrição médica.",
    link: "https://portaldaurologia.org.br/sua-saude/dicas/uso-indiscriminado-e-sem-indicacao-medica-de-testosterona"
  },
  {
    id: 14,
    titulo: "Anabolizantes, hipogonadismo e recuperação hormonal",
    categoria: "Hormonal e urológico",
    fonte: "European Journal of Endocrinology",
    descricao:
      "Estudo sobre recuperação hormonal após parar anabolizantes e fatores associados à normalização de testosterona, LH e FSH.",
    link: "https://academic.oup.com/ejendo/article/189/6/601/7475314"
  },
  {
    id: 15,
    titulo: "Anabolizantes e ginecomastia",
    categoria: "Hormonal e urológico",
    fonte: "PubMed Central",
    descricao:
      "Estudo sobre ginecomastia associada a anabolizantes, prevalência subestimada e tratamento.",
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10497340/"
  },
  {
    id: 16,
    titulo: "Abuso de Anabolizantes e saúde reprodutiva masculina",
    categoria: "Hormonal e urológico",
    fonte: "PubMed Central",
    descricao:
      "Estudo sobre abuso de Anabolizantes, fertilidade, função sexual e recuperação hormonal.",
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10078442/"
  },
  {
    id: 17,
    titulo: "Anabolizantes e estrutura cerebral",
    categoria: "Saúde mental e comportamento",
    fonte: "Biological Psychiatry",
    descricao:
      "Estudo de neuroimagem sobre alterações no volume cerebral e na espessura cortical em usuários de longo prazo de AAS.",
    link: "https://www.biologicalpsychiatryjournal.com/article/S0006-3223(16)32529-X/fulltext"
  },
  {
    id: 18,
    titulo: "Anabolizantes, saúde mental e função social",
    categoria: "Saúde mental e comportamento",
    fonte: "PubMed Central",
    descricao:
      "Estudo sobre impactos emocionais, cognitivos e sociais do uso prolongado de substâncias para performance, com foco em anabolizantes.",
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12705642/"
  },
  {
    id: 19,
    titulo: "Abuso de anabolizantes e efeitos psiquiátricos",
    categoria: "Saúde mental e comportamento",
    fonte: "Cleveland Clinic Journal of Medicine",
    descricao:
      "Revisão sobre efeitos psiquiátricos e físicos do abuso de esteroides anabolizantes.",
    link: "https://www.ccjm.org/content/ccjom/74/5/341.full.pdf"
  },
  {
    id: 20,
    titulo: "Anabolizantes e sofrimento psicológico",
    categoria: "Saúde mental e comportamento",
    fonte: "PubMed Central",
    descricao:
      "Estudo sobre agressividade, sofrimento psicológico e diferenças entre homens e mulheres usuários de anabolizantes.",
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8211877/"
  },
  {
    id: 21,
    titulo: "Anabolizantes e agressividade",
    categoria: "Saúde mental e comportamento",
    fonte: "PubMed Central",
    descricao:
      "Revisão sistemática e meta-análise sobre o efeito dos anabolizantes na agressividade autorrelatada em homens saudáveis.",
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8233285/"
  },
  {
    id: 22,
    titulo: "Dependência de Anabolizantes e disfunção executiva",
    categoria: "Dependência e uso problemático",
    fonte: "Drug and Alcohol Dependence / ScienceDirect",
    descricao:
      "Estudo sobre dependência de anabolizantes, disfunção executiva, cognição e sofrimento psicológico.",
    link: "https://www.sciencedirect.com/science/article/pii/S0376871620300399"
  },
  {
    id: 23,
    titulo: "Anabolizantes, dependência e comportamento agressivo",
    categoria: "Dependência e uso problemático",
    fonte: "ScienceDirect",
    descricao:
      "Estudo sobre dependência de anabolizantes, agressividade, violência interpessoal e traços antissociais.",
    link: "https://www.sciencedirect.com/science/article/pii/S0376871621000995"
  },
  {
    id: 24,
    titulo: "Uso de anabolizantes em esportes, saúde e sociedade",
    categoria: "Diretrizes e posicionamentos",
    fonte: "Medicine & Science in Sports & Exercise",
    descricao:
      "Consenso científico sobre uso de anabolizantes, abordando desempenho esportivo, efeitos adversos e aspectos éticos.",
    link: "https://journals.lww.com/acsm-msse/fulltext/2021/08000/anabolic_androgenic_steroid_use_in_sports,_health,.26.aspx"
  },
  {
    id: 25,
    titulo: "Bomba tô fora",
    categoria: "Diretrizes e posicionamentos",
    fonte: "Sociedade Brasileira de Endocrinologia e Metabologia",
    descricao:
      "Material educativo da SBEM sobre riscos do uso de anabolizantes.",
    link: "https://s3.endocrino.org.br/bomba-to-fora-e-book-SBEM.pdf"
  },
  {
    id: 26,
    titulo: "Posicionamento da SBEM sobre anabolizantes",
    categoria: "Diretrizes e posicionamentos",
    fonte: "Sociedade Brasileira de Endocrinologia e Metabologia",
    descricao:
      "Documento institucional da SBEM sobre uso de anabolizantes e riscos associados.",
    link: "https://www.endocrino.org.br/wp-content/uploads/2022/09/Posicionamento-da-SBEM-Anabolizantes.docx.pdf"
  },
  {
    id: 27,
    titulo: "Imagem corporal e uso de anabolizantes",
    categoria: "Saúde pública e educação",
    fonte: "SciELO",
    descricao:
      "Estudo sobre como culto ao corpo, padrões estéticos, pressão social e busca rápida por resultados favorecem o uso de anabolizantes em academias.",
    link: "https://www.scielo.br/j/csp/a/Zsg5mPyZ5M5m4NdZKT8Bb6L/?lang=pt"
  },
];

export default referencias;