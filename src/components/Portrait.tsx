import { useLayoutEffect, useRef } from 'react';
import { gsap, reduceMotion } from '../lib/motion';
import { commitments, education, skills } from '../data';
import portrait from '../assets/portrait-data';
import logoRennes2 from '../assets/logos/rennes2.svg';
import logoUbe from '../assets/logos/ube.svg';

const logos = { rennes2: logoRennes2, ube: logoUbe };

export default function Portrait() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (reduceMotion || !root.current) return;
    const ctx = gsap.context(() => {
      gsap.set('.portrait__frame', { opacity: 0, clipPath: 'circle(0% at 50% 42%)', filter: 'blur(14px) grayscale(1)' });
      gsap
        .timeline({ scrollTrigger: { trigger: '.portrait__frame', start: 'top 80%', once: true } })
        .to('.portrait__frame', { opacity: 1, duration: 0.6 }, 0)
        .to('.portrait__frame', { clipPath: 'circle(80% at 50% 42%)', duration: 2.2, ease: 'power2.inOut' }, 0)
        .to('.portrait__frame', { filter: 'blur(0px) grayscale(0)', duration: 2.4, ease: 'sine.inOut' }, 0.1);
      gsap.fromTo(
        '.portrait__img',
        { scale: 1.12 },
        { scale: 1, ease: 'none', scrollTrigger: { trigger: '.portrait__frame', start: 'top 90%', end: 'bottom 40%', scrub: true } },
      );
      gsap.from('.skill', {
        opacity: 0,
        xPercent: -6,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: '.skills', start: 'top 80%', once: true },
      });
      gsap.from('.edu', {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '.edus', start: 'top 85%', once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="portrait" id="profil" ref={root}>
      <header className="sec-head">
        <p className="mono label">04 / Profil</p>
        <h2 className="sec-title">Compétences,<br /><em>formation, engagements.</em></h2>
      </header>
      <div className="portrait__grid">
        <figure className="portrait__fig">
          <div className="portrait__frame feather">
            <img className="portrait__img" src={portrait} alt="Portrait de Sophie-Charlotte Turquety" width={695} height={847} loading="lazy" />
          </div>
          <figcaption className="mono">Photo : Caroline Ablain / Destination Rennes</figcaption>
        </figure>

        <div className="portrait__col">
          <h3 className="mono label">Compétences</h3>
          <ul className="skills">
            {skills.map((s) => (
              <li className="skill" key={s}>{s}</li>
            ))}
          </ul>

          <h3 className="mono label">Formation universitaire</h3>
          <div className="edus">
            {education.map((e) => (
              <div className="edu" key={e.year}>
                <p className="edu__year">{e.year}</p>
                <div>
                  <p className="edu__title">{e.title}</p>
                  <p className="edu__school">{e.school}</p>
                </div>
                <img className={`edu__logo ${e.logo}`} src={logos[e.logo]} alt={e.logo === 'ube' ? 'Logo Université Bourgogne Europe' : 'Logo Université Rennes 2'} loading="lazy" />
              </div>
            ))}
          </div>
          <p className="mono edu__note">Logo Bourgogne : identité actuelle de l’établissement (Université Bourgogne Europe).</p>

          <h3 className="mono label">Loisirs et engagements</h3>
          <ul className="commit">
            {commitments.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
