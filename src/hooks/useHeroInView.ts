import { useState, useEffect } from 'react';

export const useHeroInView = () => {
  const [isHeroInView, setIsHeroInView] = useState(true);

  useEffect(() => {
    const heroSection = document.getElementById('hero');
    if (!heroSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroInView(entry.isIntersecting);
      },
      {
        threshold: 0.3, // Trigger when 30% of hero is in view
      }
    );

    observer.observe(heroSection);

    return () => observer.disconnect();
  }, []);

  return isHeroInView;
};
