import type { ReactNode } from 'react';

// Renders both readings; CSS on html[data-mode] shows the active one, so the
// page reads correctly before hydration and with JavaScript off.
export function ModeText({
  plain,
  tech,
}: {
  plain: ReactNode;
  tech: ReactNode;
}) {
  return (
    <>
      <span className="mode-plain">{plain}</span>
      <span className="mode-tech">{tech}</span>
    </>
  );
}
