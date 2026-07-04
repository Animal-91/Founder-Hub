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

  let reviewsData = null;
  if (profile.is_pro && profile.google_place_id) {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    if (apiKey) {
      try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${profile.google_place_id}&fields=reviews,rating,user_ratings_total&key=${apiKey}`, { next: { revalidate: 3600 } });
        const data = await response.json();
        if (data.result) {
          reviewsData = data.result;
        }
      } catch (err) {
        console.error("Error fetching Google Reviews:", err);
      }
    }
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
          
          <div className="responsive-flex-header" style={{ display: 'flex', alignItems: 'flex-end', gap: '2rem', marginBottom: '2rem', marginTop: '-50px' }}>
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
            
            <div style={{ width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', flexWrap: 'wrap', justifyContent: 'inherit' }}>
                <h1 style={{ fontSize: '2.5rem', margin: 0, lineHeight: 1.2, wordBreak: 'break-word' }}>{profile.business_name}</h1>
                <span className="card-tag" style={{ fontSize: '1rem' }}>{profile.tag || 'Business'}</span>
                {profile.city && (
                  <span style={{ fontSize: '1rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    📍 {profile.city}
                  </span>
                )}
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

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '4rem', flexWrap: 'wrap' }}>
            {profile.website_url ? (
              <a href={profile.website_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '0.75rem 2rem', width: '100%', maxWidth: '250px' }}>
                Visit Website
              </a>
            ) : null}
            {profile.twitter_handle ? (
              <a href={`https://twitter.com/${profile.twitter_handle.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ width: '100%', maxWidth: '250px' }}>
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
                <div key={svc.id} className="responsive-service-item" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--foreground)' }}>{svc.name}</h3>
                    <p style={{ color: 'var(--muted)', margin: 0, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{svc.description}</p>
                  </div>
                  <div className="responsive-service-price" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)', flexShrink: 0, marginLeft: '2rem' }}>
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
              <div className="responsive-portfolio-grid" style={{ 
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

          {profile.facebook_page_url && (
            <>
              <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '4rem 0' }} />
              <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Latest Updates</h2>
              <div style={{ display: 'flex', justifyContent: 'center', overflow: 'hidden', borderRadius: '12px', border: '1px solid var(--border)', backgroundColor: 'white', width: '100%', maxWidth: '500px', margin: '0 auto' }}>
                <iframe 
                  src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(profile.facebook_page_url)}&tabs=timeline&width=500&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`} 
                  width="100%" 
                  height="500" 
                  style={{ border: 'none', overflow: 'hidden' }} 
                  scrolling="yes" 
                  frameBorder="0" 
                  allowFullScreen={true} 
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
                </iframe>
              </div>
            </>
          )}

          {profile.is_pro && profile.google_place_id && (
            <>
              <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '4rem 0' }} />
              <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Location</h2>
              <div style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border)', backgroundColor: 'var(--card-bg)' }}>
                <iframe
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_PLACES_API_KEY}&q=place_id:${profile.google_place_id}`}
                ></iframe>
              </div>
            </>
          )}

          {reviewsData && reviewsData.reviews && reviewsData.reviews.length > 0 && (
            <>
              <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '4rem 0' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.8rem', margin: 0 }}>Google Reviews</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(255,193,7,0.1)', padding: '0.5rem 1rem', borderRadius: '20px' }}>
                  <span style={{ color: '#ffc107', fontSize: '1.2rem' }}>★</span>
                  <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--foreground)' }}>{reviewsData.rating}</span>
                  <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>({reviewsData.user_ratings_total} reviews)</span>
                </div>
              </div>
              
              <div className="responsive-review-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {reviewsData.reviews.map((review: any, i: number) => (
                  <div key={i} style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                      <img src={review.profile_photo_url} alt={review.author_name} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                      <div>
                        <div style={{ fontWeight: 'bold', color: 'var(--foreground)' }}>{review.author_name}</div>
                        <div style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>{review.relative_time_description}</div>
                      </div>
                    </div>
                    <div style={{ color: '#ffc107', marginBottom: '1rem', fontSize: '1.2rem' }}>
                      {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                    </div>
                    <p style={{ margin: 0, color: 'var(--foreground)', fontSize: '0.95rem', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

        </div>
      </div>
  );
}
