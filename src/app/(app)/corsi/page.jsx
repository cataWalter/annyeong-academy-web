"use client";
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import { usePayment } from '@/context/PaymentContext'
import { useLanguage } from '@/context/LanguageContext'
import { Video, Loader2, PlayCircle, ShoppingCart, Search, X, Star, Filter, User } from 'lucide-react'
import Link from 'next/link'
import { cleanDescription } from '@/lib/helpers'
import WishlistButton from '@/components/ui/WishlistButton'

export default function Courses() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const { initiateCheckout } = usePayment()
  const searchParams = useSearchParams()
  
  const [courses, setCourses] = useState([])
  const [tutors, setTutors] = useState([])
  const [purchasedIds, setPurchasedIds] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('')
  const [ownershipFilter, setOwnershipFilter] = useState('all')
  const [levelFilter, setLevelFilter] = useState('all')
  const [tutorFilter, setTutorFilter] = useState('all')
  const [sortOrder, setSortOrder] = useState('popular')

  useEffect(() => {
    const levelParam = searchParams.get('level')
    if (levelParam) setLevelFilter(levelParam)
  }, [searchParams])

  useEffect(() => { fetchData() }, [user])

  const fetchData = async () => {
    try {
      // Fetch Products with Tutors
      const { data: prods } = await supabase.from('products').select('*, tutors(id, name)').eq('type', 'course')
      setCourses(prods || [])
      
      // Fetch Tutors for Filter
      const { data: tuts } = await supabase.from('tutors').select('id, name')
      setTutors(tuts || [])

      if (user) {
        const { data: purchases } = await supabase.from('purchases').select('product_id').eq('user_id', user.id).eq('status', 'completed')
        if (purchases) setPurchasedIds(purchases.map(p => p.product_id))
      }
    } catch (error) { console.error(error) } finally { setLoading(false) }
  }

  const getPriceVal = (p) => parseFloat(p.replace(/[^0-9.]/g, '') || 0)

  const filteredCourses = courses
    .filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase())
      const isOwned = purchasedIds.includes(course.id)
      
      const matchOwn = ownershipFilter === 'all' 
        || (ownershipFilter === 'owned' && isOwned) 
        || (ownershipFilter === 'not_owned' && !isOwned)
      
      const matchLevel = levelFilter === 'all' || course.level?.toLowerCase() === levelFilter.toLowerCase()
      const matchTutor = tutorFilter === 'all' || course.tutor_id === tutorFilter

      return matchesSearch && matchOwn && matchLevel && matchTutor
    })
    .sort((a, b) => {
      if (sortOrder === 'price_asc') return getPriceVal(a.price) - getPriceVal(b.price)
      if (sortOrder === 'price_desc') return getPriceVal(b.price) - getPriceVal(a.price)
      if (sortOrder === 'newest') return new Date(b.created_at || 0) - new Date(a.created_at || 0)
      return 0 // Default
    })

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-brand-purple" /></div>

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark mb-2">{t('course_catalog')}</h1>
          <p className="text-gray-500">{t('course_desc')}</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" placeholder={t('course_search')}
            className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-xl outline-none focus:border-brand-purple transition"
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"><X size={14}/></button>}
        </div>
      </div>

      {/* Advanced Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-8 flex flex-col md:flex-row gap-4 overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max">
          <Filter size={16} className="text-brand-purple"/> <span className="font-bold text-sm text-gray-700">Filters:</span>
        </div>
        
        <select className="filter-select" value={ownershipFilter} onChange={e => setOwnershipFilter(e.target.value)}>
          <option value="all">All Ownership</option>
          <option value="owned">My Courses</option>
          <option value="not_owned">Available to Buy</option>
        </select>

        <select className="filter-select" value={levelFilter} onChange={e => setLevelFilter(e.target.value)}>
          <option value="all">All Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <select className="filter-select" value={tutorFilter} onChange={e => setTutorFilter(e.target.value)}>
          <option value="all">All Tutors</option>
          {tutors.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>

        {/* Sorting */}
        <select className="filter-select md:ml-auto" value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
          <option value="popular">Most Popular</option>
          <option value="newest">Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500 font-medium">{t('course_no_results')}</p>
          <button onClick={() => {setSearchTerm(''); setLevelFilter('all'); setOwnershipFilter('all'); setTutorFilter('all')}} className="text-brand-purple font-bold mt-2 hover:underline">Clear Filters</button>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => {
          const isOwned = purchasedIds.includes(course.id)
          return (
            <div key={course.id} className={`bg-white rounded-2xl overflow-hidden border transition group flex flex-col relative ${isOwned ? 'border-green-200 shadow-sm' : 'border-gray-100 hover:shadow-md'}`}>
              <div className="h-48 overflow-hidden relative bg-gray-100">
                <img src={course.image_url || 'https://placehold.co/600x400/6a11cb/ffffff?text=Course'} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-brand-dark flex items-center gap-1">
                  <Video size={12} className="text-blue-500" /> {course.level || 'All Levels'}
                </div>
                <div className="absolute top-4 left-4">
                  <WishlistButton productId={course.id} />
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="mb-2">
                   <h3 className="text-xl font-bold text-brand-dark">{course.title}</h3>
                   {course.tutors && <p className="text-xs text-gray-500 flex items-center gap-1 mt-1"><User size={12}/> {course.tutors.name}</p>}
                </div>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-1">{cleanDescription(course.description)}</p>
                <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                  {isOwned ? (
                     <Link href={`/corsi/${course.id}`} className="w-full bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-700 transition flex items-center justify-center gap-2">
                       <PlayCircle size={16} /> {t('course_access')}
                     </Link>
                  ) : (
                    <>
                      <span className="text-2xl font-bold text-brand-purple">{course.price}</span>
                      <button onClick={() => initiateCheckout(course)} className="bg-brand-dark text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition flex items-center gap-2">
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
      <style jsx>{`
        .filter-select {
          @apply px-4 py-2 border border-gray-200 rounded-xl outline-none bg-white text-gray-600 text-sm font-bold focus:border-brand-purple cursor-pointer;
        }
      `}</style>
    </div>
  )
}
