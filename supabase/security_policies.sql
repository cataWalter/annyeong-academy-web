-- ENABLE RLS ON ALL TABLES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- PROFILES
-- Everyone can read profiles (for reviews/tutors), but only edit their own
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- USER DATA (Stats, Notes, Progress, Purchases, Wishlist, Notifications)
-- Users can only see and edit their own data
CREATE POLICY "Users see own stats" ON public.user_stats FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users see own notes" ON public.user_notes FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users see own progress" ON public.lesson_progress FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users see own purchases" ON public.purchases FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users see own wishlist" ON public.wishlist FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users see own notifications" ON public.notifications FOR ALL USING (auth.uid() = user_id);

-- FEEDBACK
-- Users can insert, Admins can read all
CREATE POLICY "Users can submit feedback" ON public.feedback FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins read feedback" ON public.feedback FOR SELECT USING (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- CONTENT (Products, Lessons, Posts, Tutors, FAQs, Announcements)
-- Public read access, Admin write access
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tutors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public read lessons" ON public.lessons FOR SELECT USING (true); -- Content logic handled in app, or refine this to check purchases
CREATE POLICY "Public read posts" ON public.posts FOR SELECT USING (published = true);
CREATE POLICY "Public read tutors" ON public.tutors FOR SELECT USING (true);
CREATE POLICY "Public read faqs" ON public.faqs FOR SELECT USING (true);
CREATE POLICY "Public read announcements" ON public.announcements FOR SELECT USING (active = true);

-- ADMIN OVERRIDE
-- Give admins full access to everything (Simplified approach)
-- Note: In Supabase, you often create specific policies for Admin actions.
-- For brevity here, ensure your Admin Dashboard uses a client with sufficient privileges or specific policies:
CREATE POLICY "Admins Full Access Products" ON public.products FOR ALL USING (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
CREATE POLICY "Admins Full Access Lessons" ON public.lessons FOR ALL USING (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
CREATE POLICY "Admins Full Access Posts" ON public.posts FOR ALL USING (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
-- Repeat for other tables as needed for CMS management
