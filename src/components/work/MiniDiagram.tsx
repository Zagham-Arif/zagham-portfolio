import { TechIcon } from 'components/shell/TechIcon';
import type { Lane } from 'lib/lanes';

// A project's stack drawn as client → service → data lanes, in the same dark
// style as the case-study diagrams. Pulses run along the lines on card hover.

const W = 340;
const NODE_W = 96;
const NODE_H = 32;

type Node = { label: string; slug?: string | null };

function NodeIcon({
  slug,
  x,
  y,
}: {
  slug?: string | null;
  x: number;
  y: number;
}) {
  if (slug === undefined) return null;
  if (slug === null) {
    return (
      <text x={x} y={y + 11} className="mini-aws">
        AWS
      </text>
    );
  }
  return (
    <g transform={`translate(${x} ${y})`}>
      <TechIcon slug={slug} size={14} />
    </g>
  );
}

export function MiniDiagram({
  lanes,
  laneLabels,
}: {
  lanes: { lane: Lane; nodes: Node[] }[];
  laneLabels: Record<Lane, string>;
}) {
  const gap = (W - lanes.length * NODE_W) / (lanes.length + 1);
  const cols = lanes.map((lane, i) => {
    const x = gap + i * (NODE_W + gap);
    const total = lane.nodes.length * NODE_H + (lane.nodes.length - 1) * 12;
    const top = 86 - total / 2;
    return {
      ...lane,
      x,
      ys: lane.nodes.map((_, j) => top + j * (NODE_H + 12)),
    };
  });

  const wires = cols.slice(0, -1).flatMap((col, i) => {
    const next = cols[i + 1];
    return col.ys.flatMap(y1 =>
      next.ys.map(y2 => {
        const x1 = col.x + NODE_W;
        const x2 = next.x;
        const a = y1 + NODE_H / 2;
        const b = y2 + NODE_H / 2;
        const mid = (x1 + x2) / 2;
        return `M${x1} ${a} C${mid} ${a} ${mid} ${b} ${x2} ${b}`;
      })
    );
  });

  return (
    <svg
      className="mini"
      viewBox={`0 0 ${W} 150`}
      role="img"
      aria-label={lanes
        .map(
          l => `${laneLabels[l.lane]}: ${l.nodes.map(n => n.label).join(', ')}`
        )
        .join(' → ')}
    >
      {wires.map((d, i) => (
        <g key={i}>
          <path className="mini-wire" d={d} />
          <path className="mini-flow" d={d} pathLength={1} />
        </g>
      ))}
      {cols.map(col => (
        <g key={col.lane}>
          <text x={col.x} y={22} className="mini-lane">
            {laneLabels[col.lane]}
          </text>
          {col.nodes.map((node, j) => (
            <g key={node.label}>
              <rect
                x={col.x}
                y={col.ys[j]}
                width={NODE_W}
                height={NODE_H}
                rx="8"
                className="mini-node"
              />
              <NodeIcon slug={node.slug} x={col.x + 9} y={col.ys[j] + 9} />
              <text
                x={col.x + (node.slug === undefined ? 10 : 29)}
                y={col.ys[j] + 20}
                className="mini-label notranslate"
              >
                {node.label}
              </text>
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
}
