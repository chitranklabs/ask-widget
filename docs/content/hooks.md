---
title: Standalone hooks
description: Build a custom React chat interface with chat, SSE and persistence hooks.
---

**ask-widget** is more than just a component-it's a collection of headless hooks that you can use to build your own completely custom chat interface.

## `useChat`

Manages chat state, message history, and the streaming lifecycle.

```tsx
import { useChat } from '@chitrank2050/ask-widget';

const {
  messages,
  isStreaming,
  latency,
  activeStreamId,
  inputValue,
  setInputValue,
  sendMessage,
  clearHistory,
} = useChat({
  initialMessage: 'Hi! How can I help?',
  streamResponse: async function* (message) {
    yield message.toUpperCase();
  },
});
```

## `useSSEStream`

Handles the SSE connection, fetch headers, and token parsing from compatible SSE APIs.

```tsx
import { useSSEStream } from '@chitrank2050/ask-widget'

const { streamResponse } = useSSEStream({
  apiUrl: "https://my-api.com",
  path: "/v1/chat",
  // also takes customizable body builders and chunk extractors
})

<MyCustomUI onSend={(msg) => streamResponse(msg, history)} />
```

## `useSession`

A simple hook to handle message persistence to `localStorage`.

```tsx
import { useSession } from '@chitrank2050/ask-widget';

const { messages, setMessages, clearSession } = useSession('my_chat_session');
```

The hooks must run inside a React component or custom hook. `useSession` takes
a persistence key and optional initial messages; it does not accept an options
object. Treat persisted chat history as browser-local data, not secure storage.
