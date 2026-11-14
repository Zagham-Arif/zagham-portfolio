import assert from 'node:assert/strict';
import { test } from 'node:test';
import { BASELINE, runToEnd, SCENARIOS } from './simulation.ts';

test('spike settles with scaled workers and drained queue', () => {
  const s = runToEnd('spike');
  assert.deepEqual(s.metrics, {
    latencyMs: 48,
    queue: 12,
    workers: 8,
    failed: 0,
    rps: 1200,
  });
});

test('provider outage serves the fallback with zero failures', () => {
  const s = runToEnd('provider');
  assert.equal(s.nodes.provider, 'down');
  assert.equal(s.flows.fallback, true);
  assert.equal(s.flows.provider, false);
  assert.equal(s.metrics.failed, 0);
});

test('patches never mutate BASELINE, so a new scenario after a partial spike starts clean', () => {
  const mid = SCENARIOS.spike[0].patch(BASELINE);
  assert.equal(mid.metrics.queue, 418);
  assert.equal(BASELINE.metrics.queue, 3);
  assert.equal(runToEnd('provider').nodes.queue, 'idle');
});

test('log is newest first and capped at 6 entries', () => {
  let s = BASELINE;
  for (let i = 0; i < 4; i++) s = runToEnd('duplicate', s);
  assert.equal(s.log.length, 6);
  assert.equal(s.log[0].key, 'dupDone');
});

test('steps are scheduled in time order', () => {
  for (const steps of Object.values(SCENARIOS)) {
    const times = steps.map(step => step.at);
    assert.deepEqual(
      times,
      [...times].sort((a, b) => a - b)
    );
  }
});
