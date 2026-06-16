import { type NavKey } from '@/lib/site';
import Masthead from './Masthead';
import SiteFooter from './SiteFooter';

/**
 * Page frame: a centred column holding the masthead, the page content, and the
 * footer. Reading pages use the 760px frame; About is narrower (640px); the
 * design system is wide. Horizontal gutters live on the regions (masthead,
 * main, footer row) so the footer ridge can run full-bleed.
 */
const widths = {
  frame: 'max-w-frame',
  about: 'max-w-about',
  wide: 'max-w-[1120px]',
} as const;

export default function Layout({
  active,
  width = 'frame',
  motif = true,
  children,
}: {
  active: NavKey;
  width?: keyof typeof widths;
  motif?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`mx-auto w-full ${widths[width]}`}>
      <Masthead active={active} />
      <main className="px-12">{children}</main>
      <SiteFooter motif={motif} />
    </div>
  );
}
