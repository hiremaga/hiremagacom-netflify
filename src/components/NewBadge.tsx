/**
 * The "New" marker — the one use of horizon ("the light") in a view. A faint
 * warm wash and halo around the single freshest item; never used on more than
 * one thing per screen.
 */
export default function NewBadge() {
  return (
    <span
      className="-translate-y-px rounded-tag border border-horizon bg-horizon-fill px-[7px] py-[3px] font-sans text-[10px] font-semibold uppercase leading-none tracking-[0.1em] text-horizon-text"
      style={{ boxShadow: '0 0 10px var(--horizon-glow)' }}
    >
      New
    </span>
  );
}
