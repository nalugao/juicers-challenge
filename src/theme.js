/* Juicers — tokens de tema e cores de status. */

export const ACCENT = {
  athlete: '#e6a817', // âmbar dourado
  doctor: '#2fd6be', // verde-água
};

export const COLORS = {
  bg: '#0d0d0d',
  card: '#141414',
  cardAlt: '#1a1a1a',
  field: '#0f0f0f',
  border: '#2a2a2a',
  borderSoft: '#1f1f1f',
  textPrimary: '#f0f0f0',
  textSecondary: '#888',
  textMuted: '#777',
};

// Status: 'ok' | 'atencao' | 'risco' | 'estavel'
export const STATUS = {
  color: { ok: '#3fb950', atencao: '#e0a82e', risco: '#f04747', estavel: '#3fb950' },
  bg: {
    ok: 'rgba(63,185,80,.12)',
    atencao: 'rgba(224,168,46,.12)',
    risco: 'rgba(240,71,71,.12)',
    estavel: 'rgba(63,185,80,.12)',
  },
  border: {
    ok: 'rgba(63,185,80,.28)',
    atencao: 'rgba(224,168,46,.3)',
    risco: 'rgba(240,71,71,.32)',
    estavel: 'rgba(63,185,80,.28)',
  },
  band: {
    ok: 'rgba(63,185,80,.15)',
    atencao: 'rgba(224,168,46,.15)',
    risco: 'rgba(240,71,71,.15)',
  },
  // rótulos para a lista de pacientes / badges gerais
  label: { ok: 'Estável', atencao: 'Atenção', risco: 'Risco alto', estavel: 'Estável' },
  // rótulos para a faixa de resumo do dashboard
  summaryLabel: { ok: 'Normal', atencao: 'Atenção', risco: 'Risco alto' },
};
