-- 1. Trigger: Notify User on Purchase
CREATE OR REPLACE FUNCTION public.handle_new_purchase()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.notifications (user_id, title, message, link)
  VALUES (
    NEW.user_id,
    'Purchase Successful! 🎉',
    'You have successfully enrolled in a new course/product.',
    '/dashboard'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_purchase_created
  AFTER INSERT ON public.purchases
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_purchase();

-- 2. Trigger: Notify All Users on New Announcement
CREATE OR REPLACE FUNCTION public.handle_new_announcement()
RETURNS trigger AS $$
BEGIN
  -- Insert a notification for every user (Batch insert would be better for scale, simple loop for now)
  INSERT INTO public.notifications (user_id, title, message, link)
  SELECT id, 'New Announcement: ' || NEW.title, NEW.message, '/dashboard'
  FROM public.profiles;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_announcement_created
  AFTER INSERT ON public.announcements
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_announcement();
