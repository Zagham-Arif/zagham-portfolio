'use client';

import { motion, AnimatePresence } from 'framer-motion';

import { CardContent } from '@/components/ui/card';
import { FiTrendingUp, FiMapPin } from 'react-icons/fi';
import { Experience } from '@/lib/types';

export function ExperienceDetails({
  isOpen,
  experience,
  t,
  tRaw,
}: {
  isOpen: boolean;
  experience: Experience;
  t: (key: string) => string;
  tRaw: (key: string) => string[];
}) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="details"
          layout
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          style={{ overflow: 'hidden' }}
        >
          <CardContent className="pt-6">
            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                <FiTrendingUp className="h-4 w-4 text-primary" />
                {t('experience.keyAchievements')}
              </h4>
              <ul className="space-y-3">
                {tRaw(experience.responsibilitiesKey).map((res, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.1 * idx }}
                  >
                    <motion.div
                      className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary"
                      whileHover={{ scale: 1.5 }}
                    />
                    <span className="text-muted-foreground">{res}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                <FiMapPin className="h-4 w-4 text-primary" />
                {t('experience.technologiesUsed')}
              </h4>
              <div className="flex flex-wrap gap-3">
                {experience.technologies.map((tech: string, i: number) => (
                  <motion.span
                    key={tech}
                    className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.5, delay: 0.05 * i }}
                    whileHover={{ scale: 1.1, y: -4 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </CardContent>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
