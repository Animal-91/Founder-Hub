import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  
  if (code) {
    const supabase = await createClient()
    
    // Exchange the auth code for a session
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Successful login, redirect to explore or dashboard
      return NextResponse.redirect(new URL('/explore', requestUrl.origin))
    }
  }

  // If there's an error or no code, send them back to login with an error message
  return NextResponse.redirect(new URL('/login?error=Could not authenticate with Facebook', requestUrl.origin))
}
