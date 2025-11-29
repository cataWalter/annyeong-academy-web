"use client";
import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { Loader2, Trash2, Edit, Plus, Image } from 'lucide-react'
import MarkdownToolbar from '@/components/ui/MarkdownToolbar'

export default function BlogManager() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [formData, setFormData] = useState({ title: '', content: '', excerpt: '', image_url: '', tags: '' })
  const contentRef = useRef(null)

  useEffect(() => { fetchPosts() }, [])

  const fetchPosts = async () => {
    const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false })
    setPosts(data || [])
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const slug = formData.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
    const tagsArray = formData.tags.split(',').map(t => t.trim())
    
    const payload = { ...formData, slug, tags: tagsArray, published: true }
    
    if (editing) {
      await supabase.from('posts').update(payload).eq('id', editing.id)
    } else {
      await supabase.from('posts').insert([payload])
    }
    
    setEditing(null)
    setFormData({ title: '', content: '', excerpt: '', image_url: '', tags: '' })
    fetchPosts()
  }

  const handleEdit = (post) => {
    setEditing(post)
    setFormData({ 
      title: post.title, 
      content: post.content, 
      excerpt: post.excerpt || '', 
      image_url: post.image_url || '',
      tags: post.tags ? post.tags.join(', ') : '' 
    })
  }

  const handleDelete = async (id) => {
    if(!confirm("Delete post?")) return
    await supabase.from('posts').delete().eq('id', id)
    fetchPosts()
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit sticky top-24">
        <h3 className="font-bold text-lg mb-4">{editing ? 'Edit Post' : 'New Blog Post'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input required placeholder="Title" className="input-field" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          <input placeholder="Image URL" className="input-field" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} />
          <input placeholder="Tags (comma separated)" className="input-field" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} />
          <textarea placeholder="Short Excerpt" className="input-field h-20" value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} />
          
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <MarkdownToolbar textareaRef={contentRef} value={formData.content} setValue={(val) => setFormData({...formData, content: val})} />
            <textarea 
              ref={contentRef}
              required 
              placeholder="Content (Markdown supported)..." 
              className="w-full p-3 h-64 font-mono text-sm outline-none resize-none bg-white"
              value={formData.content} 
              onChange={e => setFormData({...formData, content: e.target.value})} 
            />
          </div>
          
          <div className="flex gap-2">
            <button type="submit" disabled={loading} className="btn btn-plum-gradient w-full py-2">{loading ? 'Saving...' : 'Save Post'}</button>
            {editing && <button type="button" onClick={() => {setEditing(null); setFormData({ title: '', content: '', excerpt: '', image_url: '', tags: '' })}} className="px-4 py-2 bg-gray-100 rounded-lg text-gray-600">Cancel</button>}
          </div>
        </form>
      </div>

      <div className="lg:col-span-2 space-y-4">
        {posts.map(post => (
          <div key={post.id} className="bg-white p-4 rounded-xl border border-gray-100 flex gap-4 items-start">
            <img src={post.image_url || 'https://placehold.co/100'} className="w-20 h-20 object-cover rounded-lg bg-gray-100" />
            <div className="flex-1">
              <h4 className="font-bold text-gray-800">{post.title}</h4>
              <p className="text-xs text-gray-500 line-clamp-2">{post.excerpt}</p>
              <div className="flex gap-2 mt-2">
                {post.tags?.map(t => <span key={t} className="text-[10px] bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full">{t}</span>)}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={() => handleEdit(post)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit size={18}/></button>
              <button onClick={() => handleDelete(post.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18}/></button>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .input-field { width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 0.5rem; outline: none; font-size: 0.9rem; transition: all 0.2s; }
        .input-field:focus { border-color: #6a11cb; ring: 2px solid #6a11cb33; }
      `}</style>
    </div>
  )
}
