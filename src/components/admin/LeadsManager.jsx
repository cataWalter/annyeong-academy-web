"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import { Trash2, Mail, Users, AlertTriangle, Download, Send, X, Megaphone } from 'lucide-react'
import { downloadCSV } from '@/utils/csvExport'

export default function LeadsManager() {
  const { user } = useAuth()
  const [leads, setLeads] = useState([])
  const [messages, setMessages] = useState([])
  const [view, setView] = useState('leads')
  const [replyingTo, setReplyingTo] = useState(null)
  const [replyBody, setReplyBody] = useState('')
  const [broadcasting, setBroadcasting] = useState(false)

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    const { data: l } = await supabase.from('webinar_leads').select('*').order('created_at', { ascending: false })
    setLeads(l || [])
    
    const { data: m } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false })
    setMessages(m || [])
  }

  const handleDelete = async (table, id) => {
    if(!confirm("Delete this record?")) return
    await supabase.from(table).delete().eq('id', id)
    fetchData()
  }

  const handleSendReply = async () => {
    if(!replyBody) return
    await supabase.from('admin_email_logs').insert([{
      admin_id: user.id,
      recipient_email: replyingTo.email,
      subject: `Re: ${replyingTo.message ? 'Your Message' : 'Webinar Info'}`,
      body: replyBody
    }])
    alert(`Reply sent to ${replyingTo.email}`)
    setReplyingTo(null)
    setReplyBody('')
  }

  const handleBroadcast = async () => {
    if(!replyBody) return
    const confirmed = confirm(`Send this email to ALL ${leads.length} leads?`)
    if(!confirmed) return

    // Log broadcast
    await supabase.from('admin_email_logs').insert([{
      admin_id: user.id,
      recipient_email: 'ALL_LEADS',
      subject: 'Broadcast: Webinar Update',
      body: replyBody
    }])
    
    alert(`Broadcast queued for ${leads.length} recipients.`)
    setBroadcasting(false)
    setReplyBody('')
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8 relative">
      {(replyingTo || broadcasting) && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl animate-fade-in border-t-8 border-brand-purple">
            <div className="flex justify-between items-center mb-4 border-b pb-4">
              <h3 className="font-bold text-lg flex items-center gap-2">
                {broadcasting ? <><Megaphone size={20}/> Broadcast to All</> : `Reply to ${replyingTo.name || replyingTo.full_name}`}
              </h3>
              <button onClick={() => {setReplyingTo(null); setBroadcasting(false)}}><X className="text-gray-400 hover:text-gray-600"/></button>
            </div>
            
            {broadcasting && <div className="bg-yellow-50 p-3 rounded-lg mb-4 text-sm text-yellow-800 font-bold">⚠️ You are about to email {leads.length} people.</div>}
            
            {!broadcasting && (
              <div className="bg-gray-50 p-3 rounded-lg mb-4 text-xs text-gray-500 italic max-h-24 overflow-y-auto">
                "{replyingTo.message || 'Webinar Registration'}"
              </div>
            )}
            
            <textarea 
              className="w-full p-4 border rounded-xl h-40 mb-4 focus:ring-2 focus:ring-brand-purple outline-none"
              placeholder={broadcasting ? "Write your newsletter/update here..." : "Type your email reply here..."}
              value={replyBody}
              onChange={e => setReplyBody(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => {setReplyingTo(null); setBroadcasting(false)}} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
              <button onClick={broadcasting ? handleBroadcast : handleSendReply} className="btn btn-plum-gradient px-6 py-2 flex items-center gap-2">
                <Send size={16}/> {broadcasting ? 'Send Broadcast' : 'Send Email'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="lg:col-span-1 space-y-2">
        <button onClick={() => setView('leads')} className={`w-full p-4 rounded-xl text-left flex items-center gap-3 transition ${view === 'leads' ? 'bg-brand-purple text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
          <Users size={20}/>
          <div className="flex-1"><p className="font-bold">Webinar Leads</p><p className="text-xs opacity-80">{leads.length} Registered</p></div>
        </button>
        <button onClick={() => setView('messages')} className={`w-full p-4 rounded-xl text-left flex items-center gap-3 transition ${view === 'messages' ? 'bg-brand-blue text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
          <Mail size={20}/>
          <div className="flex-1"><p className="font-bold">Messages & Reports</p><p className="text-xs opacity-80">{messages.length} Inbox</p></div>
        </button>
      </div>

      <div className="lg:col-span-2">
        {view === 'leads' ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 font-bold text-gray-700 flex justify-between items-center">
              <span>Webinar Registrations</span>
              <div className="flex gap-2">
                <button onClick={() => setBroadcasting(true)} className="text-xs flex items-center gap-1 bg-purple-50 text-brand-purple px-3 py-1.5 rounded-lg hover:bg-purple-100 font-bold"><Megaphone size={14}/> Broadcast</button>
                <button onClick={() => downloadCSV(leads, 'webinar_leads')} className="text-xs flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1.5 rounded-lg hover:bg-green-100 font-bold"><Download size={14}/> Export</button>
              </div>
            </div>
            <div className="max-h-[500px] overflow-y-auto">
              {leads.map(lead => (
                <div key={lead.id} className="p-4 border-b border-gray-50 flex justify-between items-center hover:bg-gray-50">
                  <div><p className="font-bold text-gray-800">{lead.full_name}</p><p className="text-xs text-gray-500">{lead.email}</p></div>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setReplyingTo(lead)} className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg"><Mail size={16}/></button>
                    <button onClick={() => handleDelete('webinar_leads', lead.id)} className="text-gray-300 hover:text-red-500"><Trash2 size={16}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map(msg => (
              <div key={msg.id} className={`bg-white p-5 rounded-2xl shadow-sm border ${msg.email === 'system@report.com' ? 'border-l-4 border-l-red-500' : 'border-gray-100'}`}>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    {msg.email === 'system@report.com' && <AlertTriangle size={16} className="text-red-500"/>}
                    <span className="font-bold text-gray-800">{msg.name}</span>
                    <span className="text-xs text-gray-400">• {new Date(msg.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setReplyingTo(msg)} className="text-blue-500 hover:bg-blue-50 p-1.5 rounded"><Mail size={16}/></button>
                    <button onClick={() => handleDelete('contact_messages', msg.id)} className="text-gray-300 hover:text-red-500 p-1.5 rounded"><Trash2 size={16}/></button>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-2">{msg.email}</p>
                <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{msg.message}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
