import { StrictMode } from 'react';
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useSession } from '../src/hooks/useSession';
import type { ChatMessage } from '../src/types';

describe('useSession', () => {
  const sessionId = 'test-session';
  const storageKey = `widget-session-${sessionId}`;

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should initialize with provided messages', () => {
    const initial: ChatMessage[] = [
      { id: '1', role: 'user', content: 'Hi', timestamp: new Date() },
    ];
    const { result } = renderHook(() => useSession(sessionId, initial));
    expect(result.current.messages).toEqual(initial);
  });

  it('should load messages from localStorage on mount', () => {
    const storedMessages = [
      { id: '1', role: 'user', content: 'Stored', timestamp: new Date().toISOString() },
    ];
    localStorage.setItem(storageKey, JSON.stringify(storedMessages));

    const { result } = renderHook(() => useSession(sessionId));

    // Wait for useEffect
    expect(result.current.messages[0].content).toBe('Stored');
    expect(result.current.messages[0].timestamp).toBeInstanceOf(Date);
  });

  it('should save messages to localStorage when added', () => {
    const { result } = renderHook(() => useSession(sessionId));
    const newMessage: ChatMessage = {
      id: '2',
      role: 'assistant',
      content: 'Hello',
      timestamp: new Date(),
    };

    act(() => {
      result.current.addMessage(newMessage);
    });

    const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
    expect(stored).toHaveLength(1);
    expect(stored[0].content).toBe('Hello');
  });

  it('should update an existing message', () => {
    const initial: ChatMessage[] = [
      { id: 'msg-1', role: 'assistant', content: 'Old', timestamp: new Date() },
    ];
    const { result } = renderHook(() => useSession(sessionId, initial));

    act(() => {
      result.current.updateMessage('msg-1', { content: 'New' });
    });

    expect(result.current.messages[0].content).toBe('New');
    const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
    expect(stored[0].content).toBe('New');
  });

  it('should clear the session', () => {
    localStorage.setItem(storageKey, JSON.stringify([{ id: '1' }]));
    const { result } = renderHook(() => useSession(sessionId));

    act(() => {
      result.current.clearSession();
    });

    expect(result.current.messages).toHaveLength(0);
    expect(localStorage.getItem(storageKey)).toBeNull();
  });

  it('should handle corrupted localStorage data gracefully', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    localStorage.setItem(storageKey, 'invalid-json{');

    const { result } = renderHook(() => useSession(sessionId));

    expect(result.current.messages).toHaveLength(0);
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('preserves saved history when effects replay in StrictMode', () => {
    localStorage.setItem(
      storageKey,
      JSON.stringify([
        { id: '1', role: 'user', content: 'Saved', timestamp: new Date().toISOString() },
      ]),
    );
    const { result } = renderHook(() => useSession(sessionId), { wrapper: StrictMode });
    expect(result.current.messages[0]?.content).toBe('Saved');
    expect(JSON.parse(localStorage.getItem(storageKey) || '[]')[0]?.content).toBe('Saved');
  });

  it('rejects structurally invalid history and invalid timestamps', () => {
    localStorage.setItem(
      storageKey,
      JSON.stringify([{ id: '1', role: 'admin', content: 2, timestamp: 'invalid' }]),
    );
    const { result } = renderHook(() => useSession(sessionId));
    expect(result.current.messages).toEqual([]);
  });

  it('loads a new session without copying the old session into its key', () => {
    localStorage.setItem(
      'widget-session-other',
      JSON.stringify([
        { id: '2', role: 'user', content: 'Other', timestamp: new Date().toISOString() },
      ]),
    );
    const { result, rerender } = renderHook(({ id }) => useSession(id), {
      initialProps: { id: sessionId },
    });
    act(() =>
      result.current.addMessage({ id: '1', role: 'user', content: 'First', timestamp: new Date() }),
    );
    rerender({ id: 'other' });
    expect(result.current.messages[0].content).toBe('Other');
    expect(JSON.parse(localStorage.getItem('widget-session-other') || '[]')[0].content).toBe(
      'Other',
    );
  });
  it('can clear history when storage access is blocked', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const remove = vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
      throw new DOMException('Blocked', 'SecurityError');
    });
    const { result } = renderHook(() => useSession(sessionId));
    expect(() => act(() => result.current.clearSession())).not.toThrow();
    expect(result.current.messages).toEqual([]);
    remove.mockRestore();
    warn.mockRestore();
  });
});
