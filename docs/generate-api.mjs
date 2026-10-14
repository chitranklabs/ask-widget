import { withCustomConfig } from 'react-docgen-typescript';
import { fileURLToPath } from 'node:url';
import { writeFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const components = withCustomConfig(fileURLToPath(new URL('tsconfig.app.json', root)), {
  savePropValueAsString: true,
}).parse(fileURLToPath(new URL('src/components/ChatWidget.tsx', root)));
const props = components[0]?.props;
if (!props || !Object.keys(props).length)
  throw new Error('ChatWidget prop extraction returned no props');
const apiRows = Object.entries(props).map(([name, prop]) => ({
  name,
  type: prop.type.name,
  default: prop.defaultValue?.value ?? '—',
  description: prop.description.split('\n@example')[0].trim(),
}));

await writeFile(
  new URL('./data/api-props.mjs', import.meta.url),
  `// Generated from ChatWidget; run docs prebuild to refresh.\nexport const apiRows = ${JSON.stringify(apiRows, null, 2)};\n`,
);
