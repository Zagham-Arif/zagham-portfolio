import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from 'next-themes';
import localFont from 'next/font/local';
import '../globals.css';
import '@/lib/dev-suppressions';
import { personalInfo } from '@/lib/data';

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
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/icon-192.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
      },
    ],
    apple: {
      url: '/icon-192.svg',
      sizes: '180x180',
      type: 'image/svg+xml',
    },
    shortcut: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://zagham-portfolio.vercel.app',
    title: `${personalInfo.name} - Software Engineer`,
    description: `Portfolio of ${personalInfo.name}, an experienced Software Engineer specializing in full-stack development and cloud engineering.`,
    siteName: `${personalInfo.name} Portfolio`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${personalInfo.name} - Software Engineer`,
    description: `Portfolio of ${personalInfo.name}, an experienced Software Engineer specializing in full-stack development and cloud engineering.`,
    creator: '@zagham',
  },
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
