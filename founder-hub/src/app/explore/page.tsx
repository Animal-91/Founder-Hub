import { createClient } from '@/utils/supabase/server';
import SearchInput from '@/components/SearchInput';
import CategoryFilter from '@/components/CategoryFilter';

export default async function Explore({ searchParams }: { searchParams: Promise<{ q?: string, category?: string, loc?: string }> }) {
  const supabase = await createClient();
  const { q, category, loc } = await searchParams;

  let query = supabase.from('profiles').select('*').order('is_pro', { ascending: false });
  
  if (category) {
    query = query.eq('tag', category);
  }

  if (q) {
    query = query.or(`business_name.ilike.%${q}%,description.ilike.%${q}%,tag.ilike.%${q}%`);
  }

  if (loc) {
    query = query.ilike('city', `%${loc}%`);
  }

  const { data: profiles, error } = await query;

  const businesses = profiles || [];

  return (
    <div className="container">
      <div style={{ padding: '3rem 0' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 700 }}>Explore Local Businesses</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1.1rem', marginBottom: '2rem' }}>Discover innovative products, trusted services, and tools built by top entrepreneurs.</p>
        
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <SearchInput />
          <a href="/explore" className="btn btn-secondary" style={{ padding: '0.75rem 1.5rem' }}>Clear All</a>
        </div>
        
        <CategoryFilter />

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
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span className="card-tag">{biz.tag || 'Business'}</span>
                    {biz.city && <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>📍 {biz.city}</span>}
                  </div>
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
