<div align="center">
  <img src="https://raw.githubusercontent.com/chitranklabs/ask-widget/main/assets/logo-full.png" alt="ask-widget logo" width="96" />
  <h1>ask-widget</h1>
  <p>A floating React chat widget with streaming responses and headless hooks.</p>

[Website](https://askwidget.chitrankagnihotri.com) · [Docs](https://docs.askwidget.chitrankagnihotri.com/) · [Quickstart](#quick-start) · [API](https://docs.askwidget.chitrankagnihotri.com/api) · [npm](https://www.npmjs.com/package/@chitrank2050/ask-widget)

[![npm](https://img.shields.io/npm/v/@chitrank2050/ask-widget)](https://www.npmjs.com/package/@chitrank2050/ask-widget) [![CI](https://github.com/chitranklabs/ask-widget/actions/workflows/ci.yml/badge.svg)](https://github.com/chitranklabs/ask-widget/actions/workflows/ci.yml) [![License](https://img.shields.io/badge/license-MIT-blue)](https://github.com/chitranklabs/ask-widget/blob/main/LICENSE)

</div>

Use `ChatWidget` for the launcher, conversation panel and composer, or use
`useChat`, `useSSEStream` and `useSession` to build your own interface. Themes,
color overrides, positioning, browser-local history and cancellation are included.
Your backend supplies model access, authentication and request limits.

## Quick Start

<a id="-quick-start"></a><a id="requirements"></a>

Use React and React DOM 18 or newer; the package declares Node.js 24 or newer.
Install the npm distribution for the styled widget:

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

Open the launcher and send a message. This returns **scripted demo responses**;
no backend or AI model is needed. The client directive is needed in Next.js App Router.

Connect real responses with the [backend guide](https://docs.askwidget.chitrankagnihotri.com/backend).
A configured endpoint failure produces an error, not a fallback demo.

> [!IMPORTANT]
> Keep provider keys on your server. Browser `apiToken` values and frontend
> environment variables are public. See [authentication](https://docs.askwidget.chitrankagnihotri.com/getting-started#authentication).

## Guides and Reference

<a id="-features"></a><a id="-documentation--demo"></a><a id="-2027-tech-stack"></a><a id="2027-tech-stack"></a><a id="why-ask-widget"></a><a id="features"></a><a id="documentation--demo"></a><a id="technical-specification"></a>

| Goal                         | Guide                                                                                                                   |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Set up a React framework     | [Next.js and Vite](https://docs.askwidget.chitrankagnihotri.com/integrations)                                           |
| Connect a streaming endpoint | [Backend and SSE](https://docs.askwidget.chitrankagnihotri.com/backend)                                                 |
| Match your website           | [Theming](https://docs.askwidget.chitrankagnihotri.com/theming)                                                         |
| Build a custom interface     | [Hooks](https://docs.askwidget.chitrankagnihotri.com/hooks) and [API](https://docs.askwidget.chitrankagnihotri.com/api) |
| Diagnose errors              | [Troubleshooting](https://docs.askwidget.chitrankagnihotri.com/troubleshooting)                                         |

npm ships ESM, CommonJS, TypeScript declarations and `styles.css` (also available
as the legacy `style.css` alias). [JSR](https://jsr.io/@chitrank2050/ask-widget) ships
TypeScript source without those CSS entry points. See [registry choice](https://docs.askwidget.chitrankagnihotri.com/getting-started#registry-choice).
Messages render as plain text; persistence is browser-local. Adapters support JSON
SSE frames or custom asynchronous handlers; see the [backend contract](https://docs.askwidget.chitrankagnihotri.com/backend).

## Contributing

<a id="️-development"></a><a id="-release-process"></a><a id="️-security--quality"></a><a id="development"></a><a id="release-process"></a><a id="security--quality"></a>

The published widget lives at the root; `website/` and `docs/` are separate
consumers. Start with [CONTRIBUTING.md](https://github.com/chitranklabs/ask-widget/blob/main/CONTRIBUTING.md)
and [development](https://docs.askwidget.chitrankagnihotri.com/development)
for setup, build tooling and verification. Follow the [maintenance guide](https://docs.askwidget.chitrankagnihotri.com/maintenance)
for releases and recovery, or read [release history](https://github.com/chitranklabs/ask-widget/releases).

[Security policy](https://github.com/chitranklabs/ask-widget/blob/main/SECURITY.md) ·
[Quality checks](https://scorecard.dev/viewer/?uri=github.com/chitranklabs/ask-widget) ·
[Build attestations](https://github.com/chitranklabs/ask-widget/attestations) ·
[Coverage](https://codecov.io/gh/chitranklabs/ask-widget) ·
[MIT License](https://github.com/chitranklabs/ask-widget/blob/main/LICENSE)

## Support

If this project is useful to you, you can support its maintenance on Ko-fi.

[![Support on Ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/D1D71U581P)

<p align="center">Developed by <a href="https://chitrankagnihotri.com">Chitrank Agnihotri</a></p>
