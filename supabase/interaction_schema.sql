-- 1. DIRECT MESSAGES (Real-time)
CREATE TABLE public.direct_messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id uuid REFERENCES auth.users(id) NOT NULL,
  receiver_id uuid REFERENCES auth.users(id) NOT NULL, -- Can be a Tutor ID (which is a user_id)
  content text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- RLS for Messages
ALTER TABLE public.direct_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can see their own messages" ON public.direct_messages
  FOR ALL USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

-- 2. REFERRALS
CREATE TABLE public.referrals (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_id uuid REFERENCES auth.users(id) NOT NULL,
  referred_email text,
  status text DEFAULT 'pending', -- pending, joined, converted
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own referrals" ON public.referrals FOR SELECT USING (auth.uid() = referrer_id);
CREATE POLICY "Users create referrals" ON public.referrals FOR INSERT WITH CHECK (auth.uid() = referrer_id);
