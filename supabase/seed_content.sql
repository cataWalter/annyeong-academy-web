-- CLEANUP (Optional - remove if preserving data)
-- TRUNCATE public.products, public.lessons, public.tutors, public.faqs, public.posts CASCADE;

-- 1. TUTORS
INSERT INTO public.tutors (id, name, role, bio, specialties, image_url, is_featured)
VALUES 
  (gen_random_uuid(), 'Kim Seon-saeng-nim', 'Head Teacher', 'A certified linguist from Seoul National University. Kim specializes in making grammar intuitive for beginners.', ARRAY['Grammar', 'Conversation'], 'https://placehold.co/400x400/6a11cb/ffffff?text=Kim', true),
  (gen_random_uuid(), 'Lee Min-ho', 'K-Pop Specialist', 'Learn Korean through your favorite BTS and Blackpink songs with Lee. Fun, energetic, and focused on modern slang.', ARRAY['Slang', 'K-Pop', 'Culture'], 'https://placehold.co/400x400/2575fc/ffffff?text=Lee', true),
  (gen_random_uuid(), 'Park Ji-yoon', 'TOPIK Expert', 'Preparing for the TOPIK exam? Park has helped over 500 students pass Level 4+. Strict but effective.', ARRAY['TOPIK', 'Writing', 'Business'], 'https://placehold.co/400x400/ff9900/ffffff?text=Park', false);

-- 2. COURSES
INSERT INTO public.products (id, title, description, price, type, image_url, level)
VALUES 
  ('course-hangeul', 'Hangeul in 90 Minutes', 'Master the Korean alphabet using our mnemonic system. Read your first words today!', '4900 Ft', 'course', 'https://placehold.co/600x400/purple/white?text=Hangeul', 'Beginner'),
  ('course-beginner-1', 'Korean Foundation 1', 'The ultimate start. Learn introductions, ordering food, and basic survival phrases.', '15900 Ft', 'course', 'https://placehold.co/600x400/blue/white?text=Beginner+1', 'Beginner'),
  ('course-kpop', 'Learn with BTS', 'Break down lyrics, understand grammar through song, and improve pronunciation.', '12900 Ft', 'course', 'https://placehold.co/600x400/pink/white?text=BTS+Korean', 'Intermediate');

-- 3. LESSONS (For Hangeul Course)
INSERT INTO public.lessons (course_id, title, type, video_url, description, quiz_data)
VALUES 
  ('course-hangeul', 'Introduction to Vowels', 'video', 'https://www.youtube.com/watch?v=s5aobqyEaMQ', 'Learn the basic vertical and horizontal vowels. [[VOCAB::A|Sound like Father]][[VOCAB::O|Sound like Home]]', '[{"question":"Which letter sounds like A?","options":["ㅏ","ㅓ","ㅗ","ㅜ"],"correct":0}]'::jsonb),
  ('course-hangeul', 'Basic Consonants', 'video', 'https://www.youtube.com/watch?v=0ZhOeA0yP-Q', 'G, N, D, R, M, B, S, J, CH. [[VOCAB::Ga|Go]][[VOCAB::Na|Me]]', '[{"question":"What is the sound of ㄱ?","options":["N","G/K","M","S"],"correct":1}]'::jsonb);

-- 4. PRODUCTS (Ebooks/Merch)
INSERT INTO public.products (id, title, description, price, type, image_url)
VALUES 
  ('ebook-survival', 'Survival Korean PDF', '500 essential phrases for travel. [[DOWNLOAD_URL::https://example.com/pdf]]', '2900 Ft', 'ebook', 'https://placehold.co/400x500/orange/white?text=PDF'),
  ('merch-planner', 'Study Planner 2025', 'Physical planner shipped to your door.', '5500 Ft', 'merch', 'https://placehold.co/400x500/green/white?text=Planner');

-- 5. LIVE EVENTS
INSERT INTO public.products (id, title, description, price, type, image_url, event_date, total_seats, booked_seats)
VALUES 
  ('evt-cooking', 'Kimchi Making Workshop', 'Live cooking class from Seoul. Ingredients list sent beforehand. [[ZOOM::https://zoom.us/j/123]]', '4500 Ft', 'standalone', 'https://placehold.co/600x400/red/white?text=Kimchi', NOW() + INTERVAL '5 days', 15, 3),
  ('evt-speaking', 'Conversation Club', 'Practice speaking with natives. Topic: Travel.', '3000 Ft', 'standalone', 'https://placehold.co/600x400/teal/white?text=Speaking', NOW() + INTERVAL '2 days', 6, 5);

-- 6. BLOG POSTS
INSERT INTO public.posts (title, slug, content, excerpt, image_url, published, tags)
VALUES 
  ('10 Slang Words You Need to Know', '10-korean-slang', 'Daebak! Hul! Learn what these mean...', 'Speak like a native with these trendy words.', 'https://placehold.co/600x400/yellow/black?text=Slang', true, ARRAY['Culture', 'Vocabulary']),
  ('How to Order Coffee in Seoul', 'ordering-coffee', 'Detailed guide on cafe etiquette...', 'Don''t be shy at the cafe. Here is the script.', 'https://placehold.co/600x400/brown/white?text=Coffee', true, ARRAY['Travel', 'Food']);
