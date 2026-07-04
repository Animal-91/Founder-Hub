import React, { useState } from 'react';
import { Copy, RefreshCw } from 'lucide-react';

export default function LoremGenerator() {
  const [paragraphs, setParagraphs] = useState(3);
  const [text, setText] = useState('');

  const generateLorem = () => {
    const loremWords = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'ut', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi', 'ut', 'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure', 'dolor', 'in', 'reprehenderit', 'in', 'voluptate', 'velit', 'esse', 'cillum', 'dolore', 'eu', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'in', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'];
    
    let result = '';
    for (let p = 0; p < paragraphs; p++) {
      let sentenceCount = Math.floor(Math.random() * 4) + 4; // 4 to 7 sentences per paragraph
      let paragraph = '';
      
      for (let s = 0; s < sentenceCount; s++) {
        let wordCount = Math.floor(Math.random() * 8) + 5; // 5 to 12 words per sentence
        let sentence = '';
        
        for (let w = 0; w < wordCount; w++) {
          let word = loremWords[Math.floor(Math.random() * loremWords.length)];
          if (w === 0) word = word.charAt(0).toUpperCase() + word.slice(1);
          sentence += word + (w === wordCount - 1 ? '.' : ' ');
        }
        paragraph += sentence + ' ';
      }
      result += paragraph.trim() + '\n\n';
    }
    
    // Always start first paragraph with "Lorem ipsum" if requested, but let's keep it random for fun, or we can hardcode the start.
    if (result.length > 0 && !result.toLowerCase().startsWith('lorem ipsum')) {
      result = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' + result;
    }
    
    setText(result.trim());
  };

  // Generate on first load
  React.useEffect(() => {
    generateLorem();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="animate-fade-in">
      <h2 style={{ marginBottom: '16px' }}>Lorem Ipsum Generator</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
        Generate dummy text for your wireframes and designs.
      </p>
      
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <label style={{ fontSize: '14px' }}>Paragraphs:</label>
            <input 
              type="number" 
              className="glass-input" 
              style={{ width: '80px', padding: '8px' }}
              min="1" 
              max="20" 
              value={paragraphs} 
              onChange={(e) => setParagraphs(Math.min(20, Math.max(1, parseInt(e.target.value) || 1)))}
            />
          </div>
          
          <button className="glass-button" onClick={generateLorem}>
            <RefreshCw size={16} /> Generate
          </button>
          
          <div style={{ flexGrow: 1 }}></div>
          
          <button className="glass-button secondary" onClick={copyToClipboard}>
            <Copy size={16} /> Copy Text
          </button>
        </div>
        
        <textarea 
          className="glass-input"
          style={{ minHeight: '300px', resize: 'vertical', lineHeight: '1.6' }}
          value={text}
          readOnly
        />
      </div>
    </div>
  );
}
