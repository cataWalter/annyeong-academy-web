"use client";
import { useState, useEffect } from 'react'
import { RefreshCw, Check, X } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function MatchingGame({ pairs = [], onComplete }) {
  // pairs: [{ id: 1, text: 'Hello', match: 'Annyeong' }, ...]
  const [leftItems, setLeftItems] = useState([])
  const [rightItems, setRightItems] = useState([])
  const [selectedLeft, setSelectedLeft] = useState(null)
  const [selectedRight, setSelectedRight] = useState(null)
  const [matches, setMatches] = useState([]) // Array of IDs
  const [shake, setShake] = useState(null)

  useEffect(() => {
    if (pairs.length > 0) {
      setLeftItems(pairs.map(p => ({ id: p.id, text: p.text })).sort(() => Math.random() - 0.5))
      setRightItems(pairs.map(p => ({ id: p.id, text: p.match })).sort(() => Math.random() - 0.5))
    }
  }, [pairs])

  useEffect(() => {
    if (selectedLeft && selectedRight) {
      if (selectedLeft === selectedRight) {
        // Match!
        setMatches(prev => [...prev, selectedLeft])
        setSelectedLeft(null)
        setSelectedRight(null)
      } else {
        // No match
        setShake({ left: selectedLeft, right: selectedRight })
        setTimeout(() => {
          setSelectedLeft(null)
          setSelectedRight(null)
          setShake(null)
        }, 500)
      }
    }
  }, [selectedLeft, selectedRight])

  useEffect(() => {
    if (pairs.length > 0 && matches.length === pairs.length) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } })
      if(onComplete) onComplete()
    }
  }, [matches])

  if (pairs.length === 0) return null

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <h3 className="text-lg font-bold text-brand-dark mb-6 text-center">Match the pairs!</h3>
      <div className="flex gap-8 justify-between">
        <div className="flex-1 space-y-3">
          {leftItems.map(item => {
            const isMatched = matches.includes(item.id)
            const isSelected = selectedLeft === item.id
            const isShaking = shake?.left === item.id
            return (
              <button 
                key={item.id}
                disabled={isMatched}
                onClick={() => setSelectedLeft(item.id)}
                className={`w-full py-4 px-6 rounded-xl font-bold transition transform ${isMatched ? 'bg-green-100 text-green-700 opacity-50 scale-95' : isSelected ? 'bg-brand-purple text-white scale-105 shadow-md' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'} ${isShaking ? 'animate-shake bg-red-100 text-red-600' : ''}`}
              >
                {item.text}
              </button>
            )
          })}
        </div>
        <div className="flex-1 space-y-3">
          {rightItems.map(item => {
            const isMatched = matches.includes(item.id)
            const isSelected = selectedRight === item.id
            const isShaking = shake?.right === item.id
            return (
              <button 
                key={item.id}
                disabled={isMatched}
                onClick={() => setSelectedRight(item.id)}
                className={`w-full py-4 px-6 rounded-xl font-bold transition transform ${isMatched ? 'bg-green-100 text-green-700 opacity-50 scale-95' : isSelected ? 'bg-brand-purple text-white scale-105 shadow-md' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'} ${isShaking ? 'animate-shake bg-red-100 text-red-600' : ''}`}
              >
                {item.text}
              </button>
            )
          })}
        </div>
      </div>
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.3s ease-in-out; }
      `}</style>
    </div>
  )
}
