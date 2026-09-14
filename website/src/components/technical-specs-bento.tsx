import React from 'react';

export function TechnicalSpecsBento() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:py-20">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text)] sm:text-4xl">
          Engineered for technical portfolios.
        </h2>
        <p className="mt-3 text-sm text-[var(--text-secondary)] sm:text-base">
          Sub-5KB performance with modern CSS cascade layers and zero runtime collisions.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1 (Span 2): Bundle Benchmark */}
        <div className="md:col-span-2 rounded-3xl border border-[var(--border-strong)] bg-[var(--surface-2)] p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-0.5 text-[11px] font-mono text-[var(--text-muted)] mb-3">
              BENCHMARK // GZIPPED FOOTPRINT
            </div>
            <h3 className="text-xl font-bold text-[var(--text)]">
              ~100x smaller than enterprise widgets
            </h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Traditional customer support widgets bundle multi-megabyte analytics and tracking
              runtimes. ask-widget compiles to sub-14KB with zero runtime dependencies.
            </p>
          </div>

          <div className="mt-6 space-y-3 font-mono text-xs">
            {/* ask-widget */}
            <div>
              <div className="flex justify-between text-[var(--text)] mb-1 font-semibold">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[var(--status-online)]" />
                  @chitrank2050/ask-widget
                </span>
                <span className="text-[var(--status-online)]">13.8 KB</span>
              </div>
              <div className="h-2 rounded-full bg-[var(--surface-3)] overflow-hidden">
                <div className="h-full bg-[var(--status-online)] rounded-full w-[4%]" />
              </div>
            </div>

            {/* Crisp */}
            <div>
              <div className="flex justify-between text-[var(--text-secondary)] mb-1">
                <span>Crisp Chat SDK</span>
                <span>820 KB</span>
              </div>
              <div className="h-2 rounded-full bg-[var(--surface-3)] overflow-hidden">
                <div className="h-full bg-[var(--text-muted)] rounded-full w-[45%]" />
              </div>
            </div>

            {/* Intercom */}
            <div>
              <div className="flex justify-between text-[var(--text-secondary)] mb-1">
                <span>Intercom Messenger</span>
                <span>1,850 KB</span>
              </div>
              <div className="h-2 rounded-full bg-[var(--surface-3)] overflow-hidden">
                <div className="h-full bg-[var(--text-muted)] rounded-full w-[100%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: CSS Layer Isolation */}
        <div className="rounded-3xl border border-[var(--border-strong)] bg-[var(--surface-2)] p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-0.5 text-[11px] font-mono text-[var(--text-muted)] mb-3">
              ZERO COLLISION
            </div>
            <h3 className="text-xl font-bold text-[var(--text)]">CSS @layer Isolation</h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Encapsulated inside{' '}
              <code className="font-mono text-xs bg-[var(--surface-code)] px-1 rounded">
                @layer widget
              </code>{' '}
              so your portfolio's Tailwind resets or global CSS will never bleed into the chat
              panel.
            </p>
          </div>

          <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--surface-code)] p-3 font-mono text-xs text-[var(--code-text)]">
            <span className="text-[var(--accent)]">@layer</span> widget.tokens, widget.themes,
            widget.base;
          </div>
        </div>

        {/* Card 3: Native SSE over HTTP/2 */}
        <div className="rounded-3xl border border-[var(--border-strong)] bg-[var(--surface-2)] p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-0.5 text-[11px] font-mono text-[var(--text-muted)] mb-3">
              STREAM PROTOCOL
            </div>
            <h3 className="text-xl font-bold text-[var(--text)]">Native Server-Sent Events</h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              One-way HTTP/2 streaming with native reconnect, word boundary parsing, and zero socket
              daemon overhead.
            </p>
          </div>

          <div className="mt-6 font-mono text-xs text-[var(--status-online)] flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--status-online)] animate-pulse" />
            <span>ReadableStream chunk parser active</span>
          </div>
        </div>

        {/* Card 4 (Span 2): Headless Hooks */}
        <div className="md:col-span-2 rounded-3xl border border-[var(--border-strong)] bg-[var(--surface-2)] p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-0.5 text-[11px] font-mono text-[var(--text-muted)] mb-3">
              HEADLESS ARCHITECTURE
            </div>
            <h3 className="text-xl font-bold text-[var(--text)]">
              Don't want a floating launcher? Go headless.
            </h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Exported headless React hooks give you complete UI control to build inline terminal
              chat, sidebar assistants, or custom command bars.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-code)] p-3">
              <span className="font-bold text-[var(--text)]">useChat()</span>
              <p className="text-[11px] text-[var(--text-secondary)] mt-1">
                State machine, message history, auto-scroll
              </p>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-code)] p-3">
              <span className="font-bold text-[var(--text)]">useSSEStream()</span>
              <p className="text-[11px] text-[var(--text-secondary)] mt-1">
                Token chunking, stream reader, abort signals
              </p>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-code)] p-3">
              <span className="font-bold text-[var(--text)]">useSession()</span>
              <p className="text-[11px] text-[var(--text-secondary)] mt-1">
                Chat persistence & visitor memory
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
