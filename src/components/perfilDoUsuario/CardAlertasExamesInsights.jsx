import '../../style/cardAlertasExamesInsights.css'

const NIVEL_CONFIG = {
    alto: { cor: '#c0392b', badgeClass: 'badge-red', label: 'Alto risco' },
    atencao: { cor: '#d4a017', badgeClass: 'badge-yellow', label: 'Atenção' },
    normal: { cor: '#27ae60', badgeClass: 'badge-green', label: 'Normal' },
}

export default function CardAlertasExamesInsights({ alertas }) {
    return (
        <div className="card alerts-card">
            <div className="card-head">
                <span className="card-head-title">Alertas</span>
                <span className="badge badge-red">{alertas.length} ativos</span>
            </div>
            {alertas.map(a => {
                const nc = NIVEL_CONFIG[a.nivel]
                return (
                    <div key={a.id} className="alert-item">
                        <div className="alert-dot" style={{ background: nc.cor }} />
                        <div>
                            <div className="alert-title">{a.titulo}</div>
                            <div className="alert-sub">{a.descricao}</div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}