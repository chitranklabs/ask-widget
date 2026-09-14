import Script from 'next/script';

declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: Record<string, unknown>) => void;
      identify: (sessionData?: Record<string, unknown>) => void;
    };
  }
}

/**
 * Privacy-first, cookie-less Umami analytics integration.
 * Activates when NEXT_PUBLIC_UMAMI_WEBSITE_ID is set in the environment (.env.local or Vercel).
 */
export function UmamiAnalytics() {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const scriptUrl = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL || 'https://cloud.umami.is/script.js';

  if (!websiteId) {
    return null;
  }

  return (
    <Script async defer src={scriptUrl} data-website-id={websiteId} strategy="afterInteractive" />
  );
}
