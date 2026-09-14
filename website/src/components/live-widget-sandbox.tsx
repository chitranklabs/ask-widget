'use client';

import React, { useState } from 'react';
import { ChatWidget, ChatStreamHandler } from '@chitrank2050/ask-widget';

const KNOWLEDGE_BASE: Record<string, string> = {
  about:
    '**ask-widget** is a zero-dependency, streaming-first floating chat widget for developer portfolios and technical products. It is built with native React 18 & 19 compatibility and compiles down to under 14KB gzipped.',
  streaming:
    'Streaming is powered by native **Server-Sent Events (SSE)**. It parses incoming chunks word-by-word with instant latency rendering, supporting OpenAI-compatible `/v1/chat` backends or custom headless async generators via `useSSEStream`.',
  installation:
    'You can install ask-widget via pnpm or npm:\n\n```bash\npnpm add @chitrank2050/ask-widget\n```\n\nThen import `ChatWidget` and `@chitrank2050/ask-widget/style.css` in your application!',
  themes:
    'The widget includes **neutral zinc dark and light themes** out of the box. Custom colors can be passed via the `colors` prop or styled via CSS variables like `--widget-primary` and `--widget-background`.',
  author:
    'Created by **Chitrank Agnihotri**, Senior Technical Lead and AI Systems Engineer. Visit [chitrankagnihotri.com](https://chitrankagnihotri.com) for more open-source tools!',
};

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function LiveWidgetSandbox() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [position, setPosition] = useState<'bottom-right' | 'bottom-left'>('bottom-right');
  const [title, setTitle] = useState('Portfolio AI');
  const [placeholder, setPlaceholder] = useState('Ask about my projects & stack...');
  const [status, setStatus] = useState('SYSTEM.ONLINE');
  const [copied, setCopied] = useState(false);
  const [activeSnippetTab, setActiveSnippetTab] = useState<'react' | 'html'>('react');

  // Custom smart stream response for the playground
  const streamResponse: ChatStreamHandler = async function* (message: string) {
    const lower = message.toLowerCase();
    let answer = KNOWLEDGE_BASE.about;

    if (lower.includes('stream') || lower.includes('sse') || lower.includes('latency')) {
      answer = KNOWLEDGE_BASE.streaming;
    } else if (
      lower.includes('install') ||
      lower.includes('setup') ||
      lower.includes('npm') ||
      lower.includes('pnpm')
    ) {
      answer = KNOWLEDGE_BASE.installation;
    } else if (
      lower.includes('theme') ||
      lower.includes('color') ||
      lower.includes('dark') ||
      lower.includes('light')
    ) {
      answer = KNOWLEDGE_BASE.themes;
    } else if (lower.includes('chitrank') || lower.includes('author') || lower.includes('who')) {
      answer = KNOWLEDGE_BASE.author;
    } else {
      answer = `I am running live in the **ask-widget** playground. You asked: "${message}". You can connect any backend API or custom generator by passing \`streamResponse\`!`;
    }

    const tokens = answer.split(' ');
    for (const [index, token] of tokens.entries()) {
      await wait(index === 0 ? 250 : 45);
      yield token + ' ';
    }
  };

  const reactCode = `import { ChatWidget } from '@chitrank2050/ask-widget';
import '@chitrank2050/ask-widget/style.css';

export function App() {
  return (
    <ChatWidget
      title="${title}"
      placeholder="${placeholder}"
      theme="${theme}"
      position="${position}"
      labels={{
        systemStatus: '${status}',
      }}
      apiUrl={process.env.NEXT_PUBLIC_CHAT_API_URL}
      apiToken={process.env.NEXT_PUBLIC_CHAT_API_TOKEN}
    />
  );
}`;

  const htmlCode = `<!-- ask-widget drop-in script -->
<link rel="stylesheet" href="https://unpkg.com/@chitrank2050/ask-widget/dist/style.css" />
<script type="module">
  import { ChatWidget } from 'https://unpkg.com/@chitrank2050/ask-widget/dist/ask-widget.es.js';
  // Mount anywhere in your DOM
</script>`;

  const activeCode = activeSnippetTab === 'react' ? reactCode : htmlCode;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="demo" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      {/* Section Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-2)] px-3 py-1 font-mono text-xs text-[var(--accent)]">
          <span>INTERACTIVE_PLAYGROUND // LIVE DEMO</span>
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">
          Experience Live Token Streaming
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base text-[var(--text-secondary)]">
          Tweak parameters in real-time. The floating button on the{' '}
          {position === 'bottom-right' ? 'bottom right' : 'bottom left'} of your screen dynamically
          updates to reflect your configuration.
        </p>
      </div>

      {/* Playground Controls Grid */}
      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Settings Controls (5 cols) */}
        <div className="glass-panel rounded-2xl p-6 lg:col-span-5">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text)]">
              Widget Parameters
            </h3>
            <span className="flex items-center gap-1.5 font-mono text-xs text-[var(--status-online)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--status-online)]" />
              REACTIVE
            </span>
          </div>

          <div className="mt-6 space-y-5">
            {/* Theme Toggle */}
            <div>
              <label className="block font-mono text-xs text-[var(--text-muted)]">
                THEME_PRESET
              </label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setTheme('dark')}
                  className={`btn-tactile rounded-lg border px-3 py-2 text-xs font-medium transition ${
                    theme === 'dark'
                      ? 'border-[var(--accent)] bg-[var(--surface-3)] text-[var(--text)] font-semibold shadow-sm'
                      : 'border-[var(--border)] bg-[var(--surface-2)] text-[var(--text-secondary)] hover:text-[var(--text)]'
                  }`}
                >
                  Dark (Zinc Obsidian)
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('light')}
                  className={`btn-tactile rounded-lg border px-3 py-2 text-xs font-medium transition ${
                    theme === 'light'
                      ? 'border-[var(--accent)] bg-[var(--surface-3)] text-[var(--text)] font-semibold shadow-sm'
                      : 'border-[var(--border)] bg-[var(--surface-2)] text-[var(--text-secondary)] hover:text-[var(--text)]'
                  }`}
                >
                  Light (Alabaster)
                </button>
              </div>
            </div>

            {/* Position Selector */}
            <div>
              <label className="block font-mono text-xs text-[var(--text-muted)]">
                SCREEN_POSITION
              </label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPosition('bottom-right')}
                  className={`btn-tactile rounded-lg border px-3 py-2 text-xs font-medium transition ${
                    position === 'bottom-right'
                      ? 'border-[var(--accent)] bg-[var(--surface-3)] text-[var(--text)] font-semibold shadow-sm'
                      : 'border-[var(--border)] bg-[var(--surface-2)] text-[var(--text-secondary)] hover:text-[var(--text)]'
                  }`}
                >
                  Bottom Right
                </button>
                <button
                  type="button"
                  onClick={() => setPosition('bottom-left')}
                  className={`btn-tactile rounded-lg border px-3 py-2 text-xs font-medium transition ${
                    position === 'bottom-left'
                      ? 'border-[var(--accent)] bg-[var(--surface-3)] text-[var(--text)] font-semibold shadow-sm'
                      : 'border-[var(--border)] bg-[var(--surface-2)] text-[var(--text-secondary)] hover:text-[var(--text)]'
                  }`}
                >
                  Bottom Left
                </button>
              </div>
            </div>

            {/* Title Input */}
            <div>
              <label
                htmlFor="param-title"
                className="block font-mono text-xs text-[var(--text-muted)]"
              >
                HEADER_TITLE
              </label>
              <input
                id="param-title"
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="mt-2 w-full rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 text-sm text-[var(--text)] focus:border-[var(--accent)] focus:outline-none"
              />
            </div>

            {/* Status Label */}
            <div>
              <label
                htmlFor="param-status"
                className="block font-mono text-xs text-[var(--text-muted)]"
              >
                STATUS_LABEL
              </label>
              <input
                id="param-status"
                type="text"
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="mt-2 w-full rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 text-sm text-[var(--text)] focus:border-[var(--accent)] focus:outline-none font-mono text-xs"
              />
            </div>

            {/* Placeholder Input */}
            <div>
              <label
                htmlFor="param-placeholder"
                className="block font-mono text-xs text-[var(--text-muted)]"
              >
                INPUT_PLACEHOLDER
              </label>
              <input
                id="param-placeholder"
                type="text"
                value={placeholder}
                onChange={e => setPlaceholder(e.target.value)}
                className="mt-2 w-full rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 text-sm text-[var(--text)] focus:border-[var(--accent)] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Reactive Code Generator & Preview Details (7 cols) */}
        <div className="glass-panel flex flex-col justify-between rounded-2xl p-6 lg:col-span-7">
          <div>
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveSnippetTab('react')}
                  className={`rounded-md px-3 py-1 font-mono text-xs font-medium transition ${
                    activeSnippetTab === 'react'
                      ? 'bg-[var(--surface-3)] text-[var(--text)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text)]'
                  }`}
                >
                  React Component
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSnippetTab('html')}
                  className={`rounded-md px-3 py-1 font-mono text-xs font-medium transition ${
                    activeSnippetTab === 'html'
                      ? 'bg-[var(--surface-3)] text-[var(--text)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text)]'
                  }`}
                >
                  HTML CDN Embed
                </button>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="btn-tactile flex items-center gap-1.5 rounded-md border border-[var(--border-strong)] bg-[var(--surface-3)] px-3 py-1 font-mono text-xs font-medium text-[var(--text)] transition hover:border-[var(--accent)]"
              >
                {copied ? (
                  <>
                    <svg
                      className="h-3.5 w-3.5 text-[var(--status-online)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>COPIED!</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    <span>COPY_SNIPPET</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Block with Syntax Styling */}
            <div className="mt-4">
              <pre className="overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--surface-code)] p-4 font-mono text-xs leading-relaxed text-[var(--code-text)]">
                <code>{activeCode}</code>
              </pre>
            </div>
          </div>

          {/* Live Simulator Hint & Badges */}
          <div className="mt-6 border-t border-[var(--border)] pt-4">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--text-secondary)]">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--status-online)] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--status-online)]" />
                </span>
                <span>
                  Widget is mounted live in the{' '}
                  {position === 'bottom-right' ? 'bottom-right corner' : 'bottom-left corner'}.
                  Click to open and test streaming!
                </span>
              </div>
              <span className="font-mono text-[11px] text-[var(--text-muted)]">STREAM: SSE_V1</span>
            </div>
          </div>
        </div>
      </div>

      {/* The Real Embedded Floating ChatWidget */}
      <ChatWidget
        title={title}
        placeholder={placeholder}
        theme={theme}
        position={position}
        labels={{
          systemStatus: status,
        }}
        streamResponse={streamResponse}
      />
    </div>
  );
}
