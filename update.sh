#!/bin/bash

echo "🚀 Applying Final Operational Features (Rosters, Zoom Links, Bulk Email)..."

# ==============================================================================
# 1. UPDATE: Admin Event Manager (View Roster)
# ==============================================================================
echo "📅 Adding Roster Management to Admin Panel..."

cat > "src/components/admin/EventManager.jsx" << 'EOF'
"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Loader2, Trash2, Edit, Calendar, Video, Users, X, Download } from 'lucide-react'
import { downloadCSV } from '@/utils/csvExport'

export default function EventManager() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  
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
    // Join purchases with profiles to get names
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
      
      {/* Roster Modal */}
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
          <textarea required placeholder="Description (include [[ZOOM::link]] tag)" className="input-field h-32" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          
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
EOF

# ==============================================================================
# 2. UPDATE: Student Dashboard (Functional Zoom Links)
# ==============================================================================
echo "🎓 Fixing Zoom Link Extraction in Dashboard..."

cat > "src/app/(app)/dashboard/page.jsx" << 'EOF'
"use client";
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase'
import { useGamification } from '@/hooks/useGamification'
import { useLanguage } from '@/context/LanguageContext'
import Link from 'next/link'
import { BookOpen, Loader2, PlayCircle, Calendar, Download, ArrowRight, Award, Zap, Flame, Clock, StickyNote, ExternalLink } from 'lucide-react'
import ReferralCard from '@/components/dashboard/ReferralCard'
import { extractTag } from '@/lib/helpers'

export default function Dashboard() {
  const { user, profile } = useAuth()
  const { t } = useLanguage()
  const { points, streak, level, loading: gameLoading } = useGamification(user?.id)
  
  const [loading, setLoading] = useState(true)
  const [courses, setCourses] = useState([])
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [ebooks, setEbooks] = useState([])
  const [progressMap, setProgressMap] = useState({})
  const [lastAccessed, setLastAccessed] = useState({})

  useEffect(() => { if (user) fetchData() }, [user])

  const fetchData = async () => {
    try {
      const { data: purchases } = await supabase.from('purchases').select('product_id').eq('user_id', user.id).eq('status', 'completed')
      
      if (purchases && purchases.length > 0) {
        const ids = purchases.map(p => p.product_id)
        const { data: products } = await supabase.from('products').select('*').in('id', ids)

        if (products) {
          const myCourses = products.filter(p => p.type === 'course')
          setCourses(myCourses)
          
          const live = products.filter(p => p.type === 'standalone' && new Date(p.event_date) > new Date())
          setUpcomingEvents(live.sort((a,b) => new Date(a.event_date) - new Date(b.event_date)))
          
          setEbooks(products.filter(p => p.type === 'ebook'))

          const progressData = {}
          const lastAccessData = {}
          
          const { data: userProgress } = await supabase.from('lesson_progress').select('*').eq('user_id', user.id).order('last_accessed', { ascending: false })
          const { data: allLessons } = await supabase.from('lessons').select('id, course_id, title').in('course_id', myCourses.map(c => c.id))

          myCourses.forEach(course => {
             const courseLessons = allLessons.filter(l => l.course_id === course.id)
             const total = courseLessons.length
             const completed = userProgress.filter(p => p.course_id === course.id).length
             progressData[course.id] = total > 0 ? Math.round((completed / total) * 100) : 0
             
             const last = userProgress.find(p => p.course_id === course.id)
             if (last) {
               const lTitle = courseLessons.find(cl => cl.id === last.lesson_id)?.title
               lastAccessData[course.id] = { title: lTitle, id: last.lesson_id }
             }
          })
          setProgressMap(progressData)
          setLastAccessed(lastAccessData)
        }
      }
    } catch (error) { console.error(error) } 
    finally { setLoading(false) }
  }

  if (loading || gameLoading) return <div className="flex h-[50vh] items-center justify-center"><Loader2 className="animate-spin text-brand-purple" size={40} /></div>

  const displayName = profile?.full_name ? profile.full_name.split(' ')[0] : user?.email?.split('@')[0]

  return (
    <div className="pb-10 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brand-dark mb-1">{t('dash_hello')}, {displayName}! 👋</h1>
          <p className="text-gray-500">{t('dash_ready')}</p>
        </div>
        
        <div className="flex gap-4">
           <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
              <div className="bg-orange-100 p-2 rounded-lg"><Flame size={20} className="text-orange-500 fill-orange-500"/></div>
              <div>
                 <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{t('dash_streak')}</p>
                 <p className="font-bold text-brand-dark text-lg">{streak} <span className="text-sm font-normal text-gray-500">{t('dash_days')}</span></p>
              </div>
           </div>
           <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
              <div className="bg-yellow-100 p-2 rounded-lg"><Zap size={20} className="text-yellow-500 fill-yellow-500"/></div>
              <div>
                 <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{t('dash_xp')}</p>
                 <p className="font-bold text-brand-dark text-lg">{points} <span className="text-sm font-normal text-gray-500">XP</span></p>
              </div>
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-brand-dark">{t('dash_my_courses')}</h2>
              {courses.length > 0 && <Link href="/notebook" className="text-sm font-bold text-brand-purple flex items-center gap-1 hover:underline"><StickyNote size={16}/> {t('nb_title')}</Link>}
            </div>
            {courses.length > 0 ? (
              <div className="space-y-4">
                {courses.map(course => {
                  const progress = progressMap[course.id] || 0
                  const last = lastAccessed[course.id]
                  return (
                    <div key={course.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition group relative overflow-hidden">
                      <div className="absolute bottom-0 left-0 h-1 bg-gray-100 w-full">
                         <div className={`h-full transition-all duration-1000 ${progress === 100 ? 'bg-green-500' : 'bg-brand-purple'}`} style={{ width: `${progress}%` }}></div>
                      </div>
                      <div className="flex items-start gap-5 relative z-10">
                        <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 relative shadow-inner">
                           <img src={course.image_url || 'https://placehold.co/150'} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        </div>
                        <div className="flex-1 min-w-0 py-1 flex flex-col justify-between h-24">
                          <div>
                             <h3 className="font-bold text-brand-dark text-lg truncate">{course.title}</h3>
                             <p className="text-xs text-gray-500 mt-1">{last ? `Resume: ${last.title}` : 'Start your journey'}</p>
                          </div>
                          <div className="flex items-end justify-between">
                             <span className={`text-xs font-bold ${progress === 100 ? "text-green-600" : "text-gray-400"}`}>
                                {progress === 100 ? "Completed! 🏆" : `${progress}% Complete`}
                             </span>
                             <Link href={`/corsi/${course.id}`} className="bg-brand-dark text-white pl-3 pr-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-brand-purple transition flex items-center gap-2 transform hover:-translate-y-0.5">
                                <PlayCircle size={16} /> {progress === 0 ? "Start" : "Resume"}
                             </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-10 text-center border-2 border-dashed border-gray-200">
                <BookOpen size={32} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 mb-4 font-medium">{t('dash_no_courses')}</p>
                <Link href="/corsi" className="inline-block bg-brand-purple text-white px-6 py-2.5 rounded-full font-bold text-sm hover:shadow-lg transition">
                  {t('dash_start_now')}
                </Link>
              </div>
            )}
          </section>

          <section>
             <h2 className="text-xl font-bold text-brand-dark mb-4">{t('dash_files')}</h2>
             <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="bg-blue-50 p-3 rounded-xl text-brand-blue"><Download size={24}/></div>
                   <div>
                      <p className="font-bold text-gray-800">{ebooks.length} Resources</p>
                      <p className="text-xs text-gray-500">Ebooks & Workbooks available</p>
                   </div>
                </div>
                <Link href="/downloads" className="text-sm font-bold text-brand-purple hover:underline">View All</Link>
             </div>
          </section>
        </div>

        <div className="space-y-8">
           <ReferralCard />
           <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Calendar size={20} className="text-brand-purple"/> My Calendar</h3>
              {upcomingEvents.length > 0 ? (
                 <div className="space-y-4">
                    {upcomingEvents.map(evt => {
                       const zoomLink = extractTag(evt.description, 'ZOOM')
                       return (
                         <div key={evt.id} className="flex gap-3 items-start border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                            <div className="bg-gray-100 rounded-lg p-2 text-center min-w-[50px]">
                               <span className="block text-[10px] font-bold text-gray-500 uppercase">{new Date(evt.event_date).toLocaleString('default', {month:'short'})}</span>
                               <span className="block text-xl font-black text-brand-dark leading-none">{new Date(evt.event_date).getDate()}</span>
                            </div>
                            <div className="flex-1">
                               <p className="text-sm font-bold text-gray-800 line-clamp-1">{evt.title}</p>
                               <p className="text-xs text-gray-500 flex items-center gap-1 mt-1"><Clock size={10}/> {new Date(evt.event_date).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</p>
                               {zoomLink ? (
                                 <a href={zoomLink} target="_blank" className="text-[10px] bg-green-50 text-green-700 px-2 py-1 rounded mt-2 inline-flex items-center gap-1 font-bold hover:bg-green-100 transition">
                                   <ExternalLink size={10}/> Join Zoom
                                 </a>
                               ) : (
                                 <span className="text-[10px] bg-gray-50 text-gray-400 px-2 py-1 rounded mt-2 inline-block">Link TBA</span>
                               )}
                            </div>
                         </div>
                       )
                    })}
                 </div>
              ) : (
                 <div className="text-center py-6">
                    <p className="text-sm text-gray-400 mb-3">{t('dash_no_live')}</p>
                    <Link href="/lezioni-live" className="text-xs btn btn-plum-gradient px-4 py-2 rounded-lg">Book Class</Link>
                 </div>
              )}
           </div>
           <div className="bg-gradient-to-br from-brand-dark to-[#2a3b55] rounded-2xl p-6 text-white relative overflow-hidden shadow-lg">
              <div className="relative z-10">
                 <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm"><Award size={20}/></div>
                        <h3 className="font-bold">{t('dash_league')}</h3>
                    </div>
                    <Link href="/leaderboard" className="text-xs font-bold bg-white/10 px-2 py-1 rounded hover:bg-white/20 transition">View</Link>
                 </div>
                 <p className="text-gray-300 text-sm mb-1 font-medium">Level {level} • Silver League</p>
                 <div className="w-full bg-black/30 rounded-full h-2 mb-4 overflow-hidden border border-white/10">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full" style={{width: `${(points % 1000) / 10}%`}}></div>
                 </div>
              </div>
              <div className="absolute -bottom-6 -right-6 text-white/5 rotate-12"><Award size={140}/></div>
           </div>
        </div>
      </div>
    </div>
  )
}
EOF

# ==============================================================================
# 3. UPDATE: Leads Manager (Bulk Email)
# ==============================================================================
echo "📨 Adding Bulk Email to Leads Manager..."

cat > "src/components/admin/LeadsManager.jsx" << 'EOF'
"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import { Trash2, Mail, Users, AlertTriangle, Download, Send, X, Megaphone } from 'lucide-react'
import { downloadCSV } from '@/utils/csvExport'

export default function LeadsManager() {
  const { user } = useAuth()
  const [leads, setLeads] = useState([])
  const [messages, setMessages] = useState([])
  const [view, setView] = useState('leads')
  const [replyingTo, setReplyingTo] = useState(null)
  const [replyBody, setReplyBody] = useState('')
  const [broadcasting, setBroadcasting] = useState(false)

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    const { data: l } = await supabase.from('webinar_leads').select('*').order('created_at', { ascending: false })
    setLeads(l || [])
    
    const { data: m } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false })
    setMessages(m || [])
  }

  const handleDelete = async (table, id) => {
    if(!confirm("Delete this record?")) return
    await supabase.from(table).delete().eq('id', id)
    fetchData()
  }

  const handleSendReply = async () => {
    if(!replyBody) return
    await supabase.from('admin_email_logs').insert([{
      admin_id: user.id,
      recipient_email: replyingTo.email,
      subject: `Re: ${replyingTo.message ? 'Your Message' : 'Webinar Info'}`,
      body: replyBody
    }])
    alert(`Reply sent to ${replyingTo.email}`)
    setReplyingTo(null)
    setReplyBody('')
  }

  const handleBroadcast = async () => {
    if(!replyBody) return
    const confirmed = confirm(`Send this email to ALL ${leads.length} leads?`)
    if(!confirmed) return

    // Log broadcast
    await supabase.from('admin_email_logs').insert([{
      admin_id: user.id,
      recipient_email: 'ALL_LEADS',
      subject: 'Broadcast: Webinar Update',
      body: replyBody
    }])
    
    alert(`Broadcast queued for ${leads.length} recipients.`)
    setBroadcasting(false)
    setReplyBody('')
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8 relative">
      {(replyingTo || broadcasting) && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl animate-fade-in border-t-8 border-brand-purple">
            <div className="flex justify-between items-center mb-4 border-b pb-4">
              <h3 className="font-bold text-lg flex items-center gap-2">
                {broadcasting ? <><Megaphone size={20}/> Broadcast to All</> : `Reply to ${replyingTo.name || replyingTo.full_name}`}
              </h3>
              <button onClick={() => {setReplyingTo(null); setBroadcasting(false)}}><X className="text-gray-400 hover:text-gray-600"/></button>
            </div>
            
            {broadcasting && <div className="bg-yellow-50 p-3 rounded-lg mb-4 text-sm text-yellow-800 font-bold">⚠️ You are about to email {leads.length} people.</div>}
            
            {!broadcasting && (
              <div className="bg-gray-50 p-3 rounded-lg mb-4 text-xs text-gray-500 italic max-h-24 overflow-y-auto">
                "{replyingTo.message || 'Webinar Registration'}"
              </div>
            )}
            
            <textarea 
              className="w-full p-4 border rounded-xl h-40 mb-4 focus:ring-2 focus:ring-brand-purple outline-none"
              placeholder={broadcasting ? "Write your newsletter/update here..." : "Type your email reply here..."}
              value={replyBody}
              onChange={e => setReplyBody(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => {setReplyingTo(null); setBroadcasting(false)}} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
              <button onClick={broadcasting ? handleBroadcast : handleSendReply} className="btn btn-plum-gradient px-6 py-2 flex items-center gap-2">
                <Send size={16}/> {broadcasting ? 'Send Broadcast' : 'Send Email'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="lg:col-span-1 space-y-2">
        <button onClick={() => setView('leads')} className={`w-full p-4 rounded-xl text-left flex items-center gap-3 transition ${view === 'leads' ? 'bg-brand-purple text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
          <Users size={20}/>
          <div className="flex-1"><p className="font-bold">Webinar Leads</p><p className="text-xs opacity-80">{leads.length} Registered</p></div>
        </button>
        <button onClick={() => setView('messages')} className={`w-full p-4 rounded-xl text-left flex items-center gap-3 transition ${view === 'messages' ? 'bg-brand-blue text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
          <Mail size={20}/>
          <div className="flex-1"><p className="font-bold">Messages & Reports</p><p className="text-xs opacity-80">{messages.length} Inbox</p></div>
        </button>
      </div>

      <div className="lg:col-span-2">
        {view === 'leads' ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 font-bold text-gray-700 flex justify-between items-center">
              <span>Webinar Registrations</span>
              <div className="flex gap-2">
                <button onClick={() => setBroadcasting(true)} className="text-xs flex items-center gap-1 bg-purple-50 text-brand-purple px-3 py-1.5 rounded-lg hover:bg-purple-100 font-bold"><Megaphone size={14}/> Broadcast</button>
                <button onClick={() => downloadCSV(leads, 'webinar_leads')} className="text-xs flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1.5 rounded-lg hover:bg-green-100 font-bold"><Download size={14}/> Export</button>
              </div>
            </div>
            <div className="max-h-[500px] overflow-y-auto">
              {leads.map(lead => (
                <div key={lead.id} className="p-4 border-b border-gray-50 flex justify-between items-center hover:bg-gray-50">
                  <div><p className="font-bold text-gray-800">{lead.full_name}</p><p className="text-xs text-gray-500">{lead.email}</p></div>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setReplyingTo(lead)} className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg"><Mail size={16}/></button>
                    <button onClick={() => handleDelete('webinar_leads', lead.id)} className="text-gray-300 hover:text-red-500"><Trash2 size={16}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map(msg => (
              <div key={msg.id} className={`bg-white p-5 rounded-2xl shadow-sm border ${msg.email === 'system@report.com' ? 'border-l-4 border-l-red-500' : 'border-gray-100'}`}>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    {msg.email === 'system@report.com' && <AlertTriangle size={16} className="text-red-500"/>}
                    <span className="font-bold text-gray-800">{msg.name}</span>
                    <span className="text-xs text-gray-400">• {new Date(msg.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setReplyingTo(msg)} className="text-blue-500 hover:bg-blue-50 p-1.5 rounded"><Mail size={16}/></button>
                    <button onClick={() => handleDelete('contact_messages', msg.id)} className="text-gray-300 hover:text-red-500 p-1.5 rounded"><Trash2 size={16}/></button>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-2">{msg.email}</p>
                <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{msg.message}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
EOF

echo "✨ Operational Features Deployed!"