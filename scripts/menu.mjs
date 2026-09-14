import { intro, outro, multiselect, spinner, cancel, isCancel } from '@clack/prompts';
import pc from 'picocolors';
import { execSync, execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { select } from '@clack/prompts';

const ROOT = resolve(import.meta.dirname, '..');

// ── Helpers ──────────────────────────────────────────────────────────────────
function runScript(path) {
  try {
    execFileSync('bash', [resolve(ROOT, path)], { stdio: 'inherit', cwd: ROOT });
  } catch (error) {
    console.error(pc.red(`\n  ⚠️  Script ${path} failed.\n`));
  }
}

function runCommand(cmd) {
  try {
    execSync(cmd, { stdio: 'inherit', cwd: ROOT });
  } catch (error) {
    console.error(pc.red(`\n  ⚠️  Command \`${cmd}\` failed.\n`));
  }
}

function handleCancel(value) {
  if (isCancel(value)) {
    cancel('Operation cancelled.');
    process.exit(0);
  }
}

// ── Execution Logic ──────────────────────────────────────────────────────────
const ACTIONS = {
  // Obliviate
  build: () =>
    runCommand(
      'rm -rf dist dist-app dist-ssr website/.next website/out storybook-static coverage release-artifacts',
    ),
  lockfiles: () => runCommand('rm -f pnpm-lock.yaml package-lock.json yarn.lock bun.lockb'),
  cache: () => runCommand('rm -rf .eslintcache .turbo website/.turbo'),
  node_modules: () => runCommand('rm -rf node_modules website/node_modules'),

  // Git
  changeset: () => runCommand('pnpm changeset'),
  tag: () => runScript('scripts/git-tag.sh'),
  release: () => runScript('scripts/git-release.sh'),
  publish: () => runCommand('pnpm publish --access public'),

  // Quality
  lint: () => runCommand('pnpm run lint'),
  format: () => runCommand('pnpm run format:check'),

  // Docs
  docs_dev: () => runCommand('pnpm run docs:dev'),
  docs_build: () => runCommand('pnpm run docs:build'),
  docs_deploy: () => runScript('scripts/docs-deploy.sh'),
};

// ── Menus ────────────────────────────────────────────────────────────────────
async function modeObliviate() {
  const choices = await multiselect({
    message: '🧹 Obliviate - select what to obliterate',
    options: [
      { value: 'build', label: 'Build artifacts', hint: 'dist/, website/.next, out/' },
      { value: 'node_modules', label: 'Dependencies', hint: 'root & website node_modules/' },
      { value: 'lockfiles', label: 'Lockfiles', hint: 'pnpm-lock.yaml…' },
      { value: 'cache', label: 'Internal caches', hint: '.eslintcache, .turbo' },
    ],
    required: true,
  });

  handleCancel(choices);

  const s = spinner();
  s.start('Executing cleanup...');

  for (const choice of choices) {
    s.message(`Running ${choice}...`);
    ACTIONS[choice]();
  }

  s.stop(pc.green('Cleanup complete!'));
}

async function modeGit() {
  const choices = await multiselect({
    message: '🐙 Version Control - select actions',
    options: [
      { value: 'changeset', label: 'Create Changeset', hint: 'Recommended way' },
      { value: 'tag', label: 'Tag version', hint: 'Automated via CI' },
      {
        value: 'release',
        label: 'GitHub Release',
        hint: 'Automated via CI',
      },
      {
        value: 'publish',
        label: '🚀 Publish to NPM',
        hint: 'Automated via CI',
      },
    ],
    required: true,
  });

  handleCancel(choices);

  for (const choice of choices) {
    ACTIONS[choice]();
  }
}

async function modeDocs() {
  const choice = await select({
    message: '📖 Documentation - select action',
    options: [
      { value: 'docs_dev', label: 'Preview docs', hint: 'local dev' },
      { value: 'docs_build', label: 'Build docs', hint: 'vitepress build' },
      { value: 'docs_deploy', label: 'Deploy to GH Pages', hint: 'push to gh-pages' },
    ],
  });

  handleCancel(choice);
  ACTIONS[choice]();
}

async function modeQuality() {
  const choices = await multiselect({
    message: '🔧 Maintain Code Quality - select actions',
    options: [
      { value: 'lint', label: 'Lint code', hint: 'eslint' },
      { value: 'format', label: 'Format check', hint: 'prettier' },
    ],
    required: true,
  });

  handleCancel(choices);

  for (const choice of choices) {
    ACTIONS[choice]();
  }
}
// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const mode = process.argv[2];

  intro(pc.cyan(pc.bold(' Ask Widget CLI ')));

  if (mode === 'obliviate') {
    await modeObliviate();
  } else if (mode === 'git') {
    await modeGit();
  } else if (mode === 'quality') {
    await modeQuality();
  } else if (mode === 'docs') {
    await modeDocs();
  } else {
    // Default interactive switcher?
    const action = await select({
      message: 'What would you like to do?',
      options: [
        { value: 'quality', label: '🔧 Maintain Code Quality' },
        { value: 'obliviate', label: '🧹 Cleanup (Obliviate)' },
        { value: 'git', label: '🐙 Version Control (Git)' },
        { value: 'docs', label: '📖 Documentation (Docs)' },
        { value: 'exit', label: '👋 Exit' },
      ],
    });

    handleCancel(action);

    if (action === 'obliviate') await modeObliviate();
    if (action === 'git') await modeGit();
    if (action === 'docs') await modeDocs();
    if (action === 'quality') await modeQuality();
    if (action === 'exit') process.exit(0);
  }

  outro(pc.green('Done!'));
}

main().catch(console.error);
