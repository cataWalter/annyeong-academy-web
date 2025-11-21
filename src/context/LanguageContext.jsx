import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

const translations = {
  en: {
    // Navbar
    nav_about: "About Us",
    nav_tutors: "Teachers",
    nav_login: "Login",
    nav_dashboard: "Dashboard",
    nav_book: "Book Webinar",
    
    // Auth
    auth_welcome: "Welcome Back!",
    auth_access: "Access your student area",
    auth_email: "Email",
    auth_password: "Password",
    auth_login: "Login",
    auth_register: "Register",
    auth_no_account: "Don't have an account?",
    auth_create: "Create Account",
    auth_start: "Start learning Korean today",
    auth_fullname: "Full Name",
    auth_have_account: "Already have an account?",
    auth_forgot: "Forgot?",
    auth_reset: "Reset Password",
    auth_send_link: "Send Reset Link",
    auth_back: "Back to Login",

    // Landing
    hero_title: "Learn Korean",
    hero_subtitle: "Without English!",
    hero_desc: "Join the interactive cultural evening. Try live AI translation and learn from native speakers directly from Seoul.",
    hero_spots: "Spots filling up",
    hero_live: "Live on Zoom",
    hero_cta: "Register Free",
    
    // Dashboard
    dash_hello: "Hello",
    dash_ready: "Ready to learn Korean today?",
    dash_streak: "Streak",
    dash_xp: "Total XP",
    dash_my_courses: "My Courses",
    dash_live_credits: "Live Credits",
    dash_files: "Files",
    dash_view_catalog: "View Catalog",
    dash_book_new: "Book New",
    dash_go_files: "Go to Files",
    dash_league: "Your League",
    dash_upcoming: "Upcoming Live",
    dash_no_courses: "You haven't started any course yet.",
    dash_start_now: "Start Now",
    dash_no_live: "No live lessons booked.",

    // Courses
    course_catalog: "Course Catalog",
    course_desc: "Choose between live courses or video on-demand.",
    course_search: "Search...",
    course_filter_all: "All",
    course_filter_owned: "My Courses",
    course_filter_not: "Not Owned",
    course_access: "Access Course",
    course_enroll: "Enroll",
    course_no_results: "No courses found matching your criteria.",
    
    // Live
    live_schedule: "Live Schedule",
    live_desc: "Upcoming single sessions. Book your spot!",
    live_book: "Book Spot",
    live_join: "Join Zoom",
    live_confirmed: "Confirmed",
    live_closed: "Closed",
    live_expired: "Ended",

    // Store
    store_title: "Digital Store",
    store_desc: "Ebooks, Planners, and Downloadable Resources.",
    store_buy: "Buy",
    store_download: "Go to Downloads",

    // Profile
    prof_title: "Your Profile",
    prof_desc: "Manage your personal information and security.",
    prof_student: "Student",
    prof_save: "Save Profile",
    prof_security: "Security",
    prof_new_pass: "New Password",
    prof_confirm_pass: "Confirm",
    prof_update: "Update Password",
    prof_orders: "Order History",
    prof_no_orders: "No orders yet.",

    // Common
    btn_loading: "Loading...",
    btn_send: "Send Message",
    footer_rights: "All rights reserved."
  },
  hu: {
    // Navbar
    nav_about: "Rólunk",
    nav_tutors: "Tanárok",
    nav_login: "Belépés",
    nav_dashboard: "Irányítópult",
    nav_book: "Webinárium Foglalás",

    // Auth
    auth_welcome: "Üdv újra!",
    auth_access: "Lépj be a tanulói felületre",
    auth_email: "Email",
    auth_password: "Jelszó",
    auth_login: "Belépés",
    auth_register: "Regisztráció",
    auth_no_account: "Nincs még fiókod?",
    auth_create: "Fiók Létrehozása",
    auth_start: "Kezdj el koreaiul tanulni ma",
    auth_fullname: "Teljes Név",
    auth_have_account: "Van már fiókod?",
    auth_forgot: "Elfelejtetted?",
    auth_reset: "Jelszó Visszaállítása",
    auth_send_link: "Link Küldése",
    auth_back: "Vissza a belépéshez",

    // Landing
    hero_title: "Tanulj Koreaiul",
    hero_subtitle: "Angol nélkül!",
    hero_desc: "Csatlakozz az interaktív kulturális esthez. Próbáld ki az élő AI fordítást és tanulj anyanyelvi tanároktól közvetlenül Szöulból.",
    hero_spots: "A helyek fogynak",
    hero_live: "Élőben Zoom-on",
    hero_cta: "Ingyenes Regisztráció",

    // Dashboard
    dash_hello: "Szia",
    dash_ready: "Készen állsz a tanulásra?",
    dash_streak: "Széria",
    dash_xp: "Összes XP",
    dash_my_courses: "Kurzusaim",
    dash_live_credits: "Élő Kreditek",
    dash_files: "Fájlok",
    dash_view_catalog: "Katalógus",
    dash_book_new: "Foglalás",
    dash_go_files: "Fájlokhoz",
    dash_league: "Ligád",
    dash_upcoming: "Következő Élő",
    dash_no_courses: "Még nem kezdtél el egy kurzust sem.",
    dash_start_now: "Kezdés Most",
    dash_no_live: "Nincs foglalt óra.",

    // Courses
    course_catalog: "Kurzus Katalógus",
    course_desc: "Válassz az élő órák vagy videós kurzusok közül.",
    course_search: "Keresés...",
    course_filter_all: "Összes",
    course_filter_owned: "Saját Kurzusok",
    course_filter_not: "Nem Birtokolt",
    course_access: "Kurzus Megnyitása",
    course_enroll: "Beiratkozás",
    course_no_results: "Nincs találat a keresési feltételekre.",

    // Live
    live_schedule: "Élő Órarend",
    live_desc: "Következő alkalmak. Foglald le a helyed!",
    live_book: "Helyfoglalás",
    live_join: "Zoom Belépés",
    live_confirmed: "Megerősítve",
    live_closed: "Lezárt",
    live_expired: "Véget ért",

    // Store
    store_title: "Digitális Bolt",
    store_desc: "E-könyvek, Tervezők és Letölthető Anyagok.",
    store_buy: "Vásárlás",
    store_download: "Letöltésekhez",

    // Profile
    prof_title: "Profilod",
    prof_desc: "Kezeld a személyes adataidat és a biztonságot.",
    prof_student: "Tanuló",
    prof_save: "Profil Mentése",
    prof_security: "Biztonság",
    prof_new_pass: "Új Jelszó",
    prof_confirm_pass: "Megerősítés",
    prof_update: "Jelszó Frissítése",
    prof_orders: "Rendelési Előzmények",
    prof_no_orders: "Nincs még rendelés.",

    // Common
    btn_loading: "Betöltés...",
    btn_send: "Üzenet Küldése",
    footer_rights: "Minden jog fenntartva."
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

  const t = (key) => translations[lang][key] || key

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
