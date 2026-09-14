import { Metadata } from 'next';

import { EditorialCta } from '@/src/components/editorial-cta';
import { HomeHero } from '@/src/components/home-hero';
import { IntegrationStudio } from '@/src/components/integration-studio';
import { InteractiveShowcase } from '@/src/components/interactive-showcase';
import { JsonLd, getFAQJsonLd } from '@/src/components/json-ld';
import { OpenSourceManifesto } from '@/src/components/open-source-manifesto';
import { StreamSpotlight } from '@/src/components/stream-spotlight';
import { TechnicalSpecsBento } from '@/src/components/technical-specs-bento';
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
    <div className="relative overflow-hidden">
      {/* FAQ Structured Data for Google Rich Snippets */}
      <JsonLd data={getFAQJsonLd(FAQS)} />

      {/* Subtle Ambient Background Gradients */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] overflow-hidden opacity-25"
        aria-hidden="true"
      >
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-[radial-gradient(circle_at_center,var(--accent)_0%,transparent_70%)] blur-[120px]" />
      </div>

      {/* 1. Hero Section (Hallmark Editorial Typography + OpenSEO Pill Actions) */}
      <HomeHero />

      {/* 2. Superpowers Spotlight Card (Asymmetrical MCP Card Style) */}
      <StreamSpotlight />

      {/* 3. Central Interactive Product Showcase ("See in Action" with 8-Pill Matrix) */}
      <InteractiveShowcase />

      {/* 4. 100% Open Source & Privacy Manifesto */}
      <OpenSourceManifesto />

      {/* 5. Apple Bento Technical Architecture & Benchmarks */}
      <TechnicalSpecsBento />

      {/* 6. Integration Studio (30-Second Quickstart with Framework Switchers) */}
      <IntegrationStudio />

      {/* 7. FAQ Section */}
      <section id="faq" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text)] sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm text-[var(--text-secondary)]">
            Everything you need to know about streaming, integration, and security.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <details
              key={idx}
              className="group rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-6 transition-all duration-200 open:border-[var(--border-strong)] open:bg-[var(--surface)] open:shadow-xs"
            >
              <summary className="flex cursor-pointer items-center justify-between font-semibold text-base text-[var(--text)] select-none">
                <span>{faq.question}</span>
                <span className="ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-2)] text-xs text-[var(--text-secondary)] transition-transform duration-200 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* 8. Editorial Closing Banner */}
      <EditorialCta />
    </div>
  );
}
