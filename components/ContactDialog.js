'use client';

import { useEffect, useRef, useState } from 'react';
import { CONTACT } from '@/lib/contact';

const MAX_MESSAGE = 1000;

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
const cleanPhone = (v) => v.replace(/[\s\-().]/g, '');
const phoneOk = (v) => /^\+?[0-9]{7,15}$/.test(cleanPhone(v));
const oneLine = (v) => v.replace(/[\r\n]+/g, ' ').trim();

function validate(form, via) {
  const e = {};
  if (!via.email && !via.whatsapp) e.via = 'Choose at least one way to send.';
  if (via.email && !emailOk(form.email)) e.email = 'Enter a valid email address.';
  if (via.whatsapp && !phoneOk(form.phone)) e.phone = 'Enter your number with country code, e.g. +94 77 123 4567.';
  if (form.message.trim().length < 10) e.message = 'Please write at least 10 characters.';
  return e;
}

function compose(form, via) {
  const name = oneLine(form.name);
  const lines = [form.message.trim(), '', '—'];
  if (name) lines.push(name);
  // Only include contact details for channels the visitor actually chose.
  if (via.email) lines.push(`Email: ${form.email.trim()}`);
  if (via.whatsapp) lines.push(`WhatsApp: ${cleanPhone(form.phone)}`);
  return {
    subject: name ? `Portfolio enquiry from ${name}` : 'Portfolio enquiry',
    body: lines.join('\n'),
  };
}

export default function ContactDialog() {
  const dlg = useRef(null);
  const opener = useRef(null); // Safari doesn't focus clicked buttons, so we restore focus ourselves
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [via, setVia] = useState({ email: true, whatsapp: false });
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState('form'); // 'form' | 'send'
  const [opened, setOpened] = useState({});
  const [copied, setCopied] = useState(false);

  // Any element with data-open-contact opens the dialog.
  useEffect(() => {
    const onClick = (e) => {
      const t = e.target.closest?.('[data-open-contact]');
      if (!t) return;
      e.preventDefault();
      opener.current = t;
      setStep('form');
      setOpened({});
      setErrors({});
      dlg.current?.showModal();
      document.body.style.overflow = 'hidden';
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const close = () => dlg.current?.close();
  const onClosed = () => {
    document.body.style.overflow = '';
    opener.current?.focus?.();
  };

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }));
  };
  const toggle = (k) => (e) => {
    setVia((v) => ({ ...v, [k]: e.target.checked }));
    setErrors((x) => ({ ...x, via: undefined, [k === 'email' ? 'email' : 'phone']: undefined }));
  };

  const openEmail = () => {
    const { subject, body } = compose(form, via);
    const a = document.createElement('a');
    a.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    document.body.appendChild(a); // attached so Firefox honours the click
    a.click();
    a.remove();
    setOpened((o) => ({ ...o, email: true }));
  };
  const openWhatsApp = () => {
    const { body } = compose(form, via);
    window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(body)}`, '_blank', 'noopener,noreferrer');
    setOpened((o) => ({ ...o, whatsapp: true }));
  };
  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(compose(form, via).body);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = validate(form, via);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      dlg.current?.querySelector(`[name="${first}"]`)?.focus();
      return;
    }
    setStep('send');
    // One channel: open it straight away (still inside the click gesture).
    // Both: the visitor taps each button, since browsers block a second pop-up.
    if (via.email && !via.whatsapp) openEmail();
    if (via.whatsapp && !via.email) openWhatsApp();
  };

  const both = via.email && via.whatsapp;
  const label = both ? 'Email & WhatsApp' : via.whatsapp ? 'WhatsApp' : 'Email';

  return (
    <dialog
      ref={dlg}
      className="dialog"
      aria-labelledby="contact-dlg-title"
      onClose={onClosed}
      onClick={(e) => e.target === dlg.current && close()}
    >
      <div className="dialog-inner">
        <button type="button" className="dialog-x" onClick={close} aria-label="Close contact form">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>

        {step === 'form' ? (
          <form onSubmit={submit} noValidate>
            <p className="sec-label"><span>✉</span> Contact me</p>
            <h2 id="contact-dlg-title">Say <em>hello</em>.</h2>
            <p className="dlg-sub">Pick how you&apos;d like to reach me. I&apos;ll reply on the same channel.</p>

            <fieldset className="via">
              <legend>Send via</legend>
              <div className="via-row">
                <label className="opt">
                  <input type="checkbox" checked={via.email} onChange={toggle('email')} name="via" />
                  <span>Email</span>
                </label>
                <label className="opt">
                  <input type="checkbox" checked={via.whatsapp} onChange={toggle('whatsapp')} />
                  <span>WhatsApp</span>
                </label>
              </div>
              {errors.via && <p className="err" role="alert">{errors.via}</p>}
            </fieldset>

            <div className="field">
              <label htmlFor="cf-name">Your name <i>(optional)</i></label>
              <input id="cf-name" name="name" value={form.name} onChange={set('name')} autoComplete="name" maxLength={80} />
            </div>

            {via.email && (
              <div className="field pop">
                <label htmlFor="cf-email">Your email</label>
                <input id="cf-email" name="email" type="email" inputMode="email" autoComplete="email" placeholder="you@company.com" value={form.email} onChange={set('email')} maxLength={120} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'cf-email-err' : undefined} />
                {errors.email && <p className="err" id="cf-email-err" role="alert">{errors.email}</p>}
              </div>
            )}

            {via.whatsapp && (
              <div className="field pop">
                <label htmlFor="cf-phone">Your WhatsApp number</label>
                <input id="cf-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+94 77 123 4567" value={form.phone} onChange={set('phone')} maxLength={24} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'cf-phone-err' : undefined} />
                {errors.phone && <p className="err" id="cf-phone-err" role="alert">{errors.phone}</p>}
              </div>
            )}

            <div className="field">
              <label htmlFor="cf-msg">Message</label>
              <textarea id="cf-msg" name="message" rows={5} value={form.message} onChange={set('message')} maxLength={MAX_MESSAGE} placeholder="Tell me about your project or role…" aria-invalid={!!errors.message} aria-describedby="cf-msg-meta" />
              <div className="field-meta" id="cf-msg-meta">
                {errors.message ? <span className="err" role="alert">{errors.message}</span> : <span />}
                <span>{form.message.length}/{MAX_MESSAGE}</span>
              </div>
            </div>

            <button type="submit" className="btn btn-solid dlg-submit">
              Send via {label}
            </button>
            <p className="privacy">
              Nothing is stored on this site. Your message opens in your own {both ? 'email app and WhatsApp' : via.whatsapp ? 'WhatsApp' : 'email app'}, and you press send there.
            </p>
          </form>
        ) : (
          <div className="sent" aria-live="polite">
            <p className="sec-label"><span>✓</span> Almost there</p>
            <h2 id="contact-dlg-title">Ready to <em>send</em>.</h2>
            <p className="dlg-sub">
              {both
                ? 'Tap each button to open your message. Press send in each app to deliver it.'
                : 'Your message should have opened. Press send there to deliver it.'}
            </p>

            <div className="send-list">
              {via.email && (
                <button type="button" className={`send-btn ${opened.email ? 'done' : ''}`} onClick={openEmail}>
                  <span>{opened.email ? '✓' : '✉'}</span> {opened.email ? 'Open email app again' : 'Open email app'}
                </button>
              )}
              {via.whatsapp && (
                <button type="button" className={`send-btn ${opened.whatsapp ? 'done' : ''}`} onClick={openWhatsApp}>
                  <span>{opened.whatsapp ? '✓' : '☎'}</span> {opened.whatsapp ? 'Open WhatsApp again' : 'Open WhatsApp'}
                </button>
              )}
            </div>

            <div className="sent-actions">
              <button type="button" className="btn btn-ghost" onClick={copyMessage}>{copied ? 'Copied ✓' : 'Copy message'}</button>
              <button type="button" className="btn btn-ghost" onClick={() => setStep('form')}>Edit</button>
              <button type="button" className="btn btn-solid" onClick={close}>Done</button>
            </div>
            <p className="privacy">Nothing opened? Copy the message and send it to {CONTACT.email}.</p>
          </div>
        )}
      </div>
    </dialog>
  );
}
