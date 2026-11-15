// The "try to break it" console's state machine. Pure: every step returns a new
// state, so the component can cancel a running scenario and restart from BASELINE.
import type { ScenarioId } from 'lib/case-studies';

export type NodeId =
  'users' | 'api' | 'cache' | 'queue' | 'workers' | 'db' | 'provider';
export type NodeState = 'idle' | 'hot' | 'down' | 'save';
export type Tone = 'ok' | 'warn' | 'err';

export interface SimState {
  metrics: {
    latencyMs: number;
    queue: number;
    workers: number;
    failed: number;
    rps: number;
  };
  nodes: Record<NodeId, NodeState>;
  flows: { spike: boolean; provider: boolean; fallback: boolean };
  /** Newest first; `key` is a leaf under home.console.log, `n` a running id for list keys. */
  log: { key: string; tone: Tone; n: number }[];
}

export interface Step {
  at: number;
  patch: (s: SimState) => SimState;
}

const MAX_LOG = 6;

export const BASELINE: SimState = Object.freeze({
  metrics: { latencyMs: 42, queue: 3, workers: 2, failed: 0, rps: 120 },
  nodes: {
    users: 'idle',
    api: 'idle',
    cache: 'idle',
    queue: 'idle',
    workers: 'idle',
    db: 'idle',
    provider: 'idle',
  },
  flows: { spike: false, provider: true, fallback: false },
  log: [{ key: 'healthy', tone: 'ok', n: 0 }],
}) as SimState;

function step(
  at: number,
  change: {
    metrics?: Partial<SimState['metrics']>;
    nodes?: Partial<SimState['nodes']>;
    flows?: Partial<SimState['flows']>;
    log?: [string, Tone];
  }
): Step {
  return {
    at,
    patch: s => ({
      metrics: { ...s.metrics, ...change.metrics },
      nodes: { ...s.nodes, ...change.nodes },
      flows: { ...s.flows, ...change.flows },
      log: change.log
        ? [
            { key: change.log[0], tone: change.log[1], n: s.log[0].n + 1 },
            ...s.log,
          ].slice(0, MAX_LOG)
        : s.log,
    }),
  };
}

export const SCENARIOS: Record<ScenarioId, Step[]> = {
  spike: [
    step(0, {
      metrics: { queue: 418, latencyMs: 61, rps: 1200 },
      nodes: { users: 'hot', queue: 'hot' },
      flows: { spike: true },
      log: ['spikeIn', 'warn'],
    }),
    step(900, {
      metrics: { workers: 8 },
      nodes: { workers: 'save' },
      log: ['spikeScale', 'ok'],
    }),
    step(2300, {
      metrics: { queue: 12, latencyMs: 48 },
      nodes: { queue: 'save' },
      log: ['spikeDone', 'ok'],
    }),
  ],
  provider: [
    step(0, {
      nodes: { provider: 'down', cache: 'save', db: 'save' },
      flows: { provider: false, fallback: true },
      log: ['providerDown', 'err'],
    }),
    step(700, { log: ['providerFallback', 'ok'] }),
    step(1400, { metrics: { failed: 0 }, log: ['providerDone', 'ok'] }),
  ],
  duplicate: [
    step(0, { log: ['dupFirst', 'ok'] }),
    step(700, { log: ['dupSecond', 'warn'] }),
    step(1400, { log: ['dupDone', 'ok'] }),
  ],
};

export function runToEnd(id: ScenarioId, from: SimState = BASELINE): SimState {
  return SCENARIOS[id].reduce((s, st) => st.patch(s), from);
}
