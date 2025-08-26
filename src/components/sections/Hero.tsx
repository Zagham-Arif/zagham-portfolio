'use client';

import { Button } from '@/components/ui/button';
import { personalInfo } from '@/lib/data';
import { motion, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FiCheck, FiDownload, FiMail, FiMapPin } from 'react-icons/fi';

import { ScrollButton } from '@/components/ScrollButton';
import { useHeroInView } from '@/hooks/useHeroInView';
import { useScrollTo } from '@/hooks/useScrollTo';

export function Hero() {
  const t = useTranslations('hero');
  const { scrollToNextSection } = useScrollTo();
  const isHeroInView = useHeroInView();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  const floatingVariants: Variants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: 'easeInOut',
      },
    },
  };

  const pulseVariants: Variants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-16 sm:px-6 lg:px-8"
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

      <div className="container mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 text-center"
        >
          <motion.div variants={itemVariants} className="relative">
            <motion.div
              className="absolute -top-8 left-1/2 -translate-x-1/2 transform"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.8, type: 'spring' }}
            >
              <div className="flex flex-wrap justify-center gap-3">
                <motion.div
                  className="flex items-center space-x-2 rounded-full border border-green-500/30 bg-gradient-to-r from-green-500/10 to-emerald-500/10 px-4 py-2 shadow-lg backdrop-blur-sm"
                  variants={pulseVariants}
                  animate="animate"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <motion.div
                    className="h-2 w-2 rounded-full bg-green-500"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: 'easeInOut',
                    }}
                  />
                  <FiCheck className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    {t('available')}
                  </span>
                </motion.div>
                <motion.div
                  className="hidden items-center space-x-2 rounded-full border border-primary/30 bg-gradient-to-r from-primary/10 to-primary/5 px-4 py-2 shadow-lg backdrop-blur-sm sm:flex"
                  variants={pulseVariants}
                  animate="animate"
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <motion.div
                    className="h-2 w-2 rounded-full bg-primary"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: 'easeInOut',
                    }}
                  />
                  <FiMapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">
                    {personalInfo.location}
                  </span>
                </motion.div>
              </div>
            </motion.div>

            <p className="mb-2 mt-8 pt-6 text-lg text-muted-foreground">
              {t('greeting')}
            </p>
            <motion.h1
              className="text-4xl font-bold leading-tight text-primary drop-shadow-md sm:text-6xl md:pb-3 lg:text-7xl"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {personalInfo.name}
            </motion.h1>
          </motion.div>

          <motion.div variants={itemVariants} className="relative">
            <motion.h2
              className="text-2xl font-semibold text-foreground sm:text-3xl lg:text-4xl"
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              {t('title')}
            </motion.h2>
            <motion.div
              className="mx-auto mt-2 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
              initial={{ width: 0 }}
              animate={{ width: '200px' }}
              transition={{ delay: 1.5, duration: 1 }}
            />
          </motion.div>

          {/* Subtitle */}
          <motion.div variants={itemVariants}>
            <motion.p
              className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {t('subtitle')}
            </motion.p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.p
              className="mx-auto max-w-3xl text-base leading-relaxed text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 2 }}
            >
              {t('bio')}
            </motion.p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <Button asChild size="lg" className="group w-full sm:w-auto">
                  <a href={personalInfo.cvUrls.traditional} download>
                    <FiDownload className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                    {t('cv.traditional')}
                  </a>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="group w-full bg-transparent sm:w-auto"
                >
                  <a href={personalInfo.cvUrls.europass} download>
                    <FiDownload className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                    {t('cv.europass')}
                  </a>
                </Button>
              </motion.div>
            </div>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <Button
                asChild
                variant="outline"
                size="lg"
                className="group w-full bg-transparent sm:w-auto"
              >
                <a href="#contact">
                  <FiMail className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                  {t('contactMe')}
                </a>
              </Button>
            </motion.div>
          </motion.div>

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
        </motion.div>
      </div>
    </section>
  );
}
