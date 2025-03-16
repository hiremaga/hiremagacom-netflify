import Head from 'next/head';
import Link from 'next/link';

export default function Layout({ 
  children, 
  home 
}: { 
  children: React.ReactNode, 
  home?: boolean 
}) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Abhi Hiremagalur's personal blog"
        />
        <meta name="og:title" content="Abhi Hiremagalur" />
      </Head>
      <header className="flex flex-col items-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Abhi Hiremagalur</h1>
      </header>
      <main>{children}</main>
      {!home && (
        <div className="mt-12">
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to home
          </Link>
        </div>
      )}
      <footer className="mt-16 pt-6 border-t text-center text-gray-500">
        <p>© {new Date().getFullYear()} Abhi Hiremagalur</p>
      </footer>
    </div>
  );
}