#!/bin/bash

echo "⚓ Fixing Footer Alignment (Sticky Footer)..."

# 1. UPDATE LANDING PAGE
echo "🛠️ Updating LandingPage.jsx..."
cat << 'EOF' > src/pages/LandingPage.jsx
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
    <div className="min-h-screen bg-[#F8F9FC] font-sans text-gray-800 flex flex-col">
      <Navbar />

      <main className="flex-grow">
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
      </main>
      
      <Footer />
    </div>
  )
}
EOF

# 2. UPDATE ABOUT PAGE
echo "🛠️ Updating About.jsx..."
cat << 'EOF' > src/pages/About.jsx
import Navbar from '../components/sections/Navbar'
import Footer from '../components/sections/Footer'
import { useLanguage } from '../context/LanguageContext'

export default function About() {
  const { t } = useLanguage()
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FC]">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold text-brand-dark mb-6">{t('about_title')}</h1>
          <p className="text-xl text-gray-600">
            {t('about_subtitle')}
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <img src="https://placehold.co/600x400/6a11cb/ffffff?text=Team+Annyeong" className="rounded-3xl shadow-xl" alt="Team" />
          <div className="space-y-6 text-gray-700">
            <h2 className="text-2xl font-bold text-brand-purple">{t('about_who_title')}</h2>
            <p>{t('about_who_p1')}</p>
            <p>{t('about_who_p2')}</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
EOF

# 3. UPDATE CONTACT PAGE
echo "🛠️ Updating Contact.jsx..."
cat << 'EOF' > src/pages/Contact.jsx
import { useState } from 'react'
import Navbar from '../components/sections/Navbar'
import Footer from '../components/sections/Footer'
import { Mail, Phone, Loader2 } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useLanguage } from '../context/LanguageContext'

export default function Contact() {
  const { t } = useLanguage()
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await supabase.from('contact_messages').insert([formData])
      setSent(true)
    } catch (error) {
      alert("Error sending message")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FC]">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          
          <div>
            <h1 className="text-4xl font-bold text-brand-dark mb-6">{t('contact_title')}</h1>
            <p className="text-gray-600 mb-8">{t('contact_desc')}</p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-brand-purple"><Mail /></div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-bold text-brand-dark">info@annyeong-academy.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-brand-blue"><Phone /></div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-bold text-brand-dark">+36 30 123 4567</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg">
            {sent ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-brand-dark">{t('contact_sent')}</h3>
                <p className="text-gray-500">{t('contact_reply')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('contact_name')}</label>
                  <input 
                    required 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-purple outline-none"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('auth_email')}</label>
                  <input 
                    required 
                    type="email" 
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-purple outline-none"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('contact_msg')}</label>
                  <textarea 
                    required 
                    rows="4" 
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-purple outline-none"
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>
                <button 
                  disabled={loading}
                  type="submit" 
                  className="w-full bg-brand-dark text-white font-bold py-3 rounded-xl hover:opacity-90 transition flex justify-center"
                >
                  {loading ? <Loader2 className="animate-spin" /> : t('btn_send')}
                </button>
              </form>
            )}
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}
EOF

# 4. UPDATE FAQ PAGE
echo "🛠️ Updating FAQ.jsx..."
cat << 'EOF' > src/pages/FAQ.jsx
import Navbar from '../components/sections/Navbar'
import Footer from '../components/sections/Footer'
import { useLanguage } from '../context/LanguageContext'

export default function FAQ() {
  const { t } = useLanguage()
  const faqs = [1, 2, 3, 4, 5]

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FC]">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-brand-dark mb-6 text-center">{t('faq_title')}</h1>
          <p className="text-center text-gray-600 mb-12">
            {t('faq_desc')}
          </p>

          <div className="space-y-4">
            {faqs.map((i) => (
              <details key={i} className="group bg-white p-6 rounded-2xl shadow-sm cursor-pointer open:ring-2 open:ring-brand-purple/20 transition">
                <summary className="font-bold text-lg text-brand-dark list-none flex justify-between items-center">
                  {t(`faq_${i}_q`)}
                  <span className="text-brand-purple group-open:rotate-180 transition text-2xl">▼</span>
                </summary>
                <p className="text-gray-600 mt-4 leading-relaxed">
                  {t(`faq_${i}_a`)}
                </p>
              </details>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
EOF

# 5. UPDATE TUTORS PAGE
echo "🛠️ Updating Tutors.jsx..."
cat << 'EOF' > src/pages/Tutors.jsx
import Navbar from '../components/sections/Navbar'
import Footer from '../components/sections/Footer'
import { useLanguage } from '../context/LanguageContext'

export default function Tutors() {
  const { t } = useLanguage()
  const tutors = [
    {
      id: 1,
      name: "Kim Seon-saeng-nim",
      role: t('tutor_1_role'),
      image: "https://placehold.co/300x300/6a11cb/ffffff?text=Kim",
      bio: t('tutor_1_bio'),
      specialties: ["Basic Grammar", "Korean Culture", "K-Pop"]
    },
    {
      id: 2,
      name: "Lee Seon-saeng-nim",
      role: t('tutor_2_role'),
      image: "https://placehold.co/300x300/2575fc/ffffff?text=Lee",
      bio: t('tutor_2_bio'),
      specialties: ["Speaking", "Acting", "Slang"]
    },
    {
      id: 3,
      name: "Park Seon-saeng-nim",
      role: t('tutor_3_role'),
      image: "https://placehold.co/300x300/ff9900/ffffff?text=Park",
      bio: t('tutor_3_bio'),
      specialties: ["TOPIK I & II", "Formal Writing", "Business Korean"]
    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FC]">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold text-brand-dark mb-6">{t('tutors_title')}</h1>
          <p className="text-xl text-gray-600">
            {t('tutors_desc')}
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {tutors.map(tutor => (
            <div key={tutor.id} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:-translate-y-2 transition duration-300">
              <div className="h-64 overflow-hidden bg-gray-100">
                <img src={tutor.image} alt={tutor.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-brand-dark mb-1">{tutor.name}</h3>
                <p className="text-brand-purple font-bold text-sm uppercase tracking-wider mb-4">{tutor.role}</p>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  {tutor.bio}
                </p>
                <div className="flex flex-wrap gap-2">
                  {tutor.specialties.map(tag => (
                    <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
EOF

# 6. UPDATE PRIVACY PAGE
echo "🛠️ Updating PrivacyPage.jsx..."
cat << 'EOF' > src/pages/PrivacyPage.jsx
import Navbar from '../components/sections/Navbar'
import Footer from '../components/sections/Footer'
import { useLanguage } from '../context/LanguageContext'

export default function PrivacyPage() {
  const { t } = useLanguage()
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FC]">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          <h1 className="text-3xl font-bold text-brand-dark mb-8">{t('privacy_title')}</h1>
          <div className="prose prose-gray text-gray-600 leading-relaxed">
            <p className="mb-4"><strong>Last updated:</strong> November 21, 2025</p>
            <p>We value your privacy and are committed to protecting your personal data.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
EOF

# 7. UPDATE TERMS PAGE
echo "🛠️ Updating TermsPage.jsx..."
cat << 'EOF' > src/pages/TermsPage.jsx
import Navbar from '../components/sections/Navbar'
import Footer from '../components/sections/Footer'
import { useLanguage } from '../context/LanguageContext'

export default function TermsPage() {
  const { t } = useLanguage()
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FC]">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          <h1 className="text-3xl font-bold text-brand-dark mb-8">{t('terms_title')}</h1>
          <div className="prose prose-gray text-gray-600 leading-relaxed">
            <p className="mb-4">Welcome to Annyeong Academy.</p>
            <p>Use of this site constitutes acceptance of our terms.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
EOF

echo "✅ Footer layout fixed on all public pages!"