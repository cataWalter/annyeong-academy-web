import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Loader2, CheckCircle, Calendar } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function WebinarForm() {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    webinar_date: "Dec 6",
    gdpr_consent: false
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.gdpr_consent) return alert("You must accept the privacy policy")
    
    setLoading(true)
    
    const { error } = await supabase
      .from('webinar_leads')
      .insert([formData])

    setLoading(false)

    if (error) {
      alert("Registration error: " + error.message)
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center border-t-4 border-green-500">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-brand-dark mb-2">{t('web_success_title')}</h3>
        <p className="text-gray-600 mb-6">{t('web_success_desc')}</p>
        <div className="bg-gray-50 p-4 rounded-xl inline-block text-left">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="text-brand-purple" size={20} />
            <span className="font-bold text-gray-700">{formData.webinar_date === 'Dec 6' ? 'Dec 6' : 'Dec 7'}</span>
          </div>
          <div className="text-sm text-gray-500 ml-8">18:00 - Zoom Live</div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-xl max-w-md mx-auto border-t-4 border-brand-purple relative z-20">
      <h3 className="text-xl font-bold text-brand-dark text-center mb-2">{t('web_title')}</h3>
      
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">{t('web_name')}</label>
        <input 
          required
          type="text"
          placeholder={t('web_name_ph')}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-purple outline-none bg-gray-50 focus:bg-white transition"
          value={formData.full_name}
          onChange={e => setFormData({...formData, full_name: e.target.value})}
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">{t('web_email')}</label>
        <input 
          required
          type="email"
          placeholder="john@email.com"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-purple outline-none bg-gray-50 focus:bg-white transition"
          value={formData.email}
          onChange={e => setFormData({...formData, email: e.target.value})}
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">{t('web_date')}</label>
        <select 
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-purple outline-none bg-gray-50 focus:bg-white transition"
          value={formData.webinar_date}
          onChange={e => setFormData({...formData, webinar_date: e.target.value})}
        >
          <option value="Dec 6">📅 Dec 6 - 18:00</option>
          <option value="Dec 7">📅 Dec 7 - 18:00</option>
        </select>
      </div>

      <div className="flex items-start gap-3">
        <input 
          required
          type="checkbox" 
          id="gdpr"
          className="mt-1 w-4 h-4 text-brand-purple rounded border-gray-300 focus:ring-brand-purple cursor-pointer"
          checked={formData.gdpr_consent}
          onChange={e => setFormData({...formData, gdpr_consent: e.target.checked})}
        />
        <label htmlFor="gdpr" className="text-xs text-gray-500 leading-relaxed cursor-pointer">
          {t('web_gdpr')}
        </label>
      </div>

      <button 
        disabled={loading}
        type="submit" 
        className="w-full bg-gradient-to-r from-brand-blue to-brand-purple text-white font-bold py-4 rounded-xl hover:opacity-90 disabled:opacity-50 flex justify-center items-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition transform"
      >
        {loading ? <Loader2 className="animate-spin" /> : t('web_btn')}
      </button>
      
      <p className="text-center text-xs text-gray-400">🔒 {t('web_secure')}</p>
    </form>
  )
}
