'use client';

import { useState } from 'react';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'qa', label: 'QA' },
  { id: 'ai', label: 'AI / ML' },
  { id: 'java', label: 'Java' },
  { id: 'web', label: 'Web' },
  { id: 'python', label: 'Python' },
];

export default function Work({ projects }) {
  const [filter, setFilter] = useState('all');
  const shown = projects
    .map((p, i) => ({ ...p, n: i + 1 }))
    .filter((p) => filter === 'all' || p.category === filter);

  return (
    <>
      <div className="filters" role="group" aria-label="Filter projects">
        {FILTERS.filter((f) => f.id === 'all' || projects.some((p) => p.category === f.id)).map((f) => (
          <button
            key={f.id}
            type="button"
            className={filter === f.id ? 'on' : ''}
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
            <sup>{f.id === 'all' ? projects.length : projects.filter((p) => p.category === f.id).length}</sup>
          </button>
        ))}
      </div>

      <ul className="index">
        {shown.map((p, i) => (
          <li key={p.id} style={{ '--i': i }}>
            <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" aria-label={p.repoLabel} data-hover>
              <span className="idx-n">{String(p.n).padStart(2, '0')}</span>
              <span className="idx-main">
                <h3>{p.title}</h3>
                <span className="idx-tags">
                  {p.tags.map((t) => (
                    <em key={t}>{t}</em>
                  ))}
                </span>
              </span>
              <p className="idx-desc">{p.description}</p>
              <span className="idx-go" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M8 7h9v9" /></svg>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
