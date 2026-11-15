// "Plain English" vs "Engineering" reading mode. Stored per visitor; never required.

export type ViewMode = 'plain' | 'tech';

export const VIEW_MODE_KEY = 'view-mode';

export function writeMode(mode: ViewMode) {
  document.documentElement.dataset.mode = mode;
  try {
    localStorage.setItem(VIEW_MODE_KEY, mode);
  } catch {
    // Private mode or blocked storage: the mode still applies for this visit.
  }
}

// Runs inline in <head> before paint, so the stored mode never flashes.
export const viewModeScript = `try{document.documentElement.dataset.mode=localStorage.getItem('${VIEW_MODE_KEY}')==='tech'?'tech':'plain'}catch(e){document.documentElement.dataset.mode='plain'}`;
