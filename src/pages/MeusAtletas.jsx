import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientsList from '../screens/PatientsList.jsx';
import InviteModal from '../components/perfilDoUsuario/InviteModal.jsx';
import Toast from '../components/perfilDoUsuario/Toast.jsx';
import { useClinical } from '../context/ClinicalContext.jsx';

/* Rota /medico (index) — lista de pacientes do médico.
   Ao clicar em "Ver dashboard", navega para /medico/atleta/:id. */
export default function MeusAtletas() {
  const { data, medico } = useClinical();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [invite, setInvite] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => setToast(null), 2400);
  };

  return (
    <>
      <PatientsList
        greeting={`Olá, Dra. ${medico.nome || 'Ana'}`}
        patients={data.patients}
        search={search}
        onSearch={(e) => setSearch(e.target.value)}
        onOpenPatient={(p) => navigate(`/medico/atleta/${p.id}`)}
        onInvite={() => setInvite(true)}
      />

      {invite && (
        <InviteModal
          onClose={() => setInvite(false)}
          onSend={({ email }) => {
            setInvite(false);
            showToast('Convite enviado para ' + email);
          }}
          onToast={showToast}
        />
      )}

      <Toast message={toast} />
    </>
  );
}
