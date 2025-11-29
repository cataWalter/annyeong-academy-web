"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Search, X, Loader2, BookOpen, User, FileText } from 'lucide-react'
import Link from 'next/link'

export default function GlobalSearch({ onClose }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState({ courses: [], tutors: [], posts: [] })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length > 2) performSearch()
    }, 500)
    return () => clearTimeout(delayDebounce)
  }, [query])

  const performSearch = async () => {
    setLoading(true)
    const { data: c } = await supabase.from('products').select('*').eq('type', 'course').ilike('title', `%${query}%`).limit(3)
    const { data: t } = await supabase.from('tutors').select('*').ilike('name', `%${query}%`).limit(3)
    const { data: p } = await supabase.from('posts').select('*').ilike('title', `%${query}%`).limit(3)
    
    setResults({ courses: c || [], tutors: t || [], posts: p || [] })
    setLoading(false)
  }

  const hasResults = results.courses.length > 0 || results.tutors.length > 0 || results.posts.length > 0

  return (
    <div className="fixed inset-0 bg-brand-dark/80 backdrop-blur-sm z-[100] flex items-start justify-center pt-20 animate-fade-in p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden relative">
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
          <Search className="text-gray-400" size={24}/>
          <input 
            autoFocus
            className="flex-1 text-lg outline-none placeholder-gray-400"
            placeholder="Search for courses, tutors, or articles..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"><X size={16}/></button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto bg-gray-50/50 p-4">
          {loading ? (
            <div className="flex justify-center py-8"><Loader2 className="animate-spin text-brand-purple"/></div>
          ) : query.length < 3 ? (
            <p className="text-center text-gray-400 py-8 text-sm">Type at least 3 characters to search.</p>
          ) : !hasResults ? (
            <p className="text-center text-gray-400 py-8 text-sm">No results found for "{query}".</p>
          ) : (
            <div className="space-y-6">
              {results.courses.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-2 ml-2">Courses</h4>
                  <div className="space-y-2">
                    {results.courses.map(item => (
                      <Link onClick={onClose} href={`/corsi/${item.id}`} key={item.id} className="flex items-center gap-3 p-3 bg-white rounded-xl hover:bg-purple-50 transition border border-gray-100 hover:border-purple-100 group">
                        <div className="bg-purple-100 p-2 rounded-lg text-brand-purple group-hover:bg-purple-200"><BookOpen size={18}/></div>
                        <span className="font-bold text-gray-700">{item.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {results.tutors.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-2 ml-2">Tutors</h4>
                  <div className="space-y-2">
                    {results.tutors.map(item => (
                      <Link onClick={onClose} href={`/tutors/${item.id}`} key={item.id} className="flex items-center gap-3 p-3 bg-white rounded-xl hover:bg-blue-50 transition border border-gray-100 hover:border-blue-100 group">
                        <img src={item.image_url} className="w-8 h-8 rounded-full object-cover"/>
                        <span className="font-bold text-gray-700">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {results.posts.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-2 ml-2">Blog Posts</h4>
                  <div className="space-y-2">
                    {results.posts.map(item => (
                      <Link onClick={onClose} href={`/blog/${item.slug}`} key={item.id} className="flex items-center gap-3 p-3 bg-white rounded-xl hover:bg-orange-50 transition border border-gray-100 hover:border-orange-100 group">
                        <div className="bg-orange-100 p-2 rounded-lg text-orange-600 group-hover:bg-orange-200"><FileText size={18}/></div>
                        <span className="font-bold text-gray-700">{item.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="p-3 bg-gray-100 text-center text-xs text-gray-500 border-t border-gray-200">
          Press <kbd className="bg-white px-1 py-0.5 rounded border border-gray-300 font-mono">Esc</kbd> to close
        </div>
      </div>
    </div>
  )
}
