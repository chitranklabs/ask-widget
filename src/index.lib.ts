'use client';

import './styles/variables.css';
import './styles/themes.css';
import './styles/widget.css';

// ── Main component ────────────────────────────────────────────────────────────
export { default as ChatWidget } from './components/ChatWidget';

// ── Hooks - for custom UIs ────────────────────────────────────────────────────
export { useChat } from './hooks/useChat';
export type { UseChatReturn } from './hooks/useChat';
export { useSSEStream } from './hooks/useSSEStream';
export type { UseSSEStreamReturn, SSEStreamOptions } from './hooks/useSSEStream';
export { useSession } from './hooks/useSession';
export type { UseSessionReturn } from './hooks/useSession';
export { demoStream } from './lib/demoStream';

// ── Types - consumers need these to use the component ────────────────────────
export type {
  ChatStreamContext,
  ChatLabels,
  ChatColors,
  ChatMessage,
  ChatPosition,
  ChatStreamHandler,
  ChatTheme,
  ChatWidgetProps,
  ChatStreamResult,
} from './types/index';
