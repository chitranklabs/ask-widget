import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ask-widget - Minimalist AI Chat Widget',
    short_name: 'ask-widget',
    description:
      'A lightweight floating chat widget with SSE streaming and neutral zinc aesthetics.',
    start_url: '/',
    display: 'standalone',
    background_color: '#09090b',
    theme_color: '#09090b',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/icon.png',
        sizes: '400x400',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '400x400',
        type: 'image/png',
      },
    ],
  };
}
