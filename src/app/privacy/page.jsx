"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import { Loader2 } from 'lucide-react'

export default function PrivacyPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('content_blocks').select('content').eq('key', 'privacy_policy').single()
      setData(data?.content || { title: 'Privacy Policy', body: 'Content loading...' })
      setLoading(false)
    }
    fetch()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FC]">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          {loading ? <Loader2 className="animate-spin mx-auto text-brand-purple"/> : (
            <>
              <h1 className="text-3xl font-bold text-brand-dark mb-8">{data.title}</h1>
              <div className="prose prose-gray text-gray-600 leading-relaxed whitespace-pre-wrap">
                {data.body}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
