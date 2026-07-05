'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/login?error=Could not authenticate user')
  }

  revalidatePath('/', 'layout')
  redirect('/explore')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        full_name: formData.get('full_name') as string,
      }
    }
  }

  const { data: authData, error: authError } = await supabase.auth.signUp(data)

  if (authError) {
    redirect('/signup?error=Could not sign up user')
  }

  // Also insert the profile record
  if (authData.user) {
    const profile = {
      id: authData.user.id,
      business_name: formData.get('business_name') as string,
      description: formData.get('description') as string,
    }
    await supabase.from('profiles').insert(profile)
  }

  revalidatePath('/', 'layout')
  redirect('/explore')
}

export async function signInWithFacebook() {
  const supabase = await createClient()
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'facebook',
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    redirect('/login?error=Could not authenticate with Facebook')
  }

  if (data.url) {
    redirect(data.url)
  }
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

    const updates = {
    business_name: formData.get('business_name') as string,
    description: formData.get('description') as string,
    tag: formData.get('tag') as string,
    city: formData.get('city') as string,
    website_url: formData.get('website_url') as string,
    twitter_handle: formData.get('twitter_handle') as string,
    facebook_page_url: formData.get('facebook_page_url') as string,
    google_place_id: formData.get('google_place_id') as string,
    logo_url: formData.get('logo_url') as string,
    cover_url: formData.get('cover_url') as string,
    background_image_url: formData.get('background_image_url') as string,
    theme_color: formData.get('theme_color') as string,
    youtube_video_id: formData.get('youtube_video_id') as string,
    services: JSON.parse((formData.get('services') as string) || '[]'),
    portfolio: JSON.parse((formData.get('portfolio') as string) || '[]'),
  }

  await supabase.from('profiles').update(updates).eq('id', user.id)

  revalidatePath('/dashboard')
  revalidatePath('/explore')
  revalidatePath(`/profile/${user.id}`)
}


