"use client";
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { Facebook, Instagram, Youtube, Music2, Mail, Check } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email) return
    await supabase.from('subscribers').insert([{ email }])
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="bg-brand-dark text-gray-400 py-12">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="grid md:grid-cols-2 gap-12 mb-12 border-b border-gray-800 pb-12">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-gradient-brand mb-4">Annyeong Academy</h3>
            <p className="text-sm max-w-sm mx-auto md:mx-0">
              Breaking language barriers with technology and culture. Learn Korean directly from Seoul.
            </p>
            <div className="flex justify-center md:justify-start gap-6 mt-6">
              <a href="#" className="hover:text-white transition transform hover:scale-110"><Facebook size={24} /></a>
              <a href="#" className="hover:text-white transition transform hover:scale-110"><Instagram size={24} /></a>
              <a href="#" className="hover:text-white transition transform hover:scale-110"><Music2 size={24} /></a>
              <a href="#" className="hover:text-white transition transform hover:scale-110"><Youtube size={24} /></a>
            </div>
          </div>

          <div className="text-center md:text-right">
            <h4 className="text-white font-bold mb-4">Stay Updated</h4>
            {subscribed ? (
              <div className="inline-flex items-center gap-2 text-green-400 font-bold bg-green-900/30 px-4 py-2 rounded-full">
                <Check size={18}/> Subscribed!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm mx-auto md:ml-auto">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 bg-gray-800 border-none rounded-lg px-4 py-2 text-white outline-none focus:ring-2 focus:ring-brand-purple"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <button className="bg-brand-purple text-white p-2 rounded-lg hover:bg-purple-600 transition"><Mail size={20}/></button>
              </form>
            )}
            <p className="text-xs mt-3 opacity-50">Join our newsletter for weekly tips.</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8 text-sm">
          <Link href="/about" className="hover:text-white transition">{t('About Us')}</Link>
          <Link href="/tutors" className="hover:text-white transition">{t('Teachers')}</Link>
          <Link href="/faq" className="hover:text-white transition">{t('FAQ')}</Link>
          <Link href="/contact" className="hover:text-white transition">{t('Contact')}</Link>
          <span className="text-gray-600">|</span>
          <Link href="/privacy" className="hover:text-white transition">{t('Privacy')}</Link>
          <Link href="/terms" className="hover:text-white transition">{t('Terms')}</Link>
          <Link href="/impressum" className="hover:text-white transition">Impressum</Link>
          <Link href="/giveaway-rules" className="hover:text-white transition">Giveaway Rules</Link>
        </div>
        <p className="text-xs opacity-50 text-center">&copy; 2025 Annyeong Academy. All rights reserved.</p>
      </div>
    </footer>
  )
}
