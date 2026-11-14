import { ContactBlock } from 'components/home/ContactBlock';
import { SiteFooter } from 'components/home/SiteFooter';
import { Nav } from 'components/shell/Nav';
import { pageMetadata } from 'lib/page-metadata';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

// Re-render daily so "years of experience" and the © year stay current.
export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  return pageMetadata(locale, '/contact', t('metaTitle'), t('metaDescription'));
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Nav />
      <main id="main">
        <ContactBlock headingLevel={1} />
      </main>
      <SiteFooter />
    </>
  );
}
