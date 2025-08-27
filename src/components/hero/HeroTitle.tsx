import { itemVariants } from 'animations/hero';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function HeroTitle() {
  const t = useTranslations('hero');

  return (
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
  );
}
