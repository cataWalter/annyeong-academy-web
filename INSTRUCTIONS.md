# 🚀 Annyeong Academy - Launch Guide

## 1. Supabase Setup (Database)
1.  Go to your **Supabase Dashboard**.
2.  Open the **SQL Editor**.
3.  **Run `final_db_setup.sql`**: This creates the tables and security rules (RLS).
4.  **Run `storage_setup.sql`**: This enables file uploads for images/PDFs.
5.  **Run `seed_data.sql`**: This populates the app with courses and products.

## 2. Environment Variables
1.  Rename `.env.local.example` (if exists) to `.env.local`.
2.  Fill in your keys from Supabase -> Project Settings -> API:
    ```
    VITE_SUPABASE_URL=https://your-project.supabase.co
    VITE_SUPABASE_ANON_KEY=your-anon-key
    ```

## 3. Local Development
1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Start the server:
    ```bash
    npm run dev
    ```
3.  Open `http://localhost:5173`.

## 4. Admin Access
1.  Sign up a new user via the interface ().
2.  Go to Supabase -> Table Editor -> **profiles**.
3.  Find your user row and change the `role` column from `student` to `admin`.
4.  Refresh the app. You will see the "Admin Area" in the sidebar.

## 5. Deployment
*   **Vercel**: Just connect the git repo. `vercel.json` handles the routing.
*   **Netlify**: Just connect the git repo. `_redirects` handles the routing.
