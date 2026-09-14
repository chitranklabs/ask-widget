import type { Metadata } from 'next';
import Link from 'next/link';

import { JsonLd, getBreadcrumbJsonLd } from '@/src/components/json-ld';
import { createPageMetadata } from '@/src/lib/metadata';

const changelogTitle = 'Release Changelog and Version History | ask-widget';
const changelogDescription =
  'Detailed release notes for ask-widget: SSE token streaming updates, zero-dependency optimizations, headless hooks, and developer portfolio tooling.';

export const metadata: Metadata = createPageMetadata({
  title: changelogTitle,
  description: changelogDescription,
  path: '/changelog',
  absoluteTitle: true,
});

interface ReleaseItem {
  version: string;
  date: string;
  title: string;
  highlights: string[];
  commitsCount: number;
}

const RELEASES: ReleaseItem[] = [
  {
    version: '0.6.1',
    date: '2026-04-27',
    title: 'Package Exports Isolation & CI JSR Optimization',
    highlights: [
      'Isolated library entry point in `src/index.lib.ts` to cleanly separate library exports from development sandbox.',
      'Configured explicit return types across all headless hooks (`useChat`, `useSSEStream`, `useSession`) and components.',
      'Enhanced JSR automated publish workflow with pnpm build verification.',
    ],
    commitsCount: 8,
  },
  {
    version: '0.6.0',
    date: '2026-04-27',
    title: 'Headless Hooks, Changesets & CSS @layer Encapsulation',
    highlights: [
      'Encapsulated widget styles in CSS `@layer widget.tokens, widget.themes, widget.base` to eliminate consumer CSS collisions.',
      'Integrated automated Changesets workflow for multi-channel npm and JSR releases.',
      'Added session persistence cleanup and comprehensive Vitest unit testing suites.',
      'Introduced headless `useSSEStream` for direct Server-Sent Events reading.',
    ],
    commitsCount: 18,
  },
  {
    version: '0.5.3',
    date: '2026-04-26',
    title: 'Neutral Zinc Theme Tokens & IBM Plex Mono Typography',
    highlights: [
      "Refined dark/light theme palette aligning with Chitrank's portfolio neutral zinc obsidian aesthetics.",
      'Added configurable positioning (`bottom-right`, `bottom-left`, `bottom-center`).',
      'Reduced gzipped bundle footprint down to 14KB.',
    ],
    commitsCount: 6,
  },
  {
    version: '0.5.0',
    date: '2026-04-25',
    title: 'Initial Streaming Architecture & OpenAI Adapter',
    highlights: [
      'Initial release of ask-widget with real-time SSE token streaming.',
      'Drop-in OpenAI `/v1/chat` compatibility with Bearer authentication.',
      'Zero runtime external dependencies.',
    ],
    commitsCount: 12,
  },
];

export default function ChangelogPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      {/* Breadcrumb Structured Data */}
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Changelog', path: '/changelog' },
        ])}
      />

      {/* Navigation Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
          <li>
            <Link href="/" className="transition hover:text-[var(--text)]">
              HOME
            </Link>
          </li>
          <li>/</li>
          <li className="text-[var(--text)] font-semibold">CHANGELOG</li>
        </ol>
      </nav>

      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-2)] px-3 py-1 font-mono text-xs text-[var(--accent)]">
          <span>VERSION_HISTORY // RELEASES</span>
        </div>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[var(--text)] sm:text-5xl">
          Changelog & Releases
        </h1>
        <p className="mt-3 text-base text-[var(--text-secondary)]">
          Track updates, features, and performance enhancements across every published version of
          ask-widget.
        </p>
      </div>

      {/* Release Timeline */}
      <div className="mt-12 space-y-10">
        {RELEASES.map(release => (
          <article
            key={release.version}
            id={`v${release.version.replace(/\./g, '-')}`}
            className="glass-panel overflow-hidden rounded-2xl p-6 sm:p-8 transition hover:border-[var(--border-strong)]"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
              <div className="flex items-center gap-3">
                <span className="rounded-lg bg-[var(--surface-3)] px-3 py-1 font-mono text-sm font-bold text-[var(--text)]">
                  v{release.version}
                </span>
                <h2 className="text-lg font-semibold text-[var(--text)]">{release.title}</h2>
              </div>

              <div className="flex items-center gap-3 font-mono text-xs text-[var(--text-muted)]">
                <time dateTime={release.date}>{release.date}</time>
                <span>•</span>
                <span>{release.commitsCount} COMMITS</span>
              </div>
            </div>

            <ul className="mt-6 space-y-3 text-sm text-[var(--text-secondary)]">
              {release.highlights.map((highlight, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                  <span className="leading-relaxed">{highlight}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center justify-between border-t border-[var(--border)] pt-4 font-mono text-xs">
              <a
                href={`https://github.com/chitranklabs/ask-widget/releases/tag/v${release.version}`}
                target="_blank"
                rel="noreferrer"
                className="text-[var(--text-secondary)] transition hover:text-[var(--text)] hover:underline"
              >
                VIEW GITHUB RELEASE →
              </a>
              <span className="text-[var(--status-online)]">● RELEASED</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
