import Head from 'next/head';
import Layout from '@/components/Layout';
import FollowLinks from '@/components/FollowLinks';
import { site } from '@/lib/site';

/**
 * Inline body link, in the system's link style (teal with a link-bd underline
 * that solidifies on hover). The author's own hiremaga.com links stay in-tab;
 * outside links open in a new tab.
 */
function InlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  const external = !href.startsWith('https://hiremaga.com');
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="border-b border-link-bd text-teal no-underline transition-colors hover:border-teal"
    >
      {children}
    </a>
  );
}

export default function About() {
  return (
    <Layout active="about" width="about">
      <Head>
        <title>{`About | ${site.name}`}</title>
        <meta name="description" content={`About ${site.name}.`} />
      </Head>

      <section className="pt-10">
        {/* Portrait placeholder — a hatched fill from the portrait tokens. */}
        <div
          className="flex h-[152px] w-[152px] items-center justify-center rounded-card border border-mist"
          style={{
            background:
              'repeating-linear-gradient(45deg, var(--portrait-1), var(--portrait-1) 9px, var(--portrait-2) 9px, var(--portrait-2) 18px)',
          }}
        >
          <span className="font-sans text-[11px] text-far">portrait</span>
        </div>

        <h1 className="mt-7 font-serif text-h1 font-semibold text-ink">About</h1>

        <div className="mt-[18px] max-w-[520px] font-serif text-lg leading-[1.75] text-near">
          <p className="mb-[18px]">
            I&apos;m an engineering manager. I write about software, the people who build it, and
            what I&apos;m still learning about doing the work well.
          </p>
          <p className="mb-[18px]">
            I{' '}
            <InlineLink href="https://hiremaga.com/posts/unfamiliar-water">
              learned to swim at forty
            </InlineLink>
            . I&apos;d been scared of water since I was a kid in Bangalore, and one weekend I decided
            I&apos;d rather just be bad at it for a while. It turned out to be the most useful thing I
            know how to do. I&apos;m doing it again now with{' '}
            <InlineLink href="https://github.com/hiremaga/rustlings/blob/main/CLAUDE.md">
              Rust
            </InlineLink>
            , slowly enough to actually understand it. I’m doing this with my motorcycle as well.
            Most of what I care about started this way, awkward and on purpose.
          </p>
          <p className="mb-[18px]">
            I spent the last four years at{' '}
            <InlineLink href="https://asana.com">Asana</InlineLink>, first managing the team behind
            the product&apos;s design system, then its consumption billing licensing platform team.
            Before that, I spent several years at Pivotal Labs, where I learned that software is
            something people build together, and that{' '}
            <InlineLink href="https://hiremaga.com/posts/the-athletic-position">
              the practices that look like overhead
            </InlineLink>{' '}
            are usually the real work. They keep a team ready instead of just busy.
          </p>
          <p className="mb-[18px]">
            I was born in Bangalore, spent years in Australia, and now live in the Bay Area with my
            partner Madhavi and our son Varun. I&apos;m not really from one place anymore.
          </p>
          <p className="mb-0">
            Right now I&apos;m{' '}
            <InlineLink href="https://hiremaga.com/posts/the-first-two-weeks">
              on a sabbatical
            </InlineLink>
            , between things, more in flux than I&apos;ve been in a long time. I swim most mornings
            and ride my motorcycle when I can. Both ground me. I&apos;m also working out what AI means
            for people who care about craft, and what comes next. I’ll write from here, in the middle
            of this, while it&apos;s still unfamiliar.
          </p>
        </div>

        <FollowLinks tone="teal" className="mt-7 gap-[18px] font-sans text-ui font-medium" />
      </section>
    </Layout>
  );
}
