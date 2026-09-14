import { Metadata } from 'next';
import Link from 'next/link';

import { ApiReference } from '@/src/components/api-reference';
import { FeatureShowcase } from '@/src/components/feature-showcase';
import { IntegrationTabs } from '@/src/components/integration-tabs';
import { JsonLd, getFAQJsonLd } from '@/src/components/json-ld';
import { LiveWidgetSandbox } from '@/src/components/live-widget-sandbox';
import { createPageMetadata } from '@/src/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'ask-widget - Minimalist AI Chat for Developer Portfolios',
  description:
    'A lightweight floating chat widget with Server-Sent Events (SSE) streaming, zero runtime dependencies, and neutral zinc dark/light aesthetics.',
  path: '/',
});

const FAQS = [
  {
    question: 'Can I connect ask-widget to my custom LLM backend or OpenAI?',
    answer:
      'Yes! ask-widget connects directly to any OpenAI-compatible `/v1/chat` streaming endpoint via the `apiUrl` and `apiToken` props. If your backend uses custom auth headers, WebSockets, or a non-standard JSON stream, you can provide the `streamResponse` async generator prop to handle full streaming in headless mode.',
  },
  {
    question: 'Does ask-widget work with Next.js 16 and React 19?',
    answer:
      "Yes! ask-widget is compiled for modern ESM and CommonJS with native React 19 compatibility. It includes the `'use client'` directive, making it 100% safe to drop into Next.js App Router root layouts or client components.",
  },
  {
    question: 'How do I customize themes and colors?',
    answer:
      "ask-widget includes pre-built neutral zinc dark and light themes. You can pass the `theme` prop ('dark' | 'light'), override individual palette values using the `colors` prop, or customize CSS variables such as `--widget-primary`, `--widget-background`, and `--widget-border`.",
  },
  {
    question: 'Are there any tracking or telemetry scripts inside the widget library?',
    answer:
      'Zero. The published npm/JSR library contains absolutely no telemetry, tracking scripts, or external network requests. It communicates strictly with the endpoint you explicitly configure.',
  },
  {
    question: 'How does the bundle footprint compare to other chat packages?',
    answer:
      'While typical enterprise chatbot widgets carry 150KB–400KB of external dependencies, ask-widget compiles down to under 14KB gzipped with zero external runtime dependencies.',
  },
];

export default function HomePage() {
  return (
    <div className="relative">
      {/* FAQ Structured Data for Google Rich Snippets */}
      <JsonLd data={getFAQJsonLd(FAQS)} />

      {/* Background Ambient Glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] overflow-hidden opacity-30"
        aria-hidden="true"
      >
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(circle_at_center,var(--accent)_0%,transparent_70%)] blur-[100px]" />
      </div>

      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-4 pt-20 pb-16 text-center sm:px-6 lg:pt-28">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-2)] px-3.5 py-1.5 font-mono text-xs text-[var(--accent)] shadow-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--status-online)]" />
          <span>ASK_WIDGET // v0.6.1_PRODUCTION_RELEASE</span>
        </div>

        <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold tracking-tight text-[var(--text)] sm:text-6xl lg:text-7xl">
          Minimalist AI Chat for Your Developer Portfolio
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)] sm:text-xl">
          A lightweight, streaming-first chat component designed with the neutral zinc aesthetic.
          Low-latency Server-Sent Events, dark/light modes, and under 14KB gzipped.
        </p>

        {/* Primary Call to Actions */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#demo"
            className="btn-tactile inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-[var(--primary-foreground)] shadow-md transition hover:opacity-90"
          >
            <span>Explore Live Playground</span>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>

          <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-2.5 font-mono text-xs text-[var(--text)] shadow-xs">
            <code>pnpm add @chitrank2050/ask-widget</code>
          </div>
        </div>

        {/* Key Specification Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 border-y border-[var(--border)] py-6 text-xs text-[var(--text-secondary)]">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-[var(--text)]">&lt;14 KB</span>
            <span>GZIPPED</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-[var(--text)]">NATIVE SSE</span>
            <span>TOKEN STREAMING</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-[var(--text)]">ZERO RUNTIME</span>
            <span>DEPENDENCIES</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-[var(--text)]">REACT 19</span>
            <span>COMPATIBLE</span>
          </div>
        </div>
      </section>

      {/* Interactive Live Sandbox */}
      <LiveWidgetSandbox />

      {/* Features Showcase */}
      <FeatureShowcase />

      {/* Integration Tabs */}
      <IntegrationTabs />

      {/* Performance & Benchmark Section */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="glass-panel overflow-hidden rounded-3xl p-8 sm:p-12">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-3)] px-3 py-1 font-mono text-xs text-[var(--status-online)]">
                <span>ENGINEERING_BENCHMARK</span>
              </div>
              <h3 className="mt-4 text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl">
                Lightweight by Design. Faster by Default.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                Traditional chat widgets pack bulky icon libraries, CSS-in-JS runtimes, and bloated
                markdown engines. ask-widget is stripped to pure mathematical necessity.
              </p>

              <div className="mt-6 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-[var(--border)] py-2">
                  <span className="text-[var(--text-muted)]">Time-to-First-Token:</span>
                  <span className="font-semibold text-[var(--status-online)]">
                    &lt; 15 ms (Native SSE)
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-[var(--border)] py-2">
                  <span className="text-[var(--text-muted)]">Cold Start Overhead:</span>
                  <span className="font-semibold text-[var(--text)]">0.00 ms (Pure React)</span>
                </div>
                <div className="flex items-center justify-between border-b border-[var(--border)] py-2">
                  <span className="text-[var(--text-muted)]">Hydration Memory:</span>
                  <span className="font-semibold text-[var(--text)]">&lt; 1.2 MB RAM</span>
                </div>
              </div>
            </div>

            {/* Comparison Bars */}
            <div className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-code)] p-6 lg:col-span-6">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Bundle Size Comparison (Gzipped)
              </p>
              <div>
                <div className="flex justify-between font-mono text-xs">
                  <span className="font-semibold text-[var(--text)]">ask-widget</span>
                  <span className="text-[var(--status-online)] font-bold">14 KB</span>
                </div>
                <div className="mt-1.5 h-3 w-full overflow-hidden rounded-full bg-[var(--surface-2)]">
                  <div className="h-full w-[10%] rounded-full bg-[var(--status-online)]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-mono text-xs text-[var(--text-muted)]">
                  <span>Typical React Chat Widget</span>
                  <span>180 KB</span>
                </div>
                <div className="mt-1.5 h-3 w-full overflow-hidden rounded-full bg-[var(--surface-2)]">
                  <div className="h-full w-[65%] rounded-full bg-[var(--text-muted)] opacity-60" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-mono text-xs text-[var(--text-muted)]">
                  <span>Heavy Enterprise Iframe Widget</span>
                  <span>380 KB</span>
                </div>
                <div className="mt-1.5 h-3 w-full overflow-hidden rounded-full bg-[var(--surface-2)]">
                  <div className="h-full w-[95%] rounded-full bg-[var(--text-muted)] opacity-40" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Documentation */}
      <ApiReference />

      {/* FAQ Section */}
      <section id="faq" className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-2)] px-3 py-1 font-mono text-xs text-[var(--accent)]">
            <span>FREQUENTLY_ASKED_QUESTIONS</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-10 divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {FAQS.map(faq => (
            <div key={faq.question} className="py-6">
              <h3 className="text-base font-semibold text-[var(--text)]">{faq.question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="glass-panel text-center rounded-3xl p-10 sm:p-16">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">
            Add an AI Assistant to Your Portfolio Today
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-[var(--text-secondary)]">
            Join developers showcasing their work, career highlights, and projects with real-time
            interactive streaming.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://github.com/chitranklabs/ask-widget"
              target="_blank"
              rel="noreferrer"
              className="btn-tactile inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-[var(--primary-foreground)] shadow-md transition hover:opacity-90"
            >
              <span>View on GitHub</span>
            </a>
            <Link
              href="/changelog"
              className="btn-tactile inline-flex items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-2)] px-6 py-3 text-sm font-semibold text-[var(--text)] transition hover:border-[var(--accent)]"
            >
              <span>Changelog & Releases</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
