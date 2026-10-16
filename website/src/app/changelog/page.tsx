import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@chitrank2050/monoline-ui';
import { JsonLd, getBreadcrumbJsonLd } from '@/src/components/json-ld';
import { createPageMetadata } from '@/src/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'ask-widget Releases and Changelog',
  description:
    'Find the maintained release notes and version history for ask-widget, including component changes, streaming updates, fixes and migration details.',
  path: '/changelog',
  absoluteTitle: true,
});

export default function ChangelogPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Changelog', path: '/changelog' },
        ])}
      />
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[var(--text-secondary)]">
        <Link href="/">Home</Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">Changelog</span>
      </nav>
      <h1 className="text-4xl font-bold tracking-tight text-[var(--text)]">
        Changelog and releases
      </h1>
      <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
        Release notes are maintained with the package. Check the changelog for the complete history
        and GitHub releases for published versions and assets.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild variant="primary">
          <a href="https://github.com/chitranklabs/ask-widget/releases">Published releases</a>
        </Button>
        <Button asChild variant="secondary">
          <a href="https://github.com/chitranklabs/ask-widget/blob/main/CHANGELOG.md">
            Complete changelog
          </a>
        </Button>
      </div>
      <p className="mt-8 text-sm text-[var(--text-secondary)]">
        For installation and integration guidance, read the{' '}
        <a
          className="underline"
          href="https://docs.askwidget.chitrankagnihotri.com/getting-started"
        >
          getting started guide
        </a>
        .
      </p>
    </div>
  );
}
