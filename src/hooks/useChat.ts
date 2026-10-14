import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import type { ChatMessage, ChatStreamHandler, ChatStreamResult } from '../types';
import { useSession } from './useSession';

const getNow = () => performance.now();

const createId = (role: ChatMessage['role']) => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${role}-${crypto.randomUUID()}`;
  }
  return `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const createMessage = (
  role: ChatMessage['role'],
  content: string,
  cached = false,
): ChatMessage => ({
  id: createId(role),
  role,
  content,
  timestamp: new Date(),
  cached,
});

const isAsyncIterable = (value: unknown): value is AsyncIterable<string> =>
  typeof value === 'object' &&
  value !== null &&
  Symbol.asyncIterator in value &&
  typeof value[Symbol.asyncIterator] === 'function';

async function* toAsyncChunks(stream: ChatStreamResult) {
  const resolved = await stream;
  if (isAsyncIterable(resolved)) {
    for await (const chunk of resolved) yield chunk;
    return;
  }
  yield resolved;
}

interface UseChatOptions {
  initialMessage?: string;
  streamResponse?: ChatStreamHandler;
  persistenceKey?: string;
}

/**
 * Return type of the useChat hook.
 */
export interface UseChatReturn {
  messages: ChatMessage[];
  isStreaming: boolean;
  latency: number | null;
  activeStreamId: string | null;
  inputValue: string;
  setInputValue: (value: string) => void;
  sendMessage: (content: string) => Promise<void>;
  clearHistory: () => void;
  cancelResponse: () => void;
}

export function useChat({
  initialMessage,
  streamResponse,
  persistenceKey,
}: UseChatOptions = {}): UseChatReturn {
  const defaultMessages = useMemo(
    () => (initialMessage ? [createMessage('assistant', initialMessage, true)] : []),
    [initialMessage],
  );
  const { messages, setMessages, clearSession } = useSession(
    persistenceKey || 'ask_widget_temp',
    defaultMessages,
  );

  const currentHistory = useRef(messages);
  useEffect(() => {
    currentHistory.current = messages;
  }, [messages]);
  const updateMessages = useCallback(
    (update: ChatMessage[] | ((messages: ChatMessage[]) => ChatMessage[])) => {
      const next = typeof update === 'function' ? update(currentHistory.current) : update;
      currentHistory.current = next;
      setMessages(next);
    },
    [setMessages],
  );

  const [isStreaming, setIsStreaming] = useState(false);
  const [latency, setLatency] = useState<number | null>(null);
  const [activeStreamId, setActiveStreamId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const activeRequest = useRef<AbortController | null>(null);

  const cancelResponse = useCallback(() => {
    activeRequest.current?.abort();
    activeRequest.current = null;
    setIsStreaming(false);
    setActiveStreamId(null);
  }, []);

  useEffect(() => {
    // The conversation key owns the external request; reflect its cancellation in the UI.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    cancelResponse();
    return () => {
      activeRequest.current?.abort();
      activeRequest.current = null;
    };
  }, [persistenceKey, cancelResponse]);

  const sendMessage = useCallback(
    async (content: string) => {
      const prompt = content.trim();
      if (!prompt || activeRequest.current) return;
      const controller = new AbortController();
      activeRequest.current = controller;
      const isActive = () => activeRequest.current === controller && !controller.signal.aborted;

      const startedAt = getNow();
      const userMessage = createMessage('user', prompt);
      const assistantMessage = createMessage('assistant', '');
      const nextHistory = [...currentHistory.current, userMessage];

      updateMessages([...nextHistory, assistantMessage]);
      setInputValue('');
      setLatency(null);
      setIsStreaming(true);
      setActiveStreamId(assistantMessage.id);

      let sawFirstChunk = false;

      try {
        if (!streamResponse) {
          throw new Error('No stream response handler provided');
        }

        const stream = toAsyncChunks(
          streamResponse(prompt, nextHistory, { signal: controller.signal }),
        );

        for await (const chunk of stream) {
          if (!isActive()) break;
          if (isActive() && !sawFirstChunk) {
            setLatency((getNow() - startedAt) / 1000);
            sawFirstChunk = true;
          }

          updateMessages(current =>
            current.map(msg =>
              msg.id === assistantMessage.id ? { ...msg, content: msg.content + chunk } : msg,
            ),
          );
        }

        if (isActive() && !sawFirstChunk) {
          setLatency((getNow() - startedAt) / 1000);
        }
      } catch (error) {
        if (!isActive()) return;
        const fallback = error instanceof Error ? error.message : 'Unable to complete response.';
        updateMessages(current =>
          current.map(msg =>
            msg.id === assistantMessage.id
              ? { ...msg, content: `Stream interrupted. ${fallback}` }
              : msg,
          ),
        );
      } finally {
        if (activeRequest.current === controller) {
          activeRequest.current = null;
          setIsStreaming(false);
          setActiveStreamId(null);
        }
      }
    },
    [streamResponse, updateMessages],
  );

  const clearHistory = useCallback(() => {
    cancelResponse();
    currentHistory.current = defaultMessages;
    clearSession();
    setLatency(null);
    setInputValue('');
  }, [clearSession, cancelResponse, defaultMessages]);

  return {
    messages,
    isStreaming,
    latency,
    activeStreamId,
    inputValue,
    setInputValue,
    sendMessage,
    clearHistory,
    cancelResponse,
  };
}
