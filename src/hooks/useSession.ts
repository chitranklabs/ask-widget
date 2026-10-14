import React, { useState, useCallback, useEffect, useRef } from 'react';
import type { ChatMessage } from '../types';

export interface UseSessionReturn {
  messages: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
  updateMessage: (id: string, update: Partial<ChatMessage>) => void;
  clearSession: () => void;
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

function restoreMessages(value: unknown): ChatMessage[] {
  if (!Array.isArray(value)) throw new Error('Invalid session');
  return value.map(item => {
    if (
      !item ||
      typeof item !== 'object' ||
      typeof item.id !== 'string' ||
      !['user', 'assistant'].includes(item.role) ||
      typeof item.content !== 'string' ||
      typeof item.timestamp !== 'string' ||
      (item.cached !== undefined && typeof item.cached !== 'boolean')
    ) {
      throw new Error('Invalid session message');
    }
    const timestamp = new Date(item.timestamp);
    if (!Number.isFinite(timestamp.getTime())) throw new Error('Invalid session timestamp');
    return { id: item.id, role: item.role, content: item.content, timestamp, cached: item.cached };
  });
}

/** Browser persistence with SSR-safe initialization and validated stored messages. */
export function useSession(
  id = 'ask-widget-session',
  initialMessages: ChatMessage[] = [],
): UseSessionReturn {
  const defaults = useRef(initialMessages);
  useEffect(() => {
    defaults.current = initialMessages;
  }, [initialMessages]);
  const [session, setSession] = useState({ id, messages: initialMessages, loaded: false });

  useEffect(() => {
    let messages = defaults.current;
    try {
      const stored = localStorage.getItem(`widget-session-${id}`);
      if (stored) messages = restoreMessages(JSON.parse(stored));
    } catch {
      console.warn('Unable to restore chat session');
    }
    setSession({ id, messages, loaded: true });
  }, [id]);

  useEffect(() => {
    if (!session.loaded || session.id !== id) return;
    try {
      if (session.messages.length)
        localStorage.setItem(`widget-session-${id}`, JSON.stringify(session.messages));
      else localStorage.removeItem(`widget-session-${id}`);
    } catch {
      console.warn('Unable to save chat session');
    }
  }, [session, id]);

  const setMessages: UseSessionReturn['setMessages'] = useCallback(
    update => {
      setSession(current => {
        const messages = current.id === id ? current.messages : defaults.current;
        return {
          id,
          loaded: current.id === id && current.loaded,
          messages: typeof update === 'function' ? update(messages) : update,
        };
      });
    },
    [id],
  );
  const addMessage = useCallback(
    (message: ChatMessage) => setMessages(current => [...current, message]),
    [setMessages],
  );
  const updateMessage = useCallback(
    (id: string, update: Partial<ChatMessage>) =>
      setMessages(current =>
        current.map(message => (message.id === id ? { ...message, ...update } : message)),
      ),
    [setMessages],
  );
  const clearSession = useCallback(() => {
    setMessages(defaults.current);
    try {
      localStorage.removeItem(`widget-session-${id}`);
    } catch {
      console.warn('Unable to clear chat session');
    }
  }, [id, setMessages]);

  return {
    messages: session.id === id ? session.messages : initialMessages,
    addMessage,
    updateMessage,
    clearSession,
    setMessages,
  };
}
