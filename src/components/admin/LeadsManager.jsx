"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Trash2, Mail, Users, AlertTriangle, Download } from 'lucide-react'
import { downloadCSV } from '@/utils/csvExport'

export default function LeadsManager() {
  const [leads, setLeads] = useState([])
  const [messages, setMessages] = useState([])
  const [view, setView] = useState('leads')

  useEffect(() => {
    fetchData()
  }, [])

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

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 space-y-2">
        <button 
          onClick={() => setView('leads')}
          className={`w-full p-4 rounded-xl text-left flex items-center gap-3 transition ${view === 'leads' ? 'bg-brand-purple text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
        >
          <Users size={20}/>
          <div className="flex-1">
            <p className="font-bold">Webinar Leads</p>
            <p className="text-xs opacity-80">{leads.length} Registered</p>
          </div>
        </button>

        <button 
          onClick={() => setView('messages')}
          className={`w-full p-4 rounded-xl text-left flex items-center gap-3 transition ${view === 'messages' ? 'bg-brand-blue text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
        >
          <Mail size={20}/>
          <div className="flex-1">
            <p className="font-bold">Messages & Reports</p>
            <p className="text-xs opacity-80">{messages.length} Inbox</p>
          </div>
        </button>
      </div>

      <div className="lg:col-span-2">
        {view === 'leads' ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 font-bold text-gray-700 flex justify-between items-center">
              <span>Webinar Registrations</span>
              <button onClick={() => downloadCSV(leads, 'webinar_leads')} className="text-xs flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1.5 rounded-lg hover:bg-green-100 font-bold">
                <Download size={14}/> Export CSV
              </button>
            </div>
            <div className="max-h-[500px] overflow-y-auto">
              {leads.map(lead => (
                <div key={lead.id} className="p-4 border-b border-gray-50 flex justify-between items-center hover:bg-gray-50">
                  <div>
                    <p className="font-bold text-gray-800">{lead.full_name}</p>
                    <p className="text-xs text-gray-500">{lead.email}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-bold">{lead.webinar_date || 'Dec 14'}</span>
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
                  <button onClick={() => handleDelete('contact_messages', msg.id)} className="text-gray-300 hover:text-red-500"><Trash2 size={16}/></button>
                </div>
                <p className="text-xs text-gray-500 mb-2">{msg.email}</p>
                <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {msg.message}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
