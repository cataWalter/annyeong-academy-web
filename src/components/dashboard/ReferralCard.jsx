"use client";
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Gift, Copy, Check, Users } from 'lucide-react'

export default function ReferralCard() {
  const { user } = useAuth()
  const [copied, setCopied] = useState(false)

  const referralLink = typeof window !== 'undefined' ? `${window.location.origin}/register?ref=${user?.id}` : ''

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden animate-slide-up">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Gift size={120} />
      </div>
      
      <div className="relative z-10">
        <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
          <Users size={20}/> Invite Friends
        </h3>
        <p className="text-purple-100 text-sm mb-6 max-w-xs">
          Share the love of learning! For every friend who joins, you both get <span className="font-bold text-yellow-300">100 XP</span> boost.
        </p>

        <div className="bg-white/10 backdrop-blur-md p-1 rounded-xl flex items-center border border-white/20">
          <input 
            readOnly 
            value={referralLink} 
            className="bg-transparent border-none outline-none text-xs text-white px-3 flex-1 font-mono truncate"
          />
          <button 
            onClick={copyToClipboard}
            className="bg-white text-purple-600 p-2 rounded-lg hover:bg-purple-50 transition flex-shrink-0"
          >
            {copied ? <Check size={16}/> : <Copy size={16}/>}
          </button>
        </div>
      </div>
    </div>
  )
}
