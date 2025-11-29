"use client";
import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import { Send, Loader2, User } from 'lucide-react'

export default function ChatWindow({ partnerId, partnerName, onClose }) {
  const { user } = useAuth()
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [sending, setSending] = useState(false)
  const scrollRef = useRef()

  useEffect(() => {
    if (!user || !partnerId) return

    // 1. Fetch initial history
    const fetchHistory = async () => {
      const { data } = await supabase.from('direct_messages')
        .select('*')
        .or(`and(sender_id.eq.${user.id},receiver_id.eq.${partnerId}),and(sender_id.eq.${partnerId},receiver_id.eq.${user.id})`)
        .order('created_at', { ascending: true })
      
      setMessages(data || [])
      scrollToBottom()
    }
    fetchHistory()

    // 2. Subscribe to new messages
    const channel = supabase.channel(`chat:${user.id}-${partnerId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'direct_messages' }, 
      (payload) => {
        const msg = payload.new
        if ((msg.sender_id === partnerId && msg.receiver_id === user.id) || 
            (msg.sender_id === user.id && msg.receiver_id === partnerId)) {
          setMessages(prev => [...prev, msg])
          scrollToBottom()
        }
      })
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [user, partnerId])

  const scrollToBottom = () => {
    setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: "smooth" }), 100)
  }

  const handleSend = async (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return
    setSending(true)
    
    await supabase.from('direct_messages').insert([{
      sender_id: user.id,
      receiver_id: partnerId,
      content: newMessage
    }])
    
    setNewMessage('')
    setSending(false)
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 overflow-hidden animate-slide-up">
      {/* Header */}
      <div className="bg-brand-dark text-white p-4 flex justify-between items-center cursor-pointer" onClick={onClose}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"><User size={16}/></div>
          <span className="font-bold">{partnerName || 'Chat'}</span>
        </div>
        <button className="text-white/50 hover:text-white">✕</button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
        {messages.map(msg => {
          const isMe = msg.sender_id === user.id
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${isMe ? 'bg-brand-purple text-white rounded-br-none' : 'bg-white text-gray-700 border border-gray-100 rounded-bl-none shadow-sm'}`}>
                {msg.content}
              </div>
            </div>
          )
        })}
        <div ref={scrollRef}></div>
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex gap-2">
        <input 
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-purple"
          placeholder="Type a message..."
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
        />
        <button disabled={sending} className="bg-brand-purple text-white p-2 rounded-full hover:bg-brand-dark transition">
          {sending ? <Loader2 size={18} className="animate-spin"/> : <Send size={18}/>}
        </button>
      </form>
    </div>
  )
}
