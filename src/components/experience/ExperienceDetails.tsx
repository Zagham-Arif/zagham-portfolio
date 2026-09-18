'use client';

import { motion } from 'framer-motion';

import { Experience } from 'lib/types';
import { FiCpu, FiTrendingUp } from 'react-icons/fi';
import { CardContent } from 'ui/card';

// Details stay mounted while collapsed so the achievements are part of the
// rendered HTML that search engines index, not only the JSON payload.
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
    <motion.div
      initial={false}
      animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.45, ease: 'easeInOut' }}
      style={{ overflow: 'hidden' }}
      aria-hidden={!isOpen}
    >
      <CardContent className="pt-6">
        {/* Achievements */}
        <div className="mb-8">
          <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            <FiTrendingUp className="h-4 w-4 text-primary" />
            {t('experience.keyAchievements')}
          </h4>
          <ul className="space-y-3">
            {tRaw(experience.responsibilitiesKey).map((res, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                <span className="leading-relaxed text-muted-foreground">
                  {res}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies */}
        <div>
          <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            <FiCpu className="h-4 w-4 text-primary" />
            {t('experience.technologiesUsed')}
          </h4>
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map(tech => (
              <span
                key={tech}
                className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </motion.div>
  );
}
