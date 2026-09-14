'use client';

import React, { useState, useEffect } from 'react';

const STREAM_CHUNKS = [
  { token: 'Building', ms: 12 },
  { token: ' high-performance', ms: 24 },
  { token: ' developer', ms: 38 },
  { token: ' portfolios', ms: 52 },
  { token: ' requires', ms: 66 },
  { token: ' sub-15ms', ms: 80 },
  { token: ' latency', ms: 94 },
  { token: ' and', ms: 108 },
  { token: ' zero', ms: 122 },
  { token: ' bloat.', ms: 136 },
];

export function StreamSpotlight() {
  const [chunks, setChunks] = useState<{ token: string; ms: number }[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);

  const startStream = () => {
    setChunks([]);
    setIsStreaming(true);

    STREAM_CHUNKS.forEach((chunk, index) => {
      setTimeout(
        () => {
          setChunks(prev => [...prev, chunk]);
          if (index === STREAM_CHUNKS.length - 1) {
            setIsStreaming(false);
          }
        },
        index * 90 + 50,
      );
    });
  };

  useEffect(() => {
    startStream();
  }, []);

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
      {/* Asymmetrical OpenSEO Spotlight Card */}
      <div className="relative overflow-hidden rounded-3xl border border-[var(--border-strong)] bg-[var(--surface-2)] p-8 sm:p-12 shadow-sm">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Narrative & Superpower Story */}
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-[11px] font-mono font-medium text-[var(--accent)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--status-online)]" />
              <span>NATIVE SSE STREAMING</span>
            </div>

            <h2 className="text-2xl font-extrabold tracking-tight text-[var(--text)] sm:text-4xl">
              Get instant streaming with native Server-Sent Events.
            </h2>

            <p className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
              Traditional chat widgets force you into heavy WebSocket server clusters, proprietary
              clouds, and megabytes of telemetry that destroy your Lighthouse scores.
            </p>

            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              <strong className="text-[var(--text)] font-semibold">ask-widget</strong> streams
              directly from any standard OpenAI-compatible{' '}
              <code className="font-mono text-xs bg-[var(--surface-code)] px-1.5 py-0.5 rounded text-[var(--text)]">
                /v1/chat
              </code>{' '}
              endpoint over HTTP/2, with automated word-boundary chunk parsing and zero WebSocket
              overhead.
            </p>

            {/* Framework Icons & Badges */}
            <div className="pt-2">
              <span className="text-xs font-mono text-[var(--text-muted)] block mb-2">
                WORKS SEAMLESSLY WITH
              </span>
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[var(--text-secondary)]">
                <span className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1">
                  Next.js App Router
                </span>
                <span className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1">
                  Vite + React 19
                </span>
                <span className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1">
                  Remix
                </span>
                <span className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1">
                  FastAPI / Python
                </span>
              </div>
            </div>

            <div className="pt-3">
              <button
                type="button"
                onClick={startStream}
                disabled={isStreaming}
                className="btn-tactile inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-5 py-2.5 text-xs font-semibold text-[var(--primary-foreground)] shadow-xs transition hover:opacity-90 disabled:opacity-50"
              >
                <span>{isStreaming ? 'Streaming Chunks...' : 'Simulate SSE Stream'}</span>
                <span className="text-[10px] font-mono">⚡ &lt;15ms</span>
              </button>
            </div>
          </div>

          {/* Right Column: Live Stream Inspector Terminal */}
          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-code)] shadow-lg">
              {/* Terminal Titlebar */}
              <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3 bg-[var(--surface-2)]">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500/80" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <span className="h-3 w-3 rounded-full bg-green-500/80" />
                </div>
                <div className="font-mono text-[11px] text-[var(--text-muted)]">
                  GET /api/chat?stream=true HTTP/2
                </div>
                <span className="flex h-2 w-2 rounded-full bg-[var(--status-online)]" />
              </div>

              {/* Terminal Code Body */}
              <div className="p-4 font-mono text-xs text-[var(--code-text)] space-y-2 h-[260px] overflow-y-auto">
                <div className="text-[var(--text-muted)]">
                  // EventSource connection established (status 200 OK)
                </div>
                <div className="text-[var(--accent)]">
                  content-type: text/event-stream; charset=utf-8
                </div>
                <div className="h-px bg-[var(--border)] my-2" />

                {chunks.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between animate-fadeIn">
                    <span className="text-[var(--text)]">
                      <span className="text-[var(--text-muted)]">data: </span>
                      <span className="text-emerald-400">"{item.token}"</span>
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)]">{item.ms}ms</span>
                  </div>
                ))}

                {isStreaming && (
                  <div className="flex items-center gap-1.5 text-[var(--status-online)] text-xs">
                    <span className="inline-block h-3 w-1.5 bg-[var(--status-online)] animate-pulse" />
                    <span>receiving stream packet...</span>
                  </div>
                )}
              </div>

              {/* Terminal Footer Info */}
              <div className="flex items-center justify-between border-t border-[var(--border)] px-4 py-2 text-[11px] font-mono text-[var(--text-muted)] bg-[var(--surface)]">
                <span>PARSER: WORD_BOUNDARY</span>
                <span className="text-[var(--status-online)]">SSE ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
