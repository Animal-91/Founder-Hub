'use server';

import { createClient as createServerClient } from '@/utils/supabase/server';
import { createClient } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function deleteAccount() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Not authenticated' };
  }

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    console.error('SUPABASE_SERVICE_ROLE_KEY is not set. Cannot delete user programmatically.');
    return { error: 'Server configuration error: Service role key missing.' };
  }

  // Create admin client to delete the user entirely from auth.users
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceRoleKey
  );

  const { error } = await supabaseAdmin.auth.admin.deleteUser(user.id);

  if (error) {
    console.error('Failed to delete user:', error);
    return { error: 'Failed to delete account' };
  }

  // Sign out the current session
  await supabase.auth.signOut();
  
  // Revalidate homepage and redirect
  revalidatePath('/');
  redirect('/');
}
