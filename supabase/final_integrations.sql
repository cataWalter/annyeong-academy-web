-- 1. NEWSLETTER SUBSCRIBERS
CREATE TABLE public.subscribers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- 2. TUTOR SOCIAL LINKS
ALTER TABLE public.tutors ADD COLUMN IF NOT EXISTS social_links jsonb DEFAULT '{"instagram": "", "tiktok": "", "youtube": ""}'::jsonb;

-- 3. STORAGE BUCKETS & POLICIES
-- Create buckets if they don't exist (This usually requires UI/API, but policies are SQL)
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('course-materials', 'course-materials', true) ON CONFLICT DO NOTHING;

-- Policy: Avatars (Public Read, Authenticated Upload)
CREATE POLICY "Avatar Public Read" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Avatar Auth Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');
CREATE POLICY "Avatar Owner Update" ON storage.objects FOR UPDATE USING (bucket_id = 'avatars' AND auth.uid() = owner);

-- Policy: Course Materials (Public Read for simplicity, Admin Upload)
CREATE POLICY "Materials Public Read" ON storage.objects FOR SELECT USING (bucket_id = 'course-materials');
CREATE POLICY "Materials Admin Upload" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'course-materials' AND 
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
