-- Add Marketing Fields to Products
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS is_featured boolean DEFAULT false;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS sale_price text;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS sale_ends_at timestamp with time zone;

-- Update View for Stats to include new columns if needed
-- (PostgreSQL views auto-update column refs in some versions, but better to be safe)
CREATE OR REPLACE VIEW public.product_stats AS
SELECT 
  p.id,
  p.title,
  p.price,
  p.sale_price,
  p.is_featured,
  p.type,
  p.image_url,
  p.description,
  p.level,
  p.created_at,
  COUNT(r.id) as review_count,
  COALESCE(AVG(r.rating), 0) as avg_rating
FROM public.products p
LEFT JOIN public.reviews r ON p.id = r.product_id
GROUP BY p.id;
