-- 1. SEED DYNAMIC LEGAL CONTENT
INSERT INTO public.content_blocks (key, content) VALUES
('privacy_policy', '{"title": "Privacy Policy", "body": "Standard privacy policy placeholder. Admins can edit this text."}'),
('terms_conditions', '{"title": "Terms & Conditions", "body": "Standard terms placeholder. Admins can edit this text."}')
ON CONFLICT DO NOTHING;

-- 2. QUIZ ATTEMPTS TRACKING
-- Ensure quiz_results allows multiple entries or we query count
-- (Existing schema supports multiple inserts per user/lesson, so we just count them)

-- 3. ADMIN EMAIL LOGS
CREATE TABLE IF NOT EXISTS public.admin_email_logs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id uuid REFERENCES auth.users(id),
  recipient_email text,
  subject text,
  body text,
  sent_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.admin_email_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins view logs" ON public.admin_email_logs FOR ALL USING (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
