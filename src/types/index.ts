/**
 * All shared TypeScript types for ask-widget.
 */

// ── Theme ────────────────────────────────────────────────────────────────────

/** Built-in theme presets */
export type ChatTheme = 'light' | 'dark';

/** Custom color overrides - merged with theme defaults */
export interface ChatColors {
  /** Primary accent color - buttons, user message bubbles */
  primary?: string;
  /** Background color of the chat panel */
  background?: string;
  /** Text color */
  text?: string;
  /** Border color */
  border?: string;
  /** Background of the user's message bubble */
  userBubble?: string;
  /** Background of terminal-style blocks or the input area */
  surface?: string;
}

/** Localizable text strings used throughout the UI */
export interface ChatLabels {
  /** Label for live streaming responses (default: "AI_ANALYSIS_STREAM") */
  assistantTag?: string;
  /** Label for cached responses (default: "AI_ANALYSIS_CACHE") */
  cacheTag?: string;
  /** Prefix for the latency display (default: "LATENCY") */
  latencyPrefix?: string;
  /** Aria-label for the collapse button */
  collapseAction?: string;
  /** Aria-label for the reset/clear button */
  resetAction?: string;
  /** Text shown in the system chip at start (default: "SYSTEM.LINK_ESTABLISHED") */
  systemStatus?: string;
  /** Text shown inside the pill launcher button (default: title) */
  launcherLabel?: string;
}

// ── Position ─────────────────────────────────────────────────────────────────

/** Where the floating button and panel appear on screen */
export type ChatPosition = 'bottom-right' | 'bottom-left' | 'bottom-center';

// ── Messages ─────────────────────────────────────────────────────────────────

/** A single message in the conversation */
export interface ChatMessage {
  /** Unique identifier for the message */
  id: string;
  /** Who sent the message */
  role: 'user' | 'assistant';
  /** Message text content */
  content: string;
  /** UTC timestamp of when the message was created */
  timestamp: Date;
  /** Whether this response came from the semantic cache */
  cached?: boolean;
}

/** Value returned by a response adapter */
export type ChatStreamResult =
  string | AsyncIterable<string> | Promise<string | AsyncIterable<string>>;

/**
 * Adapter invoked when the user submits a message.
 * Return an async iterable for true token streaming, or a string/promise
 * while the backend integration is still being prepared.
 */
export type ChatStreamHandler = (message: string, history: ChatMessage[]) => ChatStreamResult;

// ── Props ────────────────────────────────────────────────────────────────────

/** Props for the main ChatWidget component */
export interface ChatWidgetProps {
  /**
   * Base URL of your chat API.
   * When provided (without a custom `streamResponse`), the widget will automatically
   * use `useSSEStream` to connect to `<apiUrl>/v1/chat` with an OpenAI-compatible payload.
   *
   * @example "https://your-api.railway.app"
   */
  apiUrl?: string;

  /**
   * Bearer token for API authentication.
   * Browser-visible token. Use only a short-lived token scoped to your backend.
   * Keep private provider credentials on the server; frontend environment
   * variables do not conceal secrets.
   *
   * @example session.accessToken
   */
  apiToken?: string;

  /**
   * Position of the floating button and chat panel.
   * @default "bottom-right"
   */
  position?: ChatPosition;

  /**
   * Color theme preset.
   * @default "dark"
   */
  theme?: ChatTheme;

  /**
   * Custom color overrides - merged with theme defaults.
   */
  colors?: ChatColors;

  /**
   * Title shown in the chat panel header.
   * @default "Ask AI"
   */
  title?: string;

  /**
   * Placeholder text in the message input.
   * @default "Ask me anything..."
   */
  placeholder?: string;

  /**
   * First message displayed when the panel opens.
   * @default "Hello! How can I help you today?"
   */
  initialMessage?: string;

  /**
   * Whether the chat panel starts open.
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * Custom text labels for technical indicators in the UI.
   */
  labels?: ChatLabels;

  /**
   * The localStorage key used to persist chat history.
   * @default "ask_widget_session"
   */
  persistenceKey?: string;

  /**
   * Custom response handler - takes full control of streaming.
   *
   * Use this when you need custom fetch logic, auth flows, or a non-SSE backend.
   * When provided, `apiUrl` and `apiToken` are ignored.
   *
   * @example
   * ```ts
   * const streamResponse: ChatStreamHandler = async function* (message, history) {
   *   const res = await fetch('/api/chat', { method: 'POST', body: JSON.stringify({ message }) })
   *   const reader = res.body!.getReader()
   *   // ... yield decoded tokens
   * }
   * ```
   */
  streamResponse?: ChatStreamHandler;
}
