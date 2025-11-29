"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Save, Loader2, LayoutTemplate, FileText } from 'lucide-react'

export default function CMSManager() {
  const [activeTab, setActiveTab] = useState('home')
  const [content, setContent] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => { fetchContent(activeTab) }, [activeTab])

  const fetchContent = async (tab) => {
    setLoading(true)
    const key = tab === 'home' ? 'home_hero' : (tab === 'privacy' ? 'privacy_policy' : 'terms_conditions')
    const { data } = await supabase.from('content_blocks').select('content').eq('key', key).single()
    
    if (data) setContent(data.content)
    else {
        // Defaults
        if(tab === 'home') setContent({ title: '', subtitle: '' })
        else setContent({ title: tab === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions', body: '' })
    }
    setLoading(false)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    const key = activeTab === 'home' ? 'home_hero' : (activeTab === 'privacy' ? 'privacy_policy' : 'terms_conditions')
    await supabase.from('content_blocks').upsert({ key, content, updated_at: new Date() })
    setSaving(false)
    alert("Content updated!")
  }

  return (
    <div className="grid md:grid-cols-4 gap-6">
      <div className="col-span-1 space-y-2">
        <button onClick={() => setActiveTab('home')} className={`w-full text-left p-3 rounded-xl font-bold ${activeTab === 'home' ? 'bg-brand-purple text-white' : 'bg-white hover:bg-gray-50 text-gray-600'}`}>Home Hero</button>
        <button onClick={() => setActiveTab('privacy')} className={`w-full text-left p-3 rounded-xl font-bold ${activeTab === 'privacy' ? 'bg-brand-purple text-white' : 'bg-white hover:bg-gray-50 text-gray-600'}`}>Privacy Policy</button>
        <button onClick={() => setActiveTab('terms')} className={`w-full text-left p-3 rounded-xl font-bold ${activeTab === 'terms' ? 'bg-brand-purple text-white' : 'bg-white hover:bg-gray-50 text-gray-600'}`}>Terms & Conditions</button>
      </div>

      <div className="col-span-3 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        {loading ? <Loader2 className="animate-spin text-brand-purple mx-auto"/> : (
          <form onSubmit={handleSave} className="space-y-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="bg-blue-50 p-2 rounded-lg text-brand-blue">{activeTab === 'home' ? <LayoutTemplate size={24}/> : <FileText size={24}/>}</div>
                <h3 className="text-lg font-bold text-gray-800 capitalize">{activeTab.replace('_', ' ')} Editor</h3>
            </div>

            {activeTab === 'home' ? (
              <>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Headline</label>
                  <input className="input-field" value={content.title} onChange={e => setContent({...content, title: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Subheadline</label>
                  <textarea className="input-field h-24" value={content.subtitle} onChange={e => setContent({...content, subtitle: e.target.value})} />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Page Title</label>
                  <input className="input-field" value={content.title} onChange={e => setContent({...content, title: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Body Content (Markdown/HTML)</label>
                  <textarea className="input-field h-96 font-mono text-sm" value={content.body} onChange={e => setContent({...content, body: e.target.value})} />
                </div>
              </>
            )}

            <button disabled={saving} className="btn btn-plum-gradient w-full py-3 flex justify-center items-center gap-2">
              {saving ? <Loader2 className="animate-spin" size={20}/> : <><Save size={20}/> Save Changes</>}
            </button>
          </form>
        )}
      </div>
      <style>{`
        .input-field { width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 0.5rem; outline: none; font-size: 0.9rem; transition: all 0.2s; }
        .input-field:focus { border-color: #6a11cb; ring: 2px solid #6a11cb33; }
      `}</style>
    </div>
  )
}
