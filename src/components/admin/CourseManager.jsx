"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Loader2, Trash2, Edit, Video, HelpCircle, Plus, Calendar, Folder } from 'lucide-react'
import SnippetHelper from './SnippetHelper'

export default function CourseManager() {
  const [courses, setCourses] = useState([])
  const [lessons, setLessons] = useState([])
  const [selectedCourse, setSelectedCourse] = useState("")
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  
  const [formData, setFormData] = useState({ 
    title: '', video_url: '', description: '', quiz_data: '', type: 'video', release_date: '', module: 'General'
  })

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    setLoading(true)
    const { data: c } = await supabase.from('products').select('*').eq('type', 'course')
    setCourses(c || [])
    if (c && c.length > 0 && !selectedCourse) setSelectedCourse(c[0].id)
    if (selectedCourse) {
      const { data: l } = await supabase.from('lessons').select('*').eq('course_id', selectedCourse).order('created_at', { ascending: true })
      setLessons(l || [])
    }
    setLoading(false)
  }

  useEffect(() => { if(selectedCourse) fetchData() }, [selectedCourse])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedCourse) return alert("Select a course first")
    setLoading(true)
    
    let parsedQuiz = null
    if (formData.quiz_data) {
      try { parsedQuiz = JSON.parse(formData.quiz_data) } catch { alert("Invalid Quiz JSON"); setLoading(false); return; }
    }

    const payload = { 
      course_id: selectedCourse, 
      title: formData.title, 
      type: formData.type,
      video_url: formData.video_url, 
      description: formData.description, 
      quiz_data: parsedQuiz,
      release_date: formData.release_date || new Date().toISOString(),
      module: formData.module || 'General'
    }

    if (editing) await supabase.from('lessons').update(payload).eq('id', editing.id)
    else await supabase.from('lessons').insert([payload])

    setEditing(null)
    setFormData({ title: '', video_url: '', description: '', quiz_data: '', type: 'video', release_date: '', module: 'General' })
    fetchData()
  }

  const handleEdit = (lesson) => {
    setEditing(lesson)
    setFormData({
      title: lesson.title, video_url: lesson.video_url || '', description: lesson.description || '',
      type: lesson.type || 'video', quiz_data: lesson.quiz_data ? JSON.stringify(lesson.quiz_data, null, 2) : '',
      release_date: lesson.release_date ? new Date(lesson.release_date).toISOString().slice(0,16) : '',
      module: lesson.module || 'General'
    })
  }

  const handleDelete = async (id) => {
    if(!confirm("Delete lesson?")) return
    await supabase.from('lessons').delete().eq('id', id)
    fetchData()
  }

  const insertSnippet = (text) => setFormData(prev => ({ ...prev, description: prev.description + text }))

  const groupedLessons = lessons.reduce((acc, lesson) => {
    const mod = lesson.module || 'General'
    if (!acc[mod]) acc[mod] = []
    acc[mod].push(lesson)
    return acc
  }, {})

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit sticky top-24">
        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-700 mb-2">Select Course</label>
          <select className="input-field" value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
            {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
          </select>
        </div>

        <h3 className="font-bold text-lg mb-4 border-t border-gray-100 pt-4">{editing ? 'Edit Lesson' : 'Add Lesson'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Module</label>
            <input list="modules" className="input-field" value={formData.module} onChange={e => setFormData({...formData, module: e.target.value})} placeholder="e.g. Introduction" />
            <datalist id="modules">{Object.keys(groupedLessons).map(m => <option key={m} value={m} />)}</datalist>
          </div>
          <input required placeholder="Lesson Title" className="input-field" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          <div className="grid grid-cols-2 gap-2">
            <select className="input-field" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}><option value="video">Video</option><option value="audio">Audio</option></select>
            <input type="datetime-local" className="input-field" value={formData.release_date} onChange={e => setFormData({...formData, release_date: e.target.value})} />
          </div>
          <input placeholder="Video/Audio URL" className="input-field" value={formData.video_url} onChange={e => setFormData({...formData, video_url: e.target.value})} />
          
          <div>
             <SnippetHelper onInsert={insertSnippet} />
             <textarea placeholder="Description / Vocabulary" className="input-field h-24" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          </div>
          
          <textarea placeholder='Quiz JSON: [{"question":"...","options":["A","B"],"correct":0}]' className="input-field h-24 font-mono text-xs" value={formData.quiz_data} onChange={e => setFormData({...formData, quiz_data: e.target.value})} />

          <div className="flex gap-2">
            <button type="submit" disabled={loading} className="btn btn-plum-gradient w-full py-2">{loading ? 'Saving...' : 'Save Lesson'}</button>
            {editing && <button type="button" onClick={() => {setEditing(null); setFormData({ title: '', video_url: '', description: '', quiz_data: '', type: 'video', release_date: '', module: 'General' })}} className="px-4 py-2 bg-gray-100 rounded-lg text-gray-600">Cancel</button>}
          </div>
        </form>
      </div>

      <div className="lg:col-span-2 space-y-6">
        {Object.entries(groupedLessons).map(([moduleName, moduleLessons]) => (
          <div key={moduleName} className="bg-white p-4 rounded-2xl border border-gray-100">
            <h4 className="font-bold text-brand-dark flex items-center gap-2 mb-4 px-2"><Folder size={18} className="text-brand-purple"/> {moduleName}</h4>
            <div className="space-y-2">
              {moduleLessons.map(l => (
                <div key={l.id} className="bg-gray-50 p-3 rounded-xl flex gap-4 items-center group hover:bg-white hover:shadow-sm transition border border-transparent hover:border-gray-100">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-brand-purple shrink-0 shadow-sm">{l.type === 'audio' ? <Plus size={16}/> : <Video size={16}/>}</div>
                  <div className="flex-1">
                    <h5 className="font-bold text-gray-700 text-sm">{l.title}</h5>
                    <div className="flex gap-2 mt-1 text-[10px]">
                      {l.quiz_data && <span className="bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded flex items-center gap-1"><HelpCircle size={8}/> Quiz</span>}
                      {l.release_date && new Date(l.release_date) > new Date() && <span className="bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded flex items-center gap-1"><Calendar size={8}/> Scheduled</span>}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => handleEdit(l)} className="p-2 text-gray-400 hover:text-blue-500"><Edit size={16}/></button>
                    <button onClick={() => handleDelete(l.id)} className="p-2 text-gray-400 hover:text-red-500"><Trash2 size={16}/></button>
                  </div>
                </div>
              ))}
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
