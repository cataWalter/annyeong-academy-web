-- 1. DYNAMIC FAQ
CREATE TABLE public.faqs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  question text NOT NULL,
  answer text NOT NULL,
  category text DEFAULT 'general',
  "order" integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

INSERT INTO public.faqs (question, answer, "order") VALUES 
('Do I need to install anything?', 'No, just a browser.', 1),
('Is it really free?', 'The trial class is 100% free.', 2);

-- 2. FEEDBACK / GIVEAWAY ENTRIES
CREATE TABLE public.feedback (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id),
  event_id text REFERENCES public.products(id),
  rating integer,
  comment text,
  is_giveaway_entry boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- 3. BILLING ADDRESS IN PROFILES
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS billing_address jsonb DEFAULT '{}'::jsonb;
