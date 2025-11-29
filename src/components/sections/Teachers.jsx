"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Section from '../ui/Section'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

export default function Teachers() {
  const [tutors, setTutors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTutors = async () => {
      const { data } = await supabase.from('tutors').select('*').eq('is_featured', true).limit(3)
      setTutors(data || [])
      setLoading(false)
    }
    fetchTutors()
  }, [])

  return (
    <Section className="bg-[#F8F9FC]">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">Who will you learn from?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Native teachers who currently live in Korea. They deliver the living language of today.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center"><Loader2 className="animate-spin text-brand-purple" /></div>
      ) : (
        <div className="flex flex-wrap justify-center gap-8">
          {tutors.map(tutor => (
            <Link href={`/tutors/${tutor.id}`} key={tutor.id} className="bg-white rounded-3xl shadow-lg max-w-sm text-center overflow-hidden group hover:-translate-y-2 transition duration-300 cursor-pointer w-full md:w-80">
              <div className="h-64 bg-gray-200 relative overflow-hidden">
                 <img src={tutor.image_url || 'https://placehold.co/400'} alt={tutor.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-brand-dark mb-1">{tutor.name}</h3>
                <p className="text-brand-purple font-bold text-sm uppercase tracking-wider mb-4">{tutor.role}</p>
                <p className="text-gray-600 italic text-sm line-clamp-3">
                  {tutor.bio}
                </p>
              </div>
            </Link>
          ))}
          {tutors.length === 0 && <p className="text-gray-400">No featured tutors yet.</p>}
        </div>
      )}
    </Section>
  )
}
