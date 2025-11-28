"use client";
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import { useLanguage } from '@/context/LanguageContext'

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
