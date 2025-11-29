"use client";
import { useState } from 'react'
import { RotateCw, ChevronLeft, ChevronRight, X } from 'lucide-react'

export default function FlashcardViewer({ terms = [], onClose }) {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  if (!terms || terms.length === 0) return null

  const handleNext = () => {
    setFlipped(false)
    setTimeout(() => setIndex((prev) => (prev + 1) % terms.length), 150)
  }

  const handlePrev = () => {
    setFlipped(false)
    setTimeout(() => setIndex((prev) => (prev - 1 + terms.length) % terms.length), 150)
  }

  const currentCard = terms[index]

  return (
    <div className="fixed inset-0 bg-black/80 z-[70] flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-lg">
        <button onClick={onClose} className="absolute -top-12 right-0 text-white hover:text-gray-300">
          <X size={32} />
        </button>
        
        <div className="perspective-1000 w-full h-80 cursor-pointer" onClick={() => setFlipped(!flipped)}>
          <div className={`relative w-full h-full text-center transition-transform duration-500 transform-style-3d ${flipped ? 'rotate-y-180' : ''}`}>
            
            {/* Front */}
            <div className="absolute inset-0 bg-white rounded-3xl flex flex-col items-center justify-center p-8 backface-hidden shadow-2xl">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Term</span>
              <h3 className="text-4xl font-black text-brand-dark">{currentCard.term}</h3>
              <p className="text-sm text-gray-400 mt-8 animate-pulse">Tap to flip</p>
            </div>

            {/* Back */}
            <div className="absolute inset-0 bg-brand-purple rounded-3xl flex flex-col items-center justify-center p-8 backface-hidden rotate-y-180 text-white shadow-2xl">
              <span className="text-xs font-bold text-white/60 uppercase tracking-widest mb-4">Definition</span>
              <h3 className="text-2xl font-bold">{currentCard.definition}</h3>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-8 text-white">
          <button onClick={handlePrev} className="p-2 hover:bg-white/10 rounded-full transition"><ChevronLeft size={32}/></button>
          <span className="font-bold font-mono">{index + 1} / {terms.length}</span>
          <button onClick={handleNext} className="p-2 hover:bg-white/10 rounded-full transition"><ChevronRight size={32}/></button>
        </div>
      </div>
      
      <style jsx>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  )
}
