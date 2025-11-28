"use client";
import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'

export default function LegalNotice() {
  const [show, setShow] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) setShow(true)
  }, [])

  const accept = () => {
    localStorage.setItem('cookie_consent', 'true')
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 animate-slide-in">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-600 text-center md:text-left">
          🍪 {t('legal_cookie')} 
          <a href="/privacy" className="underline ml-1 text-brand-purple">{t('footer_privacy')}</a>.
        </p>
        <button onClick={accept} className="bg-brand-dark text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-gray-800 transition whitespace-nowrap">
          {t('legal_accept')}
        </button>
      </div>
    </div>
  )
}
