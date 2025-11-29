"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Loader2, FileText, CheckCircle, Download, Save, ExternalLink } from 'lucide-react'

export default function HomeworkManager() {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [gradingId, setGradingId] = useState(null)
  const [gradeData, setGradeData] = useState({ grade: '', feedback: '' })

  useEffect(() => { fetchSubmissions() }, [])

  const fetchSubmissions = async () => {
    const { data } = await supabase.from('homework_submissions')
      .select('*, profiles(full_name, email), lessons(title)')
      .order('created_at', { ascending: false })
    setSubmissions(data || [])
    setLoading(false)
  }

  const getDownloadLink = async (path) => {
    // Attempt signed URL first (for private buckets)
    const { data, error } = await supabase.storage.from('homework').createSignedUrl(path, 60)
    if (error || !data) {
      // Fallback to public URL
      const { data: publicData } = supabase.storage.from('homework').getPublicUrl(path)
      return publicData.publicUrl
    }
    return data.signedUrl
  }

  const handleDownload = async (path) => {
    const url = await getDownloadLink(path)
    window.open(url, '_blank')
  }

  const handleGrade = async (id) => {
    await supabase.from('homework_submissions').update({ 
      status: 'graded', 
      grade: gradeData.grade, 
      feedback: gradeData.feedback 
    }).eq('id', id)
    
    setGradingId(null)
    setGradeData({ grade: '', feedback: '' })
    fetchSubmissions()
  }

  const openGrading = (sub) => {
    setGradingId(sub.id)
    setGradeData({ grade: sub.grade || '', feedback: sub.feedback || '' })
  }

  if (loading) return <Loader2 className="animate-spin text-brand-purple" />

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 font-bold text-gray-700 flex items-center gap-2">
        <FileText size={20}/> Homework Submissions
      </div>
      
      <div className="divide-y divide-gray-100">
        {submissions.map(sub => (
          <div key={sub.id} className="p-6 hover:bg-gray-50 transition">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-bold text-gray-800">{sub.lessons?.title}</p>
                <p className="text-sm text-gray-500">Student: {sub.profiles?.full_name} ({sub.profiles?.email})</p>
                <p className="text-xs text-gray-400 mt-1">{new Date(sub.created_at).toLocaleDateString()}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                 {sub.status === 'pending' ? (
                   <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">Pending Review</span>
                 ) : (
                   <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Graded: {sub.grade}</span>
                 )}
                 <button onClick={() => handleDownload(sub.file_url)} className="text-brand-blue text-xs font-bold flex items-center gap-1 hover:underline cursor-pointer">
                   <Download size={12}/> Download File
                 </button>
              </div>
            </div>

            {gradingId === sub.id ? (
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-4 animate-fade-in">
                <div className="grid grid-cols-4 gap-4 mb-3">
                  <div className="col-span-1">
                    <label className="block text-xs font-bold text-gray-500 mb-1">Grade</label>
                    <input className="w-full p-2 rounded border" placeholder="e.g. A, 95/100" value={gradeData.grade} onChange={e => setGradeData({...gradeData, grade: e.target.value})}/>
                  </div>
                  <div className="col-span-3">
                    <label className="block text-xs font-bold text-gray-500 mb-1">Feedback</label>
                    <input className="w-full p-2 rounded border" placeholder="Great work!" value={gradeData.feedback} onChange={e => setGradeData({...gradeData, feedback: e.target.value})}/>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button onClick={() => setGradingId(null)} className="px-3 py-1 text-sm text-gray-500">Cancel</button>
                  <button onClick={() => handleGrade(sub.id)} className="bg-brand-purple text-white px-4 py-1 rounded text-sm font-bold flex items-center gap-1">
                    <Save size={14}/> Save Grade
                  </button>
                </div>
              </div>
            ) : (
              <button onClick={() => openGrading(sub)} className="text-sm font-bold text-gray-500 hover:text-brand-purple mt-2 underline">
                {sub.status === 'pending' ? 'Grade Now' : 'Edit Grade'}
              </button>
            )}
          </div>
        ))}
        {submissions.length === 0 && <div className="p-8 text-center text-gray-400">No submissions yet.</div>}
      </div>
    </div>
  )
}
