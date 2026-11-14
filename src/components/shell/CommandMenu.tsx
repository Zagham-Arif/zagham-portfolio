'use client';

import { caseStudies, type CaseStudyId } from 'lib/case-studies';
import { filterCommands } from 'lib/commands';
import { personalInfo } from 'lib/data';
import {
  CMDK_OPEN,
  CONSOLE_RUN,
  emit,
  leaveHandoff,
  listen,
  WORK_SELECT,
} from 'lib/events';
import { writeMode } from 'lib/view-mode';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { otherLocalePath, useToggleTheme } from './Nav';

interface Command {
  id: string;
  label: string;
  group: string;
  run: () => unknown;
}

export function CommandMenu() {
  const t = useTranslations('home.cmdk');
  const tc = useTranslations('caseStudies');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { setTheme } = useTheme();
  const toggleTheme = useToggleTheme();
  const dialog = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const [toast, setToast] = useState('');

  // On another page, the follow-up action is handed to the home page's console
  // or explorer, which pick it up when they mount.
  const goTo = (
    id: string,
    then?: () => void,
    handoff?: [key: string, value: string]
  ) => {
    const el = document.getElementById(id);
    if (!el) {
      if (handoff) leaveHandoff(...handoff);
      router.push(`/${locale}#${id}`);
      return;
    }
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    then?.();
  };
  const g = (key: string) => t(`groups.${key}`);
  const resume =
    personalInfo.cvUrls.traditional || personalInfo.cvUrls.europass;

  const commands: Command[] = [
    {
      id: 'copy',
      label: t('items.copyEmail'),
      group: g('action'),
      run: async () => {
        try {
          await navigator.clipboard.writeText(personalInfo.email);
          setToast(t('copied'));
          window.setTimeout(() => setToast(''), 1800);
        } catch {
          window.location.assign(`mailto:${personalInfo.email}`);
        }
      },
    },
    {
      id: 'book',
      label: t('items.book'),
      group: g('action'),
      run: () =>
        personalInfo.bookingUrl
          ? window.open(personalInfo.bookingUrl, '_blank', 'noopener')
          : goTo('contact'),
    },
    ...(['work', 'skills', 'experience', 'contact'] as const).map(id => ({
      id,
      label: t(`items.${id}`),
      group: g('jump'),
      run: () => goTo(id),
    })),
    ...(['plain', 'tech'] as const).map(mode => ({
      id: mode,
      label: t(`items.${mode}`),
      group: g('view'),
      run: () => writeMode(mode),
    })),
    {
      id: 'theme',
      label: t('items.theme'),
      group: g('view'),
      run: () => toggleTheme(),
    },
    {
      id: 'system',
      label: t('items.system'),
      group: g('view'),
      run: () => setTheme('system'),
    },
    {
      id: 'language',
      label: t('items.language'),
      group: g('language'),
      run: () => router.push(otherLocalePath(pathname, locale)),
    },
    ...(resume
      ? [
          {
            id: 'resume',
            label: t('items.resume'),
            group: g('file'),
            run: () => window.open(resume, '_blank', 'noopener'),
          },
        ]
      : []),
    ...caseStudies.map(cs => ({
      id: `open-${cs.id}`,
      label: t('items.open', { project: tc(`${cs.id}.title`) }),
      group: g('project'),
      run: () =>
        goTo('work', () => emit(WORK_SELECT, cs.id as CaseStudyId), [
          'project',
          cs.id,
        ]),
    })),
    {
      id: 'demo',
      label: t('items.demo'),
      group: g('demo'),
      run: () =>
        goTo(
          'console',
          () => window.setTimeout(() => emit(CONSOLE_RUN, 'provider'), 400),
          ['try', 'provider']
        ),
    },
  ];

  const results = filterCommands(commands, query);
  const active = Math.min(selected, Math.max(results.length - 1, 0));

  const open = () => {
    setQuery('');
    setSelected(0);
    dialog.current?.showModal();
  };
  const close = () => dialog.current?.close();
  const runAt = (i: number) => {
    const cmd = results[i];
    if (!cmd) return;
    close();
    cmd.run();
  };

  useEffect(() => listen(CMDK_OPEN, open), []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (dialog.current?.open) close();
        else open();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected((active + 1) % Math.max(results.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected((active - 1 + results.length) % Math.max(results.length, 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      runAt(active);
    }
  };

  return (
    <>
      <dialog
        ref={dialog}
        className="cmdk"
        aria-label={t('placeholder')}
        onClick={e => {
          if (e.target === dialog.current) close();
        }}
      >
        <input
          className="cmdk__input"
          placeholder={t('placeholder')}
          value={query}
          autoFocus
          role="combobox"
          aria-expanded="true"
          aria-controls="cmdk-list"
          aria-activedescendant={
            results[active] ? `cmd-${results[active].id}` : undefined
          }
          onChange={e => {
            setQuery(e.target.value);
            setSelected(0);
          }}
          onKeyDown={onInputKey}
        />
        <ul id="cmdk-list" role="listbox" className="cmdk__list">
          {results.length === 0 && (
            <li className="cmdk__empty">{t('empty')}</li>
          )}
          {results.map((cmd, i) => (
            <li
              key={cmd.id}
              id={`cmd-${cmd.id}`}
              role="option"
              aria-selected={i === active}
              className="cmdk__item"
              onMouseMove={() => setSelected(i)}
              onClick={() => runAt(i)}
            >
              {cmd.label}
              <span className="mono" aria-hidden="true">
                {cmd.group}
              </span>
            </li>
          ))}
        </ul>
        <p className="cmdk__hint mono">{t('hint')}</p>
      </dialog>
      <p
        role="status"
        className="cmdk-toast"
        data-show={toast ? 'true' : 'false'}
      >
        {toast}
      </p>
    </>
  );
}
