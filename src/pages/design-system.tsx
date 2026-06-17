import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import type { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import BrandMark from '@/components/BrandMark';
import NewBadge from '@/components/NewBadge';
import ThemeToggle from '@/components/ThemeToggle';
import SubscribeForm from '@/components/SubscribeForm';
import SubscribeCallout from '@/components/SubscribeCallout';
import PostList from '@/components/PostList';
import RangesIllustration from '@/components/RangesIllustration';
import {
  implementationNotes,
  ladder,
  typeScale,
  spacing,
  radii,
  layoutRules,
} from '@/lib/design-system';
import { site } from '@/lib/site';

/* ---------------------------------------------------------------------------
 * Small presentational helpers, local to this page. The design system pages are
 * the one place we lean on Space Grotesk (font-display) for headings.
 * ------------------------------------------------------------------------- */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-display text-[13px] font-semibold uppercase tracking-[0.18em] text-mid">
      {children}
    </div>
  );
}

function Panel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-frame border border-mist bg-surface p-7 ${className}`}>{children}</div>
  );
}

function PanelHeading({ title, note }: { title: string; note?: string }) {
  return (
    <div className="mb-4">
      <div className="font-display text-lg font-semibold text-ink">{title}</div>
      {note && <div className="mt-1 font-sans text-[13px] text-far">{note}</div>}
    </div>
  );
}

/** Mono spec caption used under component examples. */
function Spec({ children }: { children: React.ReactNode }) {
  return <div className="mt-3.5 font-mono text-[12px] leading-relaxed text-far">{children}</div>;
}

/** A dark code block; code reads well dark in either theme, so it is fixed. */
function Code({ children }: { children: string }) {
  return (
    <pre className="max-h-[420px] overflow-auto rounded-card bg-[#13201e] p-5 font-mono text-[12.5px] leading-relaxed text-[#cfe0de]">
      {children}
    </pre>
  );
}

/**
 * A single colour swatch. The chip is painted with the live CSS variable, so it
 * is always correct and theme-accurate. The hex label is read back from the
 * rendered element on mount — never copied — so it cannot drift from tokens.css.
 */
function Swatch({ token, role }: { token: string; role: string }) {
  const chip = useRef<HTMLDivElement>(null);
  const [hex, setHex] = useState('');

  useEffect(() => {
    if (chip.current) {
      setHex(getComputedStyle(chip.current).getPropertyValue(`--${token}`).trim());
    }
  }, [token]);

  return (
    <div>
      <div
        ref={chip}
        className="h-[46px] rounded-control border border-mist"
        style={{ background: `var(--${token})` }}
      />
      <div className="mt-2 font-sans text-[11px] font-semibold text-ink">{token}</div>
      <div className="font-mono text-[10px] text-far">{hex || '—'}</div>
      <div className="font-mono text-[10px] text-far">{role}</div>
    </div>
  );
}

/** A pinned light or dark island showing the whole ladder in that palette. */
function LadderGrid({ theme }: { theme: 'light' | 'dark' }) {
  return (
    <div
      data-theme={theme}
      className="rounded-card border border-mist bg-bg p-5"
    >
      <div className="mb-3 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-far">
        {theme}
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(86px,1fr))] gap-2.5">
        {ladder.map((entry) => (
          <Swatch key={entry.token} token={entry.token} role={entry.role} />
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * Component examples
 * ------------------------------------------------------------------------- */

const samplePosts = [
  { id: 'the-first-two-weeks', title: 'The First Two Weeks', date: '2026-05-31' },
  { id: 'the-athletic-position', title: 'The Athletic Position', date: '2026-04-15' },
];

function ComponentCard({
  label,
  spec,
  children,
}: {
  label: string;
  spec: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full rounded-frame border border-mist bg-surface p-6 sm:w-auto sm:min-w-[340px] sm:flex-1">
      <div className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-far">
        {label}
      </div>
      <div className="mt-4">{children}</div>
      <Spec>{spec}</Spec>
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * Page
 * ------------------------------------------------------------------------- */

export const getStaticProps: GetStaticProps<{ tokensCss: string }> = async () => {
  // Render the canonical token file verbatim so this page IS the source.
  const fs = require('fs') as typeof import('fs');
  const path = require('path') as typeof import('path');
  const tokensCss = fs.readFileSync(path.join(process.cwd(), 'src/styles/tokens.css'), 'utf8');
  return { props: { tokensCss } };
};

export default function DesignSystem({ tokensCss }: { tokensCss: string }) {
  return (
    <Layout active="design-system" width="wide" motif={false}>
      <Head>
        <title>{`Design System | ${site.name}`}</title>
        <meta name="description" content="Ranges — the design system behind this site." />
      </Head>

      <div className="space-y-5 pb-4 pt-10">
        {/* Intro */}
        <header>
          <SectionLabel>Design System</SectionLabel>
          <h1 className="mt-3 font-display text-[28px] font-bold tracking-[-0.02em] text-ink">
            Ranges — foundations &amp; components
          </h1>
          <p className="mt-3 max-w-[680px] font-sans text-[15px] leading-relaxed text-mid">
            One teal hue, faded by distance — backgrounds are the far haze, ink the near ridge. A
            single warm <strong className="font-semibold text-ink">horizon</strong> accent is the
            light, used once per view. Everything below is the source of truth, spelled out so it can
            be rebuilt faithfully. Use the theme switcher in the masthead to see it in both palettes.
          </p>
        </header>

        {/* Implementation notes */}
        <Panel>
          <div className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-teal">
            Implementation notes · read me first
          </div>
          <ul className="mt-3.5 max-w-[820px] list-disc space-y-2 pl-5 font-sans text-[14px] leading-relaxed text-near">
            {implementationNotes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </Panel>

        {/* Tokens — verbatim from the source file */}
        <Panel>
          <PanelHeading
            title="Tokens"
            note="The colour source of truth — src/styles/tokens.css, shown verbatim. Non-colour scales live in tailwind.config.js."
          />
          <Code>{tokensCss}</Code>
        </Panel>

        {/* Colour ladder */}
        <Panel>
          <PanelHeading
            title="Colour · the ranges ladder"
            note="Same names, two themes. Background is the far haze; ink the near ridge; horizon the single warm light. Hex values are read live from the rendered swatches."
          />
          <div className="grid gap-4 lg:grid-cols-2">
            <LadderGrid theme="light" />
            <LadderGrid theme="dark" />
          </div>
        </Panel>

        {/* Type scale */}
        <Panel>
          <PanelHeading
            title="Type scale"
            note="Newsreader carries the voice (display + reading). IBM Plex Sans is the UI workhorse."
          />
          <div className="flex flex-col">
            {typeScale.map((row) => (
              <div
                key={row.spec}
                className="flex flex-col gap-2 border-t border-mist py-4 first:border-t-0 sm:flex-row sm:items-baseline sm:gap-6"
              >
                <div className={`min-w-0 flex-1 ${row.className}`}>{row.sample}</div>
                <div className="w-full flex-none font-mono text-[12px] text-far sm:w-[240px]">
                  {row.spec}
                </div>
              </div>
            ))}
          </div>
        </Panel>

        {/* Spacing + radii + elevation */}
        <div className="flex flex-wrap gap-5">
          <Panel className="w-full sm:w-auto sm:min-w-[420px] sm:flex-1">
            <PanelHeading title="Spacing · 4px base" note="Section rhythm is 40; the card gutter is 48." />
            <div className="flex flex-col gap-2.5">
              {spacing.map((px) => (
                <div key={px} className="flex items-center gap-3.5">
                  <div className="w-9 flex-none font-mono text-[12px] text-far">{px}</div>
                  <div className="h-3.5 rounded-[3px] bg-teal" style={{ width: `${px}px` }} />
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="w-full sm:w-auto sm:min-w-[300px] sm:flex-1">
            <PanelHeading title="Radii" note="Smaller for inline, larger for surfaces." />
            <div className="flex flex-wrap gap-[18px]">
              {radii.map((r) => (
                <div key={r.name} className="text-center">
                  <div className={`h-[46px] w-16 border border-input-bd bg-haze ${r.className}`} />
                  <div className="mt-2 font-mono text-[11px] text-far">
                    {r.name} · {r.px}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 font-display text-[13px] font-semibold text-ink">Elevation</div>
            <div className="mt-3 h-14 rounded-card border border-mist bg-surface shadow-card" />
            <div className="mt-2 font-mono text-[11px] text-far">
              card · 0 1px 2px /.06 + 0 18px 44px -18px /.28
            </div>
          </Panel>
        </div>

        {/* Components */}
        <SectionLabel>Components</SectionLabel>
        <div className="flex flex-wrap gap-5">
          <ComponentCard
            label="Buttons"
            spec="primary --teal / --on-teal · secondary --surface with 1px --input-bd · radius --control(8). The primary keeps a 1px transparent border so its height matches the secondary; hover → --teal-hover."
          >
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                className="rounded-control border border-transparent bg-teal px-5 py-[11px] font-sans text-sm font-semibold text-on-teal transition-colors hover:bg-teal-hover"
              >
                Subscribe
              </button>
              <button
                type="button"
                className="rounded-control border border-input-bd bg-surface px-5 py-[11px] font-sans text-sm font-semibold text-near transition-colors hover:border-far"
              >
                Read more
              </button>
            </div>
          </ComponentCard>

          <ComponentCard
            label="Input"
            spec="1px --input-bd · radius 8 · bg --surface · focus-visible: 2px --teal ring. Always paired with a label or aria-label."
          >
            <SubscribeForm size="sm" />
          </ComponentCard>

          <ComponentCard
            label="Inline link & nav"
            spec="link: --teal with a 1px --link-bd underline that solidifies on hover. nav active: --ink with a 1.5px --teal underline; idle --mid."
          >
            <div className="font-serif text-body text-near">
              Learning to swim was an{' '}
              <a
                href="#"
                className="border-b border-link-bd text-teal no-underline transition-colors hover:border-teal"
              >
                investment in myself
              </a>
              .
            </div>
            <div className="mt-3.5 flex gap-6 font-sans text-ui font-medium">
              <span className="border-b-[1.5px] border-teal pb-1 text-ink">Active</span>
              <span className="border-b-[1.5px] border-transparent pb-1 text-mid">Idle</span>
            </div>
          </ComponentCard>

          <ComponentCard
            label="List row · default + hover"
            spec="Rows bleed 14px into the gutter so titles align to the column while the hover wash (--row-hover, radius 10) gets breathing room. Hairline = --mist."
          >
            <PostList posts={samplePosts} />
          </ComponentCard>

          <ComponentCard
            label="“New” marker · the light"
            spec="1px --horizon border, a faint warm fill and halo, --horizon-text. The ONLY horizon use in a view — the single freshest item. Echoes the footer ridge."
          >
            <div className="flex items-center gap-3">
              <span className="font-serif text-list-title font-medium text-ink">
                The First Two Weeks
              </span>
              <NewBadge />
            </div>
          </ComponentCard>

          <ComponentCard
            label="Theme switcher"
            spec="Segmented track (1px --mist, 2px pad) with a filled active pill (--haze / --ink); idle --mid. aria-pressed per segment. Auto follows prefers-color-scheme and persists to localStorage."
          >
            <ThemeToggle />
          </ComponentCard>

          <ComponentCard
            label="Brand mark"
            spec="Three-band “ranges” glyph (--glyph-1/2/3) at ~cap height, nudged up 1px to sit on the wordmark's cap line. Wordmark in Newsreader."
          >
            <BrandMark />
          </ComponentCard>

          <ComponentCard
            label="Blockquote & divider"
            spec="quote: 3px --quote-bd rule, italic Newsreader, --quote-fg. Section break: a centred “* * *” in --divider."
          >
            <blockquote className="border-l-[3px] border-quote-bd pl-5 font-serif text-xl italic text-quote-fg">
              Exercise is a way to grapple with existence, to act.
            </blockquote>
            <div className="mt-4 text-center font-serif text-lg tracking-[0.4em] text-divider">
              * * *
            </div>
          </ComponentCard>

          <ComponentCard
            label="Inline subscribe"
            spec="Contextual CTA on --haze, radius --card(12). Reused at the end of posts; never a stark detached form."
          >
            <SubscribeCallout />
          </ComponentCard>
        </div>

        {/* Illustration */}
        <SectionLabel>The ranges illustration</SectionLabel>
        <Panel>
          <RangesIllustration caption="far & hazy → near & deep · one hue, fading · the lit ridge is horizon" />
          <p className="mt-3.5 max-w-[760px] font-sans text-[13px] leading-relaxed text-mid">
            The brand metaphor and palette in one. Optional as a literal flourish; always present as
            the logic behind the ladder. The single alpenglow ridge is the same horizon accent used
            on the “New” marker.
          </p>
        </Panel>

        {/* Layout & rules */}
        <Panel>
          <PanelHeading title="Layout & rules" />
          <div className="grid gap-x-8 gap-y-3.5 font-sans text-[13.5px] leading-relaxed text-near sm:grid-cols-2">
            {layoutRules.map((rule) => (
              <div key={rule.title}>
                <strong className="font-semibold text-ink">{rule.title}.</strong> {rule.body}
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </Layout>
  );
}
