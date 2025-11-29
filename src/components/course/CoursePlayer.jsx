"use client";
import { useState, useRef, useEffect } from 'react'
import { PlayCircle, CheckCircle, Circle, Download, HelpCircle, AlertTriangle, ExternalLink, ChevronLeft, ChevronRight, FileDown, Lock, Music, Clock, Menu, X } from 'lucide-react'
import { getEmbedUrl } from '@/lib/video'
import { cleanDescription } from '@/lib/helpers'
import confetti from 'canvas-confetti'
import { useGamification } from '@/hooks/useGamification'
import { supabase } from '@/lib/supabase'
import Certificate from './Certificate'
import LessonNotes from './LessonNotes'
import QuizTaker from './QuizTaker'
import CustomAudioPlayer from './CustomAudioPlayer'
import VocabularyDrill from './VocabularyDrill'
import ReviewSection from './ReviewSection'
import ReportModal from '../ui/ReportModal'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export default function CoursePlayer({ course, lessons, user }) {
  const [activeLessonIndex, setActiveLessonIndex] = useState(0)
  const [completedLessonIds, setCompletedLessonIds] = useState([])
  const [showQuiz, setShowQuiz] = useState(false)
  const [showReport, setShowReport] = useState(false)
  const [generatingPdf, setGeneratingPdf] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false) // Mobile Sidebar State
  const certificateRef = useRef()
  const { addXP } = useGamification(user.id)

  useEffect(() => {
    const fetchProgress = async () => {
      const { data } = await supabase.from('lesson_progress').select('lesson_id').eq('user_id', user.id).eq('course_id', course.id)
      if(data) setCompletedLessonIds(data.map(p => p.lesson_id))
    }
    fetchProgress()
  }, [course.id, user.id])

  useEffect(() => {
    setShowQuiz(false)
    setSidebarOpen(false) // Close sidebar on selection
  }, [activeLessonIndex])

  const activeLesson = lessons[activeLessonIndex]
  const isLessonCompleted = completedLessonIds.includes(activeLesson?.id)
  const progressPercent = Math.round((completedLessonIds.length / lessons.length) * 100)

  const previousLesson = activeLessonIndex > 0 ? lessons[activeLessonIndex - 1] : null
  const isPrereqLocked = previousLesson && !completedLessonIds.includes(previousLesson.id)
  const isDateLocked = activeLesson?.release_date && new Date(activeLesson.release_date) > new Date()
  const isLocked = isPrereqLocked || isDateLocked

  const toggleCompletion = async () => {
    if (!activeLesson) return
    const lessonId = activeLesson.id
    const isComplete = completedLessonIds.includes(lessonId)
    
    if (isComplete) {
      await supabase.from('lesson_progress').delete().eq('user_id', user.id).eq('lesson_id', lessonId)
      setCompletedLessonIds(prev => prev.filter(id => id !== lessonId))
    } else {
      await supabase.from('lesson_progress').insert([{ user_id: user.id, lesson_id: lessonId, course_id: course.id }])
      setCompletedLessonIds(prev => [...prev, lessonId])
      addXP(50)
      if (completedLessonIds.length + 1 === lessons.length) confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } })
    }
  }

  const downloadCertificate = async () => {
    if (!certificateRef.current) return
    setGeneratingPdf(true)
    try {
      const canvas = await html2canvas(certificateRef.current, { scale: 2 })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('landscape', 'mm', 'a4')
      pdf.addImage(imgData, 'PNG', 0, 0, 297, 210)
      pdf.save(`Certificate_${course.title.replace(/\s+/g, '_')}.pdf`)
    } catch (err) { alert("Error generating certificate") } 
    finally { setGeneratingPdf(false) }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 min-h-screen relative">
      <Certificate ref={certificateRef} studentName={user.email} courseTitle={course.title} date={new Date().toLocaleDateString()} />
      <ReportModal isOpen={showReport} onClose={() => setShowReport(false)} contextData={`Course: ${course.title}, Lesson: ${activeLesson?.title}`} />

      {/* MOBILE CURRICULUM TOGGLE */}
      <div className="lg:hidden mb-4">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-full bg-brand-dark text-white p-4 rounded-xl flex items-center justify-between font-bold"
        >
          <span>{activeLesson?.title || "Select Lesson"}</span>
          {sidebarOpen ? <X/> : <Menu/>}
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className={`flex-1 flex flex-col ${sidebarOpen ? 'hidden lg:flex' : 'flex'}`}>
        {isLocked ? (
          <div className="flex-1 bg-white rounded-3xl p-12 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              {isDateLocked ? <Clock size={32} className="text-blue-400" /> : <Lock size={32} className="text-gray-400" />}
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {isDateLocked ? "Coming Soon" : "Lesson Locked"}
            </h2>
            <p className="text-gray-500 mb-6">
              {isDateLocked 
                ? `This lesson unlocks on ${new Date(activeLesson.release_date).toLocaleDateString()}` 
                : "Please complete the previous lesson to unlock this content."}
            </p>
            {!isDateLocked && <button onClick={() => setActiveLessonIndex(activeLessonIndex - 1)} className="btn btn-plum-gradient px-6 py-2 rounded-xl text-sm">Go to Previous Lesson</button>}
          </div>
        ) : (
          <>
            {/* CONTENT TOGGLES */}
            {activeLesson?.quiz_data?.length > 0 && (
              <div className="flex gap-2 mb-4 bg-white p-1 rounded-xl shadow-sm border border-gray-100 w-fit">
                <button onClick={() => setShowQuiz(false)} className={`px-4 py-2 rounded-lg font-bold text-sm transition ${!showQuiz ? 'bg-brand-purple text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}>Content</button>
                <button onClick={() => setShowQuiz(true)} className={`px-4 py-2 rounded-lg font-bold text-sm transition flex items-center gap-2 ${showQuiz ? 'bg-brand-purple text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}><HelpCircle size={14}/> Quiz</button>
              </div>
            )}

            {showQuiz ? (
              <QuizTaker quizData={activeLesson.quiz_data} onComplete={() => { if(!isLessonCompleted) toggleCompletion() }} />
            ) : (
              <>
                <div className="rounded-2xl overflow-hidden shadow-lg flex-shrink-0 mb-6 bg-black">
                  {activeLesson?.type === 'audio' ? 
                    <CustomAudioPlayer src={activeLesson.video_url} title={activeLesson.title} /> : 
                    <div className="aspect-video"><iframe src={getEmbedUrl(activeLesson?.video_url)} className="w-full h-full" allowFullScreen title={activeLesson?.title} /></div>
                  }
                </div>
                
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-8">
                  <div className="flex justify-between items-start mb-4">
                    <h1 className="text-2xl font-bold text-brand-dark">{activeLesson?.title}</h1>
                    <button onClick={toggleCompletion} className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition ${isLessonCompleted ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                       {isLessonCompleted ? <CheckCircle size={18}/> : <Circle size={18}/>} {isLessonCompleted ? "Completed" : "Mark Complete"}
                    </button>
                  </div>
                  <VocabularyDrill description={activeLesson?.description} />
                  <div className="flex gap-3 mb-6">
                     {activeLesson?.quizlet_url && <a href={activeLesson.quizlet_url} target="_blank" className="flex gap-2 items-center text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded hover:bg-blue-100"><ExternalLink size={14}/> Flashcards</a>}
                     {activeLesson?.pdf_url && <a href={activeLesson.pdf_url} target="_blank" className="flex gap-2 items-center text-sm font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded hover:bg-purple-100"><FileDown size={14}/> Download PDF</a>}
                  </div>
                  <div className="prose prose-sm text-gray-600 whitespace-pre-wrap">{cleanDescription(activeLesson?.description)}</div>
                  
                  <div className="flex justify-between items-center pt-6 mt-6 border-t border-gray-100">
                     <button disabled={activeLessonIndex === 0} onClick={() => setActiveLessonIndex(i => i - 1)} className="text-gray-500 font-bold flex items-center gap-1 disabled:opacity-30 hover:text-brand-dark transition"><ChevronLeft/> Previous</button>
                     <button onClick={() => setShowReport(true)} className="text-gray-400 hover:text-red-500 text-xs flex items-center gap-1 transition"><AlertTriangle size={12}/> Report</button>
                     <button disabled={activeLessonIndex === lessons.length - 1} onClick={() => setActiveLessonIndex(i => i + 1)} className="text-brand-purple font-bold flex items-center gap-1 disabled:opacity-30 hover:underline transition">Next <ChevronRight/></button>
                  </div>
                </div>
                <ReviewSection productId={course.id} />
              </>
            )}
          </>
        )}
      </div>

      {/* SIDEBAR (Responsive) */}
      <div className={`w-full lg:w-80 flex flex-col gap-6 h-fit lg:sticky lg:top-24 ${sidebarOpen ? 'block' : 'hidden lg:flex'}`}>
         <div className="h-64 flex-shrink-0"><LessonNotes lessonId={activeLesson?.id} userId={user.id} /></div>
         <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col shadow-sm max-h-[500px]">
            <div className="p-5 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-bold text-brand-dark text-lg mb-2">Curriculum</h3>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2"><div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${progressPercent}%` }}></div></div>
              <div className="flex justify-between text-xs text-gray-500"><span>{progressPercent}% Done</span>{progressPercent === 100 && <button onClick={downloadCertificate} disabled={generatingPdf} className="flex items-center gap-1 text-brand-purple font-bold hover:underline">{generatingPdf ? '...' : <><Download size={10}/> Certificate</>}</button>}</div>
            </div>
            <div className="overflow-y-auto flex-1">
              {lessons.map((l, i) => {
                const prev = i > 0 ? lessons[i-1] : null
                const lockedPrereq = prev && !completedLessonIds.includes(prev.id)
                const lockedDate = l.release_date && new Date(l.release_date) > new Date()
                const locked = lockedPrereq || lockedDate

                return (
                  <button key={l.id} disabled={locked} onClick={() => setActiveLessonIndex(i)} className={`w-full text-left p-4 border-b border-gray-50 hover:bg-gray-50 flex items-center gap-3 disabled:opacity-50 disabled:bg-gray-50 ${activeLessonIndex === i ? 'bg-purple-50 border-l-4 border-l-brand-purple' : ''}`}>
                    <div className="text-gray-400">
                      {locked ? <Lock size={16}/> : (completedLessonIds.includes(l.id) ? <CheckCircle size={16} className="text-green-500"/> : (l.type === 'audio' ? <Music size={16}/> : <PlayCircle size={16}/>))}
                    </div>
                    <div className="text-sm font-medium text-gray-700 truncate flex-1">{l.title}</div>
                  </button>
                )
              })}
            </div>
         </div>
      </div>
    </div>
  )
}
