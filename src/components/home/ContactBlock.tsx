import { CopyEmail } from 'components/contact/CopyEmail';
import { LocalClock } from 'components/contact/LocalClock';
import { Links } from 'constants/links';
import { personalInfo } from 'lib/data';
import { getTranslations } from 'next-intl/server';

export async function ContactBlock({
  headingLevel = 2,
}: {
  headingLevel?: 1 | 2;
}) {
  const t = await getTranslations('home.contact');
  const Heading = headingLevel === 1 ? 'h1' : 'h2';
  const rows = [
    {
      k: t('linkedin'),
      v: 'in/zagham-arif',
      href: Links.linkedIn,
    },
    { k: t('github'), v: 'Zagham-Arif', href: Links.github },
  ];

  return (
    <section id="contact" className="home-section">
      <div className="contact">
        <div>
          <span className="kicker mono text-lime">{t('kicker')}</span>
          <Heading className="display mt-3.5 mb-4 text-[clamp(40px,5vw,66px)] leading-[0.95]">
            {t('title')}
          </Heading>
          <p>{t('body')}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              className="btn btn--primary"
              href={personalInfo.bookingUrl || `mailto:${personalInfo.email}`}
            >
              {t('book')} →
            </a>
            <a
              className="btn contact__ghost"
              href={Links.upwork}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('upwork')} ↗
            </a>
          </div>
        </div>
        <div className="contact__card">
          <div className="contact__row">
            <div>
              <div className="contact__k">{t('email')}</div>
              <a
                className="contact__v link"
                href={`mailto:${personalInfo.email}`}
              >
                {personalInfo.email}
              </a>
            </div>
            <CopyEmail
              email={personalInfo.email}
              copyLabel={t('copy')}
              copiedLabel={t('copied')}
            />
          </div>
          {rows.map(r => (
            <a
              key={r.k}
              className="contact__row contact__row--link"
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>
                <div className="contact__k">{r.k}</div>
                <div className="contact__v">{r.v}</div>
              </div>
              <span aria-hidden="true">↗</span>
            </a>
          ))}
          <div className="contact__row">
            <div>
              <div className="contact__k">{t('localTime')}</div>
              <div className="contact__v">
                {t('city')}
                <LocalClock /> · UTC+5
              </div>
            </div>
            <span className="live-dot" />
          </div>
        </div>
      </div>
    </section>
  );
}
