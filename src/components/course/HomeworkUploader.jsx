"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import { Upload, FileText, CheckCircle, Loader2, Clock } from 'lucide-react'
import { generateFilePath } from '@/lib/helpers'

export default function HomeworkUploader({ lessonId }) {
  const { user } = useAuth()
  const [submission, setSubmission] = useState(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (lessonId) fetchSubmission()
  }, [lessonId])

  const fetchSubmission = async () => {
    const { data } = await supabase.from('homework_submissions').select('*').eq('lesson_id', lessonId).eq('user_id', user.id).single()
    setSubmission(data)
  }

  const handleUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const path = generateFilePath('homework', file)
      await supabase.storage.from('homework').upload(path, file)
      const { data } = supabase.storage.from('homework').getPublicUrl(path) // Note: Buckets are private, ideally use createSignedUrl for stricter security
      
      const payload = { lesson_id: lessonId, user_id: user.id, file_url: path, status: 'pending' }
      
      if (submission) {
        await supabase.from('homework_submissions').update(payload).eq('id', submission.id)
      } else {
        await supabase.from('homework_submissions').insert([payload])
      }
      fetchSubmission()
    } catch (error) {
      alert("Upload failed")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="bg-blue-50 rounded-2xl border border-blue-100 p-6 mt-6">
      <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2"><FileText size={20}/> Homework Assignment</h3>
      
      {submission ? (
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-bold text-gray-700">Your Submission</p>
            {submission.status === 'pending' ? (
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded font-bold flex items-center gap-1"><Clock size={12}/> Pending Review</span>
            ) : (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-bold flex items-center gap-1"><CheckCircle size={12}/> Graded: {submission.grade}</span>
            )}
          </div>
          <p className="text-xs text-gray-500 truncate mb-4">{submission.file_url}</p>
          
          {submission.feedback && (
            <div className="bg-green-50 p-3 rounded-lg border border-green-100 text-sm text-green-800">
              <strong>Teacher Feedback:</strong> {submission.feedback}
            </div>
          )}
          
          <div className="mt-4 text-right">
             <label className="text-xs font-bold text-blue-600 cursor-pointer hover:underline">
               Upload New Version
               <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} />
             </label>
          </div>
        </div>
      ) : (
        <div className="text-center border-2 border-dashed border-blue-200 rounded-xl p-6 bg-white/50">
           <p className="text-sm text-blue-800 mb-4">Upload your assignment for feedback.</p>
           <label className="btn btn-plum-gradient px-6 py-2 rounded-xl text-sm font-bold cursor-pointer inline-flex items-center gap-2">
             {uploading ? <Loader2 className="animate-spin"/> : <Upload size={16}/>} Upload File
             <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} />
           </label>
        </div>
      )}
    </div>
  )
}
