import React, { useState } from 'react';
import { Play, Copy, AlertCircle } from 'lucide-react';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed));
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(input);
  };

  return (
    <div className="animate-fade-in">
      <h2 style={{ marginBottom: '16px' }}>JSON Formatter & Validator</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
        Paste your JSON below to format, validate, or minify it. Completely client-side.
      </p>
      
      <div className="glass-panel" style={{ padding: '24px' }}>
        <textarea 
          className="glass-input"
          style={{ minHeight: '300px', resize: 'vertical', marginBottom: '16px' }}
          placeholder="Paste JSON here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck="false"
        />
        
        {error && (
          <div style={{ color: 'var(--error)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', padding: '12px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px' }}>
            <AlertCircle size={16} />
            <span>Invalid JSON: {error}</span>
          </div>
        )}
        
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button className="glass-button" onClick={formatJson}>
            <Play size={16} /> Format
          </button>
          <button className="glass-button secondary" onClick={minifyJson}>
            Minify
          </button>
          <div style={{ flexGrow: 1 }}></div>
          <button className="glass-button secondary" onClick={copyToClipboard}>
            <Copy size={16} /> Copy
          </button>
        </div>
      </div>
    </div>
  );
}
