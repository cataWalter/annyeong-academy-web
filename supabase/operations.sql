-- 1. QUIZ RESULTS HISTORY
CREATE TABLE public.quiz_results (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  course_id text REFERENCES public.products(id),
  lesson_id uuid REFERENCES public.lessons(id),
  score integer NOT NULL,
  total_questions integer NOT NULL,
  passed boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Enable RLS
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own quiz results" ON public.quiz_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own quiz results" ON public.quiz_results FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins view all quiz results" ON public.quiz_results FOR SELECT USING (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- 2. PRODUCT STATS VIEW (Dynamic Ratings)
CREATE OR REPLACE VIEW public.product_stats AS
SELECT 
  p.id,
  p.title,
  p.price,
  p.type,
  p.image_url,
  p.description,
  p.level,
  COUNT(r.id) as review_count,
  COALESCE(AVG(r.rating), 0) as avg_rating
FROM public.products p
LEFT JOIN public.reviews r ON p.id = r.product_id
GROUP BY p.id;
