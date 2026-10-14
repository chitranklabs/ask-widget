/**
 * Root component - owns all state and orchestrates sub-components.
 * Handles the open/closed toggle and connects UI to the useChat hook.
 */

import React, { useState } from 'react';
import type { ChatWidgetProps } from '../types';
import { useChat } from '../hooks/useChat';
import { useSSEStream } from '../hooks/useSSEStream';
import { demoStream } from '../lib/demoStream';
import ChatButton from './ChatButton';
import ChatPanel from './ChatPanel';

/**
 * Root chat widget component.
 *
 * Renders a floating launcher button that expands into a full chat panel.
 *
 * **Response modes (in priority order):**
 * 1. `streamResponse` - supply your own async generator / fetch logic
 * 2. `apiUrl` - auto-connects to a standard SSE endpoint (OpenAI-compatible by default)
 * 3. No props - runs a built-in demo stream so you can see the UI immediately
 *
 * @example Basic usage with your own API
 * ```tsx
 * <ChatWidget
 *   apiUrl="https://your-api.example.com"
 *   title="Ask Anything"
 * />
 * ```
 *
 * @example Bring your own stream handler
 * ```tsx
 * <ChatWidget streamResponse={myCustomHandler} />
 * ```
 */
export default function ChatWidget({
  position = 'bottom-right',
  theme = 'dark',
  title = 'Ask AI',
  placeholder = 'Ask me anything...',
  initialMessage = 'Hello! How can I help you today?',
  defaultOpen = false,
  apiUrl,
  apiToken,
  streamResponse,
  colors,
  labels,
  persistenceKey = 'ask_widget_session',
}: ChatWidgetProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  // When apiUrl is provided and no custom streamResponse is given, use the built-in SSE adapter.
  const { streamResponse: sseStreamResponse } = useSSEStream(
    apiUrl ? { apiUrl, apiToken } : { apiUrl: '' },
  );

  const resolvedStreamResponse = streamResponse ?? (apiUrl ? sseStreamResponse : demoStream);

  const {
    messages,
    isStreaming,
    latency,
    activeStreamId,
    inputValue,
    setInputValue,
    sendMessage,
    clearHistory,
  } = useChat({
    initialMessage,
    streamResponse: resolvedStreamResponse,
    persistenceKey,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  // Build custom styles from colors prop
  const customStyles = {
    ...(colors?.primary && { '--widget-primary': colors.primary }),
    ...(colors?.background && { '--widget-background': colors.background }),
    ...(colors?.text && { '--widget-text': colors.text }),
    ...(colors?.border && { '--widget-border': colors.border }),
    ...(colors?.userBubble && { '--widget-user-bubble': colors.userBubble }),
    ...(colors?.surface && { '--widget-surface': colors.surface }),
  } as React.CSSProperties;

  return (
    <div className={`chat-widget chat-widget--${position}`} data-theme={theme} style={customStyles}>
      {!isOpen ? (
        <ChatButton
          title={title}
          theme={theme}
          label={labels?.launcherLabel}
          onClick={() => setIsOpen(true)}
        />
      ) : (
        <ChatPanel
          title={title}
          messages={messages}
          activeStreamId={activeStreamId}
          isStreaming={isStreaming}
          inputValue={inputValue}
          onInputChange={setInputValue}
          onSubmit={handleSubmit}
          onCollapse={() => setIsOpen(false)}
          onReset={clearHistory}
          placeholder={placeholder}
          latency={latency}
          labels={labels}
        />
      )}
    </div>
  );
}
