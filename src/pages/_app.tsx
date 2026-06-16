import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { fontVariables } from '@/lib/fonts';

/** The font CSS variables are applied once here so they cascade to every page. */
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={fontVariables}>
      <Component {...pageProps} />
    </div>
  );
}
