import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import DashboardForm from '@/components/DashboardForm';

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile) {
    // If somehow they don't have a profile yet (like the bug earlier), redirect them.
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2>Profile Not Found</h2>
        <p>Please contact support or re-run the setup SQL.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ maxWidth: '600px', margin: '3rem auto' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Your Dashboard</h1>
        <p style={{ color: 'var(--muted)', marginBottom: '1rem' }}>Update your business details to attract more customers.</p>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--card-bg)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border)', marginBottom: '2rem' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Pro Status</h3>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.9rem' }}>{profile.is_pro ? 'Active Subscription' : 'Free Tier'}</p>
          </div>
          {profile.is_pro ? (
            <span style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#22c55e', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.875rem', fontWeight: 600 }}>Pro Active</span>
          ) : (
            <a href="/pricing" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', textDecoration: 'none' }}>
              Upgrade to Pro
            </a>
          )}
        </div>

        <DashboardForm profile={profile} />
      </div>
    </div>
  );
}
