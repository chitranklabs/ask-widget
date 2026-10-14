import { Metadata } from 'next';

import { ApiReference } from '@/src/components/api-reference';
import { EditorialCta } from '@/src/components/editorial-cta';
import { HomeHero } from '@/src/components/home-hero';
import { IntegrationStudio } from '@/src/components/integration-studio';
import { InteractiveShowcase } from '@/src/components/interactive-showcase';
import { JsonLd, getFAQJsonLd } from '@/src/components/json-ld';
import { OpenSourceManifesto } from '@/src/components/open-source-manifesto';
import { StreamSpotlight } from '@/src/components/stream-spotlight';
import { TechnicalSpecsBento } from '@/src/components/technical-specs-bento';
import { SectionHead } from '@chitrank2050/monoline-ui';
import { createPageMetadata } from '@/src/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'ask-widget | Streaming React Chat for Your Website',
  absoluteTitle: true,
  description:
    'Add streaming chat to a React portfolio or website with ask-widget. Configure themes, use headless hooks, and connect your own backend through SSE or response handlers.',
  path: '/',
});

const FAQS = [
  {
    question: 'Can I connect ask-widget to my custom LLM backend or OpenAI?',
    answer:
      'Connect your own backend with apiUrl, which appends /v1/chat, or provide a custom streamResponse handler. Keep private provider credentials on the server; any apiToken supplied to the widget is visible in the browser.',
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
    question: 'What does the widget include in its bundle?',
    answer:
      'The package keeps React and React DOM as peer dependencies and bundles no third-party runtime libraries. Measure the current production JavaScript and CSS output when comparing bundle sizes.',
  },
];

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Keep structured answers consistent with the visible FAQ. */}
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

      <ApiReference />

      {/* 7. FAQ Section */}
      <section id="faq" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="text-center max-w-xl mx-auto mb-12">
          <SectionHead
            level={2}
            size="lg"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about streaming, integration, and security."
          />
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
