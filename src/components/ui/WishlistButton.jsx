"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Heart, Loader2 } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'

export default function WishlistButton({ productId }) {
  const { user } = useAuth()
  const { addToast } = useToast()
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user && productId) checkStatus()
  }, [user, productId])

  const checkStatus = async () => {
    const { data } = await supabase.from('wishlist').select('product_id').eq('user_id', user.id).eq('product_id', productId).single()
    if (data) setIsWishlisted(true)
  }

  const toggleWishlist = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!user) return addToast("Please login to save items", "info")
    
    setLoading(true)
    if (isWishlisted) {
      await supabase.from('wishlist').delete().eq('user_id', user.id).eq('product_id', productId)
      setIsWishlisted(false)
      addToast("Removed from wishlist", "info")
    } else {
      await supabase.from('wishlist').insert([{ user_id: user.id, product_id: productId }])
      setIsWishlisted(true)
      addToast("Added to wishlist!", "success")
    }
    setLoading(false)
  }

  return (
    <button 
      onClick={toggleWishlist}
      disabled={loading}
      className={`p-2 rounded-full transition shadow-sm ${isWishlisted ? 'bg-red-50 text-red-500' : 'bg-white text-gray-400 hover:text-red-500'}`}
    >
      {loading ? <Loader2 size={18} className="animate-spin"/> : <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />}
    </button>
  )
}
