import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap, scrollToId, reduceMotion } from '../lib/motion';

const links = [
  ['missions', 'Missions'],
  ['perimetre', 'Périmètre'],
  ['parcours', 'Parcours'],
  ['profil', 'Profil'],
  ['contact', 'Contact'],
] as const;

export default function Nav() {
  const bar = useRef<HTMLDivElement>(null);
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useLayoutEffect(() => {
    if (reduceMotion || !bar.current) return;
    const ctx = gsap.context(() => {
      gsap.to(bar.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.2 },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <header className={`nav${solid ? ' solid' : ''}`}>
      <a
        className="nav__brand"
        href="#top"
        onClick={(e) => {
          e.preventDefault();
          scrollToId('top');
        }}
      >
        Sophie-Charlotte Turquety
      </a>
      <nav aria-label="Navigation principale">
        {links.map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault();
              scrollToId(id);
            }}
          >
            {label}
          </a>
        ))}
      </nav>
      <div className="nav__progress" ref={bar} aria-hidden="true" />
    </header>
  );
}
