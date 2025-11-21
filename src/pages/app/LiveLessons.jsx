import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import { Calendar, Loader2, Users, Video, CheckCircle, AlertTriangle } from 'lucide-react'
import { usePayment } from '../../context/PaymentContext'
import { useLanguage } from '../../context/LanguageContext'
import { extractTag, cleanDescription } from '../../lib/helpers'

export default function LiveLessons() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const { initiateCheckout } = usePayment()
  const [lessons, setLessons] = useState([])
  const [purchasedIds, setPurchasedIds] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [user])

  const fetchData = async () => {
    try {
      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .eq('type', 'standalone')
        .order('event_date', { ascending: true, nullsLast: true })
      
      if (error) throw error
      setLessons(products || [])

      if (user) {
        const { data: purchases } = await supabase.from('purchases').select('product_id').eq('user_id', user.id).eq('status', 'completed')
        if (purchases) setPurchasedIds(purchases.map(p => p.product_id))
      }
    } catch (error) { console.error(error) } finally { setLoading(false) }
  }

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-brand-purple" /></div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-dark mb-2">{t('live_schedule')}</h1>
      <p className="text-gray-500 mb-8">{t('live_desc')}</p>
      
      <div className="space-y-4">
        {lessons.length === 0 && <p className="text-gray-400 italic">{t('dash_no_live')}</p>}

        {lessons.map(lesson => {
          const isPurchased = purchasedIds.includes(lesson.id)
          const zoomLink = extractTag(lesson.description, 'ZOOM') || "https://zoom.us/join"
          const eventDate = lesson.event_date ? new Date(lesson.event_date) : null
          const isExpired = eventDate && eventDate < new Date()
          
          return (
            <div key={lesson.id} className={`bg-white rounded-2xl p-8 border transition relative ${isPurchased ? 'border-green-200 bg-green-50/30' : 'border-gray-100 shadow-sm hover:shadow-md'} ${isExpired ? 'opacity-60 grayscale' : ''}`}>
              
              {isExpired && (
                <div className="absolute top-4 right-4 bg-gray-200 text-gray-500 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <AlertTriangle size={12} /> {t('live_expired')}
                </div>
              )}

              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className={`p-4 rounded-2xl flex-shrink-0 w-full md:w-24 text-center ${isPurchased ? 'bg-green-100 text-green-600' : 'bg-purple-50 text-brand-purple'}`}>
                  {eventDate ? (
                    <>
                      <span className="block text-xs font-bold uppercase tracking-widest">{eventDate.toLocaleString('default', { month: 'short' })}</span>
                      <span className="block text-3xl font-black leading-none my-1">{eventDate.getDate()}</span>
                      <span className="block text-xs font-bold">{eventDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </>
                  ) : (
                    <div className="flex flex-col items-center py-2">
                      <Calendar size={32} />
                      <span className="text-xs font-bold mt-2">{t('live_tba')}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold text-brand-dark mb-2">{lesson.title}</h3>
                  <p className="text-gray-600 mb-3">{cleanDescription(lesson.description)}</p>
                  
                  <div className="flex justify-center md:justify-start gap-4 text-sm font-medium text-gray-500">
                    <span className="flex items-center gap-1"><Users size={16}/> Small Group</span>
                    {isPurchased && <span className="flex items-center gap-1 text-green-600 font-bold bg-white px-2 py-0.5 rounded-md shadow-sm border border-green-100"><CheckCircle size={14}/> {t('live_confirmed')}</span>}
                  </div>
                </div>
                
                <div className="text-center min-w-[180px]">
                  {isPurchased ? (
                    <div className="space-y-2">
                      <a 
                        href={isExpired ? '#' : zoomLink} 
                        target={isExpired ? '' : "_blank"} 
                        className={`block w-full px-5 py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-lg ${isExpired ? 'bg-gray-300 cursor-not-allowed text-gray-500' : 'bg-green-600 text-white hover:bg-green-700 shadow-green-200'}`}
                      >
                        <Video size={18} /> {isExpired ? t('live_expired') : t('live_join')}
                      </a>
                    </div>
                  ) : (
                    <>
                      <div className="text-2xl font-bold text-brand-purple mb-3">{lesson.price}</div>
                      <button 
                        onClick={() => initiateCheckout(lesson)} 
                        disabled={isExpired}
                        className="w-full bg-brand-blue text-white px-4 py-3 rounded-xl font-bold hover:opacity-90 transition shadow-md hover:shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        {isExpired ? t('live_closed') : t('live_book')}
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
