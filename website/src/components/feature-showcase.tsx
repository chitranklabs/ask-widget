import React from 'react';

const FEATURES = [
  {
    tag: 'CORE_01',
    title: 'Real-Time SSE Streaming',
    description:
      'Native Server-Sent Events (SSE) token streaming. Renders responses word-by-word with instant time-to-first-token latency, just like ChatGPT.',
    metric: '<15ms',
    metricLabel: 'TTFT LATENCY',
  },
  {
    tag: 'ENGINEERING_02',
    title: 'Zero Runtime Dependencies',
    description:
      'Pure React engineering. No heavy external markdown parsers, icon bundles, or utility libraries. Bundles down to under 14KB gzipped.',
    metric: '14 KB',
    metricLabel: 'BUNDLE FOOTPRINT',
  },
  {
    tag: 'AESTHETICS_03',
    title: 'Neutral Zinc & Apple Polish',
    description:
      'Designed with neutral zinc obsidian and alabaster palettes. Seamlessly blends into high-end developer portfolios and dark-mode dashboards.',
    metric: '100%',
    metricLabel: 'DARK / LIGHT THEMED',
  },
  {
    tag: 'DEVELOPER_04',
    title: 'Headless Hooks Architecture',
    description:
      'Full control when you need it. Use the headless `useChat`, `useSSEStream`, and `useSession` hooks to build completely bespoke chat UIs.',
    metric: '3 HOOKS',
    metricLabel: 'HEADLESS APIS',
  },
  {
    tag: 'COMPATIBILITY_05',
    title: 'Next.js 16 & React 19 Ready',
    description:
      "Compiled for modern ESM and CommonJS runtimes. Fully compatible with Next.js App Router Server Components ('use client' safe).",
    metric: 'REACT 19',
    metricLabel: 'NATIVE READY',
  },
  {
    tag: 'INTEGRATION_06',
    title: 'OpenAI-Compatible Drop-In',
    description:
      'Directly connects to `/v1/chat/completions` or any OpenAI-compatible API endpoint via standard Bearer token authorization.',
    metric: 'ZERO-CONFIG',
    metricLabel: 'API ADAPTER',
  },
];

export function FeatureShowcase() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-2)] px-3 py-1 font-mono text-xs text-[var(--accent)]">
          <span>CORE_CAPABILITIES // SPECIFICATIONS</span>
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">
          Engineered for Performance & Aesthetics
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base text-[var(--text-secondary)]">
          Every line of code is optimized for zero bloat, instant token streaming, and seamless
          aesthetic harmony with modern portfolios.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(feature => (
          <article
            key={feature.tag}
            className="glass-panel group relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:border-[var(--accent)] hover:shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-[var(--accent)]">
                  {feature.tag}
                </span>
                <div className="text-right">
                  <span className="font-mono text-sm font-bold text-[var(--text)]">
                    {feature.metric}
                  </span>
                  <p className="font-mono text-[9px] uppercase tracking-wider text-[var(--text-muted)]">
                    {feature.metricLabel}
                  </p>
                </div>
              </div>

              <h3 className="mt-4 text-lg font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                {feature.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--border)] flex items-center justify-between font-mono text-[11px] text-[var(--text-muted)]">
              <span>STATUS // VERIFIED</span>
              <span className="text-[var(--status-online)]">● ACTIVE</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
