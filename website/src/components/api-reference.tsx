import React from 'react';

const PROPS_DATA = [
  {
    name: 'apiUrl',
    type: 'string',
    default: 'undefined',
    description:
      "Base URL of OpenAI-compatible chat API (e.g. 'https://api.example.com'). Automatically appends '/v1/chat'.",
  },
  {
    name: 'apiToken',
    type: 'string',
    default: 'undefined',
    description: 'Bearer authentication token passed in the HTTP Authorization header.',
  },
  {
    name: 'theme',
    type: "'dark' | 'light'",
    default: "'dark'",
    description: 'Preconfigured visual theme preset. Fully isolated to the widget via CSS layers.',
  },
  {
    name: 'position',
    type: "'bottom-right' | 'bottom-left' | 'bottom-center'",
    default: "'bottom-right'",
    description: 'Screen anchor position for the launcher button and expandable message panel.',
  },
  {
    name: 'title',
    type: 'string',
    default: "'Ask AI'",
    description: 'Heading text displayed in the panel header and default launcher button.',
  },
  {
    name: 'placeholder',
    type: 'string',
    default: "'Ask me anything...'",
    description: 'Placeholder text rendered in the message text input.',
  },
  {
    name: 'initialMessage',
    type: 'string',
    default: "'Hello! How can I help you today?'",
    description: 'Greeting message displayed in the feed when no existing session history exists.',
  },
  {
    name: 'defaultOpen',
    type: 'boolean',
    default: 'false',
    description: 'Whether the floating chat panel renders open on initial page mount.',
  },
  {
    name: 'streamResponse',
    type: '(message: string, history: ChatMessage[]) => AsyncIterable<string>',
    default: 'demoStream',
    description:
      'Custom streaming generator. Takes full control of message submission and response token yield.',
  },
  {
    name: 'labels',
    type: 'ChatLabels',
    default: '{}',
    description:
      'Custom text overrides for technical labels (systemStatus, assistantTag, launcherLabel).',
  },
];

const HOOKS_DATA = [
  {
    name: 'useChat(options)',
    returns: '{ messages, input, setInput, sendMessage, isStreaming, resetChat }',
    description:
      'Full headless chat engine state machine. Manages conversation history, pending tokens, and submission lifecycle.',
  },
  {
    name: 'useSSEStream(url, options)',
    returns: '{ streamMessage, abortStream, isStreaming }',
    description:
      'Low-level Server-Sent Events (SSE) reader. Yields decoded tokens with abort controller signal handling.',
  },
  {
    name: 'useSession(key, initial)',
    returns: '[messages, setMessages, clearSession]',
    description:
      'Safe browser storage hook with automatic fallback for private browsing and SSR environments.',
  },
];

export function ApiReference() {
  return (
    <section id="api" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-2)] px-3 py-1 font-mono text-xs text-[var(--accent)]">
          <span>DOCUMENTATION // API_REFERENCE</span>
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">
          Component Props & Headless Hooks
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base text-[var(--text-secondary)]">
          Comprehensive TypeScript definitions and configuration options for{' '}
          <code>&lt;ChatWidget /&gt;</code>.
        </p>
      </div>

      {/* Props Table */}
      <div className="glass-panel mt-12 overflow-hidden rounded-2xl">
        <div className="border-b border-[var(--border)] bg-[var(--surface-2)] px-6 py-4">
          <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-[var(--text)]">
            ChatWidgetProps
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[var(--border)] bg-[var(--surface)] font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3.5">Prop</th>
                <th className="px-6 py-3.5">Type</th>
                <th className="px-6 py-3.5">Default</th>
                <th className="px-6 py-3.5">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {PROPS_DATA.map(prop => (
                <tr key={prop.name} className="hover:bg-[var(--surface-2)] transition-colors">
                  <td className="px-6 py-4 font-mono font-semibold text-[var(--accent)]">
                    {prop.name}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-[var(--text-secondary)]">
                    {prop.type}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-[var(--text-muted)]">
                    {prop.default}
                  </td>
                  <td className="px-6 py-4 text-[var(--text-secondary)]">{prop.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Headless Hooks */}
      <div className="glass-panel mt-8 overflow-hidden rounded-2xl">
        <div className="border-b border-[var(--border)] bg-[var(--surface-2)] px-6 py-4">
          <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-[var(--text)]">
            Headless React Hooks
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[var(--border)] bg-[var(--surface)] font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3.5">Hook</th>
                <th className="px-6 py-3.5">Return Signature</th>
                <th className="px-6 py-3.5">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {HOOKS_DATA.map(hook => (
                <tr key={hook.name} className="hover:bg-[var(--surface-2)] transition-colors">
                  <td className="px-6 py-4 font-mono font-semibold text-[var(--accent)]">
                    {hook.name}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-[var(--text-secondary)]">
                    {hook.returns}
                  </td>
                  <td className="px-6 py-4 text-[var(--text-secondary)]">{hook.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
