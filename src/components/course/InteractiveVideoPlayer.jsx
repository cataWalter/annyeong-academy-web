"use client";
import { useState, useRef, useEffect } from 'react'
import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize } from 'lucide-react'
import QuizTaker from './QuizTaker'

export default function InteractiveVideoPlayer({ src, title, quizData = [], onQuizPass }) {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [activeQuiz, setActiveQuiz] = useState(null)
  const [triggeredQuizzes, setTriggeredQuizzes] = useState([]) 

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      const current = video.currentTime
      setProgress((current / video.duration) * 100)

      if (quizData && quizData.length > 0) {
        quizData.forEach((quiz, index) => {
          if (
            quiz.timestamp && 
            !triggeredQuizzes.includes(index) && 
            current >= quiz.timestamp && 
            current < quiz.timestamp + 1
          ) {
            video.pause()
            setIsPlaying(false)
            setActiveQuiz({ ...quiz, index })
            setTriggeredQuizzes(prev => [...prev, index])
          }
        })
      }
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    return () => video.removeEventListener('timeupdate', handleTimeUpdate)
  }, [quizData, triggeredQuizzes])

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play()
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  const handleSeek = (e) => {
    const width = e.target.clientWidth
    const clickX = e.nativeEvent.offsetX
    const duration = videoRef.current.duration
    videoRef.current.currentTime = (clickX / width) * duration
  }

  const handleQuizComplete = (score) => {
    setActiveQuiz(null)
    videoRef.current.play()
    setIsPlaying(true)
    if(onQuizPass) onQuizPass(score)
  }

  // Simple check for native support
  const isNative = src && (src.includes('supabase') || src.endsWith('.mp4') || src.endsWith('.webm'))

  if (!isNative) {
    return (
      <div className="relative aspect-video bg-black rounded-2xl overflow-hidden">
        <iframe src={src} className="w-full h-full" allowFullScreen title={title} />
        {quizData.some(q => q.timestamp) && (
          <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full backdrop-blur-md">
            Interactive quizzes available on native video only
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="relative group bg-black rounded-2xl overflow-hidden shadow-2xl">
      <video 
        ref={videoRef} 
        src={src} 
        className="w-full h-full"
        onClick={togglePlay}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Custom Controls Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        
        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-600/50 rounded-full mb-4 cursor-pointer hover:h-3 transition-all" onClick={handleSeek}>
          <div className="h-full bg-brand-purple rounded-full relative" style={{ width: `${progress}%` }}>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md scale-0 group-hover:scale-100 transition-transform"></div>
          </div>
          {/* Quiz Markers */}
          {quizData.map((q, i) => q.timestamp && (
            <div 
              key={i} 
              className="absolute top-0 w-1 h-full bg-yellow-400 z-10 pointer-events-none" 
              style={{ left: `${(q.timestamp / videoRef.current?.duration) * 100}%` }}
              title="Quiz Checkpoint"
            ></div>
          ))}
        </div>

        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
            <button onClick={togglePlay} className="hover:text-brand-purple transition">
              {isPlaying ? <Pause size={24} fill="currentColor"/> : <Play size={24} fill="currentColor"/>}
            </button>
            <button onClick={() => { videoRef.current.currentTime -= 10 }} className="hover:text-brand-purple transition"><RotateCcw size={20}/></button>
            <div className="flex items-center gap-2 group/vol">
              <button onClick={() => { videoRef.current.muted = !isMuted; setIsMuted(!isMuted) }}>
                {isMuted ? <VolumeX size={20}/> : <Volume2 size={20}/>}
              </button>
            </div>
            <span className="text-xs font-mono">{videoRef.current ? new Date(videoRef.current.currentTime * 1000).toISOString().substr(14, 5) : "00:00"} / {videoRef.current ? new Date(videoRef.current.duration * 1000).toISOString().substr(14, 5) : "00:00"}</span>
          </div>
          <button onClick={() => videoRef.current.requestFullscreen()}><Maximize size={20}/></button>
        </div>
      </div>

      {/* QUIZ OVERLAY */}
      {activeQuiz && (
        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-10 animate-fade-in">
          <div className="w-full max-w-2xl">
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-brand-purple">
              <div className="bg-brand-purple text-white p-4 text-center font-bold">
                Video Paused • Checkpoint
              </div>
              <div className="p-6">
                <QuizTaker 
                  quizData={[activeQuiz]} 
                  onComplete={handleQuizComplete} 
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
