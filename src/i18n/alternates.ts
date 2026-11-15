import { defaultLocale, locales } from './config.ts';

/** canonical + hreflang alternates for a path ('' for the home page). */
export function alternates(locale: string, path = '') {
  return {
    canonical: `/${locale}${path}`,
    languages: {
      ...Object.fromEntries(locales.map(l => [l, `/${l}${path}`])),
      'x-default': `/${defaultLocale}${path}`,
    },
  };
}
