-- =============================================================================
-- 🇰🇷 ANNYEONG ACADEMY - MASTER DATABASE SCHEMA
-- Generated: $(date)
-- =============================================================================

-- ⚠️ WARNING: THIS WILL RESET YOUR PUBLIC TABLES ⚠️
-- We drop tables in dependency order to avoid foreign key errors.

DROP TABLE IF EXISTS public.deletion_requests CASCADE;
DROP TABLE IF EXISTS public.admin_email_logs CASCADE;
DROP TABLE IF EXISTS public.placement_results CASCADE;
DROP TABLE IF EXISTS public.placement_questions CASCADE;
DROP TABLE IF EXISTS public.notifications CASCADE;
DROP TABLE IF EXISTS public.system_settings CASCADE;
DROP TABLE IF EXISTS public.content_blocks CASCADE;
DROP TABLE IF EXISTS public.faqs CASCADE;
DROP TABLE IF EXISTS public.announcements CASCADE;
DROP TABLE IF EXISTS public.direct_messages CASCADE;
DROP TABLE IF EXISTS public.feedback CASCADE;
DROP TABLE IF EXISTS public.reviews CASCADE;
DROP TABLE IF EXISTS public.lesson_discussions CASCADE;
DROP TABLE IF EXISTS public.comments CASCADE;
DROP TABLE IF EXISTS public.posts CASCADE;
DROP TABLE IF EXISTS public.downloads_log CASCADE;
DROP TABLE IF EXISTS public.wishlist CASCADE;
DROP TABLE IF EXISTS public.referrals CASCADE;
DROP TABLE IF EXISTS public.coupons CASCADE;
DROP TABLE IF EXISTS public.subscribers CASCADE;
DROP TABLE IF EXISTS public.contact_messages CASCADE;
DROP TABLE IF EXISTS public.webinar_leads CASCADE;
DROP TABLE IF EXISTS public.user_stats CASCADE;
DROP TABLE IF EXISTS public.homework_submissions CASCADE;
DROP TABLE IF EXISTS public.quiz_results CASCADE;
DROP TABLE IF EXISTS public.user_notes CASCADE;
DROP TABLE IF EXISTS public.lesson_progress CASCADE;
DROP TABLE IF EXISTS public.subscriptions CASCADE;
DROP TABLE IF EXISTS public.purchases CASCADE;
DROP TABLE IF EXISTS public.lessons CASCADE;
DROP TABLE IF EXISTS public.products CASCADE;
DROP TABLE IF EXISTS public.tutors CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- 1. SETUP & EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. PUBLIC TABLES

-- PROFILES
CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name text,
  avatar_url text,
  role text DEFAULT 'student',
  billing_address jsonb DEFAULT '{}'::jsonb,
  updated_at timestamp with time zone
);

-- TUTORS
CREATE TABLE public.tutors (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  role text,
  bio text,
  specialties text[],
  image_url text,
  video_intro text,
  social_links jsonb DEFAULT '{"instagram": "", "tiktok": "", "youtube": ""}'::jsonb,
  is_featured boolean DEFAULT false
);

-- PRODUCTS
CREATE TABLE public.products (
  id text NOT NULL PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  title text NOT NULL,
  description text,
  price text NOT NULL,
  sale_price text,
  sale_ends_at timestamp with time zone,
  type text NOT NULL,
  image_url text,
  level text DEFAULT 'All Levels',
  instruction_language text DEFAULT 'English',
  event_date timestamp with time zone,
  total_seats integer DEFAULT 14,
  booked_seats integer DEFAULT 0,
  tutor_id uuid REFERENCES public.tutors(id),
  upsell_product_id text REFERENCES public.products(id),
  is_featured boolean DEFAULT false
);

-- LESSONS
CREATE TABLE public.lessons (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id text REFERENCES public.products(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  module text DEFAULT 'General',
  video_url text,
  pdf_url text,
  quizlet_url text,
  type text DEFAULT 'video',
  quiz_data jsonb,
  release_date timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- PURCHASES
CREATE TABLE public.purchases (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  product_id text REFERENCES public.products(id) NOT NULL,
  status text DEFAULT 'completed',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- SUBSCRIPTIONS
CREATE TABLE public.subscriptions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) NOT NULL UNIQUE,
  status text DEFAULT 'active',
  plan_name text DEFAULT 'Premium Monthly',
  current_period_end timestamp with time zone,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- PROGRESS & LEARNING
CREATE TABLE public.lesson_progress (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  lesson_id uuid REFERENCES public.lessons(id) NOT NULL,
  course_id text REFERENCES public.products(id) NOT NULL,
  completed boolean DEFAULT true,
  last_accessed timestamp with time zone DEFAULT timezone('utc'::text, now()),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  UNIQUE(user_id, lesson_id)
);

CREATE TABLE public.user_notes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  lesson_id uuid REFERENCES public.lessons(id) NOT NULL,
  content text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  UNIQUE(user_id, lesson_id)
);

CREATE TABLE public.quiz_results (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  course_id text REFERENCES public.products(id),
  lesson_id uuid REFERENCES public.lessons(id),
  score integer,
  total_questions integer,
  passed boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE TABLE public.homework_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_id uuid REFERENCES public.lessons(id),
  user_id uuid REFERENCES auth.users(id),
  file_url text,
  status text DEFAULT 'pending',
  grade text,
  feedback text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- GAMIFICATION
CREATE TABLE public.user_stats (
  user_id uuid REFERENCES auth.users(id) PRIMARY KEY,
  xp integer DEFAULT 0,
  streak integer DEFAULT 0,
  level integer DEFAULT 1,
  last_activity date DEFAULT CURRENT_DATE
);

-- MARKETING & CRM
CREATE TABLE public.webinar_leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name text NOT NULL,
  email text NOT NULL,
  webinar_date text,
  gdpr_consent boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE TABLE public.contact_messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text,
  email text,
  message text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE TABLE public.subscribers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE TABLE public.coupons (
  code text NOT NULL PRIMARY KEY,
  discount_percent integer NOT NULL,
  active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE TABLE public.referrals (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_id uuid REFERENCES auth.users(id),
  referred_email text,
  status text DEFAULT 'pending',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE TABLE public.wishlist (
  user_id uuid REFERENCES auth.users(id),
  product_id text REFERENCES public.products(id),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  PRIMARY KEY (user_id, product_id)
);

CREATE TABLE public.downloads_log (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id),
  product_id text REFERENCES public.products(id),
  downloaded_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- SOCIAL & CONTENT
CREATE TABLE public.posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  content text,
  excerpt text,
  image_url text,
  tags text[],
  published boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE TABLE public.comments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  post_slug text NOT NULL,
  user_id uuid REFERENCES auth.users(id),
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE TABLE public.lesson_discussions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_id uuid REFERENCES public.lessons(id),
  user_id uuid REFERENCES auth.users(id),
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE TABLE public.reviews (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id),
  product_id text REFERENCES public.products(id),
  rating integer CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE TABLE public.feedback (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id),
  rating integer,
  comment text,
  is_giveaway_entry boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE TABLE public.direct_messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id uuid REFERENCES auth.users(id),
  receiver_id uuid REFERENCES auth.users(id),
  content text,
  is_read boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- SYSTEM
CREATE TABLE public.announcements (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  message text NOT NULL,
  type text DEFAULT 'info',
  active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE TABLE public.faqs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  question text NOT NULL,
  answer text NOT NULL,
  "order" integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE TABLE public.content_blocks (
  key text PRIMARY KEY,
  content jsonb NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE TABLE public.system_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE TABLE public.notifications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id),
  title text,
  message text,
  is_read boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE TABLE public.placement_questions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  question text NOT NULL,
  type text DEFAULT 'multiple-choice',
  options jsonb,
  correct_index integer,
  level text DEFAULT 'beginner',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE TABLE public.placement_results (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id),
  score integer,
  recommended_level text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE TABLE public.admin_email_logs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id uuid REFERENCES auth.users(id),
  recipient_email text,
  subject text,
  body text,
  sent_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE TABLE public.deletion_requests (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id),
  reason text,
  status text DEFAULT 'pending',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- =============================================================================
-- 3. FUNCTIONS & TRIGGERS
-- =============================================================================

-- Setup Profile on Signup
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', 'student');
  
  INSERT INTO public.user_stats (user_id, xp, streak, level)
  VALUES (new.id, 0, 1, 1);
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- (Re)Create Trigger safely
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Increment XP
CREATE OR REPLACE FUNCTION increment_xp(x int)
RETURNS void AS $$
BEGIN
  UPDATE public.user_stats 
  SET xp = xp + x, last_activity = CURRENT_DATE 
  WHERE user_id = auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update Streak
CREATE OR REPLACE FUNCTION update_streak()
RETURNS void AS $$
DECLARE
  last_date date;
BEGIN
  SELECT last_activity INTO last_date FROM public.user_stats WHERE user_id = auth.uid();
  IF last_date = CURRENT_DATE - 1 THEN
    UPDATE public.user_stats SET streak = streak + 1, last_activity = CURRENT_DATE WHERE user_id = auth.uid();
  ELSIF last_date < CURRENT_DATE - 1 THEN
    UPDATE public.user_stats SET streak = 1, last_activity = CURRENT_DATE WHERE user_id = auth.uid();
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutors ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE homework_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE webinar_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE downloads_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE direct_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE placement_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE placement_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE deletion_requests ENABLE ROW LEVEL SECURITY;

-- GLOBAL READ POLICIES
CREATE POLICY "Public Read Tutors" ON tutors FOR SELECT USING (true);
CREATE POLICY "Public Read Products" ON products FOR SELECT USING (true);
CREATE POLICY "Public Read Lessons" ON lessons FOR SELECT USING (true);
CREATE POLICY "Public Read Posts" ON posts FOR SELECT USING (published = true);
CREATE POLICY "Public Read Reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Public Read FAQs" ON faqs FOR SELECT USING (true);
CREATE POLICY "Public Read Announcements" ON announcements FOR SELECT USING (active = true);
CREATE POLICY "Public Read Profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Public Read Placement Qs" ON placement_questions FOR SELECT USING (true);
CREATE POLICY "Public Read Content" ON content_blocks FOR SELECT USING (true);
CREATE POLICY "Public Read Settings" ON system_settings FOR SELECT USING (true);
CREATE POLICY "Public Read Coupons" ON coupons FOR SELECT USING (true);

-- USER SPECIFIC POLICIES
CREATE POLICY "Users Update Own Profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users Read Own Stats" ON user_stats FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users Read Own Purchases" ON purchases FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users Read Own Subscriptions" ON subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users Manage Progress" ON lesson_progress FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users Manage Notes" ON user_notes FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users Manage Wishlist" ON wishlist FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users Read Notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users Insert Feedback" ON feedback FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users Insert Messages" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Users Insert Leads" ON webinar_leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Users Insert Subscribers" ON subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Users Manage DMs" ON direct_messages FOR ALL USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
CREATE POLICY "Users Manage Comments" ON comments FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users Manage Lesson Chat" ON lesson_discussions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users Manage Reviews" ON reviews FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users Manage Placement" ON placement_results FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users Manage Referrals" ON referrals FOR ALL USING (auth.uid() = referrer_id);
CREATE POLICY "Users Insert Deletion" ON deletion_requests FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users Insert Downloads" ON downloads_log FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users Manage Homework" ON homework_submissions FOR ALL USING (auth.uid() = user_id);

-- ADMIN POLICIES (Simplified for dev: auth.role() = 'admin' check is better in prod)
CREATE POLICY "Admin Full Access Products" ON products FOR ALL USING (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));
CREATE POLICY "Admin Full Access Lessons" ON lessons FOR ALL USING (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));
CREATE POLICY "Admin Full Access Tutors" ON tutors FOR ALL USING (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));
CREATE POLICY "Admin Full Access Posts" ON posts FOR ALL USING (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));
CREATE POLICY "Admin Full Access Logs" ON admin_email_logs FOR ALL USING (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));
CREATE POLICY "Admin View Leads" ON webinar_leads FOR SELECT USING (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));
CREATE POLICY "Admin View Messages" ON contact_messages FOR SELECT USING (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));
CREATE POLICY "Admin View Deletion" ON deletion_requests FOR SELECT USING (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));
CREATE POLICY "Admin View Downloads" ON downloads_log FOR SELECT USING (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));
CREATE POLICY "Admin View Homework" ON homework_submissions FOR ALL USING (exists (select 1 from profiles where id = auth.uid() and role = 'admin'));

-- =============================================================================
-- 5. SEED DATA
-- =============================================================================

-- Tutors
INSERT INTO public.tutors (id, name, role, bio, image_url, is_featured, specialties) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Kim Seon-saeng-nim', 'Head Teacher', 'Expert linguist making grammar simple.', 'https://placehold.co/400x400/6a11cb/ffffff?text=Kim', true, ARRAY['Grammar']),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Lee Min-ho', 'K-Pop Expert', 'Learn slang through BTS songs.', 'https://placehold.co/400x400/2575fc/ffffff?text=Lee', true, ARRAY['K-Pop']);

-- Products (Course)
INSERT INTO public.products (id, title, description, price, type, level, image_url, tutor_id) VALUES
('course-hangeul', 'Hangeul in 90 Minutes', 'Master the alphabet.', '4900 Ft', 'course', 'Beginner', 'https://placehold.co/600x400/purple/white?text=Hangeul', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11');

-- Lessons
INSERT INTO public.lessons (course_id, title, type, video_url, description) VALUES
('course-hangeul', 'Basic Vowels', 'video', 'https://www.youtube.com/watch?v=s5aobqyEaMQ', 'Learn A, O, U, I. [[VOCAB::A|Father]]');

-- Product (Ebook)
INSERT INTO public.products (id, title, description, price, type, image_url) VALUES
('ebook-survival', 'Survival PDF', 'Travel guide. [[DOWNLOAD_URL::https://example.com/pdf]]', '2900 Ft', 'ebook', 'https://placehold.co/400x500/orange/white?text=PDF');

-- System
INSERT INTO public.content_blocks (key, content) VALUES
('home_hero', '{"title": "Learn Korean Now", "subtitle": "Interactive and Fun"}'),
('privacy_policy', '{"title": "Privacy Policy", "body": "We respect your data."}'),
('terms_conditions', '{"title": "Terms", "body": "Standard terms."}');

INSERT INTO public.system_settings (key, value) VALUES
('maintenance_mode', '{"enabled": false, "message": "Updating..."}');

INSERT INTO public.coupons (code, discount_percent) VALUES ('WELCOME20', 20);

