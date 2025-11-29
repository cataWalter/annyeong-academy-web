"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import { Loader2, MessageCircle, User } from 'lucide-react'
import ChatWindow from '@/components/ui/ChatWindow'

export default function Inbox() {
  const { user } = useAuth()
  const [conversations, setConversations] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeChat, setActiveChat] = useState(null)

  useEffect(() => {
    if(user) fetchConversations()
  }, [user])

  const fetchConversations = async () => {
    // This is a simplified logic. In a real app, you'd perform a complex join or have a separate 'conversations' table.
    // Here we fetch all messages and group them by the OTHER user.
    const { data } = await supabase.from('direct_messages').select('*').or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
    
    if (data) {
      const grouped = {}
      data.forEach(msg => {
        const otherId = msg.sender_id === user.id ? msg.receiver_id : msg.sender_id
        if (!grouped[otherId]) grouped[otherId] = { id: otherId, lastMsg: msg, count: 0 }
        grouped[otherId].lastMsg = new Date(msg.created_at) > new Date(grouped[otherId].lastMsg.created_at) ? msg : grouped[otherId].lastMsg
        grouped[otherId].count++
      })
      
      // Fetch names for these IDs
      const userIds = Object.keys(grouped)
      if (userIds.length > 0) {
        // Try profiles first, then tutors
        const { data: profiles } = await supabase.from('profiles').select('id, full_name, avatar_url').in('id', userIds)
        const { data: tutors } = await supabase.from('tutors').select('id, name, image_url').in('id', userIds)
        
        const map = {}
        profiles?.forEach(p => map[p.id] = { name: p.full_name, avatar: p.avatar_url })
        tutors?.forEach(t => map[t.id] = { name: t.name, avatar: t.image_url }) // Tutors overwrite profiles if duplicate

        setConversations(Object.values(grouped).map(c => ({
          ...c,
          name: map[c.id]?.name || 'Unknown User',
          avatar: map[c.id]?.avatar
        })).sort((a,b) => new Date(b.lastMsg.created_at) - new Date(a.lastMsg.created_at)))
      }
    }
    setLoading(false)
  }

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-brand-purple"/></div>

  return (
    <div className="max-w-4xl mx-auto pb-20 relative">
      <h1 className="text-3xl font-bold text-brand-dark mb-8 flex items-center gap-3"><MessageCircle className="text-blue-500"/> Messages</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {conversations.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <p>No messages yet.</p>
            <p className="text-sm mt-2">Visit a Tutor profile to start a conversation!</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {conversations.map(convo => (
              <div 
                key={convo.id} 
                onClick={() => setActiveChat({ id: convo.id, name: convo.name })}
                className="p-6 flex items-center gap-4 hover:bg-gray-50 cursor-pointer transition"
              >
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                  {convo.avatar ? <img src={convo.avatar} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><User size={20} className="text-gray-400"/></div>}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-gray-800">{convo.name}</h4>
                    <span className="text-xs text-gray-400">{new Date(convo.lastMsg.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-1">
                    {convo.lastMsg.sender_id === user.id ? 'You: ' : ''}{convo.lastMsg.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {activeChat && <ChatWindow partnerId={activeChat.id} partnerName={activeChat.name} onClose={() => setActiveChat(null)} />}
    </div>
  )
}
