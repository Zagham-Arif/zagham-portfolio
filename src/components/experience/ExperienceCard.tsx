'use client';

import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ExperienceDetails } from './ExperienceDetails';
import { ExperienceHeader } from './ExperienceHeader';
import { dotVariants, itemVariants } from '../animations/experience';
import { Experience } from '@/lib/types';

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
      {/* Timeline visuals */}
      {!isMobile && index < totalExperiences - 1 && (
        <motion.div
          className="absolute left-8 top-24 hidden h-24 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent md:block"
          initial={{ scaleY: 0, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ transformOrigin: 'top' }}
        />
      )}
      {!isMobile && (
        <motion.div
          className="absolute left-6 top-8 hidden h-4 w-4 rounded-full border-4 border-background bg-primary shadow-lg shadow-primary/30 md:block"
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
      )}

      <div className="mb-16 md:ml-16">
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
