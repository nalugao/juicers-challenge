import { useState } from 'react'
import RiscoHepaticoChart from './graficos/RiscoHepaticoChart'
import RiscoRenalChart from './graficos/RiscoRenalChart'
import RiscoEndocrinoChart from './graficos/RiscoEndocrinoChart'
import RiscoCardiovascularChart from './graficos/RiscoCardiovascularChart'
import RiscoHematologicoChart from './graficos/RiscoHematologicoChart'

export default function CardChart() {
  const [graficoAtivo, setGraficoAtivo] = useState('hepatico')

  return (
    <div className="card">
      <div className="chart-tabs">
        <button
          className={graficoAtivo === 'hepatico' ? 'active' : ''}
          onClick={() => setGraficoAtivo('hepatico')}
        >
          Risco Hepático
        </button>

        <button
          className={graficoAtivo === 'renal' ? 'active' : ''}
          onClick={() => setGraficoAtivo('renal')}
        >
          Risco Renal
        </button>

        <button
          className={graficoAtivo === 'endocrino' ? 'active' : ''}
          onClick={() => setGraficoAtivo('endocrino')}
        >
          Risco Endócrino
        </button>

        <button
          className={graficoAtivo === 'cardiovascular' ? 'active' : ''}
          onClick={() => setGraficoAtivo('cardiovascular')}
        >
          Risco Cardiovascular
        </button>

        <button
          className={graficoAtivo === 'hematologico' ? 'active' : ''}
          onClick={() => setGraficoAtivo('hematologico')}
        >
          Risco Hematológico
        </button>
      </div>

      {graficoAtivo === 'hepatico' && <RiscoHepaticoChart />}
      {graficoAtivo === 'renal' && <RiscoRenalChart />}
      {graficoAtivo === 'endocrino' && <RiscoEndocrinoChart />}
      {graficoAtivo === 'cardiovascular' && <RiscoCardiovascularChart />}
      {graficoAtivo === 'hematologico' && <RiscoHematologicoChart />}
    </div>
  )
}