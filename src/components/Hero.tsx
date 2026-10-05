import { useLayoutEffect, useMemo, useRef } from 'react';
import { gsap, reduceMotion } from '../lib/motion';
import { person } from '../data';
import { Chars } from '../lib/split';
import { contourPaths } from '../lib/contours';
import portrait from '../assets/portrait-data';

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const art = useRef<SVGSVGElement>(null);
  const rings = useMemo(() => contourPaths({ count: 26, base: 30, step: 24, cx: 500, cy: 400, sx: 1.2, sy: 0.95 }), []);
  const faceRings = useMemo(() => contourPaths({ count: 15, base: 40, step: 36, cx: 500, cy: 500, sx: 1, sy: 1.05 }), []);

  useLayoutEffect(() => {
    if (reduceMotion || !root.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.hero__name .c', { yPercent: 110, duration: 1.3, ease: 'power4.out', stagger: 0.035, delay: 0.15 });
      gsap.from('.hero__fade:not(figcaption)', { opacity: 0, y: 14, duration: 1, ease: 'power2.out', stagger: 0.12, delay: 0.7 });
      // Portrait : « développement » 1 s après l'arrivée sur la page.
      gsap.set('.hero__frame', { '--k': 0.05, opacity: 0, filter: 'blur(22px) grayscale(1) brightness(0.5)' });
      gsap.set('.hero__glow', { opacity: 0 });
      gsap.set('.hero__photo figcaption', { opacity: 0 });
      gsap.set('.hero__face-ring', { strokeDasharray: 3000, strokeDashoffset: 3000 });
      const dev = gsap.timeline({ delay: 1 });
      dev
        .to('.hero__frame', { opacity: 1, duration: 0.8, ease: 'power1.out' }, 0)
        .to('.hero__frame', { '--k': 1, duration: 3, ease: 'power2.inOut' }, 0)
        .to('.hero__frame', { filter: 'blur(0px) grayscale(0) brightness(1)', duration: 3.4, ease: 'sine.inOut' }, 0.2)
        .to('.hero__glow', { opacity: 1, duration: 2.6, ease: 'power1.out' }, 0)
        .to('.hero__face-ring', { strokeDashoffset: 0, duration: 3, ease: 'power2.out', stagger: 0.08 }, 0.6)
        .to('.hero__photo figcaption', { opacity: 1, duration: 1 }, 2.4);
      gsap.from('.hero__ring', { strokeDashoffset: 2400, strokeDasharray: 2400, duration: 3.2, ease: 'power2.out', stagger: 0.05 });
      gsap.to(art.current, {
        rotate: 38, scale: 1.45, opacity: 0.05, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('.hero__inner', {
        yPercent: -10, opacity: 0.1, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="top" ref={root}>
      <div className="aurora" aria-hidden="true"><i /><i /><i /></div>
      <svg className="hero__art" ref={art} viewBox="0 0 1000 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
        <g fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke">
          {rings.map((d, i) => (
            <path className="hero__ring" key={i} d={d} />
          ))}
        </g>
      </svg>
      <div className="hero__inner">
        <div className="hero__text">
          <p className="hero__kicker hero__fade">Rennes</p>
          <h1 className="hero__name">
            <span className="clip"><Chars text={person.first} /></span>
            <span className="clip"><em><Chars text={person.last} /></em></span>
          </h1>
          <p className="hero__role hero__fade">{person.role}</p>
          <p className="hero__lede hero__fade">Qualité, carbone, certifications, indicateurs ESG. Une destination touristique à faire évoluer, avec ses équipes.</p>
          <p className="hero__scroll hero__fade">Défiler ↓</p>
        </div>
        <figure className="hero__photo">
          <div className="hero__glow" aria-hidden="true" />
          <div className="hero__frame feather">
            <img className="hero__img" src={portrait} alt="Portrait de Sophie-Charlotte Turquety" width={695} height={847} />
            <svg className="hero__rings" viewBox="0 0 1000 1219" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid slice">
              <g fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke">
                {faceRings.map((d, i) => (
                  <path className="hero__face-ring" key={i} d={d} />
                ))}
              </g>
            </svg>
          </div>
          <figcaption>Photo : Caroline Ablain / Destination Rennes</figcaption>
        </figure>
      </div>
    </section>
  );
}
