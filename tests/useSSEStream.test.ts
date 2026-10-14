/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useSSEStream } from '../src/hooks/useSSEStream';

describe('useSSEStream', () => {
  const apiUrl = 'https://api.example.com';

  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  it('should build the correct request with default options', async () => {
    const mockReader = {
      read: vi.fn().mockResolvedValue({ done: true, value: undefined }),
      releaseLock: vi.fn(),
      cancel: vi.fn().mockResolvedValue(undefined),
    };
    const mockResponse = {
      ok: true,
      body: { getReader: () => mockReader },
    };
    (fetch as any).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useSSEStream({ apiUrl }));
    const generator = result.current.streamResponse('Hello', []);
    await generator.next();

    expect(fetch).toHaveBeenCalledWith(
      `${apiUrl}/v1/chat`,
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({
          messages: [{ role: 'user', content: 'Hello' }],
          stream: true,
        }),
      }),
    );
  });

  it('should yield chunks from valid SSE data', async () => {
    const encoder = new TextEncoder();
    const chunks = [
      encoder.encode('data: {"choices":[{"delta":{"content":"Hello"}}]}\n\n'),
      encoder.encode('data: {"choices":[{"delta":{"content":" World"}}]}\n\n'),
      encoder.encode('data: [DONE]\n\n'),
    ];

    let chunkIdx = 0;
    const mockReader = {
      read: vi.fn().mockImplementation(() => {
        if (chunkIdx < chunks.length) {
          return Promise.resolve({ done: false, value: chunks[chunkIdx++] });
        }
        return Promise.resolve({ done: true });
      }),
      releaseLock: vi.fn(),
      cancel: vi.fn().mockResolvedValue(undefined),
    };

    const mockResponse = {
      ok: true,
      body: { getReader: () => mockReader },
    };
    (fetch as any).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useSSEStream({ apiUrl }));
    const generator = result.current.streamResponse('Hi', []);

    const values = [];
    for await (const val of generator) {
      values.push(val);
    }

    expect(values).toEqual(['Hello', ' World']);
  });

  it('should throw error on non-ok response', async () => {
    const mockResponse = {
      ok: false,
      json: vi.fn().mockResolvedValue({ detail: 'Auth failed' }),
    };
    (fetch as any).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useSSEStream({ apiUrl }));
    const generator = result.current.streamResponse('Hi', []);

    await expect(generator.next()).rejects.toThrow('Auth failed');
  });

  it('should handle malformed JSON gracefully', async () => {
    const encoder = new TextEncoder();
    const mockReader = {
      read: vi
        .fn()
        .mockResolvedValueOnce({ done: false, value: encoder.encode('data: {invalid\n\n') })
        .mockResolvedValueOnce({ done: true }),
      releaseLock: vi.fn(),
      cancel: vi.fn().mockResolvedValue(undefined),
    };

    const mockResponse = {
      ok: true,
      body: { getReader: () => mockReader },
    };
    (fetch as any).mockResolvedValue(mockResponse);

    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const { result } = renderHook(() => useSSEStream({ apiUrl }));
    const generator = result.current.streamResponse('Hi', []);

    const values = [];
    for await (const val of generator) {
      values.push(val);
    }

    expect(values).toHaveLength(0);
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('should support custom path and extractChunk', async () => {
    const encoder = new TextEncoder();
    const mockReader = {
      read: vi
        .fn()
        .mockResolvedValueOnce({
          done: false,
          value: encoder.encode('data: {"text":"Custom"}\n\n'),
        })
        .mockResolvedValueOnce({ done: true }),
      releaseLock: vi.fn(),
      cancel: vi.fn().mockResolvedValue(undefined),
    };

    const mockResponse = {
      ok: true,
      body: { getReader: () => mockReader },
    };
    (fetch as any).mockResolvedValue(mockResponse);

    const { result } = renderHook(() =>
      useSSEStream({
        apiUrl,
        path: '/custom',

        extractChunk: (data: any) => data.text,
      }),
    );

    const generator = result.current.streamResponse('Hi', []);
    const { value } = await generator.next();

    expect(fetch).toHaveBeenCalledWith(`${apiUrl}/custom`, expect.anything());
    expect(value).toBe('Custom');
  });

  it('includes the submitted prompt once when history already contains it', async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(
        new ReadableStream({
          start(controller) {
            controller.close();
          },
        }),
      ),
    );
    const { result } = renderHook(() => useSSEStream({ apiUrl }));
    await result.current
      .streamResponse('Hello', [{ id: '1', role: 'user', content: 'Hello', timestamp: new Date() }])
      .next();
    const body = JSON.parse(String(vi.mocked(fetch).mock.calls[0][1]?.body));
    expect(body.messages).toEqual([{ role: 'user', content: 'Hello' }]);
  });

  it('reads multiline JSON and data fields without a space across UTF-8 chunks', async () => {
    const bytes = new TextEncoder().encode(
      'data:{"choices": [\r\ndata:{"delta":{"content":"café"}}]}\r\n\r\n',
    );
    vi.mocked(fetch).mockResolvedValue(
      new Response(
        new ReadableStream({
          start(controller) {
            for (const byte of bytes) controller.enqueue(new Uint8Array([byte]));
            controller.close();
          },
        }),
      ),
    );
    const { result } = renderHook(() => useSSEStream({ apiUrl }));
    const values: string[] = [];
    for await (const value of result.current.streamResponse('Hi', [])) values.push(value);
    expect(values).toEqual(['café']);
  });

  it('accepts an unterminated final JSON data frame at EOF', async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response('data: {"choices":[{"delta":{"content":"final"}}]}'),
    );
    const { result } = renderHook(() => useSSEStream({ apiUrl }));
    const values: string[] = [];
    for await (const value of result.current.streamResponse('Hi', [])) values.push(value);
    expect(values).toEqual(['final']);
  });

  it('cancels the response stream when the consumer stops reading', async () => {
    const cancel = vi.fn();
    vi.mocked(fetch).mockResolvedValue(
      new Response(
        new ReadableStream({
          start(controller) {
            controller.enqueue(
              new TextEncoder().encode('data: {"choices":[{"delta":{"content":"one"}}]}\n\n'),
            );
          },
          cancel,
        }),
      ),
    );
    const { result } = renderHook(() => useSSEStream({ apiUrl }));
    const stream = result.current.streamResponse('Hi', []);
    await stream.next();
    await stream.return();
    expect(cancel).toHaveBeenCalled();
  });
  it('aborts a pending reader using the adapter context', async () => {
    const controller = new AbortController();
    const cancel = vi.fn();
    vi.mocked(fetch).mockResolvedValue(new Response(new ReadableStream({ cancel })));
    const { result } = renderHook(() => useSSEStream({ apiUrl }));
    const pending = result.current
      .streamResponse('Hello', [], { signal: controller.signal })
      .next();
    await vi.waitFor(() => expect(fetch).toHaveBeenCalled());
    controller.abort();
    expect((await pending).done).toBe(true);
    expect(cancel).toHaveBeenCalled();
  });

  it('handles an error response with a null JSON body', async () => {
    vi.mocked(fetch).mockResolvedValue(new Response('null', { status: 403 }));
    const { result } = renderHook(() => useSSEStream({ apiUrl }));
    await expect(result.current.streamResponse('Hello', []).next()).rejects.toThrow(
      'API request failed',
    );
  });
});
