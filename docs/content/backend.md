---
title: Backend and SSE
description: Connect the widget to your own authenticated streaming backend.
---

## Keep credentials on the server

The widget does not host a model or authenticate users. Your server owns provider
credentials, user authorization, rate limits and request validation. Browser
`apiToken` values are visible to users; use only short-lived, scoped credentials.

## Built-in adapter

`apiUrl` is concatenated with `/v1/chat`. For a same-origin backend, `apiUrl=""`
does not select the adapter: use `useSSEStream({ apiUrl: '', path: '/api/chat' })`
and pass its `streamResponse` to `ChatWidget`.

```tsx
'use client';
import { ChatWidget, useSSEStream } from '@chitrank2050/ask-widget';
import '@chitrank2050/ask-widget/styles.css';

export function Assistant() {
  const { streamResponse } = useSSEStream({ apiUrl: '', path: '/api/chat' });
  return <ChatWidget streamResponse={streamResponse} />;
}
```

The default body contains `messages` and `stream: true`. The default extractor
reads `choices[0].delta.content` from JSON data lines and stops on `[DONE]`.
The path is an ask-widget convention, not a promise that every provider exposes
`/v1/chat`. Adapt `path`, `buildBody` and `extractChunk` to your backend.

The current parser expects one JSON payload per `data:` line with a space after the colon. Generic multiline
SSE events are not supported. `useChat` supplies history including the current
user message; the built-in default body currently appends that message again.
To avoid duplication, provide `buildBody` using the supplied history directly:

```tsx
const { streamResponse } = useSSEStream({
  apiUrl: '',
  path: '/api/chat',
  buildBody: (_message, history) => ({
    messages: history.map(({ role, content }) => ({ role, content })),
    stream: true,
  }),
});
```

## Cross-origin requests

A remote backend must allow your website origin, POST requests and any required
headers in its CORS policy. Do not disable browser security to work around CORS.

## Custom protocols

Supply a [ChatStreamHandler](api.mdx#chatstreamhandler-type) when your response
format differs. It can return text, a promise of text or an async iterable of
text chunks. Rendered message content is plain text; Markdown rendering is not
part of the current widget.
