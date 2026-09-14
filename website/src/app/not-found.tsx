import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[65vh] flex-col items-center justify-center px-4 text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-2)] px-3 py-1 font-mono text-xs text-[var(--accent)]">
        <span>ERROR_404 // NOT_FOUND</span>
      </div>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[var(--text)] sm:text-5xl">
        Page Not Found
      </h1>
      <p className="mt-3 max-w-md text-sm text-[var(--text-secondary)]">
        The requested resource could not be found. Return to the documentation or homepage.
      </p>
      <Link
        href="/"
        className="btn-tactile mt-8 inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-2.5 text-sm font-semibold text-[var(--primary-foreground)] shadow-sm transition hover:opacity-90"
      >
        <span>Return Home</span>
      </Link>
    </div>
  );
}
