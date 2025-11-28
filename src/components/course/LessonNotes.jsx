"use client";
import { useState, useEffect } from 'react'
import { Save, StickyNote, Loader2, Cloud, CloudOff } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useLanguage } from '@/context/LanguageContext'

export default function LessonNotes({ lessonId, userId }) {
  const { t } = useLanguage()
  const [note, setNote] = useState('')
  const [status, setStatus] = useState('idle')

  useEffect(() => { fetchNote() }, [lessonId])

  const fetchNote = async () => {
    try {
      const { data } = await supabase.from('user_notes').select('content').eq('user_id', userId).eq('lesson_id', lessonId).single()
      if (data) setNote(data.content)
      else setNote('')
    } catch (error) {}
  }

  const saveNote = async (content) => {
    setStatus('saving')
    try {
      await supabase.from('user_notes').upsert({ user_id: userId, lesson_id: lessonId, content, updated_at: new Date() }, { onConflict: 'user_id, lesson_id' })
      setStatus('saved')
      setTimeout(() => setStatus('idle'), 2000)
    } catch (error) { setStatus('error') }
  }

  const handleManualSave = () => saveNote(note)

  return (
    <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-4 h-full flex flex-col relative">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-yellow-800 font-bold flex items-center gap-2"><StickyNote size={18} /> {t('notes_title')}</h4>
        <div className="text-xs font-medium">
          {status === 'saving' && <span className="text-yellow-600 flex items-center gap-1"><Loader2 size={12} className="animate-spin"/> {t('notes_saving')}</span>}
          {status === 'saved' && <span className="text-green-600 flex items-center gap-1"><Cloud size={12}/> {t('notes_saved')}</span>}
        </div>
      </div>
      <textarea 
        className="flex-1 w-full bg-transparent border-none outline-none resize-none text-gray-700 text-sm leading-relaxed font-medium placeholder-yellow-800/30 focus:ring-0"
        placeholder={t('notes_placeholder')}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        onBlur={handleManualSave}
      ></textarea>
      <button onClick={handleManualSave} className="mt-2 w-full bg-yellow-200 text-yellow-900 text-sm font-bold py-2 rounded-xl hover:bg-yellow-300 transition flex justify-center items-center gap-2">
        <Save size={16} /> {t('notes_save')}
      </button>
    </div>
  )
}
