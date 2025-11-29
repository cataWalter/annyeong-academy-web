-- BLOG COMMENTS
CREATE TABLE public.comments (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  post_slug text NOT NULL,
  user_id uuid REFERENCES auth.users(id),
  content text NOT NULL,
  CONSTRAINT comments_pkey PRIMARY KEY (id)
);

-- Enable access to profiles for comment display
-- (Assuming profiles table exists from previous steps)
