"use client";
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { Loader2, FileText, Clock, BarChart, AlertTriangle } from 'lucide-react'
import CoursePlayer from '@/components/course/CoursePlayer' 
import { cleanDescription } from '@/lib/helpers'
import Link from 'next/link'

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
    const checkAccess = async () => {
      try {
        const { data: product } = await supabase.from('products').select('*').eq('id', id).single()
        setCourse(product)

        const { data: lessonData } = await supabase.from('lessons').select('id, title, type, description').eq('course_id', id).order('created_at', { ascending: true })
        setLessons(lessonData || [])

        if (user) {
          const { data: purchase } = await supabase.from('purchases')
            .select('*').eq('user_id', user.id).eq('product_id', id).eq('status', 'completed').single()
          if (purchase) setHasAccess(true)

          // Check Placement Result
          const { data: placement } = await supabase.from('placement_results').select('recommended_level').eq('user_id', user.id).order('created_at', { ascending: false }).limit(1).single()
          if (placement) setUserLevel(placement.recommended_level)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    if (id) checkAccess()
  }, [user, id])

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-brand-purple" size={40} /></div>
  if (!course) return <div className="text-center py-20">Course not found</div>

  if (hasAccess) return <CoursePlayer course={course} lessons={lessons} user={user} />

  // Level Warning Logic
  const showLevelWarning = userLevel && course.level && userLevel.toLowerCase() !== course.level.toLowerCase() && course.level !== 'All Levels';

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-center mb-8">
        <div className="w-full md:w-1/3 aspect-square bg-gray-200 rounded-2xl overflow-hidden relative">
          <img src={course.image_url || 'https://placehold.co/400'} alt={course.title} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <div className="flex gap-2 mb-4">
             <span className="bg-purple-100 text-brand-purple text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Course</span>
             {course.level && <span className="bg-blue-100 text-brand-blue text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{course.level}</span>}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">{course.title}</h1>
          <p className="text-gray-600 mb-6 text-lg leading-relaxed">{cleanDescription(course.description)}</p>
          
          <div className="flex flex-wrap gap-6 mb-8 text-sm font-medium text-gray-500">
            <span className="flex items-center gap-2"><Clock size={18}/> {lessons.length * 15} Mins</span>
            <span className="flex items-center gap-2"><FileText size={18}/> {lessons.length} Lessons</span>
            <span className="flex items-center gap-2"><BarChart size={18}/> {course.level || 'General'}</span>
          </div>

          {showLevelWarning && (
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6 rounded-r-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-orange-500 flex-shrink-0" size={20}/>
                <div>
                  <p className="font-bold text-orange-800 text-sm">Level Mismatch</p>
                  <p className="text-orange-700 text-sm">Your placement test recommended <strong>{userLevel}</strong>, but this course is <strong>{course.level}</strong>. It might be too difficult or too easy.</p>
                  <Link href="/placement-test" className="text-xs font-bold text-orange-900 underline mt-1 block">Retake Test</Link>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-brand-dark">{course.price}</span>
            <button 
              onClick={() => addToCart(course)}
              className="btn btn-plum-gradient px-8 py-3 rounded-xl shadow-lg flex-1 md:flex-none text-center"
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100"><h2 className="font-bold text-xl text-gray-800">Curriculum Preview</h2></div>
        {lessons.map((lesson, idx) => (
          <div key={lesson.id} className="p-4 border-b border-gray-100 last:border-0 flex items-center justify-between hover:bg-gray-50 transition">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 font-bold text-sm">{idx + 1}</div>
              <div><p className="font-bold text-gray-800">{lesson.title}</p></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
