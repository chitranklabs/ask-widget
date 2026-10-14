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
