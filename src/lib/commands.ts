export function filterCommands<T extends { label: string; group: string }>(
  commands: T[],
  query: string
): T[] {
  const q = query.trim().toLowerCase();
  if (!q) return commands;
  return commands.filter(c =>
    `${c.label} ${c.group}`.toLowerCase().includes(q)
  );
}
