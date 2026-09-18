import { Cursor } from 'components/CustomCursor';
import { Links } from 'constants/links';
import { locales } from 'i18n/config';
import { education, personalInfo, skills } from 'lib/data';
import 'lib/dev-suppressions';
import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { ThemeProvider } from 'next-themes';
import localFont from 'next/font/local';
import '../globals.css';

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

const ogLocales = { en: 'en_US', es: 'es_ES' } as const;

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'seo' });
  const title = t('title');
  const description = t('description');

  return {
    metadataBase: new URL(Links.siteUrl),
    title,
    description,
    keywords: t('keywords'),
    authors: [{ name: personalInfo.name }],
    creator: personalInfo.name,
    alternates: {
      canonical: `/${locale}`,
      languages: { en: '/en', es: '/es', 'x-default': '/en' },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
    icons: {
      icon: [
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
        { url: '/favicon-96.png', sizes: '96x96', type: 'image/png' },
        { url: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
        { url: '/favicon-512.png', sizes: '512x512', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
      shortcut: '/favicon.svg',
    },
    openGraph: {
      type: 'website',
      locale: ogLocales[locale as keyof typeof ogLocales] ?? 'en_US',
      url: `${Links.siteUrl}/${locale}`,
      title,
      description,
      siteName: `${personalInfo.name} Portfolio`,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: `${personalInfo.name}, ${personalInfo.title}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
  };
}

function personJsonLd(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personalInfo.name,
    jobTitle: personalInfo.title,
    url: `${Links.siteUrl}/${locale}`,
    email: `mailto:${personalInfo.email}`,
    telephone: personalInfo.phone,
    description:
      'Senior full-stack engineer specializing in backend architecture, data pipelines and payment systems with Node.js, TypeScript and AWS.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lahore',
      addressCountry: 'PK',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: education[0].institution,
    },
    knowsAbout: skills.map(skill => skill.name),
    sameAs: [Links.github, Links.linkedIn, Links.upwork, Links.fiverr],
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd(locale)),
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <Cursor />
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
