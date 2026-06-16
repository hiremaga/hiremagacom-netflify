/**
 * The Ranges catalog — the data behind /design-system.
 *
 * Colour *values* are not duplicated here; the design-system page reads them
 * live from the CSS variables so the documentation can never drift from
 * tokens.css. What lives here is the *meaning*: which tokens exist and the role
 * each one plays, plus the scales and the rules that hold the system together.
 */

/** Implementation notes for whoever builds on this next — human or LLM. */
export const implementationNotes: ReadonlyArray<string> = [
  'Source of truth. Colour tokens live in src/styles/tokens.css as CSS variables; the non-colour scales (spacing, radii, type, layout, elevation) live in tailwind.config.js. Consume them as semantic utilities (bg-haze, text-ink, rounded-card, max-w-measure) — never hard-code a hex or a magic number.',
  'Theming. Light is the default; dark applies to anything under [data-theme="dark"]. ThemeScript resolves the saved preference before first paint to avoid a flash; ThemeToggle persists the choice and "Auto" follows the OS live. Because every colour is a variable, no dark: variants are needed anywhere.',
  'The "ranges" logic. The whole neutral ramp is one teal hue faded by lightness and saturation (atmospheric perspective). Pick neutrals only from the ladder below (bg → ink); never introduce an off-hue grey.',
  'Accent rule. teal is the everyday interactive accent (links, buttons, active nav). horizon is "the light": used at most once per view, on the single freshest or most important thing (the New marker), and echoed as the lit ridge in the footer. Never put horizon on categories, multiples, or decoration.',
  'Reading measure. Body copy is capped at max-w-measure (600px, ~66–72 characters). Prose never runs the full content width.',
  'Accessibility. Keep the :focus-visible ring (2px teal), label every input, and keep aria-pressed on the theme segments. The ladder pairings are chosen to meet contrast.',
];

/** The neutral ladder plus the two accents, far haze → near ridge → the light. */
export const ladder: ReadonlyArray<{ token: string; role: string }> = [
  { token: 'bg', role: 'page · far haze' },
  { token: 'surface', role: 'raised' },
  { token: 'haze', role: 'subtle fill' },
  { token: 'mist', role: 'hairline' },
  { token: 'far', role: 'faint · meta' },
  { token: 'mid', role: 'secondary' },
  { token: 'near', role: 'body' },
  { token: 'lead', role: 'lead' },
  { token: 'ink', role: 'headings' },
  { token: 'teal', role: 'accent' },
  { token: 'horizon', role: 'the light' },
];

/** A row of the type scale: the live sample, the classes that produce it, the spec. */
export const typeScale: ReadonlyArray<{ sample: string; className: string; spec: string }> = [
  { sample: 'The First Two Weeks', className: 'font-serif text-display font-semibold text-ink', spec: 'Display · Newsreader 40/1.12 · 600 · -0.015em · post titles' },
  { sample: 'About', className: 'font-serif text-h1 font-semibold text-ink', spec: 'H1 · Newsreader 32/1.15 · 600 · page titles' },
  { sample: 'A season of open-ended exploration.', className: 'font-serif text-standfirst text-lead', spec: 'Lead · Newsreader 21/1.6 · 400 · standfirst' },
  { sample: 'The Athletic Position', className: 'font-serif text-list-title font-medium text-ink', spec: 'List title · Newsreader 21/1.3 · 500' },
  { sample: 'Body copy in Newsreader at a comfortable reading measure.', className: 'font-serif text-body text-near', spec: 'Body · Newsreader 19/1.8 · 400 · ≤600px' },
  { sample: 'Writing · About · Subscribe', className: 'font-sans text-ui font-medium text-near', spec: 'UI / nav · Plex Sans 13 · 500' },
  { sample: 'All writing', className: 'font-sans text-eyebrow uppercase text-far', spec: 'Eyebrow · Plex Sans 12 · 600 · .14em · upper' },
  { sample: 'May 31, 2026', className: 'font-sans text-meta text-mid', spec: 'Meta · Plex Sans 13 · 400' },
];

/** Spacing scale (px), 4px base. */
export const spacing: ReadonlyArray<number> = [4, 8, 12, 16, 20, 24, 32, 40, 48, 64];

/** Radii, smaller for inline, larger for surfaces. */
export const radii: ReadonlyArray<{ name: string; className: string; px: number }> = [
  { name: 'tag', className: 'rounded-tag', px: 6 },
  { name: 'control', className: 'rounded-control', px: 8 },
  { name: 'card', className: 'rounded-card', px: 12 },
  { name: 'frame', className: 'rounded-frame', px: 16 },
];

/** Layout rules, shown as a two-column reference. */
export const layoutRules: ReadonlyArray<{ title: string; body: string }> = [
  { title: 'Page frame', body: 'Reading pages use a 760px frame; About is narrower at 640px; the design system is wide. A 48px gutter pads the masthead, content, and footer row.' },
  { title: 'Reading measure', body: 'Prose is capped at 600px inside the frame — never full width.' },
  { title: 'Vertical rhythm', body: '40px between major sections, 24px between paragraphs; everything snaps to the 4px scale.' },
  { title: 'Masthead', body: 'One row in three zones — brand (left), nav (right), utility (far right) — split by a hairline. Interactive items reserve equal heights so active states never shift the layout.' },
  { title: 'Engagement', body: 'Subscribe and social sit together as one follow surface ("…or follow on"), not an orphaned newsletter box.' },
  { title: 'Footer ridge', body: 'A whisper-low ranges motif with a single faint horizon line — the brand signature, kept subtle.' },
];
