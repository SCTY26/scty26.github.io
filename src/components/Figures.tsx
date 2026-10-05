import { useLayoutEffect, useRef } from 'react';
import { gsap, reduceMotion } from '../lib/motion';
import { figures } from '../data';

export default function Figures() {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    if (reduceMotion || !root.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.fig').forEach((el, i) => {
        const target = figures[i].value;
        const out = el.querySelector<HTMLElement>('.fig__n');
        const state = { v: 0 };
        if (out) out.textContent = '0';
        gsap.to(state, {
          v: target,
          duration: 1.6,
          ease: 'power3.out',
          snap: { v: 1 },
          onUpdate: () => {
            if (out) out.textContent = String(state.v);
          },
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });
        gsap.from(el.querySelector('.fig__rule'), {
          scaleX: 0,
          transformOrigin: 'left',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="figures" ref={root} aria-label="Repères">
      {figures.map((f) => (
        <div className="fig" key={f.label}>
          <div className="fig__rule" />
          <p className="fig__big">
            <span className="fig__n">{f.value}</span>
            <span className="fig__s">{f.suffix}</span>
          </p>
          <p className="fig__label">{f.label}</p>
          <p className="mono fig__note">{f.note}</p>
        </div>
      ))}
    </section>
  );
}
