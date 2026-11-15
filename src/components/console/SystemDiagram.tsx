import { TechIcon } from 'components/shell/TechIcon';
import type { NodeId, SimState } from './simulation';

export interface DiagramLabels {
  users: string;
  rps: string;
  api: string;
  cache: string;
  queue: string;
  workers: string;
  db: string;
  dbSub: string;
  provider: string;
  providerSub: string;
}

const NODES: {
  id: NodeId;
  x: number;
  y: number;
  w: number;
  h: number;
  icon?: string;
}[] = [
  { id: 'users', x: 10, y: 90, w: 72, h: 50 },
  { id: 'api', x: 138, y: 88, w: 82, h: 54, icon: 'nodedotjs' },
  { id: 'cache', x: 282, y: 28, w: 82, h: 50, icon: 'redis' },
  { id: 'queue', x: 282, y: 154, w: 82, h: 50 },
  { id: 'workers', x: 408, y: 154, w: 82, h: 50 },
  { id: 'db', x: 488, y: 94, w: 66, h: 48, icon: 'postgresql' },
  { id: 'provider', x: 466, y: 16, w: 88, h: 48 },
];

const PATHS = {
  p1: 'M82 115 H138',
  p2: 'M220 100 L282 54',
  p3: 'M220 130 L282 178',
  p4: 'M364 178 H408',
  p5: 'M490 178 L512 142',
  p6: 'M505 64 L460 154',
  p7: 'M500 118 L364 56',
};

function Packets({
  path,
  dur,
  count = 1,
  tone = '',
}: {
  path: keyof typeof PATHS;
  dur: number;
  count?: number;
  tone?: string;
}) {
  return Array.from({ length: count }, (_, i) => (
    <circle key={i} className={`pk ${tone}`} r="3.2">
      <animateMotion
        dur={`${dur}s`}
        begin={`${1.2 + (i * dur) / count}s`}
        repeatCount="indefinite"
        path={PATHS[path]}
      />
    </circle>
  ));
}

export function SystemDiagram({
  state,
  labels,
  svgRef,
}: {
  state: SimState;
  labels: DiagramLabels;
  svgRef?: React.Ref<SVGSVGElement>;
}) {
  const sub: Partial<Record<NodeId, string>> = {
    users: labels.rps,
    api: 'Node.js · TS',
    cache: 'Redis',
    queue: 'AWS SQS',
    workers: `Lambda ×${state.metrics.workers}`,
    db: labels.dbSub,
    provider: labels.providerSub,
  };

  return (
    <svg
      ref={svgRef}
      className="sys"
      viewBox="0 0 564 230"
      role="img"
      aria-label={`${labels.users} → ${labels.api} → ${labels.cache} / ${labels.queue} → ${labels.workers} → ${labels.db}; ${labels.provider}`}
    >
      {Object.entries(PATHS).map(([id, d]) => (
        <path key={id} className="wire" d={d} />
      ))}
      <g>
        <Packets path="p1" dur={1.4} count={2} />
        <Packets path="p2" dur={1.2} />
        <Packets path="p3" dur={1.6} />
        <Packets path="p4" dur={1.3} />
        <Packets path="p5" dur={1.3} />
      </g>
      {state.flows.spike && (
        <g>
          <Packets path="p1" dur={0.5} count={3} tone="pk--hot" />
          <Packets path="p3" dur={0.6} count={2} />
        </g>
      )}
      {state.flows.provider && <Packets path="p6" dur={1.8} />}
      {state.flows.fallback && (
        <Packets path="p7" dur={1} count={2} tone="pk--save" />
      )}
      {NODES.map((n, i) => (
        <g
          key={n.id}
          className={`node node--${state.nodes[n.id]}`}
          style={{ '--i': i } as React.CSSProperties}
        >
          <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="10" />
          {n.icon && (
            <g transform={`translate(${n.x + 10} ${n.y + 10})`}>
              <TechIcon slug={n.icon} size={13} />
            </g>
          )}
          <text x={n.x + (n.icon ? 28 : 10)} y={n.y + 21}>
            {labels[n.id]}
          </text>
          <text className="lbl" x={n.x + 10} y={n.y + 37}>
            {sub[n.id]}
          </text>
        </g>
      ))}
    </svg>
  );
}
