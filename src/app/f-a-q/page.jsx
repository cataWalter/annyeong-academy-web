"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import { Loader2 } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function FAQ() {
  const { t } = useLanguage()
  const [faqs, setFaqs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFaqs = async () => {
      const { data } = await supabase.from('faqs').select('*').order('order', { ascending: true })
      setFaqs(data || [])
      setLoading(false)
    }
    fetchFaqs()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FC]">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-brand-dark mb-6 text-center">{t('faq_title')}</h1>
          <p className="text-center text-gray-600 mb-12">{t('faq_desc')}</p>

          {loading ? <Loader2 className="animate-spin mx-auto text-brand-purple"/> : (
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details key={faq.id} className="group bg-white p-6 rounded-2xl shadow-sm cursor-pointer open:ring-2 open:ring-brand-purple/20 transition">
                  <summary className="font-bold text-lg text-brand-dark list-none flex justify-between items-center">
                    {faq.question}
                    <span className="text-brand-purple group-open:rotate-180 transition text-2xl">▼</span>
                  </summary>
                  <p className="text-gray-600 mt-4 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
              {faqs.length === 0 && <p className="text-center text-gray-400">No questions yet.</p>}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
