'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ width: '100px', height: '36px', opacity: 0 }}></div>; // placeholder
  }

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      style={{
        padding: '0.4rem 0.75rem',
        borderRadius: '8px',
        backgroundColor: 'var(--card-bg)',
        color: 'var(--foreground)',
        border: '1px solid var(--border)',
        outline: 'none',
        cursor: 'pointer',
        fontSize: '0.9rem',
      }}
    >
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
}
