import { Html, Head, Main, NextScript } from 'next/document';
import ThemeScript from '@/components/ThemeScript';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Abhi Hiremagalur — RSS"
          href="/rss.xml"
        />
      </Head>
      <body>
        {/* Runs before paint to set the theme and avoid a flash of wrong colours. */}
        <ThemeScript />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
