import Link from 'next/link';
import { site } from '@/lib/site';
import RangesGlyph from './RangesGlyph';

/** Glyph + wordmark, linking home. The wordmark is set in Newsreader. */
export default function BrandMark() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2.5 whitespace-nowrap font-serif text-xl font-semibold tracking-[-0.01em] text-ink no-underline"
    >
      <RangesGlyph />
      {site.name}
    </Link>
  );
}
