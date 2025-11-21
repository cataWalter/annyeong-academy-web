import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { ShoppingBag, Loader2 } from 'lucide-react'
import { initiateCheckout } from '../../lib/payment'

export default function Store() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('type', 'ebook')
      
      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-brand-purple" /></div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-dark mb-2">Digital Store</h1>
      <p className="text-gray-500 mb-8">Ebook, Planner e Risorse scaricabili.</p>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition group">
            <div className="h-64 overflow-hidden relative bg-gray-100 flex items-center justify-center">
              <img 
                src={product.image_url || 'https://placehold.co/400x500/2575fc/ffffff?text=Ebook'} 
                alt={product.title} 
                className="h-full object-cover group-hover:scale-105 transition duration-500" 
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-brand-purple">
                EBOOK
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-brand-dark mb-2">{product.title}</h3>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.description}</p>
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                <span className="text-xl font-bold text-brand-purple">{product.price} Ft</span>
                <button 
                  onClick={() => initiateCheckout(product.id, product.title)}
                  className="flex items-center gap-2 bg-brand-dark text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition"
                >
                  <ShoppingBag size={16} /> Acquista
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
