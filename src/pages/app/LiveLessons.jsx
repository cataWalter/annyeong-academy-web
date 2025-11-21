import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { Calendar, Loader2, Users } from 'lucide-react'
import { initiateCheckout } from '../../lib/payment'

export default function LiveLessons() {
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLessons()
  }, [])

  const fetchLessons = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('type', 'standalone')
      
      if (error) throw error
      setLessons(data || [])
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-brand-purple" /></div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-dark mb-2">Lezioni Live Singole</h1>
      <p className="text-gray-500 mb-8">Prenota una sessione one-shot per praticare.</p>

      <div className="space-y-4">
        {lessons.map(lesson => (
          <div key={lesson.id} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="bg-purple-50 p-4 rounded-2xl">
                <Calendar className="w-12 h-12 text-brand-purple" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-brand-dark mb-2">{lesson.title}</h3>
                <p className="text-gray-600 mb-4">{lesson.description}</p>
                <div className="flex justify-center md:justify-start gap-4 text-sm font-medium text-gray-500">
                  <span className="flex items-center gap-1"><Users size={16}/> Gruppo Piccolo</span>
                </div>
              </div>
              <div className="text-center min-w-[120px]">
                <div className="text-2xl font-bold text-brand-purple mb-2">{lesson.price} Ft</div>
                <button 
                  onClick={() => initiateCheckout(lesson.id, lesson.title)}
                  className="w-full bg-brand-blue text-white px-4 py-2 rounded-lg font-bold hover:opacity-90 transition"
                >
                  Prenota
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
