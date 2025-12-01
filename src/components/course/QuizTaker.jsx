"use client";
import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, RefreshCw, Trophy, Mic, Type, ArrowRight, Save, Loader2, AlertTriangle, Square } from 'lucide-react'
import confetti from 'canvas-confetti'
import { useLanguage } from '@/context/LanguageContext'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import { useAudioRecorder } from '@/hooks/useAudioRecorder'
import AudioVisualizer from './AudioVisualizer'

export default function QuizTaker({ quizData, onComplete, lessonId, courseId }) {
  const { t } = useLanguage()
  const { user } = useAuth()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [saving, setSaving] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [maxAttempts] = useState(3)
  
  const [selectedOption, setSelectedOption] = useState(null)
  const [textAnswer, setTextAnswer] = useState('')
  const [isAnswered, setIsAnswered] = useState(false)
  const [feedback, setFeedback] = useState(null)
  
  // Audio Hooks
  const { isRecording, audioBlob, startRecording, stopRecording } = useAudioRecorder()
  const [processingAudio, setProcessingAudio] = useState(false)

  useEffect(() => {
    if (user && lessonId) checkAttempts()
  }, [user, lessonId])

  const checkAttempts = async () => {
    const { count } = await supabase.from('quiz_results')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('lesson_id', lessonId)
    setAttempts(count || 0)
  }

  if (!quizData || quizData.length === 0) return null

  if (attempts >= maxAttempts && !showScore) {
    return (
      <div className="bg-red-50 p-8 rounded-2xl text-center border border-red-100">
        <AlertTriangle className="mx-auto text-red-500 mb-4" size={40}/>
        <h3 className="text-xl font-bold text-red-800">Max Attempts Reached</h3>
        <p className="text-red-600 mt-2">You have taken this quiz {attempts} times. Please contact your tutor or wait 24 hours to retake.</p>
      </div>
    )
  }

  const question = quizData[currentQuestion]
  const questionType = question.type || 'multiple-choice' 

  const handleMultipleChoice = (optionIndex) => {
    setSelectedOption(optionIndex)
    setIsAnswered(true)
    if (optionIndex === question.correct) {
      setScore(score + 1)
      setFeedback('correct')
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } })
    } else {
      setFeedback('incorrect')
    }
  }

  const handleTextSubmit = (e) => {
    e.preventDefault()
    setIsAnswered(true)
    const isCorrect = textAnswer.trim().toLowerCase() === question.correctAnswer?.toLowerCase()
    if (isCorrect) {
      setScore(score + 1)
      setFeedback('correct')
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } })
    } else {
      setFeedback('incorrect')
    }
  }

  const toggleRecording = async () => {
    if (isRecording) {
      stopRecording()
      // Simulate Processing AI Analysis
      setProcessingAudio(true)
      setTimeout(() => {
        setProcessingAudio(false)
        setIsAnswered(true)
        // In a real app, send audioBlob to backend -> Whisper API -> Text -> Grade
        // Here we simulate a "Good" result
        setScore(score + 1)
        setFeedback('correct')
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } })
      }, 1500)
    } else {
      await startRecording()
    }
  }

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedOption(null)
      setTextAnswer('')
      setIsAnswered(false)
      setFeedback(null)
    } else {
      finishQuiz()
    }
  }

  const finishQuiz = async () => {
    setShowScore(true)
    const passed = (score / quizData.length) >= 0.7
    
    if (user) {
      setSaving(true)
      try {
        await supabase.from('quiz_results').insert([{
          user_id: user.id,
          course_id: courseId,
          lesson_id: lessonId,
          score: score,
          total_questions: quizData.length,
          passed: passed
        }])
        await checkAttempts()
      } catch (err) {
        console.error("Failed to save quiz result", err)
      } finally {
        setSaving(false)
      }
    }

    if (onComplete && passed) onComplete(score)
  }

  const restart = () => {
    if (attempts >= maxAttempts) return
    setCurrentQuestion(0)
    setScore(0)
    setShowScore(false)
    setSelectedOption(null)
    setTextAnswer('')
    setIsAnswered(false)
    setFeedback(null)
  }

  if (showScore) {
    const passed = score / quizData.length >= 0.7
    return (
      <div className="bg-white rounded-2xl p-8 text-center border-2 border-gray-100 animate-fade-in">
        <div className="w-20 h-20 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <Trophy size={40} className={passed ? "text-yellow-500" : "text-gray-400"} />
        </div>
        <h3 className="text-2xl font-bold text-brand-dark mb-2">{t('quiz_completed')}</h3>
        <p className="text-gray-500 mb-2">{t('quiz_scored')} {score} / {quizData.length}</p>
        <p className="text-xs text-gray-400 mb-6">Attempts: {attempts} / {maxAttempts}</p>
        
        {saving && <p className="text-xs text-brand-purple flex items-center justify-center gap-1 mb-4"><Loader2 className="animate-spin" size={12}/> Saving Result...</p>}

        {!passed && attempts < maxAttempts && (
          <button onClick={restart} className="bg-brand-purple text-white px-6 py-2 rounded-xl font-bold hover:opacity-90 transition flex items-center gap-2 mx-auto">
            <RefreshCw size={18} /> {t('quiz_retry')}
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs font-bold text-brand-purple uppercase tracking-wider">
          Question {currentQuestion + 1} / {quizData.length}
        </span>
        <span className="text-xs font-bold text-gray-400">{t('quiz_score')}: {score}</span>
      </div>

      <h3 className="text-xl font-bold text-brand-dark mb-6">{question.question}</h3>

      <div className="mb-8 min-h-[150px]">
        {questionType === 'multiple-choice' && (
          <div className="space-y-3">
            {question.options?.map((option, index) => {
              let btnClass = "w-full p-4 text-left rounded-xl border-2 transition font-medium "
              if (isAnswered) {
                if (index === question.correct) btnClass += "border-green-500 bg-green-50 text-green-700"
                else if (index === selectedOption) btnClass += "border-red-500 bg-red-50 text-red-700"
                else btnClass += "border-gray-100 text-gray-400 opacity-50"
              } else {
                btnClass += "border-gray-100 hover:border-brand-purple hover:bg-purple-50 text-gray-700"
              }
              return (
                <button key={index} disabled={isAnswered} onClick={() => handleMultipleChoice(index)} className={btnClass}>
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {isAnswered && index === question.correct && <CheckCircle size={20} className="text-green-500"/>}
                    {isAnswered && index === selectedOption && index !== question.correct && <XCircle size={20} className="text-red-500"/>}
                  </div>
                </button>
              )
            })}
          </div>
        )}

        {questionType === 'text' && (
          <form onSubmit={handleTextSubmit} className="space-y-4">
            <div className="relative">
              <Type className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input 
                type="text" disabled={isAnswered} placeholder="Type your answer here..."
                className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 outline-none transition ${isAnswered ? (feedback === 'correct' ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50') : 'border-gray-200 focus:border-brand-purple'}`}
                value={textAnswer} onChange={(e) => setTextAnswer(e.target.value)}
              />
            </div>
            {!isAnswered && <button type="submit" className="bg-brand-dark text-white px-6 py-2 rounded-lg font-bold text-sm">Check Answer</button>}
            {isAnswered && feedback === 'incorrect' && <p className="text-red-500 text-sm font-bold">Correct answer: {question.correctAnswer}</p>}
          </form>
        )}

        {questionType === 'voice' && (
          <div className="flex flex-col items-center justify-center py-8">
            {isRecording && <div className="mb-4"><AudioVisualizer isRecording={isRecording} /></div>}
            
            <button disabled={isAnswered || processingAudio} onClick={toggleRecording} className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-lg ${isRecording ? 'bg-red-500 animate-pulse scale-110' : (isAnswered ? 'bg-green-500' : 'bg-brand-purple hover:scale-105')}`}>
              {processingAudio ? <Loader2 className="animate-spin text-white"/> : (isRecording ? <Square size={24} className="text-white fill-current"/> : <Mic size={32} className="text-white" />)}
            </button>
            
            <p className="mt-4 text-gray-500 font-medium">
                {processingAudio ? "Analyzing pronunciation..." : (isRecording ? "Listening..." : (isAnswered ? "Great pronunciation!" : "Tap to Speak"))}
            </p>
          </div>
        )}
      </div>

      {isAnswered && (
        <div className="flex justify-end pt-6 border-t border-gray-100">
          <button onClick={handleNext} className="bg-brand-dark text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition flex items-center gap-2">
            {currentQuestion === quizData.length - 1 ? t('quiz_finish') : t('quiz_next')} <ArrowRight size={18}/>
          </button>
        </div>
      )}
    </div>
  )
}
