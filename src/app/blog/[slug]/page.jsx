"use client";
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import { Loader2, ArrowLeft, Calendar, Send, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import ShareButton from '@/components/ui/ShareButton'

export default function BlogPost() {
  const { slug } = useParams()
  const { user, profile } = useAuth()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if(slug) {
      fetchPost()
      fetchComments()
    }
  }, [slug])

  const fetchPost = async () => {
    const { data } = await supabase.from('posts').select('*').eq('slug', slug).single()
    setPost(data)
    setLoading(false)
  }

  const fetchComments = async () => {
    const { data } = await supabase.from('comments').select('*, profiles(full_name, avatar_url)').eq('post_slug', slug).order('created_at', { ascending: false })
    setComments(data || [])
  }

  const handlePostComment = async (e) => {
    e.preventDefault()
    if (!user) return alert("Please login to comment")
    if (!newComment.trim()) return
    setSubmitting(true)
    await supabase.from('comments').insert([{ post_slug: slug, user_id: user.id, content: newComment }])
    setNewComment('')
    fetchComments()
    setSubmitting(false)
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-brand-purple" /></div>
  if (!post) return <div className="min-h-screen flex items-center justify-center">Post not found</div>

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FC]">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-4">
        <article className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="h-64 md:h-96 bg-gray-200">
            <img src={post.image_url || 'https://placehold.co/800x400'} alt={post.title} className="w-full h-full object-cover" />
          </div>
          <div className="p-8 md:p-12">
            <Link href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-brand-purple text-sm mb-6 font-bold"><ArrowLeft size={16}/> Back to Blog</Link>
            <div className="flex gap-2 mb-4">
               {post.tags?.map(t => <span key={t} className="text-xs font-bold text-brand-blue bg-blue-50 px-2 py-1 rounded-md uppercase tracking-wider">{t}</span>)}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6 leading-tight">{post.title}</h1>
            <div className="flex items-center justify-between gap-4 text-sm text-gray-500 mb-8 border-b border-gray-100 pb-8">
              <span className="flex items-center gap-2"><Calendar size={16}/> {new Date(post.created_at).toLocaleDateString()}</span>
              <ShareButton title={post.title} text={post.excerpt} />
            </div>
            <div className="prose prose-lg text-gray-600 max-w-none">
              {post.content.split('\n').map((p, i) => <p key={i} className="mb-4">{p}</p>)}
            </div>
          </div>

          <div className="bg-gray-50 p-8 md:p-12 border-t border-gray-100">
            <h3 className="text-2xl font-bold text-brand-dark mb-6 flex items-center gap-2"><MessageCircle /> Comments ({comments.length})</h3>
            {user ? (
              <form onSubmit={handlePostComment} className="mb-10">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white rounded-full overflow-hidden flex-shrink-0 border border-gray-200">
                    <img src={profile?.avatar_url || `https://placehold.co/100?text=${profile?.full_name?.[0]}`} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <textarea className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-brand-purple bg-white text-sm" rows="3" placeholder="Share your thoughts..." value={newComment} onChange={e => setNewComment(e.target.value)}></textarea>
                    <button disabled={submitting} className="mt-2 bg-brand-purple text-white px-6 py-2 rounded-lg font-bold text-sm hover:opacity-90 transition flex items-center gap-2">
                      {submitting ? <Loader2 size={16} className="animate-spin"/> : <><Send size={16}/> Post Comment</>}
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="bg-white p-6 rounded-xl text-center border border-gray-200 mb-10">
                <p className="text-gray-500 mb-4">Please log in to join the conversation.</p>
                <Link href="/login" className="text-brand-purple font-bold hover:underline">Login Now</Link>
              </div>
            )}
            <div className="space-y-6">
              {comments.map(comment => (
                <div key={comment.id} className="flex gap-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                    <img src={comment.profiles?.avatar_url || `https://placehold.co/100?text=${comment.profiles?.full_name?.[0] || 'U'}`} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-gray-800 text-sm">{comment.profiles?.full_name || 'User'}</span>
                      <span className="text-xs text-gray-400">• {new Date(comment.created_at).toLocaleDateString()}</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
