import { SectionHead } from 'components/home/SectionHead';
import { caseStudies } from 'lib/case-studies';
import { projects } from 'lib/data';
import { normalizeTech } from 'lib/skills';
import { firstSentence } from 'lib/text';
import { slugFor } from 'lib/stack';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { WorkExplorer, type ExplorerItem } from './WorkExplorer';

export async function WorkSection({
  locale,
  headingLevel = 2,
  showRows = true,
}: {
  locale: string;
  headingLevel?: 1 | 2;
  /** The one-line list of every other project (the projects page uses a table instead). */
  showRows?: boolean;
}) {
  const t = await getTranslations('home.work');
  const tc = await getTranslations('caseStudies');
  const tp = await getTranslations();

  const items: ExplorerItem[] = caseStudies.map(cs => {
    const project = projects.find(p => p.id === cs.projectId);
    const technologies = project?.technologies ?? [];
    const kpiLabels = tc.raw(`${cs.id}.kpis`) as string[];
    return {
      id: cs.id,
      scenario: cs.scenario,
      category: tc(`${cs.id}.category`),
      title: tc(`${cs.id}.title`),
      result: tc(`${cs.id}.result`),
      problem: tc.raw(`${cs.id}.problem`),
      did: tc.raw(`${cs.id}.did`),
      changed: tc.raw(`${cs.id}.changed`),
      diagram: tc.raw(`${cs.id}.diagram`),
      kpis: cs.kpis.map((k, i) => ({ ...k, label: kpiLabels[i] })),
      technologies,
      tags: technologies.map(label => {
        const id = normalizeTech(label);
        return { label, slug: slugFor(id) };
      }),
    };
  });

  const featured = new Set(caseStudies.map(c => c.projectId));
  const rows = showRows
    ? projects
        .filter(p => !featured.has(p.id))
        .map(p => ({
          id: p.id,
          title: p.title,
          summary: firstSentence(tp(p.description)),
          kind: tp(`projectsData.${p.id}.kind`),
          technologies: p.technologies,
          liveUrl: p.liveUrl || undefined,
        }))
    : [];

  return (
    <section id="work" className="home-section">
      <SectionHead
        kicker={t('kicker')}
        title={t('title')}
        intro={t('intro')}
        headingLevel={headingLevel}
      />
      <WorkExplorer
        items={items}
        rows={rows}
        labels={{
          problem: t('problem'),
          did: t('did'),
          changed: t('changed'),
          tryIt: t('tryIt'),
          pendingNote: t('pendingNote'),
          filterLabel: t.raw('filterLabel') as string,
          clearFilter: t('clearFilter'),
          rowsTitle: t('moreTitle'),
          visit: t('visit'),
          lanes: t.raw('lanes'),
        }}
      />
      {showRows && (
        <p className="mt-6">
          <Link
            className="link text-brand font-semibold"
            href={`/${locale}/projects`}
          >
            {t('allProjects', { count: projects.length })} →
          </Link>
        </p>
      )}
    </section>
  );
}
