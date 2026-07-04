-- Create a table for user profiles
create table profiles (
  id uuid references auth.users not null primary key,
  business_name text not null,
  description text,
  tag text,
  website_url text,
  twitter_handle text,
  facebook_page_url text,
  city text,
  is_pro boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update their own profile." on profiles
  for update using (auth.uid() = id);

-- Create a table for Stripe subscriptions
create table subscriptions (
  id text primary key,
  user_id uuid references auth.users not null,
  status text not null,
  price_id text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up RLS for subscriptions
alter table subscriptions enable row level security;

create policy "Users can view their own subscriptions." on subscriptions
  for select using (auth.uid() = user_id);
