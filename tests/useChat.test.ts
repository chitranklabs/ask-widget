import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useChat } from '../src/hooks/useChat';

describe('useChat', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with initial message', () => {
    const { result } = renderHook(() => useChat({ initialMessage: 'Welcome' }));
    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0].content).toBe('Welcome');
  });

  it('should handle a simple string response', async () => {
    const mockHandler = vi.fn().mockResolvedValue('Hello World');
    const { result } = renderHook(() => useChat({ streamResponse: mockHandler }));

    await act(async () => {
      await result.current.sendMessage('Hi');
    });

    expect(result.current.messages).toHaveLength(2);
    expect(result.current.messages[1].content).toBe('Hello World');
    expect(result.current.latency).toBeDefined();
  });

  it('should handle an async iterable (streaming)', async () => {
    async function* mockStream() {
      yield 'Hello ';
      yield 'Stream';
    }
    const mockHandler = vi.fn().mockReturnValue(mockStream());
    const { result } = renderHook(() => useChat({ streamResponse: mockHandler }));

    await act(async () => {
      await result.current.sendMessage('Go');
    });

    expect(result.current.messages[1].content).toBe('Hello Stream');
    expect(result.current.isStreaming).toBe(false);
  });

  it('should prevent sending while streaming', async () => {
    const mockHandler = vi.fn().mockReturnValue(new Promise(() => {})); // Never resolves
    const { result } = renderHook(() => useChat({ streamResponse: mockHandler }));

    act(() => {
      result.current.sendMessage('First');
    });

    expect(result.current.isStreaming).toBe(true);

    await act(async () => {
      await result.current.sendMessage('Second');
    });

    expect(mockHandler).toHaveBeenCalledTimes(1);
  });

  it('should handle errors in the stream', async () => {
    const mockHandler = vi.fn().mockRejectedValue(new Error('API Down'));
    const { result } = renderHook(() => useChat({ streamResponse: mockHandler }));

    await act(async () => {
      await result.current.sendMessage('Hi');
    });

    expect(result.current.messages[1].content).toContain('API Down');
    expect(result.current.isStreaming).toBe(false);
  });

  it('should clear history', () => {
    const { result } = renderHook(() => useChat({ initialMessage: 'Hi' }));

    act(() => {
      result.current.clearHistory();
    });

    expect(result.current.messages).toHaveLength(1); // Back to initial
    expect(result.current.latency).toBeNull();
  });

  it('should throw error if no handler provided', async () => {
    const { result } = renderHook(() => useChat({}));

    await act(async () => {
      await result.current.sendMessage('Hi');
    });

    expect(result.current.messages[1].content).toContain('No stream response handler');
  });

  it('prevents two submissions in the same render turn', async () => {
    let resolve!: (value: string) => void;
    const handler = vi.fn(
      () =>
        new Promise<string>(done => {
          resolve = done;
        }),
    );
    const { result } = renderHook(() => useChat({ streamResponse: handler }));
    let first!: Promise<void>;
    await act(async () => {
      first = result.current.sendMessage('First');
      await result.current.sendMessage('Second');
    });
    expect(handler).toHaveBeenCalledTimes(1);
    await act(async () => {
      resolve('Done');
      await first;
    });
  });

  it('does not allow a cleared pending response to affect a new response', async () => {
    let resolveOld!: (value: string) => void;
    let resolveNew!: (value: string) => void;
    const handler = vi
      .fn()
      .mockImplementationOnce(
        () =>
          new Promise<string>(resolve => {
            resolveOld = resolve;
          }),
      )
      .mockImplementationOnce(
        () =>
          new Promise<string>(resolve => {
            resolveNew = resolve;
          }),
      );
    const { result } = renderHook(() => useChat({ streamResponse: handler }));
    let old!: Promise<void>;
    let current!: Promise<void>;
    act(() => {
      old = result.current.sendMessage('Old');
    });
    act(() => {
      result.current.clearHistory();
    });
    act(() => {
      current = result.current.sendMessage('New');
    });
    await act(async () => {
      resolveOld('Old answer');
      await old;
    });
    expect(result.current.isStreaming).toBe(true);
    await act(async () => {
      resolveNew('New answer');
      await current;
    });
    expect(result.current.messages.map(message => message.content)).toEqual(['New', 'New answer']);
  });
  it('aborts the adapter context on unmount', async () => {
    let signal: AbortSignal | undefined;
    let resolve!: (value: string) => void;
    const { result, unmount } = renderHook(() =>
      useChat({
        streamResponse: (_message, _history, context) => {
          signal = context?.signal;
          return new Promise<string>(done => {
            resolve = done;
          });
        },
      }),
    );
    let pending!: Promise<void>;
    act(() => {
      pending = result.current.sendMessage('Hello');
    });
    unmount();
    expect(signal?.aborted).toBe(true);
    await act(async () => {
      resolve('Late');
      await pending;
    });
  });

  it('cancels a response without displaying an abort error', async () => {
    let reject!: (error: Error) => void;
    const { result } = renderHook(() =>
      useChat({
        streamResponse: () =>
          new Promise<string>((_resolve, fail) => {
            reject = fail;
          }),
      }),
    );
    let pending!: Promise<void>;
    act(() => {
      pending = result.current.sendMessage('Hello');
    });
    act(() => {
      result.current.cancelResponse();
    });
    expect(result.current.isStreaming).toBe(false);
    await act(async () => {
      reject(new DOMException('Aborted', 'AbortError'));
      await pending;
    });
    expect(result.current.messages.at(-1)?.content).not.toContain('Stream interrupted');
  });
  it('cancels a pending response when the conversation key changes', async () => {
    let signal: AbortSignal | undefined;
    let resolve!: (value: string) => void;
    const { result, rerender } = renderHook(
      ({ key }) =>
        useChat({
          persistenceKey: key,
          streamResponse: (_message, _history, context) => {
            signal = context?.signal;
            return new Promise<string>(done => {
              resolve = done;
            });
          },
        }),
      { initialProps: { key: 'first' } },
    );
    let pending!: Promise<void>;
    act(() => {
      pending = result.current.sendMessage('Old');
    });
    rerender({ key: 'other' });
    expect(signal?.aborted).toBe(true);
    expect(result.current.isStreaming).toBe(false);
    await act(async () => {
      resolve('Late');
      await pending;
    });
    expect(result.current.messages).toEqual([]);
  });
  it('keeps history cleared when reset and submission share one event', async () => {
    const handler = vi.fn().mockResolvedValue('Answer');
    const { result } = renderHook(() => useChat({ streamResponse: handler }));
    await act(async () => {
      await result.current.sendMessage('Old');
    });
    await act(async () => {
      result.current.clearHistory();
      await result.current.sendMessage('New');
    });
    expect(handler.mock.calls[1][1].map((message: { content: string }) => message.content)).toEqual(
      ['New'],
    );
    expect(result.current.messages.map(message => message.content)).toEqual(['New', 'Answer']);
  });
});
