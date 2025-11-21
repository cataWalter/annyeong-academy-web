-- COPIA E INCOLLA QUESTO CODICE NELL'SQL EDITOR DI SUPABASE --

-- 1. Tabella PROFILI (estende auth.users)
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  full_name text,
  avatar_url text,
  role text default 'student' -- 'admin' o 'student'
);

-- Trigger per creare profilo automaticamente alla registrazione
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. Tabella LEZIONI
create table lessons (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  course_id text not null, -- Es. '1' (Coreano Base), '2' (K-Drama)
  title text not null,
  description text,
  video_url text,
  pdf_url text
);

-- 3. Tabella ISCRITTI WEBINAR
create table webinar_leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  full_name text not null,
  email text not null,
  webinar_date text,
  gdpr_consent boolean default false
);

-- 4. SICUREZZA (Row Level Security)
alter table profiles enable row level security;
create policy "Profili pubblici" on profiles for select using ( true );
create policy "Utenti modificano proprio profilo" on profiles for update using ( auth.uid() = id );

alter table lessons enable row level security;
create policy "Tutti vedono lezioni" on lessons for select using ( true );
create policy "Solo admin inserisce" on lessons for insert with check ( true );

alter table webinar_leads enable row level security;
create policy "Inserimento pubblico" on webinar_leads for insert with check ( true );

-- 5. STORAGE (Esegui manualmente nella dashboard Storage)
-- Crea un bucket pubblico chiamato 'course-materials'
