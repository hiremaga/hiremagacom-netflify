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
      <section className="text-xl py-px-4">
        <p>Hello, I'm <strong>Abhi Hiremagalur</strong>. This is my public journal.</p>
      </section>
      <section className="py-5">
        <ul className="space-y-4">
          {allPostsData.map(({ id, date, title }) => (
            <li key={id} className="border-b pb-2">
              <Link href={`/posts/${id}`} className="text-lg font-medium hover:underline">
                {title}
              </Link>
              <br />
              <small className="text-gray-500">
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}