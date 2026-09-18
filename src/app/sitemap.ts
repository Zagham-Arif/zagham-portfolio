import { Links } from 'constants/links';
import { locales } from 'i18n/config';
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const languages = Object.fromEntries(
    locales.map(locale => [locale, `${Links.siteUrl}/${locale}`])
  );

  return locales.flatMap(locale =>
    ['', '/projects', '/contact'].map(path => ({
      url: `${Links.siteUrl}/${locale}${path}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: locale === 'en' ? 1 : 0.8,
      alternates: {
        languages: path
          ? Object.fromEntries(
              locales.map(l => [l, `${Links.siteUrl}/${l}${path}`])
            )
          : languages,
      },
    }))
  );
}
