import assert from 'node:assert/strict';
import { test } from 'node:test';
import { skills, skillsByTier, whereUsed } from './stack.ts';

const sources = [
  { name: 'Xavor Corporation', technologies: ['Node.js', 'Express', 'Redis'] },
  { name: 'PlayerTotals', technologies: ['Node.js', 'MongoDB'] },
  { name: 'CivaSource', technologies: ['Python', 'FastAPI'] },
];

test('whereUsed lists every source that used the skill, through aliases', () => {
  assert.deepEqual(whereUsed('nodejs', sources), [
    'Xavor Corporation',
    'PlayerTotals',
  ]);
  assert.deepEqual(whereUsed('express', sources), ['Xavor Corporation']);
  assert.deepEqual(whereUsed('kinesis', sources), []);
});

test('skillsByTier groups every skill into core, strong, familiar in that order', () => {
  const tiers = skillsByTier();
  assert.deepEqual(
    tiers.map(t => t.tier),
    ['core', 'strong', 'familiar']
  );
  assert.equal(
    tiers.reduce((n, t) => n + t.skills.length, 0),
    skills.length
  );
  assert.ok(tiers[0].skills.some(s => s.id === 'express'));
});
