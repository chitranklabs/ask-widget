import { Metadata } from 'next';

import { ApiReference } from '@/src/components/api-reference';
import { HomeHero } from '@/src/components/home-hero';
import { IntegrationStudio } from '@/src/components/integration-studio';
import { InteractiveShowcase } from '@/src/components/interactive-showcase';
import { JsonLd, getFAQJsonLd } from '@/src/components/json-ld';
import { TechnicalSpecsBento } from '@/src/components/technical-specs-bento';
import { createPageMetadata } from '@/src/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'ask-widget | Streaming React Chat for Your Website',
  absoluteTitle: true,
  description:
    'Add streaming chat to a React portfolio or website with ask-widget. Configure themes, use headless hooks, and connect your own backend through SSE or response handlers.',
  path: '/',
});

const FAQS = [
  {
    question: 'Can I use my own backend?',
    answer:
      'Yes. Set `apiUrl` to your backend base URL; the widget sends chat requests to `/v1/chat` under that base. For a different response format, supply a `streamResponse` handler. Keep provider credentials on the server. An `apiToken` passed to the widget is visible in the browser.',
  },
  {
    question: 'Which React and Next.js versions are supported?',
    answer:
      'The package supports React 18 and 19, with ESM, CommonJS and TypeScript declarations. Its client entry point works with the Next.js App Router. The integration examples above show how to mount it.',
  },
  {
    question: 'Can I match my website’s theme?',
    answer:
      'Choose the `light` or `dark` theme, then override individual values with the `colors` prop. You can also style the widget using CSS variables such as `--widget-primary`, `--widget-background` and `--widget-border`.',
  },
  {
    question: 'Does the widget include tracking?',
    answer:
      'The published widget includes no analytics or telemetry scripts. Chat requests go to the endpoint you configure. If you provide a custom response handler, you control its network requests and data handling.',
  },
  {
    question: 'What dependencies does it ship?',
    answer:
      'React and React DOM are peer dependencies. The widget bundles no third-party runtime libraries and ships its own JavaScript, TypeScript declarations and stylesheet. Measure both JavaScript and CSS when comparing package sizes.',
  },
];

export default function HomePage() {
  return (
    <div className="website-home">
      {/* Keep structured answers consistent with the visible FAQ. */}
      <JsonLd
        data={getFAQJsonLd(FAQS.map(faq => ({ ...faq, answer: faq.answer.replaceAll('`', '') })))}
      />

      <HomeHero />
      <InteractiveShowcase />
      <TechnicalSpecsBento />
      <IntegrationStudio />

      <ApiReference />
      <section id="faq" className="shell faq-section" aria-labelledby="faq-heading">
        <div className="faq-heading">
          <h2 id="faq-heading">Frequently asked questions.</h2>
          <p>Integration, customization and what’s included.</p>
          <a href="https://chitranklabs.github.io/ask-widget/">
            Explore the documentation <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="faq-list">
          {FAQS.map(faq => (
            <details key={faq.question} name="website-faq" className="faq-item">
              <summary>
                <span>{faq.question}</span>
                <svg className="faq-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path
                    d="M10 4v12M4 10h12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </summary>
              <div className="faq-answer">
                <p>
                  {faq.answer
                    .split(/(`[^`]+`)/g)
                    .map((part, index) =>
                      part.startsWith('`') ? <code key={index}>{part.slice(1, -1)}</code> : part,
                    )}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
