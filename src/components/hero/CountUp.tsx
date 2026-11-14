'use client';

import { useEffect, useState } from 'react';

// Counts from 0 to the first value once on load (1000 ms, ease-out). The final
// number is in the server HTML and stays put under reduced motion, without JS,
// or when hydration lands after the hero entrance (no visible reset to 0).
// Any later value shows immediately.
export function CountUp({ value }: { value: number }) {
  const [first] = useState(value);
  const [shown, setShown] = useState<number | null>(null);

  useEffect(() => {
    const late = performance.now() > 900;
    if (late || window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      return;
    const target = first;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 1000);
      setShown(p < 1 ? Math.round(target * (1 - (1 - p) ** 3)) : null);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [first]);

  const counting = shown !== null && value === first;
  return <span className="tabular-nums">{counting ? shown : value}</span>;
}
