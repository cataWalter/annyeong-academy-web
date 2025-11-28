"use client";
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import { useLanguage } from '@/context/LanguageContext'

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
