import { site } from '@/lib/site';

/**
 * Email subscribe form, posting to Buttondown. Two sizes: `lg` for the home
 * follow surface, `sm` for the inline callout at the end of a post. The input
 * is always labelled; the button keeps a transparent border so it matches the
 * input's height exactly.
 */
export default function SubscribeForm({ size = 'lg' }: { size?: 'lg' | 'sm' }) {
  const large = size === 'lg';
  const input = large
    ? 'w-56 px-3.5 py-[11px] text-sm'
    : 'w-44 px-[13px] py-2.5 text-[13px]';
  const button = large
    ? 'px-5 py-[11px] text-sm'
    : 'px-[18px] py-2.5 text-[13px]';

  return (
    <form action={site.newsletterAction} method="post" className="flex gap-2">
      <input
        aria-label="Email address"
        type="email"
        name="email"
        required
        placeholder="you@example.com"
        className={`${input} rounded-control border border-input-bd bg-surface font-sans text-ink`}
      />
      <input type="hidden" name="embed" value="1" />
      <button
        type="submit"
        className={`${button} rounded-control border border-transparent bg-teal font-sans font-semibold text-on-teal transition-colors hover:bg-teal-hover`}
      >
        Subscribe
      </button>
    </form>
  );
}
