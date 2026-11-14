import { Nav } from 'components/shell/Nav';
import { setRequestLocale } from 'next-intl/server';
import { Capabilities } from 'components/home/Capabilities';
import { ContactBlock } from 'components/home/ContactBlock';
import { HowIWork } from 'components/home/HowIWork';
import { Marquee } from 'components/home/Marquee';
import { SiteFooter } from 'components/home/SiteFooter';
import { Timeline } from 'components/timeline/Timeline';
import { Hero } from 'components/hero/Hero';
import { WorkSection } from 'components/work/WorkSection';
import { StackMap } from 'components/stack/StackMap';

// Re-render daily so "years of experience" and the © year stay current.
export const revalidate = 86400;

export default async function Home({
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
        <Hero />
        <Marquee />
        <Capabilities />
        <WorkSection locale={locale} />
        <StackMap />
        <Timeline />
        <HowIWork />
        <ContactBlock />
      </main>
      <SiteFooter />
    </>
  );
}
