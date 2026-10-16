'use client';
import { useState } from 'react';
import { ChatWidget, type ChatStreamHandler } from '@chitrank2050/ask-widget';
import { Field, Input, Label, SegmentedControl, Separator } from '@chitrank2050/monoline-ui';
import { useTheme } from '@/src/components/theme-provider';
const respond: ChatStreamHandler = async function* (message, _history, context) {
  const question = message.toLowerCase();
  const answer =
    question.includes('stream') || question.includes('sse')
      ? 'The widget reads Server-Sent Events from your backend with the browser fetch API. You can also return text or an async generator from a custom response handler. This example streams a local response, without calling an AI provider.'
      : question.includes('theme') || question.includes('color')
        ? 'Choose a light or dark theme, then customize the colors, title and labels. The website and documentation share their own theme tokens; your widget can use the colors of your application.'
        : question.includes('install') || question.includes('start')
          ? 'Install @chitrank2050/ask-widget from npm, import its styles.css file and render ChatWidget in your React application. Connect apiUrl to your backend or supply a custom streamResponse handler. The installation section below has working examples.'
          : 'ask-widget adds a floating conversation to a React website. It includes streaming responses, local conversation history and headless hooks for a custom interface. Ask me about installation, streaming or themes. This is a scripted local demo, not a live AI service.';
  for (const word of answer.split(' ')) {
    if (context?.signal.aborted) return;
    await new Promise(resolve => setTimeout(resolve, 35));
    if (context?.signal.aborted) return;
    yield word + ' ';
  }
};

export function InteractiveShowcase() {
  const { theme: siteTheme } = useTheme();
  const [override, setOverride] = useState<'dark' | 'light' | null>(null);
  const [position, setPosition] = useState<'bottom-right' | 'bottom-left'>('bottom-right');
  const [title, setTitle] = useState('Ask me anything');
  const theme = override ?? siteTheme;
  return (
    <section id="showcase" className="shell workbench" aria-labelledby="preview-heading">
      <div className="workbench-bar">
        <div>
          <h2 id="preview-heading">Interactive preview</h2>
          <span className="demo-state">
            <i />
            Local response handler
          </span>
        </div>
        <a href="#integration">
          View code <span aria-hidden="true">↓</span>
        </a>
      </div>
      <div className="workbench-body">
        <aside className="config-panel" aria-label="Widget configuration">
          <div className="config-heading">
            <span>Configuration</span>
            <span>Live</span>
          </div>
          <Field className="field-label">
            <Label htmlFor="preview-title">Title</Label>
            <Input
              id="preview-title"
              size="md"
              wrapperClassName="preview-input"
              maxLength={32}
              value={title}
              onChange={event => setTitle(event.target.value)}
            />
          </Field>
          <fieldset>
            <legend id="appearance-label">Appearance</legend>
            <SegmentedControl
              className="preview-segmented"
              size="sm"
              aria-labelledby="appearance-label"
              options={[
                { value: 'dark', label: 'Dark' },
                { value: 'light', label: 'Light' },
              ]}
              value={theme}
              onChange={setOverride}
            />
          </fieldset>
          <fieldset>
            <legend id="position-label">Position</legend>
            <SegmentedControl
              className="preview-segmented"
              size="sm"
              aria-labelledby="position-label"
              options={[
                { value: 'bottom-left', label: 'Left' },
                { value: 'bottom-right', label: 'Right' },
              ]}
              value={position}
              onChange={setPosition}
            />
          </fieldset>
          <Separator className="config-divider" />
          <div className="try-note">
            <h3>Give it a try</h3>
            <p>
              Ask about installation, streaming or themes. Close and reopen the panel. Reset to
              start again.
            </p>
          </div>
          <div className="config-meta">
            <span>Response</span>
            <code>Async generator</code>
            <span>Network</span>
            <code>No AI request</code>
          </div>
          <a className="config-docs" href="https://chitranklabs.github.io/ask-widget/api">
            All component props <span aria-hidden="true">↗</span>
          </a>
        </aside>
        <div className="widget-stage" data-placement={position}>
          <div className="stage-label">
            <span>ChatWidget</span>
            <span>Live component</span>
          </div>
          <div className="widget-mount">
            <ChatWidget
              title={title.trim() || 'Ask me anything'}
              placeholder="Ask about the widget…"
              initialMessage="Hi. Ask me about installation, streaming or custom themes."
              defaultOpen
              theme={theme}
              position={position}
              persistenceKey="ask-website-workbench"
              streamResponse={respond}
              labels={{
                systemStatus: 'Local demo',
                assistantTag: 'Streaming response',
                cacheTag: 'Saved response',
                launcherLabel: 'Ask me anything',
              }}
            />
          </div>
          <p className="stage-note">
            This is the installed component, with scripted demo responses.
          </p>
        </div>
      </div>
      <div className="workbench-bottom">
        <span>
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="m4 10 4 4 8-8" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          Keyboard accessible
        </span>
        <span>Bring your own backend</span>
        <a href="https://chitranklabs.github.io/ask-widget/theming">
          Customize with CSS variables <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
