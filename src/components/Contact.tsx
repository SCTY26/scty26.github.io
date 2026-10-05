import { useLayoutEffect, useRef } from 'react';
import { gsap, reduceMotion, scrollToId } from '../lib/motion';
import { person } from '../data';

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    if (reduceMotion || !root.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.contact__mail', { yPercent: 40, opacity: 0, duration: 1.2, ease: 'power4.out', scrollTrigger: { trigger: root.current, start: 'top 70%', once: true } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <footer className="contact" id="contact" ref={root}>
      <div className="aurora" aria-hidden="true"><i /><i /></div>
      <p className="mono label">05 / Contact</p>
      <a className="contact__mail" href={`mailto:${person.email}`}>{person.email}</a>
      <div className="contact__row">
        <p>{person.city}</p>
        <button type="button" className="linklike" onClick={() => scrollToId('top')}>Retour en haut ↑</button>
      </div>
      <p className="mono contact__credits">
        Photo : Caroline Ablain / Destination Rennes. Logos : © Destination Rennes, Université Rennes 2, Université Bourgogne Europe, repris de leurs sites officiels. Contenu : CV de Sophie-Charlotte Turquety.
      </p>
    </footer>
  );
}
