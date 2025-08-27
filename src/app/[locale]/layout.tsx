import { Cursor } from 'components/CustomCursor';
import { personalInfo } from 'lib/data';
import 'lib/dev-suppressions';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
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

export const metadata: Metadata = {
  title: `${personalInfo.name} - Software Engineer`,
  description: `Portfolio of ${personalInfo.name}, an experienced Software Engineer with focus on full-stack development and cloud engineering. Skilled in JavaScript, TypeScript, Python, and cloud-native technologies.`,
  keywords:
    'Software Engineer, Full Stack Developer, React, Next.js, TypeScript, Node.js, Python, AWS, Cloud Engineering, Portfolio',
  authors: [{ name: personalInfo.name }],
  creator: personalInfo.name,
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
    locale: 'en_US',
    url: 'https://zagham-portfolio.vercel.app',
    title: `${personalInfo.name} - Software Engineer`,
    description: `Portfolio of ${personalInfo.name}, an experienced Software Engineer specializing in full-stack development and cloud engineering.`,
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
    title: `${personalInfo.name} - Software Engineer`,
    description: `Portfolio of ${personalInfo.name}, an experienced Software Engineer specializing in full-stack development and cloud engineering.`,
    creator: '@zaghamarif',
    images: ['/og-image.png'],
  },
};

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
