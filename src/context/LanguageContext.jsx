import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

const translations = {
  en: {
    // NAVBAR
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

    // LANDING PAGE - HERO
    hero_title: "Learn Korean",
    hero_subtitle: "Without English!",
    hero_desc: "Join the interactive cultural evening. Try live AI translation and learn from native speakers directly from Seoul.",
    hero_spots: "Spots filling up",
    hero_live: "Live on Zoom",
    hero_cta: "Register Free",
    hero_students: "+500 students",
    hero_powered: "Powered by Technology",

    // LANDING PAGE - BENEFITS
    ben_title: "Why is this event unmissable?",
    ben_subtitle: "We removed the barriers. Focus only on the fun of learning.",
    ben_1_title: "No English Required",
    ben_1_desc: "Our AI technology translates teacher's words into your language in real-time.",
    ben_2_title: "100% Authentic",
    ben_2_desc: "Live from Seoul. Learn correct pronunciation and intonation directly from the source.",
    ben_3_title: "Cultural Experience",
    ben_3_desc: "Not just grammar! We talk about table etiquette, K-Drama slang, and modern culture.",

    // LANDING PAGE - TEACHERS
    teacher_title: "Your Native Teachers",
    teacher_subtitle: "Live from Seoul to guide you.",
    teacher_kim_role: "Beginner Specialist",
    teacher_kim_bio: "Kim loves introducing beginners to the language with energy and patience. A fan of Seoul's cafe culture.",
    teacher_lee_role: "Pronunciation Coach",
    teacher_lee_bio: "Focuses on clean pronunciation and cultural nuances. He is a big foodie and knows the best restaurants.",

    // LANDING PAGE - AGENDA
    agenda_title: "Evening Agenda",
    agenda_1_title: "Cultural Immersion (Intro)",
    agenda_1_desc: "Meet the teachers, tech setup, and cultural introduction.",
    agenda_2_title: "The Mini-Lesson (The Trial)",
    agenda_2_desc: "We learn the first real dialogue. Testing AI translation live.",
    agenda_3_title: "Q&A & Exclusive Gifts",
    agenda_3_desc: "Answering questions. Every participant receives the 'Survival Vocabulary' PDF.",
    agenda_faq_title: "Quick FAQ",
    agenda_faq_1_q: "Do I need to install software?",
    agenda_faq_1_a: "No. You will receive a standard Zoom link.",
    agenda_faq_2_q: "Do I need my camera on?",
    agenda_faq_2_a: "Absolutely not. You can participate as a viewer.",
    agenda_faq_3_q: "I'm a total beginner, can I come?",
    agenda_faq_3_a: "Yes! This event is specifically designed for those who have never studied Korean.",

    // LANDING PAGE - OFFER
    offer_title: "Secure your spot now!",
    offer_subtitle: "Zoom room capacity is limited.",
    offer_free: "FREE",
    offer_pass: "Open Day Pass",
    offer_feat_1: "60 minutes live from Korea",
    offer_feat_2: "Access to AI translation",
    offer_feat_3: "Mini-lesson participation",
    offer_feat_4: "BONUS: Survival Vocabulary PDF",
    offer_btn: "Claim My Free Pass",
    offer_no_cc: "No credit card required.",

    // LANDING PAGE - TESTIMONIALS
    testi_title: "What students say?",
    testi_1_text: "I was afraid I wouldn't understand anything, but with the subtitles I felt immediately comfortable! It was incredible.",
    testi_1_author: "Esther, K-Drama Fan",
    testi_2_text: "Finally I don't have to learn English to study Korean! This method is a lifesaver. The teachers are super funny.",
    testi_2_author: "David, Absolute Beginner",

    // WEBINAR FORM
    web_title: "Reserve Your Spot",
    web_name: "Full Name",
    web_name_ph: "e.g. John Doe",
    web_email: "Email",
    web_date: "Choose a Date",
    web_gdpr: "I agree to the data processing according to the Privacy Policy.",
    web_btn: "REGISTER FREE NOW",
    web_btn_loading: "REGISTERING...",
    web_secure: "Your data is safe. No spam.",
    web_success_title: "Registration Confirmed! 🎉",
    web_success_desc: "Thanks! We've reserved your spot. Check your email for the Zoom link.",

    // AUTH
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
    auth_register_success: "Registration successful! Please check your email.",
    auth_login_error: "Login error:",

    // DASHBOARD
    dash_hello: "Hello",
    dash_ready: "Ready to learn Korean today?",
    dash_streak: "Streak",
    dash_xp: "Total XP",
    dash_days: "Days",
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
    dash_join: "Join Zoom",

    // COURSES & PLAYER
    course_catalog: "Course Catalog",
    course_desc: "Choose between live courses or video on-demand.",
    course_search: "Search...",
    course_filter_all: "All",
    course_filter_owned: "My Courses",
    course_filter_not: "Not Owned",
    course_access: "Access Course",
    course_enroll: "Enroll",
    course_no_results: "No courses found matching your criteria.",
    player_locked: "Locked Content",
    player_unlock: "Unlock for",
    player_no_lessons: "No lessons available",
    player_content: "Lesson Content",
    player_quiz: "Take Quiz",
    player_mark_complete: "Mark Complete",
    player_completed: "Completed",
    player_prev: "Previous",
    player_next: "Next Lesson",
    player_report: "Report Issue",
    player_flashcards: "Flashcards",
    player_download_pdf: "Download PDF",
    player_curriculum: "Curriculum",
    player_cert: "Certificate",

    // COMPONENTS
    quiz_question: "Question",
    quiz_score: "Score",
    quiz_finish: "Finish Quiz",
    quiz_next: "Next Question",
    quiz_completed: "Quiz Completed!",
    quiz_scored: "You scored",
    quiz_retry: "Retry Quiz",
    vocab_title: "Vocabulary Drill",
    vocab_reveal: "Tap to reveal",
    vocab_hard: "Hard",
    vocab_easy: "Easy",
    vocab_complete: "Drill Complete!",
    vocab_retry: "Practice Again",
    review_title: "Student Reviews",
    review_subtitle: "What people think about this course.",
    review_write: "Write a Review",
    review_placeholder: "Share your experience...",
    review_submit: "Post Review",
    review_no_reviews: "No reviews yet. Be the first!",
    notes_title: "Class Notes",
    notes_placeholder: "Type vocabulary, grammar rules...",
    notes_save: "Save Note",
    notes_saving: "Saving...",
    notes_saved: "Saved",
    report_title: "Report Issue",
    report_desc: "Found a bug or translation error? Let us know.",
    report_placeholder: "Describe the issue...",
    report_btn: "Send Report",
    report_sent: "Thanks for the feedback!",

    // STORE & DOWNLOADS
    store_title: "Digital Store",
    store_desc: "Ebooks, Planners, and Downloadable Resources.",
    store_buy: "Buy",
    store_download: "Go to Downloads",
    dl_title: "My Downloads",
    dl_desc: "Access the digital files you purchased.",
    dl_empty: "You haven't purchased any Ebooks yet.",
    dl_btn: "Download File",

    // LIVE LESSONS
    live_schedule: "Live Schedule",
    live_desc: "Upcoming single sessions. Book your spot!",
    live_book: "Book Spot",
    live_join: "Join Zoom",
    live_confirmed: "Confirmed",
    live_closed: "Closed",
    live_expired: "Ended",
    live_tba: "TBA",

    // PROFILE & NOTEBOOK
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
    nb_title: "Study Notebook",
    nb_desc: "All your notes from every course, collected in one place.",
    nb_empty: "Your notebook is empty",
    nb_cta: "Start watching lessons and take notes to see them here.",
    leader_title: "Hall of Fame",
    leader_desc: "Top students this month. Keep learning to rise up!",

    // PAYMENT
    pay_secure: "Secure Checkout",
    pay_card: "Card Number",
    pay_expiry: "Expiry",
    pay_cvc: "CVC",
    pay_btn: "Pay",
    pay_processing: "Processing Payment...",
    pay_success: "Payment Successful!",
    pay_redirect: "Redirecting to your content...",

    // FOOTER
    footer_about: "About Us",
    footer_teachers: "Teachers",
    footer_faq: "FAQ",
    footer_contact: "Contact",
    footer_privacy: "Privacy",
    footer_terms: "Terms",
    footer_rights: "All rights reserved.",

    // ABOUT PAGE
    about_title: "Our Mission",
    about_subtitle: "Making the Korean language accessible to everyone, breaking down the English barrier.",
    about_who_title: "Who We Are",
    about_who_p1: "Annyeong Academy was born from the idea of a group of native Korean teachers and passionate students.",
    about_who_p2: "We decided to change things using advanced AI technology.",

    // CONTACT PAGE
    contact_title: "Contact Us",
    contact_desc: "Have questions? We are here to help.",
    contact_name: "Name",
    contact_msg: "Message",
    contact_sent: "Message Sent!",
    contact_reply: "We will reply within 24 hours.",

    // FAQ PAGE
    faq_title: "Frequently Asked Questions",
    faq_desc: "Everything you need to know.",
    faq_1_q: "How do Live courses work?",
    faq_1_a: "Live courses take place on Zoom at scheduled times.",
    faq_2_q: "Can I download videos?",
    faq_2_a: "Videos are streaming only. PDFs and audio are downloadable.",
    faq_3_q: "Do you issue certificates?",
    faq_3_a: "Yes, upon course completion.",
    faq_4_q: "Payment methods?",
    faq_4_a: "Major credit cards via Stripe.",
    faq_5_q: "Textbooks?",
    faq_5_a: "All materials included.",

    // TUTORS PAGE
    tutors_title: "Our Teachers",
    tutors_desc: "Certified native professionals.",
    tutor_1_role: "Head of Dept & Beginners",
    tutor_1_bio: "Graduated in linguistics. Developed our Direct-Translation method.",
    tutor_2_role: "Pronunciation & Conversation",
    tutor_2_bio: "Specializes in perfect intonation and standard Seoul pronunciation.",
    tutor_3_role: "TOPIK Preparation",
    tutor_3_bio: "10 years of experience preparing students for exams.",

    // CERTIFICATE
    cert_title: "Certificate",
    cert_subtitle: "of Completion",
    cert_verify: "This is to certify that",
    cert_completed: "has successfully completed the course",
    cert_date: "Date",
    cert_seal: "Annyeong\nAcademy\nSeal",
    cert_role: "Head Teacher",

    // COMMON
    cookie_text: "We use cookies to ensure you get the best experience.",
    cookie_accept: "Accept",
    btn_loading: "Loading...",
    btn_send: "Send Message",
    not_found: "Page Not Found",
    back_home: "Back to Home",
    privacy_title: "Privacy Policy",
    terms_title: "Terms and Conditions"
  },
  hu: {
    // NAVBAR
    nav_about: "Rólunk",
    nav_tutors: "Tanárok",
    nav_login: "Belépés",
    nav_dashboard: "Irányítópult",
    nav_book: "Webinárium",
    nav_courses: "Kurzusok",
    nav_notebook: "Jegyzetfüzet",
    nav_leaderboard: "Ranglista",
    nav_live: "Élő Órák",
    nav_store: "Bolt & Ebook",
    nav_downloads: "Letöltések",
    nav_profile: "Profil",
    nav_logout: "Kijelentkezés",
    nav_admin: "Admin",
    nav_management: "Kezelés",

    // LANDING PAGE - HERO
    hero_title: "Tanulj Koreaiul",
    hero_subtitle: "Angol nélkül!",
    hero_desc: "Csatlakozz az interaktív kulturális esthez. Próbáld ki az élő AI fordítást és tanulj anyanyelvi tanároktól közvetlenül Szöulból.",
    hero_spots: "A helyek fogynak",
    hero_live: "Élőben Zoom-on",
    hero_cta: "Ingyenes Regisztráció",
    hero_students: "+500 tanuló",
    hero_powered: "Technológia: ",

    // LANDING PAGE - BENEFITS
    ben_title: "Miért kihagyhatatlan?",
    ben_subtitle: "Lebontottuk az akadályokat. Csak a tanulás örömére koncentrálj.",
    ben_1_title: "Nem Kell Angol",
    ben_1_desc: "AI technológiánk valós időben fordítja a tanár szavait magyarra.",
    ben_2_title: "100% Autentikus",
    ben_2_desc: "Élőben Szöulból. Tanuld meg a helyes kiejtést közvetlenül a forrásból.",
    ben_3_title: "Kulturális Élmény",
    ben_3_desc: "Nem csak nyelvtan! Beszélünk az étkezési etikettről és a K-Drama szlengről.",

    // LANDING PAGE - TEACHERS
    teacher_title: "Anyanyelvi Tanáraid",
    teacher_subtitle: "Élőben Szöulból, hogy vezessenek.",
    teacher_kim_role: "Kezdő Specialista",
    teacher_kim_bio: "Kim imádja bevezetni a kezdőket a nyelv rejtelmeibe energiával és türelemmel. A szöuli kávézókultúra rajongója.",
    teacher_lee_role: "Kiejtés Tréner",
    teacher_lee_bio: "A tiszta kiejtésre és a kulturális árnyalatokra fókuszál. Nagy ínyenc, ismeri a legjobb éttermeket.",

    // LANDING PAGE - AGENDA
    agenda_title: "Az Est Programja",
    agenda_1_title: "Kulturális Merülés (Intro)",
    agenda_1_desc: "Találkozás a tanárokkal, technikai beállítás, kulturális bevezető.",
    agenda_2_title: "A Mini-Lecke",
    agenda_2_desc: "Megtanuljuk az első valós párbeszédet. Az AI fordítás élő tesztelése.",
    agenda_3_title: "Kérdések & Ajándékok",
    agenda_3_desc: "Válaszolunk a kérdésekre. Minden résztvevő megkapja a 'Túlélő Szókincs' PDF-et.",
    agenda_faq_title: "Gyors GYIK",
    agenda_faq_1_q: "Kell szoftvert telepítenem?",
    agenda_faq_1_a: "Nem. Egy szabványos Zoom linket kapsz.",
    agenda_faq_2_q: "Kell bekapcsolnom a kamerát?",
    agenda_faq_2_a: "Egyáltalán nem. Nézőként is részt vehetsz.",
    agenda_faq_3_q: "Teljesen kezdő vagyok, jöhetek?",
    agenda_faq_3_a: "Igen! Ezt az eseményt kifejezetten azoknak terveztük, akik még sosem tanultak koreaiul.",

    // LANDING PAGE - OFFER
    offer_title: "Biztosítsd a helyed most!",
    offer_subtitle: "A Zoom szoba kapacitása korlátozott.",
    offer_free: "INGYENES",
    offer_pass: "Nyílt Nap Belépő",
    offer_feat_1: "60 perc élőben Koreából",
    offer_feat_2: "AI fordítás hozzáférés",
    offer_feat_3: "Részvétel a mini-leckén",
    offer_feat_4: "BÓNUSZ: Túlélő Szókincs PDF",
    offer_btn: "Ingyenes Belépő Igénylése",
    offer_no_cc: "Bankkártya nem szükséges.",

    // LANDING PAGE - TESTIMONIALS
    testi_title: "Mit mondanak a tanulók?",
    testi_1_text: "Féltem, hogy nem értek majd semmit, de a feliratokkal azonnal otthon éreztem magam! Hihetetlen volt.",
    testi_1_author: "Eszter, K-Drama Rajongó",
    testi_2_text: "Végre nem kell angolul tudnom ahhoz, hogy koreaiul tanuljak! Ez a módszer életmentő. A tanárok nagyon viccesek.",
    testi_2_author: "Dávid, Teljesen Kezdő",

    // WEBINAR FORM
    web_title: "Foglald le a helyed",
    web_name: "Teljes Név",
    web_name_ph: "pl. Kovács János",
    web_email: "Email",
    web_date: "Válassz időpontot",
    web_gdpr: "Elfogadom az adatkezelési tájékoztatót.",
    web_btn: "INGYENES REGISZTRÁCIÓ",
    web_btn_loading: "REGISZTRÁCIÓ...",
    web_secure: "Adataid biztonságban vannak. Nincs spam.",
    web_success_title: "Sikeres Regisztráció! 🎉",
    web_success_desc: "Köszönjük! A helyed biztosítva van. A Zoom linket emailben küldjük.",

    // AUTH
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
    auth_register_success: "Sikeres regisztráció! Kérlek ellenőrizd az email fiókod.",
    auth_login_error: "Belépési hiba:",

    // DASHBOARD
    dash_hello: "Szia",
    dash_ready: "Készen állsz a tanulásra?",
    dash_streak: "Széria",
    dash_xp: "Összes XP",
    dash_days: "Nap",
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
    dash_join: "Zoom Belépés",

    // COURSES & PLAYER
    course_catalog: "Kurzus Katalógus",
    course_desc: "Válassz az élő órák vagy videós kurzusok közül.",
    course_search: "Keresés...",
    course_filter_all: "Összes",
    course_filter_owned: "Saját Kurzusok",
    course_filter_not: "Nem Birtokolt",
    course_access: "Kurzus Megnyitása",
    course_enroll: "Beiratkozás",
    course_no_results: "Nincs találat.",
    player_locked: "Lezárt Tartalom",
    player_unlock: "Feloldás:",
    player_no_lessons: "Nincsenek leckék",
    player_content: "Lecke Tartalma",
    player_quiz: "Kvíz Kitöltése",
    player_mark_complete: "Befejezve",
    player_completed: "Kész",
    player_prev: "Előző",
    player_next: "Következő",
    player_report: "Hiba Jelentése",
    player_flashcards: "Szókártyák",
    player_download_pdf: "PDF Letöltése",
    player_curriculum: "Tanmenet",
    player_cert: "Oklevél",

    // COMPONENTS
    quiz_question: "Kérdés",
    quiz_score: "Pontszám",
    quiz_finish: "Kvíz Befejezése",
    quiz_next: "Következő Kérdés",
    quiz_completed: "Kvíz Kitöltve!",
    quiz_scored: "Elért pontszám:",
    quiz_retry: "Újra",
    vocab_title: "Szókincs Gyakorló",
    vocab_reveal: "Koppints a fordításhoz",
    vocab_hard: "Nehéz",
    vocab_easy: "Könnyű",
    vocab_complete: "Gyakorlás Kész!",
    vocab_retry: "Újra",
    review_title: "Tanulói Vélemények",
    review_subtitle: "Mit gondolnak mások erről a kurzusról.",
    review_write: "Írj véleményt",
    review_placeholder: "Oszd meg a tapasztalataidat...",
    review_submit: "Küldés",
    review_no_reviews: "Még nincsenek vélemények. Legyél te az első!",
    notes_title: "Órai Jegyzetek",
    notes_placeholder: "Írj szavakat, nyelvtani szabályokat...",
    notes_save: "Mentés",
    notes_saving: "Mentés...",
    notes_saved: "Mentve",
    report_title: "Hiba Jelentése",
    report_desc: "Hibát vagy fordítási pontatlanságot találtál? Jelezd nekünk.",
    report_placeholder: "Írd le a problémát...",
    report_btn: "Jelentés Küldése",
    report_sent: "Köszönjük a visszajelzést!",

    // STORE & DOWNLOADS
    store_title: "Digitális Bolt",
    store_desc: "E-könyvek, Tervezők és Letölthető Anyagok.",
    store_buy: "Vásárlás",
    store_download: "Letöltésekhez",
    dl_title: "Letöltéseim",
    dl_desc: "A megvásárolt digitális fájlok elérése.",
    dl_empty: "Még nem vásároltál E-könyvet.",
    dl_btn: "Fájl Letöltése",

    // LIVE LESSONS
    live_schedule: "Élő Órarend",
    live_desc: "Következő alkalmak. Foglald le a helyed!",
    live_book: "Helyfoglalás",
    live_join: "Zoom Belépés",
    live_confirmed: "Megerősítve",
    live_closed: "Lezárt",
    live_expired: "Véget ért",
    live_tba: "TBA",

    // PROFILE & NOTEBOOK
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
    nb_title: "Tanulói Jegyzetfüzet",
    nb_desc: "Minden jegyzeted egy helyen.",
    nb_empty: "A jegyzetfüzeted üres",
    nb_cta: "Kezdj el leckéket nézni és jegyzetelni.",
    leader_title: "Dicsőségcsarnok",
    leader_desc: "A hónap legjobb tanulói. Tanulj és kerülj feljebb!",

    // PAYMENT
    pay_secure: "Biztonságos Fizetés",
    pay_card: "Kártyaszám",
    pay_expiry: "Lejárat",
    pay_cvc: "CVC",
    pay_btn: "Fizetés",
    pay_processing: "Feldolgozás...",
    pay_success: "Sikeres Fizetés!",
    pay_redirect: "Átirányítás a tartalomhoz...",

    // FOOTER
    footer_about: "Rólunk",
    footer_teachers: "Tanárok",
    footer_faq: "GYIK",
    footer_contact: "Kapcsolat",
    footer_privacy: "Adatvédelem",
    footer_terms: "Feltételek",
    footer_rights: "Minden jog fenntartva.",

    // ABOUT PAGE
    about_title: "Küldetésünk",
    about_subtitle: "A koreai nyelv elérhetővé tétele mindenki számára, az angol nyelvi akadályok lebontásával.",
    about_who_title: "Kik Vagyunk",
    about_who_p1: "Az Annyeong Akadémia anyanyelvi koreai tanárok és lelkes diákok ötletéből született.",
    about_who_p2: "Elhatároztuk, hogy változtatunk ezen. Fejlett AI technológiát használva.",

    // CONTACT PAGE
    contact_title: "Kapcsolat",
    contact_desc: "Kérdésed van a kurzusokkal vagy a webináriummal kapcsolatban? Itt vagyunk, hogy segítsünk.",
    contact_name: "Név",
    contact_msg: "Üzenet",
    contact_sent: "Üzenet Elküldve!",
    contact_reply: "24 órán belül válaszolunk.",

    // FAQ PAGE
    faq_title: "Gyakori Kérdések",
    faq_desc: "Minden, amit tudnod kell.",
    faq_1_q: "Hogyan működnek az Élő órák?",
    faq_1_a: "Az élő órák Zoom-on zajlanak előre megadott időpontokban.",
    faq_2_q: "Letölthetem a videókat?",
    faq_2_a: "Szerzői jogi okokból a videók csak streamelhetők.",
    faq_3_q: "Adtok oklevelet?",
    faq_3_a: "Igen, a kurzus teljesítése után.",
    faq_4_q: "Milyen fizetési módokat fogadtok el?",
    faq_4_a: "Minden nagyobb bankkártyát elfogadunk a Stripe rendszerén keresztül.",
    faq_5_q: "Kell külön tankönyvet vennem?",
    faq_5_a: "Nem. Minden tananyagot tartalmaz a kurzus ára.",

    // TUTORS PAGE
    tutors_title: "Tanáraink",
    tutors_desc: "Szakképzett anyanyelvi profik.",
    tutor_1_role: "Tanszékvezető & Kezdők",
    tutor_1_bio: "A Szöuli Nemzeti Egyetemen végzett nyelvészetből. Kidolgozta a 'Közvetlen Fordítás' módszertant.",
    tutor_2_role: "Kiejtés & Társalgás",
    tutor_2_bio: "Korábbi színházi színész, a tökéletes intonációra specializálódott.",
    tutor_3_role: "TOPIK Felkészítés",
    tutor_3_bio: "10 éves akadémiai tapasztalattal készít fel a nyelvvizsgákra.",

    // CERTIFICATE
    cert_title: "Oklevél",
    cert_subtitle: "a teljesítésről",
    cert_verify: "Ezennel igazoljuk, hogy",
    cert_completed: "sikeresen elvégezte a következő kurzust:",
    cert_date: "Dátum",
    cert_seal: "Annyeong\nAkadémia\nPecsét",
    cert_role: "Vezető Tanár",

    // COMMON
    cookie_text: "Sütiket használunk a jobb felhasználói élmény érdekében.",
    cookie_accept: "Elfogadom",
    btn_loading: "Betöltés...",
    btn_send: "Üzenet Küldése",
    not_found: "Az oldal nem található",
    back_home: "Vissza a Főoldalra",
    privacy_title: "Adatvédelmi Irányelvek",
    terms_title: "Felhasználási Feltételek"
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
