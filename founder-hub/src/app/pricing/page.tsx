'use client';

import { useState } from 'react';

export default function Pricing() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
      });
      const data = await res.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Failed to start checkout. Please ensure you are logged in.');
      }
    } catch (err) {
      alert('An error occurred starting the checkout process.');
    }
    setLoading(false);
  };
  return (
    <div className="container">
      <div style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 800 }}>Simple, Transparent Pricing</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1.2rem', marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem auto' }}>
          Choose the plan that fits your business needs. Upgrade, downgrade, or cancel at any time.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
          
          {/* Free Plan */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', padding: '2.5rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Basic Profile</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>$0<span style={{ fontSize: '1rem', color: 'var(--muted)', fontWeight: 400 }}>/month</span></div>
            <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>Everything you need to get your business listed.</p>
            
            <ul style={{ listStyle: 'none', marginBottom: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: 'var(--primary)' }}>✓</span> Basic Business Profile
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: 'var(--primary)' }}>✓</span> Appear in Search Results
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: 'var(--primary)' }}>✓</span> Link to Website & Socials
              </li>
            </ul>
            
            <a href="/signup" className="btn btn-secondary" style={{ width: '100%', marginTop: '2.5rem', padding: '0.875rem' }}>Get Started for Free</a>
          </div>

          {/* Pro Plan */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', padding: '2.5rem', borderColor: 'var(--primary)', position: 'relative', zIndex: 1, boxShadow: '0 10px 30px -10px rgba(59, 130, 246, 0.3)' }}>
            <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'var(--primary)', color: 'white', padding: '4px 16px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold' }}>RECOMMENDED</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Pro Founder</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>$9<span style={{ fontSize: '1rem', color: 'var(--muted)', fontWeight: 400 }}>/month</span></div>
            <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>Stand out from the crowd and attract more customers.</p>
            
            <ul style={{ listStyle: 'none', marginBottom: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: 'var(--primary)' }}>✓</span> Everything in Basic
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: 'var(--primary)' }}>✓</span> <strong>Highlighted Profile Badge</strong>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: 'var(--primary)' }}>✓</span> Top of Category Search Results
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: 'var(--primary)' }}>✓</span> Basic Analytics & Impressions
              </li>
            </ul>
            
            <button 
              className="btn btn-primary" 
              onClick={handleCheckout} 
              disabled={loading}
              style={{ width: '100%', marginTop: '2.5rem', padding: '0.875rem', opacity: loading ? 0.7 : 1, cursor: loading ? 'wait' : 'pointer' }}
            >
              {loading ? 'Processing...' : 'Upgrade to Pro'}
            </button>
            <p style={{ fontSize: '0.75rem', textAlign: 'center', color: 'var(--muted)', marginTop: '1rem', marginBottom: 0 }}>Payments processed securely via Stripe</p>
          </div>

        </div>
      </div>
    </div>
  );
}
