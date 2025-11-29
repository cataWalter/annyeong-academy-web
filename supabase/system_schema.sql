-- SYSTEM SETTINGS TABLE
CREATE TABLE public.system_settings (
  key text NOT NULL PRIMARY KEY,
  value jsonb NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Seed Default Settings
INSERT INTO public.system_settings (key, value)
VALUES 
  ('maintenance_mode', '{"enabled": false, "message": "We are upgrading the platform. Be right back!"}'),
  ('site_metadata', '{"title": "Annyeong Academy", "description": "Learn Korean without English."}')
ON CONFLICT DO NOTHING;

-- Allow Public Read, Admin Write
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read settings" ON public.system_settings FOR SELECT USING (true);
CREATE POLICY "Admin update settings" ON public.system_settings FOR UPDATE USING (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
