import { itemVariants } from 'animations/hero';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function HeroSubtitle() {
  const t = useTranslations('hero');

  return (
    <motion.div variants={itemVariants}>
      <motion.p
        className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl"
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {t('subtitle')}
      </motion.p>
    </motion.div>
  );
}
