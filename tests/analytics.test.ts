import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CloudflareAnalytics } from '../website/src/components/cloudflare-analytics';

const token = 'a'.repeat(32);
const docsConfig = resolve('docs/monoline-docs.config.mjs');

function readDocsScripts(value?: string): string[] {
  const env = { ...process.env };
  delete env.CLOUDFLARE_WEB_ANALYTICS_TOKEN;
  if (value !== undefined) env.CLOUDFLARE_WEB_ANALYTICS_TOKEN = value;
  return JSON.parse(
    execFileSync(
      process.execPath,
      [
        '--input-type=module',
        '-e',
        `const {default: config} = await import(${JSON.stringify(docsConfig)}); console.log(JSON.stringify(config.integrations.scripts));`,
      ],
      { env, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] },
    ),
  ) as string[];
}

afterEach(() => vi.unstubAllEnvs());

describe('website analytics', () => {
  function production() {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('VERCEL_ENV', 'production');
    vi.stubEnv('NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN', token);
  }

  it('includes one production beacon with the public token', () => {
    production();
    const beacon = CloudflareAnalytics();
    expect(beacon?.props.src).toBe('https://static.cloudflareinsights.com/beacon.min.js');
    expect(JSON.parse(beacon?.props['data-cf-beacon'] as string)).toEqual({ token });
    expect(beacon?.props.strategy).toBe('afterInteractive');
  });

  it('excludes preview and development traffic', () => {
    production();
    vi.stubEnv('VERCEL_ENV', 'preview');
    expect(CloudflareAnalytics()).toBeNull();
    vi.stubEnv('VERCEL_ENV', 'production');
    vi.stubEnv('NODE_ENV', 'development');
    expect(CloudflareAnalytics()).toBeNull();
  });

  it('disables missing tokens and rejects malformed production tokens', () => {
    production();
    vi.stubEnv('NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN', '');
    expect(CloudflareAnalytics()).toBeNull();
    vi.stubEnv('NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN', 'invalid');
    expect(() => CloudflareAnalytics()).toThrow('32-character hexadecimal');
  });
});

describe('documentation analytics configuration', () => {
  it('includes the configured beacon and trims the token', () => {
    expect(readDocsScripts(` ${token} `)).toEqual([
      `https://static.cloudflareinsights.com/beacon.min.js?token=${token}`,
    ]);
  });

  it('omits the beacon without a token', () => {
    expect(readDocsScripts()).toEqual([]);
  });

  it('rejects malformed tokens', () => {
    expect(() => readDocsScripts('invalid')).toThrow();
  });
});
