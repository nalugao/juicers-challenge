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

const examesHematologicos = MOCK_DATA.chartData.hematologico.exames

const limites = {
  hemoglobinaMin: 12.8,
  hemoglobinaMax: 17.8,

  hematocritoMin: 37,
  hematocritoMax: 52.4,

  vcmMin: 79.8,
  vcmMax: 97.3,

  hcmMin: 26.2,
  hcmMax: 32.6,

  chcmMin: 31.4,
  chcmMax: 36.1,

  rdwCvMin: 11.7,
  rdwCvMax: 15.3,

  rdwSdMin: 36.5,
  rdwSdMax: 47.3,

  eritroblastosMax: 0,

  leucocitosMin: 4.12,
  leucocitosMax: 11.11,

  neutrofilosMin: 37,
  neutrofilosMax: 74,

  eosinofilosMin: 0,
  eosinofilosMax: 8,

  basofilosMin: 0,
  basofilosMax: 1.6,

  linfocitosMin: 18,
  linfocitosMax: 49,

  monocitosMin: 4,
  monocitosMax: 13,

  plaquetasMin: 162,
  plaquetasMax: 425,

  vmpMin: 8.9,
  vmpMax: 13,
}

function calcularRiscoHematologico(exame) {
  let pontos = 0

  if (exame.hemoglobina > limites.hemoglobinaMax) pontos += 2
  if (exame.hematocrito > limites.hematocritoMax) pontos += 3

  if (exame.leucocitos > limites.leucocitosMax) pontos += 1
  if (exame.neutrofilos > limites.neutrofilosMax) pontos += 1
  if (exame.eosinofilos > limites.eosinofilosMax) pontos += 1
  if (exame.basofilos > limites.basofilosMax) pontos += 1
  if (exame.linfocitos < limites.linfocitosMin) pontos += 1
  if (exame.monocitos > limites.monocitosMax) pontos += 1

  if (exame.plaquetas > limites.plaquetasMax) pontos += 2
  if (exame.vmp > limites.vmpMax) pontos += 1

  if (exame.rdwCv > limites.rdwCvMax) pontos += 1
  if (exame.rdwSd > limites.rdwSdMax) pontos += 1

  let status = 'Normal'
  let classe = 'normal'
  let insight = 'Marcadores hematológicos dentro da faixa esperada.'

  if (exame.hematocrito > limites.hematocritoMax) {
    status = 'Sangue viscoso'
    classe = 'critico'
    insight =
      'Hematócrito acima da referência pode indicar sangue mais viscoso, aumentando o risco de trombose.'
  }

  if (exame.hemoglobina > limites.hemoglobinaMax) {
    status = 'Atenção hematológica'
    classe = 'alerta'
    insight =
      'Hemoglobina elevada pode ocorrer com uso de esteroides e deve ser acompanhada junto ao hematócrito.'
  }

  if (exame.plaquetas > limites.plaquetasMax) {
    status = 'Atenção plaquetária'
    classe = 'alerta'
    insight =
      'Plaquetas elevadas podem aumentar preocupação com risco trombótico, especialmente junto de hematócrito alto.'
  }

  if (pontos >= 6 || exame.hematocrito >= 55) {
    status = 'Risco hematológico alto'
    classe = 'critico'
    insight =
      'Hematócrito, hemoglobina ou plaquetas estão elevados. É recomendado procurar avaliação médica.'
  }

  return { pontos, status, classe, insight }
}

function TooltipHematologico({ active, payload, label }) {
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

export default function RiscoHematologicoChart() {
  const [abaAtiva, setAbaAtiva] = useState('eritrograma')

  const ultimoExame = examesHematologicos[examesHematologicos.length - 1]
  const riscoAtual = calcularRiscoHematologico(ultimoExame)

  return (
    <div className="chart-hepatico">
      <div className="chart-header">
        <div>
          <h3>Risco Hematológico</h3>
          <p>Hemograma, eritrograma, leucograma e plaquetas</p>
        </div>

        <span className={`badge-risco ${riscoAtual.classe}`}>
          {riscoAtual.status}
        </span>
      </div>

      <div className="sub-chart-tabs">
        <button
          className={abaAtiva === 'eritrograma' ? 'active' : ''}
          onClick={() => setAbaAtiva('eritrograma')}
        >
          Eritrograma
        </button>

        <button
          className={abaAtiva === 'leucograma' ? 'active' : ''}
          onClick={() => setAbaAtiva('leucograma')}
        >
          Leucograma
        </button>

        <button
          className={abaAtiva === 'plaquetas' ? 'active' : ''}
          onClick={() => setAbaAtiva('plaquetas')}
        >
          Plaquetas
        </button>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={examesHematologicos}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="data" />
          <Tooltip content={<TooltipHematologico />} />
          <Legend />

          {abaAtiva === 'eritrograma' && (
            <>
              <YAxis domain={[0, 110]} />

              <ReferenceArea y1={37} y2={52.4} fill="#22c55e" fillOpacity={0.06} />
              <ReferenceArea y1={52.4} y2={110} fill="#ef4444" fillOpacity={0.06} />

              <Line
                type="monotone"
                dataKey="hemoglobina"
                stroke="#ef4444"
                strokeWidth={3}
                name="Hemoglobina g/dL"
                dot={{ r: 5 }}
              />

              <Line
                type="monotone"
                dataKey="hematocrito"
                stroke="#f97316"
                strokeWidth={3}
                name="Hematócrito %"
                dot={{ r: 5 }}
              />

              <Line
                type="monotone"
                dataKey="vcm"
                stroke="#3b82f6"
                strokeWidth={3}
                name="VCM fL"
                dot={{ r: 5 }}
              />

              <Line
                type="monotone"
                dataKey="hcm"
                stroke="#22c55e"
                strokeWidth={3}
                name="HCM pg"
                dot={{ r: 5 }}
              />

              <Line
                type="monotone"
                dataKey="chcm"
                stroke="#a855f7"
                strokeWidth={3}
                name="CHCM g/dL"
                dot={{ r: 5 }}
              />

              <Line
                type="monotone"
                dataKey="rdwCv"
                stroke="#14b8a6"
                strokeWidth={3}
                name="RDW-CV %"
                dot={{ r: 5 }}
              />
            </>
          )}

          {abaAtiva === 'leucograma' && (
            <>
              <YAxis domain={[0, 90]} />

              <ReferenceArea y1={37} y2={74} fill="#22c55e" fillOpacity={0.06} />
              <ReferenceArea y1={74} y2={90} fill="#ef4444" fillOpacity={0.06} />

              <Line
                type="monotone"
                dataKey="leucocitos"
                stroke="#ef4444"
                strokeWidth={3}
                name="Leucócitos mil/mm³"
                dot={{ r: 5 }}
              />

              <Line
                type="monotone"
                dataKey="neutrofilos"
                stroke="#f97316"
                strokeWidth={3}
                name="Neutrófilos %"
                dot={{ r: 5 }}
              />

              <Line
                type="monotone"
                dataKey="linfocitos"
                stroke="#3b82f6"
                strokeWidth={3}
                name="Linfócitos %"
                dot={{ r: 5 }}
              />

              <Line
                type="monotone"
                dataKey="eosinofilos"
                stroke="#22c55e"
                strokeWidth={3}
                name="Eosinófilos %"
                dot={{ r: 5 }}
              />

              <Line
                type="monotone"
                dataKey="basofilos"
                stroke="#a855f7"
                strokeWidth={3}
                name="Basófilos %"
                dot={{ r: 5 }}
              />

              <Line
                type="monotone"
                dataKey="monocitos"
                stroke="#14b8a6"
                strokeWidth={3}
                name="Monócitos %"
                dot={{ r: 5 }}
              />
            </>
          )}

          {abaAtiva === 'plaquetas' && (
            <>
              <YAxis domain={[0, 500]} />

              <ReferenceArea y1={162} y2={425} fill="#22c55e" fillOpacity={0.06} />
              <ReferenceArea y1={425} y2={500} fill="#ef4444" fillOpacity={0.06} />

              <Line
                type="monotone"
                dataKey="plaquetas"
                stroke="#ef4444"
                strokeWidth={3}
                name="Plaquetas mil/mm³"
                dot={{ r: 5 }}
              />

              <Line
                type="monotone"
                dataKey="vmp"
                stroke="#3b82f6"
                strokeWidth={3}
                name="VMP fL"
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
        {abaAtiva === 'eritrograma' && (
          <>
            <span>Hemoglobina: {limites.hemoglobinaMin}–{limites.hemoglobinaMax} g/dL</span>
            <span>Hematócrito: {limites.hematocritoMin}–{limites.hematocritoMax}%</span>
            <span>VCM: {limites.vcmMin}–{limites.vcmMax} fL</span>
            <span>HCM: {limites.hcmMin}–{limites.hcmMax} pg</span>
            <span>CHCM: {limites.chcmMin}–{limites.chcmMax} g/dL</span>
            <span>RDW-CV: {limites.rdwCvMin}–{limites.rdwCvMax}%</span>
          </>
        )}

        {abaAtiva === 'leucograma' && (
          <>
            <span>Leucócitos: {limites.leucocitosMin}–{limites.leucocitosMax} mil/mm³</span>
            <span>Neutrófilos: {limites.neutrofilosMin}–{limites.neutrofilosMax}%</span>
            <span>Linfócitos: {limites.linfocitosMin}–{limites.linfocitosMax}%</span>
            <span>Eosinófilos: {limites.eosinofilosMin}–{limites.eosinofilosMax}%</span>
            <span>Basófilos: {limites.basofilosMin}–{limites.basofilosMax}%</span>
            <span>Monócitos: {limites.monocitosMin}–{limites.monocitosMax}%</span>
          </>
        )}

        {abaAtiva === 'plaquetas' && (
          <>
            <span>Plaquetas: {limites.plaquetasMin}–{limites.plaquetasMax} mil/mm³</span>
            <span>VMP: {limites.vmpMin}–{limites.vmpMax} fL</span>
          </>
        )}
      </div>
    </div>
  )
}