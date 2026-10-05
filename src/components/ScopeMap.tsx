import { useLayoutEffect, useMemo, useRef } from 'react';
import { cluster, hierarchy } from 'd3-hierarchy';
import { linkHorizontal } from 'd3-shape';
import { gsap, reduceMotion } from '../lib/motion';
import { scope, type TreeNode } from '../data';

const W = 1000;
const H = 600;

export default function ScopeMap() {
  const root = useRef<HTMLElement>(null);

  const { nodes, links } = useMemo(() => {
    const h = hierarchy<TreeNode>(scope);
    const laid = cluster<TreeNode>().size([H - 60, W - 330])(h);
    const link = linkHorizontal<unknown, { x: number; y: number }>()
      .x((d) => d.y + 40)
      .y((d) => d.x + 30);
    return {
      nodes: laid.descendants(),
      links: laid.links().map((l) => link({ source: l.source, target: l.target }) ?? ''),
    };
  }, []);

  useLayoutEffect(() => {
    if (reduceMotion || !root.current) return;
    const ctx = gsap.context(() => {
      const st = { trigger: root.current, start: 'top 60%', once: true };
      gsap.from('.scope__link', { strokeDashoffset: 1, duration: 1.4, ease: 'power2.out', stagger: 0.04, scrollTrigger: st });
      gsap.from('.scope__node', { opacity: 0, duration: 0.6, stagger: 0.05, delay: 0.3, scrollTrigger: st });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="scope" id="perimetre" ref={root}>
      <header className="sec-head">
        <p className="mono label">02 / Périmètre</p>
        <h2 className="sec-title">Une mission,<br /><em>cinq chantiers.</em></h2>
        <p className="sec-sub">Hiérarchie construite à partir des missions décrites dans le CV. Aucune donnée chiffrée.</p>
      </header>
      <div className="scope__wrap">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Arbre : la mission RSE se décline en cinq chantiers et leurs actions">
          <g fill="none" stroke="currentColor" strokeWidth="1">
            {links.map((d, i) => (
              <path className="scope__link" key={i} d={d} pathLength={1} strokeDasharray={1} />
            ))}
          </g>
          {nodes.map((n, i) => {
            const x = n.y + 40;
            const y = n.x + 30;
            const leaf = !n.children;
            return (
              <g className={`scope__node d${n.depth}`} key={i} transform={`translate(${x},${y})`}>
                <circle r={n.depth === 0 ? 7 : leaf ? 3 : 5} />
                <text
                  x={leaf ? 14 : 0}
                  y={leaf ? 4 : -14}
                  textAnchor={n.depth === 0 ? 'start' : 'start'}
                >
                  {n.data.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </section>
  );
}
