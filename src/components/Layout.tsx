import { type NavKey } from '@/lib/site';
import Masthead from './Masthead';
import SiteFooter from './SiteFooter';

export default function Layout({
  active,
  motif = true,
  children,
}: {
  active: NavKey;
  motif?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-frame">
      <Masthead active={active} />
      <main className="px-12">{children}</main>
      <SiteFooter motif={motif} />
    </div>
  );
}
