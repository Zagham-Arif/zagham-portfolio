import assert from 'node:assert/strict';
import { test } from 'node:test';
import { firstSentence } from './text.ts';

test('firstSentence keeps only the first sentence', () => {
  assert.equal(firstSentence('Builds APIs. Runs on AWS.'), 'Builds APIs.');
  assert.equal(firstSentence('One sentence only'), 'One sentence only');
});

test('firstSentence does not split inside numbers or names', () => {
  assert.equal(
    firstSentence('Handles 2.5M rows on Node.js and Next.js. More text.'),
    'Handles 2.5M rows on Node.js and Next.js.'
  );
});
