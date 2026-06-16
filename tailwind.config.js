/**
 * Tailwind is the consumption layer for the Ranges design system.
 *
 * Colours map to the CSS variables defined in src/styles/tokens.css, so a class
 * like `text-ink` or `bg-haze` automatically follows the active theme — there is
 * no need for `dark:` variants anywhere in the product. The non-colour scales
 * (spacing, radii, type, layout, elevation) do not change between themes and so
 * live here as the source of truth; the /design-system page documents them.
 *
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  // Theme is driven by [data-theme] on <html>; declared so any future `dark:`
  // utility still resolves correctly, though the variable colours make it moot.
  darkMode: ['selector', '[data-theme="dark"]'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    // Semantic colours only — every one is a token from tokens.css. Spacing uses
    // Tailwind's default 4px-based scale, which already matches the Ranges scale.
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      inherit: 'inherit',

      bg: 'var(--bg)',
      surface: 'var(--surface)',
      haze: 'var(--haze)',
      mist: 'var(--mist)',
      far: 'var(--far)',
      mid: 'var(--mid)',
      near: 'var(--near)',
      lead: 'var(--lead)',
      ink: 'var(--ink)',

      teal: { DEFAULT: 'var(--teal)', hover: 'var(--teal-hover)' },
      'on-teal': 'var(--on-teal)',

      horizon: {
        DEFAULT: 'var(--horizon)',
        text: 'var(--horizon-text)',
        fill: 'var(--horizon-fill)',
        glow: 'var(--horizon-glow)',
      },

      'row-hover': 'var(--row-hover)',
      'link-bd': 'var(--link-bd)',
      'input-bd': 'var(--input-bd)',
      'quote-bd': 'var(--quote-bd)',
      'quote-fg': 'var(--quote-fg)',
      divider: 'var(--divider)',

      'glyph-1': 'var(--glyph-1)',
      'glyph-2': 'var(--glyph-2)',
      'glyph-3': 'var(--glyph-3)',
      'motif-1': 'var(--motif-1)',
      'motif-2': 'var(--motif-2)',
      'motif-3': 'var(--motif-3)',
      'portrait-1': 'var(--portrait-1)',
      'portrait-2': 'var(--portrait-2)',
    },

    extend: {
      fontFamily: {
        // Newsreader carries the voice (display + reading). IBM Plex Sans is the
        // UI workhorse. Space Grotesk is reserved for design-system chrome only.
        serif: ['var(--font-newsreader)', 'Georgia', 'serif'],
        sans: ['var(--font-plex-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'ui-monospace', 'monospace'],
      },

      // Named steps from the type scale. Each bundles its line-height (and, where
      // it is intrinsic to the role, tracking/weight) so usage stays declarative.
      fontSize: {
        eyebrow: ['12px', { lineHeight: '1', letterSpacing: '0.14em', fontWeight: '600' }],
        meta: ['13px', { lineHeight: '1' }],
        ui: ['13px', { lineHeight: '1' }],
        body: ['19px', { lineHeight: '1.8' }],
        'list-title': ['21px', { lineHeight: '1.3' }],
        // Named `standfirst` (not `lead`) to avoid colliding with the `lead`
        // colour token — both would generate `.text-lead`.
        standfirst: ['21px', { lineHeight: '1.6' }],
        h1: ['32px', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        display: ['40px', { lineHeight: '1.12', letterSpacing: '-0.015em' }],
      },

      borderRadius: {
        tag: '6px',
        control: '8px',
        card: '12px',
        frame: '16px',
      },

      maxWidth: {
        measure: '600px', // reading measure — prose never runs wider
        about: '640px',   // narrower About frame
        frame: '760px',   // standard page frame
      },

      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,.06), 0 18px 44px -18px rgba(0,0,0,.28)',
      },

      letterSpacing: {
        label: '0.14em', // eyebrows / uppercase labels
      },
    },
  },
  plugins: [],
};
