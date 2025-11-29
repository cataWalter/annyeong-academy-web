"use client";
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Upload, Loader2, X, Check } from 'lucide-react'
import { generateFilePath } from '@/lib/helpers'

export default function FileUploader({ bucket, onUpload, value, accept = "image/*", label = "Upload File" }) {
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e) => {
    try {
      const file = e.target.files[0]
      if (!file) return
      setUploading(true)

      const path = generateFilePath(bucket, file)
      const { error } = await supabase.storage.from(bucket).upload(path, file)
      
      if (error) throw error

      // Get Public URL
      const { data } = supabase.storage.from(bucket).getPublicUrl(path)
      onUpload(data.publicUrl)
    } catch (error) {
      alert("Upload failed: " + error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="mb-4">
      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{label}</label>
      <div className="flex gap-2 items-center">
        <input 
          type="text" 
          value={value} 
          readOnly
          placeholder="File URL will appear here"
          className="input-field bg-gray-50 text-gray-500 flex-1"
        />
        <label className="cursor-pointer bg-brand-purple text-white p-2.5 rounded-lg hover:bg-brand-dark transition shadow-sm flex-shrink-0">
          {uploading ? <Loader2 size={20} className="animate-spin"/> : <Upload size={20}/>}
          <input 
            type="file" 
            className="hidden" 
            accept={accept}
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
        {value && <button type="button" onClick={() => onUpload('')} className="p-2.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100"><X size={20}/></button>}
      </div>
      {value && accept.startsWith('image') && (
        <div className="mt-2 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 relative">
          <img src={value} className="w-full h-full object-cover" alt="Preview"/>
        </div>
      )}
    </div>
  )
}
