#!/bin/bash

echo "🇰🇷 Building Annyeong Academy Landing Page..."

# Ensure directories exist
mkdir -p src/components/sections
mkdir -p src/app

# ==============================================================================
# 1. COUNTDOWN COMPONENT
# ==============================================================================
echo "⏳ Creating Countdown Component..."
cat > src/components/sections/Countdown.jsx << 'EOF'
"use client";
import { useState, useEffect } from 'react'
import Section from '../ui/Section'

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Target: Dec 14, 11:00 AM (Current Year)
    const currentYear = new Date().getFullYear();
    const targetDate = new Date(`December 14, ${currentYear} 11:00:00`).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const scrollToForm = () => {
    document.getElementById('registration').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-brand-dark text-white py-8 px-4 text-center">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-brand-blue mb-1">Don't miss out!</p>
          <p className="text-xl font-medium">The trial class starts in:</p>
        </div>
        
        <div className="flex gap-4 text-center">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Mins', value: timeLeft.minutes },
            { label: 'Secs', value: timeLeft.seconds }
          ].map((item, idx) => (
            <div key={idx} className="bg-white/10 rounded-lg p-3 min-w-[70px] backdrop-blur-sm">
              <span className="block text-2xl font-bold font-mono">{item.value}</span>
              <span className="text-xs text-gray-400 uppercase">{item.label}</span>
            </div>
          ))}
        </div>

        <button 
          onClick={scrollToForm}
          className="bg-brand-purple hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-full transition shadow-lg hover:shadow-purple-500/25 whitespace-nowrap"
        >
          Reserve my spot now!
        </button>
      </div>
    </section>
  )
}
EOF

# ==============================================================================
# 2. PAIN POINTS COMPONENT
# ==============================================================================
echo "😫 Creating Pain Points Component..."
cat > src/components/sections/PainPoints.jsx << 'EOF'
"use client";
import Section from '../ui/Section'
import { Tv, Music, Frown, ArrowDown } from 'lucide-react'

export default function PainPoints() {
  const scrollToForm = () => {
    document.getElementById('registration').scrollIntoView({ behavior: 'smooth' });
  };

  const cards = [
    {
      icon: <Tv size={40} className="text-brand-purple" />,
      title: "The Subtitle Addict",
      text: "Do you love K-dramas but hate constantly reading subtitles, missing the actors' expressions? Do you want to finally understand the nuances that get lost in translation?"
    },
    {
      icon: <Music size={40} className="text-brand-blue" />,
      title: "The Music Lover",
      text: "Is your playlist full of BTS or Stray Kids songs? Do you want to understand what they are singing about, write them a fan letter, or ask them a question they can actually understand?"
    },
    {
      icon: <Frown size={40} className="text-orange-500" />,
      title: "The Hesitant Beginner",
      text: "Do you think you have no talent for languages? Did you struggle with languages in school and fear Korean will be the same? With us, that’s no longer an obstacle!"
    }
  ];

  return (
    <Section className="bg-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">Does this feeling sound familiar?</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {cards.map((card, idx) => (
          <div key={idx} className="bg-gray-50 rounded-3xl p-8 hover:shadow-xl transition duration-300 border border-transparent hover:border-brand-purple/20">
            <div className="bg-white w-20 h-20 rounded-2xl flex items-center justify-center shadow-sm mb-6 mx-auto">
              {card.icon}
            </div>
            <h3 className="text-xl font-bold text-brand-dark mb-4 text-center">{card.title}</h3>
            <p className="text-gray-600 leading-relaxed text-center">{card.text}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <button 
          onClick={scrollToForm}
          className="inline-flex items-center gap-2 bg-brand-dark text-white font-bold py-4 px-10 rounded-xl hover:bg-gray-800 transition shadow-lg transform hover:-translate-y-1"
        >
          I need this! <ArrowDown size={20} />
        </button>
      </div>
    </Section>
  )
}
EOF

# ==============================================================================
# 3. METHOD COMPONENT
# ==============================================================================
echo "💡 Creating Method Component..."
cat > src/components/sections/Method.jsx << 'EOF'
"use client";
import Section from '../ui/Section'
import { Clapperboard, MapPin, MessageCircle, Rocket } from 'lucide-react'

export default function Method() {
  const scrollToForm = () => {
    document.getElementById('registration').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Section className="bg-[#F8F9FC]">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">How does it work in practice?</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        {/* Item 1 */}
        <div className="flex gap-6 items-start">
          <div className="flex-shrink-0 w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-brand-purple">
            <Clapperboard size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-brand-dark mb-2">K-Culture instead of Textbooks</h3>
            <p className="text-gray-600 leading-relaxed">
              We don’t fill out boring worksheets! The curriculum is built on your favorite K-pop songs, K-drama scenes, and variety shows. Since your teacher is Korean and lives in Seoul, they bring you real daily life, the freshest slang, and vibrant culture, not dry theory.
            </p>
          </div>
        </div>

        {/* Item 2 */}
        <div className="flex gap-6 items-start">
          <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-brand-blue">
            <MapPin size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-brand-dark mb-2">Native Environment</h3>
            <p className="text-gray-600 leading-relaxed">
              Immerse yourself completely in the language! Your teacher speaks in Korean and explains concepts in English, ensuring you hear the purest, most authentic pronunciation from day one. You will pick up the natural rhythm and intonation.
            </p>
          </div>
        </div>

        {/* Item 3 */}
        <div className="flex gap-6 items-start">
          <div className="flex-shrink-0 w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
            <MessageCircle size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-brand-dark mb-2">Real-Time Translation</h3>
            <p className="text-gray-600 leading-relaxed">
              Don't worry about getting lost! Every explanation appears instantly on your screen as translated subtitles in real-time. It feels just like watching your favorite series with subs, bridging the gap between you and the teacher.
            </p>
          </div>
        </div>

        {/* Item 4 */}
        <div className="flex gap-6 items-start">
          <div className="flex-shrink-0 w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-500">
            <Rocket size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-brand-dark mb-2">Simple Technology</h3>
            <p className="text-gray-600 leading-relaxed">
              You don’t need to be a tech genius. Our smart platform runs smoothly in your web browser, handling the live connection and subtitles automatically. If you can click a link, you are ready to go!
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mt-16">
        <button 
          onClick={scrollToForm}
          className="bg-gradient-to-r from-brand-blue to-brand-purple text-white font-bold py-4 px-12 rounded-full shadow-lg hover:opacity-90 transition transform hover:scale-105"
        >
          Hwaiting, I'll be there!
        </button>
      </div>
    </Section>
  )
}
EOF

# ==============================================================================
# 4. UPDATING AGENDA
# ==============================================================================
echo "📅 Updating Agenda..."
cat > src/components/sections/Agenda.jsx << 'EOF'
"use client";
import Section from '../ui/Section'

export default function Agenda() {
  return (
    <Section className="bg-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-brand-dark">What awaits you at the free event?</h2>
      </div>

      <div className="max-w-4xl mx-auto space-y-8 relative before:absolute before:left-4 md:before:left-1/2 before:top-2 before:h-full before:w-0.5 before:bg-gray-200 before:-translate-x-1/2">
        
        {/* Item 1 */}
        <div className="relative flex flex-col md:flex-row gap-8 items-center">
          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 bg-brand-purple border-4 border-white rounded-full z-10 shadow-sm"></div>
          <div className="md:w-1/2 md:text-right md:pr-12 pl-12 md:pl-0">
            <span className="inline-block bg-purple-100 text-brand-purple text-xs font-bold px-3 py-1 rounded-full mb-2">Topic 1</span>
            <h3 className="text-xl font-bold text-brand-dark">Exclusive Cultural Insight</h3>
            <p className="text-gray-600 mt-2 text-sm italic">What are Koreans like in real life vs. how we see them in K-dramas?</p>
          </div>
          <div className="md:w-1/2 pl-12 md:pl-12">
            <div className="bg-gray-50 p-6 rounded-2xl text-sm text-gray-600 border border-gray-100">
              <ul className="list-disc ml-4 space-y-1">
                <li>The "Oppa" Myth: Are Korean men really romantic?</li>
                <li>Hierarchy & Respect: Age vs. Rank.</li>
                <li>Seoul by Night: The truth about <i>hoesik</i> culture.</li>
                <li>Chaebols & Plastic Surgery: Fact vs. Fiction.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Item 2 */}
        <div className="relative flex flex-col md:flex-row-reverse gap-8 items-center">
          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 bg-brand-blue border-4 border-white rounded-full z-10 shadow-sm"></div>
          <div className="md:w-1/2 md:text-left md:pl-12 pl-12">
            <span className="inline-block bg-blue-100 text-brand-blue text-xs font-bold px-3 py-1 rounded-full mb-2">Topic 2</span>
            <h3 className="text-xl font-bold text-brand-dark">Meet the Tutors</h3>
            <p className="text-gray-600 mt-2 text-sm">Meet your future mentors who bring the lively, bubbling reality of Korea to you instead of textbook examples.</p>
          </div>
          <div className="md:w-1/2 md:pr-12 pl-12 md:pl-0"></div>
        </div>

        {/* Item 3 */}
        <div className="relative flex flex-col md:flex-row gap-8 items-center">
          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 bg-orange-500 border-4 border-white rounded-full z-10 shadow-sm"></div>
          <div className="md:w-1/2 md:text-right md:pr-12 pl-12 md:pl-0">
            <span className="inline-block bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full mb-2">Topic 3</span>
            <h3 className="text-xl font-bold text-brand-dark">AI-Assisted Trial Lesson</h3>
            <p className="text-gray-600 mt-2 text-sm">Let's learn the first 5 most important phrases together! Test the translation system live.</p>
          </div>
          <div className="md:w-1/2 pl-12 md:pl-12"></div>
        </div>

        {/* Item 4 */}
        <div className="relative flex flex-col md:flex-row-reverse gap-8 items-center">
          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 bg-green-500 border-4 border-white rounded-full z-10 shadow-sm"></div>
          <div className="md:w-1/2 md:text-left md:pl-12 pl-12">
            <span className="inline-block bg-green-100 text-green-600 text-xs font-bold px-3 py-1 rounded-full mb-2">Bonus</span>
            <h3 className="text-xl font-bold text-brand-dark">Special Offer 🎁</h3>
            <p className="text-gray-600 mt-2 text-sm">A surprise reserved only for live participants!</p>
          </div>
          <div className="md:w-1/2 md:pr-12 pl-12 md:pl-0"></div>
        </div>

      </div>
    </Section>
  )
}
EOF

# ==============================================================================
# 5. UPDATING TESTIMONIALS
# ==============================================================================
echo "💬 Updating Testimonials..."
cat > src/components/sections/Testimonials.jsx << 'EOF'
"use client";
import Section from '../ui/Section'
import { Quote } from 'lucide-react'

export default function Testimonials() {
  return (
    <Section className="bg-[#F8F9FC]">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-brand-dark">Social Proof</h2>
      </div>
      
      <div className="flex flex-wrap justify-center gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md flex-1 min-w-[300px] relative">
          <Quote className="w-10 h-10 text-brand-purple absolute top-6 left-6 opacity-20" />
          <p className="text-gray-700 italic mb-6 text-lg relative z-10 pt-4">
            "Finally, I don't need to be fluent in English to learn Korean! This technology is incredible."
          </p>
          <div className="font-bold text-brand-dark border-l-4 border-brand-purple pl-3">
            – Susie
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md flex-1 min-w-[300px] relative">
          <Quote className="w-10 h-10 text-brand-blue absolute top-6 left-6 opacity-20" />
          <p className="text-gray-700 italic mb-6 text-lg relative z-10 pt-4">
            "I love that the teacher connects live from Seoul. It feels like I'm actually there."
          </p>
          <div className="font-bold text-brand-dark border-l-4 border-brand-blue pl-3">
            – Esther
          </div>
        </div>
      </div>
    </Section>
  )
}
EOF

# ==============================================================================
# 6. UPDATING TEACHERS
# ==============================================================================
echo "👩‍🏫 Updating Teachers..."
cat > src/components/sections/Teachers.jsx << 'EOF'
"use client";
import Section from '../ui/Section'

export default function Teachers() {
  return (
    <Section className="bg-[#F8F9FC]">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">Who will you learn from?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Native teachers who currently live in Korea. They don't teach from a 10-year-old textbook but deliver the living language of today. Their mission is to share their love for their culture with you – without language barriers.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-12">
        <div className="bg-white p-0 rounded-3xl shadow-lg max-w-sm text-center overflow-hidden group">
          <div className="h-64 bg-gray-200 relative overflow-hidden">
             {/* Placeholder for Tutor 1 Image */}
             <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100">
               <span className="font-bold">Image Placeholder</span>
             </div>
          </div>
          <div className="p-8">
            <h3 className="text-2xl font-bold text-brand-dark mb-2">Tutor 1</h3>
            <p className="text-gray-600 italic">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>

        <div className="bg-white p-0 rounded-3xl shadow-lg max-w-sm text-center overflow-hidden group">
          <div className="h-64 bg-gray-200 relative overflow-hidden">
             {/* Placeholder for Tutor 2 Image */}
             <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100">
               <span className="font-bold">Image Placeholder</span>
             </div>
          </div>
          <div className="p-8">
            <h3 className="text-2xl font-bold text-brand-dark mb-2">Tutor 2</h3>
            <p className="text-gray-600 italic">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}
EOF

# ==============================================================================
# 7. UPDATING FAQ
# ==============================================================================
echo "❓ Updating FAQ..."
cat > src/components/sections/FAQ.jsx << 'EOF'
"use client";
import Section from '../ui/Section'

export default function FAQ() {
  const items = [
    {
      q: "Do I need to install anything on my computer?",
      a: "Not necessarily, the system works from a browser, but we help with everything regarding the connection!"
    },
    {
      q: "Does the translation really work?",
      a: "Yes! Come and test it yourself. That’s exactly why we are holding this trial class, so you can see: you can do this too."
    },
    {
      q: "Am I too old/young for this?",
      a: "The love for Korean culture has no age limit. Our groups are inclusive, and the technology helps everyone."
    }
  ];

  return (
    <Section className="bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-brand-dark mb-8 text-center">FAQ</h2>
        
        <div className="space-y-4">
          {items.map((item, i) => (
            <details key={i} className="group bg-gray-50 p-6 rounded-2xl shadow-sm cursor-pointer open:ring-2 open:ring-brand-purple/20 transition">
              <summary className="font-bold text-lg text-brand-dark list-none flex justify-between items-center">
                {item.q}
                <span className="text-brand-purple group-open:rotate-180 transition text-2xl">▼</span>
              </summary>
              <p className="text-gray-600 mt-4 leading-relaxed">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  )
}
EOF

# ==============================================================================
# 8. UPDATING WEBINAR FORM
# ==============================================================================
echo "📝 Updating Webinar Form..."
cat > src/components/WebinarForm.jsx << 'EOF'
"use client";
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Loader2, CheckCircle, Lock } from 'lucide-react'

export default function WebinarForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    gdpr_consent: false
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.gdpr_consent) return alert("You must read the Privacy Policy")
    
    setLoading(true)
    const { error } = await supabase.from('webinar_leads').insert([formData])
    setLoading(false)

    if (error) {
      alert("Registration error: " + error.message)
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center border-t-4 border-green-500 animate-fade-in">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-brand-dark mb-2">You're in! 🎉</h3>
        <p className="text-gray-600">We'll send the Zoom link to your email shortly.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-3xl shadow-2xl max-w-md mx-auto border-t-8 border-brand-purple relative z-20">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-brand-dark">Enter the world of K-Culture!</h3>
        <p className="text-sm text-gray-500 mt-2">Without obstacles. Spots are limited!</p>
      </div>
      
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">Name</label>
        <input 
          required
          type="text"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-purple outline-none bg-gray-50 focus:bg-white transition"
          value={formData.full_name}
          onChange={e => setFormData({...formData, full_name: e.target.value})}
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
        <input 
          required
          type="email"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-purple outline-none bg-gray-50 focus:bg-white transition"
          value={formData.email}
          onChange={e => setFormData({...formData, email: e.target.value})}
        />
      </div>

      <div className="flex items-start gap-3">
        <input 
          required
          type="checkbox" 
          id="gdpr"
          className="mt-1 w-4 h-4 text-brand-purple rounded border-gray-300 focus:ring-brand-purple cursor-pointer"
          checked={formData.gdpr_consent}
          onChange={e => setFormData({...formData, gdpr_consent: e.target.checked})}
        />
        <label htmlFor="gdpr" className="text-xs text-gray-500 leading-relaxed cursor-pointer select-none">
          I have read the <a href="/privacy" className="underline hover:text-brand-purple">Privacy Policy</a>.
        </label>
      </div>

      <button 
        disabled={loading}
        type="submit" 
        className="w-full bg-brand-purple text-white font-bold py-4 rounded-xl hover:bg-brand-dark disabled:opacity-50 flex justify-center items-center shadow-lg hover:shadow-xl transition transform active:scale-95"
      >
        {loading ? <Loader2 className="animate-spin" /> : "Send me my ZOOM link!"}
      </button>
      
      <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
        <Lock size={12} /> Your data is safe.
      </p>
    </form>
  )
}
EOF

# ==============================================================================
# 9. STICKY MOBILE BAR
# ==============================================================================
echo "📱 Creating Sticky Mobile Bar..."
cat > src/components/sections/StickyBar.jsx << 'EOF'
"use client";
import { useState, useEffect } from 'react'

export default function StickyBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show only after scrolling past header (100px)
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToForm = () => {
    document.getElementById('registration').scrollIntoView({ behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] z-50 flex items-center justify-between animate-slide-up">
      <div className="text-sm font-bold text-brand-dark">
        Free Korean Trial + <br/> AI Translation
      </div>
      <button 
        onClick={scrollToForm}
        className="bg-brand-purple text-white px-6 py-2 rounded-lg font-bold shadow-md"
      >
        Sign Up
      </button>
    </div>
  )
}
EOF

# ==============================================================================
# 10. ASSEMBLING MAIN PAGE
# ==============================================================================
echo "🚀 Assembling Main Page..."
cat > src/app/page.jsx << 'EOF'
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
EOF

echo "✅ Landing Page Built Successfully!"
echo "👉 Run 'npm run dev' to view the changes."