import { Navigation } from 'components/Navigation';
import { Links } from 'constants/links';
import { locales } from 'i18n/config';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Contact } from 'sections/Contact';
import { Footer } from 'sections/Footer';

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'contact' });
  const title = t('metaTitle');
  const description = t('metaDescription');

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/contact`,
      languages: {
        en: '/en/contact',
        es: '/es/contact',
        'x-default': '/en/contact',
      },
    },
    openGraph: {
      type: 'website',
      url: `${Links.siteUrl}/${locale}/contact`,
      title,
      description,
    },
  };
}

export default function ContactPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Contact standalone />
      </main>
      <Footer />
    </div>
  );
}
