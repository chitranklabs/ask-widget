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
    name: 'Next.js App Router',
    file: 'app/layout.tsx',
    code: `import { ChatWidget } from '@chitrank2050/ask-widget';
import '@chitrank2050/ask-widget/style.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ChatWidget
          title="Portfolio AI"
          placeholder="Ask about my projects & stack..."
          apiUrl="/api/chat"
          theme="dark"
          position="bottom-right"
        />
      </body>
    </html>
  );
}`,
  },
  {
    id: 'vite',
    name: 'Vite / React 19',
    file: 'src/App.tsx',
    code: `import { ChatWidget } from '@chitrank2050/ask-widget';
import '@chitrank2050/ask-widget/style.css';

export function App() {
  return (
    <main className="portfolio">
      <h1>Developer Portfolio</h1>
      <ChatWidget
        title="Ask Me"
        theme="dark"
        position="bottom-right"
        apiUrl="https://api.myportfolio.dev/chat"
      />
    </main>
  );
}`,
  },
  {
    id: 'headless',
    name: 'Headless (useChat)',
    file: 'components/InlineTerminalChat.tsx',
    code: `import { useChat } from '@chitrank2050/ask-widget';

export function InlineTerminalChat() {
  const { messages, input, setInput, sendMessage, isStreaming } = useChat({
    apiUrl: '/api/chat',
  });

  return (
    <div className="terminal-chat">
      <div className="messages">
        {messages.map((m, i) => (
          <p key={i} className={m.role}>
            {m.content}
          </p>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input value={input} onChange={e => setInput(e.target.value)} />
        <button disabled={isStreaming}>Send</button>
      </form>
    </div>
  );
}`,
  },
  {
    id: 'cdn',
    name: 'Vanilla HTML / CDN',
    file: 'index.html',
    code: `<!-- 1. Include Styles -->
<link rel="stylesheet" href="https://esm.sh/@chitrank2050/ask-widget/dist/style.css" />

<!-- 2. Import & Mount Module -->
<script type="module">
  import React from 'https://esm.sh/react@19';
  import ReactDOM from 'https://esm.sh/react-dom@19/client';
  import { ChatWidget } from 'https://esm.sh/@chitrank2050/ask-widget';

  const root = ReactDOM.createRoot(document.getElementById('chat-root'));
  root.render(React.createElement(ChatWidget, {
    title: "Portfolio AI",
    apiUrl: "/api/chat"
  }));
</script>

<div id="chat-root"></div>`,
  },
];

export function IntegrationStudio() {
  const [selectedPkg, setSelectedPkg] = useState(0);
  const [selectedFramework, setSelectedFramework] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeFramework = FRAMEWORKS[selectedFramework];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFramework.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="integration" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:py-20">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text)] sm:text-4xl">
          Install in under 30 seconds.
        </h2>
        <p className="mt-3 text-sm text-[var(--text-secondary)] sm:text-base">
          Drop the widget directly into your root layout or mount it headlessly.
        </p>
      </div>

      {/* Package Manager Selector Pill Bar */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {PKG_MANAGERS.map((pkg, idx) => (
          <button
            key={pkg.name}
            type="button"
            onClick={() => setSelectedPkg(idx)}
            className={`rounded-full px-4 py-1.5 font-mono text-xs font-medium transition ${
              selectedPkg === idx
                ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-xs'
                : 'border border-[var(--border)] bg-[var(--surface-2)] text-[var(--text-secondary)] hover:text-[var(--text)]'
            }`}
          >
            {pkg.name}
          </button>
        ))}
      </div>

      {/* Command Pill */}
      <div className="max-w-xl mx-auto mb-8 flex items-center justify-between rounded-full border border-[var(--border-strong)] bg-[var(--surface-code)] px-5 py-3 font-mono text-xs text-[var(--text)] shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-[var(--status-online)] font-bold">$</span>
          <span>{PKG_MANAGERS[selectedPkg].cmd}</span>
        </div>
        <button
          type="button"
          onClick={() => {
            navigator.clipboard.writeText(PKG_MANAGERS[selectedPkg].cmd);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="text-[11px] text-[var(--accent)] hover:underline ml-4 whitespace-nowrap"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>

      {/* Framework Tabs Code Card */}
      <div className="overflow-hidden rounded-3xl border border-[var(--border-strong)] bg-[var(--surface-code)] shadow-lg">
        {/* Card Header with Framework Selectors */}
        <div className="flex flex-wrap items-center justify-between border-b border-[var(--border)] px-4 py-2.5 bg-[var(--surface-2)]">
          <div className="flex items-center gap-1 overflow-x-auto">
            {FRAMEWORKS.map((fw, idx) => (
              <button
                key={fw.id}
                type="button"
                onClick={() => setSelectedFramework(idx)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  selectedFramework === idx
                    ? 'bg-[var(--surface)] text-[var(--text)] font-semibold shadow-xs'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text)]'
                }`}
              >
                {fw.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] text-[var(--text-muted)] hidden sm:inline">
              {activeFramework.file}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="btn-tactile rounded-md border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 font-mono text-[11px] text-[var(--text-secondary)] hover:text-[var(--text)]"
            >
              {copied ? '✓ COPIED' : 'COPY CODE'}
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="p-5 font-mono text-xs leading-relaxed text-[var(--code-text)] overflow-x-auto">
          <pre>
            <code>{activeFramework.code}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
