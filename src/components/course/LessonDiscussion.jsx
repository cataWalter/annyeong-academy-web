"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import { Loader2, Send, MessageSquare } from 'lucide-react'

export default function LessonDiscussion({ lessonId }) {
  const { user } = useAuth()
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (lessonId) fetchComments()
  }, [lessonId])

  const fetchComments = async () => {
    const { data } = await supabase.from('lesson_discussions')
      .select('*, profiles(full_name, avatar_url)')
      .eq('lesson_id', lessonId)
      .order('created_at', { ascending: false })
    setComments(data || [])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return
    setSubmitting(true)
    await supabase.from('lesson_discussions').insert([{ lesson_id: lessonId, user_id: user.id, content: newComment }])
    setNewComment('')
    setSubmitting(false)
    fetchComments()
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 mt-8">
      <h3 className="font-bold text-lg text-brand-dark mb-6 flex items-center gap-2"><MessageSquare size={20}/> Class Discussion</h3>
      
      <form onSubmit={handleSubmit} className="flex gap-4 mb-8">
        <input 
          className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-purple"
          placeholder="Ask a question..."
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
        />
        <button disabled={submitting} className="bg-brand-purple text-white p-3 rounded-xl hover:bg-brand-dark transition disabled:opacity-50">
          {submitting ? <Loader2 className="animate-spin"/> : <Send size={20}/>}
        </button>
      </form>

      <div className="space-y-6">
        {comments.length === 0 && <p className="text-gray-400 text-center text-sm">No questions yet. Be the first!</p>}
        {comments.map(c => (
          <div key={c.id} className="flex gap-4">
            <img src={c.profiles?.avatar_url || 'https://placehold.co/50'} className="w-10 h-10 rounded-full object-cover bg-gray-200"/>
            <div>
              <div className="flex items-baseline gap-2">
                <p className="font-bold text-sm text-gray-800">{c.profiles?.full_name || 'Student'}</p>
                <span className="text-xs text-gray-400">{new Date(c.created_at).toLocaleDateString()}</span>
              </div>
              <p className="text-gray-600 text-sm mt-1">{c.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
