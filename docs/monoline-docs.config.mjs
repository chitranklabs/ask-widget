import { loadConfig } from '@chitrank2050/monoline-docs';

const config = await loadConfig({ config: 'monoline-docs.yml', cwd: import.meta.dirname });
const token = process.env.CLOUDFLARE_WEB_ANALYTICS_TOKEN?.trim();
if (token && !/^[a-f0-9]{32}$/i.test(token)) {
  throw new Error(
    'CLOUDFLARE_WEB_ANALYTICS_TOKEN must be a 32-character hexadecimal beacon token.',
  );
}

export default {
  ...config,
  integrations: {
    scripts: token ? [`https://static.cloudflareinsights.com/beacon.min.js?token=${token}`] : [],
  },
};
