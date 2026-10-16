---
title: Development
description: Run the library, Next.js website and independent Monoline documentation locally.
---

## Install

Use Node.js 24.14 or newer and the repository’s pinned pnpm version.

```bash
pnpm install --frozen-lockfile
pnpm build:lib
```

## Run the website

```bash
pnpm dev
```

The website runs at `http://localhost:3006`. Rebuild the library after editing
widget source because the website consumes its emitted package exports.

## Run the documentation

```bash
pnpm docs:dev
```

Open `http://localhost:4181/ask-widget/`. Documentation is built by Monoline Docs
independently of Next.js. The `/ask-widget/` base preserves existing GitHub Pages
URLs. API props are extracted from component source before the documentation build.
Restart docs development after changing widget prop declarations to refresh the table.

## Verify

```bash
pnpm test
pnpm typecheck
pnpm build:lib
pnpm docs:build
```

Do not commit `docs/dist`, package `dist` or website `.next` output.
The website and documentation have separate deployment targets; docs output is
never mounted into the Next.js application.

## SEO and deployment

The website is deployed independently to `https://ask-widget.chitrankagnihotri.com`.
For Vercel, set the project Root Directory to `website` and enable source files
outside the Root Directory. `website/vercel.json` builds the library before Next.js
and does not build or deploy documentation.

Set `NEXT_PUBLIC_SITE_URL` to that production origin; canonical URLs, social URLs,
robots and the sitemap use the same value. Vercel previews emit `noindex` and disallow
crawling. The sitemap omits modification dates until real page revision dates are available.

Monoline Docs deploys to `https://chitranklabs.github.io/ask-widget/`. Its `site`,
`base` and `seo` configuration control canonical URLs, social metadata, publisher
identity and the sitemap. Keep this base while existing Pages URLs are in use.
A project site does not own the host-root `/robots.txt`; its sitemap is under the
project base. The website's `llms.txt` links to the Docs Markdown exports.

Run `pnpm --filter ask-widget-website test:seo` against a production build, or set
`TEST_BASE_URL` to an existing local server to check its rendered metadata.

Identity synchronization is explicit: run
`pnpm --filter ask-widget-website sync:identity` to refresh the checked-in fallback,
then review the result. Normal development and production builds do not rewrite
that file from a remote response.

`build:lib` verifies ESM and CommonJS public exports, SSR rendering and both
stylesheet aliases after emitting the bundle. CommonJS output uses `.cjs` because
the package is declared as an ES module.

## Website and documentation theme

The website and documentation share `assets/theme.css`. The palette follows the widget’s neutral zinc surfaces. Change semantic colors there to keep both sites consistent in light and dark mode. Website layout and component styling live in `website/src/app/globals.css`; the Docs site loads the shared stylesheet through `docs/monoline-docs.yml`. The published widget has its own theme and can be customized with its `theme` and `colors` props.

The website declares Tailwind’s reset and UI layers before the widget layers in `globals.css`. Keep that order when changing stylesheet imports; host resets must not override the widget’s composer, buttons or message styles.

The website uses Monoline UI for buttons, labeled inputs, segmented selections, navigation, footer, theme switching and separators. Keep workbench layout local to the website. Its code examples compose Monoline CodeBlock with explicit Prism highlighting and custom asynchronous clipboard feedback; do not enable Prism’s automatic DOM scanning before React hydration.

## Repository cleanup

Run `pnpm obliviate` to select build output, dependencies, caches or lockfiles.
Build and dependency cleanup covers the library, website and docs workspaces.
Lockfile deletion is a separate, explicit choice because it resolves the dependency
graph again on the next install. Do not clean output while its preview is running.
The menu propagates failed commands as a nonzero exit status.

Use `pnpm git` to prepare a release PR through GitHub Actions or inspect recent
release runs. Publishing and recovery follow the maintenance guide.
