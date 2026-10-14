import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';

const require = createRequire(import.meta.url);
const name = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8')).name;
const esm = await import(name);
const cjs = require(name);
for (const entry of [esm, cjs]) {
  for (const key of ['ChatWidget', 'useChat', 'useSession', 'useSSEStream'])
    assert.equal(typeof entry[key], 'function', `Missing public export: ${key}`);
  assert.ok(
    renderToString(createElement(entry.ChatWidget)).includes('Open Ask AI'),
    'Widget must render on the server',
  );
}
assert.ok(fs.existsSync(require.resolve(`${name}/styles.css`)), 'Public stylesheet must exist');
assert.equal(
  require.resolve(`${name}/styles.css`),
  require.resolve(`${name}/style.css`),
  'Legacy stylesheet alias must resolve to the same asset',
);
console.log('Package ESM/CJS, SSR and stylesheet exports verified');
