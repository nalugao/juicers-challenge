import { useCallback, useEffect, useMemo, useState } from 'react'
import dataMock, {
    athlete,
    medico as medicoSeed,
    examHistory,
    patients,
} from '../data/mockData'
import { getMyExams, getMyPatientProfile } from '../services/api'

const TODAY = '16 jun 2026'

const CAT_ORDER = [
    'Hepático',
    'Lipídico',
    'Hormonal',
    'Hematológico',
    'Renal',
    'Metabólico',
    'Cardiovascular',
]

function formatarData(dataISO) {
    if (!dataISO) return '—'

    return new Date(`${dataISO}T00:00:00`)
        .toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        })
        .replace('.', '')
}

function getUltimoValor(values = []) {
    return values[values.length - 1]
}

function avaliarStatus(marker) {
    const ultimo = getUltimoValor(marker.values)

    if (ultimo == null) return 'ok'

    switch (marker.name) {
        case 'ALT / TGP':
            return ultimo > 56 ? 'risco' : ultimo > 45 ? 'atencao' : 'ok'

        case 'AST / TGO':
            return ultimo > 40 ? 'atencao' : 'ok'

        case 'GGT':
            return ultimo > 61 ? 'risco' : ultimo > 45 ? 'atencao' : 'ok'

        case 'LDL':
            return ultimo >= 190 ? 'risco' : ultimo >= 130 ? 'atencao' : 'ok'

        case 'HDL':
            return ultimo < 35 ? 'risco' : ultimo < 40 ? 'atencao' : 'ok'

        case 'Triglicerídeos':
            return ultimo >= 200 ? 'risco' : ultimo >= 150 ? 'atencao' : 'ok'

        case 'Testosterona Total':
            return ultimo > 1200 ? 'atencao' : 'ok'

        case 'Testosterona Livre':
            return ultimo > 37 ? 'atencao' : 'ok'

        case 'Creatinina':
            return ultimo > 1.4 ? 'risco' : ultimo > 1.25 ? 'atencao' : 'ok'

        case 'Ureia':
            return ultimo > 50 ? 'atencao' : 'ok'

        case 'Glicemia jejum':
            return ultimo >= 126 ? 'risco' : ultimo > 99 ? 'atencao' : 'ok'

        case 'Hematócrito':
            return ultimo >= 55 ? 'risco' : ultimo > 52 ? 'atencao' : 'ok'

        case 'Hemoglobina':
            return ultimo > 18 ? 'risco' : ultimo > 17.5 ? 'atencao' : 'ok'

        default:
            return 'ok'
    }
}

function criarMarker({ id, cat, name, unit, ref, values, display = null }) {
    const marker = {
        id,
        cat,
        name,
        unit,
        ref,
        values,
        display,
        status: 'ok',
    }

    marker.status = avaliarStatus(marker)

    return marker
}

function extrairValues(exames, campo) {
    return exames
        .map((exam) => exam.markers?.[campo])
        .filter((valor) => valor !== undefined && valor !== null && valor !== '')
}

function montarDadosClinicosPorExames(exames = [], paciente = null) {
    if (!exames.length) {
        return dataMock
    }

    const examesOrdenados = [...exames].sort(
        (a, b) => new Date(a.examDate) - new Date(b.examDate)
    )

    const examDates = examesOrdenados.map((exam) => formatarData(exam.examDate))

    const markers = [
        criarMarker({
            id: 'alt',
            cat: 'Hepático',
            name: 'ALT / TGP',
            unit: 'U/L',
            ref: '7–56',
            values: extrairValues(examesOrdenados, 'tgp'),
        }),
        criarMarker({
            id: 'ast',
            cat: 'Hepático',
            name: 'AST / TGO',
            unit: 'U/L',
            ref: '10–40',
            values: extrairValues(examesOrdenados, 'tgo'),
        }),
        criarMarker({
            id: 'ggt',
            cat: 'Hepático',
            name: 'GGT',
            unit: 'U/L',
            ref: '8–61',
            values: extrairValues(examesOrdenados, 'ggt'),
        }),

        criarMarker({
            id: 'ldl',
            cat: 'Lipídico',
            name: 'LDL',
            unit: 'mg/dL',
            ref: '< 100',
            values: extrairValues(examesOrdenados, 'ldl'),
        }),
        criarMarker({
            id: 'hdl',
            cat: 'Lipídico',
            name: 'HDL',
            unit: 'mg/dL',
            ref: '> 40',
            values: extrairValues(examesOrdenados, 'hdl'),
        }),
        criarMarker({
            id: 'triglycerides',
            cat: 'Lipídico',
            name: 'Triglicerídeos',
            unit: 'mg/dL',
            ref: '< 150',
            values: extrairValues(examesOrdenados, 'triglycerides'),
        }),

        criarMarker({
            id: 'testosteroneTotal',
            cat: 'Hormonal',
            name: 'Testosterona Total',
            unit: 'ng/dL',
            ref: '264–916',
            values: extrairValues(examesOrdenados, 'testosteroneTotal'),
        }),
        criarMarker({
            id: 'testosteroneFree',
            cat: 'Hormonal',
            name: 'Testosterona Livre',
            unit: 'pg/mL',
            ref: '8.7–25.1',
            values: extrairValues(examesOrdenados, 'testosteroneFree'),
        }),

        criarMarker({
            id: 'hematocrit',
            cat: 'Hematológico',
            name: 'Hematócrito',
            unit: '%',
            ref: '38.8–50',
            values: extrairValues(examesOrdenados, 'hematocrit'),
        }),
        criarMarker({
            id: 'hemoglobin',
            cat: 'Hematológico',
            name: 'Hemoglobina',
            unit: 'g/dL',
            ref: '13.5–17.5',
            values: extrairValues(examesOrdenados, 'hemoglobin'),
        }),

        criarMarker({
            id: 'creatinine',
            cat: 'Renal',
            name: 'Creatinina',
            unit: 'mg/dL',
            ref: '0.7–1.3',
            values: extrairValues(examesOrdenados, 'creatinine'),
        }),
        criarMarker({
            id: 'urea',
            cat: 'Renal',
            name: 'Ureia',
            unit: 'mg/dL',
            ref: '16.6–48.5',
            values: extrairValues(examesOrdenados, 'urea'),
        }),

        criarMarker({
            id: 'glucose',
            cat: 'Metabólico',
            name: 'Glicemia jejum',
            unit: 'mg/dL',
            ref: '70–99',
            values: extrairValues(examesOrdenados, 'glucose'),
        }),
    ].filter((marker) => marker.values.length > 0)

    const categories = CAT_ORDER
        .map((cat) => ({
            name: cat,
            markers: markers.filter((marker) => marker.cat === cat),
        }))
        .filter((cat) => cat.markers.length > 0)

    const byName = (name) => markers.find((marker) => marker.name === name)
    const summaryNames = ['Testosterona Total', 'LDL', 'AST / TGO', 'HDL']

    const summary = summaryNames
        .map((name) => {
            const marker = byName(name)

            if (!marker) return null

            return {
                name:
                    name === 'Testosterona Total'
                        ? 'Testosterona'
                        : name === 'AST / TGO'
                            ? 'TGO / TGP'
                            : name,
                value: getUltimoValor(marker.values),
                unit: marker.unit,
                status: marker.status,
            }
        })
        .filter(Boolean)

    const alerts = markers
        .filter((marker) => marker.status === 'risco' || marker.status === 'atencao')
        .map((marker) => ({
            level: marker.status,
            title: marker.status === 'risco' ? 'Risco alto' : 'Atenção',
            desc: `${marker.name} em ${getUltimoValor(marker.values)} ${marker.unit}`,
        }))

    const ultimoExame = examesOrdenados[examesOrdenados.length - 1]

    const patientName = paciente?.userId?.name || athlete.fullName
    const patientAge = paciente?.age || athlete.age
    const patientCompounds = paciente?.substances?.length
        ? paciente.substances
        : athlete.compounds

    const patientStatus = alerts.some((alert) => alert.level === 'risco')
        ? 'risco'
        : alerts.some((alert) => alert.level === 'atencao')
            ? 'atencao'
            : 'estavel'

    const patientsAtualizados = [
        {
            id: 'p1',
            name: patientName,
            initials: patientName
                .split(' ')
                .map((parte) => parte[0])
                .join('')
                .slice(0, 2)
                .toUpperCase(),
            age: patientAge,
            compounds: patientCompounds,
            lastExam: formatarData(ultimoExame?.examDate),
            status: patientStatus,
            alerts: alerts.length,
        },
        ...patients.filter((patient) => patient.id !== 'p1'),
    ]

    const examHistoryAtualizado = examesOrdenados
        .slice()
        .reverse()
        .map((exam) => ({
            date: formatarData(exam.examDate),
            lab: exam.source === 'manual' ? 'Importação manual' : 'Laboratório',
            markers: Object.keys(exam.markers || {}).length,
            status:
                exam.riskLevel === 'high'
                    ? 'risco'
                    : exam.riskLevel === 'attention'
                        ? 'atencao'
                        : 'ok',
            file: exam.alerts?.[0] || 'Exame laboratorial',
        }))

    return {
        ...dataMock,
        examDates,
        markers,
        categories,
        summary,
        alerts,
        patients: patientsAtualizados,
        examHistory: examHistoryAtualizado,
    }
}

export function useClinicalState() {
    const [data, setData] = useState(dataMock)

    const [account, setAccount] = useState(() => {
        const parts = athlete.fullName.split(' ')

        return {
            nome: parts[0],
            sobrenome: parts.slice(1).join(' '),
            idade: athlete.age,
            sexo: athlete.sexo,
            peso: athlete.peso,
            altura: athlete.altura,
            cicloStatus: athlete.cicloStatus,
            dose: athlete.dose,
            cicloTempo: athlete.cicloTempo,
            compounds: athlete.compounds.slice(),
            condicoes: athlete.condicoes.slice(),
            examFreq: athlete.examFreq,
            lastExam: athlete.lastExam,
        }
    })

    const [medico, setMedico] = useState(() => ({ ...medicoSeed }))

    const [clinical, setClinical] = useState(() => {
        const c = {}

        patients.forEach((p) => {
            c[p.id] = {
                notes: [],
                requested: {},
                uploads: [],
            }
        })

        if (c.p1) {
            c.p1.uploads = examHistory.map((e) => ({ ...e }))

            c.p1.notes = [
                {
                    date: '18 mar 2026',
                    text: 'Hematócrito e LDL em elevação. Orientada redução da dosagem semanal e reavaliação do perfil lipídico em 90 dias. Reforçar hidratação e monitorar pressão arterial.',
                },
            ]

            c.p1.requested = {
                'Hemograma completo (controle de hematócrito)': '18 mar 2026',
                'Perfil lipídico completo': '18 mar 2026',
            }
        }

        return c
    })

    useEffect(() => {
        async function carregarDadosClinicos() {
            try {
                const [perfilResponse, examesResponse] = await Promise.all([
                    getMyPatientProfile(),
                    getMyExams(),
                ])

                const paciente = perfilResponse.patient
                const exames = examesResponse.exams || []

                const dadosConvertidos = montarDadosClinicosPorExames(exames, paciente)

                setData(dadosConvertidos)

                const nomeCompleto = paciente?.userId?.name || athlete.fullName
                const partesNome = nomeCompleto.split(' ')

                setAccount((prev) => ({
                    ...prev,
                    nome: partesNome[0] || '',
                    sobrenome: partesNome.slice(1).join(' '),
                    idade: paciente?.age || prev.idade,
                    sexo:
                        paciente?.biologicalSex === 'male'
                            ? 'Masculino'
                            : paciente?.biologicalSex === 'female'
                                ? 'Feminino'
                                : prev.sexo,
                    peso: paciente?.weight || prev.peso,
                    altura: paciente?.height ? paciente.height * 100 : prev.altura,
                    cicloStatus: paciente?.cycleStatus || prev.cicloStatus,
                    dose: paciente?.weeklyDosage || prev.dose,
                    cicloTempo: paciente?.cycleTime || prev.cicloTempo,
                    compounds: paciente?.substances?.length
                        ? paciente.substances
                        : prev.compounds,
                    condicoes: paciente?.healthConditions?.length
                        ? paciente.healthConditions
                        : prev.condicoes,
                    lastExam:
                        paciente?.lastExamDate
                            ? formatarData(paciente.lastExamDate)
                            : exames[0]?.examDate
                                ? formatarData(exames[0].examDate)
                                : prev.lastExam,
                }))

                setClinical((prev) => ({
                    ...prev,
                    p1: {
                        ...(prev.p1 || { notes: [], requested: {}, uploads: [] }),
                        uploads: dadosConvertidos.examHistory,
                    },
                }))
            } catch (error) {
                console.error('Erro ao carregar dados clínicos:', error)
            }
        }

        carregarDadosClinicos()
    }, [])

    const updAccount = useCallback(
        (k, v) => setAccount((a) => ({ ...a, [k]: v })),
        []
    )

    const updMed = useCallback(
        (k, v) => setMedico((m) => ({ ...m, [k]: v })),
        []
    )

    const toggleCompound = useCallback((compound) => {
        setAccount((a) => {
            const has = a.compounds.includes(compound)

            return {
                ...a,
                compounds: has
                    ? a.compounds.filter((item) => item !== compound)
                    : a.compounds.concat(compound),
            }
        })
    }, [])

    const toggleCondition = useCallback((condition) => {
        setAccount((a) => {
            let arr = a.condicoes

            if (condition === 'Nenhuma das anteriores') {
                arr = arr.includes(condition) ? [] : ['Nenhuma das anteriores']
            } else {
                arr = arr.filter((item) => item !== 'Nenhuma das anteriores')
                arr = arr.includes(condition)
                    ? arr.filter((item) => item !== condition)
                    : arr.concat(condition)
            }

            return {
                ...a,
                condicoes: arr,
            }
        })
    }, [])

    const addNote = useCallback((pid, text) => {
        const draft = (text || '').trim()

        if (!draft) return false

        setClinical((c) => {
            const pc = c[pid] || {
                notes: [],
                requested: {},
                uploads: [],
            }

            return {
                ...c,
                [pid]: {
                    ...pc,
                    notes: [
                        {
                            date: TODAY,
                            text: draft,
                        },
                        ...pc.notes,
                    ],
                },
            }
        })

        return true
    }, [])

    const togglePatientExam = useCallback((pid, label) => {
        setClinical((c) => {
            const pc = c[pid] || {
                notes: [],
                requested: {},
                uploads: [],
            }

            const req = {
                ...pc.requested,
            }

            if (req[label]) {
                delete req[label]
            } else {
                req[label] = TODAY
            }

            return {
                ...c,
                [pid]: {
                    ...pc,
                    requested: req,
                },
            }
        })
    }, [])

    const addUpload = useCallback((pid, filename) => {
        setClinical((c) => {
            const pc = c[pid] || {
                notes: [],
                requested: {},
                uploads: [],
            }

            const entry = {
                date: TODAY,
                lab: 'Importação manual',
                markers: 32,
                status: 'atencao',
                file: filename || 'exame.pdf',
            }

            return {
                ...c,
                [pid]: {
                    ...pc,
                    uploads: [entry, ...pc.uploads],
                },
            }
        })
    }, [])

    const value = useMemo(
        () => ({
            data,
            today: TODAY,
            account,
            medico,
            clinical,
            updAccount,
            updMed,
            toggleCompound,
            toggleCondition,
            addNote,
            togglePatientExam,
            addUpload,
        }),
        [
            data,
            account,
            medico,
            clinical,
            updAccount,
            updMed,
            toggleCompound,
            toggleCondition,
            addNote,
            togglePatientExam,
            addUpload,
        ]
    )

    return value
}