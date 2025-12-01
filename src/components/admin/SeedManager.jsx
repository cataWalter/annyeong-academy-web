"use client";
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Database, RefreshCcw, AlertTriangle, Loader2, ArrowRight } from 'lucide-react'

export default function SeedManager() {
  const [loading, setLoading] = useState(false)

  const handleMigration = async () => {
    setLoading(true)
    // Since we don't have direct SQL access from client without RPC, we alert.
    alert("Please run this SQL in your Supabase Dashboard -> SQL Editor:\n\nALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS position integer DEFAULT 0;")
    setLoading(false)
  }

  // Client-side seed script for demonstration
  const handleSeed = async () => {
    if (!confirm("WARNING: This will insert dummy data. Continue?")) return
    setLoading(true)
    
    try {
      await supabase.from('tutors').insert([{
        id: crypto.randomUUID(),
        name: 'Kim Min-ji',
        role: 'Head Teacher',
        bio: 'Expert in Korean linguistics.',
        image_url: 'https://placehold.co/400',
        specialties: ['Grammar', 'Exam Prep'],
        is_featured: true
      }])

      const courseId = 'course-seed-' + Date.now()
      await supabase.from('products').insert([{
        id: courseId,
        title: 'Korean 101 (Seed)',
        description: 'Generated course.',
        price: '5000 Ft',
        type: 'course',
        level: 'Beginner',
        image_url: 'https://placehold.co/400'
      }])

      await supabase.from('lessons').insert([{
        course_id: courseId,
        title: 'Lesson 1: Hangeul',
        type: 'video',
        video_url: 'https://www.youtube.com/watch?v=s5aobqyEaMQ',
        description: 'Learn the basics. [[VOCAB::A|First Vowel]]',
        module: 'Introduction',
        position: 0
      }])

      alert("Database Seeded Successfully!")
    } catch (e) {
      alert("Error: " + e.message)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = async () => {
    alert("Resetting requires SQL access for safety. Please use Supabase Dashboard.")
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 max-w-xl mx-auto text-center">
      <div className="w-16 h-16 bg-blue-100 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-6">
        <Database size={32}/>
      </div>
      <h2 className="text-2xl font-bold text-brand-dark mb-2">Database Tools</h2>
      
      <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 text-left mb-6 text-sm">
        <strong>Required Migration:</strong> For Drag & Drop to work, the lessons table needs a 'position' column.
      </div>

      <div className="flex flex-col gap-3">
        <button onClick={handleMigration} disabled={loading} className="btn bg-brand-dark text-white py-3 px-6 rounded-xl flex items-center justify-center gap-2 mx-auto w-full">
            {loading ? <Loader2 className="animate-spin"/> : <><Database size={20}/> Show SQL Migration</>}
        </button>
        
        <div className="grid grid-cols-2 gap-3 mt-2">
            <button onClick={handleSeed} disabled={loading} className="btn bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl flex items-center justify-center gap-2">
            <RefreshCcw size={18}/> Seed Data
            </button>
            <button onClick={handleReset} className="btn bg-red-50 text-red-600 hover:bg-red-100 py-3 rounded-xl flex items-center justify-center gap-2 border border-red-100">
            <AlertTriangle size={18}/> Reset DB
            </button>
        </div>
      </div>
    </div>
  )
}
