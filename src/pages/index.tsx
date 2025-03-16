import Head from 'next/head';
import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';
import Layout from '@/components/layout';
import Date from '@/components/date';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};

type Post = {
  id: string;
  date: string;
  title: string;
};

export default function Home({ 
  allPostsData 
}: { 
  allPostsData: Post[]
}) {
  return (
    <Layout home>
      <Head>
        <title>Abhi Hiremagalur</title>
      </Head>
      <section className="py-6">
        <h2 className="text-2xl font-bold mb-6">All Posts</h2>
        <div className="grid gap-6">
          {allPostsData.map(({ id, date, title }) => (
            <article key={id} className="border-b pb-5">
              <Link 
                href={`/posts/${id}`} 
                className="block group"
              >
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  {title}
                </h3>
                <div className="text-gray-500 text-sm mb-3">
                  <Date dateString={date} />
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}