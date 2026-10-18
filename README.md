<div align="center">
  <img src="https://raw.githubusercontent.com/chitranklabs/ask-widget/main/assets/logo.png" alt="ask-widget logo"  width="200" height="auto" />
  <br/>
  <br/>
  <br/>
  <h1>ask-widget 🤖</h1>

  <p>A floating React chat widget with streaming responses, theme controls and headless hooks. Connect your own backend or start with a scripted demo.
  </p>
  <p>
    <a href="https://www.npmjs.com/package/@chitrank2050/ask-widget">
    <img src="https://img.shields.io/npm/v/@chitrank2050/ask-widget" alt="npm" />
    </a>
    <a href="https://jsr.io/@chitrank2050/ask-widget">
    <img src="https://jsr.io/badges/@chitrank2050/ask-widget" alt="JSR" />
    </a>
  </p>

  <p>
  <a href="https://github.com/chitranklabs/ask-widget/actions/workflows/ci.yml">
  <img src="https://github.com/chitranklabs/ask-widget/actions/workflows/ci.yml/badge.svg" alt="CI 🌊" />
  </a>
  <a href="https://codecov.io/gh/chitranklabs/ask-widget">
  <img src="https://codecov.io/gh/chitranklabs/ask-widget/branch/main/graph/badge.svg" alt="codecov" />
  </a>
  <a href="https://www.bestpractices.dev/projects/14016">
  <img src="https://www.bestpractices.dev/projects/14016/baseline" alt="OpenSSF Best Practices" />
  </a>
  <a href="https://github.com/chitranklabs/ask-widget/actions/workflows/scorecard.yml">
  <img src="https://github.com/chitranklabs/ask-widget/actions/workflows/scorecard.yml/badge.svg" alt="Scorecard Status" />
  </a>
  <a href="https://scorecard.dev/viewer/?uri=github.com/chitranklabs/ask-widget">
  <img src="https://api.scorecard.dev/projects/github.com/chitranklabs/ask-widget/badge" alt="OpenSSF Scorecard" />
  </a>
  <a href="https://github.com/gitleaks/gitleaks">
  <img src="https://img.shields.io/badge/Security-Gitleaks-brightgreen?logo=gitleaks" alt="Security: Gitleaks" />
  </a>
  <a href="https://github.com/chitranklabs/ask-widget/attestations">
  <img src="https://img.shields.io/badge/Build-Provenance-blue?logo=slsa" alt="Build provenance" />
  </a>
  <a href="./LICENSE">
  <img src="https://img.shields.io/github/license/chitranklabs/ask-widget" alt="License" />
  </a>
  <br/>
  <br/>
   <a href="https://ko-fi.com/D1D71U581P" target="_blank">
      <img src="https://ko-fi.com/img/githubbutton_sm.svg" alt="Buy me a coffee at ko-fi.com">
    </a>
  </p>
</div>

## Why ask-widget

Use `ChatWidget` to add a floating chat interface to a React application without
building the launcher, conversation panel and composer yourself. Use `useChat`,
`useSSEStream` and `useSession` when you want to build your own interface.

The package supplies the interface and response adapters. Your backend supplies
model access, authentication and request limits; the widget does not host an AI model.

## Features

<a id="-features"></a>

- SSE response streaming and custom asynchronous response handlers.
- Light/dark themes, color overrides and configurable positioning.
- Browser-local conversation persistence and response cancellation.
- Headless hooks for custom interfaces.

[Live demo](https://askwidget.chitrankagnihotri.com) ·
[Documentation](https://docs.askwidget.chitrankagnihotri.com/) ·
[Release history](https://github.com/chitranklabs/ask-widget/releases)

## Requirements

Use React and React DOM 18 or newer. The package declares Node.js 24 or newer.
Use the npm distribution for the styled widget; JSR distributes TypeScript source
without the npm stylesheet entry points.

## Quick Start

<a id="-quick-start"></a>

```bash
npm install @chitrank2050/ask-widget
```

For pnpm, use `pnpm add @chitrank2050/ask-widget`.

```tsx
'use client';

import { ChatWidget } from '@chitrank2050/ask-widget';
import '@chitrank2050/ask-widget/styles.css';

export default function App() {
  return <ChatWidget title="Ask AI" />;
}
```

Open the launcher and send a message. This example returns **scripted demo
responses**; no backend or AI model is needed. The client directive is needed
when using this example in Next.js App Router.

For real responses, connect your own endpoint using the
[backend guide](https://docs.askwidget.chitrankagnihotri.com/backend).
An unavailable configured endpoint produces an error, not a fallback demo.

> [!IMPORTANT]
> Keep provider keys on your server. Browser `apiToken` values and frontend
> environment variables are public. See
> [authentication](https://docs.askwidget.chitrankagnihotri.com/getting-started#authentication).

## Documentation & Demo

<a id="-documentation--demo"></a>

| Goal                             | Guide                                                                                                                             |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Install and render the widget    | [Getting started](https://docs.askwidget.chitrankagnihotri.com/getting-started)                                                   |
| Integrate with a React framework | [Next.js and Vite](https://docs.askwidget.chitrankagnihotri.com/integrations)                                                     |
| Connect a streaming endpoint     | [Backend and SSE](https://docs.askwidget.chitrankagnihotri.com/backend)                                                           |
| Match your website's colors      | [Theming](https://docs.askwidget.chitrankagnihotri.com/theming)                                                                   |
| Build a custom interface         | [Hooks](https://docs.askwidget.chitrankagnihotri.com/hooks) and [API reference](https://docs.askwidget.chitrankagnihotri.com/api) |
| Diagnose errors                  | [Troubleshooting](https://docs.askwidget.chitrankagnihotri.com/troubleshooting)                                                   |

## Technical specification

<a id="-2027-tech-stack"></a>

<a id="2027-tech-stack"></a>

- npm includes ESM, CommonJS and TypeScript declarations.
- Import `styles.css` once; the legacy `style.css` alias remains available.
- Built-in streaming expects JSON SSE data frames; adapt the request body and
  chunk extractor for your server, or supply a custom handler.
- Persistence is browser-local. Rendered messages are plain text, not Markdown.

See [development](https://docs.askwidget.chitrankagnihotri.com/development)
for build tooling, package verification and website/docs boundaries.

## Development

<a id="️-development"></a>

The repository contains the published widget at the root, a private Next.js
website in `website/`, and a separate Monoline Docs site in `docs/`.

```bash
pnpm install --frozen-lockfile
pnpm build:lib
pnpm dev
```

Rebuild the library after editing package source; the website consumes its emitted
exports. Use `pnpm docs:dev` to preview the documentation separately.
See [CONTRIBUTING.md](https://github.com/chitranklabs/ask-widget/blob/main/CONTRIBUTING.md)
for setup, quality checks and contribution requirements.

## Release Process

<a id="-release-process"></a>

Releases use git-hygiene and git-cliff with prepare/finalize workflows. See the
[maintenance guide](https://docs.askwidget.chitrankagnihotri.com/maintenance)
for npm/JSR publication and recovery; consumers do not need repository release tooling.

## Security & Quality

<a id="️-security--quality"></a>

Repository checks include tests, type checking, Gitleaks and Zizmor. Release
attestations are linked above; these checks do not guarantee vulnerability-free
software. Report security issues through
[SECURITY.md](https://github.com/chitranklabs/ask-widget/blob/main/SECURITY.md).

Licensed under [MIT](https://github.com/chitranklabs/ask-widget/blob/main/LICENSE).

<p align="center">❤️ Developed by <a href="https://chitrankagnihotri.com">Chitrank Agnihotri</a></p>
