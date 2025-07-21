'use client';

import { motion } from 'framer-motion';
import { FiDownload, FiMail, FiArrowDown } from 'react-icons/fi';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { personalInfo } from '@/lib/data';

export function Hero() {
  const t = useTranslations('hero');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
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

  return (
    <section
      id="hero"
      className="flex min-h-screen items-center justify-center px-4 pt-16 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 text-center"
        >
          {/* Greeting */}
          <motion.div variants={itemVariants}>
            <p className="mb-2 text-lg text-muted-foreground">
              {t('greeting')}
            </p>
            <h1 className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-4xl font-bold text-transparent sm:text-6xl lg:text-7xl">
              {personalInfo.name}
            </h1>
          </motion.div>

          {/* Title */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-semibold text-foreground sm:text-3xl lg:text-4xl">
              {t('title')}
            </h2>
          </motion.div>

          {/* Subtitle */}
          <motion.div variants={itemVariants}>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
              {t('subtitle')}
            </p>
          </motion.div>

          {/* Description */}
          <motion.div variants={itemVariants}>
            <p className="mx-auto max-w-3xl text-base leading-relaxed text-muted-foreground">
              {personalInfo.bio}
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <a href={personalInfo.cvUrls.traditional} download>
                  <FiDownload className="mr-2 h-4 w-4" />
                  Download CV (Traditional)
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                <a href={personalInfo.cvUrls.europass} download>
                  <FiDownload className="mr-2 h-4 w-4" />
                  Download CV (Europass)
                </a>
              </Button>
            </div>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              <a href="#contact">
                <FiMail className="mr-2 h-4 w-4" />
                {t('contactMe')}
              </a>
            </Button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div variants={itemVariants} className="pt-8">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex justify-center"
            >
              <FiArrowDown className="h-6 w-6 text-muted-foreground" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
