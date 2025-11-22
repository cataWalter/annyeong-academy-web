# 🧪 Annyeong Academy - Master Test Plan

**Objective:** Verify that all functional requirements are met and the user experience is smooth before the official launch.
**Environment:** Localhost (`npm run dev`) connected to Supabase.

---

## 🛠️ Phase 0: Prerequisites
Before testing, ensure:
1.  [x] `.env.local` is configured with Supabase URL & Key.
2.  [x] You have run `supabase/MASTER_DB_SETUP.sql` in the Supabase SQL Editor.
3.  [x] Storage buckets (`avatars`, `course-materials`) are created and public.

---

## 1. 📢 Public Funnel (Unauthenticated)
*Goal: Ensure new users can land, read, and register.*

- [x] **Landing Page Load**: Open `http://localhost:5173/`. Ensure no white screen (AdBlocker check).
- [x] **Localization**: Click "HU" in the navbar. Verify text changes to Hungarian. Click "EN" to revert.
- [x] **Webinar Registration**:
    -   Fill out the form at the top.
    -   Leave "GDPR" unchecked -> Verify error message.
    -   Check "GDPR" and submit -> Verify Success Message ("Registration Confirmed").
    -   **Database Check**: Go to Supabase -> `webinar_leads` table. Ensure the row exists.
- [x] **Navigation**: Click links in Navbar (About, Teachers, Contact). Ensure pages load.
- [x] **Contact Form**: Go to `/contact`. Send a message. Verify success UI.

---

## 2. 🔐 Authentication & Security
*Goal: Ensure secure access and role management.*

- [x] **Sign Up**: Go to `/register`. Create a new account (e.g., `student@test.com`).
    -   Verify redirect to Login or Dashboard.
- [x] **Login**: Log out, then log back in.
- [x] **Forgot Password**: Go to `/forgot-password`. Enter email. (Note: Real email sending requires SMTP setup in Supabase, but check if UI feedback works).
- [x] **Protected Routes**:
    -   Log out.
    -   Try to access `http://localhost:5173/dashboard`.
    -   **Expected**: Redirected to `/login`.

---

## 3. 🎓 The Student Experience (LMS)
*Goal: Verify the core value proposition (learning).*

### Dashboard & Catalog
- [x] **Dashboard**: Ensure "Hello, [Name]" appears. Check if Gamification stats (Streak/XP) are visible.
- [x] **Course Catalog**: Go to "All Courses".
    -   **Search**: Type "Korean". List should filter.
    -   **Filter**: Select "Not Owned".
- [x] **Purchase Simulation**:
    -   Click "Enroll" on a course (e.g., "Korean for Beginners").
    -   Fill out the fake credit card form.
    -   **Expected**: Success animation -> Page reload -> Button changes to "Access Course".

### The Course Player
- [x] **Video Playback**: Open a video lesson. Ensure YouTube/Vimeo embed loads.
- [x] **Audio Player**: Open an audio lesson. Test Play/Pause and **Speed Control** (1.2x).
- [x] **Notes**:
    -   Type a note in the sidebar.
    -   Refresh the page.
    -   **Expected**: Note should persist (fetched from DB).
- [x] **Vocabulary Drill**:
    -   Flip a card.
    -   Click "Easy" or "Hard".
    -   Finish the deck -> Verify "Drill Complete" screen.
- [x] **Quiz**:
    -   Take a quiz (if the lesson has one).
    -   Pass the quiz.
    -   **Expected**: Confetti animation 🎉.
- [x] **Progress**:
    -   Click "Mark Complete".
    -   Verify progress bar in sidebar updates.
    -   Verify XP increases in the popup.
- [x] **Report Issue**: Click the warning icon. Send a bug report. Verify it appears in `contact_messages` table.

---

## 4. 🛍️ E-Commerce & Digital Goods
*Goal: Verify non-video product delivery.*

- [x] **Store**: Go to "Store & Ebooks".
- [x] **Buy Ebook**: Purchase "Survival Korean PDF".
- [x] **My Downloads**:
    -   Go to "My Downloads" page.
    -   Click "Download".
    -   **Expected**: It should open the link (or the dummy link provided in seed data).
- [x] **Live Lessons**:
    -   Go to "Live Lessons".
    -   Check if "Date" and "Time" are displayed correctly.
    -   Purchase a spot.
    -   **Expected**: "Book Spot" changes to "Join Zoom".

---

## 5. 🏆 Engagement & Profile
*Goal: Verify retention features.*

- [x] **Leaderboard**: Go to `/leaderboard`. Ensure your user is listed with correct XP.
- [x] **My Notebook**: Go to `/notebook`. Ensure notes taken in Course Player appear here aggregated.
- [x] **Profile Settings**:
    -   Upload an Avatar image.
    -   Change Display Name.
    -   Save.
    -   Refresh page to ensure persistence.
- [x] **Invoice**: In Profile -> Order History, click the Download icon. Verify a PDF is generated.

---

## 6. 🛡️ Admin Panel (CMS)
*Goal: Verify content management.*

**Setup**:
1. Go to Supabase -> Table `profiles`.
2. Find your user row.
3. Change `role` column from `student` to `admin`.
4. Refresh the app.

**Tests**:
- [x] **Access**: Verify "Admin Area" appears in Sidebar.
- [x] **Stats**: Check if the top cards show correct numbers (Users, Sales, etc.).
- [x] **Create Product**:
    -   Go to Products tab.
    -   Create a new Course.
    -   Upload a cover image.
    -   Save.
- [x] **Create Lesson**:
    -   Go to Lessons tab.
    -   Select the course you just made.
    -   Add a video URL.
    -   Add Quiz JSON: `[{"question":"Test?","options":["Yes","No"],"correct":0}]`
    -   Save.
- [x] **Announcements**:
    -   Post a new announcement (e.g., "Maintenance tonight").
    -   Go to Dashboard as a student.
    -   **Expected**: Banner appears at the top of the screen.
- [x] **Manage Users**:
    -   Go to Students tab.
    -   Find a user.
    -   Manually enroll them in a course.

---

## 7. 🐛 Technical & Edge Cases
- [x] **AdBlocker Test**: Enable uBlock Origin / AdBlock Plus. Refresh. **Ensure the page does NOT crash** (White screen test).
- [x] **Mobile View**: Open Chrome DevTools (F12) -> Toggle Device Toolbar (Mobile).
    -   Check Hamburger menu functionality.
    -   Check Video Player responsiveness.
- [x] **404 Page**: Go to `http://localhost:5173/random-page-xyz`. Verify "Page Not Found" design.
- [x] **Profile picture**: Upload a different profile picture

