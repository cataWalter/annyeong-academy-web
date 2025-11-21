import Navbar from '../components/sections/Navbar'
import Benefits from '../components/sections/Benefits'
import Teachers from '../components/sections/Teachers'
import Agenda from '../components/sections/Agenda'
import Offer from '../components/sections/Offer'
import Testimonials from '../components/sections/Testimonials'
import Footer from '../components/sections/Footer'
import WebinarForm from '../components/WebinarForm'
import { useLanguage } from '../context/LanguageContext'

export default function LandingPage() {
  const { t } = useLanguage()
  return (
    <div className="min-h-screen bg-[#F8F9FC] font-sans text-gray-800">
      <Navbar />

      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          
          <div className="space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-white shadow-sm text-brand-purple text-sm font-bold border border-purple-100">
              <span>⭐⭐⭐⭐⭐</span> {t('hero_students')}
            </span>
            
            <h1 className="text-4xl md:text-6xl font-extrabold text-brand-dark leading-tight">
              {t('hero_title')} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">
                {t('hero_subtitle')}
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
              {t('hero_desc')}
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                {t('hero_spots')}
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
                <span>📹</span> {t('hero_live')}
              </div>
            </div>
          </div>

          <div className="relative" id="registration">
            <div className="absolute -inset-4 bg-gradient-to-r from-brand-blue to-brand-purple rounded-[2rem] opacity-30 blur-2xl"></div>
            <WebinarForm />
          </div>
        </div>

        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-gradient-to-b from-purple-200 to-blue-200 opacity-20 blur-[100px] rounded-full pointer-events-none -z-10"></div>
      </section>

      <div className="py-8 border-y border-gray-200 bg-white/50 backdrop-blur text-center">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">{t('hero_powered')}</p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-gray-400 font-bold text-sm">
          <span>📹 ZOOM HD</span>
          <span>🤖 AI LIVE TRANSLATE</span>
          <span>🎧 AUDIO STUDIO</span>
          <span>💬 INTERACTIVE CHAT</span>
        </div>
      </div>

      <Benefits />
      <Teachers />
      <Agenda />
      <Offer />
      <Testimonials />
      
      <Footer />
    </div>
  )
}
