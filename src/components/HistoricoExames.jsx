import { useState, useRef } from 'react'
import '../style/historicoExames.css'

/* Mock */
const INITIAL_EXAMS = [
    {
        id: 1,
        name: 'Hemograma completo + Perfil lipídico',
        date: '12 abr 2025',
        lab: 'Laboratório Fleury',
        size: '2.4 MB',
        risk: 'high',
    },
    {
        id: 2,
        name: 'Função hepática (TGO/TGP, GGT)',
        date: '14 mar 2025',
        lab: 'Delboni Auriemo',
        size: '1.1 MB',
        risk: 'warn',
    },
    {
        id: 3,
        name: 'Testosterona total + FSH + LH',
        date: '18 fev 2025',
        lab: 'Laboratório Fleury',
        size: '0.8 MB',
        risk: 'high',
    },
    {
        id: 4,
        name: 'Hemograma + função renal',
        date: '10 jan 2025',
        lab: 'Hermes Pardini',
        size: '1.7 MB',
        risk: 'normal',
    },
]

const RISK_LABELS = {
    high: 'Risco alto',
    warn: 'Atenção',
    normal: 'Normal',
    processing: 'Processando…',
}

/* Sub-components */

function RiskBadge({ risk }) {
    return (
        <span className={`he-badge he-badge--${risk || 'processing'}`}>
            {RISK_LABELS[risk] || 'Processando…'}
        </span>
    )
}

function PdfIcon() {
    return (
        <div className="he-pdf-icon">
            <svg viewBox="0 0 16 16" fill="none" stroke="#c0392b" strokeWidth="1.4">
                <path d="M3 2h10a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z" />
                <path d="M5 6h6M5 8.5h6M5 11h4" />
            </svg>
        </div>
    )
}

function StatCard({ label, value, sub, modifier }) {
    return (
        <div className="he-stat-card">
            <div className="he-stat-label">{label}</div>
            <div className={`he-stat-val${modifier ? ` he-stat-val--${modifier}` : ''}`}>
                {value}
            </div>
            {sub && <div className="he-stat-sub">{sub}</div>}
        </div>
    )
}

function Toast({ msg, show, warn }) {
    return (
        <div className={`he-toast${show ? ' he-toast--show' : ''}`}>
            <div className={`he-toast-dot${warn ? ' he-toast-dot--warn' : ''}`} />
            {msg}
        </div>
    )
}

export default function HistoricoExames() {
    const [exams, setExams] = useState(INITIAL_EXAMS)
    const [dragging, setDragging] = useState(false)
    const [toast, setToast] = useState({ show: false, msg: '', warn: false })
    const fileRef = useRef()
    const nextId = useRef(INITIAL_EXAMS.length + 1)

    const showToast = (msg, warn = false) => {
        setToast({ show: true, msg, warn })
        setTimeout(() => setToast(t => ({ ...t, show: false })), 3200)
    }

    const addExam = (file) => {
        if (!file || file.type !== 'application/pdf') {
            showToast('Apenas arquivos PDF são aceitos', true)
            return
        }
        const mb = (file.size / 1048576).toFixed(1)
        const now = new Date()
        const date = now
            .toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
            .replace(/ de /g, ' ')
        const newExam = {
            id: nextId.current++,
            name: file.name.replace(/\.pdf$/i, ''),
            date,
            lab: 'Importado manualmente',
            size: `${mb} MB`,
            risk: 'processing',
        }
        setExams(prev => [newExam, ...prev])
        showToast(`"${newExam.name}" importado com sucesso`)

        setTimeout(() => {
            setExams(prev =>
                prev.map(e => (e.id === newExam.id ? { ...e, risk: 'warn' } : e))
            )
        }, 2500)
    }

    const removeExam = (id, e) => {
        e.stopPropagation()
        setExams(prev => prev.filter(ex => ex.id !== id))
        showToast('Exame removido', true)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setDragging(false)
        addExam(e.dataTransfer.files[0])
    }

    const highCount = exams.filter(e => e.risk === 'high').length
    const lastDate = exams[0]?.date || '—'

    return (
        <div className="he-wrap">

            {/* Page */}
            <div className="he-page">

                {/* Header */}
                <div className="he-page-header">
                    <h1>Histórico de Exames</h1>
                    <p>Upload e gestão dos seus laudos laboratoriais</p>
                </div>

                {/* Stats */}
                <div className="he-stats">
                    <StatCard
                        label="Total de exames"
                        value={exams.length}
                        sub="laudos importados"
                    />
                    <StatCard
                        label="Último exame"
                        value={lastDate}
                        sub="exame mais recente"
                        modifier="muted"
                    />
                    <StatCard
                        label="Alertas ativos"
                        value={highCount}
                        sub="marcadores fora do limite"
                        modifier={highCount > 0 ? 'red' : 'green'}
                    />
                </div>

                {/* zona Upload */}
                <div
                    className={`he-upload-zone${dragging ? ' he-upload-zone--dragging' : ''}`}
                    onClick={() => fileRef.current.click()}
                    onDragOver={e => { e.preventDefault(); setDragging(true) }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                >
                    <div className="he-upload-icon">
                        <svg viewBox="0 0 20 20" fill="none" stroke="#ded9d9" strokeWidth="1.5">
                            <path d="M10 13V7M7 10l3-3 3 3" />
                            <path d="M3 14v2a1 1 0 001 1h12a1 1 0 001-1v-2" />
                        </svg>
                    </div>
                    <div className="he-upload-title">Arrastar PDF de exame aqui</div>
                    <div className="he-upload-sub">
                        ou clique para selecionar arquivo · PDF, até 20MB
                    </div>
                    <div className="he-upload-btn">Selecionar arquivo</div>
                    <input
                        ref={fileRef}
                        type="file"
                        accept=".pdf"
                        style={{ display: 'none' }}
                        onChange={e => { addExam(e.target.files[0]); e.target.value = '' }}
                    />
                </div>

                {/* Lista exames */}
                <div className="he-section-title">Exames importados</div>

                <div className="he-exam-list">
                    {exams.length === 0 && (
                        <div className="he-exam-empty">Nenhum exame importado ainda.</div>
                    )}
                    {exams.map(exam => (
                        <div key={exam.id} className="he-exam-card">
                            <PdfIcon />
                            <div>
                                <div className="he-exam-name">{exam.name}</div>
                                <div className="he-exam-meta">
                                    {exam.date} · {exam.lab} · {exam.size}
                                </div>
                            </div>
                            <div className="he-exam-badges">
                                <RiskBadge risk={exam.risk} />
                                <span className="he-badge he-badge--pdf">PDF</span>
                                <button
                                    className="he-btn-remove"
                                    title="Remover"
                                    onClick={e => removeExam(exam.id, e)}
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            <Toast msg={toast.msg} show={toast.show} warn={toast.warn} />
        </div>
    )
}