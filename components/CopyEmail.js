'use client';

import { useState } from 'react';

export default function CopyEmail({ email }) {
  const [done, setDone] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setDone(true);
      setTimeout(() => setDone(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button type="button" className="btn btn-ghost" onClick={copy} data-magnetic>
      {done ? 'Copied ✓' : 'Copy email'}
      <span className="visually-hidden" role="status" aria-live="polite">{done ? 'Email copied to clipboard' : ''}</span>
    </button>
  );
}
