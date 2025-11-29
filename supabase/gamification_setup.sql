-- 1. Ensure user_stats table exists and has correct columns
CREATE TABLE IF NOT EXISTS public.user_stats (
  user_id uuid REFERENCES auth.users(id) NOT NULL PRIMARY KEY,
  xp integer DEFAULT 0,
  streak integer DEFAULT 0,
  last_activity date DEFAULT CURRENT_DATE,
  level integer DEFAULT 1
);

-- 2. Function to safely increment XP
CREATE OR REPLACE FUNCTION increment_xp(x int)
RETURNS void AS $$
BEGIN
  INSERT INTO public.user_stats (user_id, xp, last_activity)
  VALUES (auth.uid(), x, CURRENT_DATE)
  ON CONFLICT (user_id)
  DO UPDATE SET 
    xp = user_stats.xp + EXCLUDED.xp,
    last_activity = EXCLUDED.last_activity;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Function to update Streak (Call this on login or lesson complete)
CREATE OR REPLACE FUNCTION update_streak()
RETURNS void AS $$
DECLARE
  last_date date;
  curr_streak int;
BEGIN
  SELECT last_activity, streak INTO last_date, curr_streak FROM public.user_stats WHERE user_id = auth.uid();
  
  IF last_date = CURRENT_DATE - 1 THEN
    -- Continued streak
    UPDATE public.user_stats SET streak = streak + 1, last_activity = CURRENT_DATE WHERE user_id = auth.uid();
  ELSIF last_date < CURRENT_DATE - 1 OR last_date IS NULL THEN
    -- Broken streak or new user
    INSERT INTO public.user_stats (user_id, streak, last_activity, xp)
    VALUES (auth.uid(), 1, CURRENT_DATE, 0)
    ON CONFLICT (user_id) DO UPDATE SET streak = 1, last_activity = CURRENT_DATE;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
