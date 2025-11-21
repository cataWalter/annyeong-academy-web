import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import { PlayCircle, FileDown, Lock, ExternalLink, Loader2, AlertCircle, ShoppingCart } from 'lucide-react'
import { initiateCheckout } from '../../lib/payment'

export default function CoursePlayer() {
  const { id } = useParams() // course_id
  const { user } = useAuth()
  
  const [loading, setLoading] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)
  const [courseInfo, setCourseInfo] = useState(null)
  const [lessons, setLessons] = useState([])
  const [activeLessonIndex, setActiveLessonIndex] = useState(0)

  useEffect(() => {
    if (user && id) {
      checkAccessAndFetchContent()
    }
  }, [user, id])

  const checkAccessAndFetchContent = async () => {
    try {
      setLoading(true)
      
      // 1. Get Course Info
      const { data: product } = await supabase.from('products').select('*').eq('id', id).single()
      setCourseInfo(product)

      // 2. Check Purchase (Membership System)
      const { data: purchase } = await supabase
        .from('purchases')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_id', id)
        .eq('status', 'completed')
        .single()

      if (purchase) {
        setHasAccess(true)
        // 3. Fetch Lessons only if access granted
        const { data: lessonsData } = await supabase
          .from('lessons')
          .select('*')
          .eq('course_id', id)
          .order('created_at', { ascending: true })
        
        setLessons(lessonsData || [])
      } else {
        setHasAccess(false)
      }

    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="h-64 flex items-center justify-center"><Loader2 className="animate-spin text-brand-purple" size={40} /></div>

  // --- LOCKED STATE ---
  if (!hasAccess) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
        <div className="bg-gray-100 p-6 rounded-full mb-6">
          <Lock className="w-16 h-16 text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold text-brand-dark mb-2">Contenuto Bloccato</h1>
        <p className="text-gray-500 mb-8 max-w-md">
          Non sei ancora iscritto a <strong>{courseInfo?.title || 'questo corso'}</strong>. 
          Acquistalo per accedere a tutte le lezioni e materiali.
        </p>
        <button 
          onClick={() => initiateCheckout(id, courseInfo?.title)}
          className="flex items-center gap-2 bg-gradient-to-r from-brand-blue to-brand-purple text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:transform hover:-translate-y-1 transition"
        >
          <ShoppingCart /> Acquista Corso ({courseInfo?.price || '...'} Ft)
        </button>
      </div>
    )
  }

  // --- UNLOCKED STATE ---
  if (lessons.length === 0) return (
    <div className="text-center py-20">
      <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-gray-600">Nessuna lezione caricata</h3>
      <p className="text-gray-500">Hai accesso al corso, ma l'insegnante non ha ancora caricato i video.</p>
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
               {activeLesson.quizlet_url && (
                <a 
                  href={activeLesson.quizlet_url}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-white font-bold bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  <ExternalLink size={18} /> Quizlet
                </a>
              )}
              {activeLesson.pdf_url && (
                <a 
                  href={activeLesson.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-brand-purple font-bold bg-purple-50 px-4 py-2 rounded-lg hover:bg-purple-100 transition"
                >
                  <FileDown size={18} /> PDF
                </a>
              )}
            </div>
          </div>
          <p className="text-gray-600 whitespace-pre-wrap">
            {activeLesson.description || "Nessuna descrizione disponibile."}
          </p>
        </div>
      </div>

      {/* Playlist Sidebar */}
      <div className="w-full lg:w-80 bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-100 bg-gray-50">
          <h3 className="font-bold text-gray-700">Programma</h3>
          <p className="text-xs text-gray-500">{lessons.length} Lezioni â€¢ Accesso Completo</p>
        </div>
        
        <div className="overflow-y-auto flex-1">
          {lessons.map((lesson, index) => (
            <button 
              key={lesson.id}
              onClick={() => setActiveLessonIndex(index)}
              className={w-full text-left p-4 border-b border-gray-50 hover:bg-gray-50 transition flex items-center gap-3 }
            >
              <PlayCircle size={16} className={activeLessonIndex === index ? "text-brand-purple" : "text-gray-400"} />
              
              <div className="flex-1">
                <p className={	ext-sm font-medium }>
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
