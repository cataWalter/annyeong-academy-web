"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { Loader2, Heart, Trash2, ShoppingCart } from 'lucide-react'

export default function Wishlist() {
  const { user } = useAuth()
  const { addToCart } = useCart()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(user) fetchWishlist()
  }, [user])

  const fetchWishlist = async () => {
    try {
      const { data } = await supabase.from('wishlist').select('product_id, products(*)').eq('user_id', user.id)
      setItems(data?.map(i => i.products) || [])
    } catch (e) { console.error(e) } 
    finally { setLoading(false) }
  }

  const removeWishlist = async (productId) => {
    await supabase.from('wishlist').delete().eq('user_id', user.id).eq('product_id', productId)
    setItems(prev => prev.filter(i => i.id !== productId))
  }

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-brand-purple"/></div>

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <h1 className="text-3xl font-bold text-brand-dark mb-2 flex items-center gap-3"><Heart className="text-red-500" fill="currentColor"/> My Wishlist</h1>
      <p className="text-gray-500 mb-8">Save items for later.</p>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
          <p className="text-gray-400">Your wishlist is empty.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {items.map(item => (
            <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <div className="flex gap-4 mb-4">
                <img src={item.image_url || 'https://placehold.co/100'} className="w-20 h-20 rounded-xl object-cover bg-gray-100"/>
                <div>
                  <h3 className="font-bold text-gray-800">{item.title}</h3>
                  <p className="text-xs text-gray-500 uppercase mt-1">{item.type}</p>
                  <p className="text-brand-purple font-bold text-lg mt-2">{item.price}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => addToCart(item)} className="flex-1 bg-brand-dark text-white py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-800">
                  <ShoppingCart size={16}/> Add to Cart
                </button>
                <button onClick={() => removeWishlist(item.id)} className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100">
                  <Trash2 size={18}/>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
