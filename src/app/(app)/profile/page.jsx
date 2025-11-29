"use client";
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useLanguage } from '@/context/LanguageContext'
import { supabase } from '@/lib/supabase'
import { User, Save, Loader2, Camera, Lock, FileText, Download, Award, MapPin, Trash2, AlertTriangle } from 'lucide-react'
import { generateFilePath } from '@/lib/helpers'
import { generateInvoice } from '@/utils/invoiceGenerator'

export default function Profile() {
  const { user, refreshProfile, signOut } = useAuth()
  const { t } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [passLoading, setPassLoading] = useState(false)
  
  // Profile State
  const [fullName, setFullName] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [billing, setBilling] = useState({ address: '', city: '', zip: '', country: '' })
  
  const [uploading, setUploading] = useState(false)
  const [orders, setOrders] = useState([])
  const [certificates, setCertificates] = useState([])

  // Password State
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  useEffect(() => {
    if (user) {
      getProfile()
      getOrders()
      getCertificates()
    }
  }, [user])

  const getProfile = async () => {
    const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
    if (data) { 
      setFullName(data.full_name || '')
      setAvatarUrl(data.avatar_url || '')
      setBilling(data.billing_address || { address: '', city: '', zip: '', country: '' })
    }
  }

  const getOrders = async () => {
    const { data } = await supabase.from('purchases').select('id, created_at, products(title, price)').eq('user_id', user.id).order('created_at', { ascending: false })
    setOrders(data || [])
  }

  const getCertificates = async () => {
    const { data: courses } = await supabase.from('products').select('id, title').eq('type', 'course')
    const { data: progress } = await supabase.from('lesson_progress').select('course_id').eq('user_id', user.id)
    const { data: lessons } = await supabase.from('lessons').select('id, course_id')
    
    if(!courses || !progress || !lessons) return

    const completed = courses.filter(c => {
      const courseLessons = lessons.filter(l => l.course_id === c.id)
      const userProgress = progress.filter(p => p.course_id === c.id)
      return courseLessons.length > 0 && courseLessons.length === userProgress.length
    })
    setCertificates(completed)
  }

  const updateProfile = async (e) => {
    e.preventDefault()
    setLoading(true)
    await supabase.from('profiles').upsert({ 
      id: user.id, 
      full_name: fullName, 
      avatar_url: avatarUrl, 
      billing_address: billing,
      updated_at: new Date() 
    })
    await refreshProfile()
    setLoading(false)
    alert('Profile saved successfully!')
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) return alert("Passwords do not match")
    setPassLoading(true)
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    setPassLoading(false)
    if (error) alert("Error: " + error.message)
    else {
      alert("Password updated successfully")
      setNewPassword('')
      setConfirmPassword('')
    }
  }

  const handleAvatarUpload = async (event) => {
    setUploading(true)
    const file = event.target.files[0]
    const path = generateFilePath('avatars', file)
    await supabase.storage.from('avatars').upload(path, file)
    const { data } = supabase.storage.from('avatars').getPublicUrl(path)
    setAvatarUrl(data.publicUrl)
    setUploading(false)
  }

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm("Are you sure? This action cannot be undone. Your account will be queued for deletion.")
    if (confirmed) {
      await supabase.from('deletion_requests').insert([{ user_id: user.id, reason: 'User requested' }])
      alert("Account deletion request submitted. You will be logged out.")
      await signOut()
    }
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <h1 className="text-2xl font-bold text-brand-dark mb-2">{t('prof_title')}</h1>
      <p className="text-gray-500 mb-8">{t('prof_desc')}</p>

      <div className="grid gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-blue to-brand-purple"></div>
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <div className="relative group">
              <div className="w-32 h-32 bg-purple-100 rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                 {avatarUrl ? <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" /> : <User size={48} className="text-brand-purple opacity-50" />}
                 {uploading && <div className="absolute inset-0 bg-black/50 flex items-center justify-center"><Loader2 className="animate-spin text-white"/></div>}
              </div>
              <label className="absolute bottom-0 right-0 bg-brand-dark text-white p-2 rounded-full cursor-pointer hover:bg-brand-purple transition shadow-md">
                 <Camera size={18} />
                 <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} disabled={uploading} />
              </label>
            </div>
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-500 uppercase tracking-wider font-bold mb-1">{t('prof_student')}</p>
              <p className="text-xl font-bold text-brand-dark">{fullName || "Unnamed User"}</p>
              <p className="text-gray-400">{user?.email}</p>
            </div>
          </div>
          
          <form onSubmit={updateProfile} className="space-y-6 border-t border-gray-100 pt-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">{t('auth_fullname')}</label>
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="input-field" />
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2"><MapPin size={18}/> Billing Address</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2"><input placeholder="Address Line" className="input-field bg-white" value={billing.address} onChange={e => setBilling({...billing, address: e.target.value})} /></div>
                <input placeholder="City" className="input-field bg-white" value={billing.city} onChange={e => setBilling({...billing, city: e.target.value})} />
                <input placeholder="ZIP Code" className="input-field bg-white" value={billing.zip} onChange={e => setBilling({...billing, zip: e.target.value})} />
                <input placeholder="Country" className="input-field bg-white md:col-span-2" value={billing.country} onChange={e => setBilling({...billing, country: e.target.value})} />
              </div>
            </div>

            <button disabled={loading} type="submit" className="w-full md:w-auto flex items-center justify-center gap-2 bg-brand-purple text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition shadow-lg">
              {loading ? <Loader2 className="animate-spin" size={20} /> : <><Save size={20} /> {t('prof_save')}</>}
            </button>
          </form>
        </div>

        {/* Change Password */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-brand-dark mb-6 flex items-center gap-2"><Lock size={20}/> Security</h3>
          <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
            <input type="password" placeholder="New Password" className="input-field" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
            <input type="password" placeholder="Confirm Password" className="input-field" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            <button disabled={passLoading} className="btn bg-gray-900 text-white py-2 px-6 rounded-lg text-sm">
              {passLoading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>

        {/* Certificates & Orders */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-fit">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-yellow-50 p-2 rounded-lg text-yellow-600"><Award size={20} /></div>
              <h3 className="text-lg font-bold text-brand-dark">My Certificates</h3>
            </div>
            {certificates.length > 0 ? (
              <div className="space-y-4">
                {certificates.map(cert => (
                  <div key={cert.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                    <p className="font-bold text-gray-800 text-sm">{cert.title}</p>
                    <a href={`/corsi/${cert.id}`} className="text-brand-purple hover:underline text-xs font-bold">Download</a>
                  </div>
                ))}
              </div>
            ) : <p className="text-gray-400 italic text-sm">No certificates yet.</p>}
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-fit">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-50 p-2 rounded-lg text-brand-blue"><FileText size={20} /></div>
              <h3 className="text-lg font-bold text-brand-dark">{t('prof_orders')}</h3>
            </div>
            {orders.length > 0 ? (
              <div className="space-y-4 max-h-[300px] overflow-y-auto">
                {orders.map(order => (
                  <div key={order.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-bold text-gray-800 text-sm">{order.products?.title}</p>
                      <p className="text-xs text-gray-500">{new Date(order.created_at).toLocaleDateString()} • {order.products?.price}</p>
                    </div>
                    <button onClick={() => generateInvoice(order, {full_name: fullName, billing_address: billing})} className="text-gray-400 hover:text-brand-purple transition"><Download size={18} /></button>
                  </div>
                ))}
              </div>
            ) : <p className="text-gray-400 italic text-sm">{t('prof_no_orders')}</p>}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 p-8 rounded-2xl border border-red-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-red-700 flex items-center gap-2"><AlertTriangle size={20}/> Danger Zone</h3>
            <p className="text-sm text-red-600">Permanently delete your account and all data.</p>
          </div>
          <button onClick={handleDeleteAccount} className="bg-white text-red-600 border border-red-200 px-6 py-2 rounded-lg font-bold text-sm hover:bg-red-50 transition flex items-center gap-2">
            <Trash2 size={16}/> Delete Account
          </button>
        </div>
      </div>
      <style>{`
        .input-field { width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 0.5rem; outline: none; font-size: 0.9rem; transition: all 0.2s; }
        .input-field:focus { border-color: #6a11cb; ring: 2px solid #6a11cb33; }
      `}</style>
    </div>
  )
}
