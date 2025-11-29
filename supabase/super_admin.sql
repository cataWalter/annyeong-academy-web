-- 1. DRIP CONTENT
ALTER TABLE public.lessons ADD COLUMN release_date timestamp with time zone DEFAULT now();

-- 2. PLACEMENT TEST (Ensure RLS allows reading)
ALTER TABLE public.placement_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read questions" ON public.placement_questions FOR SELECT USING (true);
CREATE POLICY "Admin all questions" ON public.placement_questions FOR ALL USING (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
