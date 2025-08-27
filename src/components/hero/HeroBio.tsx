import { itemVariants } from '@/components/animations/hero';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function HeroBio() {
  const t = useTranslations('hero');

  return (
    <motion.div variants={itemVariants}>
      <motion.p
        className="mx-auto max-w-3xl text-base leading-relaxed text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 2 }}
      >
        {t('bio')}
      </motion.p>
    </motion.div>
  );
}
