// Asserts every translation key referenced from src/lib/data.ts exists in every
// locale file, and that the locale key trees match. Runs in `yarn check-all`.
import { readFileSync, readdirSync } from 'node:fs';

const source = readFileSync('src/lib/data.ts', 'utf8');
const referenced = [
  ...source.matchAll(/'((?:projectsData|experiencesData)\.[^']+)'/g),
].map(m => m[1]);

const locales = readdirSync('messages').filter(f => f.endsWith('.json'));
const load = f => JSON.parse(readFileSync(`messages/${f}`, 'utf8'));
const resolve = (obj, path) =>
  path.split('.').reduce((acc, part) => acc?.[part], obj);
const flatten = (obj, prefix = '') =>
  Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === 'object' && !Array.isArray(v)
      ? flatten(v, `${prefix}${k}.`)
      : [`${prefix}${k}`]
  );

const errors = [];
const [first, ...rest] = locales;
const baseKeys = new Set(flatten(load(first)));

for (const file of locales) {
  const messages = load(file);
  for (const key of referenced) {
    if (resolve(messages, key) === undefined) {
      errors.push(
        `${file}: missing key "${key}" referenced in src/lib/data.ts`
      );
    }
  }
}

for (const file of rest) {
  const keys = new Set(flatten(load(file)));
  for (const k of baseKeys) {
    if (!keys.has(k))
      errors.push(`${file}: missing "${k}" (present in ${first})`);
  }
  for (const k of keys) {
    if (!baseKeys.has(k))
      errors.push(`${file}: extra "${k}" (absent in ${first})`);
  }
}

if (errors.length) {
  console.error(`i18n key check failed:\n  ${errors.join('\n  ')}`);
  process.exit(1);
}
console.log(
  `i18n key check passed: ${referenced.length} references across ${locales.join(', ')}`
);
