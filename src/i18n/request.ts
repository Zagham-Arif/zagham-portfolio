import { getRequestConfig } from 'next-intl/server';
import { defaultLocale, isValidLocale } from './config';

export default getRequestConfig(async ({ requestLocale }) => {
  // next-intl v4: the parameter is a promise, not a plain string.
  const requested = await requestLocale;
  const locale = isValidLocale(requested) ? requested : defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
