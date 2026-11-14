import assert from 'node:assert/strict';
import { test } from 'node:test';
import { normalizeTech, usesSkill } from './skills.ts';

test('normalizeTech merges aliases', () => {
  assert.equal(normalizeTech('React.js'), 'react');
  assert.equal(normalizeTech('ReactJS'), 'react');
  assert.equal(normalizeTech('AWS ECS Fargate'), 'ecs');
  assert.equal(normalizeTech('PostgreSQL'), 'postgres');
  assert.equal(normalizeTech('Next.js'), 'nextjs');
});

test('usesSkill matches through aliases', () => {
  assert.equal(usesSkill(['AWS ECS Fargate', 'Redis'], 'ecs'), true);
  assert.equal(usesSkill(['ReactJS'], 'react'), true);
  assert.equal(usesSkill(['Python'], 'nodejs'), false);
});
