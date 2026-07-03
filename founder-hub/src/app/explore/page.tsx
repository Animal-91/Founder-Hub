import { createClient } from '@/utils/supabase/server';
import SearchInput from '@/components/SearchInput';

export default async function Explore({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const supabase = await createClient();
  const { q } = await searchParams;

  let query = supabase.from('profiles').select('*').order('is_pro', { ascending: false });
  
  if (q) {
    query = query.ilike('business_name', `%${q}%`);
  }

  const { data: profiles, error } = await query;

  const businesses = profiles || [];

  return (
    <div className="container">
      <div style={{ padding: '3rem 0' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 700 }}>Explore Startups</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1.1rem', marginBottom: '2rem' }}>Discover innovative products and tools built by top entrepreneurs.</p>
        
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          <SearchInput />
          <a href="/explore" className="btn btn-secondary">Clear Filter</a>
        </div>

        <div className="grid">
          {businesses.map((biz: any) => (
            <div key={biz.id} className="card" style={biz.is_pro ? { borderColor: 'var(--primary)', position: 'relative' } : {}}>
              {biz.is_pro && (
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
              )}
              <div className="card-header">
                <div className="card-icon" style={{ 
                  background: biz.logo_url ? `url(${biz.logo_url}) center/cover` : 'var(--border)',
                  color: biz.logo_url ? 'transparent' : 'inherit'
                }}>
                  {!biz.logo_url && biz.business_name?.charAt(0).toUpperCase()}
                </div>
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
      </div>
    </div>
  );
}
