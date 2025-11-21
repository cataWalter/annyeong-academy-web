import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export function useGamification() {
  const { user } = useAuth()
  // Initialize with SAFE default values to prevent crashes
  const [stats, setStats] = useState({ xp: 0, streak: 0, last_activity: null })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) fetchStats()
  }, [user])

  const fetchStats = async () => {
    try {
      let { data, error } = await supabase.from('user_stats').select('*').eq('user_id', user.id).single()
      
      // If row doesn't exist (new user), create it safely
      if (!data && !error) { 
         // This block catches the case where query succeeds but returns no rows (if single() wasn't strict)
         // But .single() usually throws error if no rows. 
      }

      if (error) {
        // If row not found (PGRST116), try to create it
        if (error.code === 'PGRST116') {
           const { data: newData, error: insertError } = await supabase
             .from('user_stats')
             .insert([{ user_id: user.id, xp: 0, streak: 0 }])
             .select()
             .single()
           
           if (!insertError && newData) {
             data = newData
           } else {
             console.error("Failed to init user stats:", insertError)
           }
        } else {
           console.error("Gamification fetch error:", error)
        }
      }
      
      if (data) {
        setStats(data)
        checkStreak(data)
      }
    } catch (e) {
      console.error("Gamification unexpected error:", e)
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

    let newStreak = currentStats.streak || 0
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toISOString().split('T')[0]

    if (last === yesterdayStr) {
      newStreak += 1
    } else {
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
    const newXP = (stats.xp || 0) + amount
    setStats(prev => ({ ...prev, xp: newXP }))
    await supabase.from('user_stats').update({ xp: newXP }).eq('user_id', user.id)
  }

  return { stats, addXP, loading }
}
