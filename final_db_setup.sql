-- ============================================================
-- ANNYEONG ACADEMY - COMPLETE DATABASE SETUP
-- Run this in the Supabase SQL Editor
-- ============================================================

-- 1. EXTENSIONS
create extension if not exists "uuid-ossp";

-- 2. TABLES
-- PROFILES
create table if not exists profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  full_name text,
  avatar_url text,
  role text default 'student'
);

-- PRODUCTS
create table if not exists products (
  id text primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text,
  price text not null,
  type text not null, -- 'course', 'ebook', 'standalone'
  image_url text
);

-- LESSONS
create table if not exists lessons (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  course_id text references products(id) on delete cascade not null,
  title text not null,
  description text,
  video_url text,
  pdf_url text,
  quizlet_url text,
  type text default 'video'
);

-- PURCHASES
create table if not exists purchases (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users on delete cascade not null,
  product_id text references products(id) on delete cascade not null,
  status text default 'completed'
);

-- WEBINAR LEADS
create table if not exists webinar_leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  full_name text not null,
  email text not null,
  webinar_date text,
  gdpr_consent boolean default false
);

-- CONTACT MESSAGES
create table if not exists contact_messages (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text,
  email text,
  message text
);

-- 3. ENABLE ROW LEVEL SECURITY
alter table profiles enable row level security;
alter table products enable row level security;
alter table lessons enable row level security;
alter table purchases enable row level security;
alter table webinar_leads enable row level security;
alter table contact_messages enable row level security;

-- 4. RLS POLICIES

-- PROFILES: Public can view (for reviews/comments if needed), Users update own
create policy "Public profiles are viewable by everyone." on profiles for select using ( true );
create policy "Users can insert their own profile." on profiles for insert with check ( auth.uid() = id );
create policy "Users can update own profile." on profiles for update using ( auth.uid() = id );

-- PRODUCTS: Public read, Admin write
create policy "Public can view products" on products for select using ( true );
create policy "Admin can insert products" on products for insert with check ( exists (select 1 from profiles where id = auth.uid() and role = 'admin') );
create policy "Admin can update products" on products for update using ( exists (select 1 from profiles where id = auth.uid() and role = 'admin') );
create policy "Admin can delete products" on products for delete using ( exists (select 1 from profiles where id = auth.uid() and role = 'admin') );

-- LESSONS: Authenticated read (simple logic), Admin write
-- (In a stricter app, you'd check 'purchases' table in the 'using' clause, but for now app logic handles it)
create policy "Authenticated users view lessons" on lessons for select using ( auth.role() = 'authenticated' );
create policy "Admin manage lessons" on lessons for all using ( exists (select 1 from profiles where id = auth.uid() and role = 'admin') );

-- PURCHASES: Users view own, Admin view all
create policy "Users view own purchases" on purchases for select using ( auth.uid() = user_id );
create policy "Users can insert own purchase" on purchases for insert with check ( auth.uid() = user_id );
create policy "Admin view all purchases" on purchases for select using ( exists (select 1 from profiles where id = auth.uid() and role = 'admin') );

-- WEBINAR LEADS: Public insert (form), Admin select
create policy "Public insert leads" on webinar_leads for insert with check ( true );
create policy "Admin view leads" on webinar_leads for select using ( exists (select 1 from profiles where id = auth.uid() and role = 'admin') );

-- CONTACT MESSAGES: Public insert, Admin select
create policy "Public insert messages" on contact_messages for insert with check ( true );
create policy "Admin view messages" on contact_messages for select using ( exists (select 1 from profiles where id = auth.uid() and role = 'admin') );

-- 5. HANDLERS & TRIGGERS
-- Auto-create profile on signup
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url, role)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', 'student');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
