"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import { Loader2, MessageCircle, PlayCircle } from 'lucide-react'
import Link from 'next/link'

export default function TutorsPage() {
  const [tutors, setTutors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTutors = async () => {
      const { data } = await supabase.from('tutors').select('*')
      setTutors(data || [])
      setLoading(false)
    }
    fetchTutors()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FC]">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold text-brand-dark mb-6">Our Teachers</h1>
          <p className="text-xl text-gray-600">
            Meet the native professionals bringing Seoul to your screen.
          </p>
        </div>

        {loading ? <Loader2 className="animate-spin mx-auto text-brand-purple"/> : (
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {tutors.map(tutor => (
              <Link href={`/tutors/${tutor.id}`} key={tutor.id} className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:-translate-y-2 transition duration-300">
                <div className="h-64 overflow-hidden bg-gray-100 relative">
                  <img src={tutor.image_url} alt={tutor.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-brand-dark flex items-center gap-1">
                    <PlayCircle size={12}/> Intro
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-brand-dark mb-1">{tutor.name}</h3>
                  <p className="text-brand-purple font-bold text-sm uppercase tracking-wider mb-4">{tutor.role}</p>
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed line-clamp-3">
                    {tutor.bio}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tutor.specialties?.map(tag => (
                      <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
            {tutors.length === 0 && <div className="col-span-3 text-center text-gray-400">No tutors found (Admin needs to add them).</div>}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
