import { Button } from '@/components/ui/button';
import { personalInfo } from '@/lib/data';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FiDownload, FiMail } from 'react-icons/fi';
import { itemVariants } from '@/components/animations/hero';

export function HeroActions() {
  const t = useTranslations('hero');

  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col items-center justify-center gap-4 sm:flex-row"
    >
      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <motion.div
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <Button asChild size="lg" className="group w-full sm:w-auto">
            <a href={personalInfo.cvUrls.traditional} download>
              <FiDownload className="mr-2 h-4 w-4 group-hover:animate-bounce" />
              {t('cv.traditional')}
            </a>
          </Button>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <Button
            asChild
            variant="outline"
            size="lg"
            className="group w-full bg-transparent sm:w-auto"
          >
            <a href={personalInfo.cvUrls.europass} download>
              <FiDownload className="mr-2 h-4 w-4 group-hover:animate-bounce" />
              {t('cv.europass')}
            </a>
          </Button>
        </motion.div>
      </div>
      <motion.div
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400 }}
      >
        <Button
          asChild
          variant="outline"
          size="lg"
          className="group w-full bg-transparent sm:w-auto"
        >
          <a href="#contact">
            <FiMail className="mr-2 h-4 w-4 group-hover:animate-pulse" />
            {t('contactMe')}
          </a>
        </Button>
      </motion.div>
    </motion.div>
  );
}
