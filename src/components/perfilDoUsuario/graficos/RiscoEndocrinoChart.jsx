import { useState } from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceArea,
  Legend,
} from 'recharts'

import { MOCK_DATA } from '../../../data/mockData'

const paciente = {
  sexo: 'masculino',
  idade: 24,
  faseMenstrual: 'folicular',
}

const examesEndocrinos = MOCK_DATA.chartData?.endocrino?.exames || []

function getLimitesEndocrinos(sexo, idade, faseMenstrual) {
  const masculino = sexo === 'masculino'
  const maior50 = idade > 50

  return {
    glicoseMin: 70,
    glicoseMax: 99,

    hemoglobinaGlicadaMin: 4.1,
    hemoglobinaGlicadaMax: 6.0,

    testosteronaTotalMin: masculino ? (maior50 ? 247 : 253) : 0,
    testosteronaTotalMax: masculino ? (maior50 ? 674 : 803) : 50,

    testosteronaLivreMin: masculino ? 131 : 2.4,
    testosteronaLivreMax: masculino ? 640 : 37,

    lhMin: masculino ? 0.6 : faseMenstrual === 'ovulatoria' ? 7.6 : 1.8,
    lhMax: masculino ? 12.1 : faseMenstrual === 'ovulatoria' ? 89.1 : 11.8,

    fshMin: masculino ? 0.9 : faseMenstrual === 'lutea' ? 1.4 : 3.0,
    fshMax: masculino ? 11.9 : faseMenstrual === 'lutea' ? 5.5 : 8.1,

    estradiolMax: masculino ? 44 : faseMenstrual === 'ovulatoria' ? 649 : 251,

    prolactinaMin: masculino ? 3.5 : 5.2,
    prolactinaMax: masculino ? 19.4 : 26.5,

    shbgMin: masculino ? 13.5 : 19.8,
    shbgMax: masculino ? 71.4 : 155.2,
  }
}

function calcularRiscoEndocrino(exame, sexo, idade, faseMenstrual) {
  const limites = getLimitesEndocrinos(sexo, idade, faseMenstrual)

  let pontos = 0

  if (exame.glicose > limites.glicoseMax) pontos += 1
  if (exame.hemoglobinaGlicada > limites.hemoglobinaGlicadaMax) pontos += 2
  if (exame.testosteronaTotal > limites.testosteronaTotalMax) pontos += 1
  if (exame.testosteronaLivre > limites.testosteronaLivreMax) pontos += 1
  if (exame.lh < limites.lhMin) pontos += 2
  if (exame.fsh < limites.fshMin) pontos += 2
  if (exame.estradiol > limites.estradiolMax) pontos += 1
  if (exame.prolactina > limites.prolactinaMax) pontos += 1
  if (exame.shbg < limites.shbgMin) pontos += 1

  const eixoSuprimido =
    exame.lh < limites.lhMin &&
    exame.fsh < limites.fshMin

  const testosteronaAlta =
    exame.testosteronaTotal > limites.testosteronaTotalMax ||
    exame.testosteronaLivre > limites.testosteronaLivreMax

  let status = 'Normal'
  let classe = 'normal'
  let insight = 'Marcadores hormonais dentro da faixa esperada.'

  if (testosteronaAlta) {
    status = 'Atenção hormonal'
    classe = 'alerta'
    insight =
      'Testosterona acima da referência pode indicar uso exógeno ou dose elevada no ciclo.'
  }

  if (eixoSuprimido) {
    status = 'Eixo hormonal suprimido'
    classe = 'critico'
    insight =
      'LH e FSH baixos sugerem supressão do eixo hormonal, comum durante uso de testosterona ou anabolizantes.'
  }

  if (
    exame.glicose > limites.glicoseMax ||
    exame.hemoglobinaGlicada > limites.hemoglobinaGlicadaMax
  ) {
    status = 'Atenção metabólica'
    classe = 'alerta'
    insight =
      'Glicose ou hemoglobina glicada elevadas podem indicar piora do controle metabólico.'
  }

  if (pontos >= 6) {
    status = 'Risco endócrino alto'
    classe = 'critico'
    insight =
      'Há múltiplas alterações hormonais e metabólicas. É recomendado procurar avaliação médica.'
  }

  return { pontos, status, classe, insight }
}

function TooltipEndocrino({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null

  return (
    <div className="tooltip-hepatico tooltip-simples">
      <span className="tooltip-data">{label}</span>

      {payload.map((item) => (
        <p key={item.dataKey} style={{ color: item.color }}>
          <strong>{item.name}:</strong> {item.value}
        </p>
      ))}
    </div>
  )
}

export default function RiscoEndocrinoChart() {
  const [abaAtiva, setAbaAtiva] = useState('metabolico')

  if (!examesEndocrinos.length) {
    return (
      <div className="chart-hepatico">
        <div className="chart-header">
          <div>
            <h3>Risco Endócrino</h3>
            <p>Nenhum dado endócrino encontrado no MOCK_DATA.</p>
          </div>
        </div>
      </div>
    )
  }

  const ultimoExame = examesEndocrinos[examesEndocrinos.length - 1]

  const riscoAtual = calcularRiscoEndocrino(
    ultimoExame,
    paciente.sexo,
    paciente.idade,
    paciente.faseMenstrual
  )

  const limites = getLimitesEndocrinos(
    paciente.sexo,
    paciente.idade,
    paciente.faseMenstrual
  )

  return (
    <div className="chart-hepatico">
      <div className="chart-header">
        <div>
          <h3>Risco Endócrino</h3>
          <p>Metabólico, androgênico e eixo LH/FSH</p>
        </div>

        <span className={`badge-risco ${riscoAtual.classe}`}>
          {riscoAtual.status}
        </span>
      </div>

      <div className="sub-chart-tabs">
        <button
          className={abaAtiva === 'metabolico' ? 'active' : ''}
          onClick={() => setAbaAtiva('metabolico')}
        >
          Metabólico
        </button>

        <button
          className={abaAtiva === 'androgenico' ? 'active' : ''}
          onClick={() => setAbaAtiva('androgenico')}
        >
          Androgênico
        </button>

        <button
          className={abaAtiva === 'eixo' ? 'active' : ''}
          onClick={() => setAbaAtiva('eixo')}
        >
          Eixo LH/FSH
        </button>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={examesEndocrinos}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="data" />
          <Tooltip content={<TooltipEndocrino />} />
          <Legend />

          {abaAtiva === 'metabolico' && (
            <>
              <YAxis domain={[0, 130]} />

              <ReferenceArea
                y1={70}
                y2={99}
                fill="#22c55e"
                fillOpacity={0.08}
              />

              <ReferenceArea
                y1={100}
                y2={130}
                fill="#ef4444"
                fillOpacity={0.08}
              />

              <Line
                type="monotone"
                dataKey="glicose"
                stroke="#3b82f6"
                strokeWidth={3}
                name="Glicose mg/dL"
                dot={{ r: 5 }}
              />

              <Line
                type="monotone"
                dataKey="hemoglobinaGlicada"
                stroke="#22c55e"
                strokeWidth={3}
                name="HbA1c %"
                dot={{ r: 5 }}
              />
            </>
          )}

          {abaAtiva === 'androgenico' && (
            <>
              <YAxis domain={[0, 1900]} />

              <ReferenceArea
                y1={253}
                y2={803}
                fill="#22c55e"
                fillOpacity={0.08}
              />

              <ReferenceArea
                y1={804}
                y2={1200}
                fill="#facc15"
                fillOpacity={0.08}
              />

              <ReferenceArea
                y1={1200}
                y2={1900}
                fill="#ef4444"
                fillOpacity={0.08}
              />

              <Line
                type="monotone"
                dataKey="testosteronaTotal"
                stroke="#ef4444"
                strokeWidth={3}
                name="Testosterona Total ng/dL"
                dot={{ r: 5 }}
              />

              <Line
                type="monotone"
                dataKey="testosteronaLivre"
                stroke="#f97316"
                strokeWidth={3}
                name="Testosterona Livre pmol/L"
                dot={{ r: 5 }}
              />

              <Line
                type="monotone"
                dataKey="estradiol"
                stroke="#a855f7"
                strokeWidth={3}
                name="Estradiol pg/mL"
                dot={{ r: 5 }}
              />

              <Line
                type="monotone"
                dataKey="shbg"
                stroke="#14b8a6"
                strokeWidth={3}
                name="SHBG nmol/L"
                dot={{ r: 5 }}
              />
            </>
          )}

          {abaAtiva === 'eixo' && (
            <>
              <YAxis domain={[0, 30]} />

              <ReferenceArea
                y1={0.6}
                y2={12.1}
                fill="#22c55e"
                fillOpacity={0.08}
              />

              <ReferenceArea
                y1={0}
                y2={0.6}
                fill="#ef4444"
                fillOpacity={0.08}
              />

              <Line
                type="monotone"
                dataKey="lh"
                stroke="#22c55e"
                strokeWidth={3}
                name="LH IU/L"
                dot={{ r: 5 }}
              />

              <Line
                type="monotone"
                dataKey="fsh"
                stroke="#14b8a6"
                strokeWidth={3}
                name="FSH IU/L"
                dot={{ r: 5 }}
              />

              <Line
                type="monotone"
                dataKey="prolactina"
                stroke="#facc15"
                strokeWidth={3}
                name="Prolactina ng/mL"
                dot={{ r: 5 }}
              />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>

      <div className={`chart-insight ${riscoAtual.classe}`}>
        <strong>Insight atual:</strong> {riscoAtual.insight}
      </div>

      <div className="limites-hepaticos">
        {abaAtiva === 'metabolico' && (
          <>
            <span>
              Glicose: {limites.glicoseMin}–{limites.glicoseMax} mg/dL
            </span>

            <span>
              HbA1c: {limites.hemoglobinaGlicadaMin}–
              {limites.hemoglobinaGlicadaMax}%
            </span>
          </>
        )}

        {abaAtiva === 'androgenico' && (
          <>
            <span>
              Test. total: {limites.testosteronaTotalMin}–
              {limites.testosteronaTotalMax} ng/dL
            </span>

            <span>
              Test. livre: {limites.testosteronaLivreMin}–
              {limites.testosteronaLivreMax} pmol/L
            </span>

            <span>Estradiol máx: {limites.estradiolMax} pg/mL</span>

            <span>
              SHBG: {limites.shbgMin}–{limites.shbgMax} nmol/L
            </span>
          </>
        )}

        {abaAtiva === 'eixo' && (
          <>
            <span>
              LH: {limites.lhMin}–{limites.lhMax} IU/L
            </span>

            <span>
              FSH: {limites.fshMin}–{limites.fshMax} IU/L
            </span>

            <span>
              Prolactina: {limites.prolactinaMin}–
              {limites.prolactinaMax} ng/mL
            </span>
          </>
        )}
      </div>
    </div>
  )
}