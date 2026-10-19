import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const repository = 'https://github.com/chitranklabs/ask-widget';
const args = process.argv.slice(2);
const tag = args[args.indexOf('--tag') + 1];
const output = args[args.indexOf('--output') + 1];
assert(
  args.includes('--tag') && args.includes('--output'),
  'Expected --tag <version> --output <file>',
);
assert(
  /^v(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)(?:-[0-9A-Za-z]+(?:[.-][0-9A-Za-z]+)*)?$/.test(
    tag,
  ),
  'Expected an exact release tag',
);
const version = tag.slice(1);
const source = file => execFileSync('git', ['show', `${tag}:${file}`], { encoding: 'utf8' });
const manifest = JSON.parse(source('package.json'));
assert.equal(manifest.name, '@chitrank2050/ask-widget', 'Unexpected release package');
assert.equal(manifest.version, version, 'Release tag and package version must match');
const changelog = source('CHANGELOG.md').replaceAll('\r\n', '\n');
const escaped = version.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const heading = new RegExp(
  `^## (?:\\[${escaped}\\]|${escaped})(?: - \\d{4}-\\d{2}-\\d{2})?[ \\t]*$`,
  'gm',
);
const matches = [...changelog.matchAll(heading)];
assert.equal(matches.length, 1, `Expected exactly one changelog section for ${version}`);
const match = matches[0];
const rest = changelog.slice(match.index + match[0].length);
const end = rest.search(/^## /m);
const changes = (end < 0 ? rest : rest.slice(0, end))
  .replace(/^.*\*\*release:\*\*.*bump version.*\n?/gim, '')
  .replace(/\]\(([a-f0-9]{40})\)/g, `](${repository}/commit/$1)`)
  .trim();
assert(
  changes
    .replace(/^#{1,6} .*$/gm, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .trim(),
  `Empty release notes for ${version}`,
);
const requirements = [
  manifest.engines?.node && `Node.js \`${manifest.engines.node}\``,
  manifest.peerDependencies?.react && `React \`${manifest.peerDependencies.react}\``,
  manifest.peerDependencies?.['react-dom'] &&
    `React DOM \`${manifest.peerDependencies['react-dom']}\``,
]
  .filter(Boolean)
  .join('; ');
writeFileSync(
  output,
  `## Ask Widget ${version}

${changes}

### Install

\`\`\`sh
npm install ${manifest.name}@${version}
\`\`\`

Import \`${manifest.name}/styles.css\` as shown in the package guide.

${requirements ? `Requires ${requirements}.\n` : ''}
### Links

- [Documentation](https://docs.askwidget.chitrankagnihotri.com/)
- [Package guide](${repository}/blob/${tag}/README.md)
- [Changelog](${repository}/blob/${tag}/CHANGELOG.md)
- [npm package](https://www.npmjs.com/package/${manifest.name}/v/${version})
`,
);
console.log(`Generated notes from ${tag}:CHANGELOG.md`);
