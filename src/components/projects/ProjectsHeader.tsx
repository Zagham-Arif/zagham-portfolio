'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function ProjectsHeader() {
  const t = useTranslations('projects');

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="mb-16 text-center"
    >
      <motion.h2
        className="mb-4 text-3xl font-bold sm:text-4xl"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {t('title')}
      </motion.h2>
      <motion.p
        className="mx-auto max-w-2xl text-lg text-muted-foreground"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {t('subtitle')}
      </motion.p>
    </motion.div>
  );
}
