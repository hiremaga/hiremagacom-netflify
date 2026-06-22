import Head from 'next/head';
import Link from 'next/link';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import PostDate from '@/components/PostDate';
import SubscribeCallout from '@/components/SubscribeCallout';
import { getAllPostIds, getPostData } from '@/lib/posts';
import { site } from '@/lib/site';

type PostData = {
  id: string;
  title: string;
  date: string;
  contentHtml: string;
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getAllPostIds(),
  fallback: false,
});

export const getStaticProps: GetStaticProps<{ postData: PostData }> = async ({ params }) => ({
  props: { postData: await getPostData(params?.id as string) },
});

export default function Post({ postData }: { postData: PostData }) {
  return (
    <Layout active="writing">
      <Head>
        <title>{`${postData.title} | ${site.name}`}</title>
        <meta name="description" content={`${postData.title} — an essay by ${site.name}.`} />
        <meta property="og:title" content={`${postData.title} | ${site.name}`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${site.url}/posts/${postData.id}`} />
      </Head>

      {/* The whole article column is capped at the reading measure. */}
      <article className="max-w-measure pt-9">
        <Link
          href="/"
          className="font-sans text-ui font-medium text-mid no-underline transition-colors hover:text-teal"
        >
          ← All writing
        </Link>

        <div className="mt-7 font-sans text-meta uppercase tracking-[0.05em] text-far">
          <PostDate dateString={postData.date} />
        </div>
        <h1 className="mt-3 font-serif text-display font-semibold text-ink">{postData.title}</h1>

        <div className="essay mt-8" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />

        <p className="mt-10 border-t border-mist pt-6 font-serif text-base leading-relaxed text-mid">
          Thanks for reading! Want to discuss this post?{' '}
          <a
            href={site.bluesky}
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-link-bd text-teal no-underline transition-colors hover:border-teal"
          >
            Find me on Bluesky
          </a>
          .
        </p>

        <div className="mt-6">
          <SubscribeCallout />
        </div>
      </article>
    </Layout>
  );
}
