import type { Metadata } from 'next';

import { SiteFooter } from '@/src/components/site-footer';
import { SiteHeader } from '@/src/components/site-header';
import { ThemeProvider } from '@/src/components/theme-provider';
import { UmamiAnalytics } from '@/src/components/umami-analytics';
import { WebVitals } from '@/src/components/web-vitals';
import {
  JsonLd,
  getPersonJsonLd,
  getSoftwareApplicationJsonLd,
  getWebsiteJsonLd,
} from '@/src/components/json-ld';
import { monolineFontClassName } from '@/src/lib/fonts';
import { fetchIdentity } from '@/src/lib/identity';
import { socialImage } from '@/src/lib/metadata';
import { siteUrl } from '@/src/lib/seo';

import '@chitrank2050/ask-widget/style.css';
import './globals.css';

export async function generateMetadata(): Promise<Metadata> {
  const identity = await fetchIdentity();
  const author = identity
    ? { name: identity.name, url: identity.websiteUrl }
    : { name: 'Chitrank Agnihotri', url: 'https://chitrankagnihotri.com' };

  const title = 'ask-widget - Lightweight Floating Chat Widget with SSE Streaming';
  const description =
    'Drop-in floating chat widget for developer portfolios. Server-Sent Events (SSE) token streaming, neutral zinc dark/light themes, and zero runtime dependencies.';

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: '%s | ask-widget',
    },
    description,
    keywords: [
      'ask-widget',
      'chat widget',
      'portfolio chat',
      'react chat widget',
      'sse streaming',
      'server-sent events',
      'streaming ai chat',
      'zero dependency',
      'monochrome ui',
      'zinc theme',
      'developer portfolio',
      'next.js chat',
      'react 19',
      'chitrank agnihotri',
    ],
    authors: [author],
    creator: author.name,
    publisher: author.name,
    icons: {
      icon: '/favicon.svg',
      apple: '/apple-icon.png',
    },
    openGraph: {
      type: 'website',
      url: siteUrl,
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
    appleWebApp: {
      capable: true,
      title: 'ask-widget',
      statusBarStyle: 'black-translucent',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isProduction = process.env.NODE_ENV === 'production';
  const identity = await fetchIdentity();

  return (
    <html
      lang="en"
      data-theme="dark"
      className={monolineFontClassName}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <head>
        {identity && <JsonLd data={getPersonJsonLd(identity)} />}
        <JsonLd data={getWebsiteJsonLd(identity, siteUrl)} />
        <JsonLd data={getSoftwareApplicationJsonLd(identity, siteUrl)} />
      </head>
      <body
        className="min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased font-sans"
        suppressHydrationWarning
      >
        <script
          id="ask-theme-init"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('ask-theme');var d=document.documentElement;if(t==='light'||t==='dark'){d.setAttribute('data-theme',t);return;}if(window.matchMedia('(prefers-color-scheme: light)').matches){d.setAttribute('data-theme','light');return;}d.setAttribute('data-theme','dark');}catch(e){}})();`,
          }}
        />
        <ThemeProvider>
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </div>
        </ThemeProvider>
        <WebVitals />
        {isProduction && <UmamiAnalytics />}
      </body>
    </html>
  );
}
