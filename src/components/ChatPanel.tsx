/**
 * Expanded chat panel - header, message feed, and composer.
 * Rendered when the widget is open.
 */

import { useEffect, useRef } from 'react';
import type { FormEvent } from 'react';
import type { ChatMessage as ChatMessageType, ChatLabels } from '../types';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import { CloseIcon, ResetIcon } from './Icons';

interface ChatPanelProps {
  /** Chat panel header title */
  title: string;
  /** All messages in the current conversation */
  messages: ChatMessageType[];
  /** ID of the message currently being streamed - null when not streaming */
  activeStreamId: string | null;
  /** Whether the assistant is currently streaming */
  isStreaming: boolean;
  /** Current input field value */
  inputValue: string;
  /** Called when the input value changes */
  onInputChange: (value: string) => void;
  /** Called when the message form is submitted */
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  /** Called when the collapse button is clicked */
  onCollapse: () => void;
  /** Called when the reset history button is clicked */
  onReset: () => void;
  /** Input placeholder text */
  placeholder: string;
  /** Latency of the last response in seconds */
  latency: number | null;
  /** Custom text labels */
  labels?: ChatLabels;
}

/**
 * Full chat panel with header, scrollable message feed, and composer.
 * Auto-scrolls to the latest message when new content arrives.
 *
 * @param props - See ChatPanelProps
 */
export default function ChatPanel({
  title,
  messages,
  activeStreamId,
  isStreaming,
  inputValue,
  onInputChange,
  onSubmit,
  onCollapse,
  onReset,
  placeholder,
  latency,
  labels,
}: ChatPanelProps) {
  const feedRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);
  const followLatest = useRef(true);
  useEffect(() => {
    panelRef.current?.querySelector('input')?.focus({ preventScroll: true });
  }, []);

  // Auto-scroll to bottom on new messages or streaming updates
  useEffect(() => {
    if (!feedRef.current) return;

    const nextFrame = window.requestAnimationFrame(() => {
      const node = feedRef.current;
      if (!node || !followLatest.current) return;

      node.scrollTo({
        top: node.scrollHeight,
        behavior:
          isStreaming || window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 'auto'
            : 'smooth',
      });
    });

    return () => {
      window.cancelAnimationFrame(nextFrame);
    };
  }, [messages, isStreaming]);

  return (
    <section
      ref={panelRef}
      className="chat-widget__panel"
      aria-label={title}
      onKeyDown={event => {
        if (event.key === 'Escape') {
          event.stopPropagation();
          onCollapse();
        }
      }}
    >
      {/* ── Header ────────────────────────────────────────────────────── */}
      <header className="chat-widget__header">
        <div className="chat-widget__title-wrap">
          <span className="chat-widget__title-mark" />
          <div>
            <p className="chat-widget__title">{title}</p>
          </div>
        </div>

        <div className="chat-widget__actions">
          <button
            type="button"
            className="chat-widget__header-button"
            onClick={onReset}
            title={labels?.resetAction || 'Reset conversation'}
            aria-label={labels?.resetAction || 'Reset conversation'}
          >
            <ResetIcon />
          </button>
          <button
            type="button"
            className="chat-widget__header-button"
            onClick={onCollapse}
            title={labels?.collapseAction || 'Close panel'}
            aria-label={labels?.collapseAction || 'Close panel'}
          >
            <CloseIcon />
          </button>
        </div>
      </header>

      {/* ── Message feed ──────────────────────────────────────────────── */}
      <div
        className="chat-widget__feed"
        ref={feedRef}
        role="log"
        tabIndex={0}
        aria-label="Conversation messages"
        aria-live="polite"
        onScroll={event => {
          const node = event.currentTarget;
          followLatest.current = node.scrollHeight - node.scrollTop - node.clientHeight < 48;
        }}
      >
        <div className="chat-widget__system-chip">
          {labels?.systemStatus || 'SYSTEM.LINK_ESTABLISHED'}
        </div>

        {messages.map(message => (
          <ChatMessage
            key={message.id}
            message={message}
            isStreaming={activeStreamId === message.id}
            labels={labels}
          />
        ))}
      </div>

      {/* ── Composer ──────────────────────────────────────────────────── */}
      <ChatInput
        value={inputValue}
        onChange={onInputChange}
        onSubmit={onSubmit}
        isStreaming={isStreaming}
        placeholder={placeholder}
        latency={latency}
        labels={labels}
      />
    </section>
  );
}
