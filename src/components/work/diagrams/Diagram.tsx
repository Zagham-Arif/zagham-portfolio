// Shared building blocks for the three case-study diagrams: boxes, wires that
// draw themselves in, and packets that start once the wires are drawn.

export function Box({
  x,
  y,
  w,
  h,
  title,
  sub,
  kind = 'n',
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub?: string;
  kind?: 'n' | 'k' | 'bad';
}) {
  return (
    <g>
      <rect className={kind} x={x} y={y} width={w} height={h} rx="10" />
      <text x={x + 14} y={y + h / 2 - (sub ? 3 : -4)}>
        {title}
      </text>
      {sub && (
        <text className="sub" x={x + 14} y={y + h / 2 + 13}>
          {sub}
        </text>
      )}
    </g>
  );
}

export function Wire({ d, i = 0 }: { d: string; i?: number }) {
  return (
    <>
      <path
        className="w"
        d={d}
        pathLength={1}
        style={{ '--i': i } as React.CSSProperties}
      />
      <circle className="pk" r="3.2">
        <animateMotion
          dur="1.3s"
          begin={`${0.9 + i * 0.25}s`}
          repeatCount="3"
          path={d}
        />
      </circle>
    </>
  );
}

export function DiagramFrame({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      className="cs-diagram"
      viewBox="0 0 520 225"
      role="img"
      aria-label={label}
    >
      {children}
    </svg>
  );
}
