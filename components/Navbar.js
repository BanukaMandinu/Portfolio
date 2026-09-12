import { DownloadIcon, PhosphorIcon } from '@/components/icons';

const NAV_LINKS = [
  { section: 'hero', label: 'home' },
  { section: 'about', label: 'about' },
  { section: 'skills', label: 'skills' },
  { section: 'experience', label: 'experience' },
  { section: 'projects', label: 'projects' },
  { section: 'education', label: 'education' },
  { section: 'contact', label: 'contact' },
];

export default function Navbar() {
  return (
    <header className="navbar" role="banner">
      <div className="container">
        <a href="#hero" className="nav-logo" aria-label="Banuka Nanayakkara — Home">
          <span className="nav-logo-prompt">guest@banuka</span>
          <span className="nav-logo-sep">:~$</span>
        </a>

        <div className="nav-right">
          <button className="phosphor-toggle" id="phosphor-toggle" type="button" aria-label="Switch phosphor color (white / green)">
            <PhosphorIcon width="16" height="16" aria-hidden="true" />
          </button>

          <button className="nav-toggle" id="nav-toggle" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="nav-links">
            <span />
            <span />
            <span />
          </button>

          <nav className="nav-links" id="nav-links" role="navigation" aria-label="Main navigation">
            {NAV_LINKS.map(({ section, label }) => (
              <a
                key={section}
                href={`#${section}`}
                className={`nav-link${section === 'hero' ? ' active' : ''}`}
                data-section={section}
              >
                {label}
              </a>
            ))}
            <a href="/assets/Banuka_Nanayakkara_CV.pdf" className="btn btn-primary btn-nav-cv" download aria-label="Download CV">
              <DownloadIcon width="14" height="14" />
              get_cv
            </a>
          </nav>
        </div>
      </div>
      <div className="nav-overlay" id="nav-overlay" />
    </header>
  );
}
