import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PatientDetail from '../screens/PatientDetail.jsx';
import MarkerModal from '../components/perfilDoUsuario/MarkerModal.jsx';
import { useClinical } from '../context/ClinicalContext.jsx';

/* Rota /medico/atleta/:id — dashboard individual do paciente (visão médico),
   em abas: Dashboard, Anotações Clínicas, Próximos Exames, Histórico + Upload. */
export default function PerfilAtletaMedico() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, clinical, today, addNote, togglePatientExam, addUpload } = useClinical();
  const [marker, setMarker] = useState(null);

  const patient = data.patients.find((p) => p.id === id);
  if (!patient) {
    return (
      <div style={{ color: '#888', padding: 24, fontFamily: "'Manrope',sans-serif" }}>
        Paciente não encontrado.{' '}
        <button onClick={() => navigate('/medico')} style={{ color: '#2fd6be', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
          Voltar para a lista
        </button>
      </div>
    );
  }

  const entry = clinical[id] || { notes: [], requested: {}, uploads: [] };

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

      {marker && <MarkerModal marker={marker} examDates={data.examDates} onClose={() => setMarker(null)} />}
    </>
  );
}
