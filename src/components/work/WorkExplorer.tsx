'use client';

import { CountUp } from 'components/hero/CountUp';
import { ModeText } from 'components/shell/ModeText';
import { TechIcon } from 'components/shell/TechIcon';
import type { CaseStudyId, ScenarioId } from 'lib/case-studies';
import {
  CONSOLE_RUN,
  emit,
  listen,
  SKILL_FILTER,
  takeHandoff,
  WORK_SELECT,
} from 'lib/events';
import { stackLanes, type Lane } from 'lib/lanes';
import { usesSkill } from 'lib/skills';
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
} from 'react';

const WIDE = '(min-width: 1024px)';
const subscribeWide = (onChange: () => void) => {
  const mq = window.matchMedia(WIDE);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
};
import { DIAGRAMS, type DiagramLabels } from './diagrams';
import { MiniDiagram } from './MiniDiagram';

type Dual = { plain: string; tech: string };

export interface ExplorerItem {
  id: CaseStudyId;
  category: string;
  title: string;
  result: string;
  problem: Dual;
  did: Dual;
  changed: Dual;
  kpis: { value: string; label: string; pending?: boolean }[];
  /** slug: simple-icons slug, null for an AWS badge, undefined for no icon. */
  tags: { label: string; slug?: string | null }[];
  technologies: string[];
  scenario: ScenarioId;
  diagram: DiagramLabels;
}

export interface ProjectRow {
  id: string;
  title: string;
  /** First sentence of the description: what it is and what it did. */
  summary: string;
  /** Short "domain · industry" label. */
  kind: string;
  technologies: string[];
  liveUrl?: string;
}

export interface ExplorerLabels {
  problem: string;
  did: string;
  changed: string;
  tryIt: string;
  pendingNote: string;
  filterLabel: string;
  clearFilter: string;
  rowsTitle: string;
  visit: string;
  lanes: Record<Lane, string>;
}

export function WorkExplorer({
  items,
  rows,
  labels,
}: {
  items: ExplorerItem[];
  rows: ProjectRow[];
  labels: ExplorerLabels;
}) {
  const [current, setCurrent] = useState(0);
  const [filter, setFilter] = useState<{ id: string; label: string } | null>(
    null
  );
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  // Tabs stack vertically beside the panel from 1024px, and form a row below.
  const wide = useSyncExternalStore(
    subscribeWide,
    () => window.matchMedia(WIDE).matches,
    () => true
  );

  useEffect(
    () =>
      listen(SKILL_FILTER, next => {
        setFilter(next);
        if (!next) return;
        const match = items.findIndex(i => usesSkill(i.technologies, next.id));
        if (match >= 0) setCurrent(match);
      }),
    [items]
  );

  useEffect(
    () =>
      listen(WORK_SELECT, id => {
        const i = items.findIndex(item => item.id === id);
        if (i >= 0) setCurrent(i);
        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
      }),
    [items]
  );

  // Arriving from the ⌘K menu on another page.
  useEffect(() => {
    const id = takeHandoff('project');
    if (id && items.some(item => item.id === id)) {
      emit(WORK_SELECT, id as CaseStudyId);
    }
  }, [items]);

  const dim = (tech: string[]) => !!filter && !usesSkill(tech, filter.id);

  const onKey = (e: KeyboardEvent) => {
    const last = items.length - 1;
    const next =
      e.key === 'ArrowDown' || e.key === 'ArrowRight'
        ? current === last
          ? 0
          : current + 1
        : e.key === 'ArrowUp' || e.key === 'ArrowLeft'
          ? current === 0
            ? last
            : current - 1
          : e.key === 'Home'
            ? 0
            : e.key === 'End'
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    setCurrent(next);
    tabs.current[next]?.focus();
  };

  const tryIt = (scenario: ScenarioId) => {
    document
      .getElementById('console')
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    window.setTimeout(() => emit(CONSOLE_RUN, scenario), 500);
  };

  const item = items[current];
  const Diagram = DIAGRAMS[item.id];
  const story = [
    [labels.problem, item.problem],
    [labels.did, item.did],
    [labels.changed, item.changed],
  ] as const;

  return (
    <>
      {filter && (
        <p className="pill mono mb-3.5">
          {labels.filterLabel.replace('{skill}', filter.label)} ·
          <button
            type="button"
            className="link text-brand"
            onClick={() => emit(SKILL_FILTER, null)}
          >
            {labels.clearFilter}
          </button>
        </p>
      )}

      <div className="explorer">
        <div
          role="tablist"
          aria-orientation={wide ? 'vertical' : 'horizontal'}
          className="explorer__tabs"
          onKeyDown={onKey}
        >
          {items.map((it, i) => (
            <button
              key={it.id}
              ref={el => {
                tabs.current[i] = el;
              }}
              id={`tab-${it.id}`}
              role="tab"
              type="button"
              aria-selected={i === current}
              aria-controls="work-panel"
              tabIndex={i === current ? 0 : -1}
              className={`explorer__tab ${dim(it.technologies) ? 'is-dim' : ''}`}
              onClick={() => setCurrent(i)}
            >
              <span className="mono text-faint">{it.category}</span>
              <b>{it.title}</b>
              <span className="explorer__result">{it.result}</span>
            </button>
          ))}
        </div>

        <div
          id="work-panel"
          role="tabpanel"
          aria-labelledby={`tab-${item.id}`}
          className="explorer__panel card"
        >
          <div key={item.id} className="panel-in">
            <div className="px-[30px] pt-7">
              <span className="mono text-brand uppercase">{item.category}</span>
              <h3 className="font-display mt-2.5 mb-[18px] text-[clamp(26px,3vw,34px)] leading-[1.05] font-extrabold tracking-tight">
                {item.title}
              </h3>
              <div className="story">
                {story.map(([label, text]) => (
                  <div key={label}>
                    <span className="mono">{label}</span>
                    <ModeText plain={text.plain} tech={text.tech} />
                  </div>
                ))}
              </div>
            </div>
            <div className="cs-art">
              <Diagram l={item.diagram} />
            </div>
            <dl className="kpis">
              {item.kpis.map(kpi => (
                <div key={kpi.label} className="kpi">
                  <dt>{kpi.label}</dt>
                  <dd>
                    {/^\d+$/.test(kpi.value) ? (
                      <CountUp value={Number(kpi.value)} />
                    ) : (
                      kpi.value
                    )}
                    {kpi.pending && <sup aria-hidden="true">*</sup>}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-wrap items-center justify-between gap-3 px-[30px] pt-5 pb-6">
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map(tag => (
                  <span key={tag.label} className="tag" translate="no">
                    {tag.slug !== undefined && (
                      <TechIcon slug={tag.slug} size={12} />
                    )}
                    {tag.label}
                  </span>
                ))}
              </div>
              <button
                type="button"
                className="link text-brand text-sm font-semibold"
                onClick={() => tryIt(item.scenario)}
              >
                {labels.tryIt} ↑
              </button>
            </div>
            {item.kpis.some(k => k.pending) && (
              <p className="mono text-faint px-[30px] pb-5">
                * {labels.pendingNote}
              </p>
            )}
          </div>
        </div>
      </div>

      {rows.length > 0 && (
        <>
          <h3 className="font-display mt-12 mb-1 text-xl font-bold">
            {labels.rowsTitle}
          </h3>
          <ul className="project-grid">
            {rows.map(row => (
              <li
                key={row.id}
                className={`card project-card ${row.liveUrl ? 'lift' : ''} ${dim(row.technologies) ? 'is-dim' : ''}`}
              >
                <div className="project-card__panel">
                  <MiniDiagram
                    lanes={stackLanes(row.technologies)}
                    laneLabels={labels.lanes}
                  />
                </div>
                <div className="project-card__body">
                  <p className="mono text-brand m-0 uppercase">{row.kind}</p>
                  <h4 className="font-display mt-2 mb-2 text-lg leading-snug font-bold">
                    {row.liveUrl ? (
                      <a
                        className="project-card__link"
                        href={row.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {row.title}
                        <span className="text-brand"> ↗</span>
                        <span className="sr-only"> ({labels.visit})</span>
                      </a>
                    ) : (
                      row.title
                    )}
                  </h4>
                  <p className="m-0 text-[15px] leading-relaxed">
                    {row.summary}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
