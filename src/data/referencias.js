export const CATEGORIES = {
  cardio: {
    filterLabel: { pt: "Cardiovascular", en: "Cardiovascular" },
    fullLabel: { pt: "Cardiovascular", en: "Cardiovascular" },
  },
  figado: {
    filterLabel: { pt: "Fígado", en: "Liver" },
    fullLabel: { pt: "Fígado e metabolismo", en: "Liver and metabolism" },
  },
  sistemicos: {
    filterLabel: { pt: "Efeitos sistêmicos", en: "Systemic effects" },
    fullLabel: { pt: "Efeitos sistêmicos", en: "Systemic effects" },
  },
  hormonal: {
    filterLabel: { pt: "Hormonal", en: "Hormonal" },
    fullLabel: { pt: "Hormonal e urológico", en: "Hormonal and urological" },
  },
  mental: {
    filterLabel: { pt: "Saúde mental", en: "Mental health" },
    fullLabel: { pt: "Saúde mental e comportamento", en: "Mental health and behavior" },
  },
  dependencia: {
    filterLabel: { pt: "Dependência", en: "Dependency" },
    fullLabel: { pt: "Dependência e uso problemático", en: "Dependency and problematic use" },
  },
  diretrizes: {
    filterLabel: { pt: "Diretrizes", en: "Guidelines" },
    fullLabel: { pt: "Diretrizes e posicionamentos", en: "Guidelines and position statements" },
  },
  publica: {
    filterLabel: { pt: "Saúde pública", en: "Public health" },
    fullLabel: { pt: "Saúde pública e educação", en: "Public health and education" },
  },
};

const referencias = [
  {
    id: 1,
    categoriaId: "cardio",
    titulo: {
      pt: "Anabolizantes, trombose e função endotelial",
      en: "Anabolic steroids, thrombosis and endothelial function",
    },
    fonte: "Sociedade de Cardiologia do Rio Grande do Sul",
    descricao: {
      pt: "Artigo sobre marcadores aterotrombóticos e função endotelial associados ao uso de anabolizantes.",
      en: "Article on atherothrombotic markers and endothelial function associated with anabolic steroid use.",
    },
    link: "http://sociedades.cardiol.br/sbc-rs/revista/2006/09/Artigo_07_Esteroides_Anabolizantes.pdf",
  },
  {
    id: 2,
    categoriaId: "cardio",
    titulo: {
      pt: "Avaliação cardíaca por imagem em usuários de anabolizantes",
      en: "Cardiac imaging assessment in anabolic steroid users",
    },
    fonte: "ABC Imaging",
    descricao: {
      pt: "Revisão sobre alterações cardíacas em usuários de anabolizantes avaliadas por ecocardiograma, tomografia e ressonância.",
      en: "Review of cardiac changes in anabolic steroid users assessed by echocardiography, CT and MRI.",
    },
    link: "https://www.abcimaging.org/wp-content/uploads/articles_xml/2675-312X-abcimg-37-01-e20230113/2675-312X-abcimg-37-01-e20230113.pdf",
  },
  {
    id: 3,
    categoriaId: "cardio",
    titulo: {
      pt: "Manejo do risco cardiovascular em atletas usuários de Anabolizantes",
      en: "Managing cardiovascular risk in athletes using anabolic steroids",
    },
    fonte: "American College of Cardiology",
    descricao: {
      pt: "Análise clínica sobre avaliação cardiovascular e manejo de atletas que usam anabolizantes.",
      en: "Clinical analysis on cardiovascular assessment and management of athletes who use anabolic steroids.",
    },
    link: "https://www.acc.org/latest-in-cardiology/articles/2024/04/01/16/10/the-experts-approach-to-managing-cv-risk-among-athletes-using-anabolic-androgenic-steroids",
  },
  {
    id: 4,
    categoriaId: "cardio",
    titulo: {
      pt: "Anabolizantes e funcionalidade do colesterol HDL",
      en: "Anabolic steroids and HDL cholesterol functionality",
    },
    fonte: "Jornal da USP",
    descricao: {
      pt: "Reportagem sobre como anabolizantes podem prejudicar a função protetora do colesterol HDL.",
      en: "News report on how anabolic steroids can impair the protective function of HDL cholesterol.",
    },
    link: "https://jornal.usp.br/ciencias/ciencias-da-saude/ciencias-2811-anabolizantes-comprometem-funcionalidade-do-colesterol-bom/",
  },
  {
    id: 5,
    categoriaId: "cardio",
    titulo: {
      pt: "Anabolizantes e saúde arterial em fisiculturistas",
      en: "Anabolic steroids and arterial health in bodybuilders",
    },
    fonte: "Journal of the American College of Cardiology",
    descricao: {
      pt: "Estudo sobre estrutura arterial, função vascular e massa ventricular em fisiculturistas usuários de Anabolizantes.",
      en: "Study on arterial structure, vascular function and ventricular mass in bodybuilders using anabolic steroids.",
    },
    link: "https://www.jacc.org/doi/10.1016/S0735-1097(00)01083-4",
  },
  {
    id: 6,
    categoriaId: "cardio",
    titulo: {
      pt: "Anabolizantes e doenças cardiovasculares",
      en: "Anabolic steroids and cardiovascular disease",
    },
    fonte: "American Heart Association",
    descricao: {
      pt: "Estudo sobre maior risco cardiovascular em usuários de anabolizantes.",
      en: "Study on increased cardiovascular risk in anabolic steroid users.",
    },
    link: "https://www.ahajournals.org/doi/10.1161/CIRCULATIONAHA.124.071117",
  },
  {
    id: 7,
    categoriaId: "cardio",
    titulo: {
      pt: "Anabolizantes e cardiomiopatia",
      en: "Anabolic steroids and cardiomyopathy",
    },
    fonte: "Frontiers in Cardiovascular Medicine",
    descricao: {
      pt: "Revisão sobre lesão cardíaca e insuficiência cardíaca associadas ao uso de anabolizantes.",
      en: "Review of cardiac injury and heart failure associated with anabolic steroid use.",
    },
    link: "https://www.frontiersin.org/journals/cardiovascular-medicine/articles/10.3389/fcvm.2023.1214374/full",
  },
  {
    id: 8,
    categoriaId: "figado",
    titulo: {
      pt: "Diferentes formas de lesão hepática por anabolizantes",
      en: "Different forms of liver injury caused by anabolic steroids",
    },
    fonte: "PubMed Central",
    descricao: {
      pt: "Relato de casos sobre diferentes lesões hepáticas associadas ao uso de anabolizantes.",
      en: "Case report on different liver injuries associated with anabolic steroid use.",
    },
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8766528/",
  },
  {
    id: 9,
    categoriaId: "figado",
    titulo: {
      pt: "Câncer hepático associado ao uso de anabolizantes",
      en: "Liver cancer associated with anabolic steroid use",
    },
    fonte: "PubMed Central",
    descricao: {
      pt: "Relato de casos sobre câncer hepático e de vias biliares associado ao uso de anabolizantes e testosterona.",
      en: "Case report on liver and biliary tract cancer associated with the use of anabolic steroids and testosterone.",
    },
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9975287/",
  },
  {
    id: 10,
    categoriaId: "sistemicos",
    titulo: {
      pt: "Anabolizantes, efeitos cardiorrenais e metabólicos",
      en: "Anabolic steroids, cardiorenal and metabolic effects",
    },
    fonte: "ScienceDirect",
    descricao: {
      pt: "Artigo sobre danos cardiovasculares, renais e metabólicos associados ao uso de anabolizantes.",
      en: "Article on cardiovascular, renal and metabolic damage associated with anabolic steroid use.",
    },
    link: "https://www.sciencedirect.com/science/article/pii/S0041008X25000146",
  },
  {
    id: 11,
    categoriaId: "sistemicos",
    titulo: {
      pt: "Anabolizantes e efeitos adversos no organismo",
      en: "Anabolic steroids and adverse effects on the body",
    },
    fonte: "SciELO",
    descricao: {
      pt: "Revisão sobre efeitos adversos do uso abusivo de esteroides anabolizantes em diferentes sistemas do organismo.",
      en: "Review of adverse effects of anabolic steroid abuse on different body systems.",
    },
    link: "https://www.scielo.br/j/refuem/a/Yp3sBLmsrV7phpZMtsbmCpj/?format=html&lang=pt",
  },
  {
    id: 12,
    categoriaId: "hormonal",
    titulo: {
      pt: "Riscos urológicos do uso de anabolizantes",
      en: "Urological risks of anabolic steroid use",
    },
    fonte: "Portal da Urologia",
    descricao: {
      pt: "Orientação sobre a relação entre anabolizantes, disfunção erétil, infertilidade e atrofia testicular.",
      en: "Guidance on the relationship between anabolic steroids, erectile dysfunction, infertility and testicular atrophy.",
    },
    link: "https://portaldaurologia.org.br/sua-saude/dicas/riscos-urologicos-do-uso-de-anabolizantes",
  },
  {
    id: 13,
    categoriaId: "hormonal",
    titulo: {
      pt: "Uso indiscriminado de testosterona",
      en: "Indiscriminate use of testosterone",
    },
    fonte: "Portal da Urologia",
    descricao: {
      pt: "Orientação da Sociedade Brasileira de Urologia sobre riscos do uso de testosterona sem prescrição médica.",
      en: "Guidance from the Brazilian Society of Urology on the risks of using testosterone without a medical prescription.",
    },
    link: "https://portaldaurologia.org.br/sua-saude/dicas/uso-indiscriminado-e-sem-indicacao-medica-de-testosterona",
  },
  {
    id: 14,
    categoriaId: "hormonal",
    titulo: {
      pt: "Anabolizantes, hipogonadismo e recuperação hormonal",
      en: "Anabolic steroids, hypogonadism and hormonal recovery",
    },
    fonte: "European Journal of Endocrinology",
    descricao: {
      pt: "Estudo sobre recuperação hormonal após parar anabolizantes e fatores associados à normalização de testosterona, LH e FSH.",
      en: "Study on hormonal recovery after stopping anabolic steroids and factors associated with normalization of testosterone, LH and FSH.",
    },
    link: "https://academic.oup.com/ejendo/article/189/6/601/7475314",
  },
  {
    id: 15,
    categoriaId: "hormonal",
    titulo: {
      pt: "Anabolizantes e ginecomastia",
      en: "Anabolic steroids and gynecomastia",
    },
    fonte: "PubMed Central",
    descricao: {
      pt: "Estudo sobre ginecomastia associada a anabolizantes, prevalência subestimada e tratamento.",
      en: "Study on anabolic steroid-associated gynecomastia, underestimated prevalence and treatment.",
    },
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10497340/",
  },
  {
    id: 16,
    categoriaId: "hormonal",
    titulo: {
      pt: "Abuso de Anabolizantes e saúde reprodutiva masculina",
      en: "Anabolic steroid abuse and male reproductive health",
    },
    fonte: "PubMed Central",
    descricao: {
      pt: "Estudo sobre abuso de Anabolizantes, fertilidade, função sexual e recuperação hormonal.",
      en: "Study on anabolic steroid abuse, fertility, sexual function and hormonal recovery.",
    },
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10078442/",
  },
  {
    id: 17,
    categoriaId: "mental",
    titulo: {
      pt: "Anabolizantes e estrutura cerebral",
      en: "Anabolic steroids and brain structure",
    },
    fonte: "Biological Psychiatry",
    descricao: {
      pt: "Estudo de neuroimagem sobre alterações no volume cerebral e na espessura cortical em usuários de longo prazo de AAS.",
      en: "Neuroimaging study on changes in brain volume and cortical thickness in long-term AAS users.",
    },
    link: "https://www.biologicalpsychiatryjournal.com/article/S0006-3223(16)32529-X/fulltext",
  },
  {
    id: 18,
    categoriaId: "mental",
    titulo: {
      pt: "Anabolizantes, saúde mental e função social",
      en: "Anabolic steroids, mental health and social function",
    },
    fonte: "PubMed Central",
    descricao: {
      pt: "Estudo sobre impactos emocionais, cognitivos e sociais do uso prolongado de substâncias para performance, com foco em anabolizantes.",
      en: "Study on the emotional, cognitive and social impacts of prolonged performance-enhancing substance use, with a focus on anabolic steroids.",
    },
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12705642/",
  },
  {
    id: 19,
    categoriaId: "mental",
    titulo: {
      pt: "Abuso de anabolizantes e efeitos psiquiátricos",
      en: "Anabolic steroid abuse and psychiatric effects",
    },
    fonte: "Cleveland Clinic Journal of Medicine",
    descricao: {
      pt: "Revisão sobre efeitos psiquiátricos e físicos do abuso de esteroides anabolizantes.",
      en: "Review of the psychiatric and physical effects of anabolic steroid abuse.",
    },
    link: "https://www.ccjm.org/content/ccjom/74/5/341.full.pdf",
  },
  {
    id: 20,
    categoriaId: "mental",
    titulo: {
      pt: "Anabolizantes e sofrimento psicológico",
      en: "Anabolic steroids and psychological distress",
    },
    fonte: "PubMed Central",
    descricao: {
      pt: "Estudo sobre agressividade, sofrimento psicológico e diferenças entre homens e mulheres usuários de anabolizantes.",
      en: "Study on aggression, psychological distress and differences between male and female anabolic steroid users.",
    },
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8211877/",
  },
  {
    id: 21,
    categoriaId: "mental",
    titulo: {
      pt: "Anabolizantes e agressividade",
      en: "Anabolic steroids and aggression",
    },
    fonte: "PubMed Central",
    descricao: {
      pt: "Revisão sistemática e meta-análise sobre o efeito dos anabolizantes na agressividade autorrelatada em homens saudáveis.",
      en: "Systematic review and meta-analysis on the effect of anabolic steroids on self-reported aggression in healthy men.",
    },
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8233285/",
  },
  {
    id: 22,
    categoriaId: "dependencia",
    titulo: {
      pt: "Dependência de Anabolizantes e disfunção executiva",
      en: "Anabolic steroid dependence and executive dysfunction",
    },
    fonte: "Drug and Alcohol Dependence / ScienceDirect",
    descricao: {
      pt: "Estudo sobre dependência de anabolizantes, disfunção executiva, cognição e sofrimento psicológico.",
      en: "Study on anabolic steroid dependence, executive dysfunction, cognition and psychological distress.",
    },
    link: "https://www.sciencedirect.com/science/article/pii/S0376871620300399",
  },
  {
    id: 23,
    categoriaId: "dependencia",
    titulo: {
      pt: "Anabolizantes, dependência e comportamento agressivo",
      en: "Anabolic steroids, dependence and aggressive behavior",
    },
    fonte: "ScienceDirect",
    descricao: {
      pt: "Estudo sobre dependência de anabolizantes, agressividade, violência interpessoal e traços antissociais.",
      en: "Study on anabolic steroid dependence, aggression, interpersonal violence and antisocial traits.",
    },
    link: "https://www.sciencedirect.com/science/article/pii/S0376871621000995",
  },
  {
    id: 24,
    categoriaId: "diretrizes",
    titulo: {
      pt: "Uso de anabolizantes em esportes, saúde e sociedade",
      en: "Anabolic steroid use in sports, health and society",
    },
    fonte: "Medicine & Science in Sports & Exercise",
    descricao: {
      pt: "Consenso científico sobre uso de anabolizantes, abordando desempenho esportivo, efeitos adversos e aspectos éticos.",
      en: "Scientific consensus on anabolic steroid use, covering athletic performance, adverse effects and ethical aspects.",
    },
    link: "https://journals.lww.com/acsm-msse/fulltext/2021/08000/anabolic_androgenic_steroid_use_in_sports,_health,.26.aspx",
  },
  {
    id: 25,
    categoriaId: "diretrizes",
    titulo: {
      pt: "Bomba tô fora",
      en: "Steroids? Count Me Out",
    },
    fonte: "Sociedade Brasileira de Endocrinologia e Metabologia",
    descricao: {
      pt: "Material educativo da SBEM sobre riscos do uso de anabolizantes.",
      en: "Educational material from SBEM (Brazilian Society of Endocrinology and Metabolism) on the risks of anabolic steroid use.",
    },
    link: "https://s3.endocrino.org.br/bomba-to-fora-e-book-SBEM.pdf",
  },
  {
    id: 26,
    categoriaId: "diretrizes",
    titulo: {
      pt: "Posicionamento da SBEM sobre anabolizantes",
      en: "SBEM position statement on anabolic steroids",
    },
    fonte: "Sociedade Brasileira de Endocrinologia e Metabologia",
    descricao: {
      pt: "Documento institucional da SBEM sobre uso de anabolizantes e riscos associados.",
      en: "Institutional document from SBEM on anabolic steroid use and associated risks.",
    },
    link: "https://www.endocrino.org.br/wp-content/uploads/2022/09/Posicionamento-da-SBEM-Anabolizantes.docx.pdf",
  },
  {
    id: 27,
    categoriaId: "publica",
    titulo: {
      pt: "Imagem corporal e uso de anabolizantes",
      en: "Body image and anabolic steroid use",
    },
    fonte: "SciELO",
    descricao: {
      pt: "Estudo sobre como culto ao corpo, padrões estéticos, pressão social e busca rápida por resultados favorecem o uso de anabolizantes em academias.",
      en: "Study on how body worship, aesthetic standards, social pressure and the pursuit of quick results favor anabolic steroid use in gyms.",
    },
    link: "https://www.scielo.br/j/csp/a/Zsg5mPyZ5M5m4NdZKT8Bb6L/?lang=pt",
  },
];

export default referencias;
