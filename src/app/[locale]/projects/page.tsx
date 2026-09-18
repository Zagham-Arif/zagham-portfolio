import { Navigation } from 'components/Navigation';
import { ProjectCard } from 'components/projects/ProjectsCard';
import { ScrollToTopButton } from 'components/ScrollToTopButton';
import { Links } from 'constants/links';
import { locales } from 'i18n/config';
import { projects } from 'lib/data';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { Footer } from 'sections/Footer';

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'projectsPage' });
  const title = t('metaTitle');
  const description = t('metaDescription');

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/projects`,
      languages: {
        en: '/en/projects',
        es: '/es/projects',
        'x-default': '/en/projects',
      },
    },
    openGraph: {
      type: 'website',
      url: `${Links.siteUrl}/${locale}/projects`,
      title,
      description,
    },
  };
}

export default async function ProjectsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'projectsPage' });

  const featured = projects.filter(project => project.featured);
  const earlier = projects.filter(project => !project.featured);

  const groups = [
    {
      id: 'featured',
      heading: t('featuredHeading'),
      subheading: t('featuredSubheading'),
      items: featured,
    },
    {
      id: 'earlier',
      heading: t('earlierHeading'),
      subheading: t('earlierSubheading'),
      items: earlier,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <div className="container mx-auto px-1 sm:px-3 md:px-6 lg:px-8">
          <header className="mb-16 text-center">
            <h1 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
              {t('title')}
            </h1>
            <p className="mx-auto max-w-full text-lg text-muted-foreground sm:max-w-3xl">
              {t('subtitle')}
            </p>
          </header>

          {groups.map((group, groupIndex) => (
            <section key={group.id} id={group.id} className="mb-20 last:mb-0">
              <div className="mb-8 border-l-4 border-primary/60 pl-4">
                <h2 className="text-2xl font-bold sm:text-3xl">
                  {group.heading}
                </h2>
                <p className="mt-1 text-muted-foreground">{group.subheading}</p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    globalIndex={groupIndex * featured.length + index}
                  />
                ))}
              </div>
            </section>
          ))}

          <div className="mt-16 text-center">
            <Link
              href={`/${locale}/contact`}
              className="text-primary underline-offset-4 hover:underline"
            >
              {t('contactCta')}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
