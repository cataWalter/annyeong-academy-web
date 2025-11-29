"use client";
import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'

export default function SaleCountdown({ endDate }) {
  const [timeLeft, setTimeLeft] = useState(null)

  useEffect(() => {
    if (!endDate) return
    
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = new Date(endDate).getTime() - now
      
      if (distance < 0) {
        clearInterval(interval)
        setTimeLeft(null)
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        
        setTimeLeft(`${days}d ${hours}h ${minutes}m`)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [endDate])

  if (!timeLeft) return null

  return (
    <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1 animate-pulse">
      <Clock size={12} /> Ends in {timeLeft}
    </div>
  )
}
