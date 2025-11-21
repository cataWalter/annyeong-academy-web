
# Annyeong Akadémia - Web Platform & LMS

## 📋 Project Background & Urgency
**Annyeong Akadémia** is a Korean language school for the Hungarian market.
This project was built under strict time constraints to meet the **December 6th deadline** for the first live webinar. The solution pivots from a complex CMS to a custom **React + Supabase** architecture to ensure speed, performance, and specific functionality without technical debt.

---

## 🎯 Part 1: Landing Page (Priority: Immediate)
**Objective:** Drive sign-ups for the free "Korean Open Day" webinar.

### Specific Requirements Implemented:
*   **Target Audience:** Hungarian speakers (UI is localized/ready for Hungarian content).
*   **Webinar Selection:** Users can choose between two specific dates:
    *   📅 **December 6th**
    *   📅 **December 7th**
*   **GDPR Compliant Form:**
    *   Replaces Google Forms for professional data handling.
    *   **Fields:** Name, Email Address, Webinar Appointment Choice.
    *   **Consent:** Mandatory GDPR checkbox ("I accept Privacy Policy").
*   **Automation:** Architecture ready for sending automatic confirmation emails (via Supabase Edge Functions/Resend) upon form submission.
*   **Anatomy (EduBlink Style):**
    *   **Hero:** "Show, don't tell" approach with visuals.
    *   **Benefits:** Explaining the "No English Needed" USP.
    *   **Teachers:** Introduction to Kim & Lee Seon-saeng-nim.
    *   **Agenda:** Timeline of the event.
    *   **Testimonials:** Social proof.
    *   **Footer:** Links to **Contact Us**, Privacy, and Terms.

---

## 🎯 Part 2: Main Platform / LMS (Deadline: Dec 6)
**Objective:** Allow students to enroll in courses immediately after the webinar.

### Core Functions Implemented:
1.  **Regular Group Courses:**
    *   Enrollment for fixed-schedule, curriculum-based live courses.
    *   Integrated **Stripe** payment flow (simulated).
2.  **Standalone Live Lessons (Drop-in):**
    *   Booking system for single sessions (e.g., "Learn with K-Pop").
    *   Supports varying weekly schedules (lessons do not build on each other).
3.  **Digital Store:**
    *   Purchase system for **Ebooks** and **Planners**.
    *   Purchase system for **Recorded Video Lessons (VOD)**.
4.  **Membership System (Access Control):**
    *   **Role-Based Access:** Not everyone accesses all courses.
    *   Content is gated: Students only see the content they have purchased.
5.  **Admin & Teacher Uploads:**
    *   Dedicated Dashboard (`/admin`) for teachers.
    *   **Supported File Types:** PDFs, PPTs (presentations), and Audio files.
    *   **Quizlet Integration:** Specific input field to add Flashcard buttons to the Course Player.

### Institutional Pages:
*   **About Us:** School mission and vision.
*   **Our Tutors:** Detailed teacher bios.
*   **FAQ:** Frequently Asked Questions.
*   **GDPR & Terms:** Legal compliance pages.
*   **Contact Us:** Functional contact form.

---

## 🛠️ Tech Stack

*   **Frontend:** React 18 (Vite)
*   **Styling:** Tailwind CSS (EduBlink inspired design)
*   **Backend:** Supabase (PostgreSQL)
*   **Auth:** Supabase Auth (Email/Password)
*   **Storage:** Supabase Storage (for hosting PDFs, Audio, PPTs)
*   **Payments:** Stripe (Architecture ready)

