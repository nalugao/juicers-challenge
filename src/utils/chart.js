/* Juicers — funções puras de geometria de gráfico (SVG, sem biblioteca). */

// Curva Catmull-Rom -> bézier cúbica (linha suavizada).
export function smoothPath(pts) {
  if (!pts.length) return '';
  if (pts.length === 1) return 'M' + pts[0][0] + ',' + pts[0][1];
  let d = 'M' + pts[0][0] + ',' + pts[0][1];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ' C' + c1x.toFixed(1) + ',' + c1y.toFixed(1) + ' ' + c2x.toFixed(1) + ',' + c2y.toFixed(1) + ' ' + p2[0].toFixed(1) + ',' + p2[1].toFixed(1);
  }
  return d;
}

const MONTHS = { jan: 0, fev: 1, mar: 2, abr: 3, mai: 4, jun: 5, jul: 6, ago: 7, set: 8, out: 9, nov: 10, dez: 11 };
export function parseDate(s) {
  const p = (s || '').split(' ');
  return new Date(+p[2], MONTHS[(p[1] || '').toLowerCase()] || 0, +p[0]);
}

// Extrai limites mínimo/máximo de uma string de referência ("7–56", "< 100", "> 40").
export function parseRef(ref) {
  const nums = ((ref || '').match(/[\d.]+/g) || []).map(Number);
  let lo = null;
  let hi = null;
  if ((ref || '').indexOf('\u2013') >= 0) {
    lo = nums[0];
    hi = nums[1];
  } else if ((ref || '').indexOf('<') >= 0) {
    hi = nums[0];
  } else if ((ref || '').indexOf('>') >= 0) {
    lo = nums[0];
  }
  return { lo, hi };
}
