<div align="center">
  <img src="./assets/logo.png" alt="ask-widget logo"  width="200" height="auto" />
  <br/>
  <br/>
  <br/>
  <h1>ask-widget 🤖</h1>

  <p>A state-of-the-art, lightweight chat widget for developer portfolios. Powered by <strong>Vite 8</strong> and the <strong>Rolldown</strong> engine for sub-5KB performance and perfect CSS isolation.
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
  <img src="https://img.shields.io/badge/SLSA-Level_3-blue?logo=slsa" alt="SLSA Level 3" />
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

---

## 🚀 2027 Tech Stack

This project is built for the future of the web:

- **Engine**: [Vite 8](https://vite.dev) + [Rolldown](https://rolldown.rs) (Rust-powered performance)
- **Compiler**: SWC (Sub-millisecond React transformation)
- **CSS**: Cascade Layers (`@layer`) + HSL Tokens (Zero global collisions)
- **Runtime**: Dual ESM/CJS (Native support for Node, Bun, and Deno)
- **Security**: SLSA Level 3 Provenance + Gitleaks protection

---

## ✨ Features

- **SSE Streaming**: Built-in support for OpenAI-compatible streaming backends.
- **Themeable**: Zinc-based design system with easy HSL overrides.
- **Persistence**: Built-in session persistence across page reloads.

---

## 📖 Documentation & Demo

- **Live Demo**: [askwidget.chitrankagnihotri.com](https://askwidget.chitrankagnihotri.com)
- **API Reference**: [Automated Docs](https://docs.askwidget.chitrankagnihotri.com/api)
- **Theming Guide**: [Customizing Zinc](https://docs.askwidget.chitrankagnihotri.com/theming)

---

## 📦 Quick Start

```bash
pnpm add @chitrank2050/ask-widget
```

```tsx
import { ChatWidget } from '@chitrank2050/ask-widget';
import '@chitrank2050/ask-widget/styles.css';

export default function App() {
  return <ChatWidget apiUrl="https://your-api.example.com" title="Ask AI" />;
}
```

---

`apiUrl` should point to your backend. Keep private provider keys on the server;
`apiToken` and frontend environment variables are visible in the browser. See
the [authentication guide](docs/content/getting-started.md#authentication). The
`style.css` alias remains available for existing consumers.

## 🛠️ Development

We use **pnpm** and **Lefthook** for a high-performance developer workflow.

```bash
# Install and setup
pnpm install
pnpm exec lefthook install

# Run dev server
pnpm dev

# Run automated tests (Vitest + SWC)
pnpm run test:coverage
```

---

## 🚀 Release Process

We use a two-phase automated release pipeline powered by **[git-hygiene](https://github.com/chitranklabs/git-hygiene)**.

1. **Prepare**: Run the `Release 1 - Prepare PR` workflow. It bumps the version in `package.json`, updates `CHANGELOG.md`, and opens a PR.
2. **Finalize**: Merge the PR to `main`. The `Release 2 - Finalize Tag` workflow will automatically tag the release, create a GitHub Release, and publish to NPM.

---

## 🛡️ Security & Quality

- **Secret Scanning**: Gitleaks prevents credential leaks in every commit.
- **Workflow Auditing**: Zizmor ensures GitHub Actions follow security best practices.
- **Supply Chain**: All GitHub Actions are pinned to secure commit SHAs.
- **Provenace**: Automated build attestations for every release.

---

Developed with ❤️ by [Chitrank Agnihotri](https://www.chitrankagnihotri.com)

_If you use this in your project, a credit or star is appreciated._ ✨
