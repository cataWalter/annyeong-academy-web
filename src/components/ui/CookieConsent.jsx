"use client";
import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { Cookie } from 'lucide-react'

export default function CookieConsent() {
  const [show, setShow] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) setTimeout(() => setShow(true), 1000)
  }, [])

  const accept = () => {
    localStorage.setItem('cookie_consent', 'true')
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-96 bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 z-[60] animate-slide-up">
      <div className="flex items-start gap-4">
        <div className="bg-orange-100 p-2 rounded-full text-orange-500 shrink-0"><Cookie size={24}/></div>
        <div>
          <h4 className="font-bold text-gray-800 mb-1">Cookies 🍪</h4>
          <p className="text-xs text-gray-500 leading-relaxed mb-4">
            We use cookies to improve your learning experience and analyze traffic. By continuing, you agree to our use of cookies.
          </p>
          <div className="flex gap-2">
            <button onClick={accept} className="flex-1 bg-brand-dark text-white py-2 rounded-lg text-xs font-bold hover:bg-gray-800 transition">
              Accept All
            </button>
            <button onClick={accept} className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg text-xs font-bold hover:bg-gray-200 transition">
              Essential Only
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
