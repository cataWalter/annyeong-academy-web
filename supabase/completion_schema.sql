-- 1. DOWNLOAD TRACKING
CREATE TABLE IF NOT EXISTS public.downloads_log (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id),
  product_id text REFERENCES public.products(id),
  downloaded_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.downloads_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users insert own downloads" ON public.downloads_log FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins view all downloads" ON public.downloads_log FOR SELECT USING (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- 2. ACCOUNT DELETION REQUESTS
CREATE TABLE IF NOT EXISTS public.deletion_requests (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id),
  reason text,
  status text DEFAULT 'pending',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.deletion_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users create deletion request" ON public.deletion_requests FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins view deletion requests" ON public.deletion_requests FOR SELECT USING (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
