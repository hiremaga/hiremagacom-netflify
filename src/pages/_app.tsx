import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { fontVariables } from '@/lib/fonts';

/** The font CSS variables are applied once here so they cascade to every page. */
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={fontVariables}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}
