import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const workflow = readFileSync('.github/workflows/auto-approve.yml', 'utf8');
const verificationStep = workflow.split('id: verify')[1]?.split('      - name: Auto-approve PR')[0];
const script = verificationStep?.split('        run: |\n')[1]?.replace(/^ {10}/gm, '');
if (!script) throw new Error('Auto-approval verification step not found');

function verify(checks: object[], mergeable = 'MERGEABLE', nextChecks?: object[]) {
  return spawnSync(
    'bash',
    [
      '-c',
      `gh() {
  if [ "$FIXTURE_INDEX" -gt 0 ] && [ -n "$PR_NEXT_FIXTURE" ]; then
    printf '%s' "$PR_NEXT_FIXTURE"
  else
    printf '%s' "$PR_FIXTURE"
  fi
}
sleep() { echo mock-sleep; FIXTURE_INDEX=$((FIXTURE_INDEX + 1)); }
FIXTURE_INDEX=0
${script}`,
    ],
    {
      env: {
        ...process.env,
        PR_FIXTURE: JSON.stringify({ mergeable, statusCheckRollup: checks }),
        PR_NEXT_FIXTURE: nextChecks
          ? JSON.stringify({ mergeable, statusCheckRollup: nextChecks })
          : '',
        PR_NUMBER: '123',
        GITHUB_REPOSITORY: 'example/repo',
        GITHUB_OUTPUT: '/dev/stdout',
      },
      encoding: 'utf8',
    },
  );
}

describe('auto-approval check gate', () => {
  it('defers pending checks without failing or authorizing approval', () => {
    for (const check of [
      { name: 'CI', status: 'IN_PROGRESS', conclusion: '' },
      { context: 'legacy', state: 'PENDING' },
    ]) {
      const result = verify([check]);
      expect(result.status).toBe(0);
      expect(result.stdout).toContain('ready=false');
      expect(result.stdout).not.toContain('ready=true');
      expect(result.stdout.match(/mock-sleep/g)).toHaveLength(17);
    }
  });

  it('blocks completed failures and legacy errors', () => {
    for (const check of [
      { name: 'CI', status: 'COMPLETED', conclusion: 'FAILURE' },
      { name: 'CI', status: 'COMPLETED', conclusion: 'CANCELLED' },
      { context: 'legacy', state: 'ERROR' },
    ]) {
      const result = verify([check]);
      expect(result.status).toBe(1);
      expect(result.stdout).not.toContain('mock-sleep');
      expect(result.stdout).not.toContain('ready=true');
    }
  });

  it('authorizes completed successful checks including legacy contexts', () => {
    const result = verify([
      { name: 'CI', status: 'COMPLETED', conclusion: 'SUCCESS' },
      { name: 'Optional', status: 'COMPLETED', conclusion: 'SKIPPED' },
      { context: 'legacy', state: 'SUCCESS' },
      { name: 'Auto-Approve', status: 'IN_PROGRESS', conclusion: '' },
    ]);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('ready=true');
    expect(workflow).toContain("if: steps.verify.outputs.ready == 'true'");
  });

  it('approves when a pending check succeeds during the bounded wait', () => {
    const result = verify([{ name: 'Deploy', status: 'IN_PROGRESS' }], 'MERGEABLE', [
      { name: 'Deploy', status: 'COMPLETED', conclusion: 'SUCCESS' },
    ]);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('ready=true');
    expect(result.stdout.match(/mock-sleep/g)).toHaveLength(1);
  });

  it('stops polling as soon as a pending check fails', () => {
    const result = verify([{ name: 'Deploy', status: 'IN_PROGRESS' }], 'MERGEABLE', [
      { name: 'Deploy', status: 'COMPLETED', conclusion: 'FAILURE' },
    ]);
    expect(result.status).toBe(1);
    expect(result.stdout).not.toContain('ready=true');
    expect(result.stdout.match(/mock-sleep/g)).toHaveLength(1);
  });

  it('defers unknown mergeability and rejects conflicts', () => {
    const pending = verify([], 'UNKNOWN');
    expect(pending.status).toBe(0);
    expect(pending.stdout).not.toContain('ready=true');
    expect(verify([], 'CONFLICTING').status).toBe(1);
  });
});
