'use client';

import { motion, type Variants } from 'framer-motion';
import { FiArrowDown, FiArrowUp } from 'react-icons/fi';

interface ScrollButtonProps {
  direction: 'up' | 'down';
  onClick: () => void;
  text: string;
  position?: 'left' | 'right';
  withBackground?: boolean;
  animateFloating?: boolean;
  pulse?: boolean;
  className?: string;
}

export const ScrollButton = ({
  direction,
  onClick,
  text,
  position = 'right',
  withBackground = false,
  animateFloating = false,
  pulse = false,
  className = '',
}: ScrollButtonProps) => {
  const Icon = direction === 'up' ? FiArrowUp : FiArrowDown;

  const positionClasses = position === 'right' ? 'right-6' : 'left-6';

  // Floating animation for scroll down button
  const floatingAnimation: Variants = animateFloating
    ? {
        animate: {
          y: [0, 15, 0],
          transition: {
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          },
        },
      }
    : {};

  // Pulse animation for scroll up button
  const pulseAnimation: Variants = pulse
    ? {
        animate: {
          scale: [1, 1.05, 1],
          boxShadow: [
            '0 0 0 0 rgba(59, 130, 246, 0)',
            '0 0 0 10px rgba(59, 130, 246, 0.1)',
            '0 0 0 0 rgba(59, 130, 246, 0)',
          ],
          transition: {
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeOut',
          },
        },
      }
    : {};

  return (
    <motion.button
      onClick={onClick}
      className={`group fixed bottom-8 z-50 flex flex-col items-center space-y-2 ${positionClasses} ${className}`}
      initial={{ opacity: 0, y: direction === 'up' ? 50 : -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: direction === 'up' ? 50 : -50 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...floatingAnimation}
    >
      <span className="text-xs uppercase tracking-wider text-muted-foreground transition-colors group-hover:text-primary">
        {text}
      </span>
      <motion.div
        whileHover={{ scale: 1.2 }}
        transition={{ type: 'spring', stiffness: 400 }}
        className={`rounded-full border border-muted-foreground/20 p-2 transition-colors group-hover:border-primary/50 ${
          withBackground ? 'bg-background/90 shadow-lg backdrop-blur-md' : ''
        }`}
        {...pulseAnimation}
      >
        <Icon className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-primary" />
      </motion.div>
    </motion.button>
  );
};
