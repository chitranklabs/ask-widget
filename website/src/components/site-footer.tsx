'use client';

import Link from 'next/link';
import { Footer } from '@chitrank2050/monoline-ui';

export function SiteFooter() {
  return (
    <Footer
      className="site-footer"
      size="sm"
      brand={
        <Link className="footer-brand" href="/">
          ask-widget
        </Link>
      }
      description={
        <>
          Created by <a href="https://chitrankagnihotri.com">Chitrank Agnihotri</a>.
        </>
      }
      subscribe={false}
      linkComponent={Link}
      columns={[
        {
          title: 'Resources',
          links: [
            { href: 'https://docs.askwidget.chitrankagnihotri.com/', label: 'Documentation' },
            { href: '/changelog', label: 'Changelog' },
            { href: 'https://www.npmjs.com/package/@chitrank2050/ask-widget', label: 'npm' },
          ],
        },
        {
          title: 'Project',
          links: [
            { href: 'https://github.com/chitranklabs/ask-widget', label: 'GitHub' },
            { href: 'https://monolineui.chitrankagnihotri.com', label: 'Monoline UI' },
            { href: '/llms.txt', label: 'llms.txt' },
          ],
        },
      ]}
      meta="MIT licensed."
    />
  );
}
