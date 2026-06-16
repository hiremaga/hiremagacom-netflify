import Head from 'next/head';
import type { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import PostList, { type PostMeta } from '@/components/PostList';
import SubscribeForm from '@/components/SubscribeForm';
import FollowLinks from '@/components/FollowLinks';
import { getSortedPostsData } from '@/lib/posts';
import { site } from '@/lib/site';

export const getStaticProps: GetStaticProps<{ posts: PostMeta[] }> = async () => ({
  props: { posts: getSortedPostsData() },
});

export default function Home({ posts }: { posts: PostMeta[] }) {
  return (
    <Layout active="writing">
      <Head>
        <title>{site.name}</title>
        <meta name="description" content={site.description} />
      </Head>

      {/* Lead + a single follow surface: subscribe and social together. */}
      <section className="pt-10">
        <p className="max-w-measure font-serif text-standfirst text-lead">{site.lead}</p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <SubscribeForm size="lg" />
          <div className="flex items-center gap-3 font-sans text-meta text-far">
            <span>or follow on</span>
            <FollowLinks tone="mid" className="gap-3.5" />
          </div>
        </div>
      </section>

      <section className="pt-10">
        <h2 className="mb-2 font-sans text-eyebrow uppercase text-far">All writing</h2>
        <PostList posts={posts} />
      </section>
    </Layout>
  );
}
