'use client';

import { ScrollButton } from 'components/ScrollButton';
import { useScrollTo } from 'hooks/useScrollTo';
import { useScrollVisibility } from 'hooks/useScrollVisibility';
import { useTranslations } from 'next-intl';

export function ScrollToTopButton() {
  const t = useTranslations('main');
  const isVisible = useScrollVisibility({ threshold: 600 });
  const { scrollToTop } = useScrollTo();

  if (!isVisible) return null;

  return (
    <ScrollButton
      direction="up"
      onClick={scrollToTop}
      text={t('scrollUp')}
      position="right"
      withBackground
      pulse
    />
  );
}
