import { ModeText } from 'components/shell/ModeText';
import { TechIcon } from 'components/shell/TechIcon';
import { getTranslations } from 'next-intl/server';
import { SectionHead } from './SectionHead';

const ITEMS = [
  {
    id: 'backend',
    icon: '⚙️',
    tint: '#3b5bfd',
    logos: ['nodedotjs', 'express', 'graphql', 'typescript'],
  },
  {
    id: 'cloud',
    icon: '☁️',
    tint: '#16a34a',
    logos: ['terraform', 'docker', null],
  },
  {
    id: 'data',
    icon: '⚡',
    tint: '#d97706',
    logos: ['redis', 'postgresql', 'mongodb'],
  },
  {
    id: 'lead',
    icon: '🧭',
    tint: '#db2777',
    logos: ['nextdotjs', 'react', 'typescript'],
  },
] as const;

export async function Capabilities() {
  const t = await getTranslations('home.capabilities');
  return (
    <section id="services" className="home-section">
      <SectionHead
        kicker={t('kicker')}
        title={t('title')}
        intro={<ModeText plain={t('intro.plain')} tech={t('intro.tech')} />}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map(item => (
          <div key={item.id} className="card p-[22px]">
            <div
              className="cap-icon"
              style={{ '--tint': item.tint } as React.CSSProperties}
              aria-hidden="true"
            >
              {item.icon}
            </div>
            <h3 className="font-display mb-2 text-[19px] font-bold">
              {t(`items.${item.id}.title`)}
            </h3>
            <p className="text-muted-ink mb-4 text-sm">
              <ModeText
                plain={t(`items.${item.id}.body.plain`)}
                tech={t(`items.${item.id}.body.tech`)}
              />
            </p>
            <div className="flex gap-2">
              {item.logos.map((slug, i) => (
                <TechIcon key={i} slug={slug} size={20} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
