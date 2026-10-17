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
  cancelResponse,
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
import { useChat, useSSEStream } from '@chitrank2050/ask-widget';

function CustomChat() {
  const { streamResponse } = useSSEStream({
    apiUrl: 'https://my-api.com',
    path: '/v1/chat',
    // Also accepts custom body builders and chunk extractors.
  });
  const { messages, sendMessage, isStreaming } = useChat({ streamResponse });

  return <MyCustomUI messages={messages} onSend={sendMessage} disabled={isStreaming} />;
}
```

`MyCustomUI` represents your own interface. `useChat` supplies message history
and consumes the adapter’s async iterable; merely calling `streamResponse` does
not start a request.

## `useSession`

A simple hook to handle message persistence to `localStorage`.

```tsx
import { useSession } from '@chitrank2050/ask-widget';

const { messages, setMessages, clearSession } = useSession('my_chat_session');
```

The hooks must run inside a React component or custom hook. `useSession` takes
a persistence key and optional initial messages; it does not accept an options
object. Treat persisted chat history as browser-local data, not secure storage.

`cancelResponse()` stops the current response without clearing completed messages.
`clearHistory()` cancels before resetting. Custom handlers can use their optional
abort context as shown in [Backend and SSE](/backend#cancel-a-response).

Persisted messages are validated before restoration. An unavailable storage API
falls back to in-memory state; changing the session key loads that conversation
without copying the previous conversation into its storage entry.
