'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export function HomeHero() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('pnpm add @chitrank2050/ask-widget');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative mx-auto max-w-5xl px-4 pt-20 pb-14 text-center sm:px-6 lg:pt-28 lg:pb-20">
      {/* Floating Pill Badge (OpenSEO Hallmark Style) */}
      <div className="inline-flex items-center gap-2.5 rounded-full border border-[var(--border-strong)] bg-[var(--surface-2)] px-4 py-1.5 shadow-xs transition hover:border-[var(--text-muted)]">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--status-online)] opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--status-online)]" />
        </span>
        <span className="font-mono text-xs font-medium tracking-tight text-[var(--text)]">
          ask-widget v0.6.1
        </span>
        <span className="h-3 w-px bg-[var(--border-strong)]" />
        <span className="text-xs text-[var(--text-secondary)]">Zero Dependencies • &lt;14KB</span>
      </div>

      {/* Main Editorial Headline */}
      <h1 className="mx-auto mt-7 max-w-4xl text-4xl font-extrabold tracking-tight text-[var(--text)] sm:text-6xl lg:text-[68px] lg:leading-[1.1]">
        The modern, open source{' '}
        <span className="font-serif italic font-normal text-[var(--accent-editorial)]">
          chat widget
        </span>{' '}
        for developer portfolios.
      </h1>

      {/* Editorial Subtitle */}
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)] sm:text-xl font-normal">
        Drop-in floating AI chat with native Server-Sent Events (SSE) token streaming. Built with
        the neutral zinc aesthetic, CSS layer isolation, and sub-15ms chunk parsing.
      </p>

      {/* Primary Actions */}
      <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
        <a
          href="#showcase"
          className="btn-tactile inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3.5 text-sm font-semibold text-[var(--primary-foreground)] shadow-md transition hover:opacity-90"
        >
          <span>See Widget in Action</span>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </a>

        <a
          href="https://github.com/chitranklabs/ask-widget"
          target="_blank"
          rel="noreferrer"
          className="btn-tactile inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-2)] px-5 py-3.5 text-sm font-medium text-[var(--text)] shadow-xs transition hover:bg-[var(--surface-3)]"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            />
          </svg>
          <span>Star on GitHub</span>
        </a>

        {/* Quick copy command pill */}
        <button
          type="button"
          onClick={handleCopy}
          className="btn-tactile inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-3 font-mono text-xs text-[var(--text-secondary)] shadow-xs transition hover:text-[var(--text)]"
          title="Click to copy install command"
        >
          <span className="text-[var(--status-online)] font-bold">$</span>
          <span>pnpm add @chitrank2050/ask-widget</span>
          <span className="text-[10px] text-[var(--text-muted)]">
            {copied ? '✓ COPIED' : 'COPY'}
          </span>
        </button>
      </div>

      {/* Trust micro-text under CTA (OpenSEO style) */}
      <p className="mt-4 text-xs text-[var(--text-muted)] font-mono">
        Free & open source under MIT • No analytics trackers • React 18 & 19 compatible
      </p>
    </section>
  );
}
