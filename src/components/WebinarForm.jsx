import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Loader2, CheckCircle, Calendar } from 'lucide-react'

export default function WebinarForm() {
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
    if (!formData.gdpr_consent) return alert("Devi accettare la privacy policy")
    
    setLoading(true)
    
    const { error } = await supabase
      .from('webinar_leads')
      .insert([formData])

    setLoading(false)

    if (error) {
      alert("Errore durante l'iscrizione: " + error.message)
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
        <h3 className="text-2xl font-bold text-brand-dark mb-2">Iscrizione Confermata! 🎉</h3>
        <p className="text-gray-600 mb-6">
          Grazie {formData.full_name.split(' ')[0]}! Ti abbiamo riservato un posto.
          <br/>Controlla la tua email per il link di Zoom.
        </p>
        <div className="bg-gray-50 p-4 rounded-xl inline-block text-left">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="text-brand-purple" size={20} />
            <span className="font-bold text-gray-700">{formData.webinar_date === 'Dec 6' ? 'Venerdì 6 Dicembre' : 'Sabato 7 Dicembre'}</span>
          </div>
          <div className="text-sm text-gray-500 ml-8">Ore 18:00 - Live su Zoom</div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-xl max-w-md mx-auto border-t-4 border-brand-purple relative z-20">
      <h3 className="text-xl font-bold text-brand-dark text-center mb-2">Prenota il tuo posto</h3>
      
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">Nome Completo</label>
        <input 
          required
          type="text"
          placeholder="Es. Mario Rossi"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-purple outline-none bg-gray-50 focus:bg-white transition"
          value={formData.full_name}
          onChange={e => setFormData({...formData, full_name: e.target.value})}
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
        <input 
          required
          type="email"
          placeholder="mario@email.com"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-purple outline-none bg-gray-50 focus:bg-white transition"
          value={formData.email}
          onChange={e => setFormData({...formData, email: e.target.value})}
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">Scegli una data</label>
        <select 
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-purple outline-none bg-gray-50 focus:bg-white transition"
          value={formData.webinar_date}
          onChange={e => setFormData({...formData, webinar_date: e.target.value})}
        >
          <option value="Dec 6">📅 6 Dicembre - 18:00 (Venerdì)</option>
          <option value="Dec 7">📅 7 Dicembre - 18:00 (Sabato)</option>
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
          Acconsento al trattamento dei dati personali secondo la <a href="/privacy" target="_blank" className="text-brand-purple underline hover:text-brand-blue">Privacy Policy</a>. Riceverai email solo relative a questo evento.
        </label>
      </div>

      <button 
        disabled={loading}
        type="submit" 
        className="w-full bg-gradient-to-r from-brand-blue to-brand-purple text-white font-bold py-4 rounded-xl hover:opacity-90 disabled:opacity-50 flex justify-center items-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition transform"
      >
        {loading ? <Loader2 className="animate-spin" /> : "ISCRIVITI GRATIS ORA"}
      </button>
      
      <p className="text-center text-xs text-gray-400">🔒 I tuoi dati sono al sicuro. Nessuno spam.</p>
    </form>
  )
}
