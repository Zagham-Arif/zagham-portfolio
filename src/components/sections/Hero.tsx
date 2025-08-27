'use client';

import { floatingVariants } from 'animations/hero';
import { HeroActions } from 'components/hero/HeroActions';
import { HeroBio } from 'components/hero/HeroBio';
import { HeroHeader } from 'components/hero/HeroHeader';
import { HeroSubtitle } from 'components/hero/HeroSubtitle';
import { HeroTitle } from 'components/hero/HeroTitle';
import { ScrollButton } from 'components/ScrollButton';
import { motion } from 'framer-motion';
import { useHeroInView } from 'hooks/useHeroInView';
import { useScrollTo } from 'hooks/useScrollTo';
import { useTranslations } from 'next-intl';

export function Hero() {
  const t = useTranslations('hero');
  const { scrollToNextSection } = useScrollTo();
  const isHeroInView = useHeroInView();

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-2 pt-16 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute left-10 top-20 h-32 w-32 rounded-full bg-primary/10 blur-xl"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="absolute right-20 top-40 h-24 w-24 rounded-full bg-secondary/10 blur-xl"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 h-40 w-40 rounded-full bg-accent/10 blur-xl"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
        />
      </div>
      <div className="container mx-auto px-1 sm:px-3 md:px-6 lg:px-8">
        <div className="space-y-8 text-center">
          <HeroHeader />
          <HeroTitle />
          <HeroSubtitle />
          <HeroBio />
          <HeroActions />
          {isHeroInView && (
            <div className="pt-">
              <ScrollButton
                direction="down"
                onClick={scrollToNextSection}
                text={t('scrollDown')}
                position="left"
                withBackground
                pulse
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
