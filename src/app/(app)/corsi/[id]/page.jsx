"use client";
// PATH: src/pages/app/CoursePlayer.jsx

import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import { useGamification } from '../../hooks/useGamification'
import { usePayment } from '@/context/PaymentContext'
import { useLanguage } from '@/context/LanguageContext'
import { 
  PlayCircle, FileDown, Lock, ExternalLink, Loader2, 
  Music, ChevronRight, ChevronLeft, CheckCircle, Circle, 
  Download, HelpCircle, AlertTriangle 
} from 'lucide-react'
import { getEmbedUrl } from '@/lib/video'
import { cleanDescription } from '@/lib/helpers'
import confetti from 'canvas-confetti'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import Certificate from '@/components/course/Certificate'
import CustomAudioPlayer from '@/components/course/CustomAudioPlayer'
import LessonNotes from '@/components/course/LessonNotes'
import VocabularyDrill from '@/components/course/VocabularyDrill'
import ReviewSection from '@/components/course/ReviewSection'
import QuizTaker from '@/components/course/QuizTaker'
import ReportModal from '@/components/ui/ReportModal'

export default function CoursePlayer() {
  const { id } = useParams()
  const { user, profile } = useAuth()
  const { t } = useLanguage()
  const { addXP } = useGamification()
  const { initiateCheckout } = usePayment()
  
  const [loading, setLoading] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)
  const [courseInfo, setCourseInfo] = useState(null)
  const [lessons, setLessons] = useState([])
  const [activeLessonIndex, setActiveLessonIndex] = useState(0)
  
  const [completedLessonIds, setCompletedLessonIds] = useState([])
  const [marking, setMarking] = useState(false)
  const [generatingPdf, setGeneratingPdf] = useState(false)
  const [xpAnimation, setXpAnimation] = useState(null)
  const [showQuiz, setShowQuiz] = useState(false)
  
  const [showReport, setShowReport] = useState(false)
  const certificateRef = useRef()

  useEffect(() => {
    if (user && id) checkAccessAndFetchContent()
  }, [user, id])

  useEffect(() => {
    setShowQuiz(false)
  }, [activeLessonIndex])

  const checkAccessAndFetchContent = async () => {
    try {
      setLoading(true)
      const { data: product } = await supabase.from('products').select('*').eq('id', id).single()
      setCourseInfo(product)

      const { data: purchase } = await supabase.from('purchases')
        .select('*').eq('user_id', user.id).eq('product_id', id).eq('status', 'completed').single()

      if (purchase) {
        setHasAccess(true)
        const { data: lessonsData } = await supabase.from('lessons')
          .select('*').eq('course_id', id).order('created_at', { ascending: true })
        setLessons(lessonsData || [])

        const { data: progressData } = await supabase.from('lesson_progress')
          .select('lesson_id').eq('user_id', user.id).eq('course_id', id)
        if (progressData) setCompletedLessonIds(progressData.map(p => p.lesson_id))
      } else {
        setHasAccess(false)
      }
    } catch (err) { console.error(err) } finally { setLoading(false) }
  }

  const toggleCompletion = async () => {
    if (!lessons[activeLessonIndex]) return
    const lessonId = lessons[activeLessonIndex].id
    const isComplete = completedLessonIds.includes(lessonId)
    
    setMarking(true)
    try {
      let newCompletedIds;
      if (isComplete) {
        // CASE: UNMARKING (Incomplete)
        await supabase.from('lesson_progress').delete().eq('user_id', user.id).eq('lesson_id', lessonId)
        newCompletedIds = completedLessonIds.filter(id => id !== lessonId)
        
        // 🐛 BUG FIX: Remove 50 XP so users can't farm XP by toggling
        addXP(-50) 

      } else {
        // CASE: MARKING (Complete)
        await supabase.from('lesson_progress').insert([{ user_id: user.id, lesson_id: lessonId, course_id: id }])
        newCompletedIds = [...completedLessonIds, lessonId]
        
        // Add 50 XP
        addXP(50)
        setXpAnimation(50)
        setTimeout(() => setXpAnimation(null), 2000)
        if (newCompletedIds.length === lessons.length) fireConfetti()
      }
      setCompletedLessonIds(newCompletedIds)
    } catch (error) { console.error("Progress Error", error) } 
    finally { setMarking(false) }
  }

  const fireConfetti = () => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } })
  }

  const downloadCertificate = async () => {
    if (!certificateRef.current) return
    setGeneratingPdf(true)
    try {
      const canvas = await html2canvas(certificateRef.current, { scale: 2 })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('landscape', 'mm', 'a4')
      pdf.addImage(imgData, 'PNG', 0, 0, 297, 210)
      pdf.save(`Certificate_${courseInfo.title.replace(/\s+/g, '_')}.pdf`)
    } catch (err) { alert("Error generating certificate") } 
    finally { setGeneratingPdf(false) }
  }

  if (loading) return <div className="h-64 flex items-center justify-center"><Loader2 className="animate-spin text-brand-purple" size={40} /></div>

  if (!hasAccess) return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
      <Lock className="w-16 h-16 text-gray-300 mb-4" />
      <h1 className="text-2xl font-bold text-brand-dark mb-2">{t('player_locked')}</h1>
      <button onClick={() => initiateCheckout(courseInfo)} className="bg-brand-purple text-white px-8 py-3 rounded-full font-bold mt-4 hover:bg-brand-dark transition shadow-lg">{t('player_unlock')} {courseInfo?.price}</button>
    </div>
  )

  if (lessons.length === 0) return <div className="text-center py-20">{t('player_no_lessons')}</div>

  const activeLesson = lessons[activeLessonIndex]
  const isLessonCompleted = completedLessonIds.includes(activeLesson.id)
  const progressPercent = Math.round((completedLessonIds.length / lessons.length) * 100)
  const hasQuiz = activeLesson.quiz_data && activeLesson.quiz_data.length > 0

  return (
    <div className="flex flex-col lg:flex-row gap-6 min-h-screen relative">
      <Certificate ref={certificateRef} studentName={profile?.full_name} courseTitle={courseInfo?.title} date={new Date().toLocaleDateString()} />
      {xpAnimation && <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-white text-4xl font-black px-8 py-4 rounded-2xl shadow-2xl z-50 animate-bounce border-4 border-white">+{xpAnimation} XP! ⚡</div>}

      <ReportModal 
        isOpen={showReport} 
        onClose={() => setShowReport(false)} 
        contextData={`Course: ${courseInfo.title}, Lesson: ${activeLesson.title}`} 
      />

      <div className="flex-1 flex flex-col">
        
        {hasQuiz && (
          <div className="flex gap-2 mb-4">
            <button onClick={() => setShowQuiz(false)} className={`flex-1 py-2 rounded-xl font-bold text-sm transition ${!showQuiz ? 'bg-brand-dark text-white' : 'bg-gray-100 text-gray-500'}`}>{t('player_content')}</button>
            <button onClick={() => setShowQuiz(true)} className={`flex-1 py-2 rounded-xl font-bold text-sm transition flex items-center justify-center gap-2 ${showQuiz ? 'bg-brand-purple text-white' : 'bg-gray-100 text-gray-500'}`}><HelpCircle size={16}/> {t('player_quiz')}</button>
          </div>
        )}

        {showQuiz ? (
          <QuizTaker quizData={activeLesson.quiz_data} onComplete={() => { if(!isLessonCompleted) toggleCompletion() }} />
        ) : (
          <>
            <div className="rounded-2xl overflow-hidden shadow-lg flex-shrink-0 mb-6">
              {activeLesson.type === 'audio' ? <CustomAudioPlayer src={activeLesson.video_url} title={activeLesson.title} /> : <div className="aspect-video bg-black"><iframe src={getEmbedUrl(activeLesson.video_url)} className="w-full h-full" allowFullScreen title={activeLesson.title} /></div>}
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-8">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-2xl font-bold text-brand-dark">{activeLesson.title}</h1>
                <button onClick={toggleCompletion} disabled={marking} className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition ${isLessonCompleted ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                   {marking ? <Loader2 className="animate-spin" size={18}/> : (isLessonCompleted ? <CheckCircle size={18}/> : <Circle size={18}/>)} {isLessonCompleted ? t('player_completed') : t('player_mark_complete')}
                </button>
              </div>
              <VocabularyDrill description={activeLesson.description} />
              <div className="flex gap-3 mb-6">
                 {activeLesson.quizlet_url && <a href={activeLesson.quizlet_url} target="_blank" className="btn-secondary flex gap-2 items-center text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded hover:bg-blue-100"><ExternalLink size={14}/> {t('player_flashcards')}</a>}
                 {activeLesson.pdf_url && <a href={activeLesson.pdf_url} target="_blank" className="btn-secondary flex gap-2 items-center text-sm font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded hover:bg-purple-100"><FileDown size={14}/> {t('player_download_pdf')}</a>}
              </div>
              <div className="prose prose-sm text-gray-600 whitespace-pre-wrap">{cleanDescription(activeLesson.description)}</div>
              
              <div className="flex justify-between items-center pt-6 mt-6 border-t border-gray-100">
                 <button disabled={activeLessonIndex === 0} onClick={() => setActiveLessonIndex(i => i - 1)} className="text-gray-500 font-bold flex items-center gap-1 disabled:opacity-30 hover:text-brand-dark transition"><ChevronLeft/> {t('player_prev')}</button>
                 
                 <button onClick={() => setShowReport(true)} className="text-gray-400 hover:text-red-500 text-xs flex items-center gap-1 transition"><AlertTriangle size={12}/> {t('player_report')}</button>
                 
                 <button disabled={activeLessonIndex === lessons.length - 1} onClick={() => setActiveLessonIndex(i => i + 1)} className="text-brand-purple font-bold flex items-center gap-1 disabled:opacity-30 hover:underline transition">{t('player_next')} <ChevronRight/></button>
              </div>
            </div>
            <ReviewSection productId={id} />
          </>
        )}
      </div>

      <div className="w-full md:w-80 flex flex-col gap-6 h-fit sticky top-24">
         <div className="h-64 flex-shrink-0"><LessonNotes lessonId={activeLesson.id} userId={user.id} /></div>
         <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col shadow-sm max-h-[500px]">
            <div className="p-5 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-bold text-brand-dark text-lg mb-2">{t('player_curriculum')}</h3>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2"><div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${progressPercent}%` }}></div></div>
              <div className="flex justify-between text-xs text-gray-500"><span>{progressPercent}% {t('player_completed')}</span>{progressPercent === 100 && <button onClick={downloadCertificate} disabled={generatingPdf} className="flex items-center gap-1 text-brand-purple font-bold hover:underline">{generatingPdf ? '...' : <><Download size={10}/> {t('player_cert')}</>}</button>}</div>
            </div>
            <div className="overflow-y-auto flex-1">
              {lessons.map((l, i) => (
                <button key={l.id} onClick={() => setActiveLessonIndex(i)} className={`w-full text-left p-4 border-b border-gray-50 hover:bg-gray-50 flex items-center gap-3 ${activeLessonIndex === i ? 'bg-purple-50 border-l-4 border-l-brand-purple' : ''}`}>
                  <div className="text-gray-400">{completedLessonIds.includes(l.id) ? <CheckCircle size={16} className="text-green-500"/> : (l.type === 'audio' ? <Music size={16}/> : <PlayCircle size={16}/>)}</div>
                  <div className="text-sm font-medium text-gray-700 truncate flex-1">{l.title}</div>
                  {l.quiz_data && <div className="text-xs bg-orange-100 text-orange-600 px-1.5 rounded font-bold">Quiz</div>}
                </button>
              ))}
            </div>
         </div>
      </div>
    </div>
  )
}