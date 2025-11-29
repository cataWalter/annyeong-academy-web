"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useCart } from '@/context/CartContext'
import { ShoppingBag, Plus, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function RelatedProducts({ currentCourseId }) {
  const [products, setProducts] = useState([])
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchRelated = async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .neq('id', currentCourseId)
        .in('type', ['ebook', 'merch'])
        .limit(2)
      setProducts(data || [])
    }
    fetchRelated()
  }, [currentCourseId])

  if (products.length === 0) return null

  return (
    <div className="mt-12 animate-fade-in">
      <h3 className="text-xl font-bold text-brand-dark mb-6 flex items-center gap-2">
        <ShoppingBag className="text-brand-purple"/> Recommended Materials
      </h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition">
            <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              <img src={product.image_url || 'https://placehold.co/100'} alt={product.title} className="w-full h-full object-cover"/>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-800 line-clamp-1">{product.title}</h4>
              <p className="text-sm text-brand-purple font-bold">{product.price}</p>
            </div>
            <button 
              onClick={() => addToCart(product)}
              className="bg-gray-900 text-white p-2 rounded-lg hover:bg-gray-700 transition"
              title="Add to Cart"
            >
              <Plus size={20}/>
            </button>
          </div>
        ))}
      </div>
      
      <div className="text-right mt-4">
        <Link href="/store" className="text-sm font-bold text-brand-blue hover:underline inline-flex items-center gap-1">
          Visit Store <ArrowRight size={14}/>
        </Link>
      </div>
    </div>
  )
}
