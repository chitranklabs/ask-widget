import { useCallback } from 'react';
import type { ChatMessage, ChatStreamContext } from '../types';

/**
 * SSE stream configuration options.
 */
export interface SSEStreamOptions {
  /**
   * Base URL of the chat API endpoint.
   * @example "https://your-api.railway.app"
   */
  apiUrl: string;

  /**
   * Optional Bearer token for API authentication.
   * Browser-visible: never pass a private provider key.
   * @example session.accessToken
   */
  apiToken?: string;

  /**
   * Path to the chat endpoint.
   * @default "/v1/chat"
   */
  path?: string;

  /**
   * Custom function to build the request body from the current message and history.
   * Override this to match your backend's expected payload shape.
   *
   * History includes the submitted user message; the default body avoids adding it twice.
   */
  buildBody?: (message: string, history: ChatMessage[]) => unknown;

  /**
   * Custom function to extract the text chunk from a parsed SSE data object.
   * Override this to match your backend's streamed JSON shape.
   *
   * Defaults to OpenAI-compatible: `data.choices[0].delta.content`
   */
  extractChunk?: (data: unknown) => string | undefined;
}

/**
 * Return type of the useSSEStream hook.
 */
export interface UseSSEStreamReturn {
  streamResponse: (
    message: string,
    history: ChatMessage[],
    context?: ChatStreamContext,
  ) => AsyncGenerator<string, void, unknown>;
}

const defaultExtractChunk = (data: unknown): string | undefined => {
  if (typeof data !== 'object' || data === null) return undefined;
  const choices = (data as Record<string, unknown>).choices;
  if (!Array.isArray(choices) || choices.length === 0) return undefined;
  const first = choices[0];
  if (typeof first !== 'object' || first === null) return undefined;
  const delta = (first as Record<string, unknown>).delta;
  if (typeof delta !== 'object' || delta === null) return undefined;
  const content = (delta as Record<string, unknown>).content;
  return typeof content === 'string' ? content : undefined;
};

const defaultBuildBody = (message: string, history: ChatMessage[]) => {
  const last = history.at(-1);
  const messages = history.map(item => ({ role: item.role, content: item.content }));
  if (last?.role !== 'user' || last.content !== message)
    messages.push({ role: 'user', content: message });
  return { messages, stream: true };
};

/**
 * Hook providing a generic SSE-backed response adapter.
 *
 * Pass the returned `streamResponse` to `ChatWidget`'s `streamResponse` prop.
 *
 * @example
 * ```tsx
 * const { streamResponse } = useSSEStream({
 *   apiUrl: 'https://my-api.example.com',
 * })
 *
 * return <ChatWidget streamResponse={streamResponse} />
 * ```
 */
export function useSSEStream({
  apiUrl,
  apiToken,
  path = '/v1/chat',
  buildBody = defaultBuildBody,
  extractChunk = defaultExtractChunk,
}: SSEStreamOptions): UseSSEStreamReturn {
  const streamResponse = useCallback(
    async function* (message: string, history: ChatMessage[], context?: ChatStreamContext) {
      const response = await fetch(`${apiUrl}${path}`, {
        method: 'POST',
        signal: context?.signal,
        headers: {
          'Content-Type': 'application/json',
          ...(apiToken ? { Authorization: `Bearer ${apiToken}` } : {}),
        },
        body: JSON.stringify(buildBody(message, history)),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'Unknown network error' }));
        const detail =
          typeof error === 'object' &&
          error !== null &&
          'detail' in error &&
          typeof error.detail === 'string'
            ? error.detail
            : 'API request failed';
        throw new Error(detail);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('Response body is null');

      const decoder = new TextDecoder();
      let buffer = '';
      let dataLines: string[] = [];
      let ended = false;
      let completed = false;
      const cancel = () => {
        void reader.cancel().catch(() => {});
      };
      context?.signal.addEventListener('abort', cancel, { once: true });

      const event = (): string | undefined => {
        if (!dataLines.length) return;
        const data = dataLines.join('\n');
        dataLines = [];
        if (data === '[DONE]') {
          ended = true;
          return;
        }
        let parsed: unknown;
        try {
          parsed = JSON.parse(data);
        } catch {
          console.warn('[useSSEStream] Invalid JSON data frame');
          return;
        }
        return extractChunk(parsed);
      };
      const line = (value: string): string | undefined => {
        if (!value) return event();
        if (value.startsWith('data:')) dataLines.push(value.slice(5).replace(/^ /, ''));
      };
      function* lines(final = false): Generator<string> {
        let match: RegExpExecArray | null;
        while ((match = /[\r\n]/.exec(buffer))) {
          const index = match.index;
          if (!final && buffer[index] === '\r' && index === buffer.length - 1) break;
          const value = buffer.slice(0, index);
          const count = buffer[index] === '\r' && buffer[index + 1] === '\n' ? 2 : 1;
          buffer = buffer.slice(index + count);
          const content = line(value);
          if (content) yield content;
          if (ended) return;
        }
      }
      try {
        if (context?.signal.aborted) return;
        while (true) {
          const { done, value } = await reader.read();
          if (context?.signal.aborted) return;
          buffer += done ? decoder.decode() : decoder.decode(value, { stream: true });
          yield* lines(done);
          if (ended) return;
          if (done) {
            // Be tolerant of adapters that omit the final newline or blank separator.
            if (buffer) line(buffer);
            const content = event();
            if (content) yield content;
            completed = true;
            return;
          }
        }
      } finally {
        context?.signal.removeEventListener('abort', cancel);
        if (!completed) await reader.cancel().catch(() => {});
        reader.releaseLock();
      }
    },
    [apiUrl, apiToken, path, buildBody, extractChunk],
  );

  return { streamResponse };
}
