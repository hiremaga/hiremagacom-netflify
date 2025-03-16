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

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribeStatus('loading');
    
    try {
      // Submit to ButtonDown API directly using their embed form endpoint
      const response = await fetch(
        'https://buttondown.email/api/emails/embed-subscribe/hiremaga',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        }
      );
      
      if (response.ok) {
        setSubscribeStatus('success');
        setEmail('');
        
        // Reset status after 3 seconds
        setTimeout(() => {
          setSubscribeStatus('idle');
        }, 3000);
      } else {
        setSubscribeStatus('error');
        // Reset status after 3 seconds
        setTimeout(() => {
          setSubscribeStatus('idle');
        }, 3000);
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setSubscribeStatus('error');
      // Reset status after 3 seconds
      setTimeout(() => {
        setSubscribeStatus('idle');
      }, 3000);
    }
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
          onSubmit={handleSubscribe} 
          className="flex flex-col items-center"
          data-buttondown-form
        >
          <h3 className="text-xl font-medium mb-2">Subscribe to my newsletter</h3>
          <p className="text-gray-600 text-center mb-4">Get new posts delivered straight to your inbox.</p>
          <div className="flex w-full max-w-md">
            <input 
              type="email" 
              name="email"
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
          {/* Hidden fields for Buttondown */}
          <input type="hidden" name="tag" value="website-signup" />
          <input type="hidden" name="embed" value="true" />
          <input type="hidden" name="referrer" value="website" />
          
          {subscribeStatus === 'success' && (
            <p className="text-green-600 mt-2">Thanks for subscribing! Please check your inbox to confirm.</p>
          )}
          {subscribeStatus === 'error' && (
            <p className="text-red-600 mt-2">
              There was an issue with your subscription. You might already be subscribed, 
              or please try again later.
            </p>
          )}
          
          <div className="text-xs text-gray-500 mt-2">
            <a 
              href="https://buttondown.email/refer/hiremaga" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-gray-700"
            >
              Powered by Buttondown
            </a>
          </div>
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