import { useEffect, useState } from 'react';
import { THEME_STORAGE_KEY } from './ThemeScript';

/**
 * Segmented Light / Dark / Auto control. It writes the chosen preference to
 * localStorage and the resolved theme to `data-theme` on <html>; "Auto" follows
 * the OS via prefers-color-scheme and keeps following it live. First paint is
 * handled separately by ThemeScript, so there is no flash on load.
 */
type Preference = 'light' | 'dark' | 'system';

const options: ReadonlyArray<{ value: Preference; label: string; icon: React.ReactNode }> = [
  {
    value: 'light',
    label: 'Light',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
      </svg>
    ),
  },
  {
    value: 'dark',
    label: 'Dark',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>
    ),
  },
  {
    value: 'system',
    label: 'Auto',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
  },
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
      role="radiogroup"
      aria-label="Theme"
      className="inline-flex rounded-control border border-mist bg-surface p-0.5"
    >
      {options.map(({ value, label, icon }) => {
        const active = mounted && preference === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-label={label}
            aria-checked={active}
            onClick={() => choose(value)}
            className={`flex w-7 h-7 items-center justify-center rounded-md transition-colors duration-150 ${
              active ? 'bg-haze text-ink' : 'text-mid hover:text-ink'
            }`}
          >
            {icon}
          </button>
        );
      })}
    </div>
  );
}
