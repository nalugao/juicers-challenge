import { useEffect, useState } from 'react'
import { MOCK_DATA, summary, alerts, categories, examDates } from '../data/mockData'
import { getMyExams, getMyPatientProfile } from '../services/api'
import Dashboard from '../components/perfilDoUsuario/Dashboard.jsx'
import MarkerModal from '../components/perfilDoUsuario/MarkerModal.jsx'
import '../style/perfil.css'

function formatarDosagem(dosagem) {
    if (!dosagem) return ''
    return `${dosagem}mg/sem`
}

function formatarTempoUso(tempoUso) {
    if (!tempoUso) return ''
    return tempoUso
}

function formatarStatusCiclo(cicloAtivo) {
    if (cicloAtivo === 'sim') return 'Ciclo ativo'
    if (cicloAtivo === 'off') return 'Em off'
    if (cicloAtivo === 'nunca') return 'Nunca usou'
    return ''
}

function formatarDataExame(data) {
    if (!data) return 'Não informado'
    const dataCorrigida = new Date(`${data}T00:00:00`)
    return dataCorrigida
        .toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
        .replace('.', '')
}

export default function PerfilAtleta() {
    const { perfil } = MOCK_DATA

    const [perfilPaciente, setPerfilPaciente] = useState(null)
    const [exames, setExames] = useState([])
    const [carregando, setCarregando] = useState(true)

    // marcador selecionado (abre o modal com o gráfico grande)
    const [marcador, setMarcador] = useState(null)

    useEffect(() => {
        async function carregarDadosDashboard() {
            try {
                const [perfilResponse, examesResponse] = await Promise.all([
                    getMyPatientProfile(),
                    getMyExams(),
                ])
                setPerfilPaciente(perfilResponse.patient)
                setExames(examesResponse.exams || [])
            } catch (error) {
                console.error('Erro ao carregar dashboard:', error)
            } finally {
                setCarregando(false)
            }
        }
        carregarDadosDashboard()
    }, [])

    const perfilDinamico = {
        ...perfil,
        nome: perfilPaciente?.userId?.name || perfil.nome,
        idade: perfilPaciente?.age || perfil.idade,
        sexo:
            perfilPaciente?.biologicalSex === 'male'
                ? 'masculino'
                : perfilPaciente?.biologicalSex === 'female'
                    ? 'feminino'
                    : perfil.sexo,
        tempoUso: formatarTempoUso(perfilPaciente?.cycleTime) || perfil.tempoUso,
        dosagem: formatarDosagem(perfilPaciente?.weeklyDosage) || perfil.dosagem,
        esteroides: perfilPaciente?.substances?.length
            ? perfilPaciente.substances
            : perfil.esteroides,
        cicloAtivo: perfilPaciente?.cycleStatus || 'sim',
        ultimoExame: perfilPaciente?.lastExamDate
            ? formatarDataExame(perfilPaciente.lastExamDate)
            : exames[0]?.examDate
                ? formatarDataExame(exames[0].examDate)
                : 'Não informado',
    }

    const primeiroNome = perfilDinamico.nome.split(' ')[0]
    const statusCiclo = formatarStatusCiclo(perfilDinamico.cicloAtivo)

    if (carregando) {
        return (
            <div className="main">
                <div className="content">
                    <p className="page-sub">Carregando dashboard...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="main">
            <div className="content">

                <div className="page-header">
                    <div>
                        <h1 className="page-title">Olá, {primeiroNome}</h1>
                        <p className="page-sub">
                            {perfilDinamico.idade} anos
                            {statusCiclo && <> · {statusCiclo}</>}
                            {perfilDinamico.cicloAtivo !== 'nunca' && perfilDinamico.tempoUso && (
                                <> há {perfilDinamico.tempoUso}</>
                            )}
                            {perfilDinamico.cicloAtivo !== 'nunca' && perfilDinamico.dosagem && (
                                <> · {perfilDinamico.dosagem}</>
                            )}
                            <> · Último exame: {perfilDinamico.ultimoExame}</>
                        </p>
                    </div>
                </div>

                {/* Dashboard de exames (gráficos + filtros + alertas).
                    hideHeader: o cabeçalho acima já é o seu (com dados da API).
                    Dados de exemplo do mockData por enquanto — depois ligamos no getMyExams(). */}
                <Dashboard
                    accent="#e6a817"
                    hideHeader
                    summary={summary}
                    alerts={alerts}
                    categories={categories}
                    examDates={examDates}
                    onSelect={setMarcador}
                />

            </div>

            {marcador && (
                <MarkerModal marker={marcador} examDates={examDates} onClose={() => setMarcador(null)} />
            )}
        </div>
    )
}