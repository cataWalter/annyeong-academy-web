import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { Upload, Plus, Video, FileText, Music, Loader2 } from 'lucide-react'

export default function AdminDashboard() {
  const [loading, setLoading] = useState(false)
  const [lessonData, setLessonData] = useState({
    title: "",
    course_id: "1",
    video_url: "",
    description: "",
    type: "video" // 'video' o 'audio'
  })
  const [file, setFile] = useState(null)

  const handleUpload = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      let resourceUrl = null

      // Upload File (PDF o Audio)
      if (file) {
        const fileName = `${Date.now()}-${file.name}`
        const { error: uploadError } = await supabase.storage
          .from('course-materials')
          .upload(fileName, file)
        
        if (uploadError) throw uploadError
        
        const { data: { publicUrl } } = supabase.storage
          .from('course-materials')
          .getPublicUrl(fileName)
          
        resourceUrl = publicUrl
      }

      // Prepara dati per DB
      const dbPayload = {
        ...lessonData,
        // Se è audio, usiamo video_url come campo generico per l'URL del media
        video_url: lessonData.type === 'audio' ? resourceUrl : lessonData.video_url, 
        pdf_url: lessonData.type === 'video' ? resourceUrl : null // Semplificazione per demo
      }

      const { error: dbError } = await supabase
        .from('lessons')
        .insert([dbPayload])

      if (dbError) throw dbError

      alert("Contenuto caricato con successo!")
      setLessonData({ title: "", course_id: "1", video_url: "", description: "", type: "video" })
      setFile(null)

    } catch (error) {
      console.error(error)
      alert("Errore: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-brand-dark mb-2">Admin Dashboard</h1>
      <p className="text-gray-500 mb-8">Carica lezioni Video, Audio o Materiali.</p>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
          <Plus className="w-5 h-5 text-brand-purple" /> Nuovo Contenuto
        </h2>

        <form onSubmit={handleUpload} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Titolo</label>
              <input 
                required
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-purple outline-none"
                value={lessonData.title}
                onChange={e => setLessonData({...lessonData, title: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo Contenuto</label>
              <select 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-purple outline-none"
                value={lessonData.type}
                onChange={e => setLessonData({...lessonData, type: e.target.value})}
              >
                <option value="video">Video Lezione</option>
                <option value="audio">Audio / Podcast</option>
              </select>
            </div>
          </div>

          {lessonData.type === 'video' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <Video size={16} /> URL Video (YouTube/Vimeo)
              </label>
              <input 
                type="url"
                placeholder="https://..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-purple outline-none"
                value={lessonData.video_url}
                onChange={e => setLessonData({...lessonData, video_url: e.target.value})}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              {lessonData.type === 'video' ? <FileText size={16} /> : <Music size={16} />}
              {lessonData.type === 'video' ? 'Allegato PDF' : 'File Audio MP3'}
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition cursor-pointer relative">
              <input 
                type="file" 
                accept={lessonData.type === 'video' ? ".pdf" : ".mp3,.wav"}
                onChange={e => setFile(e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">
                  {file ? file.name : (lessonData.type === 'video' ? "Carica PDF" : "Carica MP3")}
                </span>
              </div>
            </div>
          </div>

          <button 
            disabled={loading}
            type="submit" 
            className="w-full bg-brand-dark text-white font-bold py-3 rounded-lg hover:opacity-90 flex justify-center"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Pubblica"}
          </button>
        </form>
      </div>
    </div>
  )
}