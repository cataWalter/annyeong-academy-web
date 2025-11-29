-- 1. Instruction Language
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS instruction_language text DEFAULT 'English';

-- 2. Sale Timer Check (Ensure column exists from previous scripts)
-- ALTER TABLE public.products ADD COLUMN IF NOT EXISTS sale_ends_at timestamp with time zone;

-- 3. Edge Function Permissions (Optional: Grant anon access if needed)
-- GRANT EXECUTE ON FUNCTION "send-email" TO anon;
-- (This usually requires Supabase Dashboard configuration, not SQL)
