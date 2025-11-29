"use client";
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Loader2, CheckCircle, Lock } from 'lucide-react'
import { triggerEmail } from '@/lib/emailService'

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
    
    // 1. Save Lead
    const { error } = await supabase.from('webinar_leads').insert([formData])

    if (error) {
      alert("Registration error: " + error.message)
      setLoading(false)
      return
    }

    // 2. Trigger Welcome Email
    await triggerEmail({
      to: formData.email,
      subject: "Your Korean Trial Class Link! 🇰🇷",
      html: `
        <h1>Annyeong, ${formData.full_name}!</h1>
        <p>You are confirmed for the live class.</p>
        <p><strong>Zoom Link:</strong> <a href="https://zoom.us/j/123456789">Click Here to Join</a></p>
        <p>See you there!</p>
      `
    })

    setLoading(false)
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center border-t-4 border-green-500 animate-fade-in">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-brand-dark mb-2">You're in! 🎉</h3>
        <p className="text-gray-600">We've sent the Zoom link to <strong>{formData.email}</strong>.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-brand-dark">Enter the world of K-Culture – without obstacles!</h3>
        <p className="text-sm text-gray-500 mt-2">This free webinar is the first step to listening to your next series with different ears. Spots are limited!</p>
      </div>
      
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1 text-left">Name</label>
        <input 
          required
          type="text"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-purple outline-none bg-gray-50 focus:bg-white transition"
          value={formData.full_name}
          onChange={e => setFormData({...formData, full_name: e.target.value})}
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1 text-left">Email Address</label>
        <input 
          required
          type="email"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-purple outline-none bg-gray-50 focus:bg-white transition"
          value={formData.email}
          onChange={e => setFormData({...formData, email: e.target.value})}
        />
      </div>

      <div className="flex items-start gap-3 text-left">
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
        className="btn btn-plum-gradient w-full py-4 disabled:opacity-50"
      >
        {loading ? <Loader2 className="animate-spin" /> : "Send me my ZOOM link!"}
      </button>
      
      <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
        <Lock size={12} /> Your data is safe.
      </p>
    </form>
  )
}
