// Window events the client islands use to talk to each other without a shared provider.
import type { CaseStudyId, ScenarioId } from './case-studies';

export const CONSOLE_RUN = 'console:run';
export const SKILL_FILTER = 'skill:filter';
export const CMDK_OPEN = 'cmdk:open';
export const WORK_SELECT = 'work:select';

export interface EventDetails {
  [CONSOLE_RUN]: ScenarioId;
  [SKILL_FILTER]: { id: string; label: string } | null;
  [CMDK_OPEN]: null;
  [WORK_SELECT]: CaseStudyId;
}

export function emit<K extends keyof EventDetails>(
  name: K,
  detail: EventDetails[K]
) {
  window.dispatchEvent(new CustomEvent(name, { detail }));
}

export function listen<K extends keyof EventDetails>(
  name: K,
  handler: (detail: EventDetails[K]) => void
): () => void {
  const fn = (e: Event) => handler((e as CustomEvent<EventDetails[K]>).detail);
  window.addEventListener(name, fn);
  return () => window.removeEventListener(name, fn);
}

// One-shot handoff across a client-side navigation (e.g. ⌘K on /projects →
// home page console). Storage may be blocked; then the action is simply skipped.
const HANDOFF_PREFIX = 'handoff:';

export function leaveHandoff(key: string, value: string) {
  try {
    sessionStorage.setItem(HANDOFF_PREFIX + key, value);
  } catch {}
}

export function takeHandoff(key: string): string | null {
  try {
    const value = sessionStorage.getItem(HANDOFF_PREFIX + key);
    sessionStorage.removeItem(HANDOFF_PREFIX + key);
    return value;
  } catch {
    return null;
  }
}
