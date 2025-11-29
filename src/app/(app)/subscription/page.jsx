"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import { Loader2, CreditCard, CheckCircle, XCircle, Calendar } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function SubscriptionPage() {
  const { user } = useAuth()
  const [sub, setSub] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) fetchSub()
  }, [user])

  const fetchSub = async () => {
    const { data } = await supabase.from('subscriptions').select('*').eq('user_id', user.id).single()
    setSub(data)
    setLoading(false)
  }

  const handleSubscribe = async () => {
    if (!confirm("Start Premium Subscription? (Mock Payment)")) return
    setLoading(true)
    
    // Mock creating a subscription
    const nextMonth = new Date()
    nextMonth.setMonth(nextMonth.getMonth() + 1)
    
    await supabase.from('subscriptions').upsert({
      user_id: user.id,
      status: 'active',
      plan_name: 'Premium Monthly',
      current_period_end: nextMonth
    }, { onConflict: 'user_id' })
    
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } })
    fetchSub()
  }

  const handleCancel = async () => {
    if(!confirm("Are you sure you want to cancel?")) return
    setLoading(true)
    await supabase.from('subscriptions').update({ status: 'cancelled' }).eq('user_id', user.id)
    fetchSub()
  }

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-brand-purple"/></div>

  return (
    <div className="max-w-3xl mx-auto pb-20">
      <h1 className="text-3xl font-bold text-brand-dark mb-2 flex items-center gap-3">
        <CreditCard className="text-brand-blue"/> Membership
      </h1>
      <p className="text-gray-500 mb-8">Manage your Premium access.</p>

      {sub && sub.status === 'active' ? (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-bold text-brand-dark">{sub.plan_name}</h3>
              <div className="flex items-center gap-2 mt-2">
                 <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><CheckCircle size={14}/> Active</span>
              </div>
            </div>
            <div className="text-right">
               <p className="text-xs text-gray-500 uppercase font-bold">Renews On</p>
               <p className="text-lg font-bold text-gray-800">{sub.current_period_end ? new Date(sub.current_period_end).toLocaleDateString() : 'Lifetime'}</p>
            </div>
          </div>

          <hr className="border-gray-100 my-6"/>

          <div className="space-y-3 mb-8">
             <p className="flex items-center gap-3 text-gray-600"><CheckCircle size={18} className="text-brand-purple"/> Access to ALL video courses</p>
             <p className="flex items-center gap-3 text-gray-600"><CheckCircle size={18} className="text-brand-purple"/> Monthly Live Q&A</p>
             <p className="flex items-center gap-3 text-gray-600"><CheckCircle size={18} className="text-brand-purple"/> 10% Store Discount</p>
          </div>

          <button onClick={handleCancel} className="text-red-500 font-bold hover:bg-red-50 px-4 py-2 rounded-lg transition text-sm">
            Cancel Subscription
          </button>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-brand-purple to-brand-blue p-10 rounded-3xl text-white text-center shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Upgrade to Premium 👑</h2>
          <p className="text-white/90 mb-8 max-w-md mx-auto">Unlock unlimited access to all courses, live sessions, and exclusive content for one simple price.</p>
          
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl max-w-xs mx-auto border border-white/20 mb-8">
             <p className="text-4xl font-black">9.900 Ft<span className="text-sm font-normal text-white/70">/mo</span></p>
          </div>

          <button 
            onClick={handleSubscribe} 
            className="bg-white text-brand-purple px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition"
          >
            Start Free Trial
          </button>
          {sub && sub.status === 'cancelled' && <p className="text-xs text-white/50 mt-4">Your previous subscription was cancelled.</p>}
        </div>
      )}
    </div>
  )
}
