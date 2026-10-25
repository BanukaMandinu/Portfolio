'use client';

import { useEffect, useRef } from 'react';

const TESTS = [
  'homepage renders correctly',
  'accessibility audit passes',
  'API contract validated',
  'checkout flow, no regressions',
];

function Words({ text, base = 0 }) {
  return text.split(' ').map((w, i) => (
    <span className="mask" key={w + i}>
      <span className="word" style={{ '--w': base + i }}>{w}</span>{' '}
    </span>
  ));
}

export default function Hero() {
  const root = useRef(null);

  // Pointer parallax: writes two CSS variables, all motion lives in CSS.
  useEffect(() => {
    const el = root.current;
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--px', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
      el.style.setProperty('--py', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    };
    el.addEventListener('pointermove', move);
    return () => el.removeEventListener('pointermove', move);
  }, []);

  return (
    <section className="hero" id="top" ref={root} aria-label="Introduction">
      <div className="hero-grid container">
        <div className="hero-copy">
          <p className="eyebrow fade" style={{ '--w': 0 }}>
            <span className="pulse" /> Associate QA Engineer · Software Engineering graduate
          </p>

          <h1 className="hero-title">
            <Words text="Banuka" base={1} />
            <br />
            <span className="mask">
              <span className="word serif" style={{ '--w': 2 }}>Nanayakkara</span>
            </span>
          </h1>

          <p className="hero-lede fade" style={{ '--w': 4 }}>
            I break software so users never have to. Two years of test automation, now building
            AI that sees, and tools that make testing faster.
          </p>

          <div className="hero-cta fade" style={{ '--w': 5 }}>
            <a href="#work" className="btn btn-solid" data-magnetic>
              See my work
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5v14M6 13l6 6 6-6" /></svg>
            </a>
            <a href="/assets/Banuka_Nanayakkara_CV.pdf" className="btn btn-ghost" download data-magnetic>
              Download CV
            </a>
          </div>
        </div>

        <div className="hero-visual fade" style={{ '--w': 3 }}>
          <div className="photo-wrap">
            <div className="photo">
              <img
                src="/assets/hero.webp"
                alt="Portrait of Banuka Nanayakkara in a black blazer and light blue shirt, standing in a bright corridor"
                width={900}
                height={1225}
                fetchPriority="high"
              />
            </div>

            <svg className="badge" viewBox="0 0 200 200" aria-hidden="true">
              <defs>
                <path id="circ" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
              </defs>
              <text>
                <textPath href="#circ">QA · AUTOMATION · AI · VISION · QA · AUTOMATION · AI · VISION ·</textPath>
              </text>
              <circle cx="100" cy="100" r="6" />
            </svg>

            <div className="chip chip-a" aria-hidden="true">Playwright</div>
            <div className="chip chip-b" aria-hidden="true">Test Automation</div>

            <div className="runner" aria-hidden="true">
              <div className="runner-head"><span /><span /><span /> npx playwright test</div>
              <ul>
                {TESTS.map((t, i) => (
                  <li key={t} style={{ '--n': i }}>
                    <b>✓</b> {t}
                  </li>
                ))}
              </ul>
              <div className="runner-foot">4 passed</div>
            </div>
          </div>
        </div>
      </div>

      <a href="#about" className="scroll-cue" aria-label="Scroll to About">
        <span />
      </a>
    </section>
  );
}
