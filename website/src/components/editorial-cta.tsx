import React from 'react';

export function EditorialCta() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="relative overflow-hidden rounded-3xl border border-[var(--border-strong)] bg-[var(--surface-2)] p-10 sm:p-16 text-center shadow-lg">
        {/* Subtle Background Glow */}
        <div
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[radial-gradient(circle_at_center,var(--accent)_0%,transparent_70%)] opacity-15 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-2xl mx-auto space-y-5">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--text)]">
            Add an AI Assistant to Your Portfolio Today.
          </h2>

          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed font-normal">
            Zero bloated tracking runtimes. Native Server-Sent Events token streaming. 100% free and
            open-source under MIT.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://www.npmjs.com/package/@chitrank2050/ask-widget"
              target="_blank"
              rel="noreferrer"
              className="btn-tactile inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold text-[var(--primary-foreground)] shadow-md transition hover:opacity-90"
            >
              <span>Install from npm</span>
              <span>→</span>
            </a>

            <a
              href="https://github.com/chitranklabs/ask-widget"
              target="_blank"
              rel="noreferrer"
              className="btn-tactile inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-6 py-3.5 text-sm font-medium text-[var(--text)] shadow-xs transition hover:bg-[var(--surface-3)]"
            >
              <span>Star Repository</span>
              <span>★</span>
            </a>
          </div>

          <p className="text-xs font-mono text-[var(--text-muted)] pt-2">
            Tested on React 18, 19 and Next.js 14, 15, 16 App Router
          </p>
        </div>
      </div>
    </section>
  );
}
