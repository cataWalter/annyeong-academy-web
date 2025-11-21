import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import { Link } from 'react-router-dom'
import { BookOpen, Loader2, PlayCircle, Calendar } from 'lucide-react'

export default function Dashboard() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [courses, setCourses] = useState([])
  const [liveLessons, setLiveLessons] = useState([])

  useEffect(() => {
    if (user) fetchData()
  }, [user])

  const fetchData = async () => {
    try {
      const { data: purchases } = await supabase.from('purchases')
        .select('product_id').eq('user_id', user.id).eq('status', 'completed')

      if (purchases && purchases.length > 0) {
        const ids = purchases.map(p => p.product_id)
        const { data: products } = await supabase.from('products').select('*').in('id', ids)
        
        if (products) {
          setCourses(products.filter(p => p.type === 'course'))
          setLiveLessons(products.filter(p => p.type === 'standalone'))
        }
      }
    } catch (error) { console.error(error) } 
    finally { setLoading(false) }
  }

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-brand-purple" /></div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-dark mb-2">La tua Dashboard</h1>
      <p className="text-gray-500 mb-8">Bentornato! Ecco i tuoi progressi.</p>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-4xl font-bold text-brand-purple mb-1">{courses.length}</div>
          <div className="text-sm text-gray-500 font-medium uppercase">Corsi Attivi</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-4xl font-bold text-brand-blue mb-1">{liveLessons.length}</div>
          <div className="text-sm text-gray-500 font-medium uppercase">Live Prenotate</div>
        </div>
      </div>

      {/* LIVE LESSONS SECTION */}
      {liveLessons.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-bold text-brand-dark mb-4">Prossime Lezioni Live</h2>
          <div className="space-y-4">
            {liveLessons.map(lesson => (
              <div key={lesson.id} className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                  <Calendar size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-brand-dark">{lesson.title}</h3>
                  <p className="text-sm text-gray-500">Controlla la tua email per il link Zoom</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* COURSES SECTION */}
      <h2 className="text-xl font-bold text-brand-dark mb-4">I miei Corsi</h2>
      {courses.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {courses.map(course => (
            <div key={course.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                 <img src={course.image_url || 'https://placehold.co/100x100'} alt={course.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-brand-dark">{course.title}</h3>
                <Link to={\/corsi/\\} className="text-sm text-brand-purple font-semibold hover:underline flex items-center gap-1 mt-1">
                  <PlayCircle size={14} /> Vai alle lezioni
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-8 text-center border border-dashed border-gray-300">
          <p className="text-gray-500 mb-4">Non sei ancora iscritto a nessun corso.</p>
          <Link to="/corsi" className="inline-block bg-brand-purple text-white px-6 py-2 rounded-full font-medium">
            Esplora il Catalogo
          </Link>
        </div>
      )}
    </div>
  )
}
