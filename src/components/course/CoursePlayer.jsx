"use client";
import { useState, useRef, useEffect } from 'react'
import { PlayCircle, CheckCircle, Circle, Download, HelpCircle, AlertTriangle, ExternalLink, ChevronLeft, ChevronRight, FileDown, Lock, Music, Clock, Menu, X, Gamepad2, Layers, ChevronDown, ChevronUp } from 'lucide-react'
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
import MatchingGame from './MatchingGame'
import FlashcardViewer from './FlashcardViewer'
import ReviewSection from './ReviewSection'
import ReportModal from '../ui/ReportModal'
import LessonDiscussion from './LessonDiscussion'
import HomeworkUploader from './HomeworkUploader'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export default function CoursePlayer({ course, lessons, user }) {
  const [activeLessonIndex, setActiveLessonIndex] = useState(0)
  const [completedLessonIds, setCompletedLessonIds] = useState([])
  const [passedQuizLessonIds, setPassedQuizLessonIds] = useState([]) // New State for strict locking
  const [viewMode, setViewMode] = useState('content')
  const [showReport, setShowReport] = useState(false)
  const [showFlashcards, setShowFlashcards] = useState(false)
  const [generatingPdf, setGeneratingPdf] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [openModules, setOpenModules] = useState({}) 
  
  const certificateRef = useRef()
  const { addXP } = useGamification(user.id)
  const [gamePairs, setGamePairs] = useState([])
  const [vocabTerms, setVocabTerms] = useState([])

  // Group Lessons
  const groupedLessons = lessons.reduce((acc, lesson, index) => {
    const mod = lesson.module || 'General'
    if (!acc[mod]) acc[mod] = []
    acc[mod].push({ ...lesson, globalIndex: index })
    return acc
  }, {})

  useEffect(() => {
    const initPlayer = async () => {
      // 1. Fetch Progress
      const { data: progress } = await supabase.from('lesson_progress').select('lesson_id, last_accessed').eq('user_id', user.id).eq('course_id', course.id)
      
      // 2. Fetch Quiz Results (for strict locking)
      const { data: quizResults } = await supabase.from('quiz_results').select('lesson_id, passed').eq('user_id', user.id).eq('course_id', course.id).eq('passed', true)
      
      if(quizResults) setPassedQuizLessonIds(quizResults.map(q => q.lesson_id))

      if(progress) {
        const completed = progress.map(p => p.lesson_id)
        setCompletedLessonIds(completed)
        
        // Find most recently accessed
        const lastAccessedEntry = progress.sort((a,b) => new Date(b.last_accessed) - new Date(a.last_accessed))[0]
        if (lastAccessedEntry) {
            const index = lessons.findIndex(l => l.id === lastAccessedEntry.lesson_id)
            if (index !== -1) {
                setActiveLessonIndex(index)
                const mod = lessons[index].module || 'General'
                setOpenModules(prev => ({ ...prev, [mod]: true }))
            }
        } else {
            const firstMod = lessons[0]?.module || 'General'
            setOpenModules({ [firstMod]: true })
        }
      }
    }
    initPlayer()
  }, [course.id, user.id])

  const activeLesson = lessons[activeLessonIndex]
  
  useEffect(() => {
    setViewMode('content')
    setSidebarOpen(false)
    if (activeLesson?.description) {
      const regex = /\[\[VOCAB::(.*?)\|(.*?)\]\]/g
      const matches = []
      const terms = []
      let match
      let idCounter = 1
      while ((match = regex.exec(activeLesson.description)) !== null) {
        matches.push({ id: idCounter++, text: match[1], match: match[2] })
        terms.push({ term: match[1], definition: match[2] })
      }
      setGamePairs(matches)
      setVocabTerms(terms)
    } else {
      setGamePairs([])
      setVocabTerms([])
    }
    
    if(activeLesson) {
        supabase.from('lesson_progress').upsert(
            { user_id: user.id, lesson_id: activeLesson.id, course_id: course.id, last_accessed: new Date() }, 
            { onConflict: 'user_id, lesson_id' }
        )
        setOpenModules(prev => ({ ...prev, [activeLesson.module || 'General']: true }))
    }
  }, [activeLessonIndex, activeLesson])

  const isLessonCompleted = completedLessonIds.includes(activeLesson?.id)
  const progressPercent = Math.round((completedLessonIds.length / lessons.length) * 100)

  const previousLesson = activeLessonIndex > 0 ? lessons[activeLessonIndex - 1] : null
  const isPrereqLocked = previousLesson && !completedLessonIds.includes(previousLesson.id)
  const isDateLocked = activeLesson?.release_date && new Date(activeLesson.release_date) > new Date()
  const isLocked = isPrereqLocked || isDateLocked

  // STRICT COMPLETION LOGIC
  const hasQuiz = activeLesson?.quiz_data && activeLesson.quiz_data.length > 0
  const isQuizPassed = passedQuizLessonIds.includes(activeLesson?.id)
  const canMarkComplete = !hasQuiz || isQuizPassed

  const toggleCompletion = async () => {
    if (!activeLesson) return
    const lessonId = activeLesson.id
    
    // Block if quiz exists and not passed
    if (!canMarkComplete && !isLessonCompleted) {
      alert("You must pass the quiz before completing this lesson.")
      setViewMode('quiz')
      return
    }

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

  const handleQuizPass = (score) => {
    if(!passedQuizLessonIds.includes(activeLesson.id)) {
      setPassedQuizLessonIds(prev => [...prev, activeLesson.id])
    }
    // Auto complete lesson on quiz pass
    if(!isLessonCompleted) toggleCompletion()
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

  const toggleModule = (modName) => setOpenModules(prev => ({ ...prev, [modName]: !prev[modName] }))

  return (
    <div className="flex flex-col lg:flex-row gap-6 min-h-screen relative">
      <Certificate ref={certificateRef} studentName={user.email} courseTitle={course.title} date={new Date().toLocaleDateString()} />
      <ReportModal isOpen={showReport} onClose={() => setShowReport(false)} contextData={`Course: ${course.title}, Lesson: ${activeLesson?.title}`} />
      
      {showFlashcards && <FlashcardViewer terms={vocabTerms} onClose={() => setShowFlashcards(false)} />}

      <div className="lg:hidden mb-4">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="w-full bg-brand-dark text-white p-4 rounded-xl flex items-center justify-between font-bold shadow-lg">
          <span>{activeLesson?.title || "Select Lesson"}</span>
          {sidebarOpen ? <X/> : <Menu/>}
        </button>
      </div>

      <div className={`flex-1 flex flex-col ${sidebarOpen ? 'hidden lg:flex' : 'flex'}`}>
        {isLocked ? (
          <div className="flex-1 bg-white rounded-3xl p-12 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center min-h-[400px]">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              {isDateLocked ? <Clock size={32} className="text-blue-400" /> : <Lock size={32} className="text-gray-400" />}
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{isDateLocked ? "Coming Soon" : "Lesson Locked"}</h2>
            <p className="text-gray-500 mb-6">{isDateLocked ? `Unlocks on ${new Date(activeLesson.release_date).toLocaleDateString()}` : "Complete the previous lesson to unlock."}</p>
            {!isDateLocked && <button onClick={() => setActiveLessonIndex(activeLessonIndex - 1)} className="btn btn-plum-gradient px-6 py-2 rounded-xl text-sm">Go to Previous Lesson</button>}
          </div>
        ) : (
          <>
            <div className="flex gap-2 mb-4 bg-white p-1 rounded-xl shadow-sm border border-gray-100 w-fit flex-wrap">
              <button onClick={() => setViewMode('content')} className={`px-4 py-2 rounded-lg font-bold text-sm transition ${viewMode === 'content' ? 'bg-brand-purple text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}>Content</button>
              {activeLesson?.quiz_data?.length > 0 && <button onClick={() => setViewMode('quiz')} className={`px-4 py-2 rounded-lg font-bold text-sm transition flex items-center gap-2 ${viewMode === 'quiz' ? 'bg-brand-purple text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}><HelpCircle size={14}/> Quiz</button>}
              {gamePairs.length >= 2 && <button onClick={() => setViewMode('game')} className={`px-4 py-2 rounded-lg font-bold text-sm transition flex items-center gap-2 ${viewMode === 'game' ? 'bg-brand-purple text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}><Gamepad2 size={14}/> Game</button>}
            </div>

            {viewMode === 'quiz' && <QuizTaker quizData={activeLesson.quiz_data} onComplete={handleQuizPass} lessonId={activeLesson.id} courseId={course.id} />}
            {viewMode === 'game' && <MatchingGame pairs={gamePairs} onComplete={() => addXP(20)} />}

            {viewMode === 'content' && (
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
                    <button 
                      onClick={toggleCompletion} 
                      disabled={!canMarkComplete && !isLessonCompleted}
                      className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition ${isLessonCompleted ? 'bg-green-100 text-green-700' : (!canMarkComplete ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-500 hover:bg-gray-200')}`}
                      title={!canMarkComplete ? "Pass Quiz First" : ""}
                    >
                       {isLessonCompleted ? <CheckCircle size={18}/> : (canMarkComplete ? <Circle size={18}/> : <Lock size={18}/>)} 
                       {isLessonCompleted ? "Completed" : (canMarkComplete ? "Mark Complete" : "Pass Quiz First")}
                    </button>
                  </div>
                  <VocabularyDrill description={activeLesson?.description} />
                  <HomeworkUploader lessonId={activeLesson?.id} />
                  
                  <div className="flex gap-3 my-6">
                     {vocabTerms.length > 0 && <button onClick={() => setShowFlashcards(true)} className="flex gap-2 items-center text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded hover:bg-blue-100"><Layers size={14}/> Flashcards</button>}
                     {activeLesson?.pdf_url && <a href={activeLesson.pdf_url} target="_blank" className="flex gap-2 items-center text-sm font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded hover:bg-purple-100"><FileDown size={14}/> PDF</a>}
                     {activeLesson?.quizlet_url && <a href={activeLesson.quizlet_url} target="_blank" className="flex gap-2 items-center text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded hover:bg-blue-100"><ExternalLink size={14}/> Quizlet</a>}
                  </div>
                  <div className="prose prose-sm text-gray-600 whitespace-pre-wrap">{cleanDescription(activeLesson?.description)}</div>
                  
                  <div className="flex justify-between items-center pt-6 mt-6 border-t border-gray-100">
                     <button disabled={activeLessonIndex === 0} onClick={() => setActiveLessonIndex(i => i - 1)} className="text-gray-500 font-bold flex items-center gap-1 disabled:opacity-30 hover:text-brand-dark transition"><ChevronLeft/> Previous</button>
                     <button onClick={() => setShowReport(true)} className="text-gray-400 hover:text-red-500 text-xs flex items-center gap-1 transition"><AlertTriangle size={12}/> Report</button>
                     <button disabled={activeLessonIndex === lessons.length - 1} onClick={() => setActiveLessonIndex(i => i + 1)} className="text-brand-purple font-bold flex items-center gap-1 disabled:opacity-30 hover:underline transition">Next <ChevronRight/></button>
                  </div>
                </div>
                <LessonDiscussion lessonId={activeLesson?.id} />
                <ReviewSection productId={course.id} />
              </>
            )}
          </>
        )}
      </div>

      <div className={`w-full lg:w-80 flex flex-col gap-6 h-fit lg:sticky lg:top-24 ${sidebarOpen ? 'block' : 'hidden lg:flex'}`}>
         <div className="h-64 flex-shrink-0"><LessonNotes lessonId={activeLesson?.id} userId={user.id} /></div>
         <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col shadow-sm max-h-[calc(100vh-200px)]">
            <div className="p-5 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-bold text-brand-dark text-lg mb-2">Curriculum</h3>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2"><div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${progressPercent}%` }}></div></div>
              <div className="flex justify-between text-xs text-gray-500"><span>{progressPercent}% Done</span>{progressPercent === 100 && <button onClick={downloadCertificate} disabled={generatingPdf} className="flex items-center gap-1 text-brand-purple font-bold hover:underline">{generatingPdf ? '...' : <><Download size={10}/> Certificate</>}</button>}</div>
            </div>
            <div className="overflow-y-auto flex-1">
              {Object.entries(groupedLessons).map(([moduleName, modLessons]) => (
                <div key={moduleName} className="border-b border-gray-50 last:border-0">
                  <button onClick={() => toggleModule(moduleName)} className="w-full px-4 py-3 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition">
                    <span className="font-bold text-gray-700 text-sm">{moduleName}</span>
                    {openModules[moduleName] ? <ChevronUp size={16} className="text-gray-400"/> : <ChevronDown size={16} className="text-gray-400"/>}
                  </button>
                  {openModules[moduleName] && (
                    <div className="bg-white">
                      {modLessons.map((l) => {
                        const idx = l.globalIndex
                        const prev = idx > 0 ? lessons[idx-1] : null
                        const lockedPrereq = prev && !completedLessonIds.includes(prev.id)
                        const lockedDate = l.release_date && new Date(l.release_date) > new Date()
                        const locked = lockedPrereq || lockedDate

                        return (
                          <button key={l.id} disabled={locked} onClick={() => setActiveLessonIndex(idx)} className={`w-full text-left p-3 pl-6 border-b border-gray-50 hover:bg-gray-50 flex items-center gap-3 disabled:opacity-50 disabled:bg-white ${activeLessonIndex === idx ? 'bg-purple-50 border-l-4 border-l-brand-purple pl-5' : ''}`}>
                            <div className="text-gray-400">
                              {locked ? <Lock size={14}/> : (completedLessonIds.includes(l.id) ? <CheckCircle size={14} className="text-green-500"/> : (l.type === 'audio' ? <Music size={14}/> : <PlayCircle size={14}/>))}
                            </div>
                            <div className="text-xs font-medium text-gray-700 truncate flex-1">{l.title}</div>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
         </div>
      </div>
    </div>
  )
}
