import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import { PlayCircle, FileDown, Lock, ExternalLink, Loader2, AlertCircle, ShoppingCart, Music, ChevronRight, ChevronLeft } from 'lucide-react'
import { initiateCheckout } from '../../lib/payment'
import { getEmbedUrl } from '../../lib/video'

export default function CoursePlayer() {
  const { id } = useParams()
  const { user } = useAuth()
  
  const [loading, setLoading] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)
  const [courseInfo, setCourseInfo] = useState(null)
  const [lessons, setLessons] = useState([])
  const [activeLessonIndex, setActiveLessonIndex] = useState(0)

  useEffect(() => {
    if (user && id) checkAccessAndFetchContent()
  }, [user, id])

  const checkAccessAndFetchContent = async () => {
    try {
      setLoading(true)
      const { data: product } = await supabase.from('products').select('*').eq('id', id).single()
      setCourseInfo(product)

      const { data: purchase } = await supabase.from('purchases').select('*').eq('user_id', user.id).eq('product_id', id).eq('status', 'completed').single()

      if (purchase) {
        setHasAccess(true)
        const { data: lessonsData } = await supabase.from('lessons').select('*').eq('course_id', id).order('created_at', { ascending: true })
        setLessons(lessonsData || [])
      } else {
        setHasAccess(false)
      }
    } catch (err) { console.error(err) } finally { setLoading(false) }
  }

  if (loading) return <div className="h-64 flex items-center justify-center"><Loader2 className="animate-spin text-brand-purple" size={40} /></div>

  if (!hasAccess) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
        <div className="bg-gray-100 p-6 rounded-full mb-6"><Lock className="w-16 h-16 text-gray-400" /></div>
        <h1 className="text-3xl font-bold text-brand-dark mb-2">Content Locked</h1>
        <p className="text-gray-500 mb-8 max-w-md">You must purchase <strong>{courseInfo?.title}</strong> to access.</p>
        <button onClick={() => initiateCheckout(id, courseInfo?.title)} className="flex items-center gap-2 bg-gradient-to-r from-brand-blue to-brand-purple text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:scale-105 transition">
          <ShoppingCart /> Purchase Course ({courseInfo?.price})
        </button>
      </div>
    )
  }

  if (lessons.length === 0) return <div className="text-center py-20"><AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" /><h3 className="text-xl font-bold text-gray-600">No lessons available</h3></div>

  const activeLesson = lessons[activeLessonIndex]
  const hasNext = activeLessonIndex < lessons.length - 1
  const hasPrev = activeLessonIndex > 0

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-auto lg:h-[calc(100vh-120px)]">
      <div className="flex-1 flex flex-col">
        <div className="bg-black rounded-2xl overflow-hidden aspect-video flex items-center justify-center relative shadow-lg border border-gray-800">
          {activeLesson.type === 'audio' ? (
            <div className="w-full h-full bg-brand-dark flex flex-col items-center justify-center text-white">
              <Music size={64} className="mb-4 opacity-50" />
              <h3 className="text-xl font-bold mb-2">{activeLesson.title}</h3>
              <audio controls src={activeLesson.video_url} className="w-3/4" />
            </div>
          ) : (
             <iframe src={getEmbedUrl(activeLesson.video_url)} className="w-full h-full" allowFullScreen title={activeLesson.title} />
          )}
        </div>
        
        <div className="mt-6 bg-white p-6 rounded-2xl border border-gray-100 flex-1 overflow-y-auto shadow-sm flex flex-col">
          <div className="flex flex-wrap justify-between items-start mb-4 gap-4">
            <h1 className="text-2xl font-bold text-brand-dark">{activeLesson.title}</h1>
            <div className="flex gap-2">
               {activeLesson.quizlet_url && <a href={activeLesson.quizlet_url} target="_blank" className="flex items-center gap-2 text-white font-bold bg-[#4257b2] px-4 py-2 rounded-lg hover:opacity-90 transition"><ExternalLink size={18} /> Flashcards</a>}
               {activeLesson.pdf_url && <a href={activeLesson.pdf_url} target="_blank" className="flex items-center gap-2 text-brand-purple font-bold bg-purple-50 border border-purple-100 px-4 py-2 rounded-lg hover:bg-purple-100 transition"><FileDown size={18} /> PDF</a>}
            </div>
          </div>
          <p className="text-gray-600 whitespace-pre-wrap flex-1">{activeLesson.description}</p>

          <div className="flex justify-between items-center pt-6 mt-6 border-t border-gray-100">
             <button disabled={!hasPrev} onClick={() => setActiveLessonIndex(i => i - 1)} className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition">
               <ChevronLeft size={20} /> Previous
             </button>
             <button disabled={!hasNext} onClick={() => setActiveLessonIndex(i => i + 1)} className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold bg-brand-dark text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition">
               Next <ChevronRight size={20} />
             </button>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-96 bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col h-[500px] lg:h-auto shadow-sm">
        <div className="p-5 border-b border-gray-100 bg-gray-50/50">
          <h3 className="font-bold text-brand-dark text-lg">Curriculum</h3>
          <p className="text-xs text-gray-500 mt-1">{lessons.length} Lessons</p>
        </div>
        <div className="overflow-y-auto flex-1">
          {lessons.map((lesson, index) => (
            <button key={lesson.id} onClick={() => setActiveLessonIndex(index)} className={`w-full text-left p-4 border-b border-gray-50 hover:bg-gray-50 transition flex items-center gap-4 ${activeLessonIndex === index ? 'bg-purple-50 border-l-4 border-l-brand-purple' : 'border-l-4 border-l-transparent'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${activeLessonIndex === index ? 'bg-brand-purple text-white' : 'bg-gray-100 text-gray-400'}`}>
                 {lesson.type === 'audio' ? <Music size={14} /> : <PlayCircle size={14} />}
              </div>
              <div className="flex-1"><p className={`text-sm font-bold ${activeLessonIndex === index ? 'text-brand-purple' : 'text-gray-700'}`}>{lesson.title}</p></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
