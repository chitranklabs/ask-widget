'use client';

import React, { useState } from 'react';

const PKG_MANAGERS = [
  { name: 'pnpm', cmd: 'pnpm add @chitrank2050/ask-widget' },
  { name: 'npm', cmd: 'npm install @chitrank2050/ask-widget' },
  { name: 'yarn', cmd: 'yarn add @chitrank2050/ask-widget' },
  { name: 'bun', cmd: 'bun add @chitrank2050/ask-widget' },
];

const FRAMEWORKS = [
  {
    id: 'next',
    name: 'Next.js (App Router)',
    code: `// app/layout.tsx
import { ChatWidget } from '@chitrank2050/ask-widget';
import '@chitrank2050/ask-widget/style.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ChatWidget
          title="Portfolio Assistant"
          placeholder="Ask about my work..."
          apiUrl={process.env.NEXT_PUBLIC_CHAT_API}
          apiToken={process.env.NEXT_PUBLIC_CHAT_TOKEN}
        />
      </body>
    </html>
  );
}`,
  },
  {
    id: 'vite',
    name: 'Vite + React',
    code: `// src/App.tsx
import { ChatWidget } from '@chitrank2050/ask-widget';
import '@chitrank2050/ask-widget/style.css';

export function App() {
  return (
    <div className="app">
      <h1>My Developer Portfolio</h1>
      <ChatWidget
        title="AI Assistant"
        theme="dark"
        position="bottom-right"
        apiUrl={import.meta.env.VITE_CHAT_API}
      />
    </div>
  );
}`,
  },
  {
    id: 'custom',
    name: 'Custom SSE Stream',
    code: `// Custom streaming generator with useChat
import { ChatWidget, type ChatStreamHandler } from '@chitrank2050/ask-widget';
import '@chitrank2050/ask-widget/style.css';

const streamResponse: ChatStreamHandler = async function* (message, history) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history }),
  });

  const reader = res.body?.getReader();
  const decoder = new TextDecoder();

  while (reader) {
    const { done, value } = await reader.read();
    if (done) break;
    yield decoder.decode(value);
  }
};

export function App() {
  return <ChatWidget streamResponse={streamResponse} />;
}`,
  },
  {
    id: 'cdn',
    name: 'Vanilla HTML / CDN',
    code: `<!-- Drop into any index.html without Node.js -->
<link rel="stylesheet" href="https://unpkg.com/@chitrank2050/ask-widget/dist/style.css" />

<script type="module">
  import { ChatWidget } from 'https://unpkg.com/@chitrank2050/ask-widget/dist/ask-widget.es.js';
  import React from 'https://esm.sh/react@19';
  import ReactDOM from 'https://esm.sh/react-dom@19/client';

  const container = document.createElement('div');
  document.body.appendChild(container);
  ReactDOM.createRoot(container).render(
    React.createElement(ChatWidget, {
      title: 'Chitrank\\'s AI',
      apiUrl: 'https://api.example.com'
    })
  );
</script>`,
  },
];

export function IntegrationTabs() {
  const [activePkg, setActivePkg] = useState(0);
  const [activeFramework, setActiveFramework] = useState('next');
  const [copiedPkg, setCopiedPkg] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const currentFramework = FRAMEWORKS.find(f => f.id === activeFramework)!;

  const copyPkg = () => {
    navigator.clipboard.writeText(PKG_MANAGERS[activePkg].cmd);
    setCopiedPkg(true);
    setTimeout(() => setCopiedPkg(false), 2000);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(currentFramework.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="integration" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-2)] px-3 py-1 font-mono text-xs text-[var(--accent)]">
          <span>QUICKSTART // INTEGRATION</span>
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">
          Install in Under 60 Seconds
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base text-[var(--text-secondary)]">
          Native ESM and CommonJS exports. Drop it into your Next.js root layout or embed via CDN.
        </p>
      </div>

      {/* Package Manager Selector */}
      <div className="mx-auto mt-10 max-w-2xl">
        <div className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-2">
          <div className="flex gap-1">
            {PKG_MANAGERS.map((pkg, idx) => (
              <button
                key={pkg.name}
                type="button"
                onClick={() => setActivePkg(idx)}
                className={`rounded-lg px-3 py-1.5 font-mono text-xs font-semibold transition ${
                  activePkg === idx
                    ? 'bg-[var(--surface-3)] text-[var(--text)] shadow-sm'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
              >
                {pkg.name}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={copyPkg}
            className="btn-tactile flex items-center gap-1.5 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-3)] px-3 py-1.5 font-mono text-xs text-[var(--text)] transition hover:border-[var(--accent)]"
          >
            {copiedPkg ? 'COPIED!' : 'COPY'}
          </button>
        </div>
        <pre className="mt-3 overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--surface-code)] p-3.5 font-mono text-xs text-[var(--code-text)]">
          <code>{PKG_MANAGERS[activePkg].cmd}</code>
        </pre>
      </div>

      {/* Framework Code Tabs */}
      <div className="glass-panel mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl">
        <div className="flex flex-wrap items-center justify-between border-b border-[var(--border)] bg-[var(--surface-2)] px-4 py-2.5">
          <div className="flex gap-1.5 overflow-x-auto py-1">
            {FRAMEWORKS.map(fw => (
              <button
                key={fw.id}
                type="button"
                onClick={() => setActiveFramework(fw.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  activeFramework === fw.id
                    ? 'bg-[var(--surface)] text-[var(--text)] font-semibold shadow-sm'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
              >
                {fw.name}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={copyCode}
            className="btn-tactile flex items-center gap-1.5 rounded-md border border-[var(--border-strong)] bg-[var(--surface-3)] px-3 py-1 font-mono text-xs text-[var(--text)] transition hover:border-[var(--accent)]"
          >
            {copiedCode ? 'COPIED CODE!' : 'COPY CODE'}
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-[var(--code-text)]">
            <code>{currentFramework.code}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
