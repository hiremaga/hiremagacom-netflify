import { site } from '@/lib/site';
import FollowLinks from './FollowLinks';

/**
 * The footer ridge: a whisper-low ranges silhouette with one faint horizon line
 * — the lit ridge — as the brand signature. Purely decorative, so it is hidden
 * from assistive tech. The polygons are hand-authored, hence the inline
 * clip-paths; every fill is still a token.
 */
function RidgeMotif() {
  return (
    <div aria-hidden className="relative h-[54px] overflow-hidden border-t border-mist">
      <div
        className="absolute inset-0 bg-motif-1"
        style={{ clipPath: 'polygon(0 55%,18% 42%,36% 52%,54% 40%,72% 50%,88% 42%,100% 48%,100% 100%,0 100%)' }}
      />
      <div
        className="absolute inset-0 bg-motif-2"
        style={{ clipPath: 'polygon(0 70%,22% 60%,44% 68%,64% 58%,82% 66%,100% 60%,100% 100%,0 100%)' }}
      />
      <div
        className="absolute inset-0 -top-0.5 bg-horizon opacity-[0.55]"
        style={{ clipPath: 'polygon(0 84%,28% 77%,52% 83%,76% 76%,100% 81%,100% 100%,0 100%)' }}
      />
      <div
        className="absolute inset-0 bg-motif-3"
        style={{ clipPath: 'polygon(0 84%,28% 77%,52% 83%,76% 76%,100% 81%,100% 100%,0 100%)' }}
      />
    </div>
  );
}

export default function SiteFooter({ motif = true }: { motif?: boolean }) {
  return (
    <footer className="mt-11">
      {motif && <RidgeMotif />}
      <div className="flex flex-wrap items-center justify-between gap-3 px-12 pb-10 pt-[18px] font-sans text-meta text-far">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <FollowLinks tone="far" />
      </div>
    </footer>
  );
}
