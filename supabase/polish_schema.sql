-- 1. COUPONS SYSTEM
CREATE TABLE public.coupons (
  code text NOT NULL PRIMARY KEY,
  discount_percent integer NOT NULL CHECK (discount_percent > 0 AND discount_percent <= 100),
  active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

INSERT INTO public.coupons (code, discount_percent) VALUES ('KOREA10', 10), ('WELCOME20', 20) ON CONFLICT DO NOTHING;

-- 2. WISHLIST SYSTEM
CREATE TABLE public.wishlist (
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  product_id text REFERENCES public.products(id) NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  CONSTRAINT wishlist_pkey PRIMARY KEY (user_id, product_id)
);

-- 3. LESSON PREREQUISITES
ALTER TABLE public.lessons ADD COLUMN prerequisite_id uuid REFERENCES public.lessons(id);
