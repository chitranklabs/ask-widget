import React from 'react';
import { SectionHead } from '@chitrank2050/monoline-ui';

export function TechnicalSpecsBento() {
  return (
    <section id="features" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:py-20">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <SectionHead
          level={2}
          size="lg"
          title="Engineered for technical portfolios."
          subtitle="React components, CSS theme tokens and a native streaming reader."
        />
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1 (Span 2): Bundle Benchmark */}
        <div className="md:col-span-2 rounded-3xl border border-[var(--border-strong)] bg-[var(--surface-2)] p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-0.5 text-[11px] font-mono text-[var(--text-muted)] mb-3">
              PACKAGE FOOTPRINT
            </div>
            <h3 className="text-xl font-bold text-[var(--text)]">
              No bundled third-party runtime libraries
            </h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              React and React DOM are peer dependencies. The package ships JavaScript, TypeScript
              declarations and a stylesheet.
            </p>
          </div>

          <p className="mt-6 text-xs leading-relaxed text-[var(--text-muted)]">
            Bundle output depends on the package version, compression and consuming app. Include
            both JavaScript and CSS, and measure React separately.
          </p>
        </div>

        {/* Card 2: CSS Layer Isolation */}
        <div className="rounded-3xl border border-[var(--border-strong)] bg-[var(--surface-2)] p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-0.5 text-[11px] font-mono text-[var(--text-muted)] mb-3">
              STYLE CASCADE
            </div>
            <h3 className="text-xl font-bold text-[var(--text)]">CSS cascade layers</h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Encapsulated inside{' '}
              <code className="font-mono text-xs bg-[var(--surface-code)] px-1 rounded">
                @layer widget
              </code>{' '}
              to organize the stylesheet. Host resets and global selectors can still affect the
              widget; check it alongside your app styles.
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
              Reads supported SSE data frames from a fetch response. Use a custom response handler
              for other protocols; reconnect behavior belongs to your backend integration.
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
