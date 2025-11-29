"use client";
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Tag, Loader2, Check } from 'lucide-react'

export default function CouponInput({ onApply }) {
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null) // null, 'valid', 'invalid'

  const handleApply = async () => {
    if (!code) return
    setLoading(true)
    setStatus(null)
    
    try {
      const { data, error } = await supabase.from('coupons').select('*').eq('code', code.toUpperCase()).eq('active', true).single()
      
      if (error || !data) {
        setStatus('invalid')
      } else {
        setStatus('valid')
        onApply(data.discount_percent)
      }
    } catch (e) {
      setStatus('invalid')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
      <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Have a coupon?</label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag className="absolute left-3 top-2.5 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="Enter code" 
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 text-sm outline-none uppercase font-bold text-gray-700 focus:border-brand-purple"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={status === 'valid'}
          />
        </div>
        <button 
          onClick={handleApply}
          disabled={loading || status === 'valid'}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition ${status === 'valid' ? 'bg-green-100 text-green-700' : 'bg-brand-dark text-white hover:bg-gray-800'}`}
        >
          {loading ? <Loader2 size={16} className="animate-spin"/> : (status === 'valid' ? <Check size={16}/> : 'Apply')}
        </button>
      </div>
      {status === 'invalid' && <p className="text-xs text-red-500 mt-2 font-bold">Invalid or expired code.</p>}
      {status === 'valid' && <p className="text-xs text-green-600 mt-2 font-bold">Coupon applied successfully!</p>}
    </div>
  )
}
