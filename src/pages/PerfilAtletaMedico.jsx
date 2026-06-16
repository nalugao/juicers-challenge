import { useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ATLETAS_MOCK, CICLO_LABEL, CICLO_COLOR, RISCO_LABEL, RISCO_COLOR } from '../data/mockAtletas'
import { MOCK_DATA } from '../data/mockData'
import CardMetrica from '../components/perfilDoUsuario/CardMetrica'
import CardChart from '../components/perfilDoUsuario/CardChart'
import CardAlertasExamesInsights from '../components/perfilDoUsuario/CardAlertasExamesInsights'
import '../style/perfilAtletaMedico.css'

const EXAMES_MOCK = [
    { id: 1, nome: 'Hemograma completo', data: '12 Mar 2026', lab: 'LabSan', risco: 'warn' },
    { id: 2, nome: 'Perfil hormonal — testosterona total e livre', data: '28 Fev 2026', lab: 'DASA', risco: 'normal' },
    { id: 3, nome: 'Lipidograma + função hepática', data: '14 Jan 2026', lab: 'LabSan', risco: 'high' },
]

const RISCO_BADGE_STYLE = {
    high:   { bg: 'rgba(229,72,77,0.12)',    color: '#E5484D' },
    warn:   { bg: 'rgba(230,168,23,0.12)',   color: '#E6A817' },
    normal: { bg: 'rgba(53,181,126,0.12)',   color: '#35B57E' },
}

const RISCO_LABEL_MAP = { high: 'Alto', warn: 'Atenção', normal: 'Normal' }

function TabDashboard() {
    const { metricas, alertas } = MOCK_DATA

    return (
        <div className="pam-tab-content">
            <div className="metrics-row">
                {metricas.map(m => (
                    <CardMetrica key={m.id} {...m} />
                ))}
            </div>
            <div className="grid-main">
                <CardChart />
                <CardAlertasExamesInsights alertas={alertas} />
            </div>
        </div>
    )
}

function TabExames() {
    const [exames, setExames] = useState(EXAMES_MOCK)
    const [dragging, setDragging] = useState(false)
    const fileRef = useRef()
    const nextId = useRef(EXAMES_MOCK.length + 1)

    const addExame = (file) => {
        if (!file || file.type !== 'application/pdf') return
        const mb = (file.size / 1048576).toFixed(1)
        const novo = {
            id: nextId.current++,
            nome: file.name.replace(/\.pdf$/i, ''),
            data: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ de /g, ' '),
            lab: 'Importado pelo médico',
            risco: 'normal',
            size: `${mb} MB`,
        }
        setExames(prev => [novo, ...prev])
    }

    return (
        <div className="pam-tab-content">
            <div
                className={`pam-upload${dragging ? ' pam-upload--dragging' : ''}`}
                onClick={() => fileRef.current.click()}
                onDragOver={e => { e.preventDefault(); setDragging(true) }}
                onDragLeave={() => setDragging(false)}
                onDrop={e => { e.preventDefault(); setDragging(false); addExame(e.dataTransfer.files[0]) }}
            >
                <div className="pam-upload-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 14V5" stroke="#2FD6BE" strokeWidth="1.6" strokeLinecap="round" />
                        <path d="M6 8.5L10 4.5L14 8.5" stroke="#2FD6BE" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4 15.5H16" stroke="#2FD6BE" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                </div>
                <span className="pam-upload-text">Arraste laudos em PDF aqui</span>
                <span className="pam-upload-sub">ou clique para selecionar — até 20 MB por arquivo</span>
                <input ref={fileRef} type="file" accept=".pdf" style={{ display: 'none' }}
                    onChange={e => { addExame(e.target.files[0]); e.target.value = '' }} />
            </div>

            <div className="pam-exames-lista">
                {exames.map(ex => {
                    const bs = RISCO_BADGE_STYLE[ex.risco] || { bg: 'rgba(107,107,107,0.14)', color: '#6b6b6b' }
                    return (
                        <div key={ex.id} className="pam-exame-item">
                            <div className="pam-exame-pdf">PDF</div>
                            <div className="pam-exame-info">
                                <span className="pam-exame-nome">{ex.nome}</span>
                                <span className="pam-exame-meta">{ex.lab} · {ex.data}</span>
                            </div>
                            <span className="pam-badge" style={{ background: bs.bg, color: bs.color }}>
                                <span className="pam-badge-dot" style={{ background: bs.color }} />
                                {RISCO_LABEL_MAP[ex.risco] || 'Normal'}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default function PerfilAtletaMedico() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [tab, setTab] = useState('dashboard')

    const atleta = ATLETAS_MOCK.find(a => a.id === Number(id))

    if (!atleta) return (
        <div className="pam-page">
            <p style={{ color: '#6b6b6b', padding: '40px' }}>Atleta não encontrado.</p>
        </div>
    )

    const cicloColor = CICLO_COLOR[atleta.cicloAtivo]

    return (
        <div className="pam-page">
            {/* breadcrumb */}
            <div className="pam-breadcrumb">
                <span className="pam-breadcrumb-link" onClick={() => navigate('/medico')}>Meus Atletas</span>
                <span className="pam-breadcrumb-sep">›</span>
                <span className="pam-breadcrumb-current">{atleta.nome}</span>
            </div>

            {/* head */}
            <div className="pam-head">
                <div className="pam-head-left">
                    <div className="pam-avatar">{atleta.iniciais}</div>
                    <div>
                        <h1 className="pam-nome">{atleta.nome}</h1>
                        <p className="pam-info">
                            {atleta.idade} anos ·{' '}
                            <span style={{ color: cicloColor }}>{CICLO_LABEL[atleta.cicloAtivo]}</span>
                        </p>
                    </div>
                </div>
                <span className="pam-readonly-badge">
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                        <path d="M1 7C2.5 4 4.5 3 7 3C9.5 3 11.5 4 13 7C11.5 10 9.5 11 7 11C4.5 11 2.5 10 1 7Z" stroke="#6b6b6b" strokeWidth="1.2" />
                        <circle cx="7" cy="7" r="1.8" stroke="#6b6b6b" strokeWidth="1.2" />
                    </svg>
                    Somente leitura
                </span>
            </div>

            {/* tabs */}
            <div className="pam-tabs">
                <button
                    className={`pam-tab${tab === 'dashboard' ? ' pam-tab--active' : ''}`}
                    onClick={() => setTab('dashboard')}
                >Dashboard</button>
                <button
                    className={`pam-tab${tab === 'exames' ? ' pam-tab--active' : ''}`}
                    onClick={() => setTab('exames')}
                >Histórico de Exames</button>
            </div>

            {tab === 'dashboard' ? <TabDashboard /> : <TabExames />}
        </div>
    )
}