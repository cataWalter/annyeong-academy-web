"use client";
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import Countdown from '@/components/sections/Countdown'
import PainPoints from '@/components/sections/PainPoints'
import Method from '@/components/sections/Method'
import Teachers from '@/components/sections/Teachers'
import Agenda from '@/components/sections/Agenda'
import Offer from '@/components/sections/Offer'
import Testimonials from '@/components/sections/Testimonials'
import FAQ from '@/components/sections/FAQ'
import WebinarForm from '@/components/WebinarForm'
import StickyBar from '@/components/sections/StickyBar'

export default function LandingPage() {
  const scrollToForm = () => {
    document.getElementById('registration').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] font-sans text-gray-800 flex flex-col">
      <Navbar />

      <main className="flex-grow">
        
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-white">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
            
            <div className="space-y-6 text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-extrabold text-brand-dark leading-tight">
                Learn Korean directly from Seoul <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">
                  no language barriers!
                </span>
              </h1>
              
              <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 font-medium">
                Free, interactive trial class with a native Korean tutor and real-time translation.
              </p>

              <button 
                onClick={scrollToForm}
                className="bg-brand-purple text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-brand-dark transition transform hover:-translate-y-1"
              >
                Get my free trial!
              </button>
            </div>

            {/* Hero Image/Video Placeholder */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white rotate-2 hover:rotate-0 transition duration-500">
               <img 
                 src="https://placehold.co/600x400/6a11cb/ffffff?text=Native+Teacher+Waving" 
                 alt="Teacher Waving" 
                 className="w-full h-full object-cover"
               />
            </div>
          </div>
        </section>

        {/* SECTION 0: INTRO */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-brand-dark mb-6">An Interactive Glimpse into the Future of Language Learning</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Forget boring textbooks! In this live event, we’ll show you what it’s like to learn using your favorite K-dramas and K-pop songs, not through rote memorization. This is your chance to try this innovation risk-free. You just sit back, your teacher (who can’t wait to meet you!) speaks in Korean, and the "magic" happens right before your eyes with real-time subtitles. Come and experience the chemistry, and see for yourself that language learning can be the most fun part of your day.
            </p>
          </div>
        </section>

        <Countdown />
        <PainPoints />
        <Method />
        <Testimonials />
        <Agenda />
        <Teachers />
        <FAQ />

        {/* SECTION 8: SIGN UP FORM */}
        <section id="registration" className="py-20 px-4 bg-gradient-to-br from-brand-blue to-brand-purple relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="max-w-4xl mx-auto relative z-10 text-center">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl inline-block w-full max-w-lg">
               <WebinarForm />
            </div>
          </div>
        </section>

      </main>
      
      <StickyBar />
      <Footer />
    </div>
  )
}
