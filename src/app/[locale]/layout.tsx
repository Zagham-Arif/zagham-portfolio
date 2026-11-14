import { Links } from 'constants/links';
import { isValidLocale, locales } from 'i18n/config';
import { alternates } from 'i18n/alternates';
import { notFound } from 'next/navigation';
import { education, personalInfo } from 'lib/data';
import { skills } from 'lib/stack';
import 'lib/dev-suppressions';
import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { ThemeProvider } from 'next-themes';
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from 'next/font/google';
import { CommandMenu } from 'components/shell/CommandMenu';
import { IconSprite } from 'components/shell/TechIcon';
import { viewModeScript } from 'lib/view-mode';
import '../globals.css';

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-bricolage',
});
const body = Inter({ subsets: ['latin'], variable: '--font-inter' });
const code = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
});

const ogLocales = { en: 'en_US', es: 'es_ES' } as const;

// Only the configured locales exist; any other first segment is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f7fb' },
    { media: '(prefers-color-scheme: dark)', color: '#080c16' },
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
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
    alternates: alternates(locale),
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
      // images: generated per locale by ./opengraph-image.tsx
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

function personJsonLd(locale: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personalInfo.name,
    jobTitle: personalInfo.title,
    url: `${Links.siteUrl}/${locale}`,
    email: `mailto:${personalInfo.email}`,
    telephone: personalInfo.phone,
    description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lahore',
      addressCountry: 'PK',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: education[0].institution,
    },
    knowsAbout: skills.map(skill => skill.label),
    sameAs: [Links.github, Links.linkedIn, Links.upwork],
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  setRequestLocale(locale);
  const all = await getMessages({ locale });
  const tSeo = await getTranslations({ locale, namespace: 'seo' });
  const tNav = await getTranslations({ locale, namespace: 'home.nav' });
  const skipLabel = tNav('skip');
  // Client islands only read these namespaces; the rest stays on the server.
  const home = all.home as Record<string, unknown>;
  const messages = {
    home: { nav: home.nav, console: home.console, cmdk: home.cmdk },
    caseStudies: all.caseStudies,
  };

  return (
    <html lang={locale} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: viewModeScript }} />
      </head>
      <body
        className={`site ${display.variable} ${body.variable} ${code.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              personJsonLd(locale, tSeo('personDescription'))
            ),
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <IconSprite />
            <a href="#main" className="skip-link">
              {skipLabel}
            </a>
            {children}
            <CommandMenu />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
