import { useEffect, useState } from 'react'
import CardMetrica from '../components/perfilDoUsuario/CardMetrica'
import CardChart from '../components/perfilDoUsuario/CardChart'
import CardAlertasExamesInsights from '../components/perfilDoUsuario/CardAlertasExamesInsights'
import { MOCK_DATA } from '../data/mockData'
import { getMyExams, getMyPatientProfile } from '../services/api'
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
        .toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        })
        .replace('.', '')
}

function calcularDelta(atual, anterior) {
    if (!anterior || anterior === 0) return '0% vs. anterior'

    const diff = ((atual - anterior) / anterior) * 100
    const sinal = diff >= 0 ? '+' : ''

    return `${sinal}${diff.toFixed(0)}% vs. anterior`
}

function gerarMetricasPorExames(exames, metricasMock) {
    if (!exames || exames.length === 0) {
        return metricasMock
    }

    const examesOrdenados = [...exames].sort(
        (a, b) => new Date(a.examDate) - new Date(b.examDate)
    )

    const atual = examesOrdenados[examesOrdenados.length - 1]
    const anterior = examesOrdenados[examesOrdenados.length - 2]

    const markersAtual = atual.markers || {}
    const markersAnterior = anterior?.markers || {}

    return [
        {
            id: 'testosterona',
            label: 'Testosterona',
            valor: markersAtual.testosteroneTotal
                ? markersAtual.testosteroneTotal.toLocaleString('pt-BR')
                : '—',
            unidade: 'ng/dL',
            delta: calcularDelta(
                markersAtual.testosteroneTotal,
                markersAnterior.testosteroneTotal
            ),
            deltaDir:
                markersAtual.testosteroneTotal > markersAnterior.testosteroneTotal
                    ? 'up'
                    : 'down',
            cor: '#c084fc',
        },
        {
            id: 'ldl',
            label: 'LDL',
            valor: markersAtual.ldl ? String(markersAtual.ldl) : '—',
            unidade: 'mg/dL',
            delta: markersAtual.ldl
                ? `${calcularDelta(markersAtual.ldl, markersAnterior.ldl)} · limite 130`
                : 'Sem dados',
            deltaDir: markersAtual.ldl > markersAnterior.ldl ? 'up' : 'down',
            cor: '#c0392b',
        },
        {
            id: 'tgo',
            label: 'TGO / TGP',
            valor:
                markersAtual.tgo || markersAtual.tgp
                    ? `${markersAtual.tgo || '—'} / ${markersAtual.tgp || '—'}`
                    : '—',
            unidade: 'U/L',
            delta: markersAtual.tgo
                ? `${calcularDelta(markersAtual.tgo, markersAnterior.tgo)} · limite 40`
                : 'Sem dados',
            deltaDir: markersAtual.tgo > markersAnterior.tgo ? 'up' : 'down',
            cor: '#d97706',
        },
        {
            id: 'hdl',
            label: 'HDL',
            valor: markersAtual.hdl ? String(markersAtual.hdl) : '—',
            unidade: 'mg/dL',
            delta: markersAtual.hdl
                ? `${calcularDelta(markersAtual.hdl, markersAnterior.hdl)} · ideal >40`
                : 'Sem dados',
            deltaDir: markersAtual.hdl > markersAnterior.hdl ? 'up' : 'down',
            cor: '#27ae60',
        },
    ]
}

function gerarAlertasPorExames(exames) {
    if (!exames || exames.length === 0) {
        return [
            {
                id: 'sem-exames',
                nivel: 'normal',
                titulo: 'Nenhum exame cadastrado',
                descricao: 'Envie ou cadastre exames para gerar alertas personalizados.',
            },
        ]
    }

    const ultimoExame = [...exames].sort(
        (a, b) => new Date(b.examDate) - new Date(a.examDate)
    )[0]

    const markers = ultimoExame.markers || {}
    const alertas = []

    if (ultimoExame.alerts?.length) {
        ultimoExame.alerts.forEach((alerta, index) => {
            alertas.push({
                id: `alerta-api-${index}`,
                nivel: ultimoExame.riskLevel === 'high' ? 'alto' : 'atencao',
                titulo: ultimoExame.riskLevel === 'high' ? 'Risco alto' : 'Atenção',
                descricao: alerta,
            })
        })
    }

    if (markers.ldl >= 160) {
        alertas.push({
            id: 'ldl-alto',
            nivel: markers.ldl >= 190 ? 'alto' : 'atencao',
            titulo: 'LDL elevado',
            descricao: `LDL em ${markers.ldl} mg/dL no último exame.`,
        })
    }

    if (markers.hdl && markers.hdl < 40) {
        alertas.push({
            id: 'hdl-baixo',
            nivel: 'atencao',
            titulo: 'HDL abaixo do ideal',
            descricao: `HDL em ${markers.hdl} mg/dL no último exame.`,
        })
    }

    if (markers.tgp > 45 || markers.tgo > 40 || markers.ggt > 60) {
        alertas.push({
            id: 'hepatico',
            nivel: 'atencao',
            titulo: 'Atenção hepática',
            descricao: `TGO ${markers.tgo || '—'}, TGP ${markers.tgp || '—'} e GGT ${markers.ggt || '—'}.`,
        })
    }

    if (markers.hematocrit >= 52) {
        alertas.push({
            id: 'hematocrito',
            nivel: markers.hematocrit >= 55 ? 'alto' : 'atencao',
            titulo: 'Hematócrito elevado',
            descricao: `Hematócrito em ${markers.hematocrit}%.`,
        })
    }

    if (alertas.length === 0) {
        alertas.push({
            id: 'normal',
            nivel: 'normal',
            titulo: 'Nenhum alerta ativo',
            descricao: 'Os principais marcadores estão dentro das faixas esperadas.',
        })
    }

    return alertas
}

export default function Perfil() {
    const { perfil, metricas: metricasMock } = MOCK_DATA

    const [perfilPaciente, setPerfilPaciente] = useState(null)
    const [exames, setExames] = useState([])
    const [carregando, setCarregando] = useState(true)

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

    const metricas = gerarMetricasPorExames(exames, metricasMock)
    const alertas = gerarAlertasPorExames(exames)

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
                        <h1 className="page-title">
                            Olá, {primeiroNome}
                        </h1>

                        <p className="page-sub">
                            {perfilDinamico.idade} anos

                            {statusCiclo && (
                                <> · {statusCiclo}</>
                            )}

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

                <div className="metrics-row">
                    {metricas.map(m => (
                        <CardMetrica key={m.id} {...m} />
                    ))}
                </div>

                <div className="grid-main">
                    <CardChart exames={exames} />
                    <CardAlertasExamesInsights alertas={alertas} />
                </div>

            </div>
        </div>
    )
}