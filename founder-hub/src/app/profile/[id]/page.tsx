import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const supabase = await createClient();

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', resolvedParams.id)
    .single();

  if (error || !profile) {
    notFound();
  }

  return (
      <div style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '4rem' }}>
        
        {/* Cover Photo Area */}
        <div style={{ 
          height: '250px', 
          width: '100%', 
          backgroundColor: 'var(--card-bg)',
          backgroundImage: profile.cover_url ? `url(${profile.cover_url})` : 'linear-gradient(135deg, #1e293b, #0f172a)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          borderBottom: '1px solid var(--border)'
        }}>
          <Link href="/explore" style={{ position: 'absolute', top: '20px', left: '20px', color: 'white', backgroundColor: 'rgba(0,0,0,0.5)', padding: '8px 16px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', fontSize: '0.9rem', textDecoration: 'none', backdropFilter: 'blur(4px)' }}>
            &larr; Back to Explore
          </Link>
        </div>
        
        <div style={{ padding: '0 2rem', position: 'relative' }}>
          
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2rem', marginBottom: '2rem', marginTop: '-50px' }}>
            <div style={{ 
              width: '120px', 
              height: '120px', 
              borderRadius: '20px', 
              background: profile.logo_url ? `url(${profile.logo_url}) center/cover` : 'linear-gradient(135deg, #1e293b, #334155)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: 'white', 
              fontSize: '3rem',
              fontWeight: 'bold',
              flexShrink: 0,
              border: profile.is_pro ? '3px solid var(--primary)' : '4px solid var(--background)',
              boxShadow: '0 8px 16px rgba(0,0,0,0.4)',
              zIndex: 10
            }}>
              {!profile.logo_url && profile.business_name?.charAt(0).toUpperCase()}
            </div>
            
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                <h1 style={{ fontSize: '2.5rem', margin: 0, lineHeight: 1.2 }}>{profile.business_name}</h1>
                <span className="card-tag" style={{ fontSize: '1rem' }}>{profile.tag || 'Business'}</span>
                {profile.is_pro && (
                  <span style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '4px 12px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold' }}>Promoted</span>
                )}
              </div>
            </div>
          </div>

          <p style={{ fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2.5rem', color: 'var(--foreground)', whiteSpace: 'pre-wrap' }}>
            {profile.description}
          </p>

          {/* Metrics removed because they aren't part of the real data model yet */}

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '4rem' }}>
            {profile.website_url ? (
              <a href={profile.website_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>
                Visit Website
              </a>
            ) : null}
            {profile.twitter_handle ? (
              <a href={`https://twitter.com/${profile.twitter_handle.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                Twitter {profile.twitter_handle}
              </a>
            ) : null}
            {!profile.website_url && !profile.twitter_handle && (
              <p style={{ color: 'var(--muted)', fontStyle: 'italic' }}>Links not provided yet.</p>
            )}
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border)', marginBottom: '3rem' }} />

          <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Services & Pricing</h2>
          
          {(!profile.services || profile.services.length === 0) ? (
            <p style={{ color: 'var(--muted)', fontStyle: 'italic' }}>No services have been listed yet.</p>
          ) : (
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {profile.services.map((svc: any) => (
                <div key={svc.id} style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--foreground)' }}>{svc.name}</h3>
                    <p style={{ color: 'var(--muted)', margin: 0, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{svc.description}</p>
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)', flexShrink: 0, marginLeft: '2rem' }}>
                    {svc.price}
                  </div>
                </div>
              ))}
            </div>
          )}

          {profile.portfolio && profile.portfolio.length > 0 && (
            <>
              <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '4rem 0' }} />
              <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Past Work & Portfolio</h2>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
                gap: '1.5rem' 
              }}>
                {profile.portfolio.map((url: string, i: number) => (
                  <div key={i} style={{ 
                    position: 'relative', 
                    width: '100%', 
                    paddingTop: '100%', 
                    borderRadius: '16px', 
                    overflow: 'hidden', 
                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }} className="portfolio-item">
                    <img 
                      src={url} 
                      alt={`Portfolio item ${i + 1}`} 
                      style={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease'
                      }} 
                    />
                  </div>
                ))}
              </div>
              <style dangerouslySetInnerHTML={{__html: `
                .portfolio-item:hover {
                  transform: translateY(-5px);
                  box-shadow: 0 15px 30px rgba(0,0,0,0.4) !important;
                }
                .portfolio-item:hover img {
                  transform: scale(1.05);
                }
              `}} />
            </>
          )}

        </div>
      </div>
  );
}
