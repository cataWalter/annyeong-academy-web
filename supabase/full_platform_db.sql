-- 1. BLOG SYSTEM
CREATE TABLE public.posts (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  content text,
  excerpt text,
  image_url text,
  author_id uuid REFERENCES auth.users(id),
  tags text[],
  published boolean DEFAULT false,
  CONSTRAINT posts_pkey PRIMARY KEY (id)
);

-- 2. PLACEMENT TEST SYSTEM
CREATE TABLE public.placement_questions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  question text NOT NULL,
  options jsonb NOT NULL, -- Array of strings
  correct_index integer NOT NULL,
  level text DEFAULT 'beginner', -- beginner, intermediate, advanced
  CONSTRAINT placement_questions_pkey PRIMARY KEY (id)
);

CREATE TABLE public.placement_results (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  score integer NOT NULL,
  recommended_level text,
  CONSTRAINT placement_results_pkey PRIMARY KEY (id)
);

-- 3. SHOPPING CART (Simple Implementation)
CREATE TABLE public.carts (
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  items jsonb DEFAULT '[]'::jsonb, -- Array of product IDs
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  CONSTRAINT carts_pkey PRIMARY KEY (user_id)
);
