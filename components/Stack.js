'use client';

import { useEffect, useRef } from 'react';

const GAP = 16; // px kept below a card that is taller than the viewport

// Sticky stack for the experience/education cards. A card taller than the
// viewport (common on phones) would be cut off while stuck, so its sticky
// `top` is capped by --fit (negative) and it sticks once its bottom edge is on screen.
export default function Stack({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const jobs = [...root.children];

    const update = () => {
      const vh = document.documentElement.clientHeight;
      jobs.forEach((job) => {
        job.style.setProperty('--fit', `${vh - job.offsetHeight - GAP}px`);
      });
    };

    update();
    const ro = new ResizeObserver(update);
    jobs.forEach((j) => ro.observe(j));
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div className="stack" ref={ref}>
      {children}
    </div>
  );
}
