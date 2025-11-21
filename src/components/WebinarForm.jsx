import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Loader2 } from 'lucide-react'

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
      // Usa doppi apici per evitare errori di escaping
      alert("Errore durante l'iscrizione: " + error.message)
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div className="text-center p-8 bg-green-50 rounded-xl border border-green-200">
        <h3 className="text-2xl font-bold text-green-700 mb-2">Iscrizione Confermata! ðŸŽ‰</h3>
        <p className="text-green-800">Controlla la tua email per il link di Zoom.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-lg max-w-md mx-auto border-t-4 border-brand-purple">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
        <input 
          required
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-purple outline-none"
          value={formData.full_name}
          onChange={e => setFormData({...formData, full_name: e.target.value})}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input 
          required
          type="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-purple outline-none"
          value={formData.email}
          onChange={e => setFormData({...formData, email: e.target.value})}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Scegli una data</label>
        <select 
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-purple outline-none"
          value={formData.webinar_date}
          onChange={e => setFormData({...formData, webinar_date: e.target.value})}
        >
          <option value="Dec 6">6 Dicembre - 18:00</option>
          <option value="Dec 7">7 Dicembre - 18:00</option>
        </select>
      </div>

      <div className="flex items-start gap-3">
        <input 
          required
          type="checkbox" 
          id="gdpr"
          className="mt-1 w-4 h-4 text-brand-purple rounded border-gray-300 focus:ring-brand-purple"
          checked={formData.gdpr_consent}
          onChange={e => setFormData({...formData, gdpr_consent: e.target.checked})}
        />
        <label htmlFor="gdpr" className="text-sm text-gray-600">
          Accetto la <a href="#" className="text-brand-purple underline">Privacy Policy</a>.
        </label>
      </div>

      <button 
        disabled={loading}
        type="submit" 
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-full hover:opacity-90 disabled:opacity-50 flex justify-center items-center"
      >
        {loading ? <Loader2 className="animate-spin mr-2" /> : "Prenota il mio posto GRATIS"}
      </button>
    </form>
  )
}
