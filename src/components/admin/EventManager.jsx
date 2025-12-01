"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Loader2, Trash2, Edit, Calendar, Video, Users, X, Download, PlusCircle } from 'lucide-react'
import { downloadCSV } from '@/utils/csvExport'
import { useEdgeFunction } from '@/hooks/useEdgeFunction'

export default function EventManager() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  
  // Hooks
  const { invoke } = useEdgeFunction()
  const [genZoomLoading, setGenZoomLoading] = useState(false)

  // Roster State
  const [viewingRoster, setViewingRoster] = useState(null)
  const [rosterData, setRosterData] = useState([])
  const [rosterLoading, setRosterLoading] = useState(false)

  const [formData, setFormData] = useState({ 
    title: '', price: '', description: '', image_url: '', 
    event_date: '', type: 'standalone', total_seats: 15
  })

  useEffect(() => { fetchEvents() }, [])

  const fetchEvents = async () => {
    const { data } = await supabase.from('products').select('*').eq('type', 'standalone').order('event_date', { ascending: true })
    setEvents(data || [])
    setLoading(false)
  }

  const fetchRoster = async (eventId) => {
    setRosterLoading(true)
    const { data } = await supabase.from('purchases')
      .select('created_at, profiles(full_name, email)')
      .eq('product_id', eventId)
      .eq('status', 'completed')
    setRosterData(data || [])
    setRosterLoading(false)
  }

  const handleViewRoster = (evt) => {
    setViewingRoster(evt)
    fetchRoster(evt.id)
  }

  const handleGenerateZoom = async () => {
    if (!formData.title || !formData.event_date) return alert("Please enter title and date first")
    setGenZoomLoading(true)
    
    // Call Edge Function
    const { data, fallback } = await invoke('create-zoom', {
      topic: formData.title,
      start_time: formData.event_date
    })

    const link = fallback ? `https://zoom.us/j/${Math.floor(Math.random()*1000000000)}?pwd=mock` : data.join_url
    
    // Append to description
    setFormData(prev => ({ ...prev, description: prev.description + `\n\n[[ZOOM::${link}]]` }))
    setGenZoomLoading(false)
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
    setFormData({ title: '', price: '', description: '', image_url: '', event_date: '', type: 'standalone', total_seats: 15 })
    fetchEvents()
  }

  const handleEdit = (evt) => {
    setEditing(evt)
    setFormData({ 
      title: evt.title, price: evt.price, description: evt.description, 
      image_url: evt.image_url, event_date: new Date(evt.event_date).toISOString().slice(0,16), type: 'standalone',
      total_seats: evt.total_seats || 15
    })
  }

  const handleDelete = async (id) => {
    if(!confirm("Delete event?")) return
    await supabase.from('products').delete().eq('id', id)
    fetchEvents()
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8 relative">
      
      {viewingRoster && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-fade-in flex flex-col max-h-[80vh]">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <div>
                <h3 className="font-bold text-gray-800">{viewingRoster.title}</h3>
                <p className="text-xs text-gray-500">Attendee List</p>
              </div>
              <button onClick={() => setViewingRoster(null)}><X size={20} className="text-gray-400 hover:text-gray-600"/></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              {rosterLoading ? <Loader2 className="animate-spin mx-auto text-brand-purple"/> : (
                <div className="space-y-2">
                  {rosterData.length === 0 && <p className="text-center text-gray-400 py-4">No bookings yet.</p>}
                  {rosterData.map((record, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 border border-gray-100 rounded-xl hover:bg-gray-50">
                      <div>
                        <p className="font-bold text-gray-800 text-sm">{record.profiles?.full_name || 'Unknown'}</p>
                        <p className="text-xs text-gray-500">{record.profiles?.email}</p>
                      </div>
                      <span className="text-[10px] text-gray-400">{new Date(record.created_at).toLocaleDateString()}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50 text-right">
               <button onClick={() => downloadCSV(rosterData.map(r => ({ Name: r.profiles?.full_name, Email: r.profiles?.email, Date: r.created_at })), 'roster')} className="text-xs font-bold text-brand-purple flex items-center gap-1 ml-auto hover:underline">
                 <Download size={14}/> Export CSV
               </button>
            </div>
          </div>
        </div>
      )}

      <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit sticky top-24">
        <h3 className="font-bold text-lg mb-4">{editing ? 'Edit Event' : 'Create Event'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input required placeholder="Event Title" className="input-field" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          <div className="grid grid-cols-2 gap-2">
            <input required placeholder="Price" className="input-field" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
            <input required type="number" placeholder="Seats" className="input-field" value={formData.total_seats} onChange={e => setFormData({...formData, total_seats: e.target.value})} />
          </div>
          <input required type="datetime-local" className="input-field" value={formData.event_date} onChange={e => setFormData({...formData, event_date: e.target.value})} />
          <input placeholder="Cover Image URL" className="input-field" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} />
          
          <div className="relative">
             <textarea required placeholder="Description (include [[ZOOM::link]] tag)" className="input-field h-32" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
             <button type="button" onClick={handleGenerateZoom} disabled={genZoomLoading} className="absolute bottom-2 right-2 text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded border border-blue-100 flex items-center gap-1 hover:bg-blue-100">
               {genZoomLoading ? <Loader2 size={12} className="animate-spin"/> : <Video size={12}/>} Gen Zoom Link
             </button>
          </div>
          
          <div className="flex gap-2">
            <button type="submit" disabled={loading} className="btn btn-plum-gradient w-full py-2">{loading ? 'Saving...' : 'Save Event'}</button>
            {editing && <button type="button" onClick={() => {setEditing(null); setFormData({ title: '', price: '', description: '', image_url: '', event_date: '', type: 'standalone', total_seats: 15 })}} className="px-4 py-2 bg-gray-100 rounded-lg text-gray-600">Cancel</button>}
          </div>
        </form>
      </div>

      <div className="lg:col-span-2 space-y-4">
        {events.map(evt => {
          const booked = evt.booked_seats || 0
          const total = evt.total_seats || 15
          return (
            <div key={evt.id} className="bg-white p-4 rounded-xl border border-gray-100 flex gap-4 items-center">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex flex-col items-center justify-center text-center p-1 shrink-0">
                 <span className="text-[10px] uppercase font-bold text-gray-500">{new Date(evt.event_date).toLocaleString('default', {month:'short'})}</span>
                 <span className="text-xl font-bold text-brand-dark">{new Date(evt.event_date).getDate()}</span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-800">{evt.title}</h4>
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                   <span>{new Date(evt.event_date).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>
                   <span className="flex items-center gap-1 font-bold text-brand-purple bg-purple-50 px-2 py-0.5 rounded"><Users size={12}/> {booked}/{total} Booked</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => handleViewRoster(evt)} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100">Roster</button>
                <div className="flex gap-1 justify-end">
                  <button onClick={() => handleEdit(evt)} className="p-2 text-gray-400 hover:text-blue-500"><Edit size={16}/></button>
                  <button onClick={() => handleDelete(evt.id)} className="p-2 text-gray-400 hover:text-red-500"><Trash2 size={16}/></button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <style>{`
        .input-field { width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 0.5rem; outline: none; font-size: 0.9rem; transition: all 0.2s; }
        .input-field:focus { border-color: #6a11cb; ring: 2px solid #6a11cb33; }
      `}</style>
    </div>
  )
}
