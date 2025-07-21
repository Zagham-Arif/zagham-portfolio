import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  // Validate locale and provide fallback
  const validLocales = ['en', 'es'] as const;
  const isValidLocale = (loc: string): loc is (typeof validLocales)[number] =>
    validLocales.includes(loc as (typeof validLocales)[number]);
  const validatedLocale = locale && isValidLocale(locale) ? locale : 'en';

  try {
    const messages = (await import(`../../messages/${validatedLocale}.json`))
      .default;

    return {
      locale: validatedLocale,
      messages,
    };
  } catch (error) {
    console.error('Error loading messages for locale:', validatedLocale, error);

    // Fallback to English if there's an error
    const fallbackMessages = (await import(`../../messages/en.json`)).default;

    return {
      locale: 'en',
      messages: fallbackMessages,
    };
  }
});
