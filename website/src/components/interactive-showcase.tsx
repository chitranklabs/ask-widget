'use client';

import React, { useState } from 'react';
import { ChatWidget, ChatStreamHandler } from '@chitrank2050/ask-widget';
import { SectionHead } from '@chitrank2050/monoline-ui';

const KNOWLEDGE_BASE: Record<string, string> = {
  stack:
    'My primary tech stack includes **TypeScript**, **Next.js 16**, **React 19**, **Tailwind CSS v4**, **Node.js**, and **Rust-based tooling** like Rolldown and Turbopack. I build streaming-first AI applications with incremental responses.',
  sse: '**Server-Sent Events (SSE)** provide incremental responses over HTTP from your backend to the browser. The widget reads supported SSE frames with fetch; this reader does not automatically reconnect.',
  bundle:
    'ask-widget keeps React and React DOM as peer dependencies and bundles no third-party runtime libraries. Measure the JavaScript and CSS output of the version you install.',
  author:
    'Created by **Chitrank Agnihotri**, Senior Technical Lead and AI Systems Engineer. Visit [chitrankagnihotri.com](https://chitrankagnihotri.com) for more open-source tools!',
};

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const FEATURE_TABS = [
  {
    id: 'sse',
    label: 'Native SSE Streaming',
    desc: 'Read supported SSE frames with the browser fetch API.',
  },
  {
    id: 'theme',
    label: 'Zinc Theme Engine',
    desc: 'Obsidian Titanium and Warm Linen Alabaster palettes.',
  },
  {
    id: 'size',
    label: 'React peer dependencies',
    desc: 'No bundled third-party runtime libraries.',
  },
  {
    id: 'layer',
    label: 'CSS cascade layers',
    desc: 'Organized styles; check compatibility with host resets.',
  },
  {
    id: 'hooks',
    label: 'Headless React Hooks',
    desc: 'useChat, useSSEStream, and useSession for bespoke UI designs.',
  },
  {
    id: 'placement',
    label: 'Configurable Placement',
    desc: 'Seamless bottom-right, bottom-left, or bottom-center placement.',
  },
  {
    id: 'generators',
    label: 'Custom Async Generators',
    desc: 'Connect your own backend through a custom response handler.',
  },
  {
    id: 'react19',
    label: 'React 19 & Next.js 16',
    desc: 'Modern ESM and CJS builds with native App Router compatibility.',
  },
];

export function InteractiveShowcase() {
  const [activeTab, setActiveTab] = useState('sse');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [position, setPosition] = useState<'bottom-right' | 'bottom-left'>('bottom-right');

  // Custom smart stream response for the playground
  const streamResponse: ChatStreamHandler = async function* (message: string) {
    const lower = message.toLowerCase();
    let answer = KNOWLEDGE_BASE.stack;

    if (lower.includes('sse') || lower.includes('stream') || lower.includes('latency')) {
      answer = KNOWLEDGE_BASE.sse;
    } else if (lower.includes('size') || lower.includes('bundle') || lower.includes('kb')) {
      answer = KNOWLEDGE_BASE.bundle;
    } else if (lower.includes('who') || lower.includes('author') || lower.includes('chitrank')) {
      answer = KNOWLEDGE_BASE.author;
    } else {
      answer = `You asked: "${message}". In production, ask-widget forwards queries to your streaming endpoint via SSE and renders tokens with incremental plain-text messages!`;
    }

    const words = answer.split(' ');
    for (const [index, word] of words.entries()) {
      await wait(index === 0 ? 200 : 40);
      yield word + ' ';
    }
  };

  return (
    <section id="showcase" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:py-24">
      {/* Section Header with Monoline SectionHead */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <SectionHead
          level={2}
          size="lg"
          title="See ask-widget in action"
          subtitle="Interact with the live widget inside the portfolio preview below. Click quick prompts or type in real queries."
        />
      </div>

      {/* Simulated Browser Viewport (OpenSEO Showcase Frame) */}
      <div className="relative overflow-hidden rounded-3xl border border-[var(--border-strong)] bg-[var(--surface-2)] shadow-xl">
        {/* Browser Chrome Header (Minimal Craft Header without faux OS traffic lights) */}
        <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3 bg-[var(--surface)]">
          <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-secondary)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--status-online)]" />
            <span className="font-semibold text-[var(--text)]">Portfolio Playground</span>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-4 py-1 font-mono text-xs text-[var(--text-secondary)] w-64 justify-center">
            <span className="text-[var(--status-online)]">🔒</span>
            <span>https://chitrankagnihotri.com</span>
          </div>

          {/* Quick controls for preview */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <button
              type="button"
              onClick={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}
              className="rounded-md border border-[var(--border)] bg-[var(--surface-2)] px-2.5 py-1 text-[var(--text)] transition hover:bg-[var(--surface-3)]"
            >
              Theme: {theme.toUpperCase()}
            </button>
            <button
              type="button"
              onClick={() =>
                setPosition(p => (p === 'bottom-right' ? 'bottom-left' : 'bottom-right'))
              }
              className="hidden sm:inline-flex rounded-md border border-[var(--border)] bg-[var(--surface-2)] px-2.5 py-1 text-[var(--text)] transition hover:bg-[var(--surface-3)]"
            >
              Pos: {position === 'bottom-right' ? 'RIGHT' : 'LEFT'}
            </button>
          </div>
        </div>

        {/* Mock Portfolio Desktop Canvas */}
        <div
          className={`relative min-h-[500px] p-6 sm:p-10 transition-colors duration-200 ${theme === 'dark' ? 'bg-[var(--surface-code)] text-[var(--text)]' : 'bg-[var(--background)] text-[var(--text)]'}`}
        >
          {/* Portfolio Navbar */}
          <div className="flex items-center justify-between border-b pb-4 opacity-70 border-current">
            <div className="font-mono text-xs font-bold tracking-wider">
              CHITRANK_AGNIHOTRI // AI SYSTEMS
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span>PROJECTS</span>
              <span>WRITING</span>
              <span>CONTACT</span>
            </div>
          </div>

          {/* Portfolio Hero Preview Content */}
          <div className="mt-8 max-w-xl space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-current px-3 py-0.5 text-[11px] font-mono opacity-80">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              AVAILABLE FOR SELECT ROLES
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Designing generative systems and low-latency developer interfaces.
            </h3>

            <p className="text-sm opacity-80 leading-relaxed">
              Staff Engineer specializing in distributed LLM architectures, local model
              orchestration, and high-fidelity web component engineering.
            </p>

            {/* Quick Interactive Prompt Suggestions */}
            <div className="pt-4 space-y-2">
              <span className="text-xs font-mono opacity-60 block">
                CLICK A QUESTION TO ASK THE WIDGET:
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    const input = document.querySelector('.chat-widget__input') as HTMLInputElement;
                    if (input) {
                      input.value = 'What is your primary tech stack?';
                      input.dispatchEvent(new Event('input', { bubbles: true }));
                      const form = input.closest('form');
                      if (form)
                        form.dispatchEvent(
                          new Event('submit', { cancelable: true, bubbles: true }),
                        );
                    }
                  }}
                  className="rounded-full border border-current/20 bg-current/5 px-3 py-1.5 hover:bg-current/10 transition"
                >
                  "What is your tech stack?"
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const input = document.querySelector('.chat-widget__input') as HTMLInputElement;
                    if (input) {
                      input.value = 'How fast is Server-Sent Events (SSE) streaming?';
                      input.dispatchEvent(new Event('input', { bubbles: true }));
                      const form = input.closest('form');
                      if (form)
                        form.dispatchEvent(
                          new Event('submit', { cancelable: true, bubbles: true }),
                        );
                    }
                  }}
                  className="rounded-full border border-current/20 bg-current/5 px-3 py-1.5 hover:bg-current/10 transition"
                >
                  "How fast is SSE streaming?"
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const input = document.querySelector('.chat-widget__input') as HTMLInputElement;
                    if (input) {
                      input.value = 'What is the bundle size of ask-widget?';
                      input.dispatchEvent(new Event('input', { bubbles: true }));
                      const form = input.closest('form');
                      if (form)
                        form.dispatchEvent(
                          new Event('submit', { cancelable: true, bubbles: true }),
                        );
                    }
                  }}
                  className="rounded-full border border-current/20 bg-current/5 px-3 py-1.5 hover:bg-current/10 transition"
                >
                  "What is the bundle footprint?"
                </button>
              </div>
            </div>
          </div>

          {/* Embedded Real ChatWidget Mounted Directly in Mock Canvas */}
          <ChatWidget
            title="Portfolio AI"
            placeholder="Ask about Chitrank's stack or projects..."
            theme={theme}
            position={position}
            streamResponse={streamResponse}
          />
        </div>
      </div>

      {/* 8 Feature Pills Grid (Direct OpenSEO Inspiration) */}
      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURE_TABS.map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`text-left rounded-2xl border p-4 transition-all duration-150 ${
              activeTab === tab.id
                ? 'border-[var(--text)] bg-[var(--surface-3)] shadow-xs'
                : 'border-[var(--border)] bg-[var(--surface-2)] hover:border-[var(--border-strong)]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-[var(--text)]">{tab.label}</span>
              {activeTab === tab.id && (
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--status-online)]" />
              )}
            </div>
            <p className="mt-1.5 text-xs text-[var(--text-secondary)] leading-relaxed">
              {tab.desc}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}
