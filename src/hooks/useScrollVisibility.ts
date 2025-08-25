import { useState, useEffect, useRef } from 'react';

interface UseScrollVisibilityOptions {
  threshold?: number;
  elementId?: string;
  direction?: 'up' | 'down';
}

export const useScrollVisibility = ({
  threshold = 100,
  elementId,
  direction = 'up',
}: UseScrollVisibilityOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (elementId) {
      elementRef.current = document.getElementById(elementId);
    }
  }, [elementId]);

  useEffect(() => {
    const handleScroll = () => {
      if (direction === 'up') {
        // For scroll up button - show after passing threshold
        setIsVisible(window.scrollY > threshold);
      } else {
        // For scroll down button - show only when element is in view
        if (elementRef.current) {
          const rect = elementRef.current.getBoundingClientRect();
          setIsVisible(rect.top >= 0 && rect.bottom <= window.innerHeight);
        } else {
          // Fallback for scroll down - show until threshold
          setIsVisible(window.scrollY < threshold);
        }
      }
    };

    handleScroll(); // Check initial state
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold, elementId, direction]);

  return isVisible;
};
