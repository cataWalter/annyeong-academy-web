"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Loader2, Trash2, Edit, Plus, Instagram, Youtube, Music2 } from 'lucide-react'
import FileUploader from './FileUploader'

export default function TutorManager() {
  const [tutors, setTutors] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  
  const [formData, setFormData] = useState({ 
    id: '', name: '', role: '', bio: '', image_url: '', video_intro: '', specialties: '',
    instagram: '', tiktok: '', youtube: ''
  })

  useEffect(() => { fetchTutors() }, [])

  const fetchTutors = async () => {
    const { data } = await supabase.from('tutors').select('*')
    setTutors(data || [])
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const specs = formData.specialties.split(',').map(s => s.trim())
    const social_links = {
      instagram: formData.instagram,
      tiktok: formData.tiktok,
      youtube: formData.youtube
    }

    const payload = { 
      name: formData.name, 
      role: formData.role, 
      bio: formData.bio, 
      image_url: formData.image_url, 
      video_intro: formData.video_intro, 
      specialties: specs,
      social_links: social_links
    }
    
    if (editing) {
      await supabase.from('tutors').update(payload).eq('id', editing.id)
    } else {
      const id = crypto.randomUUID()
      await supabase.from('tutors').insert([{ ...payload, id }])
    }
    
    setEditing(null)
    setFormData({ id: '', name: '', role: '', bio: '', image_url: '', video_intro: '', specialties: '', instagram: '', tiktok: '', youtube: '' })
    fetchTutors()
  }

  const handleEdit = (t) => {
    setEditing(t)
    setFormData({ 
      id: t.id, name: t.name, role: t.role, bio: t.bio, 
      image_url: t.image_url || '', video_intro: t.video_intro || '', 
      specialties: t.specialties ? t.specialties.join(', ') : '',
      instagram: t.social_links?.instagram || '',
      tiktok: t.social_links?.tiktok || '',
      youtube: t.social_links?.youtube || ''
    })
  }

  const handleDelete = async (id) => {
    if(!confirm("Delete tutor?")) return
    await supabase.from('tutors').delete().eq('id', id)
    fetchTutors()
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit sticky top-24">
        <h3 className="font-bold text-lg mb-4">{editing ? 'Edit Tutor' : 'Add Tutor'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input required placeholder="Full Name" className="input-field" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          <input required placeholder="Role (e.g. Head Teacher)" className="input-field" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} />
          
          <FileUploader 
            bucket="avatars" 
            label="Profile Photo" 
            value={formData.image_url} 
            onUpload={(url) => setFormData({...formData, image_url: url})} 
          />

          <input placeholder="Video Intro URL (YouTube)" className="input-field" value={formData.video_intro} onChange={e => setFormData({...formData, video_intro: e.target.value})} />
          <input placeholder="Specialties (comma separated)" className="input-field" value={formData.specialties} onChange={e => setFormData({...formData, specialties: e.target.value})} />
          <textarea required placeholder="Bio" className="input-field h-32" value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} />
          
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase">Social Links</p>
            <div className="relative"><Instagram size={16} className="absolute left-3 top-3 text-gray-400"/><input placeholder="Instagram URL" className="input-field pl-9" value={formData.instagram} onChange={e => setFormData({...formData, instagram: e.target.value})} /></div>
            <div className="relative"><Music2 size={16} className="absolute left-3 top-3 text-gray-400"/><input placeholder="TikTok URL" className="input-field pl-9" value={formData.tiktok} onChange={e => setFormData({...formData, tiktok: e.target.value})} /></div>
            <div className="relative"><Youtube size={16} className="absolute left-3 top-3 text-gray-400"/><input placeholder="YouTube URL" className="input-field pl-9" value={formData.youtube} onChange={e => setFormData({...formData, youtube: e.target.value})} /></div>
          </div>

          <div className="flex gap-2 pt-2">
            <button type="submit" disabled={loading} className="btn btn-plum-gradient w-full py-2">{loading ? 'Saving...' : 'Save Tutor'}</button>
            {editing && <button type="button" onClick={() => {setEditing(null); setFormData({ id: '', name: '', role: '', bio: '', image_url: '', video_intro: '', specialties: '', instagram: '', tiktok: '', youtube: '' })}} className="px-4 py-2 bg-gray-100 rounded-lg text-gray-600">Cancel</button>}
          </div>
        </form>
      </div>

      <div className="lg:col-span-2 space-y-4">
        {tutors.map(t => (
          <div key={t.id} className="bg-white p-4 rounded-xl border border-gray-100 flex gap-4 items-start">
            <img src={t.image_url || 'https://placehold.co/100'} className="w-16 h-16 object-cover rounded-full bg-gray-100" />
            <div className="flex-1">
              <h4 className="font-bold text-gray-800">{t.name}</h4>
              <p className="text-xs font-bold text-brand-purple uppercase">{t.role}</p>
              <div className="flex gap-2 mt-2">
                {t.social_links?.instagram && <Instagram size={14} className="text-gray-400"/>}
                {t.social_links?.tiktok && <Music2 size={14} className="text-gray-400"/>}
                {t.social_links?.youtube && <Youtube size={14} className="text-gray-400"/>}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={() => handleEdit(t)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit size={18}/></button>
              <button onClick={() => handleDelete(t.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18}/></button>
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
