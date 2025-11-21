import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export function useGamification() {
  const { user } = useAuth()
  const [stats, setStats] = useState({ xp: 0, streak: 0, last_activity: null })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) fetchStats()
  }, [user])

  const fetchStats = async () => {
    try {
      let { data, error } = await supabase.from('user_stats').select('*').eq('user_id', user.id).single()
      
      // If row doesn't exist (old users), create it
      if (!data) {
        const { data: newData } = await supabase.from('user_stats').insert([{ user_id: user.id }]).select().single()
        data = newData
      }
      
      setStats(data)
      checkStreak(data)
    } catch (e) {
      console.error("Gamification fetch error:", e)
    } finally {
      setLoading(false)
    }
  }

  const checkStreak = async (currentStats) => {
    if (!currentStats) return

    const today = new Date().toISOString().split('T')[0]
    const last = currentStats.last_activity
    
    // If already logged today, do nothing
    if (last === today) return

    let newStreak = currentStats.streak
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toISOString().split('T')[0]

    if (last === yesterdayStr) {
      // Continued streak
      newStreak += 1
    } else {
      // Broken streak (or first day)
      newStreak = 1
    }

    // Update DB
    const { error } = await supabase.from('user_stats').update({ 
      streak: newStreak, 
      last_activity: today 
    }).eq('user_id', user.id)

    if (!error) setStats(prev => ({ ...prev, streak: newStreak, last_activity: today }))
  }

  const addXP = async (amount) => {
    const newXP = stats.xp + amount
    setStats(prev => ({ ...prev, xp: newXP }))
    await supabase.from('user_stats').update({ xp: newXP }).eq('user_id', user.id)
  }

  return { stats, addXP, loading }
}
