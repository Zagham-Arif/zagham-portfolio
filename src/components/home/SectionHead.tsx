import type { ReactNode } from 'react';

export function SectionHead({
  kicker,
  title,
  intro,
  headingLevel = 2,
}: {
  kicker: string;
  title: string;
  intro?: ReactNode;
  headingLevel?: 1 | 2;
}) {
  const Heading = headingLevel === 1 ? 'h1' : 'h2';
  return (
    <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
      <div>
        <span className="kicker mono">{kicker}</span>
        <Heading className="display mt-3 mb-3.5 text-[clamp(36px,4.6vw,56px)] leading-none">
          {title}
        </Heading>
      </div>
      {intro && <p className="text-muted-ink m-0 max-w-[430px]">{intro}</p>}
    </div>
  );
}
