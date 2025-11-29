"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import { Loader2, StickyNote, BookOpen, Trash2, Edit, Save, X } from 'lucide-react'
import Link from 'next/link'

export default function Notebook() {
  const { user } = useAuth()
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [editContent, setEditContent] = useState('')

  useEffect(() => {
    if (user) fetchNotes()
  }, [user])

  const fetchNotes = async () => {
    try {
      const { data } = await supabase.from('user_notes').select('*, lessons(title, course_id, products(title))').eq('user_id', user.id).order('updated_at', { ascending: false })
      setNotes(data || [])
    } catch (e) { console.error(e) } 
    finally { setLoading(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm("Delete note?")) return
    await supabase.from('user_notes').delete().eq('id', id)
    setNotes(prev => prev.filter(n => n.id !== id))
  }

  const startEdit = (note) => {
    setEditingId(note.id)
    setEditContent(note.content)
  }

  const saveEdit = async (id) => {
    await supabase.from('user_notes').update({ content: editContent, updated_at: new Date() }).eq('id', id)
    setNotes(prev => prev.map(n => n.id === id ? { ...n, content: editContent, updated_at: new Date().toISOString() } : n))
    setEditingId(null)
  }

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-brand-purple"/></div>

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <h1 className="text-3xl font-bold text-brand-dark mb-2 flex items-center gap-3"><StickyNote className="text-yellow-500"/> My Notebook</h1>
      <p className="text-gray-500 mb-8">All your class notes in one place.</p>

      {notes.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
          <p className="text-gray-400">No notes found. Take notes during lessons!</p>
          <Link href="/corsi" className="btn btn-plum-gradient px-6 py-2 mt-4 text-sm">Go to Courses</Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {notes.map(note => (
            <div key={note.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="flex justify-between items-start mb-4 border-b border-gray-50 pb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-50 p-2 rounded-lg text-brand-purple"><BookOpen size={18}/></div>
                  <div>
                    <h3 className="font-bold text-gray-800">{note.lessons?.title}</h3>
                    <p className="text-xs text-gray-500">{note.lessons?.products?.title}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 mr-2">{new Date(note.updated_at).toLocaleDateString()}</span>
                  {editingId === note.id ? (
                    <>
                      <button onClick={() => saveEdit(note.id)} className="text-green-600 hover:bg-green-50 p-2 rounded"><Save size={16}/></button>
                      <button onClick={() => setEditingId(null)} className="text-gray-400 hover:bg-gray-100 p-2 rounded"><X size={16}/></button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEdit(note)} className="text-blue-500 hover:bg-blue-50 p-2 rounded"><Edit size={16}/></button>
                      <button onClick={() => handleDelete(note.id)} className="text-gray-300 hover:text-red-500 p-2 rounded"><Trash2 size={16}/></button>
                    </>
                  )}
                </div>
              </div>
              
              {editingId === note.id ? (
                <textarea 
                  className="w-full p-3 border border-yellow-200 bg-yellow-50 rounded-xl outline-none focus:ring-2 focus:ring-yellow-300 font-handwriting" 
                  rows="4"
                  value={editContent}
                  onChange={e => setEditContent(e.target.value)}
                />
              ) : (
                <div className="bg-yellow-50 p-4 rounded-xl text-gray-700 text-sm whitespace-pre-wrap font-medium leading-relaxed font-handwriting">
                  {note.content}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
