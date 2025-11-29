"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Loader2, Save, AlertTriangle, Globe } from 'lucide-react'

export default function SettingsManager() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [maintenance, setMaintenance] = useState({ enabled: false, message: '' })
  const [metadata, setMetadata] = useState({ title: '', description: '' })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    const { data: m } = await supabase.from('system_settings').select('value').eq('key', 'maintenance_mode').single()
    if (m) setMaintenance(m.value)
    
    const { data: s } = await supabase.from('system_settings').select('value').eq('key', 'site_metadata').single()
    if (s) setMetadata(s.value)
    
    setLoading(false)
  }

  const handleSave = async () => {
    setSaving(true)
    await supabase.from('system_settings').upsert({ key: 'maintenance_mode', value: maintenance, updated_at: new Date() })
    await supabase.from('system_settings').upsert({ key: 'site_metadata', value: metadata, updated_at: new Date() })
    setSaving(false)
    alert("System settings updated!")
  }

  if (loading) return <Loader2 className="animate-spin text-brand-purple" />

  return (
    <div className="grid md:grid-cols-2 gap-8">
      
      {/* Maintenance Mode Card */}
      <div className={`p-6 rounded-2xl border-2 transition-all ${maintenance.enabled ? 'bg-red-50 border-red-200' : 'bg-white border-gray-100'}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-full ${maintenance.enabled ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'}`}>
            <AlertTriangle size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800">Maintenance Mode</h3>
            <p className="text-xs text-gray-500">Lock the site for non-admins</p>
          </div>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer bg-white p-3 rounded-xl border border-gray-200">
             <div className={`w-12 h-6 rounded-full p-1 transition-colors ${maintenance.enabled ? 'bg-red-500' : 'bg-gray-300'}`}>
               <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${maintenance.enabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
             </div>
             <input type="checkbox" className="hidden" checked={maintenance.enabled} onChange={e => setMaintenance({...maintenance, enabled: e.target.checked})} />
             <span className="font-bold text-sm">{maintenance.enabled ? 'Enabled (Site Locked)' : 'Disabled (Site Live)'}</span>
          </label>

          <textarea 
            className="w-full p-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-red-200"
            placeholder="Maintenance Message..."
            value={maintenance.message}
            onChange={e => setMaintenance({...maintenance, message: e.target.value})}
          />
        </div>
      </div>

      {/* SEO Settings Card */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-full bg-blue-50 text-brand-blue"><Globe size={24} /></div>
          <h3 className="font-bold text-lg text-gray-800">Site Metadata</h3>
        </div>
        <div className="space-y-4">
          <div>
             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Site Title</label>
             <input className="w-full p-2 border border-gray-200 rounded-lg outline-none" value={metadata.title} onChange={e => setMetadata({...metadata, title: e.target.value})} />
          </div>
          <div>
             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
             <textarea className="w-full p-2 border border-gray-200 rounded-lg outline-none h-24" value={metadata.description} onChange={e => setMetadata({...metadata, description: e.target.value})} />
          </div>
        </div>
      </div>

      <div className="md:col-span-2 text-right">
        <button onClick={handleSave} disabled={saving} className="btn btn-plum-gradient px-8 py-3 flex items-center gap-2 ml-auto">
           {saving ? <Loader2 className="animate-spin"/> : <><Save size={18}/> Save System Settings</>}
        </button>
      </div>
    </div>
  )
}
