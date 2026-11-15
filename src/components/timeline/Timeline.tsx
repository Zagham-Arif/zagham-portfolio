import { SectionHead } from 'components/home/SectionHead';
import { TechIcon } from 'components/shell/TechIcon';
import { experiences } from 'lib/data';
import { normalizeTech } from 'lib/skills';
import { slugFor } from 'lib/stack';
import { getLocale, getTranslations } from 'next-intl/server';
import { TimelineProgress } from './TimelineProgress';

// Roles with their own card; the rest are grouped as "earlier roles".
const FEATURED = ['freelance', 'xavor', 'hashlogics'];

const keyOf = (summaryKey: string) => summaryKey.split('.')[1];

export async function Timeline() {
  const t = await getTranslations('home.experience');
  const tAll = await getTranslations();
  const locale = await getLocale();
  const month = new Intl.DateTimeFormat(locale, {
    month: 'short',
    year: 'numeric',
  });
  const date = (ym: string) => month.format(new Date(`${ym}-01T00:00:00`));

  const featured = experiences.filter(e =>
    FEATURED.includes(keyOf(e.summaryKey))
  );
  const earlier = experiences.filter(e => !featured.includes(e));
  const earliestYear = Math.min(
    ...earlier.map(e => Number(e.duration.start.slice(0, 4)))
  );
  const latestYear = Math.max(
    ...earlier.map(e => Number((e.duration.end ?? '').slice(0, 4)))
  );

  return (
    <section id="experience" className="home-section">
      <SectionHead kicker={t('kicker')} title={t('title')} intro={t('intro')} />
      <TimelineProgress>
        <span className="timeline__fill" aria-hidden="true" />
        <ol className="m-0 list-none p-0">
          {featured.map(exp => {
            const key = keyOf(exp.summaryKey);
            const current = exp.duration.end === null;
            const all = tAll.raw(exp.responsibilitiesKey) as string[];
            return (
              <li key={exp.id} className="role">
                <span
                  className={`role__dot ${current ? 'is-now' : ''}`}
                  data-dot
                  aria-hidden="true"
                />
                <div>
                  <p className="mono text-brand m-0 uppercase">
                    {date(exp.duration.start)} —{' '}
                    {current ? t('now') : date(exp.duration.end as string)}
                  </p>
                  <p className="text-muted-ink m-0 mt-1 text-sm">
                    {exp.location}
                  </p>
                </div>
                <div className="card p-[22px]">
                  <h3 className="font-display m-0 mb-1 text-[21px] font-bold">
                    {tAll(exp.title)}
                    {key === 'hashlogics' && (
                      <span className="award ml-2">★ {t('award')}</span>
                    )}
                  </h3>
                  <p className="text-muted-ink m-0">{tAll(exp.company)}</p>
                  <ul className="text-muted-ink my-2.5 list-disc pl-[18px]">
                    {(t.raw(`short.${key}`) as string[]).map(b => (
                      <li key={b} className="my-1">
                        {b}
                      </li>
                    ))}
                  </ul>
                  <details className="mb-3.5">
                    <summary className="link text-brand cursor-pointer text-sm font-semibold">
                      {t('showAll')} ({all.length})
                    </summary>
                    <ul className="text-muted-ink mt-2 list-disc pl-[18px] text-[15px]">
                      {all.map(r => (
                        <li key={r} className="my-1">
                          {r}
                        </li>
                      ))}
                    </ul>
                  </details>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map(tech => {
                      const id = normalizeTech(tech);
                      return (
                        <span key={tech} className="tag" translate="no">
                          {slugFor(id) !== undefined && (
                            <TechIcon slug={slugFor(id)!} size={12} />
                          )}
                          {tech}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </li>
            );
          })}
          <li className="role">
            <span className="role__dot" data-dot aria-hidden="true" />
            <div>
              <p className="mono text-brand m-0 uppercase">
                {earliestYear} — {latestYear}
              </p>
              <p className="text-muted-ink m-0 mt-1 text-sm">
                {t('earlier.where')}
              </p>
            </div>
            <div className="card p-[22px]">
              <h3 className="font-display m-0 mb-1 text-[21px] font-bold">
                {t('earlier.title')}
              </h3>
              <p className="text-muted-ink m-0">{t('earlier.companies')}</p>
              <p className="text-muted-ink mt-2.5 mb-0">
                {t('earlier.summary')}
              </p>
            </div>
          </li>
        </ol>
      </TimelineProgress>
    </section>
  );
}
