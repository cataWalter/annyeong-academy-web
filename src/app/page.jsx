"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import Countdown from '@/components/sections/Countdown'
import PainPoints from '@/components/sections/PainPoints'
import Method from '@/components/sections/Method'
import Teachers from '@/components/sections/Teachers'
import Agenda from '@/components/sections/Agenda'
import Testimonials from '@/components/sections/Testimonials'
import FAQ from '@/components/sections/FAQ'
import WebinarForm from '@/components/WebinarForm'
import StickyBar from '@/components/sections/StickyBar'
import LatestBlog from '@/components/sections/LatestBlog'
import FeaturedCourses from '@/components/sections/FeaturedCourses'

export default function LandingPage() {
  const [heroContent, setHeroContent] = useState(null)

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await supabase.from('content_blocks').select('content').eq('key', 'home_hero').single()
      if (data) setHeroContent(data.content)
    }
    fetchContent()
  }, [])

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
                {heroContent ? heroContent.title : "Learn Korean directly from Seoul"} – <br/>
                <span className="text-gradient-brand pb-2">
                  no language barriers!
                </span>
              </h1>
              
              <h2 className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 font-medium">
                {heroContent ? heroContent.subtitle : "Free, interactive trial class with a native Korean tutor and real-time translation."}
              </h2>

              <button 
                onClick={scrollToForm}
                className="btn btn-plum-gradient text-lg px-8 py-4"
              >
                Get my free trial!
              </button>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white rotate-2 hover:rotate-0 transition duration-500">
               <img 
                 src="https://placehold.co/600x400/6a11cb/ffffff?text=Native+Teacher+Waving" 
                 alt="Teacher Waving" 
                 className="w-full h-full object-cover"
               />
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gradient-brand mb-6">An Interactive Glimpse into the Future of Language Learning</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Forget boring textbooks! In this live event, we’ll show you what it’s like to learn using your favorite K-dramas and K-pop songs, not through rote memorization.
            </p>
          </div>
        </section>

        <Countdown />
        <FeaturedCourses /> {/* Dynamic Component */}
        <PainPoints />
        <Method />
        <Testimonials />
        <Agenda />
        <Teachers />
        <LatestBlog />
        <FAQ />

        <section id="registration" className="py-20 px-4 bg-gradient-to-br from-brand-teal to-brand-purple relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="max-w-4xl mx-auto relative z-10 text-center">
            <div className="bg-white/95 backdrop-blur-md p-8 rounded-3xl inline-block w-full max-w-lg shadow-2xl">
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
