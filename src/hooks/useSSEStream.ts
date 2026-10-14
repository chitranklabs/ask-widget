import { useCallback } from 'react';
import type { ChatMessage } from '../types';

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
   * @default (message, history) => ({ messages: [...history, { role: 'user', content: message }] })
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
  ) => AsyncGenerator<string, void, unknown>;
}

const defaultExtractChunk = (data: unknown): string | undefined => {
  if (typeof data !== 'object' || data === null) return undefined;
  const choices = (data as Record<string, unknown>).choices;
  if (!Array.isArray(choices) || choices.length === 0) return undefined;
  const delta = (choices[0] as Record<string, unknown>).delta;
  if (typeof delta !== 'object' || delta === null) return undefined;
  const content = (delta as Record<string, unknown>).content;
  return typeof content === 'string' ? content : undefined;
};

const defaultBuildBody = (message: string, history: ChatMessage[]) => ({
  messages: [
    ...history.map(m => ({ role: m.role, content: m.content })),
    { role: 'user' as const, content: message },
  ],
});

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
    async function* (message: string, history: ChatMessage[]) {
      const response = await fetch(`${apiUrl}${path}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(apiToken ? { Authorization: `Bearer ${apiToken}` } : {}),
        },
        body: JSON.stringify(buildBody(message, history)),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'Unknown network error' }));
        throw new Error(
          ((error as Record<string, unknown>).detail as string) || 'API request failed',
        );
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('Response body is null');

      const decoder = new TextDecoder();
      let buffer = '';

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith('data: ')) continue;

            const data = trimmed.slice(6);
            if (data === '[DONE]') return;

            try {
              const parsed: unknown = JSON.parse(data);
              const content = extractChunk(parsed);
              if (content) yield content;
            } catch (e) {
              console.warn('[useSSEStream] Failed to parse SSE data:', e);
            }
          }
        }
      } finally {
        reader.releaseLock();
      }
    },
    [apiUrl, apiToken, path, buildBody, extractChunk],
  );

  return { streamResponse };
}
