// page.tsx
'use client';

import { Navigation } from '@/components/Navigation';
import { ScrollButton } from '@/components/ScrollButton';
import { Contact } from '@/components/sections/Contact';
import { Experience } from '@/components/sections/Experience';
import { Footer } from '@/components/sections/Footer';
import { Hero } from '@/components/sections/Hero';
import { Projects } from '@/components/sections/Projects';
import { Skills } from '@/components/sections/Skills';
import { useScrollTo } from '@/hooks/useScrollTo';
import { useScrollVisibility } from '@/hooks/useScrollVisibility';
import { useTranslations } from 'next-intl';

export default function Home({}: { params: { locale: string } }) {
  const t = useTranslations('main');
  const showScrollUp = useScrollVisibility({ threshold: 600 });
  const { scrollToTop } = useScrollTo();

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

      {/* Scroll Up Button with enhanced design */}
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
