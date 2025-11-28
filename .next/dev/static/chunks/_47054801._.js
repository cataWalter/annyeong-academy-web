(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/context/LanguageContext.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LanguageProvider",
    ()=>LanguageProvider,
    "useLanguage",
    ()=>useLanguage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
const LanguageContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])();
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
};
function LanguageProvider({ children }) {
    _s();
    const [lang, setLang] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('en');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LanguageProvider.useEffect": ()=>{
            const saved = localStorage.getItem('app_lang');
            if (saved) setLang(saved);
        }
    }["LanguageProvider.useEffect"], []);
    const toggleLanguage = ()=>{
        const newLang = lang === 'en' ? 'hu' : 'en';
        setLang(newLang);
        localStorage.setItem('app_lang', newLang);
    };
    const t = (key)=>{
        return translations[lang][key] || key;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageContext.Provider, {
        value: {
            lang,
            toggleLanguage,
            t
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/LanguageContext.jsx",
        lineNumber: 633,
        columnNumber: 5
    }, this);
}
_s(LanguageProvider, "IZSnqxuBuRjfXmXvrAq3O0uY2vU=");
_c = LanguageProvider;
const useLanguage = ()=>{
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(LanguageContext);
};
_s1(useLanguage, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
var _c;
__turbopack_context__.k.register(_c, "LanguageProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/not-found.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NotFound
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$home$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/home.js [app-client] (ecmascript) <export default as Home>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$LanguageContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/LanguageContext.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function NotFound() {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$LanguageContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex flex-col items-center justify-center bg-[#F8F9FC] text-center px-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-9xl font-black text-gray-200 select-none",
                children: "404"
            }, void 0, false, {
                fileName: "[project]/src/app/not-found.jsx",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute mt-[-2rem]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-3xl font-bold text-brand-dark mb-4",
                        children: t('not_found')
                    }, void 0, false, {
                        fileName: "[project]/src/app/not-found.jsx",
                        lineNumber: 12,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        to: "/",
                        className: "inline-flex items-center gap-2 bg-brand-purple text-white px-6 py-3 rounded-full font-bold hover:opacity-90 transition shadow-lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$home$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"], {
                                size: 20
                            }, void 0, false, {
                                fileName: "[project]/src/app/not-found.jsx",
                                lineNumber: 17,
                                columnNumber: 11
                            }, this),
                            " ",
                            t('back_home')
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/not-found.jsx",
                        lineNumber: 13,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/not-found.jsx",
                lineNumber: 11,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/not-found.jsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_s(NotFound, "ot2YhC7pP10gRrIouBKIa40vomw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$LanguageContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"]
    ];
});
_c = NotFound;
var _c;
__turbopack_context__.k.register(_c, "NotFound");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/dist/shared/lib/router/utils/querystring.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    assign: null,
    searchParamsToUrlQuery: null,
    urlQueryToSearchParams: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    assign: function() {
        return assign;
    },
    searchParamsToUrlQuery: function() {
        return searchParamsToUrlQuery;
    },
    urlQueryToSearchParams: function() {
        return urlQueryToSearchParams;
    }
});
function searchParamsToUrlQuery(searchParams) {
    const query = {};
    for (const [key, value] of searchParams.entries()){
        const existing = query[key];
        if (typeof existing === 'undefined') {
            query[key] = value;
        } else if (Array.isArray(existing)) {
            existing.push(value);
        } else {
            query[key] = [
                existing,
                value
            ];
        }
    }
    return query;
}
function stringifyUrlQueryParam(param) {
    if (typeof param === 'string') {
        return param;
    }
    if (typeof param === 'number' && !isNaN(param) || typeof param === 'boolean') {
        return String(param);
    } else {
        return '';
    }
}
function urlQueryToSearchParams(query) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(query)){
        if (Array.isArray(value)) {
            for (const item of value){
                searchParams.append(key, stringifyUrlQueryParam(item));
            }
        } else {
            searchParams.set(key, stringifyUrlQueryParam(value));
        }
    }
    return searchParams;
}
function assign(target, ...searchParamsList) {
    for (const searchParams of searchParamsList){
        for (const key of searchParams.keys()){
            target.delete(key);
        }
        for (const [key, value] of searchParams.entries()){
            target.append(key, value);
        }
    }
    return target;
} //# sourceMappingURL=querystring.js.map
}),
"[project]/node_modules/next/dist/shared/lib/router/utils/format-url.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Format function modified from nodejs
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    formatUrl: null,
    formatWithValidation: null,
    urlObjectKeys: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    formatUrl: function() {
        return formatUrl;
    },
    formatWithValidation: function() {
        return formatWithValidation;
    },
    urlObjectKeys: function() {
        return urlObjectKeys;
    }
});
const _interop_require_wildcard = __turbopack_context__.r("[project]/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _querystring = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/querystring.js [app-client] (ecmascript)"));
const slashedProtocols = /https?|ftp|gopher|file/;
function formatUrl(urlObj) {
    let { auth, hostname } = urlObj;
    let protocol = urlObj.protocol || '';
    let pathname = urlObj.pathname || '';
    let hash = urlObj.hash || '';
    let query = urlObj.query || '';
    let host = false;
    auth = auth ? encodeURIComponent(auth).replace(/%3A/i, ':') + '@' : '';
    if (urlObj.host) {
        host = auth + urlObj.host;
    } else if (hostname) {
        host = auth + (~hostname.indexOf(':') ? `[${hostname}]` : hostname);
        if (urlObj.port) {
            host += ':' + urlObj.port;
        }
    }
    if (query && typeof query === 'object') {
        query = String(_querystring.urlQueryToSearchParams(query));
    }
    let search = urlObj.search || query && `?${query}` || '';
    if (protocol && !protocol.endsWith(':')) protocol += ':';
    if (urlObj.slashes || (!protocol || slashedProtocols.test(protocol)) && host !== false) {
        host = '//' + (host || '');
        if (pathname && pathname[0] !== '/') pathname = '/' + pathname;
    } else if (!host) {
        host = '';
    }
    if (hash && hash[0] !== '#') hash = '#' + hash;
    if (search && search[0] !== '?') search = '?' + search;
    pathname = pathname.replace(/[?#]/g, encodeURIComponent);
    search = search.replace('#', '%23');
    return `${protocol}${host}${pathname}${search}${hash}`;
}
const urlObjectKeys = [
    'auth',
    'hash',
    'host',
    'hostname',
    'href',
    'path',
    'pathname',
    'port',
    'protocol',
    'query',
    'search',
    'slashes'
];
function formatWithValidation(url) {
    if ("TURBOPACK compile-time truthy", 1) {
        if (url !== null && typeof url === 'object') {
            Object.keys(url).forEach((key)=>{
                if (!urlObjectKeys.includes(key)) {
                    console.warn(`Unknown key passed via urlObject into url.format: ${key}`);
                }
            });
        }
    }
    return formatUrl(url);
} //# sourceMappingURL=format-url.js.map
}),
"[project]/node_modules/next/dist/client/use-merged-ref.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useMergedRef", {
    enumerable: true,
    get: function() {
        return useMergedRef;
    }
});
const _react = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
function useMergedRef(refA, refB) {
    const cleanupA = (0, _react.useRef)(null);
    const cleanupB = (0, _react.useRef)(null);
    // NOTE: In theory, we could skip the wrapping if only one of the refs is non-null.
    // (this happens often if the user doesn't pass a ref to Link/Form/Image)
    // But this can cause us to leak a cleanup-ref into user code (previously via `<Link legacyBehavior>`),
    // and the user might pass that ref into ref-merging library that doesn't support cleanup refs
    // (because it hasn't been updated for React 19)
    // which can then cause things to blow up, because a cleanup-returning ref gets called with `null`.
    // So in practice, it's safer to be defensive and always wrap the ref, even on React 19.
    return (0, _react.useCallback)((current)=>{
        if (current === null) {
            const cleanupFnA = cleanupA.current;
            if (cleanupFnA) {
                cleanupA.current = null;
                cleanupFnA();
            }
            const cleanupFnB = cleanupB.current;
            if (cleanupFnB) {
                cleanupB.current = null;
                cleanupFnB();
            }
        } else {
            if (refA) {
                cleanupA.current = applyRef(refA, current);
            }
            if (refB) {
                cleanupB.current = applyRef(refB, current);
            }
        }
    }, [
        refA,
        refB
    ]);
}
function applyRef(refA, current) {
    if (typeof refA === 'function') {
        const cleanup = refA(current);
        if (typeof cleanup === 'function') {
            return cleanup;
        } else {
            return ()=>refA(null);
        }
    } else {
        refA.current = current;
        return ()=>{
            refA.current = null;
        };
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=use-merged-ref.js.map
}),
"[project]/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    DecodeError: null,
    MiddlewareNotFoundError: null,
    MissingStaticPage: null,
    NormalizeError: null,
    PageNotFoundError: null,
    SP: null,
    ST: null,
    WEB_VITALS: null,
    execOnce: null,
    getDisplayName: null,
    getLocationOrigin: null,
    getURL: null,
    isAbsoluteUrl: null,
    isResSent: null,
    loadGetInitialProps: null,
    normalizeRepeatedSlashes: null,
    stringifyError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    DecodeError: function() {
        return DecodeError;
    },
    MiddlewareNotFoundError: function() {
        return MiddlewareNotFoundError;
    },
    MissingStaticPage: function() {
        return MissingStaticPage;
    },
    NormalizeError: function() {
        return NormalizeError;
    },
    PageNotFoundError: function() {
        return PageNotFoundError;
    },
    SP: function() {
        return SP;
    },
    ST: function() {
        return ST;
    },
    WEB_VITALS: function() {
        return WEB_VITALS;
    },
    execOnce: function() {
        return execOnce;
    },
    getDisplayName: function() {
        return getDisplayName;
    },
    getLocationOrigin: function() {
        return getLocationOrigin;
    },
    getURL: function() {
        return getURL;
    },
    isAbsoluteUrl: function() {
        return isAbsoluteUrl;
    },
    isResSent: function() {
        return isResSent;
    },
    loadGetInitialProps: function() {
        return loadGetInitialProps;
    },
    normalizeRepeatedSlashes: function() {
        return normalizeRepeatedSlashes;
    },
    stringifyError: function() {
        return stringifyError;
    }
});
const WEB_VITALS = [
    'CLS',
    'FCP',
    'FID',
    'INP',
    'LCP',
    'TTFB'
];
function execOnce(fn) {
    let used = false;
    let result;
    return (...args)=>{
        if (!used) {
            used = true;
            result = fn(...args);
        }
        return result;
    };
}
// Scheme: https://tools.ietf.org/html/rfc3986#section-3.1
// Absolute URL: https://tools.ietf.org/html/rfc3986#section-4.3
const ABSOLUTE_URL_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/;
const isAbsoluteUrl = (url)=>ABSOLUTE_URL_REGEX.test(url);
function getLocationOrigin() {
    const { protocol, hostname, port } = window.location;
    return `${protocol}//${hostname}${port ? ':' + port : ''}`;
}
function getURL() {
    const { href } = window.location;
    const origin = getLocationOrigin();
    return href.substring(origin.length);
}
function getDisplayName(Component) {
    return typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Unknown';
}
function isResSent(res) {
    return res.finished || res.headersSent;
}
function normalizeRepeatedSlashes(url) {
    const urlParts = url.split('?');
    const urlNoQuery = urlParts[0];
    return urlNoQuery // first we replace any non-encoded backslashes with forward
    // then normalize repeated forward slashes
    .replace(/\\/g, '/').replace(/\/\/+/g, '/') + (urlParts[1] ? `?${urlParts.slice(1).join('?')}` : '');
}
async function loadGetInitialProps(App, ctx) {
    if ("TURBOPACK compile-time truthy", 1) {
        if (App.prototype?.getInitialProps) {
            const message = `"${getDisplayName(App)}.getInitialProps()" is defined as an instance method - visit https://nextjs.org/docs/messages/get-initial-props-as-an-instance-method for more information.`;
            throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
                value: "E394",
                enumerable: false,
                configurable: true
            });
        }
    }
    // when called from _app `ctx` is nested in `ctx`
    const res = ctx.res || ctx.ctx && ctx.ctx.res;
    if (!App.getInitialProps) {
        if (ctx.ctx && ctx.Component) {
            // @ts-ignore pageProps default
            return {
                pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
            };
        }
        return {};
    }
    const props = await App.getInitialProps(ctx);
    if (res && isResSent(res)) {
        return props;
    }
    if (!props) {
        const message = `"${getDisplayName(App)}.getInitialProps()" should resolve to an object. But found "${props}" instead.`;
        throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    }
    if ("TURBOPACK compile-time truthy", 1) {
        if (Object.keys(props).length === 0 && !ctx.ctx) {
            console.warn(`${getDisplayName(App)} returned an empty object from \`getInitialProps\`. This de-optimizes and prevents automatic static optimization. https://nextjs.org/docs/messages/empty-object-getInitialProps`);
        }
    }
    return props;
}
const SP = typeof performance !== 'undefined';
const ST = SP && [
    'mark',
    'measure',
    'getEntriesByName'
].every((method)=>typeof performance[method] === 'function');
class DecodeError extends Error {
}
class NormalizeError extends Error {
}
class PageNotFoundError extends Error {
    constructor(page){
        super();
        this.code = 'ENOENT';
        this.name = 'PageNotFoundError';
        this.message = `Cannot find module for page: ${page}`;
    }
}
class MissingStaticPage extends Error {
    constructor(page, message){
        super();
        this.message = `Failed to load static file for page: ${page} ${message}`;
    }
}
class MiddlewareNotFoundError extends Error {
    constructor(){
        super();
        this.code = 'ENOENT';
        this.message = `Cannot find the middleware module`;
    }
}
function stringifyError(error) {
    return JSON.stringify({
        message: error.message,
        stack: error.stack
    });
} //# sourceMappingURL=utils.js.map
}),
"[project]/node_modules/next/dist/shared/lib/router/utils/is-local-url.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isLocalURL", {
    enumerable: true,
    get: function() {
        return isLocalURL;
    }
});
const _utils = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)");
const _hasbasepath = __turbopack_context__.r("[project]/node_modules/next/dist/client/has-base-path.js [app-client] (ecmascript)");
function isLocalURL(url) {
    // prevent a hydration mismatch on href for url with anchor refs
    if (!(0, _utils.isAbsoluteUrl)(url)) return true;
    try {
        // absolute urls can be local if they are on the same origin
        const locationOrigin = (0, _utils.getLocationOrigin)();
        const resolved = new URL(url, locationOrigin);
        return resolved.origin === locationOrigin && (0, _hasbasepath.hasBasePath)(resolved.pathname);
    } catch (_) {
        return false;
    }
} //# sourceMappingURL=is-local-url.js.map
}),
"[project]/node_modules/next/dist/shared/lib/utils/error-once.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "errorOnce", {
    enumerable: true,
    get: function() {
        return errorOnce;
    }
});
let errorOnce = (_)=>{};
if ("TURBOPACK compile-time truthy", 1) {
    const errors = new Set();
    errorOnce = (msg)=>{
        if (!errors.has(msg)) {
            console.error(msg);
        }
        errors.add(msg);
    };
} //# sourceMappingURL=error-once.js.map
}),
"[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    default: null,
    useLinkStatus: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    /**
 * A React component that extends the HTML `<a>` element to provide
 * [prefetching](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#2-prefetching)
 * and client-side navigation. This is the primary way to navigate between routes in Next.js.
 *
 * @remarks
 * - Prefetching is only enabled in production.
 *
 * @see https://nextjs.org/docs/app/api-reference/components/link
 */ default: function() {
        return LinkComponent;
    },
    useLinkStatus: function() {
        return useLinkStatus;
    }
});
const _interop_require_wildcard = __turbopack_context__.r("[project]/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const _formaturl = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/format-url.js [app-client] (ecmascript)");
const _approutercontextsharedruntime = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js [app-client] (ecmascript)");
const _usemergedref = __turbopack_context__.r("[project]/node_modules/next/dist/client/use-merged-ref.js [app-client] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)");
const _addbasepath = __turbopack_context__.r("[project]/node_modules/next/dist/client/add-base-path.js [app-client] (ecmascript)");
const _warnonce = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/utils/warn-once.js [app-client] (ecmascript)");
const _links = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/links.js [app-client] (ecmascript)");
const _islocalurl = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/router/utils/is-local-url.js [app-client] (ecmascript)");
const _types = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/segment-cache/types.js [app-client] (ecmascript)");
const _erroronce = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/utils/error-once.js [app-client] (ecmascript)");
function isModifiedEvent(event) {
    const eventTarget = event.currentTarget;
    const target = eventTarget.getAttribute('target');
    return target && target !== '_self' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || // triggers resource download
    event.nativeEvent && event.nativeEvent.which === 2;
}
function linkClicked(e, href, as, linkInstanceRef, replace, scroll, onNavigate) {
    if (typeof window !== 'undefined') {
        const { nodeName } = e.currentTarget;
        // anchors inside an svg have a lowercase nodeName
        const isAnchorNodeName = nodeName.toUpperCase() === 'A';
        if (isAnchorNodeName && isModifiedEvent(e) || e.currentTarget.hasAttribute('download')) {
            // ignore click for browser’s default behavior
            return;
        }
        if (!(0, _islocalurl.isLocalURL)(href)) {
            if (replace) {
                // browser default behavior does not replace the history state
                // so we need to do it manually
                e.preventDefault();
                location.replace(href);
            }
            // ignore click for browser’s default behavior
            return;
        }
        e.preventDefault();
        if (onNavigate) {
            let isDefaultPrevented = false;
            onNavigate({
                preventDefault: ()=>{
                    isDefaultPrevented = true;
                }
            });
            if (isDefaultPrevented) {
                return;
            }
        }
        const { dispatchNavigateAction } = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/app-router-instance.js [app-client] (ecmascript)");
        _react.default.startTransition(()=>{
            dispatchNavigateAction(as || href, replace ? 'replace' : 'push', scroll ?? true, linkInstanceRef.current);
        });
    }
}
function formatStringOrUrl(urlObjOrString) {
    if (typeof urlObjOrString === 'string') {
        return urlObjOrString;
    }
    return (0, _formaturl.formatUrl)(urlObjOrString);
}
function LinkComponent(props) {
    const [linkStatus, setOptimisticLinkStatus] = (0, _react.useOptimistic)(_links.IDLE_LINK_STATUS);
    let children;
    const linkInstanceRef = (0, _react.useRef)(null);
    const { href: hrefProp, as: asProp, children: childrenProp, prefetch: prefetchProp = null, passHref, replace, shallow, scroll, onClick, onMouseEnter: onMouseEnterProp, onTouchStart: onTouchStartProp, legacyBehavior = false, onNavigate, ref: forwardedRef, unstable_dynamicOnHover, ...restProps } = props;
    children = childrenProp;
    if (legacyBehavior && (typeof children === 'string' || typeof children === 'number')) {
        children = /*#__PURE__*/ (0, _jsxruntime.jsx)("a", {
            children: children
        });
    }
    const router = _react.default.useContext(_approutercontextsharedruntime.AppRouterContext);
    const prefetchEnabled = prefetchProp !== false;
    const fetchStrategy = prefetchProp !== false ? getFetchStrategyFromPrefetchProp(prefetchProp) : _types.FetchStrategy.PPR;
    if ("TURBOPACK compile-time truthy", 1) {
        function createPropError(args) {
            return Object.defineProperty(new Error(`Failed prop type: The prop \`${args.key}\` expects a ${args.expected} in \`<Link>\`, but got \`${args.actual}\` instead.` + (typeof window !== 'undefined' ? "\nOpen your browser's console to view the Component stack trace." : '')), "__NEXT_ERROR_CODE", {
                value: "E319",
                enumerable: false,
                configurable: true
            });
        }
        // TypeScript trick for type-guarding:
        const requiredPropsGuard = {
            href: true
        };
        const requiredProps = Object.keys(requiredPropsGuard);
        requiredProps.forEach((key)=>{
            if (key === 'href') {
                if (props[key] == null || typeof props[key] !== 'string' && typeof props[key] !== 'object') {
                    throw createPropError({
                        key,
                        expected: '`string` or `object`',
                        actual: props[key] === null ? 'null' : typeof props[key]
                    });
                }
            } else {
                // TypeScript trick for type-guarding:
                const _ = key;
            }
        });
        // TypeScript trick for type-guarding:
        const optionalPropsGuard = {
            as: true,
            replace: true,
            scroll: true,
            shallow: true,
            passHref: true,
            prefetch: true,
            unstable_dynamicOnHover: true,
            onClick: true,
            onMouseEnter: true,
            onTouchStart: true,
            legacyBehavior: true,
            onNavigate: true
        };
        const optionalProps = Object.keys(optionalPropsGuard);
        optionalProps.forEach((key)=>{
            const valType = typeof props[key];
            if (key === 'as') {
                if (props[key] && valType !== 'string' && valType !== 'object') {
                    throw createPropError({
                        key,
                        expected: '`string` or `object`',
                        actual: valType
                    });
                }
            } else if (key === 'onClick' || key === 'onMouseEnter' || key === 'onTouchStart' || key === 'onNavigate') {
                if (props[key] && valType !== 'function') {
                    throw createPropError({
                        key,
                        expected: '`function`',
                        actual: valType
                    });
                }
            } else if (key === 'replace' || key === 'scroll' || key === 'shallow' || key === 'passHref' || key === 'legacyBehavior' || key === 'unstable_dynamicOnHover') {
                if (props[key] != null && valType !== 'boolean') {
                    throw createPropError({
                        key,
                        expected: '`boolean`',
                        actual: valType
                    });
                }
            } else if (key === 'prefetch') {
                if (props[key] != null && valType !== 'boolean' && props[key] !== 'auto') {
                    throw createPropError({
                        key,
                        expected: '`boolean | "auto"`',
                        actual: valType
                    });
                }
            } else {
                // TypeScript trick for type-guarding:
                const _ = key;
            }
        });
    }
    if ("TURBOPACK compile-time truthy", 1) {
        if (props.locale) {
            (0, _warnonce.warnOnce)('The `locale` prop is not supported in `next/link` while using the `app` router. Read more about app router internalization: https://nextjs.org/docs/app/building-your-application/routing/internationalization');
        }
        if (!asProp) {
            let href;
            if (typeof hrefProp === 'string') {
                href = hrefProp;
            } else if (typeof hrefProp === 'object' && typeof hrefProp.pathname === 'string') {
                href = hrefProp.pathname;
            }
            if (href) {
                const hasDynamicSegment = href.split('/').some((segment)=>segment.startsWith('[') && segment.endsWith(']'));
                if (hasDynamicSegment) {
                    throw Object.defineProperty(new Error(`Dynamic href \`${href}\` found in <Link> while using the \`/app\` router, this is not supported. Read more: https://nextjs.org/docs/messages/app-dir-dynamic-href`), "__NEXT_ERROR_CODE", {
                        value: "E267",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
        }
    }
    const { href, as } = _react.default.useMemo({
        "LinkComponent.useMemo": ()=>{
            const resolvedHref = formatStringOrUrl(hrefProp);
            return {
                href: resolvedHref,
                as: asProp ? formatStringOrUrl(asProp) : resolvedHref
            };
        }
    }["LinkComponent.useMemo"], [
        hrefProp,
        asProp
    ]);
    // This will return the first child, if multiple are provided it will throw an error
    let child;
    if (legacyBehavior) {
        if (children?.$$typeof === Symbol.for('react.lazy')) {
            throw Object.defineProperty(new Error(`\`<Link legacyBehavior>\` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's \`<a>\` tag.`), "__NEXT_ERROR_CODE", {
                value: "E863",
                enumerable: false,
                configurable: true
            });
        }
        if ("TURBOPACK compile-time truthy", 1) {
            if (onClick) {
                console.warn(`"onClick" was passed to <Link> with \`href\` of \`${hrefProp}\` but "legacyBehavior" was set. The legacy behavior requires onClick be set on the child of next/link`);
            }
            if (onMouseEnterProp) {
                console.warn(`"onMouseEnter" was passed to <Link> with \`href\` of \`${hrefProp}\` but "legacyBehavior" was set. The legacy behavior requires onMouseEnter be set on the child of next/link`);
            }
            try {
                child = _react.default.Children.only(children);
            } catch (err) {
                if (!children) {
                    throw Object.defineProperty(new Error(`No children were passed to <Link> with \`href\` of \`${hrefProp}\` but one child is required https://nextjs.org/docs/messages/link-no-children`), "__NEXT_ERROR_CODE", {
                        value: "E320",
                        enumerable: false,
                        configurable: true
                    });
                }
                throw Object.defineProperty(new Error(`Multiple children were passed to <Link> with \`href\` of \`${hrefProp}\` but only one child is supported https://nextjs.org/docs/messages/link-multiple-children` + (typeof window !== 'undefined' ? " \nOpen your browser's console to view the Component stack trace." : '')), "__NEXT_ERROR_CODE", {
                    value: "E266",
                    enumerable: false,
                    configurable: true
                });
            }
        } else //TURBOPACK unreachable
        ;
    } else {
        if ("TURBOPACK compile-time truthy", 1) {
            if (children?.type === 'a') {
                throw Object.defineProperty(new Error('Invalid <Link> with <a> child. Please remove <a> or use <Link legacyBehavior>.\nLearn more: https://nextjs.org/docs/messages/invalid-new-link-with-extra-anchor'), "__NEXT_ERROR_CODE", {
                    value: "E209",
                    enumerable: false,
                    configurable: true
                });
            }
        }
    }
    const childRef = legacyBehavior ? child && typeof child === 'object' && child.ref : forwardedRef;
    // Use a callback ref to attach an IntersectionObserver to the anchor tag on
    // mount. In the future we will also use this to keep track of all the
    // currently mounted <Link> instances, e.g. so we can re-prefetch them after
    // a revalidation or refresh.
    const observeLinkVisibilityOnMount = _react.default.useCallback({
        "LinkComponent.useCallback[observeLinkVisibilityOnMount]": (element)=>{
            if (router !== null) {
                linkInstanceRef.current = (0, _links.mountLinkInstance)(element, href, router, fetchStrategy, prefetchEnabled, setOptimisticLinkStatus);
            }
            return ({
                "LinkComponent.useCallback[observeLinkVisibilityOnMount]": ()=>{
                    if (linkInstanceRef.current) {
                        (0, _links.unmountLinkForCurrentNavigation)(linkInstanceRef.current);
                        linkInstanceRef.current = null;
                    }
                    (0, _links.unmountPrefetchableInstance)(element);
                }
            })["LinkComponent.useCallback[observeLinkVisibilityOnMount]"];
        }
    }["LinkComponent.useCallback[observeLinkVisibilityOnMount]"], [
        prefetchEnabled,
        href,
        router,
        fetchStrategy,
        setOptimisticLinkStatus
    ]);
    const mergedRef = (0, _usemergedref.useMergedRef)(observeLinkVisibilityOnMount, childRef);
    const childProps = {
        ref: mergedRef,
        onClick (e) {
            if ("TURBOPACK compile-time truthy", 1) {
                if (!e) {
                    throw Object.defineProperty(new Error(`Component rendered inside next/link has to pass click event to "onClick" prop.`), "__NEXT_ERROR_CODE", {
                        value: "E312",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
            if (!legacyBehavior && typeof onClick === 'function') {
                onClick(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onClick === 'function') {
                child.props.onClick(e);
            }
            if (!router) {
                return;
            }
            if (e.defaultPrevented) {
                return;
            }
            linkClicked(e, href, as, linkInstanceRef, replace, scroll, onNavigate);
        },
        onMouseEnter (e) {
            if (!legacyBehavior && typeof onMouseEnterProp === 'function') {
                onMouseEnterProp(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onMouseEnter === 'function') {
                child.props.onMouseEnter(e);
            }
            if (!router) {
                return;
            }
            if ("TURBOPACK compile-time truthy", 1) {
                return;
            }
            //TURBOPACK unreachable
            ;
            const upgradeToDynamicPrefetch = undefined;
        },
        onTouchStart: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : function onTouchStart(e) {
            if (!legacyBehavior && typeof onTouchStartProp === 'function') {
                onTouchStartProp(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onTouchStart === 'function') {
                child.props.onTouchStart(e);
            }
            if (!router) {
                return;
            }
            if (!prefetchEnabled) {
                return;
            }
            const upgradeToDynamicPrefetch = unstable_dynamicOnHover === true;
            (0, _links.onNavigationIntent)(e.currentTarget, upgradeToDynamicPrefetch);
        }
    };
    // If the url is absolute, we can bypass the logic to prepend the basePath.
    if ((0, _utils.isAbsoluteUrl)(as)) {
        childProps.href = as;
    } else if (!legacyBehavior || passHref || child.type === 'a' && !('href' in child.props)) {
        childProps.href = (0, _addbasepath.addBasePath)(as);
    }
    let link;
    if (legacyBehavior) {
        if ("TURBOPACK compile-time truthy", 1) {
            (0, _erroronce.errorOnce)('`legacyBehavior` is deprecated and will be removed in a future ' + 'release. A codemod is available to upgrade your components:\n\n' + 'npx @next/codemod@latest new-link .\n\n' + 'Learn more: https://nextjs.org/docs/app/building-your-application/upgrading/codemods#remove-a-tags-from-link-components');
        }
        link = /*#__PURE__*/ _react.default.cloneElement(child, childProps);
    } else {
        link = /*#__PURE__*/ (0, _jsxruntime.jsx)("a", {
            ...restProps,
            ...childProps,
            children: children
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(LinkStatusContext.Provider, {
        value: linkStatus,
        children: link
    });
}
const LinkStatusContext = /*#__PURE__*/ (0, _react.createContext)(_links.IDLE_LINK_STATUS);
const useLinkStatus = ()=>{
    return (0, _react.useContext)(LinkStatusContext);
};
function getFetchStrategyFromPrefetchProp(prefetchProp) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        return prefetchProp === null || prefetchProp === 'auto' ? _types.FetchStrategy.PPR : // (although invalid values should've been filtered out by prop validation in dev)
        _types.FetchStrategy.Full;
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=link.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/defaultAttributes.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>defaultAttributes
]);
var defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
};
;
 //# sourceMappingURL=defaultAttributes.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>createLucideIcon,
    "toKebabCase",
    ()=>toKebabCase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$defaultAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/defaultAttributes.js [app-client] (ecmascript)");
;
;
const toKebabCase = (string)=>string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase().trim();
const createLucideIcon = (iconName, iconNode)=>{
    const Component = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(({ color = "currentColor", size = 24, strokeWidth = 2, absoluteStrokeWidth, className = "", children, ...rest }, ref)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])("svg", {
            ref,
            ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$defaultAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
            width: size,
            height: size,
            stroke: color,
            strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
            className: [
                "lucide",
                `lucide-${toKebabCase(iconName)}`,
                className
            ].join(" "),
            ...rest
        }, [
            ...iconNode.map(([tag, attrs])=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(tag, attrs)),
            ...Array.isArray(children) ? children : [
                children
            ]
        ]));
    Component.displayName = `${iconName}`;
    return Component;
};
;
 //# sourceMappingURL=createLucideIcon.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/home.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Home = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Home", [
    [
        "path",
        {
            d: "m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
            key: "y5dka4"
        }
    ],
    [
        "polyline",
        {
            points: "9 22 9 12 15 12 15 22",
            key: "e2us08"
        }
    ]
]);
;
 //# sourceMappingURL=home.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/home.js [app-client] (ecmascript) <export default as Home>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Home",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$home$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$home$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/home.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_47054801._.js.map