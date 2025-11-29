"use client";
import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

const translations = {
  en: {
    // NAVBAR & FOOTER
    nav_about: "About Us",
    nav_tutors: "Teachers",
    nav_login: "Login",
    nav_dashboard: "Dashboard",
    nav_book: "Book Webinar",
    nav_courses: "All Courses",
    nav_notebook: "My Notebook",
    nav_leaderboard: "Leaderboard",
    nav_live: "Live Lessons",
    nav_store: "Store & Ebooks",
    nav_downloads: "My Downloads",
    nav_profile: "Profile",
    nav_logout: "Logout",
    nav_admin: "Admin Area",
    nav_management: "Management",
    footer_privacy: "Privacy Policy",
    legal_cookie: "We use cookies to improve your experience.",
    legal_accept: "Accept",

    // LANDING PAGE
    hero_title: "Learn Korean",
    hero_subtitle: "Without English!",
    hero_cta: "Register Free",
    offer_title: "Secure your spot",
    offer_subtitle: "Limited capacity",
    offer_free: "FREE",
    offer_btn: "Claim Pass",
    offer_no_cc: "No credit card required",
    
    // DASHBOARD
    dash_hello: "Hello",
    dash_ready: "Ready to learn?",
    dash_streak: "Streak",
    dash_xp: "Total XP",
    dash_days: "Days",
    dash_my_courses: "My Courses",
    dash_live_credits: "Live Credits",
    dash_files: "Files",
    dash_no_courses: "You haven't started any course yet.",
    dash_start_now: "Start Now",
    dash_no_live: "No live lessons booked.",
    dash_upcoming: "Upcoming Live",
    dash_league: "Your League",
    dash_join: "Join Zoom",

    // COURSE & PLAYER
    course_catalog: "Course Catalog",
    course_desc: "Choose between live courses or video on-demand.",
    course_search: "Search...",
    course_filter_all: "All",
    course_filter_owned: "My Courses",
    course_filter_not: "Not Owned",
    course_access: "Access Course",
    course_enroll: "Enroll",
    course_no_results: "No courses found.",
    player_locked: "Locked Content",
    player_unlock: "Unlock for",
    player_content: "Content",
    player_quiz: "Quiz",
    player_mark_complete: "Mark Complete",
    player_completed: "Completed",
    player_prev: "Previous",
    player_next: "Next",
    player_report: "Report Issue",
    player_curriculum: "Curriculum",
    player_cert: "Certificate",

    // QUIZ & HOMEWORK
    quiz_question: "Question",
    quiz_score: "Score",
    quiz_finish: "Finish",
    quiz_next: "Next",
    quiz_completed: "Quiz Completed!",
    quiz_scored: "You scored",
    quiz_retry: "Retry",
    vocab_title: "Vocabulary Drill",
    vocab_reveal: "Tap to reveal",
    vocab_hard: "Hard",
    vocab_easy: "Easy",
    vocab_complete: "Drill Complete!",
    vocab_retry: "Practice Again",
    hw_title: "Homework Assignment",
    hw_upload: "Upload File",
    hw_pending: "Pending Review",
    hw_graded: "Graded",
    hw_feedback: "Teacher Feedback:",

    // REVIEWS & FEEDBACK
    review_title: "Student Reviews",
    review_write: "Write a Review",
    review_submit: "Post Review",
    review_placeholder: "Share your experience...",
    review_no_reviews: "No reviews yet.",
    report_title: "Report Issue",
    report_desc: "Found a bug? Let us know.",
    report_btn: "Send Report",
    report_sent: "Thanks for feedback!",

    // STORE & SUBSCRIPTIONS
    store_title: "Digital Store",
    store_desc: "Ebooks, Merch & More.",
    store_download: "Download",
    store_buy: "Buy",
    dl_title: "My Downloads",
    dl_desc: "Your purchased files.",
    dl_empty: "No files found.",
    sub_title: "Membership",
    sub_active: "Active",
    sub_cancelled: "Cancelled",
    sub_renew: "Renews on",
    sub_cancel_btn: "Cancel Subscription",
    sub_upgrade: "Upgrade to Premium",
    sub_features: "Access all courses + Live Q&A",

    // PROFILE & AUTH
    prof_title: "Your Profile",
    prof_desc: "Manage your settings.",
    prof_student: "Student",
    prof_save: "Save Profile",
    prof_security: "Security",
    prof_orders: "Order History",
    auth_fullname: "Full Name",
    auth_email: "Email",
    auth_password: "Password",
    
    // LIVE EVENTS
    live_schedule: "Live Schedule",
    live_desc: "Book your spot in upcoming sessions.",
    live_book: "Book Spot",
    live_expired: "Ended",
    live_confirmed: "Confirmed",
    
    // GENERAL
    not_found: "Page Not Found",
    back_home: "Back to Home",
    btn_send: "Send",
    btn_loading: "Loading..."
  },
  hu: {
    // NAVBAR & FOOTER
    nav_about: "Rólunk",
    nav_tutors: "Tanárok",
    nav_login: "Belépés",
    nav_dashboard: "Irányítópult",
    nav_book: "Webinárium",
    nav_courses: "Kurzusok",
    nav_notebook: "Jegyzetfüzet",
    nav_leaderboard: "Ranglista",
    nav_live: "Élő Órák",
    nav_store: "Bolt",
    nav_downloads: "Letöltések",
    nav_profile: "Profil",
    nav_logout: "Kijelentkezés",
    nav_admin: "Admin",
    nav_management: "Kezelés",
    footer_privacy: "Adatvédelem",
    legal_cookie: "Sütiket használunk a jobb élményért.",
    legal_accept: "Elfogadom",

    // LANDING PAGE
    hero_title: "Tanulj Koreaiul",
    hero_subtitle: "Angol nélkül!",
    hero_cta: "Regisztrálok",
    offer_title: "Foglald le a helyed",
    offer_subtitle: "Korlátozott helyek",
    offer_free: "INGYENES",
    offer_btn: "Kérem a belépőt",
    offer_no_cc: "Nincs szükség kártyára",

    // DASHBOARD
    dash_hello: "Szia",
    dash_ready: "Készen állsz?",
    dash_streak: "Széria",
    dash_xp: "Összes XP",
    dash_days: "Nap",
    dash_my_courses: "Kurzusaim",
    dash_live_credits: "Élő Kreditek",
    dash_files: "Fájlok",
    dash_no_courses: "Még nincs kurzusod.",
    dash_start_now: "Kezdés Most",
    dash_no_live: "Nincs foglalt óra.",
    dash_upcoming: "Következő Élő",
    dash_league: "Ligád",
    dash_join: "Zoom Belépés",

    // COURSE & PLAYER
    course_catalog: "Kurzus Katalógus",
    course_desc: "Válassz videós vagy élő órák közül.",
    course_search: "Keresés...",
    course_filter_all: "Összes",
    course_filter_owned: "Saját",
    course_filter_not: "Nem Birtokolt",
    course_access: "Megnyitás",
    course_enroll: "Beiratkozás",
    course_no_results: "Nincs találat.",
    player_locked: "Lezárt",
    player_unlock: "Feloldás:",
    player_content: "Tartalom",
    player_quiz: "Kvíz",
    player_mark_complete: "Kész",
    player_completed: "Befejezve",
    player_prev: "Előző",
    player_next: "Következő",
    player_report: "Jelentés",
    player_curriculum: "Tanmenet",
    player_cert: "Oklevél",

    // QUIZ & HOMEWORK
    quiz_question: "Kérdés",
    quiz_score: "Pontszám",
    quiz_finish: "Befejezés",
    quiz_next: "Tovább",
    quiz_completed: "Kvíz Kész!",
    quiz_scored: "Pontszámod",
    quiz_retry: "Újra",
    vocab_title: "Szókincs",
    vocab_reveal: "Felfedés",
    vocab_hard: "Nehéz",
    vocab_easy: "Könnyű",
    vocab_complete: "Gyakorlás Kész!",
    vocab_retry: "Újra",
    hw_title: "Házi Feladat",
    hw_upload: "Fájl Feltöltése",
    hw_pending: "Értékelésre Vár",
    hw_graded: "Értékelve",
    hw_feedback: "Tanári Visszajelzés:",

    // REVIEWS & FEEDBACK
    review_title: "Vélemények",
    review_write: "Írj véleményt",
    review_submit: "Küldés",
    review_placeholder: "Oszd meg a tapasztalataidat...",
    review_no_reviews: "Még nincs vélemény.",
    report_title: "Hiba Jelentése",
    report_desc: "Hibát találtál?",
    report_btn: "Jelentés",
    report_sent: "Köszönjük!",

    // STORE & SUBSCRIPTIONS
    store_title: "Digitális Bolt",
    store_desc: "E-könyvek és kiegészítők.",
    store_download: "Letöltés",
    store_buy: "Vásárlás",
    dl_title: "Letöltéseim",
    dl_desc: "Megvásárolt fájlok.",
    dl_empty: "Nincs fájl.",
    sub_title: "Tagság",
    sub_active: "Aktív",
    sub_cancelled: "Lemondva",
    sub_renew: "Megújul",
    sub_cancel_btn: "Előfizetés Lemondása",
    sub_upgrade: "Prémium Előfizetés",
    sub_features: "Minden kurzus + Élő Q&A",

    // PROFILE & AUTH
    prof_title: "Profilod",
    prof_desc: "Beállítások kezelése.",
    prof_student: "Tanuló",
    prof_save: "Mentés",
    prof_security: "Biztonság",
    prof_orders: "Rendelések",
    auth_fullname: "Teljes Név",
    auth_email: "Email",
    auth_password: "Jelszó",

    // LIVE EVENTS
    live_schedule: "Élő Órarend",
    live_desc: "Foglald le a helyed.",
    live_book: "Foglalás",
    live_expired: "Lejárt",
    live_confirmed: "Megerősítve",

    // GENERAL
    not_found: "Az oldal nem található",
    back_home: "Főoldal",
    btn_send: "Küldés",
    btn_loading: "Betöltés..."
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')

  useEffect(() => {
    const saved = localStorage.getItem('app_lang')
    if (saved) setLang(saved)
  }, [])

  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'hu' : 'en'
    setLang(newLang)
    localStorage.setItem('app_lang', newLang)
  }

  const t = (key) => {
    return translations[lang][key] || key
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
