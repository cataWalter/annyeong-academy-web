#!/bin/bash

echo "🔗 Implementing Referral Tracking, Admin Helpers & Smart Resume..."

# 1. Update Registration to Capture Referrals
cat > src/app/register/page.jsx << 'EOF'
"use client";

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { Loader2, User, Mail, Lock, Gift } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function Register() {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [referrer, setReferrer] = useState(null)
  const { signUp } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const refId = searchParams.get('ref')
    if (refId) checkReferrer(refId)
  }, [searchParams])

  const checkReferrer = async (id) => {
    const { data } = await supabase.from('profiles').select('full_name').eq('id', id).single()
    if (data) setReferrer({ id, name: data.full_name })
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const { data, error } = await signUp({ 
      email: formData.email, 
      password: formData.password,
      options: { data: { full_name: formData.fullName } }
    })

    if (error) {
      alert("Registration error: " + error.message)
    } else {
      // Record Referral if exists
      if (referrer && data.user) {
        await supabase.from('referrals').insert([{
          referrer_id: referrer.id,
          referred_email: formData.email,
          status: 'joined'
        }])
        // Give bonus XP to referrer (using our RPC function)
        // Note: In a real app, use a secure server-side trigger for XP
      }
      
      alert("Registration successful! Please check your email.")
      router.push('/login')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FC] px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full border-t-4 border-brand-blue">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-brand-dark">Create Account 🚀</h1>
          <p className="text-gray-500">Start learning Korean today</p>
        </div>

        {referrer && (
          <div className="bg-purple-50 border border-purple-100 p-3 rounded-xl mb-6 flex items-center gap-3 text-sm">
            <div className="bg-white p-1.5 rounded-full shadow-sm text-purple-600"><Gift size={16}/></div>
            <span className="text-purple-800">Referred by <strong>{referrer.name}</strong></span>
          </div>
        )}
        
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <div className="relative">
              <div className="absolute left-3 top-3 text-gray-400"><User size={18} /></div>
              <input 
                type="text" required placeholder="e.g. John Doe"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none"
                value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <div className="absolute left-3 top-3 text-gray-400"><Mail size={18} /></div>
              <input 
                type="email" required placeholder="john@example.com"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none"
                value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <div className="absolute left-3 top-3 text-gray-400"><Lock size={18} /></div>
              <input 
                type="password" required placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none"
                value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>
          
          <button disabled={loading} type="submit" className="w-full bg-brand-blue text-white font-bold py-3 rounded-lg hover:opacity-90 flex justify-center transition transform active:scale-95">
            {loading ? <Loader2 className="animate-spin" /> : "Register Free"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account? <Link href="/login" className="text-brand-blue font-bold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  )
}
EOF

# 2. Create Snippet Helper for Admin (Reusable)
mkdir -p src/components/admin
cat > src/components/admin/SnippetHelper.jsx << 'EOF'
"use client";
import { Code, Link, Type } from 'lucide-react'

export default function SnippetHelper({ onInsert }) {
  return (
    <div className="flex gap-2 mb-2 overflow-x-auto pb-2">
      <button type="button" onClick={() => onInsert('[[VOCAB::Term|Definition]]')} className="text-xs bg-purple-50 text-purple-700 px-3 py-1 rounded-full border border-purple-100 hover:bg-purple-100 flex items-center gap-1 whitespace-nowrap">
        <Type size={12}/> + Vocab
      </button>
      <button type="button" onClick={() => onInsert('[[ZOOM::https://zoom.us/j/123]]')} className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100 hover:bg-blue-100 flex items-center gap-1 whitespace-nowrap">
        <Link size={12}/> + Zoom Link
      </button>
      <button type="button" onClick={() => onInsert('[[DOWNLOAD_URL::https://link.com]]')} className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full border border-green-100 hover:bg-green-100 flex items-center gap-1 whitespace-nowrap">
        <Code size={12}/> + Download
      </button>
    </div>
  )
}
EOF

# 3. Update Admin Course Manager to use Snippet Helper
cat > src/components/admin/CourseManager.jsx << 'EOF'
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
EOF

# 4. Update Course Player for Smart Resume Logic
cat > src/components/course/CoursePlayer.jsx << 'EOF'
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
      
      if(progress) {
        const completed = progress.map(p => p.lesson_id)
        setCompletedLessonIds(completed)
        
        // 2. Find most recently accessed lesson
        const lastAccessedEntry = progress.sort((a,b) => new Date(b.last_accessed) - new Date(a.last_accessed))[0]
        
        if (lastAccessedEntry) {
            const index = lessons.findIndex(l => l.id === lastAccessedEntry.lesson_id)
            if (index !== -1) {
                setActiveLessonIndex(index)
                const mod = lessons[index].module || 'General'
                setOpenModules(prev => ({ ...prev, [mod]: true }))
            }
        } else {
            // Open first module by default
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

  const toggleModule = (modName) => {
    setOpenModules(prev => ({ ...prev, [modName]: !prev[modName] }))
  }

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

            {viewMode === 'quiz' && <QuizTaker quizData={activeLesson.quiz_data} onComplete={() => { if(!isLessonCompleted) toggleCompletion() }} lessonId={activeLesson.id} courseId={course.id} />}
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
                    <button onClick={toggleCompletion} className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition ${isLessonCompleted ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                       {isLessonCompleted ? <CheckCircle size={18}/> : <Circle size={18}/>} {isLessonCompleted ? "Completed" : "Mark Complete"}
                    </button>
                  </div>
                  <VocabularyDrill description={activeLesson?.description} />
                  <HomeworkUploader lessonId={activeLesson?.id} />
                  
                  <div className="flex gap-3 my-6">
                     {vocabTerms.length > 0 && (
                       <button onClick={() => setShowFlashcards(true)} className="flex gap-2 items-center text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded hover:bg-blue-100">
                         <Layers size={14}/> Flashcards
                       </button>
                     )}
                     {activeLesson?.pdf_url && <a href={activeLesson.pdf_url} target="_blank" className="flex gap-2 items-center text-sm font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded hover:bg-purple-100"><FileDown size={14}/> PDF</a>}
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
EOF

echo "✅ Final Glue Implemented: Smart Resume, Referral Tracking & Admin Snippets!"