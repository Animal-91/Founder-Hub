'use client';

import { useState } from 'react';
import { updateProfile } from '@/app/actions/auth';
import { createClient } from '@/utils/supabase/client';

export default function DashboardForm({ profile }: { profile: any }) {
  const supabase = createClient();
  const [services, setServices] = useState<any[]>(profile.services || []);
  const [portfolio, setPortfolio] = useState<string[]>(profile.portfolio || []);
  const [loading, setLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState(profile.logo_url);
  const [coverPreview, setCoverPreview] = useState(profile.cover_url);
  const [backgroundPreview, setBackgroundPreview] = useState(profile.background_image_url);
  const [youtubeInput, setYoutubeInput] = useState(profile.youtube_video_id ? `https://youtube.com/watch?v=${profile.youtube_video_id}` : '');
  const [themeColor, setThemeColor] = useState(profile.theme_color || '#2563eb');

  const addService = () => setServices([...services, { id: Date.now(), name: '', price: '', description: '' }]);
  const removeService = (id: number) => setServices(services.filter(s => s.id !== id));
  
  const updateService = (id: number, field: string, value: string) => {
    setServices(services.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [backgroundFile, setBackgroundFile] = useState<File | null>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
      setLogoPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverFile(e.target.files[0]);
      setCoverPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBackgroundFile(e.target.files[0]);
      setBackgroundPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handlePortfolioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setLoading(true);
    
    const newUrls: string[] = [];
    for (const file of files) {
      const ext = file.name.split('.').pop();
      const filePath = `${profile.id}/portfolio-${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
      const { data, error } = await supabase.storage.from('business-images').upload(filePath, file);
      if (error) {
        console.error("Portfolio upload error:", error);
        alert(`Failed to upload ${file.name}: ${error.message}`);
      } else if (data) {
        const url = supabase.storage.from('business-images').getPublicUrl(filePath).data.publicUrl;
        newUrls.push(url);
      }
    }
    
    setPortfolio(prev => [...prev, ...newUrls]);
    setLoading(false);
  };

  const removePortfolioImage = (urlToRemove: string) => {
    setPortfolio(portfolio.filter(url => url !== urlToRemove));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    let currentLogoUrl = profile.logo_url;
    let currentCoverUrl = profile.cover_url;
    let currentBackgroundUrl = profile.background_image_url;

    if (logoFile) {
      const ext = logoFile.name.split('.').pop();
      const filePath = `${profile.id}/logo-${Date.now()}.${ext}`;
      const { data, error } = await supabase.storage.from('business-images').upload(filePath, logoFile);
      if (error) {
        console.error("Logo upload error:", error);
        alert(`Logo upload failed: ${error.message}`);
      }
      if (data) {
        currentLogoUrl = supabase.storage.from('business-images').getPublicUrl(filePath).data.publicUrl;
      }
    }

    if (coverFile) {
      const ext = coverFile.name.split('.').pop();
      const filePath = `${profile.id}/cover-${Date.now()}.${ext}`;
      const { data, error } = await supabase.storage.from('business-images').upload(filePath, coverFile);
      if (error) {
        console.error("Cover upload error:", error);
        alert(`Cover photo upload failed: ${error.message}`);
      }
      if (data) {
        currentCoverUrl = supabase.storage.from('business-images').getPublicUrl(filePath).data.publicUrl;
      }
    }

    if (backgroundFile) {
      const ext = backgroundFile.name.split('.').pop();
      const filePath = `${profile.id}/background-${Date.now()}.${ext}`;
      const { data, error } = await supabase.storage.from('business-images').upload(filePath, backgroundFile);
      if (error) {
        console.error("Background upload error:", error);
        alert(`Background image upload failed: ${error.message}`);
      }
      if (data) {
        currentBackgroundUrl = supabase.storage.from('business-images').getPublicUrl(filePath).data.publicUrl;
      }
    }

    // Parse YouTube URL to ID
    let youtubeVideoId = '';
    if (youtubeInput) {
      try {
        const url = new URL(youtubeInput);
        if (url.hostname.includes('youtube.com')) {
          youtubeVideoId = url.searchParams.get('v') || '';
        } else if (url.hostname.includes('youtu.be')) {
          youtubeVideoId = url.pathname.slice(1);
        } else {
          youtubeVideoId = youtubeInput; // assume they pasted just the ID
        }
      } catch (e) {
        youtubeVideoId = youtubeInput; // fallback if it's not a full URL
      }
    }

    formData.set('logo_url', currentLogoUrl || '');
    formData.set('cover_url', currentCoverUrl || '');
    formData.set('background_image_url', currentBackgroundUrl || '');
    formData.set('theme_color', themeColor);
    formData.set('youtube_video_id', youtubeVideoId);
    formData.set('services', JSON.stringify(services));
    formData.set('portfolio', JSON.stringify(portfolio));
    
    // Crucial: Remove the large file blobs from the formData before sending to the server action
    // so Next.js doesn't try to parse them and throw a body size limit error!
    formData.delete('logo');
    formData.delete('cover');
    formData.delete('background');
    
    await updateProfile(formData);
    setLoading(false);
    alert('Profile saved successfully!');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', backgroundColor: 'var(--card-bg)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
      
      <div className="responsive-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--muted)' }}>Logo</label>
          <input type="hidden" name="logo_url" value={profile.logo_url || ''} />
          {logoPreview && <img src={logoPreview} alt="Logo" style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover', marginBottom: '1rem', border: '1px solid var(--border)' }} />}
          <input name="logo" type="file" accept="image/*" onChange={handleLogoChange} style={{ width: '100%', color: 'var(--muted)', fontSize: '0.9rem' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--muted)' }}>Cover Photo</label>
          <input type="hidden" name="cover_url" value={profile.cover_url || ''} />
          {coverPreview && <img src={coverPreview} alt="Cover" style={{ width: '100%', height: '80px', borderRadius: '12px', objectFit: 'cover', marginBottom: '1rem', border: '1px solid var(--border)' }} />}
          <input name="cover" type="file" accept="image/*" onChange={handleCoverChange} style={{ width: '100%', color: 'var(--muted)', fontSize: '0.9rem' }} />
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />

      <div className="responsive-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--muted)' }}>Business Name</label>
          <input name="business_name" type="text" defaultValue={profile.business_name} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--foreground)', outline: 'none' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--muted)' }}>Category / Tag</label>
            <input name="tag" type="text" defaultValue={profile.tag || ''} placeholder="e.g. SaaS" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--foreground)', outline: 'none' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--muted)' }}>City / Location</label>
            <input name="city" type="text" defaultValue={profile.city || ''} placeholder="e.g. Austin, TX" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--foreground)', outline: 'none' }} />
          </div>
        </div>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--muted)' }}>Short Description</label>
        <textarea name="description" defaultValue={profile.description || ''} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--foreground)', minHeight: '100px', outline: 'none', resize: 'vertical' }}></textarea>
      </div>

      <div className="responsive-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--muted)' }}>Website URL</label>
          <input name="website_url" type="url" defaultValue={profile.website_url || ''} placeholder="https://..." style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--foreground)', outline: 'none' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--muted)' }}>Twitter / X Handle</label>
          <input name="twitter_handle" type="text" defaultValue={profile.twitter_handle || ''} placeholder="@localyze" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--foreground)', outline: 'none' }} />
        </div>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--muted)' }}>Facebook Page URL</label>
        <input name="facebook_page_url" type="url" defaultValue={profile.facebook_page_url || ''} placeholder="https://facebook.com/yourpage" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--foreground)', outline: 'none' }} />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--muted)' }}>Google Place ID (Pro Members)</label>
        <input name="google_place_id" type="text" defaultValue={profile.google_place_id || ''} placeholder="e.g. ChIJN1t_tDeuEmsRUsoyG83frY4" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--foreground)', outline: 'none' }} />
        <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.5rem' }}>Find your Place ID <a href="https://developers.google.com/maps/documentation/places/web-service/place-id" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none' }}>here</a>. This allows us to fetch and display your Google Reviews on your profile.</p>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />

      <div>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Personalization (MySpace Vibes)</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--muted)', marginBottom: '1.5rem' }}>Make your profile yours. Pick an accent color, upload a full page background, and embed a featured video!</p>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--muted)' }}>Page Background Image</label>
          <input type="hidden" name="background_image_url" value={profile.background_image_url || ''} />
          {backgroundPreview && <img src={backgroundPreview} alt="Background Preview" style={{ width: '100%', height: '120px', borderRadius: '12px', objectFit: 'cover', marginBottom: '1rem', border: '1px solid var(--border)' }} />}
          <input name="background" type="file" accept="image/*" onChange={handleBackgroundChange} style={{ width: '100%', color: 'var(--muted)', fontSize: '0.9rem' }} />
        </div>

        <div className="responsive-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--muted)' }}>Theme Color</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <input 
                type="color" 
                value={themeColor} 
                onChange={(e) => setThemeColor(e.target.value)} 
                style={{ width: '50px', height: '50px', padding: 0, border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'none' }} 
              />
              <span style={{ fontFamily: 'monospace', color: 'var(--foreground)' }}>{themeColor}</span>
            </div>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--muted)' }}>Featured YouTube Video URL</label>
            <input 
              type="text" 
              value={youtubeInput} 
              onChange={(e) => setYoutubeInput(e.target.value)} 
              placeholder="https://www.youtube.com/watch?v=..." 
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--foreground)', outline: 'none' }} 
            />
          </div>
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Services & Pricing</h3>
          <button type="button" onClick={addService} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>+ Add Service</button>
        </div>
        
        {services.length === 0 ? (
          <p style={{ color: 'var(--muted)', fontStyle: 'italic', fontSize: '0.9rem' }}>No services added yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {services.map((svc) => (
              <div key={svc.id} className="responsive-service-item" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', backgroundColor: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px' }}>
                <div style={{ flex: 2, width: '100%' }}>
                  <input type="text" placeholder="Service Name (e.g. Marketing Audit)" value={svc.name} onChange={(e) => updateService(svc.id, 'name', e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--foreground)', marginBottom: '0.5rem', outline: 'none' }} required />
                  <textarea placeholder="Description of service..." value={svc.description} onChange={(e) => updateService(svc.id, 'description', e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--foreground)', minHeight: '60px', outline: 'none', resize: 'vertical' }}></textarea>
                </div>
                <div style={{ flex: 1, width: '100%' }}>
                  <input type="text" placeholder="Price (e.g. $500)" value={svc.price} onChange={(e) => updateService(svc.id, 'price', e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--foreground)', outline: 'none' }} required />
                </div>
                <button type="button" onClick={() => removeService(svc.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1.25rem', padding: '0.25rem', alignSelf: 'center' }}>&times;</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Portfolio / Past Jobs</h3>
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--muted)', marginBottom: '1.5rem' }}>Upload photos of your past work to showcase your quality to potential clients.</p>
        
        <input 
          type="file" 
          accept="image/*" 
          multiple 
          onChange={handlePortfolioUpload} 
          style={{ width: '100%', padding: '1.5rem', border: '2px dashed var(--border)', borderRadius: '12px', color: 'var(--muted)', backgroundColor: 'rgba(0,0,0,0.1)', cursor: 'pointer', outline: 'none', marginBottom: '1.5rem' }} 
        />

        {portfolio.length > 0 && (
          <div className="responsive-portfolio-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '1rem' }}>
            {portfolio.map((url, i) => (
              <div key={i} style={{ position: 'relative', width: '100%', paddingTop: '100%', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)', backgroundColor: 'var(--background)' }}>
                <img src={url} alt={`Portfolio ${i}`} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                <button 
                  type="button" 
                  onClick={() => removePortfolioImage(url)} 
                  style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1rem', fontSize: '1.1rem', opacity: loading ? 0.7 : 1 }}>
        {loading ? 'Saving...' : 'Save Profile & Services'}
      </button>
    </form>
  );
}
