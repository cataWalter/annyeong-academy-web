"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Loader2, Trash2, Tag, Plus, CheckCircle, XCircle } from 'lucide-react'

export default function CouponManager() {
  const [coupons, setCoupons] = useState([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({ code: '', discount_percent: '' })

  useEffect(() => { fetchCoupons() }, [])

  const fetchCoupons = async () => {
    const { data } = await supabase.from('coupons').select('*').order('created_at', { ascending: false })
    setCoupons(data || [])
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.code || !formData.discount_percent) return
    setLoading(true)
    
    const payload = {
      code: formData.code.toUpperCase().trim(),
      discount_percent: parseInt(formData.discount_percent),
      active: true
    }

    const { error } = await supabase.from('coupons').insert([payload])
    if (error) alert("Error creating coupon: " + error.message)
    
    setFormData({ code: '', discount_percent: '' })
    fetchCoupons()
    setLoading(false)
  }

  const toggleActive = async (code, currentStatus) => {
    await supabase.from('coupons').update({ active: !currentStatus }).eq('code', code)
    fetchCoupons()
  }

  const handleDelete = async (code) => {
    if (!confirm("Delete this coupon?")) return
    await supabase.from('coupons').delete().eq('code', code)
    fetchCoupons()
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8 animate-fade-in">
      {/* Creation Form */}
      <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit sticky top-24">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Tag size={20}/> Create Coupon</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">Coupon Code</label>
            <input 
              required 
              className="input-field mt-1 uppercase font-mono" 
              placeholder="e.g. SUMMER20" 
              value={formData.code} 
              onChange={e => setFormData({...formData, code: e.target.value})} 
            />
          </div>
          
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">Discount Percentage</label>
            <div className="relative mt-1">
              <input 
                required 
                type="number" 
                min="1" 
                max="100" 
                className="input-field pr-8" 
                placeholder="20" 
                value={formData.discount_percent} 
                onChange={e => setFormData({...formData, discount_percent: e.target.value})} 
              />
              <span className="absolute right-3 top-2.5 text-gray-400 font-bold">%</span>
            </div>
          </div>

          <button disabled={loading} className="btn btn-plum-gradient w-full py-2 flex justify-center items-center gap-2">
            {loading ? <Loader2 className="animate-spin" size={16}/> : <><Plus size={16}/> Create Code</>}
          </button>
        </form>
      </div>

      {/* List */}
      <div className="lg:col-span-2 space-y-4">
        {coupons.length === 0 && <div className="text-center p-8 text-gray-400 border border-dashed rounded-xl">No active coupons.</div>}
        
        {coupons.map((coupon) => (
          <div key={coupon.code} className={`bg-white p-5 rounded-xl border flex items-center justify-between transition ${coupon.active ? 'border-green-100 shadow-sm' : 'border-gray-100 opacity-60 bg-gray-50'}`}>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl ${coupon.active ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'}`}>
                %
              </div>
              <div>
                <h4 className="font-mono font-bold text-lg text-brand-dark tracking-wide">{coupon.code}</h4>
                <p className="text-sm text-gray-500">{coupon.discount_percent}% Discount • {new Date(coupon.created_at).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => toggleActive(coupon.code, coupon.active)}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition ${coupon.active ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
              >
                {coupon.active ? <CheckCircle size={14}/> : <XCircle size={14}/>}
                {coupon.active ? 'Active' : 'Inactive'}
              </button>
              <button onClick={() => handleDelete(coupon.code)} className="p-2 text-gray-300 hover:text-red-500 transition rounded-lg hover:bg-red-50">
                <Trash2 size={18}/>
              </button>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .input-field { width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 0.5rem; outline: none; font-size: 0.9rem; transition: all 0.2s; }
        .input-field:focus { border-color: #6a11cb; ring: 2px solid #6a11cb33; }
      `}</style>
    </div>
  )
}
