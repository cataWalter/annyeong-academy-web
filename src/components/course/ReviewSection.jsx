"use client";
import { useState, useEffect } from 'react'
import { Star, Loader2, Trash2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'
import { useLanguage } from '@/context/LanguageContext'

export default function ReviewSection({ productId }) {
  const { user } = useAuth()
  const { t } = useLanguage()
  const { addToast } = useToast()
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [hasReviewed, setHasReviewed] = useState(false)

  useEffect(() => { fetchReviews() }, [productId])

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase.from('reviews').select('*, profiles(full_name, avatar_url)').eq('product_id', productId).order('created_at', { ascending: false })
      if (error) throw error
      setReviews(data)
      if (user) setHasReviewed(data.some(r => r.user_id === user.id))
    } catch (error) { console.error(error) } finally { setLoading(false) }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!comment.trim()) return
    setSubmitting(true)
    try {
      const { error } = await supabase.from('reviews').insert([{ user_id: user.id, product_id: productId, rating, comment }])
      if (error) throw error
      addToast("Review submitted!", "success")
      setComment('')
      setHasReviewed(true)
      fetchReviews()
    } catch (error) { addToast(error.message, "error") } finally { setSubmitting(false) }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Delete your review?")) return
    await supabase.from('reviews').delete().eq('id', id)
    setHasReviewed(false)
    fetchReviews()
  }

  const avgRating = reviews.length ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : 0

  if (loading) return <div className="py-10"><Loader2 className="animate-spin mx-auto text-brand-purple"/></div>

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm mt-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-yellow-50 p-4 rounded-2xl text-center min-w-[100px]">
          <span className="block text-3xl font-black text-brand-dark">{avgRating}</span>
          <div className="flex justify-center text-yellow-400 text-sm">{[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < Math.round(avgRating) ? "currentColor" : "none"} />)}</div>
          <span className="text-xs text-gray-400 font-bold mt-1">{reviews.length} Reviews</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-brand-dark">{t('review_title')}</h3>
          <p className="text-gray-500">{t('review_subtitle')}</p>
        </div>
      </div>

      {!hasReviewed && user && (
        <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h4 className="font-bold text-gray-700 mb-4">{t('review_write')}</h4>
          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4, 5].map(star => (
              <button type="button" key={star} onClick={() => setRating(star)} className="focus:outline-none transition transform hover:scale-110">
                <Star size={24} className={star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
              </button>
            ))}
          </div>
          <textarea 
            className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-brand-purple text-sm"
            placeholder={t('review_placeholder')} rows="3" value={comment} onChange={e => setComment(e.target.value)}
          />
          <button disabled={submitting} className="mt-3 bg-brand-purple text-white px-6 py-2 rounded-lg font-bold text-sm hover:opacity-90 transition">
            {submitting ? <Loader2 className="animate-spin" /> : t('review_submit')}
          </button>
        </form>
      )}

      <div className="space-y-6">
        {reviews.length === 0 && <p className="text-gray-400 text-center italic">{t('review_no_reviews')}</p>}
        {reviews.map(review => (
          <div key={review.id} className="border-b border-gray-50 pb-6 last:border-0 last:pb-0">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-3">
                <img src={review.profiles?.avatar_url || 'https://placehold.co/50'} className="w-10 h-10 rounded-full object-cover bg-gray-200" />
                <div>
                  <p className="font-bold text-gray-800 text-sm">{review.profiles?.full_name || 'Student'}</p>
                  <div className="flex text-yellow-400 text-xs">{[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < review.rating ? "currentColor" : "none"} />)}</div>
                </div>
              </div>
              {user?.id === review.user_id && <button onClick={() => handleDelete(review.id)} className="text-gray-300 hover:text-red-500 transition"><Trash2 size={16}/></button>}
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mt-2">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
