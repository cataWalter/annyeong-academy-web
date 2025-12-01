"use client";
import { useEffect } from 'react'
import { Trophy, Star, X } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function LevelUpModal({ level, onClose }) {
  useEffect(() => {
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#5E3891', '#4A88B0', '#FFD700']
    })
  }, [])

  return (
    <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl p-10 text-center max-w-sm w-full relative overflow-hidden shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-300 hover:text-gray-600"><X size={24}/></button>
        
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-blue to-brand-purple"></div>
        
        <div className="w-24 h-24 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce">
          <Trophy size={48} className="text-white" fill="currentColor"/>
        </div>
        
        <h2 className="text-3xl font-black text-brand-dark mb-2 uppercase tracking-wide">Level Up!</h2>
        <p className="text-gray-500 mb-6">You reached Level <span className="font-bold text-brand-purple text-xl">{level}</span></p>
        
        <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 mb-8">
          <p className="text-sm text-purple-800 font-bold flex items-center justify-center gap-2">
            <Star size={16} fill="currentColor"/> New Badge Unlocked
          </p>
        </div>

        <button onClick={onClose} className="btn btn-plum-gradient w-full py-3 shadow-lg hover:scale-105 transition">
          Continue Learning
        </button>
      </div>
    </div>
  )
}
