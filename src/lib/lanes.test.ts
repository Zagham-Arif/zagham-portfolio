import assert from 'node:assert/strict';
import { test } from 'node:test';
import { stackLanes } from './lanes.ts';

test('stackLanes sorts a project stack into client, service and data lanes', () => {
  const lanes = stackLanes([
    'React.js',
    'Node.js',
    'MySQL',
    'REST APIs',
    'Web Scraping',
  ]);
  assert.deepEqual(
    lanes.map(l => [l.lane, l.nodes.map(n => n.label)]),
    [
      ['client', ['React']],
      ['service', ['Node.js']],
      ['data', ['MySQL']],
    ]
  );
});

test('stackLanes keeps at most two nodes a lane and drops empty lanes', () => {
  const lanes = stackLanes(['FastAPI', 'Python', 'Flask', 'Redis', 'AI/ML']);
  assert.deepEqual(
    lanes.map(l => l.lane),
    ['service', 'data']
  );
  assert.equal(lanes[0].nodes.length, 2);
});

test('stackLanes gives AWS services no brand icon and unknown icons none', () => {
  const lanes = stackLanes(['AWS ECS Fargate', 'KeystoneJS', 'Stripe']);
  const nodes = lanes.flatMap(l => l.nodes);
  assert.equal(nodes.find(n => n.label === 'AWS ECS')?.slug, null);
  assert.equal(nodes.find(n => n.label === 'KeystoneJS')?.slug, undefined);
  assert.equal(nodes.find(n => n.label === 'Stripe')?.slug, 'stripe');
});
