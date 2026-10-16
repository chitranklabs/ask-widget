import { Inter, IBM_Plex_Mono } from 'next/font/google';
const sans = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-sans' });
const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-mono',
});
export const monolineFontClassName = [sans.variable, mono.variable].join(' ');
