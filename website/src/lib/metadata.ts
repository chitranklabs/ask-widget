import type { Metadata } from 'next';

import { siteUrl } from './seo';

export const socialImage = {
  url: new URL('/ask-widget-og.png', `${siteUrl}/`).toString(),
  width: 1024,
  height: 1024,
  alt: 'ask-widget - A lightweight floating chat widget with SSE streaming and neutral zinc aesthetics',
} as const;

interface PageMetadataInput {
  title: string;
  description: string;
  path: `/${string}`;
  absoluteTitle?: boolean;
}

function absoluteUrl(path: `/${string}`) {
  return new URL(path, `${siteUrl}/`).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    openGraph: {
      type: 'website',
      url,
      siteName: 'ask-widget',
      title,
      description,
      locale: 'en_US',
      images: [socialImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [socialImage],
    },
    alternates: {
      canonical: url,
    },
  };
}
