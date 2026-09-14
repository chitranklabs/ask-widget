import type { Identity } from '@/src/lib/identity';
import { siteUrl } from '@/src/lib/seo';

interface Props<T> {
  data: T;
}

interface PageJsonLdInput {
  title: string;
  description: string;
  path: `/${string}`;
}

function absoluteUrl(path: `/${string}`) {
  return new URL(path, `${siteUrl}/`).toString();
}

export function getPersonJsonLd(identity: Identity) {
  return {
    '@type': 'Person',
    '@id': `${identity.websiteUrl}/#person`,
    name: identity.name,
    alternateName: identity.alternateNames,
    image: identity.portraitUrl,
    url: identity.websiteUrl,
    jobTitle: identity.jobTitle,
    worksFor: {
      '@type': 'Organization',
      name: identity.company.name,
      url: identity.company.url,
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: identity.education,
    },
    nationality: identity.nationality,
    knowsAbout: identity.knowsAbout,
    sameAs: [
      identity.socials.linkedin,
      identity.socials.github,
      identity.websiteUrl,
      'https://askwidget.chitrankagnihotri.com',
      'https://monolineui.chitrankagnihotri.com',
      'https://githygiene.chitrankagnihotri.com',
    ],
    mainEntityOfPage: {
      '@id': `${identity.websiteUrl}/#webpage`,
    },
  };
}

export function getWebsiteJsonLd(identity: Identity | null, siteUrl: string) {
  const jsonLd: Record<string, unknown> = {
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: 'ask-widget',
    description:
      'A lightweight chat widget for developer portfolios. Drop-in floating chat with SSE streaming, dark/light themes, and configurable positioning.',
    about: {
      '@id': `${siteUrl}/#software-source-code`,
    },
    sameAs: [
      'https://github.com/chitranklabs/ask-widget',
      'https://chitrankagnihotri.com/project/ask-widget',
    ],
  };

  if (identity) {
    const person = { '@id': `${identity.websiteUrl}/#person` };
    jsonLd.publisher = person;
    jsonLd.author = person;
  }

  return jsonLd;
}

export function getSoftwareApplicationJsonLd(identity: Identity | null, siteUrl: string) {
  const jsonLd: Record<string, unknown> = {
    '@type': 'SoftwareApplication',
    '@id': `${siteUrl}/#software-application`,
    name: '@chitrank2050/ask-widget',
    operatingSystem: 'Platform Independent',
    applicationCategory: 'DeveloperApplication',
    softwareVersion: '0.6.1',
    description:
      'A lightweight floating chat widget with Server-Sent Events (SSE) streaming, zero runtime dependencies, and customizable neutral zinc themes for modern portfolios and web applications.',
    url: siteUrl,
    downloadUrl: 'https://www.npmjs.com/package/@chitrank2050/ask-widget',
    license: 'https://github.com/chitranklabs/ask-widget/blob/main/LICENSE',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Real-time Server-Sent Events (SSE) Token Streaming',
      'Zero Runtime Dependencies (<14KB gzipped footprint)',
      'Neutral Zinc & Monochrome Themes (Dark and Light modes)',
      'Configurable Positioning (Bottom-Right / Bottom-Left)',
      'Headless Hooks (useChat, useSSEStream, useSession)',
      'Markdown & Code Highlighting Support',
      'Vanilla JS & CDN Drop-in Script Tag Support',
    ],
  };

  if (identity) {
    jsonLd.author = { '@id': `${identity.websiteUrl}/#person` };
  }

  return jsonLd;
}

export function getFAQJsonLd(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function getBreadcrumbJsonLd(items: Array<{ name: string; path: `/${string}` }>) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function JsonLd<T extends Record<string, unknown>>({ data }: Props<T>) {
  const json = JSON.stringify({
    '@context': 'https://schema.org',
    ...data,
  });

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
