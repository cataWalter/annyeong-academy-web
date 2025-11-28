"use client";

import { useState, useEffect } from 'react'

export function useGamification(userId) {
  // Default mock state
  const [gamification, setGamification] = useState({
    points: 0,
    level: 1,
    streak: 0,
    badges: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) {
        setLoading(false)
        return
    }

    // TODO: Connect to Supabase 'gamification' table here
    // For now, return safe default data so the dashboard loads
    setGamification({
        points: 50,
        level: 1,
        streak: 1,
        badges: []
    })
    setLoading(false)
  }, [userId])

  return { ...gamification, loading }
}
