import { useRef } from 'react'
import '../../style/cardExames.css'

const RESULTADO_STYLE = {
    alterado: { background: '#1a0a0a', color: '#c0392b' },
    normal: { background: '#0a1a0a', color: '#27ae60' },
    pendente: { background: '#1a1500', color: '#d4a017' },
}

export default function CardExames({ exames }) {
    const inputRef = useRef()

    return (
        <div className="card exams-card">
            <div className="card-head">
                <span className="card-head-title">Exames recentes</span>
                <button
                    className="btn-upload"
                    onClick={() => inputRef.current.click()}
                >
                    + Enviar PDF
                </button>
                <input
                    ref={inputRef}
                    type="file"
                    accept=".pdf"
                    multiple
                    style={{ display: 'none' }}
                />
            </div>
            {exames.map(ex => {
                const rs = RESULTADO_STYLE[ex.resultado] || RESULTADO_STYLE.pendente
                return (
                    <div key={ex.id} className="exam-row">
                        <div className="exam-dot" style={{ background: ex.cor }} />
                        <span className="exam-name">{ex.nome}</span>
                        <span className="exam-date">{ex.data}</span>
                        <span className="exam-badge" style={rs}>
                            {ex.resultado}
                        </span>
                    </div>
                )
            })}
        </div>
    )
}