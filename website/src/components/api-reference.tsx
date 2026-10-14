import { Button } from '@chitrank2050/monoline-ui';

const REFERENCES = [
  {
    title: 'Component API',
    description:
      'Configure ChatWidget props, labels and a custom response stream. The reference is generated from the component source.',
    href: 'https://chitranklabs.github.io/ask-widget/api',
    label: 'Read the API reference',
  },
  {
    title: 'Headless hooks',
    description:
      'Use the chat, streaming and session hooks to build your own interface. Find their signatures and usage examples in the guide.',
    href: 'https://chitranklabs.github.io/ask-widget/hooks',
    label: 'Explore the hooks',
  },
];

export function ApiReference() {
  return (
    <section
      id="api"
      aria-labelledby="api-heading"
      className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6"
    >
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-wider text-[var(--accent)]">Reference</p>
        <h2
          id="api-heading"
          className="mt-4 text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl"
        >
          Configure the widget. Build your own interface.
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base text-[var(--text-secondary)]">
          Start with ChatWidget, or use the hooks with your own React components.
        </p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {REFERENCES.map(reference => (
          <article
            key={reference.href}
            className="glass-panel flex flex-col rounded-2xl p-6 sm:p-8"
          >
            <h3 className="text-xl font-semibold text-[var(--text)]">{reference.title}</h3>
            <p className="mt-3 flex-1 leading-relaxed text-[var(--text-secondary)]">
              {reference.description}
            </p>
            <div className="mt-6">
              <Button asChild variant="secondary">
                <a href={reference.href}>
                  {reference.label}
                  <span aria-hidden="true"> →</span>
                </a>
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
