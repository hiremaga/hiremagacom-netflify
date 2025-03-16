import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { getAllPostIds, getPostData } from '@/lib/posts';
import Layout from '@/components/layout';
import Date from '@/components/date';

type PostData = {
  id: string;
  title: string;
  date: string;
  contentHtml: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params?.id as string);
  return {
    props: {
      postData,
    },
  };
};

export default function Post({ postData }: { postData: PostData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title} | Abhi Hiremagalur</title>
        <meta name="description" content={`${postData.title} - An article by Abhi Hiremagalur`} />
        <meta property="og:title" content={`${postData.title} | Abhi Hiremagalur`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://hiremaga.com/posts/${postData.id}`} />
      </Head>
      <article className="max-w-prose mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">{postData.title}</h1>
          <div className="text-gray-500">
            <Date dateString={postData.date} />
          </div>
        </header>
        <div 
          className="prose prose-lg prose-blue max-w-none"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
        />
        <div className="mt-12 pt-6 border-t text-gray-500">
          <p>
            Thanks for reading! Want to discuss this post? 
            <a 
              href={`https://bsky.app/profile/hiremaga.com`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-1 text-blue-600 hover:underline"
            >
              Find me on Bluesky
            </a>.
          </p>
        </div>
      </article>
    </Layout>
  );
}