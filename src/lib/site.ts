/**
 * Site-wide constants. One place for the author's name, the tagline, the
 * primary navigation, and the places to follow — imported wherever they are
 * shown so they never drift between the masthead, footer, and metadata.
 */

export const site = {
  name: 'Abhi Hiremagalur',
  /** Reading-page intro shown on the home screen (the lede). */
  lead:
    "I'm an engineering manager. Recently I've been learning Rust the way I learned to love swimming at forty: slowly, awkwardly, on purpose. I write here about software, the people who build it, and what I'm learning next.",
  /** Plain-text version of the lede for <meta> tags (no markdown/links). */
  description:
    "I'm an engineering manager. Recently I've been learning Rust the way I learned to love swimming at forty: slowly, awkwardly, on purpose. I write here about software, the people who build it, and what I'm learning next.",
  url: 'https://hiremaga.com',
  newsletterAction: 'https://buttondown.email/api/emails/embed-subscribe/hiremaga',
} as const;

export type NavKey = 'writing' | 'about' | 'design-system';

/** Top navigation. The design system is its own destination, deliberately. */
export const nav: ReadonlyArray<{ key: NavKey; label: string; href: string }> = [
  { key: 'writing', label: 'Writing', href: '/' },
  { key: 'about', label: 'About', href: '/about' },
  { key: 'design-system', label: 'Design System', href: '/design-system' },
];

/** Places to follow, in display order. RSS is the on-site feed. */
export const follow: ReadonlyArray<{ label: string; href: string; external: boolean }> = [
  { label: 'Bluesky', href: 'https://bsky.app/profile/hiremaga.com', external: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hiremaga/', external: true },
  { label: 'RSS', href: '/rss.xml', external: false },
];
