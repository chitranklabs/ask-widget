import { Button } from '@chitrank2050/monoline-ui';
export function HomeHero() {
  return (
    <section className="product-intro shell" aria-labelledby="product-title">
      <div>
        <p className="intro-label">React component / Headless hooks</p>
        <h1 id="product-title">
          A conversation layer
          <br />
          for your website.
        </h1>
        <p>
          Streaming chat, in a small React package. Connect your backend, set your theme, and let
          visitors ask the next question.
        </p>
      </div>
      <div className="intro-actions">
        <Button asChild variant="primary">
          <a href="#integration">Install ask-widget</a>
        </Button>
        <a className="quiet-link" href="https://chitranklabs.github.io/ask-widget/getting-started">
          Read the guide <span aria-hidden="true">↗</span>
        </a>
        <span>React 18+ · TypeScript · MIT</span>
      </div>
    </section>
  );
}
