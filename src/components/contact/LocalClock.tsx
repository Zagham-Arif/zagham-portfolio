'use client';

import { useSyncExternalStore } from 'react';

const format = () =>
  new Date().toLocaleTimeString('en-GB', {
    timeZone: 'Asia/Karachi',
    hour: '2-digit',
    minute: '2-digit',
  });

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 30_000);
  return () => window.clearInterval(id);
}

// Server HTML has no time (it would be stale); the browser fills it in.
export function LocalClock() {
  const time = useSyncExternalStore(subscribe, format, () => '');
  return <time suppressHydrationWarning>{time ? ` · ${time}` : ''}</time>;
}
