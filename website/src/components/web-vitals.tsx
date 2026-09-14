'use client';

import { useReportWebVitals } from 'next/web-vitals';

/**
 * Native Next.js Core Web Vitals Reporter
 * Measures real-user performance (CLS, FCP, FID, INP, LCP, TTFB)
 * and dispatches events to browser console in dev and Umami Analytics in production.
 */
export function WebVitals() {
  useReportWebVitals(metric => {
    const value = Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value);

    if (process.env.NODE_ENV !== 'production') {
      console.log(`[Web Vitals] ${metric.name}:`, {
        value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
      });
    }

    if (typeof window !== 'undefined' && window.umami) {
      window.umami.track(metric.name, {
        value,
        rating: metric.rating,
      });
    }
  });

  return null;
}
