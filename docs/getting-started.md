# Getting Started

**ask-widget** is a lightweight React component for adding a streaming AI chat assistant to your developer portfolio. It’s strictly monochrome by default and designed to align with the popular "zinc/neutral" aesthetic.

## Installation

```bash
# with npm
npm install @chitrank2050/ask-widget

# with pnpm
pnpm add @chitrank2050/ask-widget

# with yarn
yarn add @chitrank2050/ask-widget
```

## Basic Usage

To use the widget, render it at the root of your application (or any top-level layout).

```tsx
import { ChatWidget } from '@chitrank2050/ask-widget';
import '@chitrank2050/ask-widget/styles.css';

export default function App() {
  return (
    <main>
      <ChatWidget
        apiUrl="https://your-api.example.com"
        position="bottom-right"
        theme="dark"
        title="Ask Anything"
      />
    </main>
  );
}
```

## Prerequisites

To enable real chat streaming, you'll need an API that supports Server-Sent Events (SSE). By default, `ask-widget` expects an OpenAI-compatible endpoint at `/v1/chat` that accepts a `POST` request with a `messages` array in the body.

If you don't have a backend ready yet, the widget will automatically run in **demo mode** (interactive mocked responses).

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
