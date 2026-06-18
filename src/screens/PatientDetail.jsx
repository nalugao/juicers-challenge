import React, { useState } from 'react';
import Dashboard from '../components/perfilDoUsuario/Dashboard.jsx';
import UploadZone from '../components/perfilDoUsuario/UploadZone.jsx';
import { SectionLabel, NoteCard, ExamRow, decorateExam } from '../components/perfilDoUsuario/Primitives.jsx';
import { STATUS } from '../theme.js';

const TABS = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'notas', label: 'Anotações Clínicas' },
  { key: 'exames', label: 'Próximos Exames' },
  { key: 'historico', label: 'Histórico + Upload' },
];

/** Dashboard Individual do Paciente (visão médico) — organizado em abas. */
export default function PatientDetail({
  patient,
  data,
  clinicalEntry,
  today,
  onBack,
  onSelectMarker,
  onAddNote,
  onToggleExam,
  onUpload,
}) {
  const [tab, setTab] = useState('dashboard');
  const [draft, setDraft] = useState('');

  const pStatus = patient.status || 'estavel';
  const meta = `${patient.age} anos · ${patient.compounds.join(', ')} · Último exame: ${patient.lastExam}`;

  const notes = clinicalEntry.notes || [];
  const uploads = (clinicalEntry.uploads || []).map((e) => decorateExam(e, STATUS));
  const requested = clinicalEntry.requested || {};
  const reqCount = data.suggestedExams.filter((s) => requested[s]).length;

  const saveNote = () => {
    if (onAddNote(draft)) setDraft('');
  };

  return (
    <div className="jc-fade" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <button
        onClick={onBack}
        className="jc-btn-ghost teal"
        style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 7, background: 'transparent', border: '1px solid #2a2a2a', color: '#cfcfcf', fontSize: 12.5, fontWeight: 600, fontFamily: 'inherit', borderRadius: 8, padding: '8px 14px', cursor: 'pointer' }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Voltar para lista
      </button>

      {/* Cabeçalho persistente do paciente */}
      <section style={{ background: '#141414', border: '1px solid #2a2a2a', borderRadius: 14, padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'rgba(47,214,190,.14)', color: '#2fd6be', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, flex: 'none' }}>
          {patient.initials}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: 19, fontWeight: 700, color: '#f0f0f0', letterSpacing: '-.01em' }}>{patient.name}</span>
          <span style={{ fontSize: 12.5, color: '#888' }}>{meta}</span>
        </div>
        <span style={{ fontSize: 11.5, fontWeight: 650, color: STATUS.color[pStatus], background: STATUS.bg[pStatus], border: `1px solid ${STATUS.border[pStatus]}`, borderRadius: 20, padding: '5px 13px', flex: 'none' }}>
          {STATUS.label[pStatus]}
        </span>
      </section>

      {/* Menu de abas */}
      <div style={{ display: 'flex', gap: 2, borderBottom: '1px solid #232323', flexWrap: 'wrap' }}>
        {TABS.map((t) => {
          const on = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{ background: 'transparent', border: 'none', borderBottom: `2px solid ${on ? '#2fd6be' : 'transparent'}`, color: on ? '#2fd6be' : '#9a9a9a', fontSize: 13.5, fontWeight: 600, fontFamily: 'inherit', padding: '11px 16px', cursor: 'pointer', transition: 'color .15s ease, border-color .15s ease', marginBottom: -1 }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {tab === 'dashboard' && (
        <div className="jc-fade-fast">
          <Dashboard
            accent="#2fd6be"
            hideHeader
            summary={data.summary}
            alerts={data.alerts}
            categories={data.categories}
            examDates={data.examDates}
            onSelect={onSelectMarker}
          />
        </div>
      )}

      {tab === 'notas' && (
        <div className="jc-fade-fast" style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 780 }}>
          <section style={{ background: '#141414', border: '1px solid #2a2a2a', borderRadius: 14, padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Nova Anotação Clínica</h2>
            <textarea
              className="jc-textarea teal"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Adicione observações desta consulta..."
              style={{ minHeight: 140, resize: 'vertical', background: '#0f0f0f', border: '1px solid #2a2a2a', borderRadius: 10, padding: '13px 14px', color: '#f0f0f0', fontSize: 13.5, lineHeight: 1.55, fontFamily: 'inherit', outline: 'none' }}
            />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, color: '#777' }}>Consulta de {today}</span>
              <button
                onClick={saveNote}
                className="jc-btn-teal"
                style={{ background: '#2fd6be', color: '#06201d', border: 'none', fontSize: 12.5, fontWeight: 700, fontFamily: 'inherit', borderRadius: 9, padding: '9px 18px', cursor: 'pointer' }}
              >
                Salvar anotação
              </button>
            </div>
          </section>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <SectionLabel>Histórico de anotações</SectionLabel>
            {notes.length > 0 ? (
              notes.map((n, i) => <NoteCard key={i} note={n} />)
            ) : (
              <div style={{ background: '#141414', border: '1px solid #2a2a2a', borderRadius: 10, padding: 16, textAlign: 'center', fontSize: 12.5, color: '#777' }}>
                Nenhuma anotação registrada ainda.
              </div>
            )}
          </div>
        </div>
      )}

      {tab === 'exames' && (
        <section className="jc-fade-fast" style={{ background: '#141414', border: '1px solid #2a2a2a', borderRadius: 14, padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 780 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Próximos Exames Sugeridos</h2>
            <span style={{ fontSize: 11, fontWeight: 650, color: '#2fd6be', background: 'rgba(47,214,190,.12)', borderRadius: 20, padding: '3px 10px' }}>{reqCount} solicitados</span>
          </div>
          <p style={{ margin: 0, fontSize: 12.5, color: '#7e7e7e', lineHeight: 1.45 }}>Recomendados com base no ciclo e nos alertas ativos do paciente. Marque para solicitar.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {data.suggestedExams.map((s) => {
              const on = !!requested[s];
              return (
                <label key={s} onClick={() => onToggleExam(s)} style={{ display: 'flex', alignItems: 'flex-start', gap: 11, cursor: 'pointer', fontSize: 13, color: '#cfcfcf', padding: '8px 0', lineHeight: 1.4 }}>
                  <span style={{ width: 19, height: 19, borderRadius: 5, border: `1.5px solid ${on ? '#2fd6be' : '#3a3a3a'}`, background: on ? '#2fd6be' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', marginTop: 1 }}>
                    {on && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#06201d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    )}
                  </span>
                  {s}
                </label>
              );
            })}
          </div>
        </section>
      )}

      {tab === 'historico' && (
        <div className="jc-fade-fast" style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 880 }}>
          <section style={{ background: '#141414', border: '1px solid #2a2a2a', borderRadius: 14, padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2fd6be" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 16V4" />
                <path d="M8 8l4-4 4 4" />
                <path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
              </svg>
              <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Importar Novo Exame</h2>
            </div>
            <UploadZone accent="#2fd6be" label={`Importar exame para ${patient.name.split(' ')[0]}`} onUpload={onUpload} />
          </section>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <SectionLabel>Exames importados</SectionLabel>
            {uploads.map((e, i) => (
              <ExamRow key={i} exam={e} accent="teal" onDetails={() => setTab('dashboard')} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
