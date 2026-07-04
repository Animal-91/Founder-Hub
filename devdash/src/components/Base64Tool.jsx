import React, { useState } from 'react';
import { ArrowDown, ArrowUp, Copy, AlertCircle } from 'lucide-react';

export default function Base64Tool() {
  const [text, setText] = useState('');
  const [base64, setBase64] = useState('');
  const [error, setError] = useState(null);

  const handleEncode = (val) => {
    setText(val);
    try {
      setBase64(btoa(val));
      setError(null);
    } catch (e) {
      setError('Cannot encode characters outside Latin1 range');
    }
  };

  const handleDecode = (val) => {
    setBase64(val);
    try {
      setText(atob(val));
      setError(null);
    } catch (e) {
      setError('Invalid Base64 string');
    }
  };

  const copyToClipboard = (content) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="animate-fade-in">
      <h2 style={{ marginBottom: '16px' }}>Base64 Encoder / Decoder</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
        Convert plain text to Base64 and vice-versa in real-time.
      </p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h4 style={{ margin: 0 }}>Plain Text</h4>
            <button className="glass-button secondary" style={{ padding: '4px 12px', fontSize: '12px' }} onClick={() => copyToClipboard(text)}>
              <Copy size={14} /> Copy
            </button>
          </div>
          <textarea 
            className="glass-input"
            style={{ minHeight: '120px', resize: 'vertical' }}
            placeholder="Type text to encode..."
            value={text}
            onChange={(e) => handleEncode(e.target.value)}
          />
        </div>
        
        <div className="flex-center">
          <div style={{ display: 'flex', gap: '16px', color: 'var(--accent-primary)' }}>
            <ArrowDown size={24} />
            <ArrowUp size={24} />
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h4 style={{ margin: 0 }}>Base64 Encoded</h4>
            <button className="glass-button secondary" style={{ padding: '4px 12px', fontSize: '12px' }} onClick={() => copyToClipboard(base64)}>
              <Copy size={14} /> Copy
            </button>
          </div>
          <textarea 
            className="glass-input"
            style={{ minHeight: '120px', resize: 'vertical' }}
            placeholder="Paste Base64 to decode..."
            value={base64}
            onChange={(e) => handleDecode(e.target.value)}
            spellCheck="false"
          />
        </div>
      </div>
      
      {error && (
        <div style={{ color: 'var(--error)', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '24px', padding: '12px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px' }}>
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
