"use client";
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Loader2, CheckCircle, Lock } from 'lucide-react'

export default function WebinarForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    gdpr_consent: false
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.gdpr_consent) return alert("You must read the Privacy Policy")
    
    setLoading(true)
    const { error } = await supabase.from('webinar_leads').insert([formData])
    setLoading(false)

    if (error) {
      alert("Registration error: " + error.message)
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center border-t-4 border-green-500 animate-fade-in">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-brand-dark mb-2">You're in! 🎉</h3>
        <p className="text-gray-600">We'll send the Zoom link to your email shortly.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-3xl shadow-2xl max-w-md mx-auto border-t-8 border-brand-purple relative z-20">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-brand-dark">Enter the world of K-Culture!</h3>
        <p className="text-sm text-gray-500 mt-2">Without obstacles. Spots are limited!</p>
      </div>
      
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">Name</label>
        <input 
          required
          type="text"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-purple outline-none bg-gray-50 focus:bg-white transition"
          value={formData.full_name}
          onChange={e => setFormData({...formData, full_name: e.target.value})}
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
        <input 
          required
          type="email"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-purple outline-none bg-gray-50 focus:bg-white transition"
          value={formData.email}
          onChange={e => setFormData({...formData, email: e.target.value})}
        />
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
        <label htmlFor="gdpr" className="text-xs text-gray-500 leading-relaxed cursor-pointer select-none">
          I have read the <a href="/privacy" className="underline hover:text-brand-purple">Privacy Policy</a>.
        </label>
      </div>

      <button 
        disabled={loading}
        type="submit" 
        className="w-full bg-brand-purple text-white font-bold py-4 rounded-xl hover:bg-brand-dark disabled:opacity-50 flex justify-center items-center shadow-lg hover:shadow-xl transition transform active:scale-95"
      >
        {loading ? <Loader2 className="animate-spin" /> : "Send me my ZOOM link!"}
      </button>
      
      <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
        <Lock size={12} /> Your data is safe.
      </p>
    </form>
  )
}
