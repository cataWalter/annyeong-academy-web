-- ADD MODULE COLUMN TO LESSONS
ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS module text DEFAULT 'General';

-- SEED DATA UPDATE (Organize existing lessons)
UPDATE public.lessons SET module = 'Introduction' WHERE title ILIKE '%Intro%';
UPDATE public.lessons SET module = 'Basics' WHERE title ILIKE '%Basic%';
