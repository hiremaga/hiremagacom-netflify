/**
 * Renders a tiny synchronous script into <head> that resolves the reader's
 * saved theme preference into a concrete `data-theme` on <html> BEFORE the
 * page paints, so there is never a flash of the wrong theme.
 *
 * It must stay dependency-free and inline — it runs before the bundle loads.
 * The matching key/values are owned by ThemeToggle.
 */
export const THEME_STORAGE_KEY = 'theme';

const script = `(function(){try{
  var p = localStorage.getItem('${THEME_STORAGE_KEY}');
  var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var dark = p === 'dark' || ((p === 'system' || !p) && systemDark);
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
}catch(e){}})();`;

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
