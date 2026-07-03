import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function test() {
  const { data, error } = await supabase.auth.signUp({
    email: `test_auto_${Date.now()}@example.com`,
    password: 'password123'
  })
  console.log('Signup data session:', data?.session ? 'SESSION CREATED' : 'NO SESSION (Email confirmation likely required)')
  console.log('Error:', error)
}
test()
