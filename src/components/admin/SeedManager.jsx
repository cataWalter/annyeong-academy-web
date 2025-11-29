"use client";
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Database, RefreshCcw, AlertTriangle, Loader2 } from 'lucide-react'

export default function SeedManager() {
  const [loading, setLoading] = useState(false)

  // Note: This is a client-side seed script for demonstration. 
  // In production, use SQL scripts or Edge Functions.
  const handleSeed = async () => {
    if (!confirm("WARNING: This will insert dummy data. Continue?")) return
    setLoading(true)
    
    try {
      // Seed a Tutor
      await supabase.from('tutors').insert([{
        id: crypto.randomUUID(),
        name: 'Kim Min-ji',
        role: 'Head Teacher',
        bio: 'Expert in Korean linguistics.',
        image_url: 'https://placehold.co/400',
        specialties: ['Grammar', 'Exam Prep'],
        is_featured: true
      }])

      // Seed a Course
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

      // Seed a Lesson
      await supabase.from('lessons').insert([{
        course_id: courseId,
        title: 'Lesson 1: Hangeul',
        type: 'video',
        video_url: 'https://youtube.com',
        description: 'Learn the basics. [[VOCAB::A|First Vowel]]',
        module: 'Introduction'
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
      <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <Database size={32}/>
      </div>
      <h2 className="text-2xl font-bold text-brand-dark mb-2">Database Tools</h2>
      <p className="text-gray-500 mb-8">Manage seed data for testing purposes.</p>

      <div className="grid grid-cols-2 gap-4">
        <button onClick={handleSeed} disabled={loading} className="btn bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl flex items-center justify-center gap-2">
          {loading ? <Loader2 className="animate-spin"/> : <><Database size={20}/> Seed Data</>}
        </button>
        <button onClick={handleReset} className="btn bg-red-50 text-red-600 hover:bg-red-100 py-4 rounded-xl flex items-center justify-center gap-2 border border-red-100">
          <AlertTriangle size={20}/> Reset DB
        </button>
      </div>
      <p className="text-xs text-gray-400 mt-4">Warning: Actions affect the live database.</p>
    </div>
  )
}
