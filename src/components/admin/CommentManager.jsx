"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Loader2, Trash2, MessageSquare, FileText, MonitorPlay } from 'lucide-react'

export default function CommentManager() {
  const [comments, setComments] = useState([])
  const [discussions, setDiscussions] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('blog')

  useEffect(() => { fetchAll() }, [])

  const fetchAll = async () => {
    setLoading(true)
    const { data: blogComments } = await supabase.from('comments').select('*, profiles(full_name, email), posts(title)').order('created_at', { ascending: false })
    const { data: lessonChats } = await supabase.from('lesson_discussions').select('*, profiles(full_name, email), lessons(title)').order('created_at', { ascending: false })
    
    setComments(blogComments || [])
    setDiscussions(lessonChats || [])
    setLoading(false)
  }

  const handleDelete = async (table, id) => {
    if (!confirm("Permanently delete this comment?")) return
    await supabase.from(table).delete().eq('id', id)
    fetchAll()
  }

  const List = ({ data, type }) => (
    <div className="space-y-4">
      {data.length === 0 && <p className="text-gray-400 text-center py-8">No comments found.</p>}
      {data.map(item => (
        <div key={item.id} className="bg-white p-4 rounded-xl border border-gray-100 flex gap-4 hover:shadow-sm transition">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${type === 'blog' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
            {type === 'blog' ? <FileText size={18}/> : <MonitorPlay size={18}/>}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-gray-800 text-sm">{item.profiles?.full_name || 'Unknown'}</p>
                <p className="text-xs text-gray-400">{item.profiles?.email}</p>
              </div>
              <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-1 rounded">
                {new Date(item.created_at).toLocaleDateString()}
              </span>
            </div>
            
            <div className="mt-2 bg-gray-50 p-2 rounded-lg text-sm text-gray-700">
              {item.content}
            </div>
            
            <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
              On: <span className="font-bold text-gray-600">{type === 'blog' ? item.posts?.title : item.lessons?.title}</span>
            </p>
          </div>
          <button 
            onClick={() => handleDelete(type === 'blog' ? 'comments' : 'lesson_discussions', item.id)}
            className="text-gray-300 hover:text-red-500 self-center p-2"
            title="Delete Comment"
          >
            <Trash2 size={18}/>
          </button>
        </div>
      ))}
    </div>
  )

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex gap-4 border-b border-gray-200 pb-1">
        <button 
          onClick={() => setActiveTab('blog')}
          className={`pb-2 px-4 font-bold text-sm transition ${activeTab === 'blog' ? 'text-brand-purple border-b-2 border-brand-purple' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Blog Comments ({comments.length})
        </button>
        <button 
          onClick={() => setActiveTab('lesson')}
          className={`pb-2 px-4 font-bold text-sm transition ${activeTab === 'lesson' ? 'text-brand-purple border-b-2 border-brand-purple' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Lesson Discussions ({discussions.length})
        </button>
      </div>

      {loading ? <Loader2 className="animate-spin mx-auto text-brand-purple"/> : (
        activeTab === 'blog' ? <List data={comments} type="blog"/> : <List data={discussions} type="lesson"/>
      )}
    </div>
  )
}
