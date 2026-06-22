import siteConfig from '../../site.config.json';

/**
 * Site-wide constants. One place for the author's name, the tagline, the
 * primary navigation, and the places to follow — imported wherever they are
 * shown so they never drift between the masthead, footer, and metadata.
 *
 * `url`, `name`, and `bluesky` come from site.config.json, the single
 * source of truth shared with the CLI scripts in scripts/ (which run under
 * plain `node` and can't import this TS module).
 */

export const site = {
  name: siteConfig.name,
  /** Reading-page intro shown on the home screen (the lede). */
  lead:
    "I'm an engineering manager. Recently I've been learning Rust the way I learned to love swimming at forty: slowly, awkwardly, on purpose. I write here about software, the people who build it, and what I'm learning next.",
  /** Plain-text version of the lede for <meta> tags (no markdown/links). */
  description:
    "I'm an engineering manager. Recently I've been learning Rust the way I learned to love swimming at forty: slowly, awkwardly, on purpose. I write here about software, the people who build it, and what I'm learning next.",
  url: siteConfig.url,
  bluesky: siteConfig.bluesky,
  newsletterAction: 'https://buttondown.email/api/emails/embed-subscribe/hiremaga',
  /** Set by `npm run atproto` once it discovers the account's DID. Null until then. */
  atprotoDid: siteConfig.atproto.did,
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
  { label: 'Bluesky', href: site.bluesky, external: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hiremaga/', external: true },
  { label: 'RSS', href: '/rss.xml', external: false },
];
