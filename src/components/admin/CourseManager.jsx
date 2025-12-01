"use client";
import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { Loader2, Trash2, Edit, Video, HelpCircle, Plus, Folder, GripVertical, Save } from 'lucide-react'
import SnippetHelper from './SnippetHelper'
import FileUploader from './FileUploader'

export default function CourseManager() {
  const [courses, setCourses] = useState([])
  const [lessons, setLessons] = useState([])
  const [selectedCourse, setSelectedCourse] = useState("")
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  
  // Drag & Drop State
  const dragItem = useRef(null)
  const dragOverItem = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [moduleGroups, setModuleGroups] = useState({})

  const [formData, setFormData] = useState({ 
    title: '', video_url: '', description: '', quiz_data: '', type: 'video', release_date: '', module: 'General', pdf_url: ''
  })

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    setLoading(true)
    const { data: c } = await supabase.from('products').select('*').eq('type', 'course')
    setCourses(c || [])
    if (c && c.length > 0 && !selectedCourse) setSelectedCourse(c[0].id)
    if (selectedCourse) {
      const { data: l } = await supabase.from('lessons').select('*').eq('course_id', selectedCourse).order('position', { ascending: true })
      setLessons(l || [])
    }
    setLoading(false)
  }

  useEffect(() => { if(selectedCourse) fetchData() }, [selectedCourse])

  // GROUPING LOGIC
  useEffect(() => {
    const grouped = lessons.reduce((acc, lesson) => {
      const mod = lesson.module || 'General'
      if (!acc[mod]) acc[mod] = []
      acc[mod].push(lesson)
      return acc
    }, {})
    setModuleGroups(grouped)
  }, [lessons])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedCourse) return alert("Select a course first")
    setLoading(true)
    
    let parsedQuiz = null
    if (formData.quiz_data) {
      try { parsedQuiz = JSON.parse(formData.quiz_data) } catch { alert("Invalid Quiz JSON"); setLoading(false); return; }
    }

    // Determine position: End of list
    const position = lessons.length

    const payload = { 
      course_id: selectedCourse, 
      title: formData.title, 
      type: formData.type,
      video_url: formData.video_url,
      pdf_url: formData.pdf_url,
      description: formData.description, 
      quiz_data: parsedQuiz,
      release_date: formData.release_date || new Date().toISOString(),
      module: formData.module || 'General',
      position: editing ? editing.position : position
    }

    if (editing) await supabase.from('lessons').update(payload).eq('id', editing.id)
    else await supabase.from('lessons').insert([payload])

    setEditing(null)
    setFormData({ title: '', video_url: '', pdf_url: '', description: '', quiz_data: '', type: 'video', release_date: '', module: 'General' })
    fetchData()
  }

  const handleEdit = (lesson) => {
    setEditing(lesson)
    setFormData({
      title: lesson.title, 
      video_url: lesson.video_url || '', 
      pdf_url: lesson.pdf_url || '',
      description: lesson.description || '',
      type: lesson.type || 'video', 
      quiz_data: lesson.quiz_data ? JSON.stringify(lesson.quiz_data, null, 2) : '',
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
  const insertQuizTemplate = (json) => setFormData(prev => ({ ...prev, quiz_data: json }))

  // DRAG AND DROP HANDLERS
  const onDragStart = (e, index, moduleName) => {
    dragItem.current = { index, module: moduleName }
    setIsDragging(true)
  }

  const onDragEnter = (e, index, moduleName) => {
    dragOverItem.current = { index, module: moduleName }
  }

  const onDragEnd = async () => {
    if (!dragItem.current || !dragOverItem.current) {
        setIsDragging(false)
        return
    }

    const srcMod = dragItem.current.module
    const destMod = dragOverItem.current.module
    
    // Convert Grouped structure to Flat List, perform swap, then re-group.
    const newGroups = { ...moduleGroups }
    newGroups[srcMod] = [...newGroups[srcMod]] // Copy
    const itemToMove = newGroups[srcMod].splice(dragItem.current.index, 1)[0] // Remove
    
    // Update module if changed
    if (srcMod !== destMod) {
        itemToMove.module = destMod
    }
    
    if(!newGroups[destMod]) newGroups[destMod] = []
    const targetGroup = srcMod === destMod ? newGroups[srcMod] : [...newGroups[destMod]]
    
    if(srcMod !== destMod) newGroups[destMod] = targetGroup
    
    targetGroup.splice(dragOverItem.current.index, 0, itemToMove)
    
    setModuleGroups(newGroups)
    setIsDragging(false)
    dragItem.current = null
    dragOverItem.current = null
  }

  const saveOrder = async () => {
    setLoading(true)
    // Flatten groups to array with updated indices
    let flatList = []
    Object.keys(moduleGroups).forEach(mod => {
        const items = moduleGroups[mod]
        items.forEach((item, idx) => {
            flatList.push({ ...item, module: mod, position: flatList.length })
        })
    })

    // Batch update
    const updates = flatList.map(l => ({
        id: l.id,
        course_id: l.course_id,
        title: l.title,
        module: l.module,
        position: l.position
    }))

    const { error } = await supabase.from('lessons').upsert(updates, { onConflict: 'id' })
    if(error) alert("Error saving order: " + error.message)
    else alert("Order saved!")
    
    fetchData() // Refresh
  }

  const interactiveQuizExample = JSON.stringify([
    {
      "timestamp": 10,
      "question": "What phrase was just used?",
      "options": ["Hello", "Goodbye"],
      "correct": 0
    }
  ], null, 2);

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
            <datalist id="modules">{Object.keys(moduleGroups).map(m => <option key={m} value={m} />)}</datalist>
          </div>
          <input required placeholder="Lesson Title" className="input-field" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          <div className="grid grid-cols-2 gap-2">
            <select className="input-field" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}><option value="video">Video</option><option value="audio">Audio</option></select>
            <input type="datetime-local" className="input-field" value={formData.release_date} onChange={e => setFormData({...formData, release_date: e.target.value})} />
          </div>
          
          <FileUploader 
            bucket="course-materials" 
            label="Lesson Media (Video/Audio)" 
            accept="video/*,audio/*"
            value={formData.video_url} 
            onUpload={(url) => setFormData({...formData, video_url: url})} 
          />

          <FileUploader 
            bucket="course-materials" 
            label="PDF Handout (Optional)" 
            accept="application/pdf"
            value={formData.pdf_url} 
            onUpload={(url) => setFormData({...formData, pdf_url: url})} 
          />
          
          <div>
             <SnippetHelper onInsert={insertSnippet} onInsertQuiz={insertQuizTemplate} />
             <div className="flex gap-2 mb-2">
                <button type="button" onClick={() => insertQuizTemplate(interactiveQuizExample)} className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full border border-orange-200 hover:bg-orange-200">
                    + Interactive Video Quiz
                </button>
             </div>
             <textarea placeholder="Description / Vocabulary" className="input-field h-24" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          </div>
          
          <textarea placeholder='Quiz JSON' className="input-field h-24 font-mono text-xs" value={formData.quiz_data} onChange={e => setFormData({...formData, quiz_data: e.target.value})} />

          <div className="flex gap-2">
            <button type="submit" disabled={loading} className="btn btn-plum-gradient w-full py-2">{loading ? 'Saving...' : 'Save Lesson'}</button>
            {editing && <button type="button" onClick={() => {setEditing(null); setFormData({ title: '', video_url: '', pdf_url: '', description: '', quiz_data: '', type: 'video', release_date: '', module: 'General' })}} className="px-4 py-2 bg-gray-100 rounded-lg text-gray-600">Cancel</button>}
          </div>
        </form>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-brand-dark">Curriculum Builder</h2>
            <button onClick={saveOrder} disabled={loading} className="btn bg-green-600 hover:bg-green-700 px-4 py-2 text-sm flex items-center gap-2 shadow-sm">
               {loading ? <Loader2 className="animate-spin" size={16}/> : <Save size={16}/>} Save Order
            </button>
        </div>

        {Object.entries(moduleGroups).map(([moduleName, moduleLessons]) => (
          <div key={moduleName} className="bg-white p-4 rounded-2xl border border-gray-100">
            <h4 className="font-bold text-brand-dark flex items-center gap-2 mb-4 px-2 bg-gray-50 p-2 rounded-lg"><Folder size={18} className="text-brand-purple"/> {moduleName}</h4>
            <div className="space-y-2">
              {moduleLessons.map((l, index) => (
                <div 
                    key={l.id} 
                    draggable
                    onDragStart={(e) => onDragStart(e, index, moduleName)}
                    onDragEnter={(e) => onDragEnter(e, index, moduleName)}
                    onDragEnd={onDragEnd}
                    onDragOver={(e) => e.preventDefault()}
                    className="bg-white p-3 rounded-xl flex gap-4 items-center group hover:shadow-md transition border border-gray-200 cursor-move active:bg-purple-50 active:border-brand-purple"
                >
                  <GripVertical size={20} className="text-gray-300"/>
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-brand-purple shrink-0 shadow-sm">{l.type === 'audio' ? <Plus size={16}/> : <Video size={16}/>}</div>
                  <div className="flex-1">
                    <h5 className="font-bold text-gray-700 text-sm">{l.title}</h5>
                    <div className="flex gap-2 mt-1 text-[10px]">
                      {l.quiz_data && <span className="bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded flex items-center gap-1"><HelpCircle size={8}/> Quiz</span>}
                      {l.pdf_url && <span className="bg-green-100 text-green-600 px-1.5 py-0.5 rounded flex items-center gap-1">PDF</span>}
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
