import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import { Calendar, Loader2, Users, Video, CheckCircle } from 'lucide-react'
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
      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .eq('type', 'standalone')
      
      if (error) throw error
      setLessons(products || [])

      if (user) {
        const { data: purchases } = await supabase
          .from('purchases')
          .select('product_id')
          .eq('user_id', user.id)
          .eq('status', 'completed')
        
        if (purchases) {
          setPurchasedIds(purchases.map(p => p.product_id))
        }
      }
    } catch (error) {
      console.error('Error fetching live lessons:', error)
    } finally {
      setLoading(false)
    }
  }

  const getZoomLink = (desc) => {
    const match = desc?.match(/\[\[ZOOM::(.*?)\]\]/)
    return match ? match[1] : "https://zoom.us/join"
  }

  const cleanDesc = (desc) => desc?.replace(/\[\[.*?\]\]/g, '')

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-brand-purple" /></div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-dark mb-2">Lezioni Live Singole</h1>
      <p className="text-gray-500 mb-8">Prenota una sessione one-shot per praticare senza impegno mensile.</p>

      <div className="space-y-4">
        {lessons.length === 0 && (
           <p className="text-gray-400 italic">Nessuna lezione live in programma al momento.</p>
        )}

        {lessons.map(lesson => {
          const isPurchased = purchasedIds.includes(lesson.id)
          const zoomLink = getZoomLink(lesson.description)
          
          return (
            <div 
              key={lesson.id} 
              className={`bg-white rounded-2xl p-8 border transition ${isPurchased ? 'border-green-200 bg-green-50/30' : 'border-gray-100 shadow-sm hover:shadow-md'}`}
            >
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className={`p-4 rounded-2xl flex-shrink-0 ${isPurchased ? 'bg-green-100 text-green-600' : 'bg-purple-50 text-brand-purple'}`}>
                  {isPurchased ? <Video className="w-8 h-8" /> : <Calendar className="w-8 h-8" />}
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold text-brand-dark mb-2">{lesson.title}</h3>
                  <p className="text-gray-600 mb-3">{cleanDesc(lesson.description)}</p>
                  
                  <div className="flex justify-center md:justify-start gap-4 text-sm font-medium text-gray-500">
                    <span className="flex items-center gap-1"><Users size={16}/> Gruppo Piccolo</span>
                    {isPurchased && (
                      <span className="flex items-center gap-1 text-green-600 font-bold bg-white px-2 py-0.5 rounded-md shadow-sm border border-green-100">
                        <CheckCircle size={14}/> Iscrizione Confermata
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="text-center min-w-[180px]">
                  {isPurchased ? (
                    <div className="space-y-2">
                      <a 
                        href={zoomLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block w-full bg-green-600 text-white px-5 py-3 rounded-xl font-bold hover:bg-green-700 transition flex items-center justify-center gap-2 shadow-lg shadow-green-200"
                      >
                        <Video size={18} /> Entra in Zoom
                      </a>
                      <p className="text-xs text-green-700 font-medium">Link attivo 10min prima</p>
                    </div>
                  ) : (
                    <>
                      <div className="text-2xl font-bold text-brand-purple mb-3">{lesson.price} Ft</div>
                      <button 
                        onClick={() => initiateCheckout(lesson.id, lesson.title)}
                        className="w-full bg-brand-blue text-white px-4 py-3 rounded-xl font-bold hover:opacity-90 transition shadow-md hover:shadow-lg"
                      >
                        Prenota Posto
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
