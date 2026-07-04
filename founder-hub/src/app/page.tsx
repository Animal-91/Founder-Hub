import { createClient } from '@/utils/supabase/server';

export default async function Home() {
  const supabase = await createClient();
  const { data: featuredBusinesses } = await supabase
    .from('profiles')
    .select('*')
    .eq('is_pro', true)
    .limit(3);

  const businesses = featuredBusinesses || [];

  return (
    <div className="container">
      <section className="hero">
        <h1>Where Local Businesses Connect and Scale</h1>
        <p>Join the premier network for entrepreneurs to showcase their businesses, discover new tools, and connect with like-minded creators.</p>
        <div className="hero-actions">
          <a href="/signup" className="btn btn-primary">Create Profile</a>
          <a href="/explore" className="btn btn-secondary">Explore Startups</a>
        </div>
      </section>
      
      <section style={{ padding: '2rem 0 6rem 0' }}>
        <h2 className="section-title">Featured Businesses</h2>
        <div className="grid">
          {businesses.map((biz: any) => (
            <div key={biz.id} className="card" style={{ borderColor: 'var(--primary)', position: 'relative' }}>
              <div style={{ 
                position: 'absolute', 
                top: '-12px', 
                right: '20px', 
                backgroundColor: 'var(--primary)', 
                color: 'white', 
                padding: '4px 12px', 
                borderRadius: '12px', 
                fontSize: '0.75rem',
                fontWeight: 'bold',
                boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
              }}>
                Promoted
              </div>
              <div className="card-header">
                <div className="card-icon">{biz.business_name?.charAt(0).toUpperCase()}</div>
                <div>
                  <h3 className="card-title">{biz.business_name}</h3>
                  <span className="card-tag">{biz.tag || 'Business'}</span>
                </div>
              </div>
              <p className="card-desc">{biz.description}</p>
              <a href={`/profile/${biz.id}`} className="card-link">View Profile &rarr;</a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
