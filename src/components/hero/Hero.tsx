import { Console } from 'components/console/Console';
import { ModeText } from 'components/shell/ModeText';
import { experiences, personalInfo, projects } from 'lib/data';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Fragment } from 'react';
import { CountUp } from './CountUp';

function yearsOfExperience() {
  const first = experiences
    .map(e => new Date(`${e.duration.start}-01`).getTime())
    .reduce((a, b) => Math.min(a, b));
  return Math.floor((Date.now() - first) / (365.25 * 24 * 3600 * 1000));
}

// Words rise out of masks once on load; CSS only, so nothing waits for JavaScript.
function MaskedWords({ text, from = 0 }: { text: string; from?: number }) {
  return text.split(' ').map((word, i) => (
    <Fragment key={i}>
      <span className="word">
        <span style={{ '--i': from + i } as React.CSSProperties}>{word}</span>
      </span>{' '}
    </Fragment>
  ));
}

export async function Hero() {
  const t = await getTranslations('home.hero');
  const [first, ...rest] = t('headline').split('. ');
  const second = rest.join('. ');
  const firstWords = `${first}.`.split(' ').length;
  const resume =
    personalInfo.cvUrls.traditional || personalInfo.cvUrls.europass;

  const numbers = [
    { n: yearsOfExperience(), suffix: '+', label: t('numbers.years') },
    { n: projects.length, label: t('numbers.projects') },
    { n: experiences.length, label: t('numbers.teams') },
    { n: 0, label: t('numbers.downtime') },
  ];

  return (
    <section
      aria-labelledby="hero-title"
      className="relative z-[1] mx-auto grid max-w-[1200px] items-center gap-11 px-6 pt-16 pb-12 lg:grid-cols-[0.95fr_1.05fr]"
    >
      <div>
        <div
          className="enter-up flex items-center gap-3.5"
          style={{ '--d': 0 } as React.CSSProperties}
        >
          <span className="avatar">
            {personalInfo.avatarUrl ? (
              <Image
                src={personalInfo.avatarUrl}
                alt={personalInfo.name}
                width={58}
                height={58}
                priority
              />
            ) : (
              <span aria-hidden="true">ZA</span>
            )}
            <span className="avatar__dot" />
          </span>
          <div>
            <p className="font-semibold">{t('greeting')}</p>
            <p className="pill mt-1">
              <span className="live-dot" />
              {t('available')}
            </p>
          </div>
        </div>

        <h1
          id="hero-title"
          className="display hero-title my-6 text-[clamp(42px,5.8vw,78px)] leading-[0.98]"
        >
          <MaskedWords text={`${first}.`} />
          <span className="grad">
            <MaskedWords text={second} from={firstWords} />
          </span>
        </h1>

        <p
          className="enter-up text-muted-ink mb-7 max-w-[540px] text-[18.5px]"
          style={{ '--d': 1 } as React.CSSProperties}
        >
          <ModeText plain={t('lede.plain')} tech={t('lede.tech')} />
        </p>

        <div
          className="enter-up flex flex-wrap gap-3"
          style={{ '--d': 2 } as React.CSSProperties}
        >
          <a
            className="btn btn--primary"
            href={personalInfo.bookingUrl || '#contact'}
          >
            {t('book')} →
          </a>
          <a className="btn" href="#work">
            {t('seeWork')}
          </a>
          {resume && (
            <a className="btn" href={resume} download>
              {t('resume')} ↓
            </a>
          )}
        </div>

        <dl
          className="enter-up mt-10 grid grid-cols-2 gap-7 sm:grid-cols-4"
          style={{ '--d': 3 } as React.CSSProperties}
        >
          {numbers.map(({ n, suffix, label }) => (
            <div key={label} className="flex flex-col-reverse">
              <dt className="mono text-muted-ink mt-1.5 text-[11px] leading-snug uppercase">
                {label}
              </dt>
              <dd className="font-display text-[34px] leading-none font-extrabold">
                <CountUp value={n} />
                {suffix}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <Console />
    </section>
  );
}
