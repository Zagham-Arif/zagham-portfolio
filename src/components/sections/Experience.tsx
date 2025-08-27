'use client';

import { containerVariants } from '@/components/animations/experience';
import { ExperienceCard } from '@/components/experience/ExperienceCard';
import { useIsMobile } from '@/hooks/useIsMobile';
import { experiences } from '@/lib/data';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

export function Experience() {
  const t = useTranslations();
  const isMobile = useIsMobile();
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);
  const tRaw = (key: string): string[] => t.raw(key);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const totalExperiences = useMemo(() => experiences.length, [experiences]);

  const handleToggle = (idx: number) => {
    setOpenIndexes(prev => {
      if (prev.includes(idx)) {
        return prev.filter(i => i !== idx);
      } else {
        return isMobile ? [idx] : [...prev, idx];
      }
    });
  };

  return (
    <section
      id="experience"
      className="bg-gradient-to-br from-muted/30 via-background to-muted/50 px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-16 text-center"
        >
          <motion.h2
            className="mb-4 text-3xl font-bold sm:text-4xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('experience.title')}
          </motion.h2>
          <motion.p
            className="mx-auto max-w-2xl text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t('experience.subtitle')}
          </motion.p>
        </motion.div>

        {/* Timeline + Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto max-w-4xl"
        >
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              index={index}
              experience={experience}
              isMobile={isMobile}
              isOpen={openIndexes.includes(index)}
              onToggle={() => handleToggle(index)}
              totalExperiences={totalExperiences}
              t={t}
              tRaw={tRaw}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
