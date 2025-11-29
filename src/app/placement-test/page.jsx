"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import { Loader2, CheckCircle, ArrowRight, Brain, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function PlacementTest() {
  const { user } = useAuth()
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data } = await supabase.from('placement_questions').select('*').order('created_at', { ascending: true })
      
      if (data && data.length > 0) {
        setQuestions(data)
      } else {
        // Fallback if DB is empty
        setQuestions([
          { id: 1, question: "No questions found in DB. Contact Admin.", options: ["OK"], correct_index: 0, level: 'Beginner' }
        ])
      }
      setLoading(false)
    }
    fetchQuestions()
  }, [])

  const handleAnswer = (optionIndex) => {
    setAnswers({ ...answers, [currentQ]: optionIndex })
  }

  const handleNext = async () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1)
    } else {
      calculateResult()
    }
  }

  const calculateResult = async () => {
    let score = 0
    questions.forEach((q, i) => {
      if (answers[i] === q.correct_index) score++
    })
    
    // Simple logic: > 80% = Advanced, > 50% = Intermediate, else Beginner
    const percentage = score / questions.length
    let level = 'Beginner'
    if (percentage > 0.8) level = 'Advanced'
    else if (percentage > 0.5) level = 'Intermediate'

    setResult({ score, level, total: questions.length })

    if (user) {
      await supabase.from('placement_results').insert([{ user_id: user.id, score, recommended_level: level }])
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FC]">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          {!result ? (
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 min-h-[400px] flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-brand-purple/10 p-2 rounded-xl text-brand-purple"><Brain size={24}/></div>
                <h1 className="text-2xl font-bold text-brand-dark">Placement Test</h1>
              </div>

              {loading ? (
                <div className="flex-1 flex items-center justify-center"><Loader2 className="animate-spin text-brand-purple" size={40} /></div>
              ) : (
                <>
                  <div className="mb-6">
                    <div className="flex justify-between text-xs font-bold text-gray-400 mb-2 uppercase">
                      <span>Question {currentQ + 1} of {questions.length}</span>
                      <span>{Math.round(((currentQ + 1) / questions.length) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-brand-purple h-2 rounded-full transition-all duration-300" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}></div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-6">{questions[currentQ].question}</h3>

                  <div className="space-y-3 mb-8 flex-1">
                    {questions[currentQ].options && questions[currentQ].options.map((opt, idx) => (
                      <button 
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        className={`w-full p-4 text-left rounded-xl border-2 transition font-medium ${answers[currentQ] === idx ? 'border-brand-purple bg-purple-50 text-brand-purple' : 'border-gray-100 hover:border-gray-300 text-gray-600'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-end pt-4 border-t border-gray-50">
                    <button 
                      onClick={handleNext} 
                      disabled={answers[currentQ] === undefined}
                      className="bg-brand-dark text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {currentQ === questions.length - 1 ? 'Finish' : 'Next'} <ArrowRight size={18}/>
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="bg-white p-10 rounded-3xl shadow-lg border-t-4 border-green-500 text-center animate-fade-in">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-brand-dark mb-2">Test Completed!</h2>
              <p className="text-gray-500 mb-6">You scored {result.score} out of {result.total}</p>
              
              <div className="bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-100">
                <p className="text-sm font-bold text-gray-400 uppercase mb-1">Recommended Level</p>
                <p className="text-3xl font-black text-brand-purple">{result.level}</p>
                <p className="text-sm text-gray-500 mt-2">Based on your score, we recommend starting with {result.level} courses.</p>
              </div>

              <Link href={`/corsi?level=${result.level}`} className="btn btn-plum-gradient inline-flex items-center gap-2 px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition">
                Browse {result.level} Courses <ArrowRight size={18}/>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
