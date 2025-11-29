-- 1. LINK COURSES TO TUTORS
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS tutor_id uuid REFERENCES public.tutors(id);

-- 2. LINK UPSELL PRODUCTS
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS upsell_product_id text REFERENCES public.products(id);

-- 3. ENABLE RETAKES (Add timestamp policy or just rely on logic)
-- (No schema change needed, we will handle logic in frontend to allow multiple results or delete old ones)

-- 4. SEED DATA UPDATE (Link existing course to tutor)
UPDATE public.products 
SET tutor_id = (SELECT id FROM public.tutors LIMIT 1) 
WHERE type = 'course' AND tutor_id IS NULL;
