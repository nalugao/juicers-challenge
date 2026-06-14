import '../../style/CardMetrica.css'

export default function CardMetrica({ label, valor, unidade, delta, deltaDir, cor }) {
    return (
        <div className="metric">
            <div className="metric-label">{label}</div>
            <div className="metric-val" style={{ color: cor }}>
                {valor} <span className="metric-unit">{unidade}</span>
            </div>
            <div className={`metric-delta ${deltaDir === 'up' ? 'delta-danger' : 'delta-ok'}`}>
                {delta}
            </div>
        </div>
    )
}