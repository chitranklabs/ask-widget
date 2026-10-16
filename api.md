# API reference

## ChatWidget props

Props are generated from the installed repository source. `streamResponse` takes precedence over `apiUrl` and `apiToken`; no backend props selects demo mode.

ChatWidget props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `apiUrl` | `string \| undefined` | `—` | Base URL of your chat API. When provided (without a custom \`streamResponse\`), the widget will automatically use \`useSSEStream\` to connect to \`\<apiUrl\>/v1/chat\` with an OpenAI-compatible payload. |
| `apiToken` | `string \| undefined` | `—` | Bearer token for API authentication. Browser-visible token. Use only a short-lived token scoped to your backend. Keep private provider credentials on the server; frontend environment variables do not conceal secrets. |
| `position` | `ChatPosition \| undefined` | `bottom-right` | Position of the floating button and chat panel. |
| `theme` | `ChatTheme \| undefined` | `dark` | Color theme preset. |
| `colors` | `ChatColors \| undefined` | `—` | Custom color overrides - merged with theme defaults. |
| `title` | `string \| undefined` | `Ask AI` | Title shown in the chat panel header. |
| `placeholder` | `string \| undefined` | `Ask me anything...` | Placeholder text in the message input. |
| `initialMessage` | `string \| undefined` | `Hello! How can I help you today?` | First message displayed when the panel opens. |
| `defaultOpen` | `boolean \| undefined` | `false` | Whether the chat panel starts open. |
| `labels` | `ChatLabels \| undefined` | `—` | Custom text labels for technical indicators in the UI. |
| `persistenceKey` | `string \| undefined` | `ask_widget_session` | The localStorage key used to persist chat history. |
| `streamResponse` | `ChatStreamHandler \| undefined` | `—` | Custom response handler - takes full control of streaming. Use this when you need custom fetch logic, auth flows, or a non-SSE backend. When provided, \`apiUrl\` and \`apiToken\` are ignored. |

## `ChatStreamHandler` Type

If you have a non-standard API or require custom fetch logic, you can pass a `streamResponse` handler:

```ts
export type ChatStreamResult =
  string | AsyncIterable<string> | Promise<string | AsyncIterable<string>>;

export interface ChatStreamContext {
  signal: AbortSignal;
}
export type ChatStreamHandler = (
  message: string,
  history: ChatMessage[],
  context?: ChatStreamContext,
) => ChatStreamResult;
```

### Example Usage

```tsx
import { ChatWidget, type ChatStreamHandler } from '@chitrank2050/ask-widget';

const streamResponse: ChatStreamHandler = async (message, history) => {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history }),
  });
  if (!response.ok) throw new Error('Chat request failed');
  return response.text();
};

export function Assistant() {
  return <ChatWidget streamResponse={streamResponse} />;
}
```

This example expects a plain-text response from your own backend. For token streaming, use the [SSE adapter](/backend) or return an async iterable that decodes your backend’s stream.
