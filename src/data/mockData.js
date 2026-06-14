function ultimo(array) {
  return array[array.length - 1]
}

function anterior(array) {
  return array[array.length - 2]
}

function calcularDelta(atual, passado) {
  if (!passado || passado === 0) return '0% vs. anterior'

  const diff = ((atual - passado) / passado) * 100
  const sinal = diff >= 0 ? '+' : ''

  return `${sinal}${diff.toFixed(0)}% vs. mar`
}

const perfil = {
  nome: 'Natalia Lugao',
  idade: 26,
  sexo: 'feminino',
  tempoUso: '12 meses',
  dosagem: '500mg/sem',
  esteroides: ['Testosterona Enantato', 'Trembolona', 'Oxandrolona'],
  nivelRisco: 'alto',
  ultimoExame: '12 abr 2025',
}

const chartData = {
  meses: ['Jan', 'Fev', 'Mar', 'Abr'],

  cardiovascular: {
    exames: [
      {
        data: 'Jan',
        hdl: 48,
        ldl: 92,
        naoHdl: 118,
        vldl: 22,
        triglicerides: 110,
        pcrUs: 0.8,
        apoA1: 145,
        apoB: 88,
        homocisteina: 9.4,
        ntProBnp: 80,
        lpa: 22,
        pressaoSistolica: 118,
        pressaoDiastolica: 76,
      },
      {
        data: 'Fev',
        hdl: 38,
        ldl: 128,
        naoHdl: 158,
        vldl: 30,
        triglicerides: 148,
        pcrUs: 1.9,
        apoA1: 132,
        apoB: 112,
        homocisteina: 11.2,
        ntProBnp: 96,
        lpa: 25,
        pressaoSistolica: 124,
        pressaoDiastolica: 82,
      },
      {
        data: 'Mar',
        hdl: 31,
        ldl: 168,
        naoHdl: 196,
        vldl: 38,
        triglicerides: 190,
        pcrUs: 3.4,
        apoA1: 110,
        apoB: 138,
        homocisteina: 14.6,
        ntProBnp: 132,
        lpa: 28,
        pressaoSistolica: 136,
        pressaoDiastolica: 88,
      },
      {
        data: 'Abr',
        hdl: 25,
        ldl: 196,
        naoHdl: 235,
        vldl: 46,
        triglicerides: 230,
        pcrUs: 4.8,
        apoA1: 92,
        apoB: 162,
        homocisteina: 16.1,
        ntProBnp: 158,
        lpa: 33,
        pressaoSistolica: 145,
        pressaoDiastolica: 94,
      },
    ],
  },

  endocrino: {
    exames: [
      {
        data: 'Jan',
        glicose: 86,
        hemoglobinaGlicada: 5.1,
        testosteronaTotal: 720,
        testosteronaLivre: 520,
        lh: 6.1,
        fsh: 5.2,
        estradiol: 32,
        prolactina: 10,
        shbg: 38,
      },
      {
        data: 'Fev',
        glicose: 94,
        hemoglobinaGlicada: 5.4,
        testosteronaTotal: 1100,
        testosteronaLivre: 820,
        lh: 2.2,
        fsh: 2.1,
        estradiol: 51,
        prolactina: 16,
        shbg: 24,
      },
      {
        data: 'Mar',
        glicose: 103,
        hemoglobinaGlicada: 6.2,
        testosteronaTotal: 1450,
        testosteronaLivre: 980,
        lh: 0.4,
        fsh: 0.6,
        estradiol: 72,
        prolactina: 22,
        shbg: 12,
      },
      {
        data: 'Abr',
        glicose: 112,
        hemoglobinaGlicada: 6.5,
        testosteronaTotal: 1800,
        testosteronaLivre: 1220,
        lh: 0.2,
        fsh: 0.3,
        estradiol: 88,
        prolactina: 28,
        shbg: 9,
      },
    ],
  },

  hematologico: {
    exames: [
      {
        data: 'Jan',
        hemoglobina: 15.2,
        hematocrito: 45.1,
        vcm: 88,
        hcm: 29.8,
        chcm: 33.5,
        rdwCv: 13.1,
        rdwSd: 41,
        eritroblastos: 0,
        leucocitos: 6.8,
        neutrofilos: 58,
        eosinofilos: 3,
        basofilos: 0.5,
        linfocitos: 31,
        monocitos: 7,
        plaquetas: 260,
        vmp: 10.4,
      },
      {
        data: 'Fev',
        hemoglobina: 16.4,
        hematocrito: 49.2,
        vcm: 89,
        hcm: 30.1,
        chcm: 34,
        rdwCv: 13.6,
        rdwSd: 42,
        eritroblastos: 0,
        leucocitos: 7.4,
        neutrofilos: 61,
        eosinofilos: 4,
        basofilos: 0.8,
        linfocitos: 28,
        monocitos: 7,
        plaquetas: 238,
        vmp: 10.9,
      },
      {
        data: 'Mar',
        hemoglobina: 17.9,
        hematocrito: 53.8,
        vcm: 91,
        hcm: 30.4,
        chcm: 34.2,
        rdwCv: 14.2,
        rdwSd: 44,
        eritroblastos: 0,
        leucocitos: 10.8,
        neutrofilos: 72,
        eosinofilos: 5,
        basofilos: 1.1,
        linfocitos: 20,
        monocitos: 9,
        plaquetas: 418,
        vmp: 12.4,
      },
      {
        data: 'Abr',
        hemoglobina: 18.6,
        hematocrito: 56.2,
        vcm: 94,
        hcm: 31,
        chcm: 35.1,
        rdwCv: 15.8,
        rdwSd: 49,
        eritroblastos: 0,
        leucocitos: 12.4,
        neutrofilos: 78,
        eosinofilos: 9,
        basofilos: 1.8,
        linfocitos: 17,
        monocitos: 14,
        plaquetas: 450,
        vmp: 13.4,
      },
    ],
  },

  hepatico: {
    exames: [
      {
        data: 'Jan',
        alt: 38,
        ast: 29,
        ggt: 22,
        alp: 78,
        bilirrubinaTotal: 0.8,
        albumina: 4.5,
      },
      {
        data: 'Fev',
        alt: 52,
        ast: 48,
        ggt: 31,
        alp: 88,
        bilirrubinaTotal: 1.0,
        albumina: 4.3,
      },
      {
        data: 'Mar',
        alt: 76,
        ast: 69,
        ggt: 42,
        alp: 94,
        bilirrubinaTotal: 1.1,
        albumina: 4.1,
      },
      {
        data: 'Abr',
        alt: 96,
        ast: 88,
        ggt: 78,
        alp: 130,
        bilirrubinaTotal: 1.5,
        albumina: 3.3,
      },
    ],
  },

  renal: {
    exames: [
      {
        data: 'Jan',
        cistatinaC: 0.82,
        creatinina: 0.96,
        ureia: 32,
        microalbuminuriaCreatinina: 18,
        proteinuriaCreatinina: 0.12,
      },
      {
        data: 'Fev',
        cistatinaC: 1.05,
        creatinina: 1.14,
        ureia: 41,
        microalbuminuriaCreatinina: 28,
        proteinuriaCreatinina: 0.18,
      },
      {
        data: 'Mar',
        cistatinaC: 1.28,
        creatinina: 1.36,
        ureia: 57,
        microalbuminuriaCreatinina: 74,
        proteinuriaCreatinina: 0.26,
      },
      {
        data: 'Abr',
        cistatinaC: 1.48,
        creatinina: 1.58,
        ureia: 68,
        microalbuminuriaCreatinina: 325,
        proteinuriaCreatinina: 0.38,
      },
    ],
  },
}

function gerarMetricas(chartData) {
  const examesCardio = chartData.cardiovascular.exames
  const cardioAtual = ultimo(examesCardio)
  const cardioAnterior = anterior(examesCardio)

  const examesEndocrinos = chartData.endocrino.exames
  const endocrinoAtual = ultimo(examesEndocrinos)
  const endocrinoAnterior = anterior(examesEndocrinos)

  const examesHepaticos = chartData.hepatico.exames
  const hepaticoAtual = ultimo(examesHepaticos)
  const hepaticoAnterior = anterior(examesHepaticos)

  return [
    {
      id: 'testosterona',
      label: 'Testosterona',
      valor: endocrinoAtual.testosteronaTotal.toLocaleString('pt-BR'),
      unidade: 'ng/dL',
      delta: calcularDelta(
        endocrinoAtual.testosteronaTotal,
        endocrinoAnterior.testosteronaTotal
      ),
      deltaDir:
        endocrinoAtual.testosteronaTotal > endocrinoAnterior.testosteronaTotal
          ? 'up'
          : 'down',
      cor: '#c084fc',
    },
    {
      id: 'ldl',
      label: 'LDL',
      valor: String(cardioAtual.ldl),
      unidade: 'mg/dL',
      delta: `${calcularDelta(cardioAtual.ldl, cardioAnterior.ldl)} · limite 130`,
      deltaDir: cardioAtual.ldl > cardioAnterior.ldl ? 'up' : 'down',
      cor: '#c0392b',
    },
    {
      id: 'tgo',
      label: 'TGO / TGP',
      valor: `${hepaticoAtual.ast} / ${hepaticoAtual.alt}`,
      unidade: 'U/L',
      delta: `${calcularDelta(
        hepaticoAtual.ast,
        hepaticoAnterior.ast
      )} · limite 40`,
      deltaDir: hepaticoAtual.ast > hepaticoAnterior.ast ? 'up' : 'down',
      cor: '#d97706',
    },
    {
      id: 'hdl',
      label: 'HDL',
      valor: String(cardioAtual.hdl),
      unidade: 'mg/dL',
      delta: `${calcularDelta(cardioAtual.hdl, cardioAnterior.hdl)} · ideal >40`,
      deltaDir: cardioAtual.hdl > cardioAnterior.hdl ? 'up' : 'down',
      cor: '#27ae60',
    },
  ]
}

function gerarAlertas(chartData, perfil) {
  const alertas = []

  const ultimoCardio = ultimo(chartData.cardiovascular.exames)
  const ultimoHepatico = ultimo(chartData.hepatico.exames)
  const ultimoEndocrino = ultimo(chartData.endocrino.exames)
  const ultimoHematologico = ultimo(chartData.hematologico.exames)
  const ultimoRenal = ultimo(chartData.renal.exames)

  const adulto = perfil.idade >= 20
  const masculino = perfil.sexo === 'masculino'

  const hdlMin = adulto ? 40 : 45
  const ldlAlto = 160
  const ldlMuitoAlto = 190

  if (ultimoCardio.ldl >= ldlMuitoAlto || ultimoCardio.hdl < hdlMin) {
    alertas.push({
      id: 'cardio-ldl-hdl',
      nivel: 'alto',
      titulo: 'Risco cardiovascular',
      descricao: `LDL em ${ultimoCardio.ldl} mg/dL e HDL em ${ultimoCardio.hdl} mg/dL.`,
    })
  } else if (ultimoCardio.ldl >= ldlAlto) {
    alertas.push({
      id: 'cardio-ldl',
      nivel: 'atencao',
      titulo: 'Atenção cardiovascular',
      descricao: `LDL em ${ultimoCardio.ldl} mg/dL, acima da faixa ideal.`,
    })
  }

  if (ultimoCardio.pcrUs > 3) {
    alertas.push({
      id: 'cardio-pcr',
      nivel: 'atencao',
      titulo: 'Inflamação vascular',
      descricao: `PCR-us em ${ultimoCardio.pcrUs} mg/L, indicando maior risco inflamatório.`,
    })
  }

  if (
    ultimoCardio.pressaoSistolica >= 140 ||
    ultimoCardio.pressaoDiastolica >= 90
  ) {
    alertas.push({
      id: 'cardio-pressao',
      nivel: 'alto',
      titulo: 'Pressão arterial elevada',
      descricao: `${ultimoCardio.pressaoSistolica}/${ultimoCardio.pressaoDiastolica} mmHg no último registro.`,
    })
  }

  const altMax = masculino ? 45 : 34
  const astMax = 34
  const ggtMax = masculino ? 64 : 36

  const transaminasesAltas =
    ultimoHepatico.alt > altMax || ultimoHepatico.ast > astMax

  const ggtAlta = ultimoHepatico.ggt > ggtMax

  if (transaminasesAltas && ggtAlta) {
    alertas.push({
      id: 'hepatico-ggt',
      nivel: 'alto',
      titulo: 'Sobrecarga hepática',
      descricao: `ALT ${ultimoHepatico.alt} U/L, AST ${ultimoHepatico.ast} U/L e GGT ${ultimoHepatico.ggt} U/L.`,
    })
  } else if (transaminasesAltas) {
    alertas.push({
      id: 'hepatico-transaminases',
      nivel: 'atencao',
      titulo: 'Transaminases elevadas',
      descricao: 'ALT/TGP ou AST/TGO elevados com GGT ainda dentro do limite.',
    })
  }

  const testosteronaTotalMax = masculino
    ? perfil.idade > 50
      ? 674
      : 803
    : 50

  const testosteronaLivreMax = masculino ? 640 : 37

  if (
    ultimoEndocrino.testosteronaTotal > testosteronaTotalMax ||
    ultimoEndocrino.testosteronaLivre > testosteronaLivreMax
  ) {
    alertas.push({
      id: 'endocrino-testosterona',
      nivel: 'atencao',
      titulo: 'Testosterona elevada',
      descricao: `Testosterona total em ${ultimoEndocrino.testosteronaTotal} ng/dL.`,
    })
  }

  const lhMin = masculino ? 0.6 : 1.8
  const fshMin = masculino ? 0.9 : 3.0

  if (ultimoEndocrino.lh < lhMin && ultimoEndocrino.fsh < fshMin) {
    alertas.push({
      id: 'endocrino-eixo',
      nivel: 'atencao',
      titulo: 'Supressão hormonal',
      descricao: `LH ${ultimoEndocrino.lh} IU/L e FSH ${ultimoEndocrino.fsh} IU/L abaixo da referência.`,
    })
  }

  if (
    ultimoEndocrino.glicose > 99 ||
    ultimoEndocrino.hemoglobinaGlicada > 6.0
  ) {
    alertas.push({
      id: 'endocrino-metabolico',
      nivel: 'atencao',
      titulo: 'Atenção metabólica',
      descricao: `Glicose ${ultimoEndocrino.glicose} mg/dL e HbA1c ${ultimoEndocrino.hemoglobinaGlicada}%.`,
    })
  }

  if (ultimoHematologico.hematocrito > 52.4) {
    alertas.push({
      id: 'hematologico-hematocrito',
      nivel: ultimoHematologico.hematocrito >= 55 ? 'alto' : 'atencao',
      titulo: 'Policitemia secundária',
      descricao: `Hematócrito em ${ultimoHematologico.hematocrito}%, aumentando risco de sangue viscoso.`,
    })
  }

  if (ultimoHematologico.plaquetas > 425) {
    alertas.push({
      id: 'hematologico-plaquetas',
      nivel: 'atencao',
      titulo: 'Plaquetas elevadas',
      descricao: `Plaquetas em ${ultimoHematologico.plaquetas} mil/mm³.`,
    })
  }

  const creatininaMax = masculino ? 1.25 : 1.11
  const cistatinaMax = perfil.idade > 50
    ? masculino ? 1.53 : 1.38
    : masculino ? 1.22 : 1.07

  if (
    ultimoRenal.microalbuminuriaCreatinina >= 300 ||
    ultimoRenal.creatinina > creatininaMax ||
    ultimoRenal.cistatinaC > cistatinaMax
  ) {
    alertas.push({
      id: 'renal-risco',
      nivel: 'alto',
      titulo: 'Risco renal',
      descricao: `Creatinina ${ultimoRenal.creatinina} mg/dL e microalbuminúria ${ultimoRenal.microalbuminuriaCreatinina} mg/g.`,
    })
  } else if (ultimoRenal.microalbuminuriaCreatinina >= 30) {
    alertas.push({
      id: 'renal-estresse',
      nivel: 'atencao',
      titulo: 'Estresse renal',
      descricao: `Microalbuminúria em ${ultimoRenal.microalbuminuriaCreatinina} mg/g.`,
    })
  }

  if (!alertas.length) {
    alertas.push({
      id: 'normal',
      nivel: 'normal',
      titulo: 'Nenhum alerta ativo',
      descricao: 'Os principais marcadores estão dentro das faixas esperadas.',
    })
  }

  return alertas
}

export const MOCK_DATA = {
  perfil,

  metricas: gerarMetricas(chartData),

  alertas: gerarAlertas(chartData, perfil),

  exames: [
    {
      id: 1,
      nome: 'Hemograma completo',
      data: '12 abr',
      tipo: 'sangue',
      cor: '#60a5fa',
      resultado: 'alterado',
    },
    {
      id: 2,
      nome: 'Perfil lipídico',
      data: '12 abr',
      tipo: 'sangue',
      cor: '#60a5fa',
      resultado: 'alterado',
    },
    {
      id: 3,
      nome: 'Painel hormonal',
      data: '10 mar',
      tipo: 'hormonal',
      cor: '#c084fc',
      resultado: 'alterado',
    },
    {
      id: 4,
      nome: 'TGO / TGP',
      data: '10 mar',
      tipo: 'hepático',
      cor: '#fb923c',
      resultado: 'alterado',
    },
    {
      id: 5,
      nome: 'Creatinina',
      data: '15 fev',
      tipo: 'renal',
      cor: '#34d399',
      resultado: 'normal',
    },
    {
      id: 6,
      nome: 'Ecocardiograma',
      data: '20 jan',
      tipo: 'cardíaco',
      cor: '#f472b6',
      resultado: 'pendente',
    },
  ],

  insights: [
    {
      id: 1,
      num: '01',
      texto: 'LDL cresceu',
      destaque: '+113%',
      resto: 'em 4 meses — progressão importante durante o acompanhamento',
    },
    {
      id: 2,
      num: '02',
      texto: 'HDL caiu',
      destaque: '48%',
      resto: 'desde janeiro — padrão desfavorável para risco cardiovascular',
    },
    {
      id: 3,
      num: '03',
      texto: 'Enzimas hepáticas',
      destaque: 'subiram',
      resto: 'com GGT elevada — possível sobrecarga hepática',
    },
    {
      id: 4,
      num: '04',
      texto: 'Hematócrito acima de',
      destaque: '55%',
      resto: '— pode indicar sangue mais viscoso e maior risco trombótico',
    },
    {
      id: 5,
      num: '05',
      texto: 'LH e FSH',
      destaque: 'suprimidos',
      resto: '— padrão compatível com supressão do eixo hormonal',
    },
  ],

  chartData,
}