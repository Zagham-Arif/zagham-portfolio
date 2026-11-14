'use client';

import { TechIcon } from 'components/shell/TechIcon';
import { emit, SKILL_FILTER } from 'lib/events';
import { useId } from 'react';

// A skill chip that opens a native popover listing where the skill was used,
// with a button that filters the work section by it.
export function SkillButton({
  id,
  label,
  slug,
  usedAt,
  core,
  labels,
}: {
  id: string;
  label: string;
  slug: string | null;
  usedAt: string[];
  /** Core skills appear across the work, so the list is framed as examples. */
  core: boolean;
  labels: {
    heading: string;
    examples: string;
    noRecord: string;
    showWork: string;
    close: string;
  };
}) {
  const popId = `skill-${id}-${useId().replace(/:/g, '')}`;

  const showWork = () => {
    emit(SKILL_FILTER, { id, label });
    document.getElementById(popId)?.hidePopover();
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <button
        type="button"
        className="skill"
        data-skill={id}
        popoverTarget={popId}
      >
        <TechIcon slug={slug} />
        <span translate="no">{label}</span>
      </button>
      <div id={popId} popover="auto" className="skill-pop">
        <p className="mono text-brand m-0 uppercase">
          {core ? labels.examples : labels.heading}
        </p>
        <p className="font-display mt-1 mb-2 text-lg font-bold" translate="no">
          {label}
        </p>
        {usedAt.length > 0 ? (
          <ul className="text-muted-ink m-0 list-disc pl-5 text-sm">
            {usedAt.map(name => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-ink m-0 text-sm">{labels.noRecord}</p>
        )}
        <div className="mt-3 flex gap-2">
          {usedAt.length > 0 && (
            <button
              type="button"
              className="btn btn--sm btn--primary"
              onClick={showWork}
            >
              {labels.showWork} ↓
            </button>
          )}
          <button
            type="button"
            className="btn btn--sm"
            popoverTarget={popId}
            popoverTargetAction="hide"
          >
            {labels.close}
          </button>
        </div>
      </div>
    </>
  );
}
