import { useEffect, useState } from 'react';

// Returns the id of the section currently under the navbar, or '' at the top.
export const useActiveSection = (ids: string[], enabled: boolean) => {
  const [active, setActive] = useState('');
  const key = ids.join(',');

  useEffect(() => {
    if (!enabled) return;
    const onScroll = () => {
      // A section counts as active once its top passes a line just below the navbar.
      const line = 120;
      let current = '';
      for (const id of key.split(',')) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [key, enabled]);

  return active;
};
