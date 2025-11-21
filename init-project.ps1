import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import { Calendar, Loader2, Users, Video, Lock } from 'lucide-react'
import { initiateCheckout } from '../../lib/payment'

export default function LiveLessons() {
  const { user } = useAuth()
  const [lessons, setLessons] = useState([])
  const [purchasedIds, setPurchasedIds] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [user])

  const fetchData = async () => {
    try {
      // 1. Fetch Lessons
      const { data: products } = await supabase.from('products').select('*').eq('type', 'standalone')
      setLessons(products || [])

      // 2. Fetch Purchases
      if (user) {
        const { data: purchases } = await supabase.from('purchases')
          .select('product_id').eq('user_id', user.id).eq('status', 'completed')
        if (purchases) setPurchasedIds(purchases.map(p => p.product_id))
      }
    } catch (error) { console.error(error) } 
    finally { setLoading(false) }
  }

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-brand-purple" /></div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-dark mb-2">Lezioni Live Singole</h1>
      <p className="text-gray-500 mb-8">Prenota una sessione one-shot per praticare.</p>

      <div className="space-y-4">
        {lessons.map(lesson => {
          const isPurchased = purchasedIds.includes(lesson.id)
          
          return (
            <div key={lesson.id} className={`bg-white rounded-2xl p-8 border transition ${isPurchased ? 'border-green-200 bg-green-50/30' : 'border-gray-100 shadow-sm hover:shadow-md'}`}>
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className={`p-4 rounded-2xl ${isPurchased ? 'bg-green-100 text-green-600' : 'bg-purple-50 text-brand-purple'}`}>
                  <Calendar className="w-12 h-12" />
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold text-brand-dark mb-2">{lesson.title}</h3>
                  <p className="text-gray-600 mb-4">{lesson.description}</p>
                  <div className="flex justify-center md:justify-start gap-4 text-sm font-medium text-gray-500">
                    <span className="flex items-center gap-1"><Users size={16}/> Gruppo Piccolo</span>
                    {isPurchased && <span className="flex items-center gap-1 text-green-600"><Lock size={14} className="text-green-600"/> Accesso Sbloccato</span>}
                  </div>
                </div>
                
                <div className="text-center min-w-[160px]">
                  {isPurchased ? (
                    <div className="space-y-2">
                      <div className="text-sm font-bold text-green-600 mb-2">PRENOTATO ✅</div>
                      {lesson.content_url ? (
                        <a 
                          href={lesson.content_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block w-full bg-green-600 text-white px-4 py-3 rounded-lg font-bold hover:bg-green-700 transition flex items-center justify-center gap-2"
                        >
                          <Video size={18} /> Entra in Zoom
                        </a>
                      ) : (
                        <button disabled className="w-full bg-gray-200 text-gray-500 px-4 py-3 rounded-lg font-bold cursor-not-allowed text-xs">
                          Link in arrivo...
                        </button>
                      )}
                    </div>
                  ) : (
                    <>
                      <div className="text-2xl font-bold text-brand-purple mb-2">{lesson.price} Ft</div>
                      <button 
                        onClick={() => initiateCheckout(lesson.id, lesson.title)}
                        className="w-full bg-brand-blue text-white px-4 py-2 rounded-lg font-bold hover:opacity-90 transition"
                      >
                        Prenota
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