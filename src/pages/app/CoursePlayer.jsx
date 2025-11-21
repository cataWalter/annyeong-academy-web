import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { PlayCircle, FileDown, CheckCircle, Lock, ExternalLink, Loader2, AlertCircle } from 'lucide-react'

export default function CoursePlayer() {
  const { id } = useParams() // Questo è il course_id
  const [loading, setLoading] = useState(true)
  const [lessons, setLessons] = useState([])
  const [activeLessonIndex, setActiveLessonIndex] = useState(0)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchLessons()
  }, [id])

  const fetchLessons = async () => {
    try {
      setLoading(true)
      // Scarica le lezioni dal DB per questo corso
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('course_id', id)
        .order('created_at', { ascending: true })

      if (error) throw error
      setLessons(data || [])
    } catch (err) {
      console.error(err)
      setError('Impossibile caricare le lezioni.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="h-64 flex items-center justify-center"><Loader2 className="animate-spin text-brand-purple" size={40} /></div>
  
  if (error || lessons.length === 0) return (
    <div className="text-center py-20">
      <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-gray-600">Nessuna lezione trovata</h3>
      <p className="text-gray-500">L'insegnante non ha ancora caricato contenuti per questo corso (ID: {id}).</p>
      <p className="text-xs text-gray-400 mt-4">Suggerimento: Vai in Admin Dashboard e carica una lezione assegnandola all'ID {id}.</p>
    </div>
  )

  const activeLesson = lessons[activeLessonIndex]

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-100px)]">
      
      {/* Video Player Area */}
      <div className="flex-1 flex flex-col">
        <div className="bg-black rounded-2xl overflow-hidden aspect-video flex items-center justify-center relative shadow-lg">
          {activeLesson.video_url ? (
             <iframe 
               src={activeLesson.video_url.replace('watch?v=', 'embed/')} 
               className="w-full h-full" 
               allowFullScreen 
               title={activeLesson.title}
             />
          ) : (
            <div className="text-white text-center">
              <PlayCircle className="w-20 h-20 mx-auto opacity-50" />
              <p className="mt-4">Seleziona una lezione</p>
            </div>
          )}
        </div>
        
        <div className="mt-6 bg-white p-6 rounded-2xl border border-gray-100 flex-1 overflow-y-auto">
          <div className="flex flex-wrap justify-between items-start mb-4 gap-4">
            <h1 className="text-2xl font-bold text-brand-dark">
              {activeLesson.title}
            </h1>
            <div className="flex gap-2">
              {activeLesson.pdf_url && (
                <a 
                  href={activeLesson.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-brand-purple font-bold bg-purple-50 px-4 py-2 rounded-lg hover:bg-purple-100 transition"
                >
                  <FileDown size={18} /> Scarica PDF
                </a>
              )}
            </div>
          </div>
          <p className="text-gray-600 whitespace-pre-wrap">
            {activeLesson.description || "Nessuna descrizione disponibile per questa lezione."}
          </p>
        </div>
      </div>

      {/* Playlist Sidebar */}
      <div className="w-full lg:w-80 bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-100 bg-gray-50">
          <h3 className="font-bold text-gray-700">Programma del Corso</h3>
          <p className="text-xs text-gray-500">{lessons.length} Lezioni</p>
        </div>
        
        <div className="overflow-y-auto flex-1">
          {lessons.map((lesson, index) => (
            <button 
              key={lesson.id}
              onClick={() => setActiveLessonIndex(index)}
              className={`w-full text-left p-4 border-b border-gray-50 hover:bg-gray-50 transition flex items-center gap-3 ${activeLessonIndex === index ? 'bg-purple-50 border-l-4 border-l-brand-purple' : ''}`}
            >
              <PlayCircle size={16} className={activeLessonIndex === index ? "text-brand-purple" : "text-gray-400"} />
              
              <div className="flex-1">
                <p className={`text-sm font-medium ${activeLessonIndex === index ? 'text-brand-purple' : 'text-gray-700'}`}>
                  {lesson.title}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

    </div>
  )
}