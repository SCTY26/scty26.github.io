export interface ContourOpts {
  count: number;
  base: number;
  step: number;
  cx: number;
  cy: number;
  sx?: number;
  sy?: number;
}

/** Courbes de niveau fermées, déformées par trois harmoniques (génération déterministe). */
export function contourPaths({ count, base, step, cx, cy, sx = 1, sy = 1 }: ContourOpts): string[] {
  const rings: string[] = [];
  for (let i = 0; i < count; i++) {
    const R = base + i * step;
    const ph = 0.4 + i * 0.05;
    const k = i * 0.16;
    let d = '';
    for (let j = 0; j < 140; j++) {
      const t = (2 * Math.PI * j) / 140;
      const r = R * (1 + 0.1 * Math.sin(3 * t + ph) + 0.06 * Math.sin(5 * t + 2.1 * ph + k) + 0.035 * Math.sin(8 * t + 0.7 * ph));
      d += `${j ? 'L' : 'M'}${(cx + r * Math.cos(t) * sx).toFixed(1)},${(cy + r * Math.sin(t) * sy).toFixed(1)}`;
    }
    rings.push(d + 'Z');
  }
  return rings;
}
