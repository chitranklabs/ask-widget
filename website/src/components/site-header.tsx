'use client';

import Link from 'next/link';
import { useTheme } from '@/src/components/theme-provider';

export function SiteHeader() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--surface)] backdrop-blur-xl transition-colors duration-200">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight text-[var(--text)] transition-opacity hover:opacity-80"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
            </span>
            <span className="font-mono font-bold tracking-wider">ASK_WIDGET</span>
          </Link>
          <span className="hidden rounded-full border border-[var(--border-strong)] bg-[var(--surface-2)] px-2.5 py-0.5 font-mono text-[11px] font-medium text-[var(--text-secondary)] sm:inline-block">
            v0.6.1
          </span>
        </div>

        {/* Center Navigation */}
        <nav className="hidden items-center gap-6 text-sm font-medium text-[var(--text-secondary)] md:flex">
          <Link href="/#demo" className="transition-colors hover:text-[var(--text)]">
            Playground
          </Link>
          <Link href="/#features" className="transition-colors hover:text-[var(--text)]">
            Features
          </Link>
          <Link href="/#integration" className="transition-colors hover:text-[var(--text)]">
            Installation
          </Link>
          <Link href="/#api" className="transition-colors hover:text-[var(--text)]">
            API
          </Link>
          <Link href="/#faq" className="transition-colors hover:text-[var(--text)]">
            FAQ
          </Link>
          <Link href="/changelog" className="transition-colors hover:text-[var(--text)]">
            Changelog
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <a
            href="https://www.npmjs.com/package/@chitrank2050/ask-widget"
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-md border border-[var(--border)] bg-[var(--surface-2)] px-2.5 py-1 font-mono text-xs font-medium text-[var(--text-secondary)] transition hover:border-[var(--border-strong)] hover:text-[var(--text)] sm:inline-flex"
          >
            npm
          </a>
          <a
            href="https://github.com/chitranklabs/ask-widget"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-md border border-[var(--border)] bg-[var(--surface-2)] px-2.5 py-1 text-xs font-medium text-[var(--text-secondary)] transition hover:border-[var(--border-strong)] hover:text-[var(--text)]"
            aria-label="GitHub Repository"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            <span>GitHub</span>
          </a>

          {/* Theme Switcher Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="btn-tactile flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface-2)] text-[var(--text-secondary)] transition hover:border-[var(--border-strong)] hover:text-[var(--text)]"
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
