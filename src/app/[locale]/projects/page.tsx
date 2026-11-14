import { SiteFooter } from 'components/home/SiteFooter';
import { Nav } from 'components/shell/Nav';
import { ArchiveTable } from 'components/work/ArchiveTable';
import { WorkSection } from 'components/work/WorkSection';
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
  const t = await getTranslations({ locale, namespace: 'projectsPage' });

  return pageMetadata(
    locale,
    '/projects',
    t('metaTitle'),
    t('metaDescription')
  );
}

export default async function ProjectsPage({
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
        <WorkSection locale={locale} headingLevel={1} showRows={false} />
        <ArchiveTable />
      </main>
      <SiteFooter />
    </>
  );
}
