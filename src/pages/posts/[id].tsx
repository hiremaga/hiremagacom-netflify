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
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className="text-3xl font-bold">{postData.title}</h1>
        <div className="text-gray-500 mb-6">
          <Date dateString={postData.date} />
        </div>
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
        />
      </article>
    </Layout>
  );
}