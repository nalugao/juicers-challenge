import CardMetrica from '../components/perfilDoUsuario/CardMetrica'
import CardChart from '../components/perfilDoUsuario/CardChart'
import CardAlertasExamesInsights from '../components/perfilDoUsuario/CardAlertasExamesInsights'
import { MOCK_DATA } from '../data/mockData'
import '../style/perfil.css'

function carregarDadosConta() {
    const dados = localStorage.getItem('dadosContaCicloRisco')
    if (!dados) return null
    try {
        return JSON.parse(dados)
    } catch {
        return null
    }
}

function formatarNomeCompleto(dadosConta, perfilMock) {
    if (!dadosConta) return perfilMock.nome
    const nome = dadosConta.nome || ''
    const sobrenome = dadosConta.sobrenome || ''
    const nomeCompleto = `${nome} ${sobrenome}`.trim()
    return nomeCompleto || perfilMock.nome
}

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

export default function Perfil() {
    const { perfil, metricas, alertas } = MOCK_DATA

    const dadosConta = carregarDadosConta()

    const perfilDinamico = {
        ...perfil,
        nome: formatarNomeCompleto(dadosConta, perfil),
        idade: dadosConta?.idade || perfil.idade,
        sexo: dadosConta?.sexo ? dadosConta.sexo.toLowerCase() : perfil.sexo,
        tempoUso: formatarTempoUso(dadosConta?.tempoUso) || perfil.tempoUso,
        dosagem: formatarDosagem(dadosConta?.dosagem) || perfil.dosagem,
        esteroides: dadosConta?.compostos?.length ? dadosConta.compostos : perfil.esteroides,
        cicloAtivo: dadosConta?.cicloAtivo || 'sim',
        ultimoExame: dadosConta?.dataUltimoExame
            ? formatarDataExame(dadosConta.dataUltimoExame)
            : 'Não informado',
    }

    const primeiroNome = perfilDinamico.nome.split(' ')[0]
    const statusCiclo = formatarStatusCiclo(perfilDinamico.cicloAtivo)

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
                        </p>
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
    )
}