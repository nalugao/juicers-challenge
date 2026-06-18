import React from 'react';

/**
 * AlertSidebar — coluna de alertas priorizados.
 * alerts: [{ level: 'risco'|'atencao', title, desc }]
 */
export default function AlertSidebar({ alerts = [] }) {
  return (
    <aside className="jc-alerts" style={{ flex: 'none', width: 266, position: 'sticky', top: 0, display: 'flex', flexDirection: 'column', gap: 13 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ margin: 0, fontSize: 12, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: '#bdbdbd' }}>
          Alertas ativos
        </h2>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: '#0d0d0d',
            background: '#f04747',
            borderRadius: 20,
            minWidth: 20,
            textAlign: 'center',
            padding: '1px 7px',
          }}
        >
          {alerts.length}
        </span>
      </div>

      {alerts.map((a, i) => {
        const color = a.level === 'risco' ? '#f04747' : '#e0a82e';
        return (
          <div
            key={i}
            style={{
              background: '#141414',
              border: '1px solid #2a2a2a',
              borderLeft: `3px solid ${color}`,
              borderRadius: 10,
              padding: '13px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: 5,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, flex: 'none' }} />
              <span style={{ fontSize: 13, fontWeight: 650, color: '#f0f0f0' }}>{a.title}</span>
            </div>
            <p style={{ margin: 0, fontSize: 12, color: '#8c8c8c', lineHeight: 1.45, paddingLeft: 16 }}>{a.desc}</p>
          </div>
        );
      })}

      {alerts.length === 0 && (
        <div
          style={{
            background: '#141414',
            border: '1px solid #2a2a2a',
            borderRadius: 10,
            padding: 16,
            textAlign: 'center',
            fontSize: 12.5,
            color: '#3fb950',
          }}
        >
          Nenhum alerta ativo — paciente estável.
        </div>
      )}
    </aside>
  );
}