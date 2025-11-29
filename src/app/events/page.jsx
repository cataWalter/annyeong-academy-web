"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import CalendarView from '@/components/ui/CalendarView'
import { Calendar as CalIcon, Clock, Users, Video, Filter, List, Grid } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function EventsCalendar() {
  const [events, setEvents] = useState([])
  const [view, setView] = useState('list') // list | calendar
  const [filter, setFilter] = useState('all')
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await supabase.from('products').select('*').eq('type', 'standalone').order('event_date', {ascending: true})
      setEvents(data || [])
    }
    fetchEvents()
  }, [])

  const filteredEvents = filter === 'all' ? events : events

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FC]">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h1 className="text-4xl font-bold text-brand-dark mb-2">Events Calendar 📅</h1>
              <p className="text-gray-600">Join live workshops, K-pop classes, and cultural nights.</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-white p-1 rounded-xl border border-gray-200 flex">
                <button onClick={() => setView('list')} className={`p-2 rounded-lg transition ${view === 'list' ? 'bg-brand-purple text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}><List size={20}/></button>
                <button onClick={() => setView('calendar')} className={`p-2 rounded-lg transition ${view === 'calendar' ? 'bg-brand-purple text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}><Grid size={20}/></button>
              </div>
              
              <div className="flex gap-2">
                {['All', 'K-Pop', 'Culture'].map(cat => (
                  <button key={cat} onClick={() => setFilter(cat.toLowerCase())} className={`px-4 py-2 rounded-full text-sm font-bold border transition ${filter === cat.toLowerCase() ? 'bg-brand-dark text-white border-brand-dark' : 'bg-white text-gray-600 border-gray-200 hover:border-brand-purple'}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {view === 'calendar' ? (
            <CalendarView events={filteredEvents} />
          ) : (
            <div className="grid lg:grid-cols-2 gap-6">
              {filteredEvents.map(event => {
                const date = new Date(event.event_date)
                return (
                  <div key={event.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition flex flex-col md:flex-row gap-6">
                    <div className="bg-gray-100 rounded-2xl w-full md:w-40 h-40 flex-shrink-0 flex flex-col items-center justify-center text-center p-4">
                      <span className="text-brand-purple font-bold uppercase tracking-widest text-sm">{date.toLocaleString('default', {month:'short'})}</span>
                      <span className="text-4xl font-black text-brand-dark my-1">{date.getDate()}</span>
                      <span className="text-gray-500 text-xs font-bold">{date.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>
                    </div>
                    
                    <div className="flex-1 flex flex-col">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-brand-dark mb-2">{event.title}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description.replace(/\[\[.*?\]\]/g, '')}</p>
                        <div className="flex flex-wrap gap-4 text-xs font-bold text-gray-500 mb-6">
                          <span className="flex items-center gap-1"><Video size={14}/> Zoom Live</span>
                          <span className="flex items-center gap-1"><Users size={14}/> {(event.total_seats || 14) - (event.booked_seats || 0)} Spots</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                        <span className="text-2xl font-bold text-brand-purple">{event.price}</span>
                        <button onClick={() => addToCart(event)} className="bg-brand-dark text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-gray-800 transition">Book Spot</button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
