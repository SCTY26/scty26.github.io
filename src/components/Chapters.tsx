import { useLayoutEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, reduceMotion } from '../lib/motion';
import { chapters } from '../data';

export default function Chapters() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.chap');
      items.forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: (self) => {
            if (self.isActive) setActive(i);
          },
        });
        if (reduceMotion) return;
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 78%', once: true } });
        tl.from(el.querySelector('.chap__line'), { scaleX: 0, transformOrigin: 'left', duration: 1.1, ease: 'power3.out' })
          .from(el.querySelector('.chap__num'), { opacity: 0, x: -30, duration: 0.9, ease: 'power3.out' }, 0.1)
          .from(el.querySelectorAll('.chap__title, .chap__meta, .chap__body'), { opacity: 0, y: 28, duration: 0.9, ease: 'power3.out', stagger: 0.1 }, 0.2);
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="chapters" id="missions" ref={root}>
      <header className="sec-head">
        <p className="mono label">01 / Missions</p>
        <h2 className="sec-title">Ce que je pilote,<br /><em>depuis octobre 2022.</em></h2>
        <p className="sec-sub">Chargée de mission RSE, SPL Destination Rennes.</p>
      </header>
      <div className="chapters__grid">
        <aside className="rail" aria-hidden="true">
          <ol>
            {chapters.map((c, i) => (
              <li key={c.n} className={i === active ? 'on' : ''}>
                <span className="mono">{c.n}</span>
                <span>{c.title}</span>
              </li>
            ))}
          </ol>
        </aside>
        <div className="chapters__list">
          {chapters.map((c) => (
            <article className="chap" key={c.n}>
              <div className="chap__line" />
              <p className="chap__num">{c.n}</p>
              <div className="chap__main">
                <h3 className="chap__title">{c.title}</h3>
                <p className="mono chap__meta">{c.meta}</p>
                <p className="chap__body">{c.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
