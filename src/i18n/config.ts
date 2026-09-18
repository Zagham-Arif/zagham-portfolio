export const locales = ['en', 'es'] as const;
export const defaultLocale = 'en' satisfies Locale;

export type Locale = (typeof locales)[number];

export const isValidLocale = (value?: string): value is Locale =>
  locales.includes(value as Locale);
