import { MailIcon, CopyIcon, CheckIcon } from '@/components/icons';

export default function Contact() {
  return (
    <section className="section" id="contact" aria-label="Contact information">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">./contact.sh --reach-out</span>
          <h2 className="section-title">Let&apos;s Connect</h2>
          <p className="section-subtitle">Interested in collaborating on AI/ML projects, QA automation, or software engineering? Reach out anytime!</p>
        </div>

        <div className="contact-content reveal">
          <span className="contact-status">
            <span className="contact-status-dot" />
            Open to new opportunities
          </span>

          <div className="contact-email-group">
            <a href="mailto:banukananayak@gmail.com" className="contact-email-btn glass-card" id="contact-email" aria-label="Send email to Banuka Nanayakkara">
              <MailIcon width="22" height="22" />
              <span>banukananayak@gmail.com</span>
            </a>
            <button type="button" className="copy-email-btn glass-card" id="copy-email-btn" aria-label="Copy email address to clipboard">
              <CopyIcon className="icon-copy" width="18" height="18" />
              <CheckIcon className="icon-check" width="18" height="18" />
              <span className="copy-email-tooltip" aria-hidden="true">Copy email</span>
            </button>
            <span className="visually-hidden" id="copy-email-status" role="status" aria-live="polite" />
          </div>

          <div className="contact-divider" aria-hidden="true">
            <span>or connect via</span>
          </div>

          <div className="contact-socials">
            <a href="https://wa.me/94766221125" className="social-link social-whatsapp glass-card" aria-label="Chat on WhatsApp" target="_blank" rel="noopener noreferrer" id="social-whatsapp">
              <svg viewBox="0 0 32 32" width="30" height="30" fill="none" aria-hidden="true">
                <path d="M16 2.5C8.544 2.5 2.5 8.544 2.5 16c0 2.628.752 5.093 2.056 7.185L2.8 29.2l6.236-1.636A13.435 13.435 0 0016 29.5c7.456 0 13.5-6.044 13.5-13.5S23.456 2.5 16 2.5z" fill="#25D366" />
                <path d="M22.5 19.3c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.35.23-.65.08-.3-.15-1.27-.47-2.42-1.5-.89-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.61.14-.13.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.08-.15-.68-1.63-.93-2.23-.24-.59-.49-.51-.68-.52h-.58c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.51s1.08 2.91 1.23 3.11c.15.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.71.63.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.13-.28-.2-.58-.35z" fill="#ffffff" />
              </svg>
            </a>

            <a href="https://github.com/BanukaMandinu" className="social-link social-github glass-card" aria-label="GitHub Profile" target="_blank" rel="noopener noreferrer" id="social-github">
              <svg viewBox="0 0 32 32" width="30" height="30" fill="none" aria-hidden="true">
                <rect width="32" height="32" rx="16" fill="#24292e" />
                <path fillRule="evenodd" clipRule="evenodd" d="M16 6C10.477 6 6 10.477 6 16c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V25c0 .27.16.59.67.5C23.14 24.16 26 20.42 26 16c0-5.523-4.477-10-10-10z" fill="#ffffff" />
              </svg>
            </a>

            <a href="https://www.linkedin.com/in/banuka-nanayakkara/" className="social-link social-linkedin glass-card" aria-label="LinkedIn Profile" target="_blank" rel="noopener noreferrer" id="social-linkedin">
              <svg viewBox="0 0 32 32" width="30" height="30" fill="none" aria-hidden="true">
                <rect width="32" height="32" rx="7" fill="#0A66C2" />
                <path d="M9 13h3.5v11H9V13zm1.75-5.5a2 2 0 110 4 2 2 0 010-4zM15 13h3.3v1.6h.05c.46-.87 1.6-1.8 3.3-1.8 3.5 0 4.15 2.3 4.15 5.3V24h-3.5v-5.2c0-1.24-.02-2.84-1.73-2.84-1.73 0-2 1.35-2 2.75V24H15V13z" fill="#ffffff" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
