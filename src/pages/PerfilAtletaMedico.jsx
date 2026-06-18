import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PatientDetail from '../screens/PatientDetail.jsx'
import MarkerModal from '../components/perfilDoUsuario/MarkerModal.jsx'
import { useClinical } from '../context/ClinicalContext.jsx'
import { getDoctorPatientById } from '../services/api'

function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0])
    .join('')
    .toUpperCase()
}

function formatPatient(patient) {
  const name = patient.userId?.name || 'Paciente sem nome'

  return {
    id: patient._id,
    name,
    initials: getInitials(name),
    age: patient.age || '-',
    compounds: patient.substances?.length
      ? patient.substances
      : ['Sem compostos informados'],
    lastExam: patient.lastExamDate || 'Sem exame',
    status: patient.examStatus === 'nunca' ? 'atencao' : 'estavel',
    alerts: 0,
    raw: patient,
  }
}

export default function PerfilAtletaMedico() {
  const { id } = useParams()
  const navigate = useNavigate()

  const {
    data,
    clinical,
    today,
    addNote,
    togglePatientExam,
    addUpload,
  } = useClinical()

  const [marker, setMarker] = useState(null)
  const [patient, setPatient] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    async function carregarPaciente() {
      try {
        setCarregando(true)
        setErro('')

        const response = await getDoctorPatientById(id)
        setPatient(formatPatient(response.patient))
      } catch (error) {
        setErro(error.message || 'Erro ao carregar paciente.')
        setPatient(null)
      } finally {
        setCarregando(false)
      }
    }

    carregarPaciente()
  }, [id])

  if (carregando) {
    return (
      <div style={{ color: '#aaa', padding: 24, fontFamily: "'Manrope', sans-serif" }}>
        Carregando dashboard do paciente...
      </div>
    )
  }

  if (erro || !patient) {
    return (
      <div style={{ color: '#888', padding: 24, fontFamily: "'Manrope', sans-serif" }}>
        {erro || 'Paciente não encontrado.'}{' '}
        <button
          onClick={() => navigate('/medico')}
          style={{
            color: '#2fd6be',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          Voltar para a lista
        </button>
      </div>
    )
  }

  const entry = clinical[id] || { notes: [], requested: {}, uploads: [] }

  return (
    <>
      <PatientDetail
        patient={patient}
        data={data}
        clinicalEntry={entry}
        today={today}
        onBack={() => navigate('/medico')}
        onSelectMarker={setMarker}
        onAddNote={(text) => addNote(id, text)}
        onToggleExam={(label) => togglePatientExam(id, label)}
        onUpload={(name) => addUpload(id, name)}
      />

      {marker && (
        <MarkerModal
          marker={marker}
          examDates={data.examDates}
          onClose={() => setMarker(null)}
        />
      )}
    </>
  )
}