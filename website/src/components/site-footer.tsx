import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--status-online)]" />
              <span className="font-mono text-sm font-bold tracking-wider text-[var(--text)]">
                ASK_WIDGET
              </span>
              <span className="rounded border border-[var(--border-strong)] bg-[var(--surface-2)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--text-muted)]">
                v0.6.1
              </span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-[var(--text-muted)]">
              The ultimate zero-dependency floating chat widget for modern developer portfolios and
              AI applications. Server-Sent Events streaming, neutral zinc styling, and pure
              performance.
            </p>
            <div className="mt-4 flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--status-online)]" />
              <span>SYSTEM_STATUS // OPERATIONAL</span>
            </div>
          </div>

          {/* Ecosystem Links */}
          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text)]">
              Ecosystem
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href="https://githygiene.chitrankagnihotri.com"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-[var(--text)]"
                >
                  git-hygiene
                </a>
              </li>
              <li>
                <a
                  href="https://monolineui.chitrankagnihotri.com"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-[var(--text)]"
                >
                  monoline-ui
                </a>
              </li>
              <li>
                <a
                  href="https://chitrankagnihotri.com"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-[var(--text)]"
                >
                  Chitrank Agnihotri
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/chitranklabs"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-[var(--text)]"
                >
                  Chitrank Labs
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text)]">
              Resources
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/changelog" className="transition-colors hover:text-[var(--text)]">
                  Changelog & Releases
                </Link>
              </li>
              <li>
                <a
                  href="https://www.npmjs.com/package/@chitrank2050/ask-widget"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-[var(--text)]"
                >
                  npm Package
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/chitranklabs/ask-widget"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-[var(--text)]"
                >
                  GitHub Source
                </a>
              </li>
              <li>
                <a
                  href="/llms.txt"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-[var(--text)] font-mono text-xs"
                >
                  llms.txt (AI Doc)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between border-t border-[var(--border)] pt-6 text-xs text-[var(--text-muted)] sm:flex-row">
          <p>© 2026 Chitrank Agnihotri. Released under the MIT License.</p>
          <div className="mt-2 flex items-center gap-4 sm:mt-0 font-mono">
            <span>ZERO_RUNTIME_DEPS</span>
            <span>•</span>
            <span>SSE_STREAMING</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
