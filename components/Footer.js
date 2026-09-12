import { ArrowUpIcon } from '@/components/icons';

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-meta">
          <p className="footer-text">&copy; 2026 Banuka Nanayakkara. Built with care &amp; precision.</p>
          <span className="footer-build" aria-hidden="true">
            <span className="footer-build-dot" />
            Build passing
          </span>
        </div>
        <button className="back-to-top glass-card" id="back-to-top" aria-label="Scroll back to top">
          <ArrowUpIcon />
        </button>
      </div>
    </footer>
  );
}
