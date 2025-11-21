# 🇰🇷 Annyeong Academy - Final Build

The platform is feature-complete. 

## ⚡ Quick Start

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Setup Database (Supabase)**
    *   Go to Supabase > SQL Editor.
    *   Copy and paste the content of `supabase/MASTER_DB_SETUP.sql`.
    *   Run it to create all tables, policies, and demo data.
    *   Go to Supabase > Storage.
    *   Create two public buckets: `avatars` and `course-materials`.

3.  **Configure Environment**
    *   Rename `.env.local.example` to `.env.local` (or create it).
    *   Add your keys:
        ```
        VITE_SUPABASE_URL=https://your-project.supabase.co
        VITE_SUPABASE_ANON_KEY=your-anon-key
        ```

4.  **Run App**
    ```bash
    npm run dev
    ```

## 🔑 Admin Access
1.  Sign up a new user on the website.
2.  Go to Supabase > Table Editor > `profiles`.
3.  Change your user's `role` from `student` to `admin`.
4.  Refresh the site. You will see the Admin Dashboard link in the sidebar.

## 🛠 Features Included
*   **Webinar Funnel**: Registration with GDPR consent.
*   **LMS**: Video player, Audio player, PDF downloads, Lesson notes.
*   **Gamification**: XP system, Leaderboard, Quizzes with confetti.
*   **E-Commerce**: Digital store for Ebooks and Live Class bookings.
*   **Admin**: Full CMS to manage courses, users, and announcements.
*   **Localization**: English/Hungarian toggle.
