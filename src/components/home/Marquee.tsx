import { TechIcon } from 'components/shell/TechIcon';
import { skills } from 'lib/stack';

// Decorative: the stack map below lists the same skills accessibly.
export function Marquee() {
  const row = (copy: number) =>
    skills.map(s => (
      <span key={`${copy}-${s.id}`} className="marquee__chip" translate="no">
        <TechIcon slug={s.slug} />
        {s.label}
      </span>
    ));
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {row(0)}
        {row(1)}
      </div>
    </div>
  );
}
