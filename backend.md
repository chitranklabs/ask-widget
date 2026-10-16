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

The parser accepts multiline JSON data events, optional spaces after `data:`,
CR/LF line endings and UTF-8 characters split across network chunks. It also accepts
an unterminated final JSON frame at EOF. It does not implement EventSource
reconnection or retry fields.

`useChat` supplies history including the current user message exactly once. The
default request body uses that history without duplicating the prompt. A standalone
adapter call can supply prior history; the adapter appends the prompt unless it is
already the last user message.

## Cancel a response

Closing the panel, pressing Escape or resetting the conversation cancels the active
response. `useChat` also exposes `cancelResponse()`. The built-in adapter aborts
fetch and cancels its reader. Custom handlers receive an optional third argument
with an `AbortSignal`; pass it to your network request:

```tsx
import type { ChatStreamHandler } from '@chitrank2050/ask-widget';

const streamResponse: ChatStreamHandler = async (message, history, context) => {
  const response = await fetch('/api/chat', {
    method: 'POST',
    signal: context?.signal,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history }),
  });
  if (!response.ok) throw new Error('Chat request failed');
  return response.text();
};
```

Existing two-argument handlers continue to work. Their late results are ignored
after cancellation, but stopping custom network or server work requires the handler
to honor the signal.

## Cross-origin requests

A remote backend must allow your website origin, POST requests and any required
headers in its CORS policy. Do not disable browser security to work around CORS.

## Custom protocols

Supply a [ChatStreamHandler](/api#chatstreamhandler-type) when your response
format differs. It can return text, a promise of text or an async iterable of
text chunks. Rendered message content is plain text; Markdown rendering is not
part of the current widget.
