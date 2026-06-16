import Link from 'next/link';
import { nav, type NavKey } from '@/lib/site';
import BrandMark from './BrandMark';
import ThemeToggle from './ThemeToggle';

/**
 * The shared masthead: brand on the left; navigation and the theme utility on
 * the right, split from the nav by a hairline. Interactive items reserve equal
 * height (transparent borders) so active states never shift the layout.
 */
export default function Masthead({ active }: { active: NavKey }) {
  return (
    <header className="px-12 pt-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-mist pb-6">
        <BrandMark />
        <div className="flex flex-wrap items-center gap-4">
          <nav className="flex gap-6 font-sans text-ui font-medium">
            {nav.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                aria-current={item.key === active ? 'page' : undefined}
                className={`border-b-[1.5px] pb-1 no-underline transition-colors ${
                  item.key === active
                    ? 'border-teal text-ink'
                    : 'border-transparent text-mid hover:text-teal'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <span aria-hidden className="h-4 w-px flex-none bg-mist" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
