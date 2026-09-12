import { GridIcon, MailIcon, DownloadIcon, ChevronDownIcon } from '@/components/icons';

export default function Hero() {
  return (
    <section className="hero section" id="hero" aria-label="Introduction">
      <div className="hero-bg" aria-hidden="true" />

      <div className="container hero-split">
        <div className="hero-content">
          <span className="hero-greeting animate-in">$ whoami</span>
          <h1 className="hero-title animate-in animate-delay-1">
            Banuka <span className="highlight">Nanayakkara</span>
          </h1>
          <p className="hero-description animate-in animate-delay-2">
            Associate QA Engineer &amp; Software Engineering Undergraduate with over 2 years of industry experience. Passionate about Test Automation, Machine Learning, Computer Vision, and crafting robust software.
          </p>
          <div className="hero-cta animate-in animate-delay-3">
            <a href="#projects" className="btn btn-primary">
              <GridIcon width="16" height="16" />
              View Projects
            </a>
            <a href="#contact" className="btn btn-secondary">
              <MailIcon width="16" height="16" />
              Get in Touch
            </a>
            <a href="/assets/Banuka_Nanayakkara_CV.pdf" className="btn btn-secondary" download>
              <DownloadIcon width="16" height="16" />
              Download CV
            </a>
          </div>
        </div>

        <div className="hero-image-wrapper animate-in animate-delay-4">
          <div className="hero-image-card">
            <span className="hero-image-corner hero-image-corner-tl" aria-hidden="true" />
            <span className="hero-image-corner hero-image-corner-tr" aria-hidden="true" />
            <span className="hero-image-corner hero-image-corner-bl" aria-hidden="true" />
            <span className="hero-image-corner hero-image-corner-br" aria-hidden="true" />
            <img
              src="/assets/profile.webp"
              alt="Banuka Nanayakkara - Software Engineer"
              className="hero-profile-image"
              width={640}
              height={640}
              fetchPriority="high"
            />
            <span className="hero-image-tag" aria-hidden="true">profile.jpg · 640×640 · RGB</span>
          </div>

          <div className="hero-terminal glass-card animate-in animate-delay-5" aria-hidden="true">
            <div className="hero-terminal-bar">
              <span className="term-dot term-dot-red" />
              <span className="term-dot term-dot-yellow" />
              <span className="term-dot term-dot-green" />
              <span className="hero-terminal-title">qa-suite.spec.ts</span>
            </div>
            <div className="hero-terminal-body">
              <p className="term-line term-cmd"><span className="term-prompt">$</span> npx playwright test --grep @regression</p>
              <p className="term-line term-pass">✓ homepage renders correctly <span className="term-time">128ms</span></p>
              <p className="term-line term-pass">✓ accessibility audit passes <span className="term-time">341ms</span></p>
              <p className="term-line term-pass">✓ API contract validated <span className="term-time">94ms</span></p>
              <p className="term-line term-summary">3 passed <span className="term-cursor" /></p>
            </div>
          </div>
        </div>
      </div>

      <a href="#about" className="hero-scroll-indicator" id="hero-scroll-indicator" aria-label="Scroll down to About section">
        <span>Scroll</span>
        <ChevronDownIcon />
      </a>
    </section>
  );
}
