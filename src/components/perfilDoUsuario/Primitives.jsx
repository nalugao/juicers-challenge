import React from 'react';

/** Campo de formulário (label + input controlado). accent: 'amber' | 'teal'. */
export function Field({ label, value, onChange, type = 'text', accent = 'amber', placeholder, style }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      <label style={{ fontSize: 11, fontWeight: 600, color: '#9a9a9a', textTransform: 'uppercase', letterSpacing: '.04em' }}>{label}</label>
      <input
        className={`jc-input ${accent}`}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          background: '#0f0f0f',
          border: '1px solid #2a2a2a',
          borderRadius: 9,
          padding: '10px 12px',
          color: '#f0f0f0',
          fontSize: 14,
          fontFamily: 'inherit',
          outline: 'none',
        }}
      />
    </div>
  );
}

/** Cartão de seção de formulário. */
export function SectionCard({ title, desc, children, style }) {
  return (
    <section style={{ background: '#141414', border: '1px solid #2a2a2a', borderRadius: 14, padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 16, ...style }}>
      {title && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>{title}</h2>
          {desc && <p style={{ margin: 0, fontSize: 12, color: '#7e7e7e' }}>{desc}</p>}
        </div>
      )}
      {children}
    </section>
  );
}

/** Linha de exame importado. */
export function ExamRow({ exam, accent = 'amber', onDetails }) {
  return (
    <div style={{ background: '#141414', border: '1px solid #2a2a2a', borderRadius: 12, padding: '15px 20px', display: 'flex', alignItems: 'center', gap: 20 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 118 }}>
        <span style={{ fontSize: 14.5, fontWeight: 650, color: '#f0f0f0' }}>{exam.date}</span>
        <span style={{ fontSize: 11.5, color: '#888' }}>{exam.lab}</span>
      </div>
      <span style={{ fontSize: 13, color: '#9a9a9a', flex: 1 }}>{exam.markers} marcadores</span>
      <span style={{ fontSize: 11, fontWeight: 650, color: exam.statusColor, background: exam.statusBg, border: `1px solid ${exam.statusBorder}`, borderRadius: 20, padding: '3px 11px' }}>
        {exam.statusLabel}
      </span>
      <button
        onClick={onDetails}
        className={`jc-btn-ghost ${accent}`}
        style={{ background: 'transparent', border: '1px solid #2f2f2f', color: '#d0d0d0', fontSize: 12.5, fontWeight: 600, fontFamily: 'inherit', borderRadius: 8, padding: '7px 14px', cursor: 'pointer' }}
      >
        Ver detalhes
      </button>
    </div>
  );
}

/** Cartão de anotação clínica (data + texto). */
export function NoteCard({ note }) {
  return (
    <div style={{ background: '#141414', border: '1px solid #2a2a2a', borderLeft: '3px solid #2fd6be', borderRadius: 10, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 7 }}>
      <span style={{ fontSize: 11, fontWeight: 650, color: '#2fd6be', textTransform: 'uppercase', letterSpacing: '.04em' }}>{note.date}</span>
      <p style={{ margin: 0, fontSize: 13, color: '#cfcfcf', lineHeight: 1.55 }}>{note.text}</p>
    </div>
  );
}

/** Cabeçalho de página (título + subtítulo). */
export function PageHeader({ title, sub }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-.02em' }}>{title}</h1>
      {sub && <p style={{ margin: 0, fontSize: 13, color: '#888' }}>{sub}</p>}
    </div>
  );
}

/** Rótulo de seção (caixa-alta). */
export function SectionLabel({ children, style }) {
  return (
    <h2 style={{ margin: '2px 0 0', fontSize: 13, fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', color: '#bdbdbd', ...style }}>
      {children}
    </h2>
  );
}

/** Converte um status de exame em cores + rótulo para exibição. */
export function decorateExam(e, STATUS) {
  return {
    ...e,
    statusColor: STATUS.color[e.status] || '#3fb950',
    statusBg: STATUS.bg[e.status] || STATUS.bg.ok,
    statusBorder: STATUS.border[e.status] || STATUS.border.ok,
    statusLabel: e.status === 'ok' ? 'Normal' : STATUS.label[e.status],
  };
}
