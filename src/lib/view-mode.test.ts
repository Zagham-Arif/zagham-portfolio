import assert from 'node:assert/strict';
import { test } from 'node:test';
import { viewModeScript } from './view-mode.ts';

// Runs the exact inline <head> script against a fake document and storage.
function modeAfterScript(storage: unknown) {
  const document = {
    documentElement: { dataset: {} as Record<string, string> },
  };
  new Function('document', 'localStorage', viewModeScript)(document, storage);
  return document.documentElement.dataset.mode;
}

test('head script defaults to plain with nothing stored', () => {
  assert.equal(modeAfterScript({ getItem: () => null }), 'plain');
});

test('head script applies a stored tech mode', () => {
  assert.equal(modeAfterScript({ getItem: () => 'tech' }), 'tech');
});

test('head script ignores invalid values', () => {
  assert.equal(modeAfterScript({ getItem: () => 'weird' }), 'plain');
});

test('head script survives storage that throws or is missing', () => {
  const blocked = {
    getItem: () => {
      throw new Error('blocked');
    },
  };
  assert.equal(modeAfterScript(blocked), 'plain');
  assert.equal(modeAfterScript(undefined), 'plain');
});
