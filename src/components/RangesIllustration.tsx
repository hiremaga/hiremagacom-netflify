/**
 * The brand metaphor as a literal picture: ranges fading from near & deep to
 * far & hazy, with one alpenglow ridge — the same horizon accent used on the
 * "New" marker. This is a fixed illustration (it depicts the light), so its
 * colours are intentionally literal rather than themed. Decorative only.
 */
const layers: ReadonlyArray<{ fill: string; clip: string; lit?: boolean }> = [
  { fill: '#cfe3e0', clip: 'polygon(0 38%,14% 30%,30% 37%,46% 27%,64% 35%,80% 28%,92% 33%,100% 29%,100% 100%,0 100%)' },
  { fill: '#aed3d2', clip: 'polygon(0 50%,16% 43%,34% 50%,52% 42%,70% 50%,86% 44%,100% 49%,100% 100%,0 100%)' },
  { fill: '#88bcbd', clip: 'polygon(0 62%,20% 56%,40% 62%,58% 55%,76% 62%,100% 58%,100% 100%,0 100%)' },
  { fill: '#db4f8a', clip: 'polygon(0 73%,24% 67%,48% 73%,72% 66%,100% 72%,100% 100%,0 100%)', lit: true },
  { fill: '#5f9a9e', clip: 'polygon(0 73%,24% 67%,48% 73%,72% 66%,100% 72%,100% 100%,0 100%)' },
  { fill: '#3f7d82', clip: 'polygon(0 83%,30% 78%,56% 83%,82% 77%,100% 82%,100% 100%,0 100%)' },
  { fill: '#2a5f64', clip: 'polygon(0 92%,34% 88%,60% 92%,84% 87%,100% 91%,100% 100%,0 100%)' },
];

export default function RangesIllustration({ caption }: { caption?: string }) {
  return (
    <div
      aria-hidden
      className="relative h-[280px] w-full overflow-hidden rounded-[14px]"
      style={{ background: 'linear-gradient(180deg,#f7e0ea 0%,#efe7ec 32%,#e8efe7 55%)' }}
    >
      {/* The sun, low on the horizon. */}
      <div
        className="absolute -top-[50px] right-[14%] h-[200px] w-[200px] rounded-full"
        style={{ background: 'radial-gradient(circle,rgba(255,196,216,0.9),rgba(255,196,216,0) 70%)' }}
      />
      {layers.map((layer, index) => (
        <div
          key={index}
          className="absolute inset-0"
          style={{
            background: layer.fill,
            clipPath: layer.clip,
            ...(layer.lit
              ? { top: '-3px', filter: 'drop-shadow(0 0 6px rgba(219,79,138,0.85))' }
              : {}),
          }}
        />
      ))}
      {caption && (
        <div className="absolute bottom-4 left-[18px] font-mono text-[11px] tracking-[0.06em] text-white/85">
          {caption}
        </div>
      )}
    </div>
  );
}
