'use client';

import { CMDK_OPEN, emit } from 'lib/events';
import { writeMode, type ViewMode } from 'lib/view-mode';
import { Moon, Sun } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSyncExternalStore } from 'react';

function subscribeMode(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-mode'],
  });
  return () => observer.disconnect();
}

export function useViewMode(): ViewMode {
  return useSyncExternalStore(
    subscribeMode,
    () => (document.documentElement.dataset.mode === 'tech' ? 'tech' : 'plain'),
    () => 'plain'
  );
}

export function useToggleTheme() {
  const { resolvedTheme, setTheme } = useTheme();
  return (origin?: HTMLElement | null) => {
    const next = resolvedTheme === 'dark' ? 'light' : 'dark';
    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (!document.startViewTransition || reduce) {
      setTheme(next);
      return;
    }
    const box = origin?.getBoundingClientRect();
    const root = document.documentElement.style;
    root.setProperty(
      '--vt-x',
      `${box ? box.left + box.width / 2 : innerWidth}px`
    );
    root.setProperty('--vt-y', `${box ? box.top + box.height / 2 : 0}px`);
    document.startViewTransition(() => setTheme(next));
  };
}

export function otherLocalePath(pathname: string, locale: string) {
  const other = locale === 'en' ? 'es' : 'en';
  return pathname.replace(/^\/(en|es)(?=\/|$)/, `/${other}`) || `/${other}`;
}

export function LanguageLink({
  className = 'icon-btn',
}: {
  className?: string;
}) {
  const t = useTranslations('home.nav');
  const locale = useLocale();
  const pathname = usePathname();
  return (
    <Link
      href={otherLocalePath(pathname, locale)}
      hrefLang={locale === 'en' ? 'es' : 'en'}
      className={className}
      aria-label={t('otherLanguage')}
    >
      {t('otherLanguageShort')}
    </Link>
  );
}

export function ThemeToggle() {
  const t = useTranslations('home.nav');
  const toggleTheme = useToggleTheme();
  return (
    <button
      type="button"
      className="icon-btn"
      aria-label={t('themeToggle')}
      onClick={e => toggleTheme(e.currentTarget)}
    >
      <Moon className="size-4 dark:hidden" aria-hidden="true" />
      <Sun className="hidden size-4 dark:block" aria-hidden="true" />
    </button>
  );
}

export function Nav() {
  const t = useTranslations('home.nav');
  const locale = useLocale();
  const mode = useViewMode();

  return (
    <header className="border-rule bg-bg/85 sticky top-0 z-30 border-b backdrop-blur-md">
      <div className="mx-auto flex max-w-[1200px] items-center gap-2 px-4 py-3 sm:gap-4 sm:px-6">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2.5 font-semibold whitespace-nowrap"
          aria-label="Zagham Arif"
        >
          <span className="font-display bg-ink text-bg relative grid size-[34px] place-items-center rounded-[10px] text-sm">
            ZA
            <span className="border-bg bg-lime absolute -top-0.5 -right-0.5 size-[9px] rounded-full border-2" />
          </span>
          <span className="hidden min-[420px]:block">
            Zagham Arif
            <small className="mono text-muted-ink hidden text-[11px] font-normal uppercase sm:block">
              {t('role')}
            </small>
          </span>
        </Link>

        <nav aria-label={t('mainNav')} className="ml-auto hidden gap-5 lg:flex">
          {(['work', 'skills', 'experience', 'contact'] as const).map(id => (
            <a
              key={id}
              href={`/${locale}#${id}`}
              className="mono link text-muted-ink hover:text-brand uppercase"
            >
              {t(id)}
            </a>
          ))}
        </nav>

        <div
          role="group"
          aria-label={t('modeLabel')}
          className="border-rule bg-surface ml-auto inline-flex rounded-[10px] border p-[3px] lg:ml-0"
        >
          {(['plain', 'tech'] as const).map(m => (
            <button
              key={m}
              type="button"
              aria-pressed={mode === m}
              onClick={() => writeMode(m)}
              className="text-muted-ink aria-pressed:bg-brand min-h-[30px] rounded-[7px] px-2.5 text-xs font-semibold whitespace-nowrap aria-pressed:text-white"
            >
              <span className="hidden sm:inline">{t(m)}</span>
              <span className="sm:hidden">{t(`${m}Short`)}</span>
            </button>
          ))}
        </div>

        <button
          type="button"
          className="icon-btn hidden sm:inline-grid"
          aria-label={t('commandMenu')}
          onClick={() => emit(CMDK_OPEN, null)}
        >
          ⌘K
        </button>
        <LanguageLink />
        <ThemeToggle />
        <a
          href={`/${locale}#contact`}
          className="btn btn--primary btn--sm hidden md:inline-flex"
        >
          {t('hire')} ↗
        </a>
      </div>
    </header>
  );
}
