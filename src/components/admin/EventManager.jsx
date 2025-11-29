"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Loader2, Trash2, Edit, Calendar, Video, Clock } from 'lucide-react'

export default function EventManager() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [formData, setFormData] = useState({ 
    title: '', price: '', description: '', image_url: '', 
    event_date: '', type: 'standalone' 
  })

  useEffect(() => { fetchEvents() }, [])

  const fetchEvents = async () => {
    const { data } = await supabase.from('products').select('*').eq('type', 'standalone').order('event_date', { ascending: true })
    setEvents(data || [])
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const id = editing ? editing.id : `evt-${Date.now()}`
    
    if (editing) {
      await supabase.from('products').update(formData).eq('id', id)
    } else {
      await supabase.from('products').insert([{ ...formData, id }])
    }
    
    setEditing(null)
    setFormData({ title: '', price: '', description: '', image_url: '', event_date: '', type: 'standalone' })
    fetchEvents()
  }

  const handleEdit = (evt) => {
    setEditing(evt)
    setFormData({ 
      title: evt.title, price: evt.price, description: evt.description, 
      image_url: evt.image_url, event_date: new Date(evt.event_date).toISOString().slice(0,16), type: 'standalone'
    })
  }

  const handleDelete = async (id) => {
    if(!confirm("Delete event?")) return
    await supabase.from('products').delete().eq('id', id)
    fetchEvents()
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit sticky top-24">
        <h3 className="font-bold text-lg mb-4">{editing ? 'Edit Event' : 'Create Event'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input required placeholder="Event Title" className="input-field" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          <div className="grid grid-cols-2 gap-2">
            <input required placeholder="Price (e.g. 5000 Ft)" className="input-field" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
            <input required type="datetime-local" className="input-field" value={formData.event_date} onChange={e => setFormData({...formData, event_date: e.target.value})} />
          </div>
          <input placeholder="Cover Image URL" className="input-field" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} />
          <textarea required placeholder="Description (include [[ZOOM::link]] tag)" className="input-field h-32" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          
          <div className="flex gap-2">
            <button type="submit" disabled={loading} className="btn btn-plum-gradient w-full py-2">{loading ? 'Saving...' : 'Save Event'}</button>
            {editing && <button type="button" onClick={() => {setEditing(null); setFormData({ title: '', price: '', description: '', image_url: '', event_date: '', type: 'standalone' })}} className="px-4 py-2 bg-gray-100 rounded-lg text-gray-600">Cancel</button>}
          </div>
        </form>
      </div>

      <div className="lg:col-span-2 space-y-4">
        {events.map(evt => (
          <div key={evt.id} className="bg-white p-4 rounded-xl border border-gray-100 flex gap-4 items-center">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex flex-col items-center justify-center text-center p-1 shrink-0">
               <span className="text-[10px] uppercase font-bold text-gray-500">{new Date(evt.event_date).toLocaleString('default', {month:'short'})}</span>
               <span className="text-xl font-bold text-brand-dark">{new Date(evt.event_date).getDate()}</span>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-800">{evt.title}</h4>
              <p className="text-xs text-gray-500">{new Date(evt.event_date).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})} • {evt.price}</p>
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={() => handleEdit(evt)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit size={18}/></button>
              <button onClick={() => handleDelete(evt.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
