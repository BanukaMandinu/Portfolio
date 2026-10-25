'use client';

import { useEffect, useRef } from 'react';

// Soft cursor follower and magnetic pull for [data-magnetic] elements. Mouse devices only.
export default function Cursor() {
  const ref = useRef(null);

  useEffect(() => {
    const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
    const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || calm) return;

    const dot = ref.current;
    document.documentElement.classList.add('has-cursor');
    let x = -100, y = -100, cx = -100, cy = -100, raf;

    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
      dot.classList.add('on');
      const t = e.target.closest?.('a, button, [data-hover]');
      dot.classList.toggle('big', !!t);

      const mag = e.target.closest?.('[data-magnetic]');
      document.querySelectorAll('[data-magnetic].pulled').forEach((el) => {
        if (el !== mag) {
          el.style.transform = '';
          el.classList.remove('pulled');
        }
      });
      if (mag) {
        const r = mag.getBoundingClientRect();
        const dx = (x - (r.left + r.width / 2)) * 0.25;
        const dy = (y - (r.top + r.height / 2)) * 0.35;
        mag.style.transform = `translate(${dx}px, ${dy}px)`;
        mag.classList.add('pulled');
      }
    };
    const leave = () => dot.classList.remove('on');

    const tick = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      dot.style.transform = `translate(${cx}px, ${cy}px)`;
      raf = requestAnimationFrame(tick);
    };
    tick();

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
      document.documentElement.classList.remove('has-cursor');
    };
  }, []);

  return (
    <div ref={ref} className="cursor" aria-hidden="true">
      <span />
    </div>
  );
}
