'use client';

import { useState } from 'react';

export default function Skills({ categories }) {
  const [active, setActive] = useState(0);
  const cat = categories[active];

  return (
    <div className="skills">
      <div className="skill-tabs" role="tablist" aria-label="Skill categories">
        {categories.map((c, i) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            id={`tab-${c.id}`}
            aria-selected={i === active}
            aria-controls="skill-panel"
            className={i === active ? 'on' : ''}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
              e.preventDefault();
              const dir = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : -1;
              const next = (i + dir + categories.length) % categories.length;
              setActive(next);
              document.getElementById(`tab-${categories[next].id}`)?.focus();
            }}
            tabIndex={i === active ? 0 : -1}
          >
            <span>{String(i + 1).padStart(2, '0')}</span>
            {c.title}
          </button>
        ))}
      </div>

      <div className="skill-panel" id="skill-panel" role="tabpanel" aria-labelledby={`tab-${cat.id}`} key={cat.id}>
        <h3>{cat.title}</h3>
        <ul>
          {cat.badges.map((b, i) => (
            <li key={b} style={{ '--i': i }}>{b}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
