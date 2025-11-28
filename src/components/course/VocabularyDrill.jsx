"use client";
import { useState, useEffect } from 'react'
import { RefreshCw, Check, X } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function VocabularyDrill({ description }) {
  const { t } = useLanguage()
  const [vocab, setVocab] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showTranslation, setShowTranslation] = useState(false)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    const regex = /\[\[VOCAB::(.*?)\|(.*?)\]\]/g
    const matches = []
    let match
    while ((match = regex.exec(description)) !== null) {
      matches.push({ term: match[1], definition: match[2] })
    }
    setVocab(matches)
    setCurrentIndex(0)
    setFinished(false)
    setShowTranslation(false)
  }, [description])

  const handleNext = () => {
    setShowTranslation(false)
    if (currentIndex < vocab.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setFinished(true)
    }
  }

  const reset = () => {
    setCurrentIndex(0)
    setFinished(false)
    setShowTranslation(false)
  }

  if (vocab.length === 0) return null

  if (finished) {
    return (
      <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl p-6 text-center text-white shadow-lg mb-6">
        <div className="text-4xl mb-2">🎉</div>
        <h3 className="font-bold text-xl mb-4">{t('vocab_complete')}</h3>
        <button onClick={reset} className="bg-white text-brand-purple px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition flex items-center gap-2 mx-auto">
          <RefreshCw size={16} /> {t('vocab_retry')}
        </button>
      </div>
    )
  }

  const currentCard = vocab[currentIndex]

  return (
    <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 mb-6 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-100">
        <div className="h-1 bg-brand-purple transition-all duration-300" style={{ width: `${((currentIndex + 1) / vocab.length) * 100}%` }}></div>
      </div>
      
      <div className="flex justify-between items-center mb-8 text-xs font-bold text-gray-400 uppercase tracking-wider">
        <span>{t('vocab_title')}</span>
        <span>{currentIndex + 1} / {vocab.length}</span>
      </div>

      <div className="h-32 flex flex-col items-center justify-center cursor-pointer mb-6 perspective-1000" onClick={() => setShowTranslation(!showTranslation)}>
        <h2 className="text-3xl font-bold text-brand-dark mb-2">{currentCard.term}</h2>
        <p className={`text-xl text-brand-blue font-medium transition-all duration-300 ${showTranslation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {currentCard.definition}
        </p>
        {!showTranslation && <p className="text-xs text-gray-400 mt-4 animate-bounce">{t('vocab_reveal')}</p>}
      </div>

      {showTranslation && (
        <div className="flex gap-3">
          <button onClick={handleNext} className="flex-1 bg-red-50 text-red-600 py-3 rounded-xl font-bold hover:bg-red-100 transition flex justify-center items-center gap-2">
            <X size={18} /> {t('vocab_hard')}
          </button>
          <button onClick={handleNext} className="flex-1 bg-green-50 text-green-600 py-3 rounded-xl font-bold hover:bg-green-100 transition flex justify-center items-center gap-2">
            <Check size={18} /> {t('vocab_easy')}
          </button>
        </div>
      )}
    </div>
  )
}
