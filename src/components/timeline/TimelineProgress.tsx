'use client';

import { useEffect, useRef, type ReactNode } from 'react';

// The page's one scroll moment: the timeline line fills as the visitor reads
// down, and each role's dot lights when the fill reaches it. The cards never
// move. Without JS or under reduced motion the CSS default (fully drawn) stays.
export function TimelineProgress({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      return;
    const dots = Array.from(el.querySelectorAll<HTMLElement>('[data-dot]'));
    let frame = 0;
    const update = () => {
      frame = 0;
      const box = el.getBoundingClientRect();
      const reach = Math.min(
        box.height,
        Math.max(0, window.innerHeight * 0.6 - box.top)
      );
      const lit = dots.map(
        dot => dot.getBoundingClientRect().top - box.top <= reach
      );
      el.style.setProperty('--fill', `${reach}px`);
      dots.forEach((dot, i) => (dot.dataset.lit = String(lit[i])));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div ref={ref} className="timeline" data-moment="timeline">
      {children}
    </div>
  );
}
