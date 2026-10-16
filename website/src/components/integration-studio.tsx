'use client';

import React, { useState } from 'react';
import Prism from 'prismjs';
import { CodeBlock, SegmentedControl } from '@chitrank2050/monoline-ui';

const PKG_MANAGERS = [
  { name: 'pnpm', cmd: 'pnpm add @chitrank2050/ask-widget' },
  { name: 'npm', cmd: 'npm install @chitrank2050/ask-widget' },
  { name: 'yarn', cmd: 'yarn add @chitrank2050/ask-widget' },
  { name: 'bun', cmd: 'bun add @chitrank2050/ask-widget' },
];

const FRAMEWORKS = [
  {
    id: 'next',
    name: 'Next.js',
    file: 'app/layout.tsx',
    code: `import { ChatWidget } from '@chitrank2050/ask-widget';
import '@chitrank2050/ask-widget/styles.css';

// Your backend must handle POST /api/v1/chat.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ChatWidget
          title="Portfolio AI"
          placeholder="Ask about my projects & stack..."
          apiUrl="/api"
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
    name: 'Vite + React',
    file: 'src/App.tsx',
    code: `import { ChatWidget } from '@chitrank2050/ask-widget';
import '@chitrank2050/ask-widget/styles.css';

// Your backend must handle POST /api/v1/chat.
export function App() {
  return (
    <main className="portfolio">
      <h1>Developer Portfolio</h1>
      <ChatWidget
        title="Ask Me"
        theme="dark"
        position="bottom-right"
        apiUrl="/api"
      />
    </main>
  );
}`,
  },
  {
    id: 'headless',
    name: 'Headless',
    file: 'components/InlineTerminalChat.tsx',
    code: `'use client';

import { useChat, type ChatStreamHandler } from '@chitrank2050/ask-widget';

const streamResponse: ChatStreamHandler = async (message, history) => {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history }),
  });
  if (!response.ok) throw new Error('Chat request failed');
  return response.text();
};

export function InlineChat() {
  const { messages, inputValue, setInputValue, sendMessage, isStreaming } = useChat({ streamResponse });
  return (
    <form onSubmit={event => { event.preventDefault(); void sendMessage(inputValue); }}>
      {messages.map(message => <p key={message.id}>{message.content}</p>)}
      <input aria-label="Message" value={inputValue} onChange={event => setInputValue(event.target.value)} />
      <button disabled={isStreaming}>Send</button>
    </form>
  );
}`,
  },
];

export function IntegrationStudio() {
  const [selectedPkg, setSelectedPkg] = useState(0);
  const [selectedFramework, setSelectedFramework] = useState(0);
  const [copyFeedback, setCopyFeedback] = useState('');

  const activeFramework = FRAMEWORKS[selectedFramework];

  async function copy(text: string, source: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopyFeedback(`${source} copied`);
    } catch {
      setCopyFeedback('Copy unavailable. Select the code to copy it.');
    }
  }

  return (
    <section id="integration" className="shell installation">
      <div className="install-heading">
        <div>
          <span className="intro-label">Integration</span>
          <h2>Two imports. Your backend.</h2>
        </div>
        <p>
          Install the package and stylesheet.
          <br />
          Connect your endpoint when you’re ready.
        </p>
      </div>
      {/* Package Manager Selector Pill Bar */}
      <SegmentedControl
        className="package-select"
        size="sm"
        aria-label="Package manager"
        options={PKG_MANAGERS.map(pkg => ({ value: pkg.name, label: pkg.name }))}
        value={PKG_MANAGERS[selectedPkg].name}
        onChange={value => {
          setSelectedPkg(PKG_MANAGERS.findIndex(pkg => pkg.name === value));
          setCopyFeedback('');
        }}
      />

      {/* Command Pill */}
      <div className="command-row">
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-[var(--status-online)] font-bold">$</span>
          <span>{PKG_MANAGERS[selectedPkg].cmd}</span>
        </div>
        <button
          type="button"
          onClick={() => void copy(PKG_MANAGERS[selectedPkg].cmd, 'Command')}
          className="text-[11px] text-[var(--accent)] hover:underline ml-4 whitespace-nowrap"
        >
          {copyFeedback === 'Command copied' ? 'Copied' : 'Copy'}
        </button>
      </div>

      {/* Framework Tabs Code Card */}
      <CodeBlock
        className="source-frame"
        language="tsx"
        aria-label={`${activeFramework.name} integration example`}
      >
        {/* Card Header with Framework Selectors */}
        <div className="source-toolbar">
          <SegmentedControl
            className="framework-select"
            size="sm"
            aria-label="Code example framework"
            options={FRAMEWORKS.map(framework => ({ value: framework.id, label: framework.name }))}
            value={activeFramework.id}
            onChange={value => {
              setSelectedFramework(FRAMEWORKS.findIndex(framework => framework.id === value));
              setCopyFeedback('');
            }}
          />

          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] text-[var(--text-muted)] hidden sm:inline">
              {activeFramework.file}
            </span>
            <button
              type="button"
              onClick={() => void copy(activeFramework.code, 'Code')}
              className="btn-tactile rounded-md border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 font-mono text-[11px] text-[var(--text-secondary)] hover:text-[var(--text)]"
            >
              {copyFeedback === 'Code copied' ? 'Copied' : 'Copy code'}
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div
          tabIndex={0}
          role="region"
          aria-label={`${activeFramework.name} code example`}
          className="p-5 font-mono text-xs leading-relaxed text-[var(--code-text)] overflow-x-auto"
        >
          <pre>
            <code
              data-language="tsx"
              dangerouslySetInnerHTML={{
                __html: Prism.highlight(
                  activeFramework.code,
                  Prism.languages.javascript,
                  'javascript',
                ),
              }}
            />
          </pre>
        </div>
      </CodeBlock>
      <p className="install-feedback" role="status">
        {copyFeedback ||
          'Your backend must handle POST /api/v1/chat in these examples. Keep provider credentials on the server.'}
      </p>
    </section>
  );
}
