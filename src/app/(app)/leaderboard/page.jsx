"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Loader2, Trophy, Medal } from 'lucide-react'

export default function Leaderboard() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      // In a real app, you'd join with a 'user_stats' table.
      // For now, let's mock it or use profiles if they had XP columns.
      // Assuming we added 'xp' to user_stats table in previous steps.
      try {
        const { data } = await supabase.from('user_stats').select('*, profiles(full_name, avatar_url)').order('xp', { ascending: false }).limit(20)
        setUsers(data || [])
      } catch (e) { console.error(e) }
      setLoading(false)
    }
    fetchLeaderboard()
  }, [])

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-brand-purple"/></div>

  return (
    <div className="max-w-3xl mx-auto pb-20">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-brand-dark mb-2 flex items-center justify-center gap-3">
          <Trophy className="text-yellow-500" size={32} /> Hall of Fame
        </h1>
        <p className="text-gray-500">Top learners this month. Keep studying to rise up!</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {users.length === 0 ? (
          <div className="p-10 text-center text-gray-400">No stats available yet. Start learning!</div>
        ) : (
          users.map((user, idx) => (
            <div key={user.user_id} className={`flex items-center gap-4 p-4 md:p-6 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition ${idx < 3 ? 'bg-yellow-50/30' : ''}`}>
              <div className="w-8 text-center font-bold text-gray-400">
                {idx === 0 ? <Medal className="text-yellow-500 mx-auto"/> : idx === 1 ? <Medal className="text-gray-400 mx-auto"/> : idx === 2 ? <Medal className="text-orange-400 mx-auto"/> : `#${idx + 1}`}
              </div>
              <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                <img src={user.profiles?.avatar_url || `https://placehold.co/100?text=${user.profiles?.full_name?.[0]}`} className="w-full h-full object-cover"/>
              </div>
              <div className="flex-1">
                <p className="font-bold text-brand-dark">{user.profiles?.full_name || 'Anonymous'}</p>
                <p className="text-xs text-gray-500">{user.streak} Day Streak 🔥</p>
              </div>
              <div className="text-right">
                <p className="font-black text-brand-purple text-xl">{user.xp} XP</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
