/**
 * The "ranges" brand glyph: three teal bands fading from far (light) to near
 * (deep), the palette idea in miniature. Sized to roughly cap height and nudged
 * up a pixel so it sits optically on the wordmark's cap line.
 */
export default function RangesGlyph({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`flex h-3.5 w-3.5 -translate-y-px flex-col overflow-hidden rounded ${className}`}
    >
      <span className="flex-1 bg-glyph-1" />
      <span className="flex-1 bg-glyph-2" />
      <span className="flex-1 bg-glyph-3" />
    </span>
  );
}
