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
        <link rel="alternate" type="application/rss+xml" title="RSS Feed for Abhi Hiremagalur's Blog" href="/rss.xml" />
        <meta
          name="description"
          content="Reflections on leadership, technology, and the spaces in between - by Abhi Hiremagalur"
        />
        <meta name="og:title" content="Abhi Hiremagalur" />
      </Head>
      <header className="flex flex-col items-center mb-8">
        <Link href="/">
          <h1 className="text-4xl font-bold mb-2 hover:text-blue-600 cursor-pointer">Abhi Hiremagalur</h1>
        </Link>
        <p className="text-center text-gray-600 max-w-md mb-4">
          Exploring the interplay of technology, leadership, and human connection through reflective essays and practical insights
        </p>
        <div className="flex space-x-4 mb-6">
          <a href="https://bsky.app/profile/hiremaga.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700" title="Bluesky">
            <img src="/images/bluesky.svg" alt="Bluesky" className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/in/hiremaga/" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900" title="LinkedIn">
            <img src="/images/linkedin.svg" alt="LinkedIn" className="w-5 h-5" />
          </a>
          <a href="/rss.xml" title="RSS Feed" className="text-orange-500 hover:text-orange-700">
            <img src="/images/rss.svg" alt="RSS" className="w-5 h-5" />
          </a>
        </div>
      </header>

      <main>{children}</main>

      {!home && (
        <div className="mt-12">
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to home
          </Link>
        </div>
      )}

      <div className="mt-16 py-6 border-t border-b">
        <form 
          action="https://buttondown.email/api/emails/embed-subscribe/hiremaga"
          method="post"
          className="flex flex-col items-center embeddable-buttondown-form"
          onSubmit={() => {
            const btn = document.getElementById('subscribe-btn') as HTMLInputElement;
            if (btn) {
              btn.value = 'Subscribing...';
              btn.disabled = true;
              btn.classList.add('opacity-75');
            }
            return true;
          }}
        >
          <h3 className="text-xl font-medium mb-2">Subscribe to my newsletter</h3>
          <p className="text-gray-600 text-center mb-4">Get new posts delivered straight to your inbox.</p>
          
          <div className="flex w-full max-w-md">
            <input 
              type="email" 
              name="email"
              required
              placeholder="your@email.com" 
              className="flex-grow px-4 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
              id="subscribe-btn"
              type="submit" 
              value="Subscribe"
              className="px-4 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <input type="hidden" name="embed" value="1" />
          
          <p className="text-xs text-gray-500 mt-2">
            <a 
              href="https://buttondown.email" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-gray-700"
            >
              Powered by Buttondown
            </a>
          </p>
        </form>
      </div>

      <footer className="mt-8 pt-6 text-center text-gray-500">
        <p className="mb-2">© {new Date().getFullYear()} Abhi Hiremagalur</p>
        <div className="flex justify-center space-x-4">
          <a href="https://bsky.app/profile/hiremaga.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500">
            <span className="flex items-center">
              <img src="/images/bluesky.svg" alt="Bluesky" className="w-4 h-4 mr-1" />
              @hiremaga.com
            </span>
          </a>
          <span>•</span>
          <a href="https://www.linkedin.com/in/hiremaga/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-700">
            <span className="flex items-center">
              <img src="/images/linkedin.svg" alt="LinkedIn" className="w-4 h-4 mr-1" />
              LinkedIn
            </span>
          </a>
          <span>•</span>
          <a href="/rss.xml" className="text-gray-500 hover:text-orange-500">
            <span className="flex items-center">
              <img src="/images/rss.svg" alt="RSS" className="w-4 h-4 mr-1" />
              RSS
            </span>
          </a>
        </div>
      </footer>
    </div>
  );
}