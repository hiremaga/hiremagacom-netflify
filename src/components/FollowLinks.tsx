import { follow } from '@/lib/site';

/**
 * The places to follow (Bluesky / LinkedIn / RSS). `tone` sets the resting
 * colour so the same list works in the bright "...or follow on" row and in the
 * quiet footer; both warm to teal on hover.
 */
const tones = {
  mid: 'text-mid hover:text-teal',
  far: 'text-far hover:text-teal',
  teal: 'text-teal hover:text-teal-hover',
} as const;

export default function FollowLinks({
  tone = 'mid',
  className = 'gap-4',
}: {
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <span className={`flex ${className}`}>
      {follow.map((place) => (
        <a
          key={place.label}
          href={place.href}
          {...(place.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className={`${tones[tone]} no-underline transition-colors`}
        >
          {place.label}
        </a>
      ))}
    </span>
  );
}
