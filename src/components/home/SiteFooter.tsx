import { LanguageLink, ThemeToggle } from 'components/shell/Nav';
import { Links } from 'constants/links';
import { personalInfo } from 'lib/data';
import { getLocale, getTranslations } from 'next-intl/server';
import Link from 'next/link';

export async function SiteFooter() {
  const t = await getTranslations('home.footer');
  const tNav = await getTranslations('home.nav');
  const locale = await getLocale();

  const pages = [
    { href: `/${locale}#work`, label: tNav('work') },
    { href: `/${locale}#skills`, label: tNav('skills') },
    { href: `/${locale}#experience`, label: tNav('experience') },
    { href: `/${locale}#contact`, label: tNav('contact') },
    { href: `/${locale}/projects`, label: t('allProjects') },
  ];
  const contact = [
    { href: `mailto:${personalInfo.email}`, label: t('email') },
    ...(personalInfo.bookingUrl
      ? [{ href: personalInfo.bookingUrl, label: t('bookCall') }]
      : []),
    { href: Links.linkedIn, label: 'LinkedIn' },
    { href: Links.github, label: 'GitHub' },
    { href: Links.upwork, label: 'Upwork' },
  ];

  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div>
          <p className="font-display m-0 text-lg font-bold">Zagham Arif</p>
          <p className="text-muted-ink m-0 mt-1 text-sm">{tNav('role')}</p>
          <p className="text-muted-ink m-0 mt-3 text-sm">{t('built')}</p>
        </div>
        <nav aria-label={t('pages')}>
          <h2 className="site-footer__h">{t('pages')}</h2>
          <ul>
            {pages.map(p => (
              <li key={p.href}>
                <Link className="link" href={p.href}>
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="site-footer__h">{t('contact')}</h2>
          <ul>
            {contact.map(c => (
              <li key={c.href}>
                <a
                  className="link"
                  href={c.href}
                  {...(c.href.startsWith('http')
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="site-footer__h">{t('settings')}</h2>
          <div className="flex gap-2">
            <LanguageLink />
            <ThemeToggle />
          </div>
        </div>
      </div>
      <div className="site-footer__legal">
        <span>{t('rights', { year: new Date().getFullYear() })}</span>
        <a
          className="link"
          href={Links.source}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('source')} ↗
        </a>
        <span className="mono hidden sm:inline">{t('hint')}</span>
      </div>
    </footer>
  );
}
