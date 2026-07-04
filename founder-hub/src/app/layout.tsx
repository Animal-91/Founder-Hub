import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { logout } from '@/app/actions/auth';
import { ThemeProvider } from '@/components/ThemeProvider';
import ThemeToggle from '@/components/ThemeToggle';

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Localyze | Discover & Grow",
  description: "The passive entrepreneur platform to share businesses and advertise.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Localyze",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f1115",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Script id="sw-register" strategy="afterInteractive">
            {`
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                    navigator.serviceWorker.getRegistrations().then(function(registrations) {
                      for(let registration of registrations) {
                        registration.unregister();
                      }
                    });
                  } else {
                    navigator.serviceWorker.register('/sw.js').then(
                      function(registration) {
                        console.log('ServiceWorker registration successful');
                      },
                      function(err) {
                        console.log('ServiceWorker registration failed: ', err);
                      }
                    );
                  }
                });
              }
            `}
          </Script>
          <div className="main-content">
            <nav style={{ padding: '1.5rem 0', borderBottom: '1px solid var(--border)', backgroundColor: 'var(--background)' }}>
              <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link href="/" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--foreground)', textDecoration: 'none' }}>
                  Localyze
                </Link>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <Link href="/explore" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.95rem' }}>Explore</Link>
                  <Link href="/pricing" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 600 }}>Pro</Link>
                  
                  {user ? (
                    <>
                      <Link href="/dashboard" style={{ color: 'var(--foreground)', textDecoration: 'none', fontSize: '0.95rem' }}>Dashboard</Link>
                      <form action={logout}>
                        <button type="submit" style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '0.95rem', padding: 0 }}>Logout</button>
                      </form>
                    </>
                  ) : (
                    <>
                      <Link href="/login" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.95rem' }}>Login</Link>
                      <Link href="/signup" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Sign Up</Link>
                    </>
                  )}
                  
                  <ThemeToggle />
                </div>
              </div>
            </nav>
            <main>
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
