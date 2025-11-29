"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import { Loader2, CheckCircle, ArrowRight, Brain, Timer, AlertOctagon, Mic, Square, RefreshCcw } from 'lucide-react'
import Link from 'next/link'
import confetti from 'canvas-confetti'

export default function PlacementTest() {
  const { user } = useAuth()
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)
  const [alreadyTaken, setAlreadyTaken] = useState(false)
  const [timeLeft, setTimeLeft] = useState(600)
  const [isRecording, setIsRecording] = useState(false)

  useEffect(() => {
    if(user) checkHistory()
    fetchQuestions()
  }, [user])

  useEffect(() => {
    if (!loading && !result && !alreadyTaken && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000)
      return () => clearInterval(timer)
    } else if (timeLeft === 0 && !result) {
      calculateResult()
    }
  }, [loading, result, alreadyTaken, timeLeft])

  const checkHistory = async () => {
    const { data } = await supabase.from('placement_results').select('score').eq('user_id', user.id).limit(1)
    if(data && data.length > 0) setAlreadyTaken(true)
  }

  const fetchQuestions = async () => {
    const { data } = await supabase.from('placement_questions').select('*').order('created_at', { ascending: true })
    if (data && data.length > 0) {
      setQuestions(data)
    } else {
      setQuestions([
        { id: 1, type: 'multiple-choice', question: "Select the correct greeting.", options: ["Annyeong", "Gamsahamnida"], correct_index: 0, level: 'Beginner' }
      ])
    }
    setLoading(false)
  }

  const handleMCAnswer = (optionIndex) => setAnswers({ ...answers, [currentQ]: { type: 'multiple-choice', value: optionIndex } })
  const handleTextAnswer = (text) => setAnswers({ ...answers, [currentQ]: { type: 'text', value: text } })
  const handleVoiceRecord = () => { setIsRecording(!isRecording); if(isRecording) setAnswers({ ...answers, [currentQ]: { type: 'voice', value: 'recorded' } }) }

  const handleNext = async () => {
    if (currentQ < questions.length - 1) setCurrentQ(currentQ + 1)
    else calculateResult()
  }

  const calculateResult = async () => {
    let score = 0
    let total = 0
    questions.forEach((q, i) => {
      if (answers[i]?.value === q.correct_index || answers[i]?.type === 'voice') score++
      total++
    })
    const percentage = score / (total || 1)
    let level = percentage > 0.8 ? 'Advanced' : (percentage > 0.5 ? 'Intermediate' : 'Beginner')

    setResult({ score, level, total })
    if (user) {
      // Upsert: Overwrite previous result for this user to allow "taking latest score"
      // Note: Table constraints might need handling if PK is id. We just insert new row in this simple logic.
      await supabase.from('placement_results').insert([{ user_id: user.id, score, recommended_level: level }])
    }
    confetti()
  }

  const retakeTest = async () => {
    if(!confirm("Retake the test? Your previous score will be superseded.")) return
    // Logic: Delete old results
    if (user) await supabase.from('placement_results').delete().eq('user_id', user.id)
    setAlreadyTaken(false)
    setResult(null)
    setCurrentQ(0)
    setAnswers({})
    setTimeLeft(600)
  }

  if(alreadyTaken && !result) return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FC]">
      <Navbar /><main className="flex-grow pt-32 pb-20 px-4 flex items-center justify-center">
        <div className="bg-white p-10 rounded-3xl shadow-lg text-center max-w-md">
          <AlertOctagon size={48} className="mx-auto text-orange-500 mb-4"/>
          <h2 className="text-2xl font-bold text-brand-dark mb-2">Test Already Taken</h2>
          <p className="text-gray-500 mb-6">You have completed your assessment.</p>
          <div className="flex gap-4 justify-center">
             <Link href="/corsi" className="btn btn-plum-gradient px-6 py-2">Browse Courses</Link>
             <button onClick={retakeTest} className="px-6 py-2 border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 flex items-center gap-2 font-bold"><RefreshCcw size={16}/> Retake</button>
          </div>
        </div>
      </main><Footer />
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FC]">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          {!result ? (
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 min-h-[400px] flex flex-col">
              {loading ? <Loader2 className="animate-spin m-auto"/> : (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-bold text-brand-purple">Q {currentQ + 1}/{questions.length}</span>
                    <span className="bg-gray-100 px-3 py-1 rounded-full font-mono text-sm">{Math.floor(timeLeft/60)}:{(timeLeft%60).toString().padStart(2,'0')}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-6">{questions[currentQ]?.question}</h3>
                  <div className="flex-1 space-y-3">
                    {questions[currentQ]?.options?.map((opt, i) => (
                      <button key={i} onClick={() => handleMCAnswer(i)} className={`w-full p-4 rounded-xl border-2 text-left font-medium ${answers[currentQ]?.value === i ? 'border-brand-purple bg-purple-50 text-brand-purple' : 'border-gray-100'}`}>{opt}</button>
                    ))}
                    {questions[currentQ]?.type === 'text' && <textarea className="w-full border p-4 rounded-xl" onChange={e => handleTextAnswer(e.target.value)} />}
                    {questions[currentQ]?.type === 'voice' && <button onClick={handleVoiceRecord} className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-brand-purple'} text-white`}><Mic/></button>}
                  </div>
                  <div className="mt-6 text-right"><button onClick={handleNext} disabled={!answers[currentQ]} className="btn btn-plum-gradient px-8 py-2 disabled:opacity-50">Next</button></div>
                </>
              )}
            </div>
          ) : (
            <div className="bg-white p-10 rounded-3xl shadow-lg text-center animate-fade-in">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4"/>
              <h2 className="text-3xl font-bold mb-2">Result: {result.level}</h2>
              <p className="text-gray-500 mb-6">Score: {result.score}/{result.total}</p>
              <Link href={`/corsi?level=${result.level}`} className="btn btn-plum-gradient px-8 py-3">View Recommended Courses</Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
