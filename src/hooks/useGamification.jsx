// PATH: src/hooks/useGamification.jsx

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
      
      if (!data && !error) {}

      if (error) {
        if (error.code === 'PGRST116') {
           const { data: newData, error: insertError } = await supabase
             .from('user_stats')
             .insert([{ user_id: user.id, xp: 0, streak: 0 }])
             .select()
             .single()
           
           if (!insertError && newData) {
             data = newData
           }
        }
      }
      
      if (data) {
        setStats(data)
        checkStreak(data)
      }
    } catch (e) {
      console.error("Gamification error:", e)
    } finally {
      setLoading(false)
    }
  }

  const checkStreak = async (currentStats) => {
    if (!currentStats) return

    const today = new Date().toISOString().split('T')[0]
    const last = currentStats.last_activity
    
    if (last === today) return

    let newStreak = currentStats.streak || 0
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toISOString().split('T')[0]

    if (last === yesterdayStr) {
      newStreak += 1
    } else {
      newStreak = 1
    }

    const { error } = await supabase.from('user_stats').update({ 
      streak: newStreak, 
      last_activity: today 
    }).eq('user_id', user.id)

    if (!error) setStats(prev => ({ ...prev, streak: newStreak, last_activity: today }))
  }

  // --- FIXED FUNCTION HERE ---
  const addXP = async (amount) => {
    let newXP = (stats.xp || 0) + amount
    if (newXP < 0) newXP = 0 // Prevent negative XP
    
    setStats(prev => ({ ...prev, xp: newXP }))
    await supabase.from('user_stats').update({ xp: newXP }).eq('user_id', user.id)
  }

  return { stats, addXP, loading }
}