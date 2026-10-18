Render the widget with scripted demo responses first, then connect your own
streaming backend. The widget provides the interface; your server supplies model
access and authentication.

## Requirements

- React and React DOM 18 or newer.
- Node.js 24 or newer, as declared by the published package.
- A React application; Next.js App Router needs a client component boundary.

## Installation

```bash
# with npm
npm install @chitrank2050/ask-widget

# with pnpm
pnpm add @chitrank2050/ask-widget

# with yarn
yarn add @chitrank2050/ask-widget
```

## Registry choice

Use the npm distribution for the styled React widget; it includes the compiled
stylesheet and its `styles.css` and legacy `style.css` aliases. The JSR distribution
publishes TypeScript source and hooks. JSR does not support CSS module entry points,
so the npm stylesheet aliases are not available there. Use npm when following the
styled widget examples below.

## Basic Usage

Start with a working demo that needs no backend. Render the widget in your
application; this example includes the client boundary required by Next.js.

```tsx
'use client';

import { ChatWidget } from '@chitrank2050/ask-widget';
import '@chitrank2050/ask-widget/styles.css';

export default function App() {
  return (
    <main>
      <ChatWidget position="bottom-right" theme="dark" title="Ask Anything" />
    </main>
  );
}
```

<a id="prerequisites"></a>

## Connect a backend

The example above omits `apiUrl` and `streamResponse`, so it uses built-in
**scripted demo responses**, not a model. A nonempty `apiUrl` selects the SSE
adapter; an unavailable backend produces an error rather than falling back to demo.

Follow [Backend and SSE](/backend) for the request/response contract and a local
Next.js route example. The default adapter appends `/v1/chat` to `apiUrl`; for a
same-origin `/api/chat` route, use the explicit hook setup in that guide.

## Authentication

Keep private provider API keys on your server. The widget sends requests from
the browser, so `apiToken` is visible to the person using the page. Vite
`VITE_*` and Next.js `NEXT_PUBLIC_*` variables are public client configuration,
not secret storage.

Point `apiUrl` at your own backend, or use `streamResponse` for an authenticated
application endpoint. If your backend requires a browser bearer token, use a
short-lived token scoped to that user and endpoint, not a private provider key.

Use `@chitrank2050/ask-widget/styles.css` for the widget stylesheet. The older
`style.css` export remains supported for existing consumers.
