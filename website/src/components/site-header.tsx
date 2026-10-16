'use client';
import Link from 'next/link';
import { Navbar, ThemeSwitcher } from '@chitrank2050/monoline-ui';
import { useTheme } from '@/src/components/theme-provider';
import { packageVersion } from '@/src/lib/seo';
export function SiteHeader() {
  const { theme, setTheme } = useTheme();
  return (
    <Navbar className="site-header" brandTextStyle="monoline">
      <Navbar.Brand
        href="/"
        textStyle="monoline"
        mark={
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M4 4h16v12H9l-5 4V4Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path d="M8 8h8M8 12h5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        }
      >
        ask-widget<span className="site-version">v{packageVersion}</span>
      </Navbar.Brand>
      <Navbar.Nav label="Main navigation">
        <Navbar.Link asChild className="header-secondary-link">
          <Link href="/#showcase">Playground</Link>
        </Navbar.Link>
        <Navbar.Link href="https://docs.askwidget.chitrankagnihotri.com/">
          Documentation
        </Navbar.Link>
        <Navbar.Link
          className="header-secondary-link"
          href="https://github.com/chitranklabs/ask-widget"
          external
        >
          GitHub
        </Navbar.Link>
      </Navbar.Nav>
      <Navbar.Actions>
        <ThemeSwitcher
          theme={theme}
          onThemeChange={setTheme}
          mode="mini"
          size="sm"
          className="theme-toggle"
        />
      </Navbar.Actions>
    </Navbar>
  );
}
