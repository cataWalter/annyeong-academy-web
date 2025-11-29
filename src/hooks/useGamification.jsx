"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export function useGamification(userId) {
  const [stats, setStats] = useState({ xp: 0, streak: 0, level: 1 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }
    fetchStats()
    
    // Subscribe to realtime changes
    const channel = supabase
      .channel('gamification')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'user_stats', filter: `user_id=eq.${userId}` }, 
      (payload) => {
        setStats(prev => ({ ...prev, ...payload.new }))
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [userId])

  const fetchStats = async () => {
    try {
      let { data, error } = await supabase.from('user_stats').select('*').eq('user_id', userId).single()
      
      if (error && error.code === 'PGRST116') {
        // User doesn't exist in stats yet, create default
        const { data: newData } = await supabase.from('user_stats').insert([{ user_id: userId, xp: 0, streak: 1, level: 1 }]).select().single()
        data = newData
      }
      
      if (data) setStats(data)
    } catch (error) {
      console.error("Gamification error:", error)
    } finally {
      setLoading(false)
    }
  }

  const addXP = async (amount) => {
    try {
      // Optimistic update
      setStats(prev => ({ ...prev, xp: prev.xp + amount }))
      // Call database function
      await supabase.rpc('increment_xp', { x: amount })
      // Update streak if needed
      await supabase.rpc('update_streak')
    } catch (error) {
      console.error("Failed to add XP:", error)
    }
  }

  return { ...stats, loading, addXP }
}
