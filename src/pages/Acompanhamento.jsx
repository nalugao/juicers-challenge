import { useEffect, useState } from 'react'
import AthleteFollowup from '../screens/AthleteFollowup.jsx'
import { useClinical } from '../context/ClinicalContext.jsx'
import { getMyPatientProfile } from '../services/api'

export default function Acompanhamento() {
    const { data, clinical } = useClinical()

    const [doctor, setDoctor] = useState(null)
    const [loadingDoctor, setLoadingDoctor] = useState(true)

    const entry = clinical['p1'] || { notes: [], requested: {} }

    const requestedList = data.suggestedExams
        .filter((s) => entry.requested[s])
        .map((s) => ({
            label: s,
            date: entry.requested[s],
        }))

    const notesHistory = (entry.notes || []).map((n) => ({
        date: n.date,
        text: n.text,
    }))

    useEffect(() => {
        async function carregarMedicoVinculado() {
            try {
                setLoadingDoctor(true)

                const data = await getMyPatientProfile()
                const doctorData = data?.patient?.doctorId

                if (!doctorData) {
                    setDoctor(null)
                    return
                }

                setDoctor({
                    id: doctorData._id,
                    name: doctorData.userId?.name || 'Médico responsável',
                    email: doctorData.userId?.email || '',
                    crm: doctorData.crm || '',
                    specialty: doctorData.specialty || '',
                })
            } catch (error) {
                console.error('Erro ao carregar médico vinculado:', error)
                setDoctor(null)
            } finally {
                setLoadingDoctor(false)
            }
        }

        carregarMedicoVinculado()
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