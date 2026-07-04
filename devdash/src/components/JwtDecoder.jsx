import React, { useState } from 'react';
import { Copy, AlertCircle } from 'lucide-react';

export default function JwtDecoder() {
  const [token, setToken] = useState('');
  const [decoded, setDecoded] = useState(null);
  const [error, setError] = useState(null);

  const decodeJwt = (input) => {
    setToken(input);
    if (!input.trim()) {
      setDecoded(null);
      setError(null);
      return;
    }
    
    try {
      const parts = input.split('.');
      if (parts.length !== 3) {
        throw new Error('JWT must have 3 parts (header, payload, signature)');
      }
      
      const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
      const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
      
      setDecoded({ header, payload, signature: parts[2] });
      setError(null);
    } catch (e) {
      setError('Invalid JWT format');
      setDecoded(null);
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 style={{ marginBottom: '16px' }}>JWT Decoder</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
        Decode JSON Web Tokens instantly. Processed completely client-side.
      </p>
      
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
        <h4 style={{ marginBottom: '12px' }}>Encoded Token</h4>
        <textarea 
          className="glass-input"
          style={{ minHeight: '120px', resize: 'vertical' }}
          placeholder="Paste JWT here..."
          value={token}
          onChange={(e) => decodeJwt(e.target.value)}
          spellCheck="false"
        />
        
        {error && (
          <div style={{ color: 'var(--error)', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px', padding: '12px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px' }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}
      </div>

      {decoded && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h4 style={{ marginBottom: '12px', color: '#f87171' }}>Header (Algorithm & Type)</h4>
            <pre className="glass-input" style={{ minHeight: '150px', whiteSpace: 'pre-wrap' }}>
              {JSON.stringify(decoded.header, null, 2)}
            </pre>
          </div>
          
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h4 style={{ marginBottom: '12px', color: '#c084fc' }}>Payload (Data)</h4>
            <pre className="glass-input" style={{ minHeight: '150px', whiteSpace: 'pre-wrap' }}>
              {JSON.stringify(decoded.payload, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
