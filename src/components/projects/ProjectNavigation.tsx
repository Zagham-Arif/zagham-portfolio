'use client';

import { Button } from 'ui/button';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function ProjectNavigation({
  totalSlides,
  setCurrentSlide,
}: {
  totalSlides: number;
  currentSlide: number;
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
}) {
  const t = useTranslations();
  const prevSlide = () =>
    setCurrentSlide((prev: number) => (prev - 1 + totalSlides) % totalSlides);
  const nextSlide = () =>
    setCurrentSlide((prev: number) => (prev + 1) % totalSlides);

  return (
    <div className="mb-8 flex items-center justify-between">
      <motion.h3
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-xl font-semibold"
      >
        {t('projects.title')}
      </motion.h3>
      <motion.div
        className="flex space-x-2"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Button variant="outline" size="icon" onClick={prevSlide}>
          <FiChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={nextSlide}>
          <FiChevronRight className="h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  );
}
