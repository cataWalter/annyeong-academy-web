import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'
import { Trophy, Medal, User, Loader2, Crown } from 'lucide-react'
import SEO from '../../components/seo/SEO'

export default function Leaderboard() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from('user_stats')
        .select('xp, streak, user_id, profiles(full_name, avatar_url)')
        .order('xp', { ascending: false })
        .limit(20)

      if (error) throw error
      setUsers(data)
    } catch (error) {
      console.error("Error fetching leaderboard:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-brand-purple" /></div>

  return (
    <div className="max-w-3xl mx-auto pb-20">
      <SEO title="Leaderboard" description="See top students." />
      
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-brand-dark flex items-center justify-center gap-3">
          <Trophy className="text-yellow-500 fill-yellow-500" size={32} /> 
          {t('leader_title')}
        </h1>
        <p className="text-gray-500 mt-2">{t('leader_desc')}</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {users.map((entry, index) => {
          const isMe = entry.user_id === user?.id
          const rank = index + 1
          
          let rankIcon = <span className="font-bold text-gray-400 w-6 text-center">{rank}</span>
          if (rank === 1) rankIcon = <Crown className="text-yellow-500 fill-yellow-500 w-6 h-6" />
          if (rank === 2) rankIcon = <Medal className="text-gray-400 fill-gray-300 w-6 h-6" />
          if (rank === 3) rankIcon = <Medal className="text-orange-400 fill-orange-200 w-6 h-6" />

          return (
            <div 
              key={entry.user_id} 
              className={`flex items-center gap-4 p-4 md:p-6 border-b border-gray-50 last:border-0 transition hover:bg-gray-50 ${isMe ? 'bg-purple-50/50' : ''}`}
            >
              <div className="flex-shrink-0 flex justify-center w-8">
                {rankIcon}
              </div>
              
              <div className="relative">
                <div className={`w-12 h-12 rounded-full overflow-hidden bg-gray-200 border-2 ${rank <= 3 ? 'border-yellow-400' : 'border-transparent'}`}>
                  {entry.profiles?.avatar_url ? (
                    <img src={entry.profiles.avatar_url} alt="User" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400"><User size={20} /></div>
                  )}
                </div>
                {rank === 1 && <div className="absolute -top-2 -right-2 text-xl">👑</div>}
              </div>

              <div className="flex-1 min-w-0">
                <p className={`font-bold truncate ${isMe ? 'text-brand-purple' : 'text-brand-dark'}`}>
                  {entry.profiles?.full_name || 'Anonymous Student'} {isMe && '(You)'}
                </p>
                <p className="text-xs text-gray-400 font-medium">{entry.streak} Day Streak 🔥</p>
              </div>

              <div className="text-right">
                <p className="font-black text-lg text-brand-dark">{entry.xp}</p>
                <p className="text-xs text-gray-400 font-bold uppercase">XP</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
