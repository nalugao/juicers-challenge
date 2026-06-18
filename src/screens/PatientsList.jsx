import React from 'react';
import { PageHeader } from '../components/perfilDoUsuario/Primitives.jsx';
import { STATUS } from '../theme.js';

/** Lista de Pacientes (médico): fila de atenção, busca, lista priorizada por risco. */
export default function PatientsList({ greeting, patients, search, onSearch, onOpenPatient, onInvite }) {
  const q = search.trim().toLowerCase();
  const filtered = patients.filter((p) => p.name.toLowerCase().includes(q));
  const total = patients.length;
  const risco = patients.filter((p) => p.status === 'risco').length;
  const atencao = patients.filter((p) => p.status === 'atencao').length;

  const statCard = (label, value, color) => (
    <div style={{ background: '#141414', border: '1px solid #2a2a2a', borderRadius: 12, padding: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontSize: 12, color: '#9a9a9a', fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-.02em', color: color || '#f0f0f0' }}>{value}</span>
    </div>
  );

  return (
    <div className="jc-fade" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <PageHeader title={greeting} sub="Gerencie seus pacientes e acompanhe os indicadores de saúde" />
        <button
          onClick={onInvite}
          className="jc-btn-teal"
          style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#2fd6be', color: '#06201d', border: 'none', fontSize: 13, fontWeight: 700, fontFamily: 'inherit', borderRadius: 10, padding: '11px 18px', cursor: 'pointer', flex: 'none' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#06201d" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
          Adicionar paciente
        </button>
      </div>

      <div className="jc-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
        {statCard('Total de pacientes', total)}
        {statCard('Risco alto', risco, '#f04747')}
        {statCard('Em atenção', atencao, '#e0a82e')}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#141414', border: '1px solid #2a2a2a', borderRadius: 10, padding: '0 14px', maxWidth: 360 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#777" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.2-4.2" />
        </svg>
        <input
          value={search}
          onChange={onSearch}
          placeholder="Buscar paciente por nome..."
          style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#f0f0f0', fontSize: 13.5, fontFamily: 'inherit', padding: '11px 0' }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
        {filtered.map((p) => {
          const alertColor = p.alerts === 0 ? '#5a5a5a' : p.status === 'risco' ? '#f04747' : '#e0a82e';
          return (
            <div key={p.id} className="jc-patient-row" style={{ background: '#141414', border: '1px solid #2a2a2a', borderRadius: 12, padding: '15px 20px', display: 'flex', alignItems: 'center', gap: 18 }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(47,214,190,.14)', color: '#2fd6be', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, flex: 'none' }}>
                {p.initials}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontSize: 14.5, fontWeight: 650, color: '#f0f0f0' }}>{p.name}</span>
                  <span style={{ fontSize: 12, color: '#888' }}>{p.age} anos</span>
                </div>
                <span style={{ fontSize: 11.5, color: '#7e7e7e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {p.compounds.join('  ·  ')}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start', minWidth: 96 }}>
                <span style={{ fontSize: 10, color: '#777', textTransform: 'uppercase', letterSpacing: '.04em' }}>Último exame</span>
                <span style={{ fontSize: 12.5, color: '#cfcfcf', fontWeight: 600 }}>{p.lastExam}</span>
              </div>
              <span style={{ fontSize: 11, fontWeight: 650, color: STATUS.color[p.status], background: STATUS.bg[p.status], border: `1px solid ${STATUS.border[p.status]}`, borderRadius: 20, padding: '4px 12px', flex: 'none' }}>
                {STATUS.label[p.status]}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 42, justifyContent: 'center' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={alertColor} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.7 21a2 2 0 0 1-3.4 0" />
                </svg>
                <span style={{ fontSize: 13, fontWeight: 700, color: alertColor }}>{p.alerts}</span>
              </div>
              <button
                onClick={() => onOpenPatient(p)}
                className="jc-btn-soft-teal"
                style={{ background: 'rgba(47,214,190,.12)', border: '1px solid rgba(47,214,190,.3)', color: '#2fd6be', fontSize: 12.5, fontWeight: 650, fontFamily: 'inherit', borderRadius: 8, padding: '8px 15px', cursor: 'pointer', flex: 'none' }}
              >
                Ver dashboard
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}