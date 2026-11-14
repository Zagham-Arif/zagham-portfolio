import { SectionHead } from 'components/home/SectionHead';
import { experiences, projects } from 'lib/data';
import { skillsByTier, whereUsed } from 'lib/stack';
import { getTranslations } from 'next-intl/server';
import { SkillButton } from './SkillButton';

export async function StackMap() {
  const t = await getTranslations('home.stack');
  const tAll = await getTranslations();

  // Roles first (company names), then projects, as evidence for each skill.
  const sources = [
    ...experiences.map(e => ({
      name: tAll(e.company),
      technologies: e.technologies,
    })),
    ...projects.map(p => ({ name: p.title, technologies: p.technologies })),
  ];

  return (
    <section id="skills" className="home-section">
      <SectionHead kicker={t('kicker')} title={t('title')} intro={t('intro')} />
      <div className="card p-2.5">
        {skillsByTier().map(({ tier, skills }) => (
          <div key={tier} className="layer" data-tier={tier}>
            <div>
              <h3 className="font-display m-0 text-base font-bold">
                {t(`tiers.${tier}.name`)}
              </h3>
              <p className="text-muted-ink m-0 mt-1 text-sm">
                {t(`tiers.${tier}.rule`)}
              </p>
            </div>
            <ul className="m-0 flex list-none flex-wrap gap-2.5 p-0">
              {skills.map(skill => (
                <li key={skill.id}>
                  <SkillButton
                    id={skill.id}
                    label={skill.label}
                    slug={skill.slug}
                    usedAt={whereUsed(skill.id, sources)}
                    labels={{
                      heading: t('whereUsed'),
                      examples: t('examples'),
                      noRecord: t('noRecord'),
                      showWork: t('showWork'),
                      close: t('close'),
                    }}
                    core={tier === 'core'}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
