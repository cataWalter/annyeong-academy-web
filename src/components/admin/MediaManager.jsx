"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Loader2, Trash2, Copy, Image as ImageIcon, FileText, Check } from 'lucide-react'

export default function MediaManager() {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(null)
  const [bucket, setBucket] = useState('course-materials')

  useEffect(() => { fetchFiles() }, [bucket])

  const fetchFiles = async () => {
    setLoading(true)
    const { data, error } = await supabase.storage.from(bucket).list('', { limit: 100, sortBy: { column: 'created_at', order: 'desc' } })
    if (data) setFiles(data)
    setLoading(false)
  }

  const getUrl = (name) => {
    const { data } = supabase.storage.from(bucket).getPublicUrl(name)
    return data.publicUrl
  }

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url)
    setCopied(url)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleDelete = async (name) => {
    if (!confirm("Delete this file permanently?")) return
    await supabase.storage.from(bucket).remove([name])
    fetchFiles()
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg flex items-center gap-2"><ImageIcon size={20}/> Media Library</h3>
        <select value={bucket} onChange={e => setBucket(e.target.value)} className="p-2 border rounded-lg text-sm">
          <option value="course-materials">Course Materials</option>
          <option value="avatars">Avatars</option>
        </select>
      </div>

      {loading ? <Loader2 className="animate-spin text-brand-purple mx-auto"/> : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {files.map(file => {
            const url = getUrl(file.name)
            const isImage = file.metadata?.mimetype?.startsWith('image')
            return (
              <div key={file.id} className="group relative border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition">
                <div className="h-32 bg-gray-50 flex items-center justify-center overflow-hidden">
                  {isImage ? (
                    <img src={url} alt={file.name} className="w-full h-full object-cover" />
                  ) : (
                    <FileText className="text-gray-400" size={32} />
                  )}
                </div>
                <div className="p-2 bg-white text-xs">
                  <p className="truncate font-bold text-gray-700 mb-2">{file.name}</p>
                  <div className="flex gap-2">
                    <button onClick={() => copyToClipboard(url)} className="flex-1 bg-blue-50 text-blue-600 py-1 rounded flex justify-center items-center gap-1 hover:bg-blue-100">
                      {copied === url ? <Check size={12}/> : <Copy size={12}/>} Copy
                    </button>
                    <button onClick={() => handleDelete(file.name)} className="p-1 text-red-400 hover:text-red-600">
                      <Trash2 size={14}/>
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
          {files.length === 0 && <p className="col-span-full text-center text-gray-400 py-8">No files found in {bucket}.</p>}
        </div>
      )}
    </div>
  )
}
