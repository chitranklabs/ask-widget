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

## Verify a local Next.js route

Use the `Assistant` component above with this `app/api/chat/route.ts` handler.
This is a scripted transport example, not an AI provider integration. It lets you
verify the URL, request body and SSE framing before adding external services.

```ts
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response('Expected JSON', { status: 400 });
  }
  if (!body || typeof body !== 'object' || !('messages' in body) || !Array.isArray(body.messages)) {
    return new Response('Expected a messages array', { status: 400 });
  }

  const frames = ['Hello', ' from your local route.'].map(
    chunk => `data: ${JSON.stringify({ choices: [{ delta: { content: chunk } }] })}\n\n`,
  );
  return new Response(frames.join('') + 'data: [DONE]\n\n', {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
    },
  });
}
```

Start your Next.js app and send a widget message. You should see
**Hello from your local route.** The network panel should show a successful
`POST /api/chat`. This small fixture returns its frames together; a real backend
can send the same frames incrementally as a provider produces tokens.

The default adapter sends this JSON shape:

```json
{
  "messages": [{ "role": "user", "content": "Hello" }],
  "stream": true
}
```

Before replacing the scripted text with a provider call, add your application's
authentication, request validation and limits on the server. Forward cancellation
to that call, keep credentials server-side, and return only the response protocol
your adapter expects. The widget does not implement those server policies.

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
