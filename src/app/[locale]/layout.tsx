import { Cursor } from 'components/CustomCursor';
import { Links } from 'constants/links';
import { personalInfo, socialLinks } from 'lib/data';
import 'lib/dev-suppressions';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
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
      languages: { en: '/en', es: '/es' },
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
          alt: 'Portfolio Preview',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@zaghamarif',
      images: ['/og-image.png'],
    },
  };
}

function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personalInfo.name,
    jobTitle: personalInfo.title,
    url: Links.siteUrl,
    email: `mailto:${personalInfo.email}`,
    address: {
      '@type': 'PostalAddress',
      addressCountry: personalInfo.location,
    },
    sameAs: socialLinks
      .filter(link => link.url.startsWith('http'))
      .map(link => link.url),
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
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
