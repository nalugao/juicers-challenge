import { useCallback, useEffect, useMemo, useState } from 'react'
import { getMyExams, getMyPatientProfile } from '../services/api'

const TODAY = new Date()
    .toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })
    .replace('.', '')

const EMPTY_DATA = {
    examDates: [],
    markers: [],
    categories: [],
    summary: [],
    alerts: [],
    patients: [],
    examHistory: [],
    suggestedExams: [
        'Hemograma completo (controle de hematócrito)',
        'Perfil lipídico completo',
        'Painel hepático (TGO, TGP, GGT)',
        'Estradiol sérico',
        'PSA total e livre',
        'Ecocardiograma + aferição de PA',
    ],
}

const EMPTY_ACCOUNT = {
    nome: '',
    sobrenome: '',
    idade: '',
    sexo: '',
    peso: '',
    altura: '',
    cicloStatus: '',
    dose: '',
    cicloTempo: '',
    compounds: [],
    condicoes: [],
    examFreq: '',
    lastExam: '',
}

const EMPTY_MEDICO = {
    nome: '',
    crm: '',
    specialty: '',
}

const CAT_ORDER = [
    'Cardiovascular',
    'Endócrino',
    'Renal',
    'Hematológico',
    'Micronutrientes',
]

const MARKERS = [
    {
        category: 'Cardiovascular',
        key: 'hdl',
        id: 'hdl',
        name: 'HDL',
        unit: 'mg/dL',
        ref: '> 40',
        reverse: true,
        attention: 40,
        risk: 30,
    },
    {
        category: 'Cardiovascular',
        key: 'ldl',
        id: 'ldl',
        name: 'LDL',
        unit: 'mg/dL',
        ref: '< 100',
        attention: 130,
        risk: 190,
    },
    {
        category: 'Cardiovascular',
        key: 'nonHdl',
        id: 'nonHdl',
        name: 'Colesterol não-HDL',
        unit: 'mg/dL',
        ref: '< 130',
        attention: 130,
        risk: 160,
    },
    {
        category: 'Cardiovascular',
        key: 'vldl',
        id: 'vldl',
        name: 'VLDL',
        unit: 'mg/dL',
        ref: '< 30',
        attention: 30,
        risk: 40,
    },
    {
        category: 'Cardiovascular',
        key: 'triglycerides',
        id: 'triglycerides',
        name: 'Triglicerídeos',
        unit: 'mg/dL',
        ref: '< 150',
        attention: 150,
        risk: 200,
    },
    {
        category: 'Endócrino',
        key: 'glucose',
        id: 'glucose',
        name: 'Glicose',
        unit: 'mg/dL',
        ref: '70–99',
        attention: 100,
        risk: 126,
    },
    {
        category: 'Endócrino',
        key: 'hba1c',
        id: 'hba1c',
        name: 'Hemoglobina Glicada',
        unit: '%',
        ref: '4.1–6.0',
        attention: 5.7,
        risk: 6.5,
    },
    {
        category: 'Renal',
        key: 'creatinine',
        id: 'creatinine',
        name: 'Creatinina',
        unit: 'mg/dL',
        ref: '0.6–1.3',
        attention: 1.3,
        risk: 1.6,
    },
    {
        category: 'Hematológico',
        key: 'hemoglobin',
        id: 'hemoglobin',
        name: 'Hemoglobina',
        unit: 'g/dL',
        ref: '12.8–17.8',
        attention: 17.8,
        risk: 18.5,
    },
    {
        category: 'Hematológico',
        key: 'hematocrit',
        id: 'hematocrit',
        name: 'Hematócrito',
        unit: '%',
        ref: '37–52.4',
        attention: 52.4,
        risk: 55,
    },
    {
        category: 'Hematológico',
        key: 'erythrocytes',
        id: 'erythrocytes',
        name: 'Eritrócitos',
        unit: 'milhões/mm³',
        ref: '4.10–6.11',
        attention: 6.11,
        risk: 6.5,
    },
    {
        category: 'Hematológico',
        key: 'leukocytes',
        id: 'leukocytes',
        name: 'Leucócitos',
        unit: 'mil/mm³',
        ref: '4.12–11.11',
        attention: 11.11,
        risk: 13,
    },
    {
        category: 'Hematológico',
        key: 'platelets',
        id: 'platelets',
        name: 'Plaquetas',
        unit: 'mil/mm³',
        ref: '162–425',
        attention: 425,
        risk: 500,
    },
    {
        category: 'Micronutrientes',
        key: 'vitaminD',
        id: 'vitaminD',
        name: 'Vitamina D',
        unit: 'ng/mL',
        ref: '20–60',
        reverse: true,
        attention: 20,
        risk: 10,
    },
    {
        category: 'Micronutrientes',
        key: 'vitaminB12',
        id: 'vitaminB12',
        name: 'Vitamina B12',
        unit: 'pg/mL',
        ref: '187–883',
        reverse: true,
        attention: 187,
        risk: 130,
    },
    {
        category: 'Micronutrientes',
        key: 'ferritin',
        id: 'ferritin',
        name: 'Ferritina',
        unit: 'ng/mL',
        ref: '21.81–274.66',
        attention: 275,
        risk: 400,
    },
    {
        category: 'Micronutrientes',
        key: 'iron',
        id: 'iron',
        name: 'Ferro',
        unit: 'µg/dL',
        ref: '65–175',
        attention: 175,
        risk: 220,
    },
]

function formatarData(dataISO) {
    if (!dataISO) return '—'

    const date = new Date(dataISO)

    if (Number.isNaN(date.getTime())) {
        return dataISO
    }

    return date
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

function getMarkerStatus(marker, value) {
    if (!marker || value === undefined || value === null || value === '') {
        return 'ok'
    }

    const numberValue = Number(value)

    if (Number.isNaN(numberValue)) {
        return 'ok'
    }

    if (marker.reverse) {
        if (numberValue <= marker.risk) return 'risco'
        if (numberValue <= marker.attention) return 'atencao'
        return 'ok'
    }

    if (numberValue >= marker.risk) return 'risco'
    if (numberValue >= marker.attention) return 'atencao'

    return 'ok'
}

function extrairValues(exames, campo) {
    return exames
        .map((exam) => exam.markers?.[campo])
        .filter((valor) => valor !== undefined && valor !== null && valor !== '')
}

function montarDadosClinicosPorExames(exames = []) {
    if (!exames.length) {
        return EMPTY_DATA
    }

    const examesOrdenados = [...exames].sort(
        (a, b) => new Date(a.examDate) - new Date(b.examDate)
    )

    const examDates = examesOrdenados.map((exam) => formatarData(exam.examDate))

    const markers = MARKERS
        .map((markerConfig) => {
            const values = extrairValues(examesOrdenados, markerConfig.key)

            if (!values.length) return null

            const status = getMarkerStatus(markerConfig, getUltimoValor(values))

            return {
                id: markerConfig.id,
                cat: markerConfig.category,
                name: markerConfig.name,
                unit: markerConfig.unit,
                ref: markerConfig.ref,
                values,
                display: getUltimoValor(values),
                status,
            }
        })
        .filter(Boolean)

    const categories = CAT_ORDER
        .map((cat) => ({
            name: cat,
            markers: markers.filter((marker) => marker.cat === cat),
        }))
        .filter((cat) => cat.markers.length > 0)

    const summaryKeys = ['ldl', 'hdl', 'creatinine', 'hematocrit']

    const summary = summaryKeys
        .map((key) => {
            const markerConfig = MARKERS.find((marker) => marker.key === key)
            const marker = markers.find((item) => item.id === key)

            if (!marker || !markerConfig) return null

            return {
                name: marker.name,
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

    const examHistory = examesOrdenados
        .slice()
        .reverse()
        .map((exam) => ({
            id: exam._id,
            date: formatarData(exam.examDate),
            lab: exam.source === 'manual' ? 'Importação manual' : 'Laboratório',
            markers: Object.keys(exam.markers || {}).length,
            status:
                exam.riskLevel === 'high'
                    ? 'risco'
                    : exam.riskLevel === 'attention'
                        ? 'atencao'
                        : 'ok',
            file: exam.originalFileName || exam.alerts?.[0] || 'Exame laboratorial',
            raw: exam,
        }))

    return {
        ...EMPTY_DATA,
        examDates,
        markers,
        categories,
        summary,
        alerts,
        examHistory,
    }
}

export function useClinicalState() {
    const [data, setData] = useState(EMPTY_DATA)
    const [account, setAccount] = useState(EMPTY_ACCOUNT)
    const [medico, setMedico] = useState(EMPTY_MEDICO)
    const [clinical, setClinical] = useState({})

    useEffect(() => {
        async function carregarDadosClinicos() {
            try {
                const [perfilResponse, examesResponse] = await Promise.all([
                    getMyPatientProfile(),
                    getMyExams(),
                ])

                const paciente = perfilResponse.patient
                const exames = examesResponse.exams || []

                const dadosConvertidos = montarDadosClinicosPorExames(exames)
                setData(dadosConvertidos)

                const nomeCompleto = paciente?.userId?.name || ''
                const partesNome = nomeCompleto.split(' ').filter(Boolean)

                setAccount({
                    nome: partesNome[0] || '',
                    sobrenome: partesNome.slice(1).join(' '),
                    idade: paciente?.age || '',
                    sexo:
                        paciente?.biologicalSex === 'male'
                            ? 'Masculino'
                            : paciente?.biologicalSex === 'female'
                                ? 'Feminino'
                                : '',
                    peso: paciente?.weight || '',
                    altura: paciente?.height ? paciente.height * 100 : '',
                    cicloStatus: paciente?.cycleStatus || '',
                    dose: paciente?.weeklyDosage || '',
                    cicloTempo: paciente?.cycleTime || '',
                    compounds: paciente?.substances || [],
                    condicoes: paciente?.healthConditions || [],
                    examFreq: paciente?.examStatus || '',
                    lastExam: paciente?.lastExamDate
                        ? formatarData(paciente.lastExamDate)
                        : '',
                })

                setClinical({
                    p1: {
                        notes: [],
                        requested: {},
                        uploads: dadosConvertidos.examHistory,
                    },
                })
            } catch (error) {
                console.error('Erro ao carregar dados clínicos:', error)

                setData(EMPTY_DATA)
                setAccount(EMPTY_ACCOUNT)
                setClinical({})
            }
        }

        carregarDadosClinicos()
    }, [])

    const updAccount = useCallback((k, v) => {
        setAccount((a) => ({
            ...a,
            [k]: v,
        }))
    }, [])

    const updMed = useCallback((k, v) => {
        setMedico((m) => ({
            ...m,
            [k]: v,
        }))
    }, [])

    const toggleCompound = useCallback((compound) => {
        setAccount((a) => {
            const compounds = a.compounds || []
            const has = compounds.includes(compound)

            return {
                ...a,
                compounds: has
                    ? compounds.filter((item) => item !== compound)
                    : compounds.concat(compound),
            }
        })
    }, [])

    const toggleCondition = useCallback((condition) => {
        setAccount((a) => {
            let condicoes = a.condicoes || []

            if (condition === 'Nenhuma das anteriores') {
                condicoes = condicoes.includes(condition) ? [] : ['Nenhuma das anteriores']
            } else {
                condicoes = condicoes.filter((item) => item !== 'Nenhuma das anteriores')
                condicoes = condicoes.includes(condition)
                    ? condicoes.filter((item) => item !== condition)
                    : condicoes.concat(condition)
            }

            return {
                ...a,
                condicoes,
            }
        })
    }, [])

    const addNote = useCallback(() => false, [])

    const togglePatientExam = useCallback(() => {}, [])

    const addUpload = useCallback(() => {}, [])

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