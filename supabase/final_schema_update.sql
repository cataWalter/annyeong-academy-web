-- 1. REFERRAL SYSTEM
CREATE TABLE IF NOT EXISTS public.referrals (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_id uuid REFERENCES auth.users(id) NOT NULL,
  referred_email text,
  status text DEFAULT 'pending', -- pending, joined, converted
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own referrals" ON public.referrals FOR SELECT USING (auth.uid() = referrer_id);
CREATE POLICY "Users insert referrals" ON public.referrals FOR INSERT WITH CHECK (auth.uid() = referrer_id);

-- 2. COUPONS SYSTEM
CREATE TABLE IF NOT EXISTS public.coupons (
  code text NOT NULL PRIMARY KEY,
  discount_percent integer NOT NULL CHECK (discount_percent > 0 AND discount_percent <= 100),
  active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Seed Coupons
INSERT INTO public.coupons (code, discount_percent) VALUES ('KOREA10', 10), ('WELCOME20', 20) ON CONFLICT DO NOTHING;

-- Public Read Coupons (for validation)
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read coupons" ON public.coupons FOR SELECT USING (true);

-- 3. WISHLIST SYSTEM
CREATE TABLE IF NOT EXISTS public.wishlist (
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  product_id text REFERENCES public.products(id) NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  CONSTRAINT wishlist_pkey PRIMARY KEY (user_id, product_id)
);

ALTER TABLE public.wishlist ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage wishlist" ON public.wishlist FOR ALL USING (auth.uid() = user_id);

-- 4. SUBSCRIBERS
CREATE TABLE IF NOT EXISTS public.subscribers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert subscriber" ON public.subscribers FOR INSERT WITH CHECK (true);

-- 5. FINAL PERMISSIONS (Ensure Public Access to content)
-- Make sure Tutors and Reviews are visible
CREATE POLICY "Public read tutors" ON public.tutors FOR SELECT USING (true);
CREATE POLICY "Public read reviews" ON public.reviews FOR SELECT USING (true);

