import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ATLETAS_MOCK, CICLO_LABEL, CICLO_COLOR, RISCO_LABEL, RISCO_COLOR } from '../data/mockAtletas'
import '../style/meusAtletas.css'

function RiscoBadge({ risco }) {
    if (!risco) return <span className="ma-badge ma-badge--none">—</span>
    return (
        <span className="ma-badge" style={{ background: `${RISCO_COLOR[risco]}18`, color: RISCO_COLOR[risco] }}>
            <span className="ma-badge-dot" style={{ background: RISCO_COLOR[risco] }} />
            {RISCO_LABEL[risco]}
        </span>
    )
}

function CardAtleta({ atleta, onClick }) {
    const cicloColor = CICLO_COLOR[atleta.cicloAtivo]
    return (
        <div className="ma-card" onClick={onClick}>
            <div className="ma-card-top">
                <div className="ma-avatar">{atleta.iniciais}</div>
                <div className="ma-card-info">
                    <span className="ma-card-nome">{atleta.nome}</span>
                    <span className="ma-card-idade">{atleta.idade} anos</span>
                </div>
                <RiscoBadge risco={atleta.risco} />
            </div>
            <div className="ma-card-divider" />
            <div className="ma-card-bottom">
                <div className="ma-card-field">
                    <span className="ma-field-label">Status</span>
                    <span className="ma-field-val" style={{ color: cicloColor }}>
                        <span className="ma-field-dot" style={{ background: cicloColor }} />
                        {CICLO_LABEL[atleta.cicloAtivo]}
                    </span>
                </div>
                <div className="ma-card-field ma-card-field--right">
                    <span className="ma-field-label">Último exame</span>
                    <span className="ma-field-val ma-field-val--muted">{atleta.ultimoExame}</span>
                </div>
            </div>
        </div>
    )
}

function ModalConvite({ onClose }) {
    const [email, setEmail] = useState('')
    const [enviado, setEnviado] = useState(false)
    const [enviando, setEnviando] = useState(false)

    const handleEnviar = async () => {
        if (!email) return
        setEnviando(true)
        await new Promise(r => setTimeout(r, 900))
        setEnviando(false)
        setEnviado(true)
    }

    return (
        <div className="ma-modal-overlay" onClick={onClose}>
            <div className="ma-modal" onClick={e => e.stopPropagation()}>
                <div className="ma-modal-header">
                    <h2>Convidar Atleta</h2>
                    <p>Envie um convite por e-mail para vincular um novo atleta ao seu perfil.</p>
                </div>

                {!enviado ? (
                    <>
                        <div className="ma-modal-field">
                            <label>E-mail do atleta</label>
                            <input
                                type="email"
                                placeholder="atleta@email.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleEnviar()}
                                autoFocus
                            />
                        </div>
                        <div className="ma-modal-actions">
                            <button className="ma-btn-cancelar" onClick={onClose}>Cancelar</button>
                            <button
                                className={`ma-btn-enviar${enviando ? ' ma-btn-enviar--loading' : ''}`}
                                onClick={handleEnviar}
                                disabled={!email || enviando}
                            >
                                {enviando ? 'Enviando…' : 'Enviar convite'}
                            </button>
                        </div>
                        <p className="ma-modal-hint">
                            O atleta receberá um link para criar sua conta e será vinculado automaticamente ao seu perfil.
                        </p>
                    </>
                ) : (
                    <div className="ma-modal-success">
                        <div className="ma-modal-success-icon">
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                                <circle cx="14" cy="14" r="13" stroke="#2FD6BE" strokeWidth="1.5" />
                                <path d="M8 14l4 4 8-8" stroke="#2FD6BE" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <p className="ma-modal-success-text">Convite enviado para <strong>{email}</strong></p>
                        <button className="ma-btn-enviar" onClick={onClose}>Fechar</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default function MeusAtletas() {
    const [busca, setBusca] = useState('')
    const [filtroStatus, setFiltroStatus] = useState('todos')
    const [modalAberto, setModalAberto] = useState(false)
    const navigate = useNavigate()

    const atletasFiltrados = ATLETAS_MOCK.filter(a => {
        const buscaOk = a.nome.toLowerCase().includes(busca.toLowerCase())
        const statusOk = filtroStatus === 'todos' || a.cicloAtivo === filtroStatus
        return buscaOk && statusOk
    })

    return (
        <div className="ma-page">
            <div className="ma-header">
                <div>
                    <h1 className="ma-titulo">Meus Atletas</h1>
                    <p className="ma-sub">{ATLETAS_MOCK.length} atletas vinculados ao seu perfil</p>
                </div>
                <button className="ma-btn-add" onClick={() => setModalAberto(true)}>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M7.5 2v11M2 7.5h11" strokeLinecap="round" />
                    </svg>
                    Adicionar Atleta
                </button>
            </div>

            <div className="ma-filtros">
                <div className="ma-busca">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="#6b6b6b" strokeWidth="1.4">
                        <circle cx="6.5" cy="6.5" r="4.5" />
                        <path d="M10 10l3 3" strokeLinecap="round" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Buscar atleta…"
                        value={busca}
                        onChange={e => setBusca(e.target.value)}
                    />
                </div>
                <select className="ma-select" value={filtroStatus} onChange={e => setFiltroStatus(e.target.value)}>
                    <option value="todos">Todos os status</option>
                    <option value="ativo">Ciclo ativo</option>
                    <option value="off">Em off</option>
                    <option value="nunca">Nunca usou</option>
                </select>
            </div>

            <div className="ma-grid">
                {atletasFiltrados.length === 0 && (
                    <div className="ma-empty">Nenhum atleta encontrado.</div>
                )}
                {atletasFiltrados.map(a => (
                    <CardAtleta
                        key={a.id}
                        atleta={a}
                        onClick={() => navigate(`/medico/atleta/${a.id}`)}
                    />
                ))}
            </div>

            {modalAberto && <ModalConvite onClose={() => setModalAberto(false)} />}
        </div>
    )
}