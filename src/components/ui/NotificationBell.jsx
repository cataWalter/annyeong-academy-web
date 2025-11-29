"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Bell } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function NotificationBell() {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState([])
  const [open, setOpen] = useState(false)
  const unreadCount = notifications.filter(n => !n.is_read).length

  useEffect(() => {
    if (!user) return
    
    // Initial fetch
    const fetchNotifs = async () => {
      const { data } = await supabase.from('notifications').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(10)
      setNotifications(data || [])
    }
    fetchNotifs()

    // Real-time subscription
    const channel = supabase
      .channel('notifs')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.id}` }, 
      (payload) => {
        setNotifications(prev => [payload.new, ...prev])
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [user])

  const markRead = async () => {
    if (unreadCount > 0) {
      await supabase.from('notifications').update({ is_read: true }).eq('user_id', user.id).eq('is_read', false)
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })))
    }
  }

  return (
    <div className="relative">
      <button 
        onClick={() => { setOpen(!open); if(!open) markRead(); }}
        className="relative p-2 text-gray-500 hover:text-brand-purple transition"
      >
        <Bell size={22} />
        {unreadCount > 0 && <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)}></div>
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-slide-up origin-top-right">
            <div className="p-4 border-b border-gray-50 font-bold text-gray-700 bg-gray-50/50">Notifications</div>
            <div className="max-h-[300px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-400 text-sm">No new notifications.</div>
              ) : (
                notifications.map(n => (
                  <div key={n.id} className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition ${!n.is_read ? 'bg-blue-50/30' : ''}`}>
                    <p className="font-bold text-sm text-gray-800">{n.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{n.message}</p>
                    <p className="text-[10px] text-gray-400 mt-2">{new Date(n.created_at).toLocaleDateString()}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
