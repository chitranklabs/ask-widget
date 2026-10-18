import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
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
// Compile through the package export map so an empty declaration entry cannot pass a build.
const consumerDirectory = fs.mkdtempSync(new URL('../.package-types-', import.meta.url));
try {
  const consumerPath = path.join(consumerDirectory, 'consumer.ts');
  fs.writeFileSync(
    consumerPath,
    `import { ChatWidget, useSSEStream, type ChatMessage } from ${JSON.stringify(name)};
export const widget: typeof ChatWidget = ChatWidget;
export const stream: typeof useSSEStream = useSSEStream;
export type Message = ChatMessage;
`,
  );
  const program = ts.createProgram([consumerPath], {
    noEmit: true,
    strict: true,
    skipLibCheck: true,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    target: ts.ScriptTarget.ESNext,
    jsx: ts.JsxEmit.ReactJSX,
    types: [],
  });
  const diagnostics = ts.getPreEmitDiagnostics(program);
  assert.equal(
    diagnostics.length,
    0,
    ts.formatDiagnostics(diagnostics, {
      getCanonicalFileName: name => name,
      getCurrentDirectory: () => fileURLToPath(new URL('..', import.meta.url)),
      getNewLine: () => '\n',
    }),
  );
} finally {
  fs.rmSync(consumerDirectory, { recursive: true, force: true });
}
console.log('Package ESM/CJS, SSR, stylesheet exports and TypeScript consumer verified');
