"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Loader2, Star, MessageSquare } from 'lucide-react'

export default function FeedbackViewer() {
  const [feedbacks, setFeedbacks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('feedback').select('*, profiles(full_name, email)').order('created_at', { ascending: false })
      setFeedbacks(data || [])
      setLoading(false)
    }
    fetch()
  }, [])

  if (loading) return <Loader2 className="animate-spin text-brand-purple" />

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 font-bold text-gray-700 flex items-center gap-2">
        <MessageSquare size={20}/> Event Feedback ({feedbacks.length})
      </div>
      <div className="divide-y divide-gray-100">
        {feedbacks.map(item => (
          <div key={item.id} className="p-6 hover:bg-gray-50 transition">
            <div className="flex justify-between mb-2">
              <div>
                <span className="font-bold text-gray-800">{item.profiles?.full_name || 'Anonymous'}</span>
                <span className="text-xs text-gray-400 ml-2">{item.profiles?.email}</span>
              </div>
              <div className="flex text-yellow-400 text-xs">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < item.rating ? "currentColor" : "none"} />)}
              </div>
            </div>
            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">{item.comment}</p>
            <div className="mt-2 flex justify-between items-center">
               <span className="text-[10px] text-gray-400">{new Date(item.created_at).toLocaleString()}</span>
               {item.is_giveaway_entry && <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-bold">Giveaway Entrant</span>}
            </div>
          </div>
        ))}
        {feedbacks.length === 0 && <div className="p-8 text-center text-gray-400">No feedback yet.</div>}
      </div>
    </div>
  )
}
