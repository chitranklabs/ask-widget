export function TechnicalSpecsBento() {
  return (
    <section id="features" className="shell package-notes" aria-label="Package capabilities">
      <div>
        <span className="note-symbol" aria-hidden="true">
          ↳
        </span>
        <p>
          <strong>Use the widget. Or just the hooks.</strong>
          <br />
          Chat state, SSE streaming and session history are available as standalone React hooks.
        </p>
        <a href="https://chitranklabs.github.io/ask-widget/hooks">Explore the hooks ↗</a>
      </div>
      <div>
        <span className="note-symbol" aria-hidden="true">
          ◇
        </span>
        <p>
          <strong>A small dependency surface.</strong>
          <br />
          React stays a peer dependency. No third-party runtime libraries or tracking scripts in the
          widget.
        </p>
        <a href="https://github.com/chitranklabs/ask-widget">Inspect the source ↗</a>
      </div>
    </section>
  );
}
