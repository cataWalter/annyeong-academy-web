-- ============================================================
-- SEED DATA: Run this in Supabase SQL Editor to populate content
-- ============================================================

-- 1. INSERT PRODUCTS (Courses)
INSERT INTO products (id, title, description, price, type, image_url)
VALUES 
('coreano-base-1', 'Korean Basics 1', 'The fundamental course to start reading, writing, and speaking in 4 weeks. Includes PDF workbook.', '35.000 Ft', 'course', 'https://images.unsplash.com/photo-1576670159805-381a9de1e9b9?auto=format&fit=crop&w=800&q=80'),
('k-drama-mastery', 'K-Drama Mastery', 'Learn colloquial Korean by analyzing scenes from popular dramas like Squid Game and Goblin.', '45.000 Ft', 'course', 'https://images.unsplash.com/photo-1535139262971-c51845709a48?auto=format&fit=crop&w=800&q=80'),
('topik-prep', 'TOPIK I Preparation', 'Intensive preparation for the official language certification exam level 1.', '50.000 Ft', 'course', 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80')
ON CONFLICT (id) DO NOTHING;

-- 2. INSERT PRODUCTS (Live Lessons)
INSERT INTO products (id, title, description, price, type)
VALUES 
('live-kpop-dec', 'Learn with K-Pop (Live)', 'We analyze the latest BTS hit live on Zoom. Pronunciation and vocabulary focus.[[ZOOM::https://zoom.us/j/123456789]]', '5.000 Ft', 'standalone'),
('live-travel-seoul', 'Survival in Seoul (Live)', 'Travel simulation: Ordering at a restaurant and asking for directions.[[ZOOM::https://zoom.us/j/987654321]]', '5.000 Ft', 'standalone')
ON CONFLICT (id) DO NOTHING;

-- 3. INSERT PRODUCTS (Ebooks)
INSERT INTO products (id, title, description, price, type, image_url)
VALUES 
('ebook-hangul', 'Hangul in 24 Hours', 'Complete PDF guide to the Korean alphabet with writing exercises.[[DOWNLOAD_URL::https://example.com/hangul.pdf]]', '2.500 Ft', 'ebook', 'https://images.unsplash.com/photo-1544716278-ca83adf1f205?auto=format&fit=crop&w=400&q=80'),
('planner-2025', 'Korean Study Planner 2025', 'Digital planner to track your linguistic progress week by week.[[DOWNLOAD_URL::https://example.com/planner.pdf]]', '3.000 Ft', 'ebook', 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=400&q=80')
ON CONFLICT (id) DO NOTHING;

-- 4. INSERT LESSONS (For Coreano Base 1)
INSERT INTO lessons (course_id, title, description, video_url, type, pdf_url)
VALUES 
('coreano-base-1', 'Introduction to Hangul', 'We learn the basic vowels and the first consonants. Writing order is crucial.', 'https://www.youtube.com/watch?v=s5aobqyEaMQ', 'video', 'https://example.com/hangul_intro.pdf'),
('coreano-base-1', 'Greetings and Introductions', 'How to say Hello (Annyeonghaseyo), Thank You, and introduce yourself.', 'https://www.youtube.com/watch?v=0ZhOevtJAXM', 'video', NULL),
('coreano-base-1', 'Sentence Structure', 'Subject, Object, Verb. The logic of the Korean mind.', 'https://www.youtube.com/watch?v=M75iV_HwYIw', 'video', NULL),
('coreano-base-1', 'Pronunciation Practice', 'Listen and repeat. Audio-only lesson for commuting.', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', 'audio', NULL)
ON CONFLICT DO NOTHING;

