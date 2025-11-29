"use client";

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { Loader2, User, Mail, Lock, Gift } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function Register() {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [referrer, setReferrer] = useState(null)
  const { signUp } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const refId = searchParams.get('ref')
    if (refId) checkReferrer(refId)
  }, [searchParams])

  const checkReferrer = async (id) => {
    const { data } = await supabase.from('profiles').select('full_name').eq('id', id).single()
    if (data) setReferrer({ id, name: data.full_name })
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const { data, error } = await signUp({ 
      email: formData.email, 
      password: formData.password,
      options: { data: { full_name: formData.fullName } }
    })

    if (error) {
      alert("Registration error: " + error.message)
    } else {
      // Record Referral if exists
      if (referrer && data.user) {
        await supabase.from('referrals').insert([{
          referrer_id: referrer.id,
          referred_email: formData.email,
          status: 'joined'
        }])
        // Give bonus XP to referrer (using our RPC function)
        // Note: In a real app, use a secure server-side trigger for XP
      }
      
      alert("Registration successful! Please check your email.")
      router.push('/login')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FC] px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full border-t-4 border-brand-blue">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-brand-dark">Create Account 🚀</h1>
          <p className="text-gray-500">Start learning Korean today</p>
        </div>

        {referrer && (
          <div className="bg-purple-50 border border-purple-100 p-3 rounded-xl mb-6 flex items-center gap-3 text-sm">
            <div className="bg-white p-1.5 rounded-full shadow-sm text-purple-600"><Gift size={16}/></div>
            <span className="text-purple-800">Referred by <strong>{referrer.name}</strong></span>
          </div>
        )}
        
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <div className="relative">
              <div className="absolute left-3 top-3 text-gray-400"><User size={18} /></div>
              <input 
                type="text" required placeholder="e.g. John Doe"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none"
                value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <div className="absolute left-3 top-3 text-gray-400"><Mail size={18} /></div>
              <input 
                type="email" required placeholder="john@example.com"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none"
                value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <div className="absolute left-3 top-3 text-gray-400"><Lock size={18} /></div>
              <input 
                type="password" required placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none"
                value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>
          
          <button disabled={loading} type="submit" className="w-full bg-brand-blue text-white font-bold py-3 rounded-lg hover:opacity-90 flex justify-center transition transform active:scale-95">
            {loading ? <Loader2 className="animate-spin" /> : "Register Free"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account? <Link href="/login" className="text-brand-blue font-bold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  )
}
