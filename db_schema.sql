-- 1. Enable UUID extension
create extension if not exists "uuid-ossp";

-- 2. PROFILES (Users) - Keep existing logic but ensure safety
create table if not exists profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  full_name text,
  avatar_url text,
  role text default 'student' -- 'admin' or 'student'
);

-- Function to handle new user signup automatically
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url, role)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', 'student');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 3. PRODUCTS (Courses, Ebooks, Live Lessons)
-- Referenced in AdminDashboard.jsx, Courses.jsx, Store.jsx
create table products (
  id text primary key, -- Slug or Manual ID (e.g., 'coreano-base-1')
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text,
  price text not null, -- Stored as text (e.g. "35.000 Ft") for display
  type text not null, -- 'course', 'ebook', 'standalone'
  image_url text
);

-- 4. LESSONS (Course Content)
-- Referenced in AdminDashboard.jsx, CoursePlayer.jsx
create table lessons (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  course_id text references products(id) on delete cascade not null,
  title text not null,
  description text,
  video_url text,
  pdf_url text,
  quizlet_url text, -- Added based on AdminDashboard
  type text default 'video' -- 'video' or 'audio'
);

-- 5. PURCHASES (Unlock System)
-- Referenced in payment.js, CoursePlayer.jsx
create table purchases (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users on delete cascade not null,
  product_id text references products(id) on delete cascade not null,
  status text default 'completed'
);

-- 6. WEBINAR LEADS
-- Referenced in WebinarForm.jsx
create table webinar_leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  full_name text not null,
  email text not null,
  webinar_date text,
  gdpr_consent boolean default false
);

-- 7. CONTACT MESSAGES
-- Referenced in Contact.jsx
create table contact_messages (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text,
  email text,
  message text
);

-- 8. ROW LEVEL SECURITY (RLS)
alter table profiles enable row level security;
alter table products enable row level security;
alter table les

-- Insert Products (Courses)
insert into products (id, title, description, price, type, image_url) values
('coreano-base-1', 'Coreano Base 1', 'Il corso fondamentale per iniziare a leggere, scrivere e parlare in 4 settimane.', '35.000 Ft', 'course', 'https://placehold.co/600x400/6a11cb/ffffff?text=Coreano+Base'),
('k-drama-mastery', 'K-Drama Mastery', 'Impara il coreano colloquiale analizzando le scene dei tuoi drama preferiti.', '45.000 Ft', 'course', 'https://placehold.co/600x400/ff0055/ffffff?text=K-Drama'),
('topik-prep', 'Preparazione TOPIK I', 'Corso intensivo per superare il primo livello dell''esame ufficiale.', '50.000 Ft', 'course', 'https://placehold.co/600x400/2575fc/ffffff?text=TOPIK');

-- Insert Products (Live Lessons / Standalone)
insert into products (id, title, description, price, type) values
('live-kpop-dec', 'Learn with K-Pop (Live)', 'Analizziamo l''ultima hit dei BTS in diretta Zoom.', '5.000 Ft', 'standalone'),
('live-travel-seoul', 'Sopravvivenza a Seoul (Live)', 'Simulazione di viaggio: ordinare al ristorante e chiedere indicazioni.', '5.000 Ft', 'standalone');

-- Insert Products (Ebooks / Store)
insert into products (id, title, description, price, type, image_url) values
('ebook-hangul', 'Hangul in 24 Ore', 'Guida PDF completa all''alfabeto coreano con esercizi di scrittura.', '2.500 Ft', 'ebook', 'https://placehold.co/400x500/192335/ffffff?text=Ebook+Hangul'),
('planner-2025', 'Korean Study Planner 2025', 'Pianificatore digitale per tracciare i tuoi progressi linguistici.', '3.000 Ft', 'ebook', 'https://placehold.co/400x500/6a11cb/ffffff?text=Planner');

-- Insert Lessons for 'coreano-base-1'
insert into lessons (course_id, title, description, video_url, type) values
('coreano-base-1', 'Introduzione all''Hangul', 'Impariamo le vocali base e le prime consonanti.', 'https://www.youtube.com/watch?v=s5aobqyEaMQ', 'video'),
('coreano-base-1', 'Saluti e Presentazioni', 'Come dire Ciao, Grazie e presentarsi.', 'https://www.youtube.com/watch?v=s5aobqyEaMQ', 'video'),
('coreano-base-1', 'La struttura della frase', 'Soggetto, Oggetto, Verbo. La logica coreana.', 'https://www.youtube.com/watch?v=s5aobqyEaMQ', 'video');