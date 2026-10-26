'use client';

import { useEffect, useRef, useState } from 'react';
import { CONTACT } from '@/lib/contact';

const MAX_MESSAGE = 1000;

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
const oneLine = (v) => v.replace(/[\r\n]+/g, ' ').trim();

function validate(form) {
  const e = {};
  if (!emailOk(form.email)) e.email = 'Enter a valid email address.';
  if (form.message.trim().length < 10) e.message = 'Please write at least 10 characters.';
  return e;
}

// Posts to Web3Forms, which emails the message to the inbox the access key was created for.
async function sendMessage(form) {
  const name = oneLine(form.name);
  const res = await fetch(CONTACT.endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: CONTACT.accessKey,
      subject: name ? `Portfolio enquiry from ${name}` : 'Portfolio enquiry',
      from_name: name || 'Portfolio visitor',
      email: form.email.trim(), // used as reply-to
      message: form.message.trim(),
      botcheck: form.botcheck, // honeypot, must stay empty
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.success) throw new Error(data.message || 'Request failed');
}

export default function ContactDialog() {
  const dlg = useRef(null);
  const opener = useRef(null); // Safari doesn't focus clicked buttons, so we restore focus ourselves
  const [form, setForm] = useState({ name: '', email: '', message: '', botcheck: '' });
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState('form'); // 'form' | 'sent'
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);

  // Any element with data-open-contact opens the dialog.
  useEffect(() => {
    const onClick = (e) => {
      const t = e.target.closest?.('[data-open-contact]');
      if (!t) return;
      e.preventDefault();
      opener.current = t;
      setStep('form');
      setErrors({});
      setFailed(false);
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

  const submit = async (e) => {
    e.preventDefault();
    if (sending) return;
    const errs = validate(form);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      dlg.current?.querySelector(`[name="${first}"]`)?.focus();
      return;
    }
    setSending(true);
    setFailed(false);
    try {
      await sendMessage(form);
      setForm({ name: '', email: '', message: '', botcheck: '' });
      setStep('sent');
    } catch {
      setFailed(true);
    } finally {
      setSending(false);
    }
  };

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
            <p className="dlg-sub">Send me a message and I&apos;ll reply to your email.</p>

            <div className="field">
              <label htmlFor="cf-name">Your name <i>(optional)</i></label>
              <input id="cf-name" name="name" value={form.name} onChange={set('name')} autoComplete="name" maxLength={80} />
            </div>

            <div className="field">
              <label htmlFor="cf-email">Your email</label>
              <input id="cf-email" name="email" type="email" inputMode="email" autoComplete="email" placeholder="you@company.com" value={form.email} onChange={set('email')} maxLength={120} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'cf-email-err' : undefined} />
              {errors.email && <p className="err" id="cf-email-err" role="alert">{errors.email}</p>}
            </div>

            <div className="field">
              <label htmlFor="cf-msg">Message</label>
              <textarea id="cf-msg" name="message" rows={5} value={form.message} onChange={set('message')} maxLength={MAX_MESSAGE} placeholder="Tell me about your project or role…" aria-invalid={!!errors.message} aria-describedby="cf-msg-meta" />
              <div className="field-meta" id="cf-msg-meta">
                {errors.message ? <span className="err" role="alert">{errors.message}</span> : <span />}
                <span>{form.message.length}/{MAX_MESSAGE}</span>
              </div>
            </div>

            {/* Honeypot: hidden from people, bots fill it in. */}
            <input type="checkbox" name="botcheck" className="visually-hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" checked={!!form.botcheck} onChange={(e) => setForm((f) => ({ ...f, botcheck: e.target.checked ? 'on' : '' }))} />

            <button type="submit" className="btn btn-solid dlg-submit" disabled={sending}>
              {sending ? 'Sending…' : 'Send message'}
            </button>
            {failed && (
              <p className="err dlg-fail" role="alert">
                Couldn&apos;t send your message. Please try again, or email {CONTACT.email} directly.
              </p>
            )}
            <p className="privacy">
              Your name, email and message are sent to me by email through Web3Forms and used only to reply to you.
            </p>
          </form>
        ) : (
          <div className="sent" aria-live="polite">
            <p className="sec-label"><span>✓</span> Sent</p>
            <h2 id="contact-dlg-title">Thank <em>you</em>.</h2>
            <p className="dlg-sub">Your message is on its way. I&apos;ll reply to your email soon.</p>
            <div className="sent-actions">
              <button type="button" className="btn btn-solid" onClick={close}>Done</button>
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
}
