import Script from 'next/script';

export function CloudflareAnalytics() {
  if (
    process.env.NODE_ENV !== 'production' ||
    (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production')
  ) {
    return null;
  }

  const token = process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN?.trim();
  if (!token) return null;
  if (!/^[a-f0-9]{32}$/i.test(token)) {
    throw new Error(
      'NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN must be a 32-character hexadecimal beacon token.',
    );
  }

  return (
    <Script
      id="cloudflare-web-analytics"
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token })}
      strategy="afterInteractive"
    />
  );
}
