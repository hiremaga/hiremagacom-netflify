import SubscribeForm from './SubscribeForm';

/**
 * Contextual subscribe CTA on a haze fill — reused at the end of posts. A
 * gentle nudge, never a stark detached newsletter box.
 */
export default function SubscribeCallout() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-card bg-haze px-6 py-5">
      <p className="font-sans text-[15px] font-medium text-near">Get new essays by email.</p>
      <SubscribeForm size="sm" />
    </div>
  );
}
