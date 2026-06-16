import { useEffect, useState } from 'react';
import { THEME_STORAGE_KEY } from './ThemeScript';

/**
 * Segmented Light / Dark / Auto control. It writes the chosen preference to
 * localStorage and the resolved theme to `data-theme` on <html>; "Auto" follows
 * the OS via prefers-color-scheme and keeps following it live. First paint is
 * handled separately by ThemeScript, so there is no flash on load.
 */
type Preference = 'light' | 'dark' | 'system';

const options: ReadonlyArray<{ value: Preference; label: string }> = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'Auto' },
];

function resolve(preference: Preference): 'light' | 'dark' {
  if (preference !== 'system') return preference;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(preference: Preference) {
  document.documentElement.setAttribute('data-theme', resolve(preference));
}

export default function ThemeToggle() {
  const [preference, setPreference] = useState<Preference>('system');
  // Active styling depends on localStorage, which is client-only; gate it until
  // after mount so server and first client render produce identical markup.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as Preference | null;
    if (saved) setPreference(saved);
    setMounted(true);
  }, []);

  // While on "Auto", track OS theme changes live.
  useEffect(() => {
    if (preference !== 'system') return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => applyTheme('system');
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [preference]);

  function choose(next: Preference) {
    setPreference(next);
    localStorage.setItem(THEME_STORAGE_KEY, next);
    applyTheme(next);
  }

  return (
    <div
      role="group"
      aria-label="Theme"
      className="inline-flex rounded-control border border-mist bg-surface p-0.5"
    >
      {options.map(({ value, label }) => {
        const active = mounted && preference === value;
        return (
          <button
            key={value}
            type="button"
            aria-pressed={active}
            onClick={() => choose(value)}
            className={`rounded-md px-2.5 py-1.5 font-sans text-xs font-medium leading-none transition-colors ${
              active ? 'bg-haze text-ink' : 'text-mid hover:text-ink'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
