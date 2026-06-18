import { useEffect, useState } from 'react'
import { getMyPatientProfile, savePatientProfile, updateUserProfile } from '../services/api'
import '../style/dadosContaMedico.css'
import '../style/dadosContaAtleta.css'


const COMPOSTOS = [
    'Testosterona Enantato', 'Testosterona Cipionato', 'Trembolona',
    'Oxandrolona', 'Nandrolona', 'Boldenona', 'Stanozolol', 'Masteron',
]

const CONDICOES = [
    'Hipertensão', 'Colesterol elevado', 'Problemas hepáticos',
    'Histórico cardíaco familiar', 'Nenhuma das anteriores',
]

const INITIAL = {
    nome: '',
    sobrenome: '',
    idade: '',
    sexo: '',
    peso: '',
    altura: '',
    cicloAtivo: 'sim',
    compostos: [],
    dosagem: '',
    tempoUso: '',
    fezeExames: 'recentes',
    dataUltimoExame: '',
    condicoes: [],
    ultimaAtualizacao: '',
}

function carregarDadosConta() {
    const dados = localStorage.getItem('dadosContaCicloRisco')
    if (!dados) return INITIAL
    try {
        return { ...INITIAL, ...JSON.parse(dados) }
    } catch {
        return INITIAL
    }
}

function formatarStatusCiclo(status) {
    if (status === 'sim') return 'Ciclo ativo'
    if (status === 'off') return 'Em off'
    if (status === 'nunca') return 'Nunca usou'
    return ''
}

function RadioGroup({ options, value, onChange }) {
    return (
        <div className="dc-radio-group">
            {options.map(o => {
                const sel = value === o.val
                return (
                    <div
                        key={o.val}
                        className={`dc-radio-opt${sel ? ' dc-radio-opt--sel' : ''}`}
                        onClick={() => onChange(o.val)}
                    >
                        <div className="dc-radio-dot">
                            {sel && <div className="dc-radio-inner" />}
                        </div>
                        <span className="dc-radio-text">{o.label}</span>
                    </div>
                )
            })}
        </div>
    )
}

function TagPicker({ options, value, onChange }) {
    const toggle = v =>
        onChange(value.includes(v) ? value.filter(x => x !== v) : [...value, v])
    return (
        <>
            <div className="dc-tags">
                {options.map(c => (
                    <div
                        key={c}
                        className={`dc-tag${value.includes(c) ? ' dc-tag--sel' : ''}`}
                        onClick={() => toggle(c)}
                    >
                        {c}
                    </div>
                ))}
            </div>
            <div className="dc-tag-count">
                {value.length === 0
                    ? 'Nenhum composto selecionado'
                    : `${value.length} composto${value.length > 1 ? 's' : ''} selecionado${value.length > 1 ? 's' : ''}`}
            </div>
        </>
    )
}

function CheckGroup({ options, value, onChange }) {
    const toggle = v =>
        onChange(value.includes(v) ? value.filter(x => x !== v) : [...value, v])
    return (
        <div className="dc-check-group">
            {options.map(c => {
                const sel = value.includes(c)
                return (
                    <div
                        key={c}
                        className={`dc-check-opt${sel ? ' dc-check-opt--sel' : ''}`}
                        onClick={() => toggle(c)}
                    >
                        <div className="dc-check-box">{sel && '✓'}</div>
                        <span className="dc-check-text">{c}</span>
                    </div>
                )
            })}
        </div>
    )
}

function Toast({ msg, show, warn }) {
    return (
        <div className={`dc-toast${show ? ' dc-toast--show' : ''}`}>
            <div className={`dc-toast-dot${warn ? ' dc-toast-dot--warn' : ''}`} />
            {msg}
        </div>
    )
}

export default function DadosContaAtleta({ embedded = false }) {
    const dadosIniciais = carregarDadosConta()

    const [form, setForm] = useState(dadosIniciais)
    const [saved, setSaved] = useState(dadosIniciais)
    const [toast, setToast] = useState({ show: false, msg: '', warn: false })
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        async function carregarDoBanco() {
            try {
                const data = await getMyPatientProfile()
                const patient = data.patient

                const nomeCompleto = patient.userId?.name || ''
                const partesNome = nomeCompleto.split(' ')

                const dadosBanco = {
                    ...INITIAL,
                    nome: partesNome[0] || '',
                    sobrenome: partesNome.slice(1).join(' '),
                    idade: patient.age || '',
                    sexo: patient.biologicalSex === 'male' ? 'Masculino' : 'Feminino',
                    peso: patient.weight || '',
                    altura: patient.height ? patient.height * 100 : '',
                    cicloAtivo: patient.cycleStatus || 'sim',
                    dosagem: patient.weeklyDosage || '',
                    tempoUso: patient.cycleTime || '',
                    fezeExames: patient.examStatus || 'recentes',
                    dataUltimoExame: patient.lastExamDate || '',
                    compostos: patient.substances || [],
                    condicoes: patient.healthConditions || [],
                    ultimaAtualizacao: patient.updatedAt
                        ? new Date(patient.updatedAt).toLocaleDateString('pt-BR')
                        : '',
                }

                setForm(dadosBanco)
                setSaved(dadosBanco)
                localStorage.setItem('dadosContaCicloRisco', JSON.stringify(dadosBanco))
            } catch {
                // se não tiver perfil ainda, mantém localStorage
            }
        }

        carregarDoBanco()
    }, [])

    const dirty = JSON.stringify(form) !== JSON.stringify(saved)

    const update = (key, val) => setForm(p => ({ ...p, [key]: val }))

    const showToast = (msg, warn = false) => {
        setToast({ show: true, msg, warn })
        setTimeout(() => setToast(t => ({ ...t, show: false })), 3200)
    }

    const handleSave = async () => {
        try {
            setSaving(true)

            const sexoMap = {
                Masculino: 'male',
                Feminino: 'female',
            }

            const nomeCompleto = `${form.nome || ''} ${form.sobrenome || ''}`.trim()

            await updateUserProfile({
                name: nomeCompleto,
            })

            await savePatientProfile({
                age: Number(form.idade),
                biologicalSex: sexoMap[form.sexo] || 'other',
                weight: Number(form.peso),
                height: Number(form.altura) / 100,
                cycleStatus: form.cicloAtivo,
                weeklyDosage: Number(form.dosagem),
                cycleTime: form.tempoUso,
                examStatus: form.fezeExames,
                lastExamDate: form.dataUltimoExame,
                substances: form.compostos,
                healthConditions: form.condicoes,
            })

            const dadosAtualizados = {
                ...form,
                nome: form.nome,
                sobrenome: form.sobrenome,
                ultimaAtualizacao: new Date().toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                }),
            }

            localStorage.setItem('dadosContaCicloRisco', JSON.stringify(dadosAtualizados))
            localStorage.setItem(
                'usuarioLogadoJuicers',
                JSON.stringify({
                    ...JSON.parse(localStorage.getItem('usuarioLogadoJuicers') || '{}'),
                    name: nomeCompleto,
                })
            )

            setForm(dadosAtualizados)
            setSaved(dadosAtualizados)
            showToast('Dados atualizados com sucesso')
        } catch (error) {
            showToast(error.message || 'Erro ao salvar dados', true)
        } finally {
            setSaving(false)
        }
    }

    const handleDiscard = () => {
        setForm({ ...saved })
        showToast('Alterações descartadas', true)
    }

    const saveBtnClass = [
        'dc-btn-save',
        dirty ? 'dc-btn-save--active' : '',
        saving ? 'dc-btn-save--saving' : '',
    ].filter(Boolean).join(' ')

    const nomeCompleto = `${form.nome || 'Usuário'} ${form.sobrenome || ''}`.trim()
    const statusCiclo = formatarStatusCiclo(form.cicloAtivo)

    return (
        <div className={`dc-wrap${embedded ? ' dc-wrap--embedded' : ''}`}>

            <div className="dc-page">

                {!embedded && (
                    <div className="dc-header">
                        <div className="dc-header-info">
                            <h1>
                                {nomeCompleto}
                                {dirty && <span className="dc-dirty-badge">● Alterações não salvas</span>}
                            </h1>
                            <p>
                                {form.idade ? `${form.idade} anos` : 'Idade não informada'}
                                {form.peso && ` · ${form.peso} kg`}
                                {form.altura && ` · ${form.altura} cm`}
                                {statusCiclo && ` · ${statusCiclo}`}
                            </p>
                        </div>
                    </div>
                )}

                <div className="dc-grid">

                    {/* Perfil básico — 2 colunas × 2 linhas */}
                    <div className="dc-section dc-section--accent dc-section--perfil">
                        <div className="dc-section-title">
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#c0392b" strokeWidth="1.4">
                                <circle cx="8" cy="5.5" r="3" />
                                <path d="M2 14.5c0-3.3 2.7-6 6-6s6 2.7 6 6" />
                            </svg>
                            Perfil básico
                        </div>
                        <div className="dc-row2">
                            <div className="dc-field">
                                <label>Nome</label>
                                <input type="text" value={form.nome} placeholder="Seu nome" onChange={e => update('nome', e.target.value)} />
                            </div>
                            <div className="dc-field">
                                <label>Sobrenome</label>
                                <input type="text" value={form.sobrenome} placeholder="Sobrenome" onChange={e => update('sobrenome', e.target.value)} />
                            </div>
                            <div className="dc-field">
                                <label>Idade</label>
                                <input type="number" value={form.idade} placeholder="28" onChange={e => update('idade', e.target.value)} />
                            </div>
                            <div className="dc-field">
                                <label>Sexo biológico</label>
                                <select value={form.sexo} onChange={e => update('sexo', e.target.value)}>
                                    <option value="">Selecionar</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Feminino">Feminino</option>
                                </select>
                            </div>
                            <div className="dc-field">
                                <label>Peso (kg)</label>
                                <input type="number" value={form.peso} placeholder="85" onChange={e => update('peso', e.target.value)} />
                            </div>
                            <div className="dc-field">
                                <label>Altura (cm)</label>
                                <input type="number" value={form.altura} placeholder="178" onChange={e => update('altura', e.target.value)} />
                            </div>
                        </div>
                    </div>

                    {/* Ciclo atual — 2 colunas */}
                    <div className="dc-section dc-section--ciclo">
                        <div className="dc-section-title">
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#c0392b" strokeWidth="1.4">
                                <circle cx="8" cy="8" r="6" />
                                <path d="M8 5v3.5l2 2" />
                            </svg>
                            Ciclo atual
                        </div>
                        <div className="dc-field">
                            <label>Status do ciclo</label>
                            <RadioGroup
                                value={form.cicloAtivo}
                                onChange={v => update('cicloAtivo', v)}
                                options={[
                                    { val: 'sim', label: 'Sim, estou em ciclo ativo' },
                                    { val: 'off', label: 'Não, estou em off' },
                                    { val: 'nunca', label: 'Nunca usei' },
                                ]}
                            />
                        </div>
                        {form.cicloAtivo !== 'nunca' && (
                            <div className="dc-row2">
                                <div className="dc-field">
                                    <label>Dosagem semanal (mg)</label>
                                    <input type="number" value={form.dosagem} placeholder="500" onChange={e => update('dosagem', e.target.value)} />
                                </div>
                                <div className="dc-field">
                                    <label>Tempo de uso</label>
                                    <select value={form.tempoUso} onChange={e => update('tempoUso', e.target.value)}>
                                        <option value="">Selecionar</option>
                                        <option>Menos de 3 meses</option>
                                        <option>3–6 meses</option>
                                        <option>6–12 meses</option>
                                        <option>Mais de 12 meses</option>
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Compostos — linha inteira */}
                    <div className="dc-section dc-section--compostos">
                        <div className="dc-section-title">
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#c0392b" strokeWidth="1.4">
                                <path d="M6 2v4L3 12h10L10 6V2" />
                                <path d="M6 2h4" />
                            </svg>
                            Compostos utilizados
                        </div>
                        <TagPicker options={COMPOSTOS} value={form.compostos} onChange={v => update('compostos', v)} />
                    </div>

                    {/* Exames — 2 colunas */}
                    <div className="dc-section dc-section--exames">
                        <div className="dc-section-title">
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#c0392b" strokeWidth="1.4">
                                <path d="M4 2h8a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" />
                                <path d="M6 6h4M6 8.5h4M6 11h2" />
                            </svg>
                            Exames laboratoriais
                        </div>
                        <div className="dc-field">
                            <label>Já realizou exames?</label>
                            <RadioGroup
                                value={form.fezeExames}
                                onChange={v => update('fezeExames', v)}
                                options={[
                                    { val: 'recentes', label: 'Sim, recentes (menos de 6 meses)' },
                                    { val: 'antigos', label: 'Sim, mas antigos (mais de 6 meses)' },
                                    { val: 'nunca', label: 'Nunca fiz' },
                                ]}
                            />
                        </div>

                        {form.fezeExames !== 'nunca' && (
                            <div className="dc-field">
                                <label>Data do último exame</label>
                                <input
                                    type="date"
                                    value={form.dataUltimoExame}
                                    onChange={e => update('dataUltimoExame', e.target.value)}
                                />
                            </div>
                        )}
                    </div>

                    {/* Condições pré-existentes — 2 colunas */}
                    <div className="dc-section dc-section--condicoes">
                        <div className="dc-section-title">
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#c0392b" strokeWidth="1.4">
                                <circle cx="8" cy="8" r="6" />
                                <path d="M8 5v6M5 8h6" />
                            </svg>
                            Condições pré-existentes
                        </div>
                        <CheckGroup options={CONDICOES} value={form.condicoes} onChange={v => update('condicoes', v)} />
                    </div>

                    {/* Save bar — linha inteira */}
                    <div className="dc-save-bar dc-full">
                        <div className="dc-save-info">
                            Última atualização:{' '}
                            <span>{form.ultimaAtualizacao || 'Ainda não atualizado'}</span>
                        </div>
                        <div className="dc-save-actions">
                            {dirty && (
                                <button className="dc-btn-discard" onClick={handleDiscard}>
                                    Descartar
                                </button>
                            )}
                            <button className={saveBtnClass} onClick={handleSave} disabled={!dirty || saving}>
                                {saving ? 'Salvando…' : 'Salvar alterações'}
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            <Toast msg={toast.msg} show={toast.show} warn={toast.warn} />
        </div>
    )
}