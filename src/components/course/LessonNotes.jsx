import { useState, useEffect, useCallback } from 'react'
import { Save, StickyNote, Loader2, Cloud, CloudOff } from 'lucide-react'
import { supabase } from '../../lib/supabase'

export default function LessonNotes({ lessonId, userId }) {
  const [note, setNote] = useState('')
  const [status, setStatus] = useState('idle') // idle | saving | saved | error
  useEffect(() => {
    fetchNote()
  }, [lessonId])

  const fetchNote = async () => {
    try {
      const { data } = await supabase
        .from('user_notes')
        .select('content')
        .eq('user_id', userId)
        .eq('lesson_id', lessonId)
        .single()
      
      if (data) setNote(data.content)
      else setNote('') // Reset if no note found for this lesson
    } catch (error) {
      // Ignore error if row doesn't exist
    }
  }

  const saveNote = async (content) => {
    setStatus('saving')
    try {
      const { error } = await supabase
        .from('user_notes')
        .upsert(
          { user_id: userId, lesson_id: lessonId, content, updated_at: new Date() },
          { onConflict: 'user_id, lesson_id' }
        )
      if (error) throw error
      setStatus('saved')
      setTimeout(() => setStatus('idle'), 2000)
    } catch (error) {
      console.error(error)
      setStatus('error')
    }
  }

  // Debounce save to avoid too many requests
  const handleChange = (e) => {
    const newContent = e.target.value
    setNote(newContent)
  }

  const handleManualSave = () => {
    saveNote(note)
  }

  return (
    <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-4 h-full flex flex-col relative">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-yellow-800 font-bold flex items-center gap-2">
          <StickyNote size={18} /> Class Notes
        </h4>
        <div className="text-xs font-medium">
          {status === 'saving' && <span className="text-yellow-600 flex items-center gap-1"><Loader2 size={12} className="animate-spin"/> Saving...</span>}
          {status === 'saved' && <span className="text-green-600 flex items-center gap-1"><Cloud size={12}/> Saved</span>}
          {status === 'error' && <span className="text-red-600 flex items-center gap-1"><CloudOff size={12}/> Error</span>}
        </div>
      </div>
      <textarea 
        className="flex-1 w-full bg-transparent border-none outline-none resize-none text-gray-700 text-sm leading-relaxed font-medium placeholder-yellow-800/30 focus:ring-0"
        placeholder="Type vocabulary, grammar rules, or questions..."
        value={note}
        onChange={handleChange}
        onBlur={handleManualSave} // Auto-save on blur
      ></textarea>
      <button 
        onClick={handleManualSave}
        className="mt-2 w-full bg-yellow-200 text-yellow-900 text-sm font-bold py-2 rounded-xl hover:bg-yellow-300 transition flex justify-center items-center gap-2"
      >
        <Save size={16} /> Save Note
      </button>
    </div>
  )
}
