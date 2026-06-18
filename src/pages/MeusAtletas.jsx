import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PatientsList from '../screens/PatientsList.jsx'
import InviteModal from '../components/perfilDoUsuario/InviteModal.jsx'
import Toast from '../components/perfilDoUsuario/Toast.jsx'
import { getDoctorPatients } from '../services/api'
import { useAuth } from '../context/AuthContext.jsx'

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
    compounds: patient.substances?.length ? patient.substances : ['Sem compostos informados'],
    lastExam: patient.lastExamDate || 'Sem exame',
    status: patient.examStatus === 'nunca' ? 'atencao' : 'normal',
    alerts: 0,
    raw: patient,
  }
}

export default function MeusAtletas() {
  const navigate = useNavigate()
  const { usuario } = useAuth()

  const [patients, setPatients] = useState([])
  const [search, setSearch] = useState('')
  const [invite, setInvite] = useState(false)
  const [toast, setToast] = useState(null)
  const [carregando, setCarregando] = useState(true)

  const showToast = (msg) => {
    setToast(msg)
    clearTimeout(showToast._t)
    showToast._t = setTimeout(() => setToast(null), 2400)
  }

  async function carregarPacientes() {
    try {
      setCarregando(true)

      const data = await getDoctorPatients()
      const pacientesFormatados = data.patients.map(formatPatient)

      setPatients(pacientesFormatados)
    } catch (error) {
      showToast(error.message)
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    carregarPacientes()
  }, [])

  if (carregando) {
    return (
      <div style={{ color: '#aaa', padding: 24 }}>
        Carregando pacientes...
      </div>
    )
  }

  return (
    <>
      <PatientsList
        greeting={`Olá, ${usuario?.name || 'Doutor(a)'}`}
        patients={patients}
        search={search}
        onSearch={(e) => setSearch(e.target.value)}
        onOpenPatient={(p) => navigate(`/medico/atleta/${p.id}`)}
        onInvite={() => setInvite(true)}
      />

      {invite && (
        <InviteModal
          onClose={() => setInvite(false)}
          onSend={({ email }) => {
            showToast('Convite criado para ' + email)
            carregarPacientes()
          }}
          onToast={showToast}
        />
      )}

      <Toast message={toast} />
    </>
  )
}