import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import { usePayment } from '../../context/PaymentContext'
import { useLanguage } from '../../context/LanguageContext'
import { Link } from 'react-router-dom'
import { ShoppingBag, Loader2, Download, Check } from 'lucide-react'
import { cleanDescription } from '../../lib/helpers'

export default function Store() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const { initiateCheckout } = usePayment()
  const [products, setProducts] = useState([])
  const [purchasedIds, setPurchasedIds] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [user])

  const fetchData = async () => {
    try {
      const { data, error } = await supabase.from('products').select('*').eq('type', 'ebook')
      if (error) throw error
      setProducts(data || [])

      if (user) {
        const { data: purchases } = await supabase
          .from('purchases').select('product_id').eq('user_id', user.id).eq('status', 'completed')
        if (purchases) setPurchasedIds(purchases.map(p => p.product_id))
      }
    } catch (error) { console.error(error) } 
    finally { setLoading(false) }
  }

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-brand-purple" /></div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-dark mb-2">{t('store_title')}</h1>
      <p className="text-gray-500 mb-8">{t('store_desc')}</p>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map(product => {
          const isOwned = purchasedIds.includes(product.id)
          return (
            <div key={product.id} className={`bg-white rounded-2xl overflow-hidden border transition group flex flex-col ${isOwned ? 'border-green-200 shadow-sm' : 'border-gray-100 shadow-sm hover:shadow-md'}`}>
              <div className="h-56 overflow-hidden relative bg-gray-100 flex items-center justify-center">
                <img src={product.image_url || 'https://placehold.co/400x500/2575fc/ffffff?text=Ebook'} alt={product.title} className={`h-full object-cover transition duration-500 ${!isOwned && 'group-hover:scale-105'}`} />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-brand-purple shadow-sm">EBOOK</div>
                {isOwned && <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]"><div className="bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg"><Check size={24} strokeWidth={3} /></div></div>}
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-brand-dark mb-2">{product.title}</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-1">{cleanDescription(product.description)}</p>
                <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                  {isOwned ? (
                    <Link to="/downloads" className="w-full flex items-center justify-center gap-2 bg-green-50 text-green-700 border border-green-200 px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-100 transition"><Download size={16} /> {t('store_download')}</Link>
                  ) : (
                    <>
                      <span className="text-xl font-bold text-brand-purple">{product.price}</span>
                      <button onClick={() => initiateCheckout(product)} className="flex items-center gap-2 bg-brand-dark text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition shadow-md"><ShoppingBag size={16} /> {t('store_buy')}</button>
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
