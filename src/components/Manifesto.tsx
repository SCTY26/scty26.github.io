import { useLayoutEffect, useRef } from 'react';
import { gsap, reduceMotion } from '../lib/motion';
import { manifesto } from '../data';
import { Words } from '../lib/split';

export default function Manifesto() {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    if (reduceMotion || !root.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.manifesto .w',
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.6,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top 20%', end: 'bottom 85%', scrub: true },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="manifesto" id="manifeste" ref={root}>
      <div className="manifesto__sticky">
        <p className="mono label">00 / Intention</p>
        <p className="manifesto__text">
          <Words text={manifesto} />
        </p>
      </div>
    </section>
  );
}
