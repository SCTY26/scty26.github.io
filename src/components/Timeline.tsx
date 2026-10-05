import { useLayoutEffect, useMemo, useRef } from 'react';
import { scaleLinear } from 'd3-scale';
import { range } from 'd3-array';
import { gsap, reduceMotion } from '../lib/motion';
import { lanes, milestones, NOW, roles } from '../data';
import logoDestination from '../assets/logo-destination-data';

const W = 1000;
const LEFT = 130;
const RIGHT = 20;
const ROW = 30;
const TOP = 46;
const CHAR = 6.4;

interface Placed {
  label: string;
  x0: number;
  x1: number;
  row: number;
  inside: boolean;
  approx?: boolean;
  open?: boolean;
  tone?: 'main' | 'data';
  tip: string;
}

export default function Timeline() {
  const root = useRef<HTMLElement>(null);
  const x = useMemo(() => scaleLinear().domain([2009, 2027]).range([LEFT, W - RIGHT]), []);

  const { placed, height } = useMemo(() => {
    let y = TOP;
    const out: { name: string; y: number; h: number; bars: Placed[] }[] = [];
    for (const lane of lanes) {
      const ends: number[] = [];
      const bars: Placed[] = [];
      [...lane.bars].sort((a, b) => a.from - b.from).forEach((b) => {
        const x0 = x(b.from);
        const x1 = x(b.to);
        const textW = b.label.length * CHAR + 14;
        const inside = x1 - x0 >= textW;
        const occ = inside ? x1 : Math.max(x1, x0 + textW + 6);
        let row = ends.findIndex((e) => x0 >= e + 6);
        if (row === -1) {
          row = ends.length;
          ends.push(occ);
        } else ends[row] = occ;
        const period = `${b.from.toFixed(0)} à ${b.to >= NOW ? 'aujourd’hui' : b.to.toFixed(0)}`;
        bars.push({ ...b, x0, x1, row, inside, tip: `${b.label} : ${period}${b.approx ? ' (dates précises non fournies)' : ''}` });
      });
      const h = Math.max(1, ends.length) * ROW + 22;
      out.push({ name: lane.name, y, h, bars });
      y += h;
    }
    return { placed: out, height: y + 40 };
  }, [x]);

  useLayoutEffect(() => {
    if (reduceMotion || !root.current) return;
    const ctx = gsap.context(() => {
      const st = { trigger: '.tl__chart', start: 'top 72%', once: true };
      gsap.from('#tl-clip-rect', { attr: { width: 0 }, duration: 2.4, ease: 'power2.inOut', scrollTrigger: st });
      gsap.from('.tl__roles li', {
        opacity: 0,
        y: 36,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '.tl__roles', start: 'top 80%', once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const ticks = range(2010, 2027, 2);

  return (
    <section className="tl" id="parcours" ref={root}>
      <header className="sec-head">
        <p className="mono label">03 / Parcours</p>
        <h2 className="sec-title">Treize ans de parcours,<br /><em>autour de Rennes.</em></h2>
        <p className="sec-sub">Frise construite uniquement à partir des dates du CV. Les barres hachurées signalent un début ou une fin non précisés : elles sont tracées sur la durée du poste concerné.</p>
      </header>

      <p className="mono tl__hint">Faire défiler la frise horizontalement →</p>
      <div className="tl__scroll">
        <div className="tl__chart">
          <svg viewBox={`0 0 ${W} ${height}`} role="img" aria-label="Frise chronologique du parcours de 2009 à aujourd’hui" style={{ minWidth: 760 }}>
            <defs>
              <clipPath id="tl-clip"><rect id="tl-clip-rect" x={0} y={0} width={W} height={height} /></clipPath>
              <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="6" stroke="currentColor" strokeWidth="2" />
              </pattern>
            </defs>
            {ticks.map((t) => (
              <g key={t}>
                <line className="tl__grid" x1={x(t)} x2={x(t)} y1={TOP - 8} y2={height - 28} />
                <text className="tl__tick" x={x(t)} y={height - 8} textAnchor="middle">{t}</text>
              </g>
            ))}
            {milestones.map((m) => (
              <g key={m.year}>
                <line className="tl__mile" x1={x(m.year)} x2={x(m.year)} y1={TOP - 8} y2={height - 28} />
                <text className="tl__tick on" x={x(m.year)} y={TOP - 18} textAnchor="middle">{m.label} {m.year}</text>
              </g>
            ))}
            <line className="tl__now" x1={x(NOW)} x2={x(NOW)} y1={TOP - 8} y2={height - 28} />
            <text className="tl__now-t" x={x(NOW)} y={TOP - 18} textAnchor="end">Oct. 2026</text>

            <g clipPath="url(#tl-clip)">
            {placed.map((lane) => (
              <g key={lane.name}>
                <line className="tl__lane" x1={0} x2={W} y1={lane.y - 4} y2={lane.y - 4} />
                <text className="tl__lane-t" x={0} y={lane.y + 16}>{lane.name}</text>
                {lane.bars.map((b, i) => {
                  const y = lane.y + b.row * ROW + 2;
                  const w = Math.max(b.x1 - b.x0, 3);
                  return (
                    <g key={i} className={`tl__g ${b.tone}`}>
                      <title>{b.tip}</title>
                      <rect className="tl__bar base" x={b.x0} y={y} width={w} height={22} />
                      {b.approx && <rect className="tl__bar hatch" x={b.x0} y={y} width={w} height={22} fill="url(#hatch)" />}
                      {b.open && <path className="tl__bar arrow" d={`M${b.x1},${y} l9,11 l-9,11 z`} />}
                      <text
                        className={`tl__label ${b.inside ? 'in' : 'out'}`}
                        x={b.inside ? b.x0 + 7 : b.x1 + (b.open ? 14 : 7)}
                        y={y + 15}
                      >
                        {b.label}
                      </text>
                    </g>
                  );
                })}
              </g>
            ))}
            </g>
          </svg>
        </div>
      </div>

      <ol className="tl__roles">
        {roles.map((r) => (
          <li key={r.title + r.period}>
            <p className="mono tl__period">{r.period}</p>
            <div className="tl__role">
              <h3>{r.title}</h3>
              <p className="tl__org">{r.org}</p>
              {r.items && (
                <ul>
                  {r.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="tl__logo">
              {r.logo === 'destination' && <img src={logoDestination} alt="Logo Destination Rennes" width={186} height={47} loading="lazy" />}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
