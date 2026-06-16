import Head from 'next/head';
import Layout from '@/components/Layout';
import FollowLinks from '@/components/FollowLinks';
import { site } from '@/lib/site';

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
            I&apos;m an engineering manager who spent the last four years at Asana, and several
            hands-on years at Pivotal Labs before that. I was born in Bangalore, lived for years in
            Australia, and now call the Bay Area home.
          </p>
          <p className="mb-0">
            I&apos;m beginning a period of open-ended exploration — part personal, part a way to
            reground myself for the next phase of my career. I write here about humanistic software
            development and the growth journey that comes with it.
          </p>
        </div>

        <FollowLinks tone="teal" className="mt-7 gap-[18px] font-sans text-ui font-medium" />
      </section>
    </Layout>
  );
}
