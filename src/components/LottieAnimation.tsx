'use client';

import Lottie from 'lottie-react';
import animationData from 'public/animations/background-animation.json';
import { useEffect, useState } from 'react';

export default function LottieAnimation() {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = () => setIsReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  if (isReducedMotion) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <Lottie
          animationData={animationData}
          loop={true}
          autoplay={true}
          className="h-full w-full"
        />
      </div>
    </div>
  );
}
