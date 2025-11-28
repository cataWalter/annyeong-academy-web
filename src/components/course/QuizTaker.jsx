"use client";
import { useState } from 'react'
import { CheckCircle, XCircle, RefreshCw, Trophy } from 'lucide-react'
import confetti from 'canvas-confetti'
import { useLanguage } from '@/context/LanguageContext'

export default function QuizTaker({ quizData, onComplete }) {
  const { t } = useLanguage()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const [isAnswered, setIsAnswered] = useState(false)

  if (!quizData || quizData.length === 0) return null

  const handleAnswer = (optionIndex) => {
    setSelectedOption(optionIndex)
    setIsAnswered(true)
    if (optionIndex === quizData[currentQuestion].correct) {
      setScore(score + 1)
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } })
    }
  }

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedOption(null)
      setIsAnswered(false)
    } else {
      setShowScore(true)
      if (onComplete) onComplete(score)
    }
  }

  const restart = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowScore(false)
    setSelectedOption(null)
    setIsAnswered(false)
  }

  if (showScore) {
    const passed = score / quizData.length >= 0.7
    return (
      <div className="bg-white rounded-2xl p-8 text-center border-2 border-gray-100">
        <div className="w-20 h-20 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <Trophy size={40} className={passed ? "text-yellow-500" : "text-gray-400"} />
        </div>
        <h3 className="text-2xl font-bold text-brand-dark mb-2">{t('quiz_completed')}</h3>
        <p className="text-gray-500 mb-6">{t('quiz_scored')} {score} / {quizData.length}</p>
        <button onClick={restart} className="bg-brand-purple text-white px-6 py-2 rounded-xl font-bold hover:opacity-90 transition flex items-center gap-2 mx-auto">
          <RefreshCw size={18} /> {t('quiz_retry')}
        </button>
      </div>
    )
  }

  const question = quizData[currentQuestion]

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs font-bold text-brand-purple uppercase tracking-wider">
          {t('quiz_question')} {currentQuestion + 1} / {quizData.length}
        </span>
        <span className="text-xs font-bold text-gray-400">{t('quiz_score')}: {score}</span>
      </div>

      <h3 className="text-xl font-bold text-brand-dark mb-6">{question.question}</h3>

      <div className="space-y-3 mb-8">
        {question.options.map((option, index) => {
          let btnClass = "w-full p-4 text-left rounded-xl border-2 transition font-medium "
          if (isAnswered) {
            if (index === question.correct) btnClass += "border-green-500 bg-green-50 text-green-700"
            else if (index === selectedOption) btnClass += "border-red-500 bg-red-50 text-red-700"
            else btnClass += "border-gray-100 text-gray-400"
          } else {
            btnClass += "border-gray-100 hover:border-brand-purple hover:bg-purple-50 text-gray-700"
          }

          return (
            <button key={index} disabled={isAnswered} onClick={() => handleAnswer(index)} className={btnClass}>
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {isAnswered && index === question.correct && <CheckCircle size={20} className="text-green-500"/>}
                {isAnswered && index === selectedOption && index !== question.correct && <XCircle size={20} className="text-red-500"/>}
              </div>
            </button>
          )
        })}
      </div>

      {isAnswered && (
        <div className="flex justify-end">
          <button onClick={handleNext} className="bg-brand-dark text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition">
            {currentQuestion === quizData.length - 1 ? t('quiz_finish') : t('quiz_next')}
          </button>
        </div>
      )}
    </div>
  )
}
