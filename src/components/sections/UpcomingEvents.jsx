"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import Section from '../ui/Section'
import { Calendar, ArrowRight, Clock } from 'lucide-react'

export default function UpcomingEvents() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('type', 'standalone')
        .gt('event_date', new Date().toISOString())
        .order('event_date', { ascending: true })
        .limit(3)
      setEvents(data || [])
    }
    fetchEvents()
  }, [])

  if (events.length === 0) return null

  return (
    <Section className="bg-white">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-brand-dark mb-2">Upcoming Events</h2>
          <p className="text-gray-600">Join live sessions this week.</p>
        </div>
        <Link href="/events" className="hidden md:flex items-center gap-2 font-bold text-brand-purple hover:underline">View Calendar <ArrowRight size={18}/></Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {events.map(event => {
          const date = new Date(event.event_date)
          return (
            <Link href={`/events/${event.id}`} key={event.id} className="group border border-gray-100 rounded-2xl p-4 hover:shadow-lg transition bg-white flex flex-col">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-gray-100 rounded-xl w-16 h-16 flex flex-col items-center justify-center text-center shrink-0">
                  <span className="text-xs font-bold text-brand-purple uppercase">{date.toLocaleString('default', {month:'short'})}</span>
                  <span className="text-2xl font-black text-brand-dark leading-none">{date.getDate()}</span>
                </div>
                <div>
                  <h3 className="font-bold text-brand-dark group-hover:text-brand-purple transition line-clamp-1">{event.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    <Clock size={12}/> {date.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                  </div>
                </div>
              </div>
              <div className="mt-auto pt-3 border-t border-gray-50 flex justify-between items-center text-sm">
                <span className="font-bold text-brand-dark">{event.price}</span>
                <span className="text-brand-purple font-medium flex items-center gap-1">Details <ArrowRight size={14}/></span>
              </div>
            </Link>
          )
        })}
      </div>
      <div className="mt-6 text-center md:hidden">
        <Link href="/events" className="btn btn-plum-gradient px-6 py-2 text-sm">View Calendar</Link>
      </div>
    </Section>
  )
}
