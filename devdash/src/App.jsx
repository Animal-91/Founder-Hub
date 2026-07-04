import React, { useState } from 'react';
import JsonFormatter from './components/JsonFormatter';
import JwtDecoder from './components/JwtDecoder';
import Base64Tool from './components/Base64Tool';
import UrlEncoder from './components/UrlEncoder';
import ColorConverter from './components/ColorConverter';
import LoremGenerator from './components/LoremGenerator';
import MonetizationBanner from './components/MonetizationBanner';
import { Terminal, Key, Hash, Code2, Link, Palette, Type } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('json');

  const renderContent = () => {
    switch (activeTab) {
      case 'json': return <JsonFormatter />;
      case 'jwt': return <JwtDecoder />;
      case 'base64': return <Base64Tool />;
      case 'url': return <UrlEncoder />;
      case 'color': return <ColorConverter />;
      case 'lorem': return <LoremGenerator />;
      default: return <JsonFormatter />;
    }
  };

  return (
    <div className="container" style={{ display: 'flex', gap: '32px', minHeight: '100vh', padding: '24px' }}>
      
      {/* Sidebar Navigation */}
      <aside className="glass-panel" style={{ width: '280px', padding: '24px', display: 'flex', flexDirection: 'column', height: 'fit-content', position: 'sticky', top: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <div style={{ background: 'var(--accent-gradient)', padding: '8px', borderRadius: '12px', display: 'flex' }}>
            <Terminal size={24} color="white" />
          </div>
          <h1 className="text-gradient" style={{ margin: 0, fontSize: '24px' }}>DevDash</h1>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
          <div style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-secondary)', marginTop: '8px', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Data & Formatting
          </div>
          <button 
            className={`glass-button secondary ${activeTab === 'json' ? 'active' : ''}`}
            style={{ justifyContent: 'flex-start', background: activeTab === 'json' ? 'rgba(59, 130, 246, 0.2)' : '', border: activeTab === 'json' ? '1px solid rgba(59, 130, 246, 0.5)' : '' }}
            onClick={() => setActiveTab('json')}
          >
            <Code2 size={18} /> JSON Formatter
          </button>
          
          <div style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-secondary)', marginTop: '16px', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Encoding & Security
          </div>
          <button 
            className={`glass-button secondary ${activeTab === 'jwt' ? 'active' : ''}`}
            style={{ justifyContent: 'flex-start', background: activeTab === 'jwt' ? 'rgba(59, 130, 246, 0.2)' : '', border: activeTab === 'jwt' ? '1px solid rgba(59, 130, 246, 0.5)' : '' }}
            onClick={() => setActiveTab('jwt')}
          >
            <Key size={18} /> JWT Decoder
          </button>
          <button 
            className={`glass-button secondary ${activeTab === 'base64' ? 'active' : ''}`}
            style={{ justifyContent: 'flex-start', background: activeTab === 'base64' ? 'rgba(59, 130, 246, 0.2)' : '', border: activeTab === 'base64' ? '1px solid rgba(59, 130, 246, 0.5)' : '' }}
            onClick={() => setActiveTab('base64')}
          >
            <Hash size={18} /> Base64 Encode/Decode
          </button>
          <button 
            className={`glass-button secondary ${activeTab === 'url' ? 'active' : ''}`}
            style={{ justifyContent: 'flex-start', background: activeTab === 'url' ? 'rgba(59, 130, 246, 0.2)' : '', border: activeTab === 'url' ? '1px solid rgba(59, 130, 246, 0.5)' : '' }}
            onClick={() => setActiveTab('url')}
          >
            <Link size={18} /> URL Encoder
          </button>

          <div style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-secondary)', marginTop: '16px', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Design & Content
          </div>
          <button 
            className={`glass-button secondary ${activeTab === 'color' ? 'active' : ''}`}
            style={{ justifyContent: 'flex-start', background: activeTab === 'color' ? 'rgba(59, 130, 246, 0.2)' : '', border: activeTab === 'color' ? '1px solid rgba(59, 130, 246, 0.5)' : '' }}
            onClick={() => setActiveTab('color')}
          >
            <Palette size={18} /> Color Converter
          </button>
          <button 
            className={`glass-button secondary ${activeTab === 'lorem' ? 'active' : ''}`}
            style={{ justifyContent: 'flex-start', background: activeTab === 'lorem' ? 'rgba(59, 130, 246, 0.2)' : '', border: activeTab === 'lorem' ? '1px solid rgba(59, 130, 246, 0.5)' : '' }}
            onClick={() => setActiveTab('lorem')}
          >
            <Type size={18} /> Lorem Ipsum
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <div style={{ flexGrow: 1 }}>
          {renderContent()}
        </div>
        
        {/* Monetization / Sponsorship Footer */}
        <MonetizationBanner />
      </main>

    </div>
  );
}

export default App;
