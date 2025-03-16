import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function Layout({ 
  children, 
  home 
}: { 
  children: React.ReactNode, 
  home?: boolean 
}) {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribeStatus('loading');
    
    // Redirect to ButtonDown subscribe page
    window.open(`https://buttondown.email/hiremaga?email=${encodeURIComponent(email)}`, '_blank');
    setSubscribeStatus('success');
    setEmail('');
    
    // Reset status after 3 seconds
    setTimeout(() => {
      setSubscribeStatus('idle');
    }, 3000);
  };

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
        <h1 className="text-4xl font-bold mb-2">Abhi Hiremagalur</h1>
        <p className="text-center text-gray-600 max-w-md mb-4">
          Exploring the interplay of technology, leadership, and human connection through reflective essays and practical insights
        </p>
        <div className="flex space-x-4 mb-6">
          <a href="https://bsky.app/profile/hiremaga.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700" title="Bluesky">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm0 1.5c4.557 0 8.25 3.693 8.25 8.25s-3.693 8.25-8.25 8.25-8.25-3.693-8.25-8.25S7.443 3.75 12 3.75zm-2.5 5.25a2.5 2.5 0 100 5 2.5 2.5 0 000-5zm5 0a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/hiremaga/" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900" title="LinkedIn">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="/rss.xml" title="RSS Feed" className="text-orange-500 hover:text-orange-700">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.18 15.64a2.18 2.18 0 0 1 0 4.36 2.18 2.18 0 0 1 0-4.36zM4 4.44A19.54 19.54 0 0 1 19.56 20h-2.83A16.73 16.73 0 0 0 4 7.27zm0 5.66a13.84 13.84 0 0 1 13.89 13.89h-2.83A11.08 11.08 0 0 0 4 13.18z"/>
            </svg>
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
        <form onSubmit={handleSubscribe} className="flex flex-col items-center">
          <h3 className="text-xl font-medium mb-2">Subscribe to my newsletter</h3>
          <p className="text-gray-600 text-center mb-4">Get new posts delivered straight to your inbox.</p>
          <div className="flex w-full max-w-md">
            <input 
              type="email" 
              value={email}
              onChange={handleEmailChange}
              required
              placeholder="your@email.com" 
              className="flex-grow px-4 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              type="submit" 
              disabled={subscribeStatus === 'loading'}
              className={`px-4 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${subscribeStatus === 'loading' ? 'opacity-75' : ''}`}
            >
              {subscribeStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
          {subscribeStatus === 'success' && (
            <p className="text-green-600 mt-2">Thanks for subscribing!</p>
          )}
          {subscribeStatus === 'error' && (
            <p className="text-red-600 mt-2">Something went wrong. Please try again.</p>
          )}
        </form>
      </div>

      <footer className="mt-8 pt-6 text-center text-gray-500">
        <p className="mb-2">© {new Date().getFullYear()} Abhi Hiremagalur</p>
        <div className="flex justify-center space-x-4">
          <a href="https://bsky.app/profile/hiremaga.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500">@hiremaga.com</a>
          <span>•</span>
          <a href="https://www.linkedin.com/in/hiremaga/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-700">LinkedIn</a>
          <span>•</span>
          <a href="/rss.xml" className="text-gray-500 hover:text-orange-500">RSS</a>
        </div>
      </footer>
    </div>
  );
}