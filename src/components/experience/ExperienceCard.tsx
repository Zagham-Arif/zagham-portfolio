'use client';

import { dotVariants, itemVariants } from 'animations/experience';
import { motion } from 'framer-motion';
import { Experience } from 'lib/types';
import { Card } from 'ui/card';
import { ExperienceDetails } from './ExperienceDetails';
import { ExperienceHeader } from './ExperienceHeader';

export function ExperienceCard({
  index,
  experience,
  isMobile,
  isOpen,
  onToggle,
  t,
  tRaw,
  totalExperiences,
}: {
  index: number;
  experience: Experience;
  isMobile: boolean;
  isOpen: boolean;
  onToggle: () => void;
  t: (key: string) => string;
  tRaw: (key: string) => string[];
  totalExperiences: number;
}) {
  return (
    <motion.div variants={itemVariants} className="relative">
      {/* Timeline visuals - always visible, responsive */}
      {index < totalExperiences - 1 && (
        <motion.div
          className="absolute left-4 top-16 h-16 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent md:left-8 md:top-24 md:h-24"
          initial={{ scaleY: 0, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ transformOrigin: 'top' }}
        />
      )}
      <motion.div
        className="absolute left-2 top-4 h-3 w-3 rounded-full border-2 border-background bg-primary shadow-lg shadow-primary/30 md:left-6 md:top-8 md:h-4 md:w-4 md:border-4"
        variants={dotVariants}
        whileHover={{ scale: 1.3 }}
        animate={{
          boxShadow: [
            '0 0 0 0 rgba(var(--primary), 0.4)',
            '0 0 0 10px rgba(var(--primary), 0)',
          ],
        }}
        transition={{
          boxShadow: {
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          },
        }}
      />

      <div className="relative mb-16 ml-8 md:ml-16">
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
        >
          <Card className="group overflow-hidden border-0 bg-gradient-to-br from-background via-background to-muted/30 shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
            {/* Header */}
            <ExperienceHeader
              experience={experience}
              isMobile={isMobile}
              isOpen={isOpen}
              onToggle={onToggle}
              t={t}
            />

            {/* Collapsible details */}
            <ExperienceDetails
              isOpen={isOpen}
              experience={experience}
              t={t}
              tRaw={tRaw}
            />
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
