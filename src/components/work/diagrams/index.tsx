import type { CaseStudyId } from 'lib/case-studies';
import { Box, DiagramFrame, Wire } from './Diagram';

/** Translated labels from messages `caseStudies.<id>.diagram`. */
export type DiagramLabels = Record<string, string>;

function SafetyDiagram({ l }: { l: DiagramLabels }) {
  return (
    <DiagramFrame label={l.aria}>
      <rect className="bad" x="10" y="186" width="500" height="34" rx="8" />
      <text x="24" y="207" className="sub bad-text">
        {l.before}
      </text>
      <Box x={10} y={24} w={110} h={50} title={l.edit} sub={l.editSub} />
      <Wire d="M120 49 H170" i={0} />
      <Box x={170} y={24} w={90} h={50} title="SQS" sub={l.sqsSub} />
      <Wire d="M260 49 H310" i={1} />
      <Box x={310} y={24} w={90} h={50} title="sync λ" sub={l.syncSub} />
      <Wire d="M400 49 Q440 49 440 96" i={2} />
      <Box
        x={370}
        y={96}
        w={140}
        h={54}
        title="S3 tree.json"
        sub={l.treeSub}
        kind="k"
      />
      <Wire d="M370 123 H250" i={3} />
      <Box x={130} y={100} w={120} h={46} title="read λ → UI" sub={l.readSub} />
    </DiagramFrame>
  );
}

function DonationsDiagram({ l }: { l: DiagramLabels }) {
  return (
    <DiagramFrame label={l.aria}>
      <Box x={10} y={80} w={120} h={56} title={l.old} sub={l.oldSub} />
      <Wire d="M130 108 H180" i={0} />
      <Box x={180} y={80} w={140} h={56} title={l.scripts} sub={l.scriptsSub} />
      <Wire d="M320 108 H370" i={1} />
      <Box
        x={370}
        y={74}
        w={140}
        h={68}
        title={l.new}
        sub={l.newSub}
        kind="k"
      />
      <Box x={180} y={170} w={140} h={44} title={l.cron} sub={l.cronSub} />
      <Wire d="M320 192 Q440 192 440 142" i={2} />
    </DiagramFrame>
  );
}

function PlayerTotalsDiagram({ l }: { l: DiagramLabels }) {
  return (
    <DiagramFrame label={l.aria}>
      <Box x={10} y={92} w={110} h={54} title={l.apis} sub={l.apisSub} />
      <Wire d="M120 119 H160" i={0} />
      <Box x={160} y={92} w={100} h={54} title={l.cron} sub={l.cronSub} />
      <Wire d="M260 110 L310 66" i={1} />
      <Wire d="M260 128 L310 172" i={1} />
      <Box x={310} y={36} w={110} h={50} title="Redis" sub={l.redisSub} />
      <Box
        x={310}
        y={152}
        w={110}
        h={50}
        title="MongoDB"
        sub={l.mongoSub}
        kind="k"
      />
      <Wire d="M420 61 L456 108" i={2} />
      <Wire d="M420 177 L456 132" i={2} />
      <Box x={450} y={96} w={60} h={46} title={l.fans} />
    </DiagramFrame>
  );
}

export const DIAGRAMS: Record<
  CaseStudyId,
  (props: { l: DiagramLabels }) => React.ReactElement
> = {
  safety: SafetyDiagram,
  donations: DonationsDiagram,
  playertotals: PlayerTotalsDiagram,
};
