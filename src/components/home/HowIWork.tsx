import { getTranslations } from 'next-intl/server';
import { SectionHead } from './SectionHead';

const STEPS = ['find', 'design', 'deliver'] as const;

export async function HowIWork() {
  const t = await getTranslations('home.how');
  return (
    <section id="how" className="home-section">
      <SectionHead kicker={t('kicker')} title={t('title')} />
      <ol className="grid list-none gap-4 p-0 md:grid-cols-3">
        {STEPS.map((step, i) => (
          <li key={step} className="card p-6">
            <span className="step-num" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="font-display mt-3.5 mb-2 text-xl font-bold">
              {t(`steps.${step}.title`)}
            </h3>
            <p className="text-muted-ink m-0 text-[15px]">
              {t(`steps.${step}.body`)}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
