-- 1. TUTOR PROFILES (Extending standard profiles)
CREATE TABLE IF NOT EXISTS public.tutors (
  id uuid REFERENCES auth.users(id) PRIMARY KEY,
  name text NOT NULL,
  role text,
  bio text,
  specialties text[], -- Array of strings
  image_url text,
  video_intro text,
  is_featured boolean DEFAULT false
);

-- Seed Data for Tutors
INSERT INTO public.tutors (id, name, role, bio, specialties, image_url, is_featured)
SELECT 
  id, 
  'Kim Seon-saeng-nim', 
  'Head Teacher', 
  'Specializes in beginners and pronunciation. 5 years experience.', 
  ARRAY['Grammar', 'Pronunciation'], 
  'https://placehold.co/400x400/6a11cb/ffffff?text=Kim',
  true
FROM auth.users LIMIT 1
ON CONFLICT (id) DO NOTHING;

-- 2. COURSE LEVELS
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS level text DEFAULT 'All Levels'; -- Beginner, Intermediate, Advanced

-- 3. LAST ACCESSED LESSON
ALTER TABLE public.lesson_progress ADD COLUMN IF NOT EXISTS last_accessed timestamp with time zone DEFAULT timezone('utc'::text, now());
