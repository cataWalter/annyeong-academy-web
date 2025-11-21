import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Megaphone, X } from 'lucide-react'

export default function AnnouncementBanner() {
  const [announcement, setAnnouncement] = useState(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const fetchAnnouncement = async () => {
      const { data } = await supabase
        .from('announcements')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false })
        .limit(1)
      
      if (data && data.length > 0) setAnnouncement(data[0])
    }
    fetchAnnouncement()
  }, [])

  if (!announcement || !visible) return null

  const colors = {
    info: 'bg-blue-600',
    warning: 'bg-orange-500',
    success: 'bg-green-600'
  }

  return (
    <div className={`${colors[announcement.type] || colors.info} text-white px-4 py-3 relative shadow-md`}>
      <div className="max-w-7xl mx-auto flex items-start md:items-center gap-3 pr-8">
        <Megaphone size={20} className="flex-shrink-0 mt-0.5 md:mt-0" />
        <div>
          <span className="font-bold mr-2">{announcement.title}:</span>
          <span className="text-sm md:text-base opacity-90">{announcement.message}</span>
        </div>
      </div>
      <button 
        onClick={() => setVisible(false)} 
        className="absolute right-2 top-2 p-1 hover:bg-white/20 rounded-full transition"
      >
        <X size={16} />
      </button>
    </div>
  )
}
