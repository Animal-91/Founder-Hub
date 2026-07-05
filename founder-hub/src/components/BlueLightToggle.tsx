'use client';

import { useState, useEffect } from 'react';

export default function BlueLightToggle() {
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('blue-light-filter');
    if (saved === 'true') {
      setEnabled(true);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    if (enabled) {
      localStorage.setItem('blue-light-filter', 'true');
      let overlay = document.getElementById('blue-light-overlay');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'blue-light-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.pointerEvents = 'none';
        overlay.style.zIndex = '999999';
        // A standard blue-light filter overlay (warm orange/amber tint)
        overlay.style.backgroundColor = 'rgba(255, 147, 41, 0.2)'; 
        overlay.style.mixBlendMode = 'multiply';
        document.body.appendChild(overlay);
      }
    } else {
      localStorage.setItem('blue-light-filter', 'false');
      const overlay = document.getElementById('blue-light-overlay');
      if (overlay) {
        overlay.remove();
      }
    }
  }, [enabled, mounted]);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setEnabled(!enabled)}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1.2rem',
        padding: '0.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: enabled ? '#f59e0b' : 'var(--muted)',
        transition: 'color 0.2s ease'
      }}
      title={enabled ? "Turn off blue light filter" : "Turn on blue light filter"}
      aria-label="Toggle blue light filter"
    >
      {enabled ? '👓' : '🕶️'}
    </button>
  );
}
