import packageJson from '../../../package.json';

export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || 'https://askwidget.chitrankagnihotri.com',
).origin;
export const packageVersion = packageJson.version;
export const isPreviewDeployment = Boolean(
  process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production',
);
export const siteRoutes = ['/', '/changelog'] as const;
