-- 1. Add Type to Placement Questions (for Voice/Essay support)
ALTER TABLE public.placement_questions ADD COLUMN IF NOT EXISTS type text DEFAULT 'multiple-choice'; 
-- Types: 'multiple-choice', 'gap-fill', 'voice', 'essay', 'text'

-- 2. Add Type support to Products check constraint (if exists) or just ensure logic handles 'subscription'
-- (Postgres text columns don't strictly enforce enums unless defined, but good to document)

-- 3. Ensure Lesson Progress tracks completion explicitly
ALTER TABLE public.lesson_progress ADD COLUMN IF NOT EXISTS completed boolean DEFAULT true;

-- 4. Ensure Quiz Results track detailed answers if needed (optional, keeping simple for now)
