'use client';

import { motion } from 'framer-motion';

export function ProjectPaginationDots({
  totalSlides,
  currentSlide,
  setCurrentSlide,
}: {
  totalSlides: number;
  currentSlide: number;
  setCurrentSlide: (i: number) => void;
}) {
  return (
    <div className="mt-8 flex justify-center space-x-3">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <motion.button
          key={index}
          aria-label={`Go to slide ${index + 1}`}
          className={`h-3 rounded-full transition-all duration-500 ${
            index === currentSlide
              ? 'w-8 bg-primary shadow-lg shadow-primary/30'
              : 'w-3 bg-muted-foreground/30 hover:bg-muted-foreground/50'
          }`}
          onClick={() => setCurrentSlide(index)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          animate={{ scale: index === currentSlide ? 1.1 : 1 }}
        />
      ))}
    </div>
  );
}
