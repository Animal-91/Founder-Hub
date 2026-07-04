import Link from 'next/link';
import { login, signInWithFacebook } from '@/app/actions/auth';

export default function Login() {
  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '16px', padding: '3rem', width: '100%', maxWidth: '400px', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', textAlign: 'center' }}>Welcome Back</h1>
        <p style={{ color: 'var(--muted)', textAlign: 'center', marginBottom: '2rem' }}>Sign in to manage your profile</p>
        
        {/* Temporarily hiding Facebook Login until Developer Keys are configured
        <form action={signInWithFacebook} style={{ marginBottom: '1.5rem' }}>
          <button type="submit" className="btn btn-secondary" style={{ width: '100%', padding: '0.875rem', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', backgroundColor: '#1877F2', color: 'white', border: 'none' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
            Continue with Facebook
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <hr style={{ flex: 1, border: 'none', borderTop: '1px solid var(--border)' }} />
          <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>OR</span>
          <hr style={{ flex: 1, border: 'none', borderTop: '1px solid var(--border)' }} />
        </div>
        */}
        
        <form action={login} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--muted)' }}>Email</label>
            <input name="email" type="email" placeholder="you@example.com" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--foreground)', outline: 'none' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--muted)' }}>Password</label>
            <input name="password" type="password" placeholder="••••••••" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--background)', color: 'var(--foreground)', outline: 'none' }} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '0.875rem', fontSize: '1rem' }}>Sign In</button>
        </form>
        
        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.95rem', color: 'var(--muted)' }}>
          Don't have an account? <Link href="/signup" style={{ color: 'var(--primary)', fontWeight: 500 }}>Create Profile</Link>
        </div>
      </div>
    </div>
  );
}
