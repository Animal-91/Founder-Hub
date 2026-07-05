import React from 'react';
import { Coffee, ExternalLink } from 'lucide-react';

export default function MonetizationBanner() {
  // ==========================================
  // 💰 MONETIZATION CONFIGURATION
  // ==========================================
  
  // 1. Your Affiliate Link (e.g., DigitalOcean, Vultr, Namecheap)
  const AFFILIATE_LINK = "https://m.do.co/c/YOUR_REFERRAL_CODE"; 
  
  // 2. Your 'Buy Me A Coffee' or Ko-fi Link
  const DONATION_LINK = "https://buymeacoffee.com/YOUR_USERNAME";

  // 3. Google AdSense Client ID (Looks like: ca-pub-1234567890123456)
  // Leave this blank to show the placeholder in development.
  const ADSENSE_CLIENT_ID = "";
  
  // ==========================================

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
      {/* Advertising Slot */}
      {ADSENSE_CLIENT_ID ? (
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', justifyContent: 'center', background: 'rgba(255, 255, 255, 0.02)' }}>
           {/* Actual AdSense Script Injection */}
           <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`} crossOrigin="anonymous"></script>
           <ins className="adsbygoogle"
                style={{ display: 'block', width: '100%', height: '90px' }}
                data-ad-client={ADSENSE_CLIENT_ID}
                data-ad-slot="YOUR_AD_SLOT_ID"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
           <script>
                (adsbygoogle = window.adsbygoogle || []).push({});
           </script>
        </div>
      ) : (
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(255, 255, 255, 0.02)', minHeight: '90px', border: '1px dashed rgba(255, 255, 255, 0.1)' }}>
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '13px' }}>
            <span style={{ display: 'block', marginBottom: '4px' }}>Advertisement Slot</span>
            <em>Waiting for AdSense Client ID...</em>
          </div>
        </div>
      )}

      {/* Support / Affiliate Banner */}
      <div className="glass-panel animate-fade-in" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(59, 130, 246, 0.1)' }}>
        <div>
          <h4 style={{ margin: '0 0 4px 0', color: 'var(--text-primary)' }}>Support DevDash</h4>
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>If these free tools save you time, consider supporting the project!</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <a href={AFFILIATE_LINK} target="_blank" rel="noopener noreferrer" className="glass-button secondary" style={{ textDecoration: 'none', fontSize: '13px', padding: '8px 16px' }}>
            <ExternalLink size={16} /> Sponsored: Best VPS
          </a>
          <a href={DONATION_LINK} target="_blank" rel="noopener noreferrer" className="glass-button" style={{ textDecoration: 'none', fontSize: '13px', padding: '8px 16px', background: '#FFDD00', color: '#000' }}>
            <Coffee size={16} /> Buy me a coffee
          </a>
        </div>
      </div>
    </div>
  );
}
