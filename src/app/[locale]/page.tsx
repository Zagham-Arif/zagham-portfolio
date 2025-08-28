'use client';

import LottieAnimation from 'components/LottieAnimation';
import { Navigation } from 'components/Navigation';
import { ScrollButton } from 'components/ScrollButton';
import { useScrollTo } from 'hooks/useScrollTo';
import { useScrollVisibility } from 'hooks/useScrollVisibility';
import { useTranslations } from 'next-intl';
import { useLayoutEffect, useState, useTransition } from 'react';
import { Contact } from 'sections/Contact';
import { Experience } from 'sections/Experience';
import { Footer } from 'sections/Footer';
import { Hero } from 'sections/Hero';
import { Projects } from 'sections/Projects';
import { Skills } from 'sections/Skills';

export default function Home({}: { params: { locale: string } }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('main');
  const showScrollUp = useScrollVisibility({ threshold: 600 });
  const { scrollToTop } = useScrollTo();

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      startTransition(() => {
        setIsLoading(false);
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Show loading animation while loading OR during the transition
  if (isLoading || isPending) {
    return <LottieAnimation />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
      {showScrollUp && (
        <ScrollButton
          direction="up"
          onClick={scrollToTop}
          text={t('scrollUp')}
          position="right"
          withBackground
          pulse
        />
      )}
    </div>
  );
}
