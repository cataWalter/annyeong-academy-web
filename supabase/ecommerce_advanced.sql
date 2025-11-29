-- 1. SUBSCRIPTIONS TABLE
CREATE TABLE public.subscriptions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  status text DEFAULT 'active', -- active, cancelled, expired
  plan_name text DEFAULT 'Premium Monthly',
  current_period_end timestamp with time zone,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- RLS for Subscriptions
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own subscription" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins full access subscriptions" ON public.subscriptions FOR ALL USING (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- 2. SEED SUBSCRIPTION PRODUCT
INSERT INTO public.products (id, title, description, price, type, image_url)
VALUES 
  ('premium-plan', 'Annyeong Premium', 'Access to ALL courses + Monthly Live Sessions.', '9900 Ft/mo', 'subscription', 'https://placehold.co/400x400/gold/white?text=Premium')
ON CONFLICT DO NOTHING;
