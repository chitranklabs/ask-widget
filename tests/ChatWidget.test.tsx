import { render, fireEvent, screen, act } from '@testing-library/react';
import { beforeEach, expect, it, vi } from 'vitest';
import ChatWidget from '../src/components/ChatWidget';

beforeEach(() => {
  localStorage.clear();
  HTMLElement.prototype.scrollTo = vi.fn();
});

it.each(['input', 'body'])(
  'closes a pending response with Escape from %s and returns focus',
  async target => {
    let signal: AbortSignal | undefined;
    let resolve!: (value: string) => void;
    render(
      <ChatWidget
        streamResponse={(_message, _history, context) => {
          signal = context?.signal;
          return new Promise<string>(done => {
            resolve = done;
          });
        }}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Open Ask AI' }));
    const input = screen.getByRole('textbox', { name: 'Message input' });
    expect(input).toHaveFocus();
    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.submit(screen.getByRole('form'));
    expect(screen.getByRole('button', { name: 'Close panel' })).toBeEnabled();
    if (target === 'body') {
      document.body.tabIndex = -1;
      document.body.focus();
      expect(document.body).toHaveFocus();
    }
    fireEvent.keyDown(target === 'body' ? document.body : input, { key: 'Escape' });
    expect(signal?.aborted).toBe(true);
    expect(screen.getByRole('button', { name: 'Open Ask AI' })).toHaveFocus();
    await act(async () => {
      resolve('Late response');
    });
    expect(screen.queryByRole('textbox')).toBeNull();
  },
);
