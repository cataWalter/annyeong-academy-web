"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Save, Loader2, LayoutTemplate } from 'lucide-react'

export default function CMSManager() {
  const [hero, setHero] = useState({ title: '', subtitle: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    const { data } = await supabase.from('content_blocks').select('content').eq('key', 'home_hero').single()
    if (data) setHero(data.content)
    setLoading(false)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    await supabase.from('content_blocks').upsert({ key: 'home_hero', content: hero, updated_at: new Date() })
    setSaving(false)
    alert("Homepage updated!")
  }

  if (loading) return <Loader2 className="animate-spin text-brand-purple" />

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-2xl">
      <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
        <div className="bg-blue-50 p-2 rounded-lg text-brand-blue"><LayoutTemplate size={24}/></div>
        <div>
          <h3 className="text-lg font-bold text-gray-800">Homepage Hero Editor</h3>
          <p className="text-xs text-gray-500">Update the main landing page text.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Main Headline</label>
          <input 
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-purple outline-none"
            value={hero.title}
            onChange={e => setHero({...hero, title: e.target.value})}
          />
        </div>
        
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Subheadline</label>
          <textarea 
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-purple outline-none h-24"
            value={hero.subtitle}
            onChange={e => setHero({...hero, subtitle: e.target.value})}
          />
        </div>

        <button disabled={saving} className="btn btn-plum-gradient w-full py-3 flex justify-center items-center gap-2">
          {saving ? <Loader2 className="animate-spin" size={20}/> : <><Save size={20}/> Save Changes</>}
        </button>
      </form>
    </div>
  )
}
