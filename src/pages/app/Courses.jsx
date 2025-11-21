import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { BookOpen, Star, Video, Users, Calendar, Loader2, AlertCircle } from 'lucide-react'
import { initiateCheckout } from '../../lib/payment'

export default function Courses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      // Fetch products where type is 'course'
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('type', 'course')
      
      if (error) throw error
      setCourses(data || [])
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-brand-purple" /></div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-dark mb-2">Catalogo Corsi</h1>
      <p className="text-gray-500 mb-8">Scegli tra corsi in diretta o video on-demand.</p>

      {courses.length === 0 && (
        <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500">Nessun corso disponibile al momento.</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition group flex flex-col">
            <div className="h-48 overflow-hidden relative bg-gray-100">
              <img 
                src={course.image_url || 'https://placehold.co/600x400/6a11cb/ffffff?text=Corso'} 
                alt={course.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-brand-dark flex items-center gap-1">
                <Video size={12} className="text-blue-500" /> VIDEO
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-brand-dark mb-2">{course.title}</h3>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">{course.description}</p>
              
              <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                <span className="text-2xl font-bold text-brand-purple">{course.price} Ft</span>
                <button 
                  onClick={() => initiateCheckout(course.id, course.title)}
                  className="bg-brand-dark text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition"
                >
                  Iscriviti
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
