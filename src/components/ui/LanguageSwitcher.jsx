"use client";
import { useLanguage } from '@/context/LanguageContext'
import { Globe } from 'lucide-react'

export default function LanguageSwitcher() {
  const { lang, toggleLanguage } = useLanguage()

  return (
    <button 
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition text-xs font-bold text-gray-700"
      title="Switch Language"
    >
      <Globe size={14} />
      <span className="uppercase">{lang}</span>
    </button>
  )
}
