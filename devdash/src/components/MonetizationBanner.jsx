import React from 'react';
import { Coffee, ExternalLink } from 'lucide-react';

export default function MonetizationBanner() {
  // Place your Google AdSense or Carbon Ads script here
  // Example for AdSense:
  // <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
      {/* Advertising Slot */}
      <div className="glass-panel" style={{ padding: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(255, 255, 255, 0.02)', minHeight: '90px', border: '1px dashed rgba(255, 255, 255, 0.1)' }}>
        <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '13px' }}>
          <span style={{ display: 'block', marginBottom: '4px' }}>Advertisement</span>
          <em>Paste your Google AdSense or Carbon Ads snippet here</em>
        </div>
      </div>

      {/* Support / Affiliate Banner */}
      <div className="glass-panel animate-fade-in" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(59, 130, 246, 0.1)' }}>
        <div>
          <h4 style={{ margin: '0 0 4px 0', color: 'var(--text-primary)' }}>Support DevDash</h4>
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>If these free tools save you time, consider supporting the project!</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <a href="#" className="glass-button secondary" style={{ textDecoration: 'none', fontSize: '13px', padding: '8px 16px' }}>
            <ExternalLink size={16} /> Sponsored: Best VPS
          </a>
          <a href="#" className="glass-button" style={{ textDecoration: 'none', fontSize: '13px', padding: '8px 16px', background: '#FFDD00', color: '#000' }}>
            <Coffee size={16} /> Buy me a coffee
          </a>
        </div>
      </div>
    </div>
  );
}
