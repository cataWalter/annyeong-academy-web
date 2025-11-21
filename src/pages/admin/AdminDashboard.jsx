import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { Upload, Plus, Video, FileText, Loader2 } from 'lucide-react'

export default function AdminDashboard() {
  const [loading, setLoading] = useState(false)
  const [lessonData, setLessonData] = useState({
    title: "",
    course_id: "1", // Hardcoded per demo
    video_url: "",
    description: ""
  })
  const [file, setFile] = useState(null)

  const handleUpload = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      let pdfUrl = null

      // 1. Upload File su Supabase Storage
      if (file) {
        const fileName = \\-\\
        const { data, error: uploadError } = await supabase.storage
          .from('course-materials')
          .upload(fileName, file)
        
        if (uploadError) throw uploadError
        
        // Ottieni URL pubblico (o firmato)
        const { data: { publicUrl } } = supabase.storage
          .from('course-materials')
          .getPublicUrl(fileName)
          
        pdfUrl = publicUrl
      }

      // 2. Salva Lezione nel DB
      const { error: dbError } = await supabase
        .from('lessons')
        .insert([{
          ...lessonData,
          pdf_url: pdfUrl
        }])

      if (dbError) throw dbError

      alert("Lezione caricata con successo!")
      setLessonData({ title: "", course_id: "1", video_url: "", description: "" })
      setFile(null)

    } catch (error) {
      console.error(error)
      alert("Errore upload (Assicurati di aver creato il Bucket 'course-materials' su Supabase): " + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark">Admin Dashboard</h1>
          <p className="text-gray-500">Carica nuove lezioni e materiali.</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
          <Plus className="w-5 h-5 text-brand-purple" /> Nuova Lezione
        </h2>

        <form onSubmit={handleUpload} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Titolo Lezione</label>
              <input 
                required
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-purple outline-none"
                value={lessonData.title}
                onChange={e => setLessonData({...lessonData, title: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Corso di appartenenza</label>
              <select 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-purple outline-none"
                value={lessonData.course_id}
                onChange={e => setLessonData({...lessonData, course_id: e.target.value})}
              >
                <option value="1">Coreano Base 1</option>
                <option value="2">K-Drama Listening</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Video size={16} /> URL Video (Vimeo/YouTube Unlisted)
            </label>
            <input 
              required
              type="url"
              placeholder="https://vimeo.com/..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-purple outline-none"
              value={lessonData.video_url}
              onChange={e => setLessonData({...lessonData, video_url: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <FileText size={16} /> Materiale PDF (Opzionale)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition cursor-pointer relative">
              <input 
                type="file" 
                accept=".pdf"
                onChange={e => setFile(e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">
                  {file ? file.name : "Trascina qui il file o clicca per caricare"}
                </span>
              </div>
            </div>
          </div>

          <button 
            disabled={loading}
            type="submit" 
            className="w-full bg-brand-dark text-white font-bold py-3 rounded-lg hover:opacity-90 flex justify-center"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Pubblica Lezione"}
          </button>
        </form>
      </div>
    </div>
  )
}
