import { pulseVariants } from '@/components/animations/hero';
import { personalInfo } from '@/lib/data';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FiCheck, FiMapPin } from 'react-icons/fi';

export function HeroHeader() {
  const t = useTranslations('hero');

  return (
    <motion.div variants={pulseVariants} className="relative">
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
  );
}
