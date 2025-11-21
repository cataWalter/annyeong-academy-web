import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import { usePayment } from '../../context/PaymentContext'
import { useLanguage } from '../../context/LanguageContext'
import { Video, Loader2, PlayCircle, ShoppingCart, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cleanDescription } from '../../lib/helpers'

export default function Courses() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const { initiateCheckout } = usePayment()
  const [courses, setCourses] = useState([])
  const [purchasedIds, setPurchasedIds] = useState([])
  const [loading, setLoading] = useState(true)
  
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')

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

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase())
    const isOwned = purchasedIds.includes(course.id)
    
    if (filter === 'owned' && !isOwned) return false
    if (filter === 'not_owned' && isOwned) return false
    
    return matchesSearch
  })

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-brand-purple" /></div>

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark mb-2">{t('course_catalog')}</h1>
          <p className="text-gray-500">{t('course_desc')}</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder={t('course_search')}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-brand-purple"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="px-4 py-2 border border-gray-200 rounded-xl outline-none bg-white text-gray-600 text-sm font-bold"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">{t('course_filter_all')}</option>
            <option value="owned">{t('course_filter_owned')}</option>
            <option value="not_owned">{t('course_filter_not')}</option>
          </select>
        </div>
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500 font-medium">{t('course_no_results')}</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => {
          const isOwned = purchasedIds.includes(course.id)

          return (
            <div key={course.id} className={`bg-white rounded-2xl overflow-hidden border transition group flex flex-col ${isOwned ? 'border-green-200 shadow-sm' : 'border-gray-100 hover:shadow-md'}`}>
              <div className="h-48 overflow-hidden relative bg-gray-100">
                <img 
                  src={course.image_url || 'https://placehold.co/600x400/6a11cb/ffffff?text=Course'} 
                  alt={course.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-brand-dark flex items-center gap-1">
                  <Video size={12} className="text-blue-500" /> VIDEO
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-brand-dark mb-2">{course.title}</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-1">{cleanDescription(course.description)}</p>
                
                <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                  {isOwned ? (
                     <Link 
                       to={`/corsi/${course.id}`}
                       className="w-full bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-700 transition flex items-center justify-center gap-2"
                     >
                       <PlayCircle size={16} /> {t('course_access')}
                     </Link>
                  ) : (
                    <>
                      <span className="text-2xl font-bold text-brand-purple">{course.price}</span>
                      <button 
                        onClick={() => initiateCheckout(course)}
                        className="bg-brand-dark text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition flex items-center gap-2"
                      >
                        <ShoppingCart size={16}/> {t('course_enroll')}
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
