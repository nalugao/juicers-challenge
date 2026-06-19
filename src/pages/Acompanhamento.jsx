import { useEffect, useState } from 'react'
import AthleteFollowup from '../screens/AthleteFollowup.jsx'
import { getMyFollowup } from '../services/api'

function formatDateBR(dateString) {
    if (!dateString) return ''

    const date = new Date(dateString)

    if (Number.isNaN(date.getTime())) {
        return dateString
    }

    return date
        .toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        })
        .replace('.', '')
}

export default function Acompanhamento() {
    const [doctor, setDoctor] = useState(null)
    const [requestedList, setRequestedList] = useState([])
    const [notesHistory, setNotesHistory] = useState([])
    const [loadingDoctor, setLoadingDoctor] = useState(true)

    useEffect(() => {
        async function carregarAcompanhamento() {
            try {
                setLoadingDoctor(true)

                const data = await getMyFollowup()

                if (!data.doctor) {
                    setDoctor(null)
                    setRequestedList([])
                    setNotesHistory([])
                    return
                }

                setDoctor({
                    id: data.doctor._id,
                    name: data.doctor.userId?.name || 'Médico responsável',
                    email: data.doctor.userId?.email || '',
                    crm: data.doctor.crm || '',
                    specialty: data.doctor.specialty || '',
                })

                setRequestedList(
                    (data.requestedExams || []).map((exam) => ({
                        label: exam.label,
                        date: formatDateBR(exam.createdAt),
                    }))
                )

                setNotesHistory(
                    (data.notes || []).map((note) => ({
                        date: formatDateBR(note.createdAt),
                        text: note.text,
                    }))
                )
            } catch (error) {
                console.error('Erro ao carregar acompanhamento médico:', error)
                setDoctor(null)
                setRequestedList([])
                setNotesHistory([])
            } finally {
                setLoadingDoctor(false)
            }
        }

        carregarAcompanhamento()
    }, [])

    return (
        <AthleteFollowup
            doctor={doctor}
            loadingDoctor={loadingDoctor}
            requestedList={requestedList}
            notesHistory={notesHistory}
        />
    )
}