'use client';

import { CountUp } from 'components/hero/CountUp';
import { ModeText } from 'components/shell/ModeText';
import type { ScenarioId } from 'lib/case-studies';
import { CONSOLE_RUN, listen, takeHandoff } from 'lib/events';
import { Pause, Play, RotateCcw } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';
import { SystemDiagram } from './SystemDiagram';
import {
  BASELINE,
  runToEnd,
  SCENARIOS,
  type SimState,
  type Step,
} from './simulation';

const SCENARIO_IDS: ScenarioId[] = ['spike', 'provider', 'duplicate'];
const ICONS: Record<ScenarioId, string> = {
  spike: '⚡',
  provider: '✕',
  duplicate: '↻',
};
const METRICS = ['latency', 'queue', 'workers', 'failed'] as const;

export function Console() {
  const t = useTranslations('home.console');
  const locale = useLocale();
  const [state, setState] = useState<SimState>(BASELINE);
  const [active, setActive] = useState<ScenarioId | null>(null);
  const [paused, setPaused] = useState(false);
  // Scheduled scenario steps; `due` lets pause hold the rest and resume later.
  const pending = useRef<{ timer: number; due: number; step: Step }[]>([]);
  const held = useRef<{ left: number; step: Step }[]>([]);
  const svg = useRef<SVGSVGElement>(null);

  const schedule = (step: Step, delay: number) => {
    const entry = { timer: 0, due: performance.now() + delay, step };
    entry.timer = window.setTimeout(() => {
      pending.current = pending.current.filter(p => p !== entry);
      setState(s => step.patch(s));
    }, delay);
    pending.current.push(entry);
  };

  const clear = () => {
    pending.current.forEach(p => window.clearTimeout(p.timer));
    pending.current = [];
    held.current = [];
  };

  const resumeMotion = () => {
    svg.current?.unpauseAnimations();
    setPaused(false);
  };

  const run = useCallback((id: ScenarioId) => {
    clear();
    resumeMotion();
    setActive(id);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setState(runToEnd(id));
      return;
    }
    setState(s => ({
      ...BASELINE,
      log: [{ ...BASELINE.log[0], n: s.log[0].n + 1 }],
    }));
    for (const step of SCENARIOS[id]) schedule(step, step.at);
  }, []);

  const reset = () => {
    clear();
    setActive(null);
    setState(s => ({
      ...BASELINE,
      log: [{ key: 'reset', tone: 'ok', n: s.log[0].n + 1 }],
    }));
  };

  const togglePause = () => {
    if (paused) {
      const steps = held.current;
      held.current = [];
      steps.forEach(h => schedule(h.step, h.left));
      resumeMotion();
      return;
    }
    const now = performance.now();
    held.current = pending.current.map(p => ({
      left: Math.max(0, p.due - now),
      step: p.step,
    }));
    pending.current.forEach(p => window.clearTimeout(p.timer));
    pending.current = [];
    svg.current?.pauseAnimations();
    setPaused(true);
  };

  useEffect(() => listen(CONSOLE_RUN, run), [run]);
  // Arriving from the ⌘K demo on another page.
  useEffect(() => {
    const id = takeHandoff('try') as ScenarioId | null;
    if (!id || !SCENARIO_IDS.includes(id)) return;
    const timer = window.setTimeout(() => run(id), 900);
    return () => window.clearTimeout(timer);
  }, [run]);
  useEffect(() => clear, []);

  const values: Record<(typeof METRICS)[number], string | number> = {
    latency: state.metrics.latencyMs,
    queue: state.metrics.queue,
    workers: state.metrics.workers,
    failed: state.metrics.failed,
  };

  return (
    <div
      id="console"
      className={`console enter-settle ${paused ? 'is-paused' : ''}`}
    >
      <div className="console__bar">
        <i style={{ background: '#f87171' }} />
        <i style={{ background: '#fbbf24' }} />
        <i style={{ background: '#84cc16' }} />
        <span className="mono console__title">
          <ModeText plain={t('title.plain')} tech={t('title.tech')} />
        </span>
        <span className="mono console__live">● {t('live')}</span>
      </div>

      <dl className="console__metrics mono">
        {METRICS.map(m => (
          <div key={m}>
            <dt>
              <ModeText
                plain={t(`metrics.${m}.plain`)}
                tech={t(`metrics.${m}.tech`)}
              />
            </dt>
            <dd
              className={
                (m === 'queue' && state.nodes.queue === 'hot') ||
                (m === 'latency' && state.metrics.latencyMs > 50) ||
                (m === 'workers' && state.metrics.workers > 2)
                  ? 'is-hot'
                  : ''
              }
            >
              <CountUp value={Number(values[m])} />
              {m === 'latency' && 'ms'}
            </dd>
          </div>
        ))}
      </dl>

      <SystemDiagram
        svgRef={svg}
        state={state}
        labels={{
          users: t('nodes.users'),
          rps: t('nodes.rps', {
            count: new Intl.NumberFormat(locale).format(state.metrics.rps),
          }),
          api: t('nodes.api'),
          cache: t('nodes.cache'),
          queue: t('nodes.queue'),
          workers: t('nodes.workers'),
          db: t('nodes.db'),
          dbSub: t('nodes.dbSub'),
          provider: t('nodes.provider'),
          providerSub: t('nodes.providerSub'),
        }}
      />

      <div className="console__scenarios">
        {SCENARIO_IDS.map(id => (
          <button
            key={id}
            id={`scenario-${id}`}
            type="button"
            aria-pressed={active === id}
            onClick={() => run(id)}
          >
            <span aria-hidden="true">{ICONS[id]}</span>{' '}
            <ModeText
              plain={t(`scenarios.${id}.label.plain`)}
              tech={t(`scenarios.${id}.label.tech`)}
            />
            <small className="mono">{t(`scenarios.${id}.from`)}</small>
          </button>
        ))}
      </div>

      <ol className="console__log mono" aria-live="polite">
        {state.log.map(line => (
          <li key={line.n} className={line.tone}>
            <ModeText
              plain={t(`log.${line.key}.plain`)}
              tech={t(`log.${line.key}.tech`)}
            />
          </li>
        ))}
      </ol>

      <div className="console__foot">
        <span>{t('footnote')}</span>
        <span className="console__controls">
          <button type="button" onClick={reset} aria-label={t('reset')}>
            <RotateCcw className="size-3.5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={togglePause}
            aria-label={paused ? t('play') : t('pause')}
            className="console__pause"
          >
            {paused ? (
              <Play className="size-3.5" aria-hidden="true" />
            ) : (
              <Pause className="size-3.5" aria-hidden="true" />
            )}
          </button>
        </span>
      </div>
    </div>
  );
}
