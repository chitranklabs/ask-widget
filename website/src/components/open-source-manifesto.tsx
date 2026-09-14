import React from 'react';

export function OpenSourceManifesto() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="rounded-3xl border border-[var(--border-strong)] bg-[var(--surface)] p-8 sm:p-12 text-center shadow-xs">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-3.5 py-1 text-xs font-mono text-[var(--status-online)] mb-4">
          <span>● PRIVACY & INTEGRITY FIRST</span>
        </div>

        <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-[var(--text)] sm:text-4xl">
          100% open source. Zero telemetry.
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-base text-[var(--text-secondary)] leading-relaxed">
          Developer portfolios should showcase technical craft—not load megabytes of third-party
          telemetry and tracking scripts. With ask-widget, communication flows strictly between the
          visitor and your configured LLM endpoint.
        </p>

        {/* 4 Trust Metrics */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 max-w-3xl mx-auto">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-4 text-center">
            <span className="block font-mono text-xl font-bold text-[var(--text)]">MIT</span>
            <span className="text-xs text-[var(--text-secondary)]">Open License</span>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-4 text-center">
            <span className="block font-mono text-xl font-bold text-[var(--status-online)]">0</span>
            <span className="text-xs text-[var(--text-secondary)]">Tracking Scripts</span>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-4 text-center">
            <span className="block font-mono text-xl font-bold text-[var(--text)]">&lt;14KB</span>
            <span className="text-xs text-[var(--text-secondary)]">Gzipped Bundle</span>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-4 text-center">
            <span className="block font-mono text-xl font-bold text-[var(--accent)]">100%</span>
            <span className="text-xs text-[var(--text-secondary)]">Client Controlled</span>
          </div>
        </div>
      </div>
    </section>
  );
}
