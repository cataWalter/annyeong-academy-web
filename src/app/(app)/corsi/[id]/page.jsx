"use client";
import RelatedProducts from '@/components/course/RelatedProducts'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { Loader2, FileText, Clock, BarChart, AlertTriangle, Lock, Globe } from 'lucide-react'
import CoursePlayer from '@/components/course/CoursePlayer' 
import { cleanDescription } from '@/lib/helpers'
import Link from 'next/link'
import SaleCountdown from '@/components/ui/SaleCountdown'

export default function CoursePage() {
  const { id } = useParams()
  const { user } = useAuth()
  const { addToCart } = useCart()
  
  const [loading, setLoading] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)
  const [course, setCourse] = useState(null)
  const [lessons, setLessons] = useState([])
  const [userLevel, setUserLevel] = useState(null)

  useEffect(() => {
    if(course) document.title = `${course.title} | Annyeong Academy`
  }, [course])

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const { data: product } = await supabase.from('products').select('*, tutors(*)').eq('id', id).single()
        setCourse(product)

        const { data: lessonData } = await supabase.from('lessons').select('*').eq('course_id', id).order('created_at', { ascending: true })
        setLessons(lessonData || [])

        if (user) {
          const { data: purchase } = await supabase.from('purchases').select('*').eq('user_id', user.id).eq('product_id', id).eq('status', 'completed').single()
          const { data: sub } = await supabase.from('subscriptions').select('*').eq('user_id', user.id).eq('status', 'active').single()
          
          if (purchase || sub) setHasAccess(true)

          const { data: placement } = await supabase.from('placement_results').select('recommended_level').eq('user_id', user.id).order('created_at', { ascending: false }).limit(1).single()
          if (placement) setUserLevel(placement.recommended_level)
        }
      } catch (err) { console.error(err) } finally { setLoading(false) }
    }
    if (id) checkAccess()
  }, [user, id])

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-brand-purple" size={40} /></div>
  if (!course) return <div className="text-center py-20">Course not found</div>

  if (hasAccess) return <CoursePlayer course={course} lessons={lessons} user={user} />

  const seatsLeft = (course.total_seats || 999) - (course.booked_seats || 0)
  const isFull = seatsLeft <= 0
  const isPrereqLocked = course.level === 'Advanced' && (!userLevel || userLevel !== 'Advanced')
  const isOnSale = course.sale_price && new Date(course.sale_ends_at) > new Date()

  return (
    <div className="max-w-5xl mx-auto pb-20 pt-10 px-4">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-start mb-8 animate-fade-in">
        <div className="w-full md:w-1/3">
          <div className="aspect-square bg-gray-200 rounded-2xl overflow-hidden relative shadow-md mb-4">
            <img src={course.image_url || 'https://placehold.co/400'} alt={course.title} className="w-full h-full object-cover" />
            {isFull && <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-xl uppercase tracking-widest">Sold Out</div>}
            {isOnSale && <SaleCountdown endDate={course.sale_ends_at} />}
          </div>
          {course.tutors && (
            <Link href={`/tutors/${course.tutors.id}`} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition border border-gray-200">
              <img src={course.tutors.image_url} className="w-10 h-10 rounded-full object-cover"/>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Teached By</p>
                <p className="text-sm font-bold text-brand-dark">{course.tutors.name}</p>
              </div>
            </Link>
          )}
        </div>

        <div className="flex-1">
          <div className="flex gap-2 mb-4">
             <span className="bg-purple-100 text-brand-purple text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Course</span>
             {course.level && <span className="bg-blue-100 text-brand-blue text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{course.level}</span>}
             {course.instruction_language && <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"><Globe size={12}/> {course.instruction_language}</span>}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">{course.title}</h1>
          <p className="text-gray-600 mb-6 text-lg leading-relaxed">{cleanDescription(course.description)}</p>
          
          <div className="flex flex-wrap gap-6 mb-8 text-sm font-medium text-gray-500">
            <span className="flex items-center gap-2"><Clock size={18}/> {lessons.length * 15} Mins</span>
            <span className="flex items-center gap-2"><FileText size={18}/> {lessons.length} Lessons</span>
            <span className="flex items-center gap-2"><BarChart size={18}/> {course.level || 'General'}</span>
          </div>

          {isPrereqLocked && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
              <div className="flex items-start gap-3">
                <Lock className="text-red-500 flex-shrink-0" size={20}/>
                <div>
                  <p className="font-bold text-red-800 text-sm">Prerequisite Missing</p>
                  <p className="text-red-700 text-sm">You need <strong>Advanced</strong> proficiency. Your level: <strong>{userLevel || 'Unknown'}</strong>.</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-4">
            <div className="flex flex-col">
               {isOnSale && <span className="text-sm text-gray-400 line-through">{course.price}</span>}
               <span className={`text-3xl font-bold ${isOnSale ? 'text-red-500' : 'text-brand-dark'}`}>{isOnSale ? course.sale_price : course.price}</span>
            </div>
            <button 
              onClick={() => addToCart({ ...course, price: isOnSale ? course.sale_price : course.price })}
              disabled={isFull || isPrereqLocked}
              className="btn btn-plum-gradient px-8 py-3 rounded-xl shadow-lg flex-1 md:flex-none text-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isFull ? "Course Full" : (isPrereqLocked ? "Locked" : "Enroll Now")}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50"><h2 className="font-bold text-xl text-gray-800">Curriculum Preview</h2></div>
        {lessons.map((lesson, idx) => (
          <div key={lesson.id} className="p-4 border-b border-gray-100 last:border-0 flex items-center justify-between hover:bg-gray-50 transition">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 font-bold text-sm">{idx + 1}</div>
              <div><p className="font-bold text-gray-800">{lesson.title}</p></div>
            </div>
            {lesson.type === 'video' && <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">Video</span>}
          </div>
        ))}
        {lessons.length === 0 && <div className="p-8 text-center text-gray-400">No lessons yet.</div>}
      </div>
      <RelatedProducts currentCourseId={course.id} />
    </div>
  )
}
