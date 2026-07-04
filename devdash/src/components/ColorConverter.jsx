import React, { useState, useEffect } from 'react';
import { Copy } from 'lucide-react';

export default function ColorConverter() {
  const [hex, setHex] = useState('#3b82f6');
  const [rgb, setRgb] = useState('rgb(59, 130, 246)');
  const [hsl, setHsl] = useState('hsl(217, 90%, 60%)');

  const hexToRgb = (h) => {
    let r = 0, g = 0, b = 0;
    if (h.length === 4) {
      r = parseInt(h[1] + h[1], 16);
      g = parseInt(h[2] + h[2], 16);
      b = parseInt(h[3] + h[3], 16);
    } else if (h.length === 7) {
      r = parseInt(h.substring(1, 3), 16);
      g = parseInt(h.substring(3, 5), 16);
      b = parseInt(h.substring(5, 7), 16);
    }
    return `rgb(${r}, ${g}, ${b})`;
  };

  const rgbToHsl = (r, g, b) => {
    r /= 255; g /= 255; b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: break;
      }
      h /= 6;
    }
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  const handleHexChange = (e) => {
    let val = e.target.value;
    if (!val.startsWith('#')) val = '#' + val;
    setHex(val);
    
    if (/^#[0-9A-Fa-f]{3}$|^#[0-9A-Fa-f]{6}$/.test(val)) {
      const rgbStr = hexToRgb(val);
      setRgb(rgbStr);
      
      const rgbMatch = rgbStr.match(/\d+/g);
      if (rgbMatch) {
        setHsl(rgbToHsl(parseInt(rgbMatch[0]), parseInt(rgbMatch[1]), parseInt(rgbMatch[2])));
      }
    }
  };

  const copyToClipboard = (content) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="animate-fade-in">
      <h2 style={{ marginBottom: '16px' }}>Color Converter</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
        Convert colors between HEX, RGB, and HSL formats instantly.
      </p>
      
      <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
        
        {/* Color Preview */}
        <div 
          style={{ 
            width: '120px', 
            height: '120px', 
            borderRadius: '50%', 
            backgroundColor: hex,
            boxShadow: `0 0 40px ${hex}80`,
            border: '2px solid rgba(255,255,255,0.2)',
            transition: 'background-color 0.3s ease, box-shadow 0.3s ease'
          }} 
        />

        <div style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>HEX</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="text" 
                className="glass-input" 
                value={hex} 
                onChange={handleHexChange}
                maxLength={7}
              />
              <button className="glass-button secondary" onClick={() => copyToClipboard(hex)}><Copy size={16}/></button>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>RGB</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input type="text" className="glass-input" value={rgb} readOnly style={{ color: 'var(--text-secondary)' }} />
              <button className="glass-button secondary" onClick={() => copyToClipboard(rgb)}><Copy size={16}/></button>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>HSL</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input type="text" className="glass-input" value={hsl} readOnly style={{ color: 'var(--text-secondary)' }} />
              <button className="glass-button secondary" onClick={() => copyToClipboard(hsl)}><Copy size={16}/></button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
