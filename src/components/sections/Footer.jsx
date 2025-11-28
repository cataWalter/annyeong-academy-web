"use client";

import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-brand-dark text-gray-400 py-12 text-center">
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-2xl font-bold text-white mb-6">Annyeong Academy</h3>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8 text-sm">
          <Link href="/about" className="hover:text-white transition">{t('About Us')}</Link>
          <Link href="/tutors" className="hover:text-white transition">{t('Teachers')}</Link>
          <Link href="/faq" className="hover:text-white transition">{t('FAQ')}</Link>
          <Link href="/contact" className="hover:text-white transition">{t('Contact')}</Link>
          <span className="text-gray-600">|</span>
          <Link href="/privacy" className="hover:text-white transition">{t('Privacy')}</Link>
          <Link href="/termini" className="hover:text-white transition">{t('Terms')}</Link>
        </div>
        <p className="text-xs opacity-50">&copy; 2025 Annyeong Academy. All rights reserved.</p>
      </div>
    </footer>
  )
}
