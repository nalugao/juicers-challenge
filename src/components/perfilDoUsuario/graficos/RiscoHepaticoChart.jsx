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
import '../../../style/perfil.css'

const paciente = {
  sexo: 'masculino',
  idade: 24,
}

const examesHepaticos = MOCK_DATA.chartData?.hepatico?.exames || []

function getLimites(sexo) {
  const masculino = sexo === 'masculino'

  return {
    altMax: masculino ? 45 : 34,
    astMin: 11,
    astMax: 34,
    ggtMin: masculino ? 12 : 9,
    ggtMax: masculino ? 64 : 36,
    albuminaMin: 3.5,
    albuminaMax: 5.0,
    bilirrubinaTotalMax: 1.2,
  }
}

function calcularRisco(exame, sexo) {
  const limites = getLimites(sexo)

  let pontos = 0

  if (exame.alt > limites.altMax) pontos += 1
  if (exame.ast > limites.astMax) pontos += 1
  if (exame.ggt > limites.ggtMax) pontos += 2
  if (exame.bilirrubinaTotal > limites.bilirrubinaTotalMax) pontos += 1
  if (exame.albumina < limites.albuminaMin) pontos += 1

  const transaminasesAltas =
    exame.alt > limites.altMax || exame.ast > limites.astMax

  const ggtAlta = exame.ggt > limites.ggtMax

  let status = 'Normal'
  let classe = 'normal'
  let insight = 'Marcadores hepáticos dentro da faixa esperada.'

  if (transaminasesAltas && !ggtAlta) {
    status = 'Atenção'
    classe = 'alerta'
    insight =
      'ALT/TGP ou AST/TGO elevados com GGT normal podem estar relacionados ao treino intenso ou lesão muscular.'
  }

  if (transaminasesAltas && ggtAlta) {
    status = 'Risco hepático'
    classe = 'critico'
    insight =
      'ALT/TGP ou AST/TGO elevados junto com GGT alta sugerem possível sobrecarga hepática.'
  }

  if (pontos >= 4) {
    status = 'Risco alto'
    classe = 'critico'
    insight =
      'Vários marcadores estão alterados. É recomendado procurar avaliação médica.'
  }

  return {
    pontos,
    status,
    classe,
    insight,
  }
}

function TooltipCustomizado({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null

  return (
    <div className="tooltip-hepatico tooltip-simples">
      <span className="tooltip-data">{label}</span>

      {payload.map((item) => (
        <p key={item.dataKey} style={{ color: item.color }}>
          <strong>{item.name}:</strong> {item.value} U/L
        </p>
      ))}
    </div>
  )
}

export default function RiscoHepaticoChart() {
  if (!examesHepaticos.length) {
    return (
      <div className="chart-hepatico">
        <div className="chart-header">
          <div>
            <h3>Risco Hepático</h3>
            <p>Nenhum dado hepático encontrado no MOCK_DATA.</p>
          </div>
        </div>
      </div>
    )
  }

  const ultimoExame = examesHepaticos[examesHepaticos.length - 1]
  const riscoAtual = calcularRisco(ultimoExame, paciente.sexo)
  const limites = getLimites(paciente.sexo)

  return (
    <div className="chart-hepatico">
      <div className="chart-header">
        <div>
          <h3>Risco Hepático</h3>
          <p>ALT/TGP, AST/TGO, GGT, bilirrubina e albumina</p>
        </div>

        <span className={`badge-risco ${riscoAtual.classe}`}>
          {riscoAtual.status}
        </span>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={examesHepaticos}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="data" />

          <YAxis domain={[0, 160]} />

          <Tooltip content={<TooltipCustomizado />} />

          <Legend />

          <ReferenceArea
            y1={0}
            y2={limites.altMax}
            fill="#22c55e"
            fillOpacity={0.08}
          />

          <ReferenceArea
            y1={limites.altMax}
            y2={80}
            fill="#facc15"
            fillOpacity={0.08}
          />

          <ReferenceArea
            y1={80}
            y2={160}
            fill="#ef4444"
            fillOpacity={0.08}
          />

          <Line
            type="monotone"
            dataKey="alt"
            stroke="#3b82f6"
            strokeWidth={3}
            name="ALT / TGP"
            dot={{ r: 5 }}
          />

          <Line
            type="monotone"
            dataKey="ast"
            stroke="#a855f7"
            strokeWidth={3}
            name="AST / TGO"
            dot={{ r: 5 }}
          />

          <Line
            type="monotone"
            dataKey="ggt"
            stroke="#ef4444"
            strokeWidth={3}
            name="GGT"
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className={`chart-insight ${riscoAtual.classe}`}>
        <strong>Insight atual:</strong> {riscoAtual.insight}
      </div>

      <div className="limites-hepaticos">
        <span>ALT máx: {limites.altMax} U/L</span>
        <span>AST: {limites.astMin}–{limites.astMax} U/L</span>
        <span>GGT máx: {limites.ggtMax} U/L</span>
      </div>
    </div>
  )
}