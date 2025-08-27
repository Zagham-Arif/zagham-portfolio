'use client';

import { motion } from 'framer-motion';
import { Experience } from 'lib/types';
import { formatDate, getCompanyInitials } from 'lib/utils';
import { FiBriefcase, FiCalendar, FiChevronDown } from 'react-icons/fi';
import { CardHeader } from 'ui/card';

export function ExperienceHeader({
  experience,
  isMobile,
  isOpen,
  onToggle,
  t,
}: {
  experience: Experience;
  isMobile: boolean;
  isOpen: boolean;
  onToggle: () => void;
  t: (key: string) => string;
}) {
  return (
    <CardHeader
      className={`relative cursor-pointer select-none overflow-hidden bg-gradient-to-r from-muted/50 to-muted/30 pb-6${
        isMobile ? ' flex flex-col items-start gap-2 px-2 pb-4 pt-4' : ''
      }`}
      onClick={onToggle}
    >
      <div
        className={`flex w-full flex-col gap-4${
          isMobile ? '' : ' sm:flex-row sm:items-start sm:justify-between'
        }`}
      >
        <div
          className={`flex items-start gap-4${
            isMobile ? ' flex-col items-start gap-2' : ''
          }`}
        >
          {/* Logo */}
          {!isMobile && (
            <motion.div
              className="flex-shrink-0"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 shadow-md">
                <span className="text-sm font-bold text-primary">
                  {getCompanyInitials(t(experience.company))}
                </span>
              </div>
            </motion.div>
          )}

          <div className="flex-1">
            <span className="mb-2 flex flex-wrap items-center gap-2">
              <FiBriefcase className="h-4 w-4 text-primary" />
              <span className="text-xl font-bold">{t(experience.title)}</span>
            </span>
            <span className="text-lg font-medium text-primary">
              {t(experience.company)}
            </span>
          </div>
        </div>

        <div className="flex items-center">
          <motion.div
            className="flex items-center gap-1 rounded-full bg-background/80 px-4 py-2 text-sm text-muted-foreground shadow-sm backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            <FiCalendar className="h-4 w-4 text-primary" />
            <span className="font-medium">
              {formatDate(experience.duration.start)} -{' '}
              {experience.duration.end
                ? formatDate(experience.duration.end)
                : t('experience.present')}
            </span>
          </motion.div>

          <motion.button
            type="button"
            aria-label={
              isOpen ? t('experience.collapse') : t('experience.expand')
            }
            className="ml-2 flex items-center justify-center rounded-full"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            onClick={e => {
              e.stopPropagation();
              onToggle();
            }}
          >
            <FiChevronDown className="h-6 w-6 text-primary" />
          </motion.button>
        </div>
      </div>
    </CardHeader>
  );
}
