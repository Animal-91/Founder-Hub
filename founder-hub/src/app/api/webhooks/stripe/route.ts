import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-06-24.dahlia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Use a direct client to bypass RLS for webhook updates
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } else {
      event = JSON.parse(body);
    }
  } catch (err: any) {
    console.error('Webhook signature verification failed.', err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.client_reference_id || session.metadata?.userId;

    if (userId) {
      // Update the user's profile to Pro
      await supabase
        .from('profiles')
        .update({ is_pro: true })
        .eq('id', userId);
        
      // Record the subscription
      await supabase
        .from('subscriptions')
        .insert({
          id: session.subscription as string,
          user_id: userId,
          status: 'active',
          price_id: 'pro_tier_900'
        });
    }
  }

  return NextResponse.json({ received: true });
}
