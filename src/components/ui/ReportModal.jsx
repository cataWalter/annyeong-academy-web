"use client";
import { useState } from 'react'
import { AlertTriangle, X, Loader2, Send } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useLanguage } from '@/context/LanguageContext'

export default function ReportModal({ isOpen, onClose, contextData }) {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await supabase.from('contact_messages').insert([{
        name: 'User Report',
        email: 'system@report.com',
        message: `REPORT [${contextData}]: ${message}`
      }])
      setLoading(false)
      setSent(true)
      setTimeout(() => { setSent(false); setMessage(''); onClose() }, 2000)
    } catch (error) {
      setLoading(false)
      alert("Error sending report")
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={20}/></button>
        
        <div className="flex items-center gap-3 mb-4 text-orange-600">
          <AlertTriangle />
          <h3 className="font-bold text-lg">{t('report_title')}</h3>
        </div>

        {sent ? (
          <div className="text-center py-8 text-green-600 font-bold">{t('report_sent')}</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p className="text-sm text-gray-500 mb-4">{t('report_desc')}</p>
            <textarea 
              required
              className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 text-sm mb-4"
              rows="4"
              placeholder={t('report_placeholder')}
              value={message}
              onChange={e => setMessage(e.target.value)}
            ></textarea>
            <button disabled={loading} className="w-full bg-orange-500 text-white font-bold py-2 rounded-xl hover:bg-orange-600 transition flex justify-center items-center gap-2">
              {loading ? <Loader2 className="animate-spin" size={18}/> : <><Send size={18}/> {t('report_btn')}</>}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
