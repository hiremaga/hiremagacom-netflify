/**
 * Fonts are loaded with next/font so they are self-hosted, subset, and free of
 * layout shift. Each exposes a CSS variable that the Tailwind theme references
 * (see tailwind.config.js -> fontFamily). `fontVariables` is applied once, at
 * the app root, so the variables cascade to every page.
 */
import { Newsreader, IBM_Plex_Sans, IBM_Plex_Mono, Space_Grotesk } from 'next/font/google';

/** Voice — display and reading. (next/font has no metric overrides for
 *  Newsreader, so we opt out of the automatic fallback face explicitly.) */
export const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  display: 'swap',
  adjustFontFallback: false,
});

/** UI workhorse — nav, labels, meta, controls. */
export const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-sans',
  display: 'swap',
});

/** Specs and code samples in the design system. */
export const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

/** Design-system chrome only (headings/eyebrows on /design-system). */
export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const fontVariables = [
  newsreader.variable,
  plexSans.variable,
  plexMono.variable,
  spaceGrotesk.variable,
].join(' ');
