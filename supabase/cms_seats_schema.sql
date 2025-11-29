-- 1. CMS TABLE
CREATE TABLE public.content_blocks (
  key text NOT NULL PRIMARY KEY,
  content jsonb NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Seed Initial Content
INSERT INTO public.content_blocks (key, content)
VALUES 
  ('home_hero', '{"title": "Learn Korean directly from Seoul", "subtitle": "Free, interactive trial class with a native Korean tutor."}')
ON CONFLICT DO NOTHING;

-- 2. ADD SEATS TO PRODUCTS
ALTER TABLE public.products ADD COLUMN total_seats integer DEFAULT 14;
ALTER TABLE public.products ADD COLUMN booked_seats integer DEFAULT 0;
