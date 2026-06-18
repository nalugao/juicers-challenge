import AthleteFollowup from '../screens/AthleteFollowup.jsx'
import { useClinical } from '../context/ClinicalContext.jsx'

/* Rota /perfil/acompanhamento — o atleta vê as anotações e os exames
   solicitados pelo médico responsável. Lê o estado clínico do paciente
   logado (p1 no mock) do ClinicalProvider. */
export default function Acompanhamento() {
    const { data, clinical } = useClinical()
    const entry = clinical['p1'] || { notes: [], requested: {} }

    const requestedList = data.suggestedExams
        .filter((s) => entry.requested[s])
        .map((s) => ({ label: s, date: entry.requested[s] }))

    const notesHistory = (entry.notes || []).map((n) => ({ date: n.date, text: n.text }))

    return <AthleteFollowup requestedList={requestedList} notesHistory={notesHistory} />
}