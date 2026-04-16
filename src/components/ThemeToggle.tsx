import { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(saved === 'dark' || (!saved && prefersDark));
  }, []);

  function handleChange(checked: boolean) {
    document.documentElement.classList.add('theme-transitioning');
    setIsDark(checked);
    document.documentElement.classList.toggle('dark', checked);
    localStorage.setItem('theme', checked ? 'dark' : 'light');
    window.setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
    }, 280);
  }

  if (!mounted) {
    return <span className="theme-switch-placeholder" aria-hidden="true" />;
  }

  return (
    <Switch
      checked={isDark}
      onChange={handleChange}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="theme-switch"
    >
      <span className="theme-switch-thumb" aria-hidden="true" />
    </Switch>
  );
}
