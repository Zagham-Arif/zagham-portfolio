import assert from 'node:assert/strict';
import { test } from 'node:test';
import { alternates } from './alternates.ts';

test('alternates builds canonical, every locale and x-default for a path', () => {
  assert.deepEqual(alternates('es', '/projects'), {
    canonical: '/es/projects',
    languages: {
      en: '/en/projects',
      es: '/es/projects',
      'x-default': '/en/projects',
    },
  });
  assert.equal(alternates('en').canonical, '/en');
});
