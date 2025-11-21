import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import { Video, Loader2, PlayCircle, ShoppingCart } from 'lucide-react'
import { initiateCheckout } from '../../lib/payment'
import { Link } from 'react-router-dom'

export default function Courses() {
  const { user } = useAuth()
  const [courses, setCourses] = useState([])
  const [purchasedIds, setPurchasedIds] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [user])

  const fetchData = async () => {
    try {
      const { data, error } = await supabase.from('products').select('*').eq('type', 'course')
      if (error) throw error
      setCourses(data || [])

      if (user) {
        const { data: purchases } = await supabase
          .from('purchases')
          .select('product_id')
          .eq('user_id', user.id)
          .eq('status', 'completed')
        
        if (purchases) setPurchasedIds(purchases.map(p => p.product_id))
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const cleanDesc = (desc) => desc?.replace(/\[\[.*?\]\]/g, '')

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
        {courses.map(course => {
          const isOwned = purchasedIds.includes(course.id)

          return (
            <div key={course.id} className={`bg-white rounded-2xl overflow-hidden border transition group flex flex-col ${isOwned ? 'border-green-200 shadow-sm' : 'border-gray-100 hover:shadow-md'}`}>
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
                <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-1">{cleanDesc(course.description)}</p>
                
                <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                  {isOwned ? (
                     <Link 
                       to={`/corsi/${course.id}`}
                       className="w-full bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-700 transition flex items-center justify-center gap-2"
                     >
                       <PlayCircle size={16} /> Accedi al Corso
                     </Link>
                  ) : (
                    <>
                      <span className="text-2xl font-bold text-brand-purple">{course.price} Ft</span>
                      <button 
                        onClick={() => initiateCheckout(course.id, course.title)}
                        className="bg-brand-dark text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition flex items-center gap-2"
                      >
                        <ShoppingCart size={16}/> Iscriviti
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
