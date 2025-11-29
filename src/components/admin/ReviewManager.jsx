"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Loader2, Trash2, Star, MessageSquare } from 'lucide-react'

export default function ReviewManager() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchReviews() }, [])

  const fetchReviews = async () => {
    const { data } = await supabase.from('reviews').select('*, profiles(full_name, email), products(title)').order('created_at', { ascending: false })
    setReviews(data || [])
    setLoading(false)
  }

  const handleDelete = async (id) => {
    if(!confirm("Delete this review?")) return
    await supabase.from('reviews').delete().eq('id', id)
    fetchReviews()
  }

  if (loading) return <Loader2 className="animate-spin text-brand-purple" />

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 font-bold text-gray-700 flex items-center gap-2">
        <MessageSquare size={20}/> All Reviews ({reviews.length})
      </div>
      <div className="divide-y divide-gray-100">
        {reviews.map(review => (
          <div key={review.id} className="p-6 hover:bg-gray-50 transition flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-gray-800">{review.profiles?.full_name || 'Anonymous'}</span>
                <span className="text-xs text-gray-400">on {review.products?.title}</span>
              </div>
              <div className="flex text-yellow-400 text-xs mb-2">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} />)}
              </div>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">{review.comment}</p>
            </div>
            <div className="flex items-center">
              <button onClick={() => handleDelete(review.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg flex items-center gap-2 text-sm font-bold">
                <Trash2 size={16}/> Delete
              </button>
            </div>
          </div>
        ))}
        {reviews.length === 0 && <div className="p-8 text-center text-gray-400">No reviews yet.</div>}
      </div>
    </div>
  )
}
