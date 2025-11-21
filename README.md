# 🇰🇷 Annyeong Akadémia - Web Platform & LMS

## 📋 Project Background & Context
**Annyeong Akadémia** is a Korean language school tailored for the Hungarian market. The core value proposition is teaching Korean **without requiring English knowledge**, using a direct Korean-to-Hungarian method.

**⚠️ Development Context:**
This project was developed as an **emergency pivot** to meet the strict deadline of **December 6th** for the first live webinar. Due to previous delays with other solutions, this platform was built from scratch using a **Modern Tech Stack (React + Supabase)** to ensure speed, stability, and full control over specific custom features that standard CMS plugins could not easily handle.

---

## 🎯 Part 1: Webinar Landing Page (Priority: Immediate)
**Objective:** Capture sign-ups for the "Korean Open Day" free webinar.

### ✅ Business Specifications Implemented
*   **Event Dates:** Users can select between two specific appointments:
    *   📅 **December 6th (Friday)**
    *   📅 **December 7th (Saturday)**
*   **GDPR Compliant Registration:**
    *   Replaced Google Forms with a custom, professional form.
    *   **Data Collected:** Name, Email, Date Preference.
    *   **Consent:** Mandatory checkbox to accept Privacy Policy before submission.
*   **Email Automation Ready:** The system records leads into the `webinar_leads` database table, which can trigger webhook automations (e.g., via Resend or MailerLite) to send the Zoom link confirmation.
*   **Content Anatomy (EduBlink Style):**
    *   **Hero:** "Learn Korean without English" USP with social proof (+500 students).
    *   **Benefits:** Bento-grid layout highlighting Native Teachers and Cultural Experience.
    *   **Teachers:** Profiles for Kim Seon-saeng-nim (Beginner Specialist) and Lee Seon-saeng-nim.
    *   **Agenda:** Timeline (18:00 Intro -> 18:15 Mini-Lesson -> 18:45 Q&A).
    *   **Offer:** "0 Ft" vs "15.000 Ft" value comparison.
    *   **Footer:** Links to Privacy Policy, Terms, and Contact.

---

## 🎯 Part 2: Main LMS Platform (Deadline: Dec 6)
**Objective:** Enable course enrollment, content delivery, and digital product sales immediately following the webinar.

### ✅ Core Functions Implemented

#### 1. Course Management
*   **Regular Group Courses:**
    *   Support for fixed-schedule, curriculum-based courses (e.g., "Coreano Base 1").
    *   **Membership System:** Content is locked. Only users who purchase the course can access the Player.
*   **Standalone Live Lessons (Drop-in):**
    *   Booking system for single sessions (e.g., "Learn with K-Pop").
    *   **Logic:** These do not build on each other; schedules vary weekly.
    *   **Delivery:** Upon purchase, the "Buy" button transforms into a **"Join Zoom"** button.

#### 2. Digital Store (E-Commerce)
*   **Products:** Dedicated section for purchasing **Ebooks** and **Planners**.
*   **Delivery:** "My Downloads" area where students can download PDFs immediately after purchase.

#### 3. Content Delivery (The Player)
*   **Video/Audio:** Supports streaming of pre-recorded lessons.
*   **File Support:** Teachers can upload **PDFs**, **Audio (MP3)**, and **PPT (Presentations)** directly to specific lessons.
*   **Quizlet Integration:** Specific functionality to add external Quizlet Flashcard buttons to any lesson.

#### 4. Institutional Pages
*   **About Us:** Mission statement and team overview.
*   **Our Tutors:** Detailed profiles.
*   **Contact Us:** Functional form saving messages to the database (`contact_messages`).
*   **Legal:** GDPR and Terms & Conditions pages.

---

## 🛠️ Tech Stack

*   **Frontend:** React 18 (Vite)
*   **Styling:** Tailwind CSS (Custom "Brand Purple/Blue" gradient theme)
*   **Routing:** React Router DOM v6 (Protected Routes for Dashboard/Admin)
*   **Backend-as-a-Service:** Supabase
    *   **Database:** PostgreSQL.
    *   **Auth:** Secure Email/Password authentication.
    *   **Storage:** Hosting for Course PDFs, Audio files, and PPTs.
*   **Payments:** Logic ready for Stripe Integration (currently in Simulation Mode).