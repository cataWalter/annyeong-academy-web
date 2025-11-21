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
- [ ] **Contact Form**: Go to `/contact`. Send a message. Verify success UI.

---

## 2. 🔐 Authentication & Security
*Goal: Ensure secure access and role management.*

- [ ] **Sign Up**: Go to `/register`. Create a new account (e.g., `student@test.com`).
    -   Verify redirect to Login or Dashboard.
- [ ] **Login**: Log out, then log back in.
- [ ] **Forgot Password**: Go to `/forgot-password`. Enter email. (Note: Real email sending requires SMTP setup in Supabase, but check if UI feedback works).
- [ ] **Protected Routes**:
    -   Log out.
    -   Try to access `http://localhost:5173/dashboard`.
    -   **Expected**: Redirected to `/login`.

---

## 3. 🎓 The Student Experience (LMS)
*Goal: Verify the core value proposition (learning).*

### Dashboard & Catalog
- [ ] **Dashboard**: Ensure "Hello, [Name]" appears. Check if Gamification stats (Streak/XP) are visible.
- [ ] **Course Catalog**: Go to "All Courses".
    -   **Search**: Type "Korean". List should filter.
    -   **Filter**: Select "Not Owned".
- [ ] **Purchase Simulation**:
    -   Click "Enroll" on a course (e.g., "Korean for Beginners").
    -   Fill out the fake credit card form.
    -   **Expected**: Success animation -> Page reload -> Button changes to "Access Course".

### The Course Player
- [ ] **Video Playback**: Open a video lesson. Ensure YouTube/Vimeo embed loads.
- [ ] **Audio Player**: Open an audio lesson. Test Play/Pause and **Speed Control** (1.2x).
- [ ] **Notes**:
    -   Type a note in the sidebar.
    -   Refresh the page.
    -   **Expected**: Note should persist (fetched from DB).
- [ ] **Vocabulary Drill**:
    -   Flip a card.
    -   Click "Easy" or "Hard".
    -   Finish the deck -> Verify "Drill Complete" screen.
- [ ] **Quiz**:
    -   Take a quiz (if the lesson has one).
    -   Pass the quiz.
    -   **Expected**: Confetti animation 🎉.
- [ ] **Progress**:
    -   Click "Mark Complete".
    -   Verify progress bar in sidebar updates.
    -   Verify XP increases in the popup.
- [ ] **Report Issue**: Click the warning icon. Send a bug report. Verify it appears in `contact_messages` table.

---

## 4. 🛍️ E-Commerce & Digital Goods
*Goal: Verify non-video product delivery.*

- [ ] **Store**: Go to "Store & Ebooks".
- [ ] **Buy Ebook**: Purchase "Survival Korean PDF".
- [ ] **My Downloads**:
    -   Go to "My Downloads" page.
    -   Click "Download".
    -   **Expected**: It should open the link (or the dummy link provided in seed data).
- [ ] **Live Lessons**:
    -   Go to "Live Lessons".
    -   Check if "Date" and "Time" are displayed correctly.
    -   Purchase a spot.
    -   **Expected**: "Book Spot" changes to "Join Zoom".

---

## 5. 🏆 Engagement & Profile
*Goal: Verify retention features.*

- [ ] **Leaderboard**: Go to `/leaderboard`. Ensure your user is listed with correct XP.
- [ ] **My Notebook**: Go to `/notebook`. Ensure notes taken in Course Player appear here aggregated.
- [ ] **Profile Settings**:
    -   Upload an Avatar image.
    -   Change Display Name.
    -   Save.
    -   Refresh page to ensure persistence.
- [ ] **Invoice**: In Profile -> Order History, click the Download icon. Verify a PDF is generated.

---

## 6. 🛡️ Admin Panel (CMS)
*Goal: Verify content management.*

**Setup**:
1. Go to Supabase -> Table `profiles`.
2. Find your user row.
3. Change `role` column from `student` to `admin`.
4. Refresh the app.

**Tests**:
- [ ] **Access**: Verify "Admin Area" appears in Sidebar.
- [ ] **Stats**: Check if the top cards show correct numbers (Users, Sales, etc.).
- [ ] **Create Product**:
    -   Go to Products tab.
    -   Create a new Course.
    -   Upload a cover image.
    -   Save.
- [ ] **Create Lesson**:
    -   Go to Lessons tab.
    -   Select the course you just made.
    -   Add a video URL.
    -   Add Quiz JSON: `[{"question":"Test?","options":["Yes","No"],"correct":0}]`
    -   Save.
- [ ] **Announcements**:
    -   Post a new announcement (e.g., "Maintenance tonight").
    -   Go to Dashboard as a student.
    -   **Expected**: Banner appears at the top of the screen.
- [ ] **Manage Users**:
    -   Go to Students tab.
    -   Find a user.
    -   Manually enroll them in a course.

---

## 7. 🐛 Technical & Edge Cases
- [x] **AdBlocker Test**: Enable uBlock Origin / AdBlock Plus. Refresh. **Ensure the page does NOT crash** (White screen test).
- [ ] **Mobile View**: Open Chrome DevTools (F12) -> Toggle Device Toolbar (Mobile).
    -   Check Hamburger menu functionality.
    -   Check Video Player responsiveness.
- [ ] **404 Page**: Go to `http://localhost:5173/random-page-xyz`. Verify "Page Not Found" design.

---

## ✅ Pass Criteria
The project is considered **Ready for Launch** when:
1. No "White Screen of Death" occurs.
2. A user can go from Landing Page -> Registration -> Purchase -> Lesson Completion without errors.
3. Admin can add content without touching the database directly.