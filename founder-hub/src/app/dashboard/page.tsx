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
        <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>Update your business details to attract more customers.</p>
        
        <DashboardForm profile={profile} />
      </div>
    </div>
  );
}
