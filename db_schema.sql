-- ============================================================
-- 🇰🇷 ANNYEONG ACADEMY - FINAL DATABASE SCHEMA
-- Run this entire file in the Supabase SQL Editor
-- ============================================================

-- 1. EXTENSIONS
create extension if not exists "uuid-ossp";

-- 2. TABLES

-- PROFILES (Publicly readable for teachers/reviews, writable by owner)
create table if not exists profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone default timezone('utc'::text, now()),
  full_name text,
  avatar_url text,
  role text default 'student' check (role in ('student', 'admin'))
);

-- PRODUCTS (Courses, Ebooks, Live Lessons)
create table if not exists products (
  id text primary key, -- Manual ID like 'coreano-base-1'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text,
  price text not null,
  type text not null check (type in ('course', 'ebook', 'standalone')),
  image_url text
);

-- LESSONS (Content for Courses)
create table if not exists lessons (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  course_id text references products(id) on delete cascade not null,
  title text not null,
  description text,
  video_url text,
  pdf_url text,
  quizlet_url text,
  type text default 'video' check (type in ('video', 'audio'))
);

-- PURCHASES (Unlocks content)
create table if not exists purchases (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users on delete cascade not null,
  product_id text references products(id) on delete cascade not null,
  status text default 'completed'
);

-- WEBINAR LEADS (Landing Page Signups)
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

-- 3. ROW LEVEL SECURITY (RLS) & POLICIES

-- Enable RLS
alter table profiles enable row level security;
alter table products enable row level security;
alter table lessons enable row level security;
alter table purchases enable row level security;
alter table webinar_leads enable row level security;
alter table contact_messages enable row level security;

-- PROFILES Policies
create policy "Public profiles are viewable by everyone." on profiles for select using (true);
create policy "Users can insert their own profile." on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on profiles for update using (auth.uid() = id);

-- PRODUCTS Policies (Read Public, Write Admin)
create policy "Public view products" on products for select using (true);
create policy "Admin insert products" on products for insert with check (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));
create policy "Admin update products" on products for update using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));
create policy "Admin delete products" on products for delete using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

-- LESSONS Policies (Read Authenticated, Write Admin)
create policy "Auth users view lessons" on lessons for select using (auth.role() = 'authenticated');
create policy "Admin manage lessons" on lessons for all using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

-- PURCHASES Policies (Read Own, Write Own/Admin)
create policy "Users view own purchases" on purchases for select using (auth.uid() = user_id);
create policy "Users insert own purchases" on purchases for insert with check (auth.uid() = user_id);

-- WEBINAR & CONTACT Policies (Insert Public, Read Admin)
create policy "Public insert leads" on webinar_leads for insert with check (true);
create policy "Admin view leads" on webinar_leads for select using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

create policy "Public insert messages" on contact_messages for insert with check (true);
create policy "Admin view messages" on contact_messages for select using (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

-- 4. TRIGGERS (Auto-Profile Creation)
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

-- 5. SEED DATA (Initial Content)

-- Courses
insert into products (id, title, description, price, type, image_url) values
('coreano-base-1', 'Coreano Base 1', 'Il corso fondamentale per iniziare a leggere, scrivere e parlare in 4 settimane.', '35.000 Ft', 'course', 'https://placehold.co/600x400/6a11cb/ffffff?text=Coreano+Base'),
('k-drama-mastery', 'K-Drama Mastery', 'Impara il coreano colloquiale analizzando le scene dei tuoi drama preferiti.', '45.000 Ft', 'course', 'https://placehold.co/600x400/ff0055/ffffff?text=K-Drama'),
('topik-prep', 'Preparazione TOPIK I', 'Corso intensivo per superare il primo livello dell''esame ufficiale.', '50.000 Ft', 'course', 'https://placehold.co/600x400/2575fc/ffffff?text=TOPIK')
on conflict do nothing;

-- Live Lessons
insert into products (id, title, description, price, type) values
('live-kpop-dec', 'Learn with K-Pop (Live)', 'Analizziamo l''ultima hit dei BTS in diretta Zoom.', '5.000 Ft', 'standalone'),
('live-travel-seoul', 'Sopravvivenza a Seoul (Live)', 'Simulazione di viaggio: ordinare al ristorante e chiedere indicazioni.', '5.000 Ft', 'standalone')
on conflict do nothing;

-- Ebooks
insert into products (id, title, description, price, type, image_url) values
('ebook-hangul', 'Hangul in 24 Ore', 'Guida PDF completa all''alfabeto coreano con esercizi di scrittura.', '2.500 Ft', 'ebook', 'https://placehold.co/400x500/192335/ffffff?text=Ebook+Hangul'),
('planner-2025', 'Korean Study Planner 2025', 'Pianificatore digitale per tracciare i tuoi progressi linguistici.', '3.000 Ft', 'ebook', 'https://placehold.co/400x500/6a11cb/ffffff?text=Planner')
on conflict do nothing;

-- Lessons
insert into lessons (course_id, title, description, video_url, type) values
('coreano-base-1', 'Introduzione all''Hangul', 'Impariamo le vocali base e le prime consonanti.', 'https://www.youtube.com/watch?v=s5aobqyEaMQ', 'video'),
('coreano-base-1', 'Saluti e Presentazioni', 'Come dire Ciao, Grazie e presentarsi.', 'https://www.youtube.com/watch?v=s5aobqyEaMQ', 'video'),
('coreano-base-1', 'La struttura della frase', 'Soggetto, Oggetto, Verbo. La logica coreana.', 'https://www.youtube.com/watch?v=s5aobqyEaMQ', 'video')
on conflict do nothing;
