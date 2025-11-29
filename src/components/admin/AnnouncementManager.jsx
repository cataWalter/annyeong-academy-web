"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Megaphone, Trash2, CheckCircle, Info, AlertTriangle } from 'lucide-react'

export default function AnnouncementManager() {
  const [announcements, setAnnouncements] = useState([])
  const [formData, setFormData] = useState({ title: '', message: '', type: 'info', active: true })
  const [loading, setLoading] = useState(false)

  useEffect(() => { fetchAnnouncements() }, [])

  const fetchAnnouncements = async () => {
    const { data } = await supabase.from('announcements').select('*').order('created_at', { ascending: false })
    setAnnouncements(data || [])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await supabase.from('announcements').insert([formData])
    setFormData({ title: '', message: '', type: 'info', active: true })
    setLoading(false)
    fetchAnnouncements()
  }

  const toggleActive = async (id, currentStatus) => {
    await supabase.from('announcements').update({ active: !currentStatus }).eq('id', id)
    fetchAnnouncements()
  }

  const handleDelete = async (id) => {
    if(!confirm("Delete?")) return
    await supabase.from('announcements').delete().eq('id', id)
    fetchAnnouncements()
  }

  const TypeIcon = ({ type }) => {
    if (type === 'warning') return <AlertTriangle size={18} className="text-orange-500"/>
    if (type === 'success') return <CheckCircle size={18} className="text-green-500"/>
    return <Info size={18} className="text-blue-500"/>
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit sticky top-24">
        <h3 className="font-bold text-lg mb-4">Post Announcement</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input required placeholder="Banner Title" className="input-field" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          <textarea required placeholder="Message displayed to all users..." className="input-field h-24" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
          
          <div className="grid grid-cols-2 gap-4">
            <select className="input-field" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
              <option value="info">Info (Blue)</option>
              <option value="warning">Warning (Orange)</option>
              <option value="success">Success (Green)</option>
            </select>
            <div className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg">
              <input type="checkbox" checked={formData.active} onChange={e => setFormData({...formData, active: e.target.checked})} className="w-5 h-5 text-brand-purple"/>
              <span className="text-sm font-bold text-gray-600">Active</span>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn btn-plum-gradient w-full py-2">{loading ? 'Posting...' : 'Post Banner'}</button>
        </form>
      </div>

      <div className="lg:col-span-2 space-y-4">
        {announcements.map(ann => (
          <div key={ann.id} className={`bg-white p-4 rounded-xl border flex justify-between items-center ${ann.active ? 'border-l-4 border-l-brand-purple shadow-sm' : 'border-gray-100 opacity-60'}`}>
            <div className="flex items-start gap-3">
              <div className="mt-1"><TypeIcon type={ann.type}/></div>
              <div>
                <h4 className="font-bold text-gray-800">{ann.title}</h4>
                <p className="text-sm text-gray-600">{ann.message}</p>
                <p className="text-[10px] text-gray-400 mt-1">{new Date(ann.created_at).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => toggleActive(ann.id, ann.active)} className={`text-xs font-bold px-3 py-1 rounded-full ${ann.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {ann.active ? 'Active' : 'Hidden'}
              </button>
              <button onClick={() => handleDelete(ann.id)} className="text-gray-300 hover:text-red-500"><Trash2 size={18}/></button>
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
