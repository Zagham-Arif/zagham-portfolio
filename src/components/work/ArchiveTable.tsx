import { projects } from 'lib/data';
import { firstSentence } from 'lib/text';
import { getTranslations } from 'next-intl/server';

// Every project in one scannable table (projects page).
export async function ArchiveTable() {
  const t = await getTranslations('home.work');
  const tAll = await getTranslations();

  return (
    <section className="home-section pt-0" aria-labelledby="archive-title">
      <h2
        id="archive-title"
        className="display mb-6 text-[clamp(28px,3.4vw,40px)] leading-none"
      >
        {t('archive.title')}
      </h2>
      <div className="card overflow-x-auto">
        <table className="archive">
          <thead>
            <tr>
              <th scope="col">{t('archive.project')}</th>
              <th scope="col">{t('archive.what')}</th>
              <th scope="col">{t('archive.builtWith')}</th>
              <th scope="col">{t('archive.link')}</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(p => (
              <tr key={p.id}>
                <th scope="row">{p.title}</th>
                <td>{firstSentence(tAll(p.description))}</td>
                <td>
                  <span className="flex flex-wrap gap-1.5">
                    {p.technologies.slice(0, 4).map(tech => (
                      <span key={tech} className="tag" translate="no">
                        {tech}
                      </span>
                    ))}
                  </span>
                </td>
                <td>
                  {p.liveUrl ? (
                    <a
                      className="link text-brand font-semibold"
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t('visit')} ↗
                    </a>
                  ) : (
                    <span className="text-faint" aria-hidden="true">
                      —
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
