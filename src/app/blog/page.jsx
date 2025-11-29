"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import { Loader2, Calendar, ChevronLeft, ChevronRight } from 'lucide-react'

export default function BlogList() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const LIMIT = 6

  useEffect(() => { fetchPosts() }, [page])

  const fetchPosts = async () => {
    setLoading(true)
    // Get count
    const { count } = await supabase.from('posts').select('*', { count: 'exact', head: true }).eq('published', true)
    setTotal(count || 0)

    // Get Data
    const from = page * LIMIT
    const to = from + LIMIT - 1
    const { data } = await supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .range(from, to)
    
    setPosts(data || [])
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FC]">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-brand-dark mb-2">Annyeong Blog ✍️</h1>
          <p className="text-gray-600 mb-12">Latest news, culture, and learning tips.</p>

          {loading ? <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-brand-purple" size={32}/></div> : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {posts.map(post => (
                  <Link href={`/blog/${post.slug}`} key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition border border-gray-100 group">
                    <div className="h-48 bg-gray-200 overflow-hidden">
                      <img src={post.image_url || 'https://placehold.co/600x400'} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    </div>
                    <div className="p-6">
                      <div className="flex gap-2 mb-3">
                        {post.tags?.map(t => <span key={t} className="text-xs font-bold text-brand-purple bg-purple-50 px-2 py-1 rounded-md">{t}</span>)}
                      </div>
                      <h2 className="text-xl font-bold text-brand-dark mb-2 group-hover:text-brand-purple transition">{post.title}</h2>
                      <p className="text-gray-500 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-50 pt-4">
                        <span className="flex items-center gap-1"><Calendar size={12}/> {new Date(post.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination Controls */}
              {total > LIMIT && (
                <div className="flex justify-center items-center gap-4">
                  <button 
                    disabled={page === 0} 
                    onClick={() => setPage(p => p - 1)} 
                    className="p-3 bg-white border border-gray-200 rounded-full hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span className="font-bold text-gray-600">Page {page + 1} of {Math.ceil(total / LIMIT)}</span>
                  <button 
                    disabled={(page + 1) * LIMIT >= total} 
                    onClick={() => setPage(p => p + 1)} 
                    className="p-3 bg-white border border-gray-200 rounded-full hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
