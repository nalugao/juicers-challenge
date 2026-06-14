import '../../style/cardConhecimentos.css'

export default function CardConhecimento({ insights }) {
    return (
        <div className="card insights-card">
            <div className="card-head">
                <span className="card-head-title">Interpretações</span>
            </div>
            {insights.map(ins => (
                <div key={ins.id} className="insight-row">
                    <div className="insight-num">{ins.num}</div>
                    <div className="insight-text">
                        {ins.texto} <strong>{ins.destaque}</strong> {ins.resto}
                    </div>
                </div>
            ))}
        </div>
    )
}