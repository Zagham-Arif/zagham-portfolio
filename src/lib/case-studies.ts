// The three featured projects told as case studies. Copy lives in
// messages/*.json under `caseStudies.<id>`; this file holds the facts and wiring.

export type ScenarioId = 'spike' | 'provider' | 'duplicate';

export type CaseStudyId = 'safety' | 'donations' | 'playertotals';

export interface CaseStudy {
  id: CaseStudyId;
  /** The matching entry in `projects` (data.ts), used for technologies. */
  projectId: string;
  /** The console scenario that demonstrates this project's pattern. */
  scenario: ScenarioId;
  /** Values only; labels are `caseStudies.<id>.kpis[i]`. `pending` marks a number Zagham still has to confirm. */
  kpis: { value: string; pending?: boolean }[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'safety',
    projectId: 'safety-compliance-platform',
    scenario: 'spike',
    // TODO(zagham): replace "instant" with the measured load time after the S3 change.
    kpis: [
      { value: '3–4 min → instant', pending: true },
      { value: '~30%' },
      { value: '20–30' },
    ],
  },
  {
    id: 'donations',
    projectId: 'recurring-donations-platform',
    scenario: 'duplicate',
    kpis: [{ value: '0' }, { value: '0' }, { value: '0' }],
  },
  {
    id: 'playertotals',
    projectId: 'playertotals',
    scenario: 'provider',
    // TODO(zagham): confirm that rate-limit blocks were really zero.
    kpis: [{ value: '2–3 min' }, { value: '0', pending: true }, { value: '4' }],
  },
];
