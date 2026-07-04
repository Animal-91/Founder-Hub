import React from 'react';
import { Coffee, ExternalLink } from 'lucide-react';

export default function MonetizationBanner() {
  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '16px', marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(59, 130, 246, 0.1)' }}>
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
  );
}
