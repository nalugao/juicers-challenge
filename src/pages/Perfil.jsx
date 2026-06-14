import { useState } from 'react'
import Topbar from '../components/Topbar'
import CardMetrica from '../components/perfilDoUsuario/CardMetrica'
import CardChart from '../components/perfilDoUsuario/CardChart'
import CardAlertasExamesInsights from '../components/perfilDoUsuario/CardAlertasExamesInsights'
import { MOCK_DATA } from '../data/mockData'
import '../style/perfil.css'
import HistoricoExames from '../components/HistoricoExames'
import DadosDaConta from '../components/DadosConta'

function carregarDadosConta() {
    const dados = localStorage.getItem('dadosContaCicloRisco')

    if (!dados) {
        return null
    }

    try {
        return JSON.parse(dados)
    } catch {
        return null
    }
}

function formatarNomeCompleto(dadosConta, perfilMock) {
    if (!dadosConta) {
        return perfilMock.nome
    }

    const nome = dadosConta.nome || ''
    const sobrenome = dadosConta.sobrenome || ''
    const nomeCompleto = `${nome} ${sobrenome}`.trim()

    return nomeCompleto || perfilMock.nome
}

function formatarDosagem(dosagem) {
    if (!dosagem) {
        return ''
    }

    return `${dosagem}mg/sem`
}

function formatarTempoUso(tempoUso) {
    if (!tempoUso) {
        return ''
    }

    return tempoUso
}

function formatarStatusCiclo(cicloAtivo) {
    if (cicloAtivo === 'sim') {
        return 'Ciclo ativo'
    }

    if (cicloAtivo === 'off') {
        return 'Em off'
    }

    if (cicloAtivo === 'nunca') {
        return 'Nunca usou'
    }

    return ''
}

function formatarDataExame(data) {
    if (!data) {
        return 'Não informado'
    }

    const dataCorrigida = new Date(`${data}T00:00:00`)

    return dataCorrigida
        .toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        })
        .replace('.', '')
}

export default function Perfil() {
    const { perfil, metricas, alertas } = MOCK_DATA
    const [contaAberta, setContaAberta] = useState(false)

    const dadosConta = carregarDadosConta()

    const perfilDinamico = {
        ...perfil,

        nome: formatarNomeCompleto(dadosConta, perfil),

        idade: dadosConta?.idade || perfil.idade,

        sexo: dadosConta?.sexo
            ? dadosConta.sexo.toLowerCase()
            : perfil.sexo,

        tempoUso: formatarTempoUso(dadosConta?.tempoUso) || perfil.tempoUso,

        dosagem: formatarDosagem(dadosConta?.dosagem) || perfil.dosagem,

        esteroides: dadosConta?.compostos?.length
            ? dadosConta.compostos
            : perfil.esteroides,

        cicloAtivo: dadosConta?.cicloAtivo || 'sim',

        ultimoExame: dadosConta?.dataUltimoExame
            ? formatarDataExame(dadosConta.dataUltimoExame)
            : 'Não informado',
    }

    const primeiroNome = perfilDinamico.nome.split(' ')[0]
    const statusCiclo = formatarStatusCiclo(perfilDinamico.cicloAtivo)

    return (
        <div className="shell">
            <Topbar perfil={perfilDinamico} />

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
                                    <>
                                        {' '}· {statusCiclo}
                                    </>
                                )}

                                {perfilDinamico.cicloAtivo !== 'nunca' && perfilDinamico.tempoUso && (
                                    <>
                                        {' '}há {perfilDinamico.tempoUso}
                                    </>
                                )}

                                {perfilDinamico.cicloAtivo !== 'nunca' && perfilDinamico.dosagem && (
                                    <>
                                        {' '}· {perfilDinamico.dosagem}
                                    </>
                                )}
                            </p>
                        </div>
                    </div>

                    <div className="perfil-collapse">
                        <button
                            className={`perfil-collapse-btn${contaAberta ? ' perfil-collapse-btn--open' : ''}`}
                            onClick={() => setContaAberta(v => !v)}
                        >
                            <span className="perfil-collapse-label">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <circle cx="8" cy="5.5" r="3" />
                                    <path d="M2 14.5c0-3.3 2.7-6 6-6s6 2.7 6 6" />
                                </svg>
                                Dados da conta
                            </span>
                            <svg
                                className="perfil-collapse-chevron"
                                width="14" height="14" viewBox="0 0 16 16"
                                fill="none" stroke="currentColor" strokeWidth="1.8"
                            >
                                <path d="M4 6l4 4 4-4" />
                            </svg>
                        </button>

                        <div className={`perfil-collapse-body${contaAberta ? ' perfil-collapse-body--open' : ''}`}>
                            <div className="perfil-collapse-inner">
                                <DadosDaConta embedded />
                            </div>
                        </div>
                    </div>

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
            </div>
            <HistoricoExames />
        </div>
    )
}