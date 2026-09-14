import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(__dirname, '..');

const SITE_URL = 'https://askwidget.chitrankagnihotri.com';
const HOST = '127.0.0.1';
const PORT = Number.parseInt(process.env.SEO_TEST_PORT || '3225', 10);
const externalBaseUrl = process.env.TEST_BASE_URL;
const LOCAL_URL = externalBaseUrl ?? `http://${HOST}:${PORT}`;

const STARTUP_TIMEOUT_MS = 60_000;
const EXPECTED_PATHS = ['/', '/changelog'].toSorted();

function decodeEntities(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
}

function getAttribute(tag, attribute) {
  const expression = new RegExp(
    `(?:^|\\s)${attribute}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`,
    'i',
  );
  const match = tag.match(expression);
  return match ? decodeEntities(match[1] ?? match[2] ?? match[3] ?? '') : null;
}

function findElementsByAttribute(html, tagName, attribute, expectedValue) {
  const tags = html.match(new RegExp(`<${tagName}\\b[^>]*>`, 'gi')) ?? [];
  return tags.filter(tag => {
    const value = getAttribute(tag, attribute);
    return value?.toLowerCase().split(/\s+/).includes(expectedValue.toLowerCase());
  });
}

function findElementByAttribute(html, tagName, attribute, expectedValue) {
  const tags = html.match(new RegExp(`<${tagName}\\b[^>]*>`, 'gi')) ?? [];
  return (
    tags.find(tag => {
      const value = getAttribute(tag, attribute);
      return value?.toLowerCase().split(/\s+/).includes(expectedValue.toLowerCase());
    }) ?? null
  );
}

function parseJsonLdBlocks(html) {
  const blocks = [];
  const regex = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;

  while ((match = regex.exec(html)) !== null) {
    const raw = match[1]?.trim();
    if (!raw) continue;

    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        blocks.push(...parsed);
      } else {
        blocks.push(parsed);
      }
    } catch (error) {
      assert.fail(`Invalid JSON-LD block: ${error.message}\n${raw}`);
    }
  }

  return blocks;
}

async function fetchRoute(routePath) {
  const response = await fetch(`${LOCAL_URL}${routePath}`);
  const body = await response.text();
  return { response, body };
}

async function waitForServer(serverProcess) {
  const startTime = Date.now();
  const url = `${LOCAL_URL}/`;

  while (Date.now() - startTime < STARTUP_TIMEOUT_MS) {
    if (serverProcess?.exitCode !== null && serverProcess?.exitCode !== undefined) {
      throw new Error(`Server exited unexpectedly with code ${serverProcess.exitCode}`);
    }

    try {
      const response = await fetch(url);
      if (response.status === 200) {
        return;
      }
    } catch {
      // server still spinning up
    }

    await new Promise(resolve => setTimeout(resolve, 500));
  }

  throw new Error(`Timed out waiting for server at ${LOCAL_URL}`);
}

async function runTests() {
  console.log(`\n🔍 Running ask-widget SEO & Schema Integration Test Suite (${LOCAL_URL})`);

  // 1. Home Page & Meta Checks
  console.log('  → Verifying Homepage SEO & Metadata...');
  const { response: homeRes, body: homeHtml } = await fetchRoute('/');
  assert.equal(homeRes.status, 200, 'Home route must return HTTP 200');

  // Heading checks (Accessibility)
  const h1Matches = homeHtml.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/gi) ?? [];
  assert.equal(h1Matches.length, 1, 'Page must contain exactly one <h1> element');

  // Title checks
  const titleMatch = homeHtml.match(/<title\b[^>]*>([^<]+)<\/title>/i);
  assert.ok(titleMatch, '<title> tag must be present');
  assert.ok(titleMatch[1].includes('ask-widget'), "Title must contain 'ask-widget'");

  // Canonical tag
  const canonicalTag = findElementByAttribute(homeHtml, 'link', 'rel', 'canonical');
  assert.ok(canonicalTag, 'Canonical link tag must be present');
  assert.equal(
    getAttribute(canonicalTag, 'href')?.replace(/\/$/, ''),
    SITE_URL.replace(/\/$/, ''),
    'Canonical URL must match expected root URL',
  );

  // OpenGraph tags
  const ogTitle = findElementByAttribute(homeHtml, 'meta', 'property', 'og:title');
  assert.ok(ogTitle, 'og:title tag must be present');
  assert.ok(getAttribute(ogTitle, 'content')?.length, 'og:title must not be empty');

  const ogDesc = findElementByAttribute(homeHtml, 'meta', 'property', 'og:description');
  assert.ok(ogDesc, 'og:description tag must be present');

  const ogUrl = findElementByAttribute(homeHtml, 'meta', 'property', 'og:url');
  assert.equal(getAttribute(ogUrl, 'content')?.replace(/\/$/, ''), SITE_URL.replace(/\/$/, ''));

  // Twitter Card
  const twitterCard = findElementByAttribute(homeHtml, 'meta', 'name', 'twitter:card');
  assert.equal(getAttribute(twitterCard, 'content'), 'summary_large_image');

  // 2. Structured Data (JSON-LD)
  console.log('  → Verifying JSON-LD Structured Data...');
  const homeJsonLd = parseJsonLdBlocks(homeHtml);
  assert.ok(
    homeJsonLd.length >= 3,
    'Homepage must include Person, WebSite, and SoftwareApplication schemas',
  );

  const personSchema = homeJsonLd.find(b => b['@type'] === 'Person');
  assert.ok(personSchema, 'JSON-LD must include Person schema');
  assert.equal(personSchema.name, 'Chitrank Agnihotri');

  const webSiteSchema = homeJsonLd.find(b => b['@type'] === 'WebSite');
  assert.ok(webSiteSchema, 'JSON-LD must include WebSite schema');
  assert.equal(webSiteSchema.url, SITE_URL);

  const softwareSchema = homeJsonLd.find(b => b['@type'] === 'SoftwareApplication');
  assert.ok(softwareSchema, 'JSON-LD must include SoftwareApplication schema');
  assert.equal(softwareSchema.name, '@chitrank2050/ask-widget');
  assert.ok(softwareSchema.featureList?.length > 0, 'SoftwareApplication must list features');

  const faqSchema = homeJsonLd.find(b => b['@type'] === 'FAQPage');
  assert.ok(faqSchema, 'JSON-LD must include FAQPage schema');
  assert.ok(faqSchema.mainEntity?.length >= 3, 'FAQPage must include multiple QA pairs');

  // 3. Changelog Route
  console.log('  → Verifying /changelog Route & Breadcrumbs...');
  const { response: changelogRes, body: changelogHtml } = await fetchRoute('/changelog');
  assert.equal(changelogRes.status, 200, 'Changelog route must return HTTP 200');

  const changelogCanonical = findElementByAttribute(changelogHtml, 'link', 'rel', 'canonical');
  assert.equal(getAttribute(changelogCanonical, 'href'), `${SITE_URL}/changelog`);

  const changelogJsonLd = parseJsonLdBlocks(changelogHtml);
  const breadcrumbSchema = changelogJsonLd.find(b => b['@type'] === 'BreadcrumbList');
  assert.ok(breadcrumbSchema, 'Changelog must contain BreadcrumbList schema');
  assert.equal(
    breadcrumbSchema.itemListElement?.length,
    2,
    'Breadcrumb must have Home and Changelog',
  );

  // 4. Robots.txt
  console.log('  → Verifying robots.txt directives...');
  const { response: robotsRes, body: robotsText } = await fetchRoute('/robots.txt');
  assert.equal(robotsRes.status, 200, 'robots.txt must return HTTP 200');
  assert.ok(robotsText.includes('User-agent: *'), 'robots.txt must contain wildcard user-agent');
  assert.ok(
    robotsText.includes('User-agent: GPTBot'),
    'robots.txt must include AI crawler directives',
  );
  assert.ok(
    robotsText.includes(`Sitemap: ${SITE_URL}/sitemap.xml`),
    'robots.txt must point to sitemap',
  );

  // 5. Sitemap.xml
  console.log('  → Verifying sitemap.xml...');
  const { response: sitemapRes, body: sitemapXml } = await fetchRoute('/sitemap.xml');
  assert.equal(sitemapRes.status, 200, 'sitemap.xml must return HTTP 200');
  assert.ok(sitemapXml.includes(`${SITE_URL}/`), 'sitemap must include root URL');
  assert.ok(sitemapXml.includes(`${SITE_URL}/changelog`), 'sitemap must include changelog URL');

  // 6. llms.txt
  console.log('  → Verifying llms.txt...');
  const { response: llmsRes, body: llmsText } = await fetchRoute('/llms.txt');
  assert.equal(llmsRes.status, 200, 'llms.txt must return HTTP 200');
  assert.ok(llmsText.includes('# ask-widget'), 'llms.txt must contain headline');
  assert.ok(llmsText.includes('@chitrank2050/ask-widget'), 'llms.txt must mention package name');

  console.log('✅ All SEO & Schema tests passed successfully!\n');
}

async function main() {
  let serverProcess = null;

  try {
    if (!externalBaseUrl) {
      console.log(`⚡ Starting Next.js test server on ${LOCAL_URL}...`);
      serverProcess = spawn(
        process.execPath,
        ['node_modules/next/dist/bin/next', 'start', '--hostname', HOST, '--port', String(PORT)],
        {
          cwd: appRoot,
          stdio: 'pipe',
          env: {
            ...process.env,
            NODE_ENV: 'production',
          },
        },
      );

      serverProcess.stderr.on('data', data => {
        const str = data.toString();
        if (!str.includes('Fast Refresh') && !str.includes('ExperimentalWarning')) {
          process.stderr.write(data);
        }
      });

      await waitForServer(serverProcess);
    }

    await runTests();
  } finally {
    if (serverProcess) {
      serverProcess.kill('SIGTERM');
    }
  }
}

main().catch(error => {
  console.error('❌ SEO Test Suite Failed:', error);
  process.exit(1);
});
