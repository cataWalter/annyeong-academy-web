"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import Section from '../ui/Section'
import { Video, ArrowRight } from 'lucide-react'

export default function FeaturedCourses() {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fetchCourses = async () => {
      const { data } = await supabase.from('products').select('*').eq('type', 'course').limit(3)
      setCourses(data || [])
    }
    fetchCourses()
  }, [])

  if (courses.length === 0) return null

  return (
    <Section className="bg-[#F8F9FC]">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-2">Popular Courses</h2>
          <p className="text-gray-600">Start your journey here.</p>
        </div>
        <Link href="/corsi" className="hidden md:flex items-center gap-2 font-bold text-brand-purple hover:underline">View All <ArrowRight size={18}/></Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {courses.map(course => (
          <Link href={`/corsi/${course.id}`} key={course.id} className="group bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl transition duration-300 border border-transparent hover:border-brand-purple/20">
            <div className="h-48 overflow-hidden rounded-2xl relative bg-gray-100 mb-4">
              <img src={course.image_url || 'https://placehold.co/400x300'} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-brand-dark flex items-center gap-1">
                <Video size={12} className="text-brand-purple" /> COURSE
              </div>
            </div>
            <div className="px-2 pb-2">
              <h3 className="text-xl font-bold text-brand-dark mb-2">{course.title}</h3>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Beginner Friendly</span>
                <span className="font-bold text-brand-purple">{course.price}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  )
}
