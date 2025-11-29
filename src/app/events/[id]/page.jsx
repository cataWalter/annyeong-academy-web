"use client";
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useCart } from '@/context/CartContext'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import { Loader2, Calendar, Clock, Video, Users, ArrowLeft, BarChart } from 'lucide-react'
import Link from 'next/link'
import { cleanDescription, extractTag } from '@/lib/helpers'

export default function EventPage() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvent = async () => {
      const { data } = await supabase.from('products').select('*').eq('id', id).single()
      setEvent(data)
      setLoading(false)
    }
    if(id) fetchEvent()
  }, [id])

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-brand-purple" size={40} /></div>
  if (!event) return <div className="text-center py-20">Event not found</div>

  const date = new Date(event.event_date)
  const seatsLeft = (event.total_seats || 14) - (event.booked_seats || 0)
  const isFull = seatsLeft <= 0

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FC]">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/events" className="inline-flex items-center gap-2 text-gray-400 hover:text-brand-purple font-bold mb-6"><ArrowLeft size={18}/> Back to Calendar</Link>
          
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
            <div className="h-64 bg-gray-200 relative">
               <img src={event.image_url || 'https://placehold.co/800x400'} className="w-full h-full object-cover" alt={event.title} />
               <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent w-full h-full"></div>
               <div className="absolute bottom-8 left-8 text-white">
                 <span className="bg-brand-purple px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block">Live Event</span>
                 <h1 className="text-3xl md:text-4xl font-bold">{event.title}</h1>
               </div>
            </div>

            <div className="flex flex-col md:flex-row">
              <div className="p-8 md:w-2/3">
                <h2 className="text-xl font-bold text-brand-dark mb-4">About this event</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{cleanDescription(event.description)}</p>
                
                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="bg-white p-2 rounded-full shadow-sm"><Users size={20} className="text-brand-purple"/></div>
                    <div>
                      <p className="font-bold text-gray-800">Availability</p>
                      <p className={`text-xs font-bold ${isFull ? 'text-red-500' : 'text-green-600'}`}>
                        {isFull ? 'Fully Booked' : `${seatsLeft} spots remaining`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 md:w-1/3 bg-gray-50 border-l border-gray-100">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                  <div className="text-center mb-6">
                    <p className="text-gray-500 font-bold uppercase text-xs mb-1">Date & Time</p>
                    <p className="text-xl font-black text-brand-dark">{date.toLocaleDateString()}</p>
                    <p className="text-brand-purple font-bold">{date.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</p>
                  </div>

                  <div className="border-t border-gray-100 py-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Price</span>
                      <span className="text-2xl font-bold text-brand-dark">{event.price}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => addToCart(event)}
                    disabled={isFull}
                    className="w-full btn btn-plum-gradient py-3 rounded-xl shadow-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isFull ? 'Sold Out' : 'Book Spot'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
