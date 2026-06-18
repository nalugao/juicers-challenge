import React from 'react';
import { STATUS } from '../theme.js';

const TEXT = { ok: 'OK', atencao: 'Atenção', risco: 'Risco alto', estavel: 'Estável' };

/**
 * StatusBadge — badge com cor por status (ok / atenção / risco / estável).
 * variant="pill" (texto curto, usado no MarkerCard) | "soft" (lista/cabeçalho).
 */
export default function StatusBadge({ status, label, style }) {
  const color = STATUS.color[status] || STATUS.color.ok;
  const bg = STATUS.bg[status] || STATUS.bg.ok;
  const border = STATUS.border[status] || STATUS.border.ok;
  const text = label || TEXT[status] || '';

  return (
    <span
      style={{
        flex: 'none',
        fontSize: 11,
        fontWeight: 650,
        color,
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: 20,
        padding: '4px 12px',
        ...style,
      }}
    >
      {text}
    </span>
  );
}
