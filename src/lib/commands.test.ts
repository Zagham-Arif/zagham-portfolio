import assert from 'node:assert/strict';
import { test } from 'node:test';
import { filterCommands } from './commands.ts';

const cmds = [
  { id: 'a', label: 'Copy my email', group: 'action' },
  { id: 'b', label: 'Go to Work', group: 'go to' },
  { id: 'c', label: 'Open PlayerTotals', group: 'project' },
];

test('filterCommands matches label or group, ignoring case and spaces', () => {
  assert.deepEqual(
    filterCommands(cmds, '  EMAIL ').map(c => c.id),
    ['a']
  );
  assert.deepEqual(
    filterCommands(cmds, 'project').map(c => c.id),
    ['c']
  );
});

test('filterCommands returns everything for an empty query', () => {
  assert.equal(filterCommands(cmds, '').length, 3);
});
