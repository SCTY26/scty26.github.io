import { useEffect } from 'react';
import { initScroll, ScrollTrigger } from './lib/motion';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import Figures from './components/Figures';
import Chapters from './components/Chapters';
import ScopeMap from './components/ScopeMap';
import Timeline from './components/Timeline';
import Portrait from './components/Portrait';
import Contact from './components/Contact';

export default function App() {
  useEffect(() => {
    const stop = initScroll();
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    if ('fonts' in document) void document.fonts.ready.then(refresh);
    return () => {
      window.removeEventListener('load', refresh);
      stop();
    };
  }, []);

  return (
    <>
      <a className="skip" href="#manifeste">Aller au contenu</a>
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <Figures />
        <Chapters />
        <ScopeMap />
        <Timeline />
        <Portrait />
      </main>
      <Contact />
    </>
  );
}
