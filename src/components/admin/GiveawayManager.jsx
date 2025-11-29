"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Gift, Loader2, RefreshCw, Trophy } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function GiveawayManager() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [winner, setWinner] = useState(null)
  const [isPicking, setIsPicking] = useState(false)

  useEffect(() => { fetchEntries() }, [])

  const fetchEntries = async () => {
    const { data } = await supabase.from('feedback').select('*, profiles(full_name, email)').eq('is_giveaway_entry', true)
    setEntries(data || [])
    setLoading(false)
  }

  const pickWinner = () => {
    if (entries.length === 0) return alert("No entries yet!")
    setIsPicking(true)
    setWinner(null)
    
    // Animation effect
    let count = 0
    const interval = setInterval(() => {
      setWinner(entries[Math.floor(Math.random() * entries.length)])
      count++
      if (count > 20) {
        clearInterval(interval)
        const finalWinner = entries[Math.floor(Math.random() * entries.length)]
        setWinner(finalWinner)
        setIsPicking(false)
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } })
      }
    }, 100)
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center max-w-2xl mx-auto">
      <div className="w-16 h-16 bg-purple-100 text-brand-purple rounded-full flex items-center justify-center mx-auto mb-6">
        <Gift size={32}/>
      </div>
      <h2 className="text-2xl font-bold text-brand-dark mb-2">Giveaway Randomizer</h2>
      <p className="text-gray-500 mb-8">{entries.length} valid entries found in the database.</p>

      {winner && (
        <div className={`p-6 rounded-2xl border-2 mb-8 transition-all ${isPicking ? 'border-gray-200 bg-gray-50' : 'border-green-500 bg-green-50 scale-105 shadow-xl'}`}>
          <p className="text-sm font-bold text-gray-400 uppercase mb-2">{isPicking ? 'Picking...' : 'The Winner is'}</p>
          <h3 className="text-3xl font-black text-brand-dark mb-1">{winner.profiles?.full_name || 'Unknown'}</h3>
          <p className="text-brand-purple font-mono">{winner.profiles?.email}</p>
          {!isPicking && (
            <div className="mt-4 inline-flex items-center gap-2 text-green-700 font-bold bg-green-100 px-4 py-2 rounded-full text-sm">
              <Trophy size={16}/> Selected Randomly
            </div>
          )}
        </div>
      )}

      <button 
        onClick={pickWinner} 
        disabled={loading || isPicking || entries.length === 0}
        className="btn btn-plum-gradient px-12 py-4 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? <Loader2 className="animate-spin"/> : (isPicking ? 'Rolling...' : 'Pick a Winner!')}
      </button>
    </div>
  )
}
