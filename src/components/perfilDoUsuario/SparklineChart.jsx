import React from 'react';
import { smoothPath, parseRef } from '../../utils/chart.js';
import { STATUS } from '../../theme.js';

/**
 * SparklineChart — mini gráfico SVG puro (sem biblioteca).
 * - faixa de referência sombreada (cor do status, opacity ~0.15)
 * - curva suavizada (bézier cúbica)
 * - ponto atual destacado + pontos intermediários menores
 */
export default function SparklineChart({ values, reference, status }) {
  const vals = values && values.length ? values : [0, 0, 0, 0];
  const W = 160;
  const H = 40;
  const padX = 6;
  const padY = 8;

  const { lo, hi } = parseRef(reference);
  let mn = Math.min(...vals);
  let mx = Math.max(...vals);
  [lo, hi].forEach((x) => {
    if (x != null) {
      mn = Math.min(mn, x);
      mx = Math.max(mx, x);
    }
  });
  const span = mx - mn || 1;
  const ymin = mn - span * 0.15;
  const ymax = mx + span * 0.15;
  const n = vals.length;
  const sx = (i) => padX + (n > 1 ? i / (n - 1) : 0.5) * (W - 2 * padX);
  const sy = (v) => padY + (1 - (v - ymin) / ((ymax - ymin) || 1)) * (H - 2 * padY);
  const coords = vals.map((v, i) => [+sx(i).toFixed(1), +sy(v).toFixed(1)]);
  const path = smoothPath(coords);
  const lastC = coords[coords.length - 1];
  const interPoints = coords.slice(0, -1);

  const clamp = (y) => Math.max(0, Math.min(H, y));
  let bandShow = false;
  let bandY = 0;
  let bandH = 0;
  if (lo != null && hi != null) {
    const a = clamp(sy(hi));
    const b = clamp(sy(lo));
    bandShow = true;
    bandY = Math.min(a, b);
    bandH = Math.abs(b - a);
  } else if (hi != null) {
    const a = clamp(sy(hi));
    bandShow = true;
    bandY = a;
    bandH = H - a;
  } else if (lo != null) {
    const b = clamp(sy(lo));
    bandShow = true;
    bandY = 0;
    bandH = b;
  }

  const color = STATUS.color[status] || STATUS.color.ok;
  const band = STATUS.band[status] || STATUS.band.ok;

  return (
    <svg viewBox="0 0 160 40" preserveAspectRatio="none" style={{ width: '100%', height: 40, overflow: 'visible' }}>
      {bandShow && <rect x="0" y={+bandY.toFixed(1)} width="160" height={+bandH.toFixed(1)} fill={band} />}
      <path d={path} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      {interPoints.map((c, i) => (
        <circle key={i} cx={c[0]} cy={c[1]} r="2" fill={color} fillOpacity="0.45" />
      ))}
      {lastC && <circle cx={lastC[0]} cy={lastC[1]} r="3.2" fill={color} />}
    </svg>
  );
}
