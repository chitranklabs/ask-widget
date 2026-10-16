---
title: React chat integration for Next.js and Vite
description: Add ask-widget to Next.js App Router or Vite with the correct client boundary, stylesheet imports and backend configuration.
---

## Next.js App Router

Wrap the interactive widget in a client component and import its stylesheet:

```tsx
'use client';
import { ChatWidget } from '@chitrank2050/ask-widget';
import '@chitrank2050/ask-widget/styles.css';

export default function Assistant() {
  return <ChatWidget title="Ask about this project" />;
}
```

Render `Assistant` from your layout. This example runs demo responses. Connect
your own endpoint using the [backend guide](backend.md). Keep private provider
keys in server-only environment variables.

## Vite React

```tsx
import { ChatWidget } from '@chitrank2050/ask-widget';
import '@chitrank2050/ask-widget/styles.css';

export default function App() {
  return <ChatWidget />;
}
```

The published package declares React and React DOM 18 or newer as peers.
Vite `VITE_*` variables and Next.js `NEXT_PUBLIC_*` variables enter browser code;
they are suitable for public configuration, not private credentials.

## Multiple widgets

Give independent conversations distinct `persistenceKey` values. Otherwise they
share the same browser-local history key. Configure positions so launchers do not
overlap. The widget does not synchronize conversation state between open tabs.
