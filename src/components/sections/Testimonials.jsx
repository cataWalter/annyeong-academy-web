"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Section from '../ui/Section'
import { Quote, Star, Loader2 } from 'lucide-react'

export default function Testimonials() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      const { data } = await supabase
        .from('reviews')
        .select('*, profiles(full_name, avatar_url), products(title)')
        .eq('rating', 5)
        .limit(3)
        .order('created_at', { ascending: false })
      
      setReviews(data || [])
      setLoading(false)
    }
    fetchReviews()
  }, [])

  const fallbackReviews = [
    {
      id: 'static-1',
      comment: "Finally, I don't need to be fluent in English to learn Korean! This technology is incredible.",
      profiles: { full_name: 'Susie', avatar_url: '' },
      products: { title: 'Korean Foundation' }
    },
    {
      id: 'static-2',
      comment: "I love that the teacher connects live from Seoul. It feels like I'm actually there.",
      profiles: { full_name: 'Esther', avatar_url: '' },
      products: { title: 'Live K-Pop Class' }
    }
  ]

  const displayReviews = reviews.length > 0 ? reviews : fallbackReviews

  return (
    <Section className="bg-[#F8F9FC]">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-brand-dark">Student Stories</h2>
        <p className="text-gray-500 mt-2">Hear from our community.</p>
      </div>
      
      {loading ? (
        <div className="flex justify-center"><Loader2 className="animate-spin text-brand-purple"/></div>
      ) : (
        <div className="flex flex-wrap justify-center gap-8">
          {displayReviews.map((review, idx) => (
            <div key={review.id} className="bg-white p-8 rounded-2xl shadow-lg max-w-md flex-1 min-w-[300px] relative border border-gray-100 transform hover:-translate-y-1 transition duration-300">
              <Quote className={`w-10 h-10 absolute top-6 left-6 opacity-20 ${idx % 2 === 0 ? 'text-brand-purple' : 'text-brand-blue'}`} />
              
              <div className="relative z-10 pt-4">
                <p className="text-gray-700 italic mb-6 text-lg leading-relaxed">"{review.comment}"</p>
                
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold overflow-hidden ${idx % 2 === 0 ? 'bg-brand-purple' : 'bg-brand-blue'}`}>
                    {review.profiles?.avatar_url ? (
                      <img src={review.profiles.avatar_url} className="w-full h-full object-cover"/>
                    ) : (
                      review.profiles?.full_name?.[0] || 'S'
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-brand-dark">{review.profiles?.full_name || 'Student'}</p>
                    <p className="text-xs text-gray-500">{review.products?.title || 'Course Student'}</p>
                  </div>
                  <div className="ml-auto flex text-yellow-400">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Section>
  )
}
