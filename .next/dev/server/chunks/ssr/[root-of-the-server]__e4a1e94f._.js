module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/context/AuthContext.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])();
function AuthProvider({ children }) {
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [profile, setProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createBrowserClient"])(("TURBOPACK compile-time value", "https://lkqbkhaklhenhlahgvhj.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxrcWJraGFrbGhlbmhsYWhndmhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3Mjc5ODIsImV4cCI6MjA3OTMwMzk4Mn0.ZKddDLNuHqmpMUvICMEauFcKaL5H-8HWn0NTAx8URg0"));
    const fetchProfile = async (userId)=>{
        try {
            const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
            if (!error) setProfile(data);
        } catch (error) {
            console.error('Profile fetch error:', error);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const initializeAuth = async ()=>{
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                setUser(session.user);
                await fetchProfile(session.user.id);
            }
            setLoading(false);
            const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session)=>{
                if (session?.user) {
                    setUser(session.user);
                    await fetchProfile(session.user.id);
                    router.refresh();
                } else {
                    setUser(null);
                    setProfile(null);
                    router.refresh();
                }
            });
            return ()=>subscription.unsubscribe();
        };
        initializeAuth();
    }, []);
    const value = {
        signUp: (data)=>supabase.auth.signUp(data),
        signIn: (data)=>supabase.auth.signInWithPassword(data),
        signOut: async ()=>{
            await supabase.auth.signOut();
            router.push('/login');
        },
        refreshProfile: ()=>user && fetchProfile(user.id),
        user,
        profile,
        isAdmin: profile?.role === 'admin',
        loading
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: value,
        children: !loading && children
    }, void 0, false, {
        fileName: "[project]/src/context/AuthContext.jsx",
        lineNumber: 77,
        columnNumber: 5
    }, this);
}
const useAuth = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
}),
"[project]/src/context/LanguageContext.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LanguageProvider",
    ()=>LanguageProvider,
    "useLanguage",
    ()=>useLanguage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
const LanguageContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])();
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
    const [lang, setLang] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('en');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const saved = localStorage.getItem('app_lang');
        if (saved) setLang(saved);
    }, []);
    const toggleLanguage = ()=>{
        const newLang = lang === 'en' ? 'hu' : 'en';
        setLang(newLang);
        localStorage.setItem('app_lang', newLang);
    };
    const t = (key)=>{
        return translations[lang][key] || key;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageContext.Provider, {
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
const useLanguage = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(LanguageContext);
}),
"[project]/src/lib/supabase.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-ssr] (ecmascript)");
"use client";
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createBrowserClient"])(("TURBOPACK compile-time value", "https://lkqbkhaklhenhlahgvhj.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxrcWJraGFrbGhlbmhsYWhndmhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3Mjc5ODIsImV4cCI6MjA3OTMwMzk4Mn0.ZKddDLNuHqmpMUvICMEauFcKaL5H-8HWn0NTAx8URg0"));
}),
"[project]/src/context/ToastContext.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToastProvider",
    ()=>ToastProvider,
    "useToast",
    ()=>useToast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check-circle.js [app-ssr] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$alert$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/alert-circle.js [app-ssr] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.js [app-ssr] (ecmascript) <export default as Info>");
;
;
;
const ToastContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])();
function ToastProvider({ children }) {
    const [toasts, setToasts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const addToast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((message, type = 'info')=>{
        const id = Date.now();
        setToasts((prev)=>[
                ...prev,
                {
                    id,
                    message,
                    type
                }
            ]);
        setTimeout(()=>removeToast(id), 4000);
    }, []);
    const removeToast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id)=>{
        setToasts((prev)=>prev.filter((t)=>t.id !== id));
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ToastContext.Provider, {
        value: {
            addToast
        },
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none",
                children: toasts.map((toast)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border transition-all animate-slide-in min-w-[300px] ${toast.type === 'success' ? 'bg-white border-green-100 text-green-800' : toast.type === 'error' ? 'bg-white border-red-100 text-red-800' : 'bg-white border-blue-100 text-brand-dark'}`,
                        children: [
                            toast.type === 'success' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                size: 20,
                                className: "text-green-500"
                            }, void 0, false, {
                                fileName: "[project]/src/context/ToastContext.jsx",
                                lineNumber: 32,
                                columnNumber: 42
                            }, this),
                            toast.type === 'error' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$alert$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                size: 20,
                                className: "text-red-500"
                            }, void 0, false, {
                                fileName: "[project]/src/context/ToastContext.jsx",
                                lineNumber: 33,
                                columnNumber: 40
                            }, this),
                            toast.type === 'info' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                size: 20,
                                className: "text-brand-blue"
                            }, void 0, false, {
                                fileName: "[project]/src/context/ToastContext.jsx",
                                lineNumber: 34,
                                columnNumber: 39
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-bold flex-1",
                                children: toast.message
                            }, void 0, false, {
                                fileName: "[project]/src/context/ToastContext.jsx",
                                lineNumber: 36,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>removeToast(toast.id),
                                className: "text-gray-400 hover:text-gray-600",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/src/context/ToastContext.jsx",
                                    lineNumber: 39,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/context/ToastContext.jsx",
                                lineNumber: 38,
                                columnNumber: 13
                            }, this)
                        ]
                    }, toast.id, true, {
                        fileName: "[project]/src/context/ToastContext.jsx",
                        lineNumber: 24,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/context/ToastContext.jsx",
                lineNumber: 22,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/context/ToastContext.jsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
const useToast = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ToastContext);
}),
"[project]/src/components/payment/PaymentModal.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PaymentModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-ssr] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-ssr] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check-circle.js [app-ssr] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-2.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-ssr] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AuthContext.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ToastContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/ToastContext.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$LanguageContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/LanguageContext.jsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function PaymentModal({ isOpen, onClose, item }) {
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$LanguageContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLanguage"])();
    const { addToast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ToastContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('form');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isOpen) setStep('form');
    }, [
        isOpen
    ]);
    if (!isOpen || !item) return null;
    const handlePayment = async (e)=>{
        e.preventDefault();
        setLoading(true);
        setTimeout(async ()=>{
            setStep('processing');
            setTimeout(async ()=>{
                try {
                    const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('purchases').insert([
                        {
                            user_id: user.id,
                            product_id: item.id,
                            status: 'completed'
                        }
                    ]);
                    if (error) throw error;
                    setStep('success');
                    addToast('Purchase successful!', 'success');
                    setTimeout(()=>window.location.reload(), 2000);
                } catch (error) {
                    setLoading(false);
                    setStep('form');
                    addToast(error.message, 'error');
                }
            }, 1500);
        }, 1000);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-brand-dark/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative animate-slide-in",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-gray-50 p-4 flex justify-between items-center border-b border-gray-100",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 text-brand-dark font-bold",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                    className: "text-green-500",
                                    size: 20
                                }, void 0, false, {
                                    fileName: "[project]/src/components/payment/PaymentModal.jsx",
                                    lineNumber: 45,
                                    columnNumber: 78
                                }, this),
                                " ",
                                t('pay_secure')
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/payment/PaymentModal.jsx",
                            lineNumber: 45,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "text-gray-400 hover:text-gray-600",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                size: 20
                            }, void 0, false, {
                                fileName: "[project]/src/components/payment/PaymentModal.jsx",
                                lineNumber: 46,
                                columnNumber: 83
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/payment/PaymentModal.jsx",
                            lineNumber: 46,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/payment/PaymentModal.jsx",
                    lineNumber: 44,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6",
                    children: [
                        step === 'form' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handlePayment,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-4 mb-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: item.image_url || 'https://placehold.co/100',
                                            className: "w-20 h-20 rounded-lg object-cover bg-gray-100"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/payment/PaymentModal.jsx",
                                            lineNumber: 53,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-bold text-gray-800 leading-tight",
                                                    children: item.title
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/payment/PaymentModal.jsx",
                                                    lineNumber: 55,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-brand-purple font-bold text-xl",
                                                    children: item.price
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/payment/PaymentModal.jsx",
                                                    lineNumber: 56,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/payment/PaymentModal.jsx",
                                            lineNumber: 54,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/payment/PaymentModal.jsx",
                                    lineNumber: 52,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4 mb-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-xs font-bold text-gray-500 uppercase mb-1",
                                                    children: t('pay_card')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/payment/PaymentModal.jsx",
                                                    lineNumber: 62,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            placeholder: "4242 4242 4242 4242",
                                                            className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-brand-purple font-mono",
                                                            readOnly: true,
                                                            value: "4242 4242 4242 4242"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/payment/PaymentModal.jsx",
                                                            lineNumber: 64,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"], {
                                                            className: "absolute left-3 top-2.5 text-gray-400",
                                                            size: 18
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/payment/PaymentModal.jsx",
                                                            lineNumber: 65,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/payment/PaymentModal.jsx",
                                                    lineNumber: 63,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/payment/PaymentModal.jsx",
                                            lineNumber: 61,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-xs font-bold text-gray-500 uppercase mb-1",
                                                            children: t('pay_expiry')
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/payment/PaymentModal.jsx",
                                                            lineNumber: 70,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            placeholder: "MM/YY",
                                                            className: "w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-brand-purple font-mono",
                                                            readOnly: true,
                                                            value: "12/28"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/payment/PaymentModal.jsx",
                                                            lineNumber: 71,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/payment/PaymentModal.jsx",
                                                    lineNumber: 69,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-xs font-bold text-gray-500 uppercase mb-1",
                                                            children: t('pay_cvc')
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/payment/PaymentModal.jsx",
                                                            lineNumber: 74,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            placeholder: "123",
                                                            className: "w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-brand-purple font-mono",
                                                            readOnly: true,
                                                            value: "123"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/payment/PaymentModal.jsx",
                                                            lineNumber: 75,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/payment/PaymentModal.jsx",
                                                    lineNumber: 73,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/payment/PaymentModal.jsx",
                                            lineNumber: 68,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/payment/PaymentModal.jsx",
                                    lineNumber: 60,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    disabled: loading,
                                    type: "submit",
                                    className: "w-full bg-brand-dark text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition flex items-center justify-center gap-2 shadow-lg",
                                    children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        className: "animate-spin"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/payment/PaymentModal.jsx",
                                        lineNumber: 81,
                                        columnNumber: 28
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/payment/PaymentModal.jsx",
                                                lineNumber: 81,
                                                columnNumber: 69
                                            }, this),
                                            " ",
                                            t('pay_btn'),
                                            " ",
                                            item.price
                                        ]
                                    }, void 0, true)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/payment/PaymentModal.jsx",
                                    lineNumber: 80,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/payment/PaymentModal.jsx",
                            lineNumber: 51,
                            columnNumber: 13
                        }, this),
                        step === 'processing' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "py-10 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "w-16 h-16 text-brand-purple animate-spin mx-auto mb-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/payment/PaymentModal.jsx",
                                    lineNumber: 88,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-bold text-gray-800",
                                    children: t('pay_processing')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/payment/PaymentModal.jsx",
                                    lineNumber: 89,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/payment/PaymentModal.jsx",
                            lineNumber: 87,
                            columnNumber: 13
                        }, this),
                        step === 'success' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "py-10 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                        className: "w-8 h-8 text-green-600"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/payment/PaymentModal.jsx",
                                        lineNumber: 96,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/payment/PaymentModal.jsx",
                                    lineNumber: 95,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-bold text-gray-800",
                                    children: t('pay_success')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/payment/PaymentModal.jsx",
                                    lineNumber: 98,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-500",
                                    children: t('pay_redirect')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/payment/PaymentModal.jsx",
                                    lineNumber: 99,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/payment/PaymentModal.jsx",
                            lineNumber: 94,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/payment/PaymentModal.jsx",
                    lineNumber: 49,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/payment/PaymentModal.jsx",
            lineNumber: 43,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/payment/PaymentModal.jsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/context/PaymentContext.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PaymentProvider",
    ()=>PaymentProvider,
    "usePayment",
    ()=>usePayment
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$payment$2f$PaymentModal$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/payment/PaymentModal.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AuthContext.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ToastContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/ToastContext.jsx [app-ssr] (ecmascript)");
;
;
;
;
;
const PaymentContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])();
function PaymentProvider({ children }) {
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const { addToast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ToastContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    const [modalOpen, setModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedItem, setSelectedItem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const initiateCheckout = (item)=>{
        if (!user) {
            addToast("Please login to purchase", "error");
            return;
        }
        setSelectedItem(item);
        setModalOpen(true);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PaymentContext.Provider, {
        value: {
            initiateCheckout
        },
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$payment$2f$PaymentModal$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                isOpen: modalOpen,
                onClose: ()=>setModalOpen(false),
                item: selectedItem
            }, void 0, false, {
                fileName: "[project]/src/context/PaymentContext.jsx",
                lineNumber: 26,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/context/PaymentContext.jsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
const usePayment = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(PaymentContext);
}),
"[project]/src/context/CartContext.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CartProvider",
    ()=>CartProvider,
    "useCart",
    ()=>useCart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ToastContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/ToastContext.jsx [app-ssr] (ecmascript)");
"use client";
;
;
;
const CartContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])();
function CartProvider({ children }) {
    const [cart, setCart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const { addToast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ToastContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    // Load cart from localStorage on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const savedCart = localStorage.getItem('annyeong_cart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error(e);
            }
        }
    }, []);
    // Save cart to localStorage on change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        localStorage.setItem('annyeong_cart', JSON.stringify(cart));
    }, [
        cart
    ]);
    const addToCart = (product)=>{
        setCart((prev)=>{
            const exists = prev.find((item)=>item.id === product.id);
            if (exists) {
                addToast(`${product.title} is already in cart`, 'info');
                return prev;
            }
            addToast(`${product.title} added to cart!`, 'success');
            return [
                ...prev,
                product
            ];
        });
    };
    const removeFromCart = (productId)=>{
        setCart((prev)=>prev.filter((item)=>item.id !== productId));
    };
    const clearCart = ()=>setCart([]);
    const cartTotal = cart.reduce((total, item)=>{
        // Parse price strings like "15.000 Ft" or numbers
        const price = typeof item.price === 'string' ? parseFloat(item.price.replace(/[^0-9.]/g, '')) : item.price;
        return total + (isNaN(price) ? 0 : price);
    }, 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CartContext.Provider, {
        value: {
            cart,
            addToCart,
            removeFromCart,
            clearCart,
            cartTotal
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/CartContext.jsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
const useCart = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(CartContext);
}),
"[project]/src/components/auth/SupabaseConfigWarning.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SupabaseConfigWarning
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
"use client";
;
;
function SupabaseConfigWarning() {
    const isConfigured = ("TURBOPACK compile-time value", "https://lkqbkhaklhenhlahgvhj.supabase.co") && ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxrcWJraGFrbGhlbmhsYWhndmhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3Mjc5ODIsImV4cCI6MjA3OTMwMzk4Mn0.ZKddDLNuHqmpMUvICMEauFcKaL5H-8HWn0NTAx8URg0");
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
}
}),
"[project]/src/app/layout.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RootLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AuthContext.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$LanguageContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/LanguageContext.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$PaymentContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/PaymentContext.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ToastContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/ToastContext.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$CartContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/CartContext.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$SupabaseConfigWarning$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/auth/SupabaseConfigWarning.jsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
function RootLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        lang: "en",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("head", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                        children: "Annyeong Academy"
                    }, void 0, false, {
                        fileName: "[project]/src/app/layout.jsx",
                        lineNumber: 15,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: "Learn Korean without English"
                    }, void 0, false, {
                        fileName: "[project]/src/app/layout.jsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                        rel: "preconnect",
                        href: "https://fonts.googleapis.com"
                    }, void 0, false, {
                        fileName: "[project]/src/app/layout.jsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                        rel: "preconnect",
                        href: "https://fonts.gstatic.com",
                        crossOrigin: "anonymous"
                    }, void 0, false, {
                        fileName: "[project]/src/app/layout.jsx",
                        lineNumber: 18,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap",
                        rel: "stylesheet"
                    }, void 0, false, {
                        fileName: "[project]/src/app/layout.jsx",
                        lineNumber: 19,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/layout.jsx",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
                className: "font-sans antialiased text-gray-800",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$SupabaseConfigWarning$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/src/app/layout.jsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$ToastContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToastProvider"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AuthProvider"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$CartContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CartProvider"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$LanguageContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LanguageProvider"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$PaymentContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaymentProvider"], {
                                        children: children
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/layout.jsx",
                                        lineNumber: 27,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/layout.jsx",
                                    lineNumber: 26,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/layout.jsx",
                                lineNumber: 25,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/layout.jsx",
                            lineNumber: 24,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/layout.jsx",
                        lineNumber: 23,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/layout.jsx",
                lineNumber: 21,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/layout.jsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e4a1e94f._.js.map