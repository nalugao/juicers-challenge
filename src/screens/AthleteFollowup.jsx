import React from 'react';
import { PageHeader, SectionLabel, NoteCard } from '../components/perfilDoUsuario/Primitives.jsx';

/** Acompanhamento Médico (atleta): anotações e exames solicitados pelo médico. */
export default function AthleteFollowup({ requestedList, notesHistory }) {
  const empty = (text) => (
    <div style={{ background: '#141414', border: '1px solid #2a2a2a', borderRadius: 11, padding: 16, textAlign: 'center', fontSize: 12.5, color: '#777' }}>{text}</div>
  );

  return (
    <div className="jc-fade" style={{ display: 'flex', flexDirection: 'column', gap: 22, maxWidth: 820 }}>
      <PageHeader title="Acompanhamento Médico" sub="Anotações e solicitações do seu médico responsável" />

      <section style={{ background: '#141414', border: '1px solid #2a2a2a', borderRadius: 14, padding: '20px 22px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 46, height: 46, borderRadius: '50%', background: 'rgba(47,214,190,.14)', color: '#2fd6be', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, flex: 'none' }}>
          AS
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#f0f0f0' }}>Dra. Ana Souza</span>
          <span style={{ fontSize: 12, color: '#888' }}>Endocrinologia · CRM-SP 123456</span>
        </div>
      </section>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <SectionLabel style={{ margin: 0 }}>Próximos exames solicitados</SectionLabel>
        {requestedList.length > 0
          ? requestedList.map((r, i) => (
              <div key={i} style={{ background: '#141414', border: '1px solid #2a2a2a', borderRadius: 11, padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 22, height: 22, borderRadius: 6, background: '#2fd6be', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#06201d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                <span style={{ flex: 1, fontSize: 13.5, color: '#e8e8e8' }}>{r.label}</span>
                <span style={{ fontSize: 11, color: '#777' }}>Solicitado em {r.date}</span>
              </div>
            ))
          : empty('Nenhum exame solicitado no momento.')}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <SectionLabel style={{ margin: 0 }}>Anotações do seu médico</SectionLabel>
        {notesHistory.length > 0
          ? notesHistory.map((n, i) => <NoteCard key={i} note={n} />)
          : empty('Seu médico ainda não registrou anotações.')}
      </div>
    </div>
  );
}
