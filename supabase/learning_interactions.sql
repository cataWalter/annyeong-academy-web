-- 1. LESSON DISCUSSIONS
CREATE TABLE public.lesson_discussions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_id uuid REFERENCES public.lessons(id) NOT NULL,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.lesson_discussions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read discussions" ON public.lesson_discussions FOR SELECT USING (true);
CREATE POLICY "Users post discussions" ON public.lesson_discussions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 2. HOMEWORK SUBMISSIONS
CREATE TABLE public.homework_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_id uuid REFERENCES public.lessons(id) NOT NULL,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  file_url text NOT NULL,
  status text DEFAULT 'pending', -- pending, graded
  grade text, -- e.g. "A", "90/100"
  feedback text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.homework_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own homework" ON public.homework_submissions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins see all homework" ON public.homework_submissions FOR SELECT USING (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
CREATE POLICY "Users submit homework" ON public.homework_submissions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins grade homework" ON public.homework_submissions FOR UPDATE USING (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- 3. HOMEWORK BUCKET
INSERT INTO storage.buckets (id, name, public) VALUES ('homework', 'homework', false) ON CONFLICT DO NOTHING;
CREATE POLICY "Users upload homework" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'homework' AND auth.role() = 'authenticated');
CREATE POLICY "Admins download homework" ON storage.objects FOR SELECT USING (bucket_id = 'homework' AND exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
CREATE POLICY "Users download own homework" ON storage.objects FOR SELECT USING (bucket_id = 'homework' AND auth.uid() = owner);
