import { Links } from 'constants/links';
import { alternates } from 'i18n/alternates';
import type { Metadata } from 'next';
import { personalInfo } from './data';

const ogLocales = { en: 'en_US', es: 'es_ES' } as const;

// Metadata for a sub-page. Next replaces (not merges) nested openGraph/twitter
// objects, so every field the layout sets is repeated here with this page's text.
export function pageMetadata(
  locale: string,
  path: string,
  title: string,
  description: string
): Metadata {
  return {
    title,
    description,
    alternates: alternates(locale, path),
    openGraph: {
      type: 'website',
      url: `${Links.siteUrl}/${locale}${path}`,
      title,
      description,
      siteName: `${personalInfo.name} Portfolio`,
      locale: ogLocales[locale as keyof typeof ogLocales] ?? 'en_US',
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}
