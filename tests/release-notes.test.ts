import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { afterEach, expect, test } from 'vitest';

const directories: string[] = [];
const script = resolve('scripts/release-notes.mjs');
afterEach(() => {
  for (const dir of directories.splice(0)) rmSync(dir, { recursive: true, force: true });
});
function fixture(changelog: string, version = '1.2.3') {
  const dir = mkdtempSync(join(tmpdir(), 'widget-release-notes-'));
  directories.push(dir);
  const git = (...args: string[]) =>
    execFileSync(
      'git',
      [
        '-c',
        'commit.gpgsign=false',
        '-c',
        'tag.gpgsign=false',
        '-c',
        'core.hooksPath=/dev/null',
        ...args,
      ],
      { cwd: dir, stdio: 'pipe' },
    );
  git('init', '-q');
  writeFileSync(
    join(dir, 'package.json'),
    JSON.stringify({
      name: '@chitrank2050/ask-widget',
      version,
      engines: { node: '>=24' },
      peerDependencies: { react: '>=18', 'react-dom': '>=18' },
    }),
  );
  writeFileSync(join(dir, 'CHANGELOG.md'), changelog);
  git('add', '.');
  git(
    '-c',
    'user.name=Release test',
    '-c',
    'user.email=test@example.com',
    'commit',
    '-qm',
    'fix: example',
  );
  git('tag', 'v1.2.3');
  return {
    dir,
    run: (tag = 'v1.2.3') =>
      spawnSync(process.execPath, [script, '--tag', tag, '--output', join(dir, 'notes.md')], {
        cwd: dir,
        encoding: 'utf8',
      }),
  };
}
test('uses exact tagged history and excludes newer, older and uncommitted changes', () => {
  const f = fixture(
    '## [Unreleased]\n- Future\n## [1.2.3] - 2026-10-19\n### Fixes\n- Restored exports\n## [1.2.2] - 2026-10-18\n- Older\n',
  );
  writeFileSync(join(f.dir, 'CHANGELOG.md'), '## 1.2.3\n- Uncommitted\n');
  expect(f.run().status).toBe(0);
  const notes = readFileSync(join(f.dir, 'notes.md'), 'utf8');
  expect(notes).toContain('Restored exports');
  expect(notes).toContain('npm install @chitrank2050/ask-widget@1.2.3');
  expect(notes).toContain('blob/v1.2.3/CHANGELOG.md');
  expect(notes).not.toMatch(/Future|Older|Uncommitted/);
});
test.each([
  '## [Unreleased]\n- Future\n',
  '## 1.2.30\n- Wrong version\n',
  '## 1.2.3\n\n### Fixes\n',
  '## 1.2.3\n- First\n## [1.2.3] - 2026-10-19\n- Duplicate\n',
])('rejects missing or empty version sections: %s', text => {
  expect(fixture(text).run().status).not.toBe(0);
});
test('rejects mismatched package versions and malformed tags', () => {
  const f = fixture('## 1.2.3\n- Fix\n', '1.2.4');
  expect(f.run().status).not.toBe(0);
  expect(f.run('v1.2.3/../../main').status).not.toBe(0);
});
test('repairs legacy commit links in output without altering tagged history', () => {
  const sha = 'a'.repeat(40);
  const text = `## 1.2.3\n- Fixed ([aaaaaaa](${sha}))\n`;
  const f = fixture(text);
  expect(f.run().status).toBe(0);
  expect(readFileSync(join(f.dir, 'notes.md'), 'utf8')).toContain(`/commit/${sha}`);
  expect(readFileSync(join(f.dir, 'CHANGELOG.md'), 'utf8')).toBe(text);
});
