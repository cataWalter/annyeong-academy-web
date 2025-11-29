"use client";
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/context/LanguageContext'
import Link from 'next/link'
import { ShoppingBag, Loader2, Download, Check, Plus, Filter, Search, Shirt, Book } from 'lucide-react'
import { cleanDescription } from '@/lib/helpers'
import WishlistButton from '@/components/ui/WishlistButton'

export default function Store() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const { addToCart } = useCart()
  
  const [products, setProducts] = useState([])
  const [purchasedIds, setPurchasedIds] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => { fetchData() }, [user])

  const fetchData = async () => {
    try {
      const { data } = await supabase.from('products').select('*').in('type', ['ebook', 'merch', 'bundle'])
      setProducts(data || [])
      if (user) {
        const { data: purchases } = await supabase.from('purchases').select('product_id').eq('user_id', user.id).eq('status', 'completed')
        if (purchases) setPurchasedIds(purchases.map(p => p.product_id))
      }
    } catch (error) { console.error(error) } finally { setLoading(false) }
  }

  const filteredProducts = products.filter(p => {
    const matchesCat = filter === 'all' || p.type === filter
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase())
    return matchesCat && matchesSearch
  })

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-brand-purple" /></div>

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark mb-2">{t('store_title')}</h1>
          <p className="text-gray-500">{t('store_desc')}</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
           <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18}/>
              <input 
                placeholder="Search items..." 
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-brand-purple w-full"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
           </div>
           <div className="flex gap-2">
              <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-xl text-sm font-bold transition ${filter === 'all' ? 'bg-brand-dark text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>All</button>
              <button onClick={() => setFilter('ebook')} className={`px-4 py-2 rounded-xl text-sm font-bold transition ${filter === 'ebook' ? 'bg-brand-dark text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>Ebooks</button>
              <button onClick={() => setFilter('merch')} className={`px-4 py-2 rounded-xl text-sm font-bold transition ${filter === 'merch' ? 'bg-brand-dark text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>Merch</button>
           </div>
        </div>
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300 text-gray-400">No products found.</div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {filteredProducts.map(product => {
          const isOwned = purchasedIds.includes(product.id)
          const isEbook = product.type === 'ebook'
          
          return (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition group flex flex-col relative">
              <div className="h-56 overflow-hidden relative bg-gray-50 flex items-center justify-center">
                <img src={product.image_url || 'https://placehold.co/400x400'} alt={product.title} className={`h-full w-full object-cover transition duration-500 ${!isOwned && 'group-hover:scale-105'}`} />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-brand-purple shadow-sm uppercase">{product.type}</div>
                <div className="absolute top-4 left-4"><WishlistButton productId={product.id} /></div>
                {isOwned && isEbook && <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]"><div className="bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg"><Check size={24} strokeWidth={3} /></div></div>}
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-brand-dark mb-2">{product.title}</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-1">{cleanDescription(product.description)}</p>
                <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                  {isOwned && isEbook ? (
                    <Link href="/downloads" className="w-full flex items-center justify-center gap-2 bg-green-50 text-green-700 border border-green-200 px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-100 transition"><Download size={16} /> {t('store_download')}</Link>
                  ) : (
                    <>
                      <span className="text-xl font-bold text-brand-purple">{product.price}</span>
                      <button onClick={() => addToCart(product)} className="flex items-center gap-2 bg-brand-dark text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition shadow-md">
                        <Plus size={16} /> Add to Cart
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
