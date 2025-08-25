'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

type HoveredType = 'button' | 'text' | 'default';

export function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState<HoveredType>('default');

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    document.addEventListener('mousemove', move);

    const buttons = document.querySelectorAll('button, a');
    const texts = document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6');

    const handleButtonEnter = () => setHovered('button');
    const handleButtonLeave = () => setHovered('default');
    const handleTextEnter = () => setHovered('text');
    const handleTextLeave = () => setHovered('default');

    buttons.forEach(btn => {
      btn.addEventListener('mouseenter', handleButtonEnter);
      btn.addEventListener('mouseleave', handleButtonLeave);
    });

    texts.forEach(txt => {
      txt.addEventListener('mouseenter', handleTextEnter);
      txt.addEventListener('mouseleave', handleTextLeave);
    });

    return () => {
      document.removeEventListener('mousemove', move);

      buttons.forEach(btn => {
        btn.removeEventListener('mouseenter', handleButtonEnter);
        btn.removeEventListener('mouseleave', handleButtonLeave);
      });

      texts.forEach(txt => {
        txt.removeEventListener('mouseenter', handleTextEnter);
        txt.removeEventListener('mouseleave', handleTextLeave);
      });
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className={clsx(
          'pointer-events-none fixed z-[9999] flex items-center justify-center rounded-full border transition-colors duration-300',
          hovered === 'button'
            ? 'h-16 w-16 border-blue-500 bg-blue-100/20 shadow-lg'
            : hovered === 'text'
              ? 'h-8 w-8 border-transparent'
              : 'h-6 w-6 border-blue-500 bg-blue-200'
        )}
        style={{
          top:
            position.y -
            (hovered === 'button' ? 32 : hovered === 'text' ? 16 : 3),
          left:
            position.x -
            (hovered === 'button' ? 32 : hovered === 'text' ? 8 : 3),
        }}
        animate={{
          scale: hovered === 'button' ? 1.2 : hovered === 'text' ? 1.05 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      >
        {/* Inner content for cursor states */}
        {hovered === 'text' ? (
          // I-beam / caret style for text
          <div className="h-6 w-[2px] rounded-sm bg-blue-600" />
        ) : hovered !== 'button' ? (
          // Small dot for default
          <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
        ) : null}
      </motion.div>
    </AnimatePresence>
  );
}
