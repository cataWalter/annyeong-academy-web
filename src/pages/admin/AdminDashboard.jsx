import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Upload, Plus, Video, FileText, Music, Loader2, Link as LinkIcon, Package, LayoutList, FilePresentation } from 'lucide-react'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('lessons')
  const [loading, setLoading] = useState(false)
  
  // --- LESSON UPLOAD STATE ---
  const [courses, setCourses] = useState([])
  const [lessonData, setLessonData] = useState({
    title: "", course_id: "", video_url: "", quizlet_url: "", description: "", type: "video"
  })
  const [lessonFile, setLessonFile] = useState(null)

  // --- PRODUCT CREATE STATE ---
  const [productData, setProductData] = useState({
    id: "", title: "", price: "", type: "course", description: "", image_url: ""
  })

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    const { data } = await supabase.from('products').select('*').eq('type', 'course')
    if (data) {
      setCourses(data)
      if(data.length > 0) setLessonData(prev => ({ ...prev, course_id: data[0].id }))
    }
  }

  const handleLessonUpload = async (e) => {
    e.preventDefault()
    if (!lessonData.course_id) return alert("Seleziona un corso.")
    setLoading(true)
    try {
      let resourceUrl = null
      if (lessonFile) {
        // Sanitize filename
        const safeName = lessonFile.name.replace(/[^a-zA-Z0-9.]/g, '_')
        const fileName = \\-\\
        
        const { error } = await supabase.storage.from('course-materials').upload(fileName, lessonFile)
        if (error) throw error
        const { data } = supabase.storage.from('course-materials').getPublicUrl(fileName)
        resourceUrl = data.publicUrl
      }

      const { error } = await supabase.from('lessons').insert([{
        ...lessonData,
        video_url: lessonData.type === 'audio' ? resourceUrl : lessonData.video_url, 
        pdf_url: lessonData.type === 'video' ? resourceUrl : null
      }])
      if (error) throw error
      alert("Lezione caricata!")
      setLessonData({ ...lessonData, title: "", video_url: "", quizlet_url: "", description: "" })
      setLessonFile(null)
    } catch (err) { alert(err.message) } 
    finally { setLoading(false) }
  }

  const handleCreateProduct = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const pid = productData.id || productData.title.toLowerCase().replace(/[^a-z0-9]/g, '-')
      const { error } = await supabase.from('products').insert([{ ...productData, id: pid }])
      if (error) throw error
      alert("Prodotto creato con successo!")
      setProductData({ id: "", title: "", price: "", type: "course", description: "", image_url: "" })
      if (productData.type === 'course') fetchCourses()
    } catch (err) { alert(err.message) }
    finally { setLoading(false) }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-brand-dark mb-6">Admin Dashboard</h1>

      <div className="flex gap-4 mb-8 border-b border-gray-200">
        <button onClick={() => setActiveTab('lessons')} className={\pb-4 px-2 font-bold transition \\}>
          <div className="flex items-center gap-2"><LayoutList size={18}/> Carica Lezioni</div>
        </button>
        <button onClick={() => setActiveTab('products')} className={\pb-4 px-2 font-bold transition \\}>
          <div className="flex items-center gap-2"><Package size={18}/> Crea Prodotti</div>
        </button>
      </div>

      {activeTab === 'lessons' && (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold mb-6">Aggiungi contenuto a un corso</h2>
          <form onSubmit={handleLessonUpload} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titolo Lezione</label>
                <input required type="text" className="input-field" value={lessonData.title} onChange={e => setLessonData({...lessonData, title: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Seleziona Corso</label>
                <select className="input-field" value={lessonData.course_id} onChange={e => setLessonData({...lessonData, course_id: e.target.value})}>
                  {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                <select className="input-field" value={lessonData.type} onChange={e => setLessonData({...lessonData, type: e.target.value})}>
                  <option value="video">Video</option>
                  <option value="audio">Audio</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quizlet URL</label>
                <input type="url" className="input-field" value={lessonData.quizlet_url} onChange={e => setLessonData({...lessonData, quizlet_url: e.target.value})} />
              </div>
            </div>

            {lessonData.type === 'video' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Video URL (Vimeo/YouTube)</label>
                <input type="url" className="input-field" value={lessonData.video_url} onChange={e => setLessonData({...lessonData, video_url: e.target.value})} />
              </div>
            )}

            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Allegato (PDF, MP3, PPT, PPTX)</label>
               <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition cursor-pointer relative">
                 <input 
                   type="file" 
                   accept=".pdf, .mp3, .wav, .ppt, .pptx" 
                   className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                   onChange={e => setLessonFile(e.target.files[0])} 
                 />
                 <div className="flex flex-col items-center">
                   <Upload className="w-8 h-8 text-gray-400 mb-2" />
                   <span className="text-sm text-gray-500">
                     {lessonFile ? lessonFile.name : "Trascina file o clicca"}
                   </span>
                   <span className="text-xs text-gray-400 mt-1">Supporta PDF, Audio e PowerPoint</span>
                 </div>
               </div>
            </div>

            <button disabled={loading} type="submit" className="btn-primary w-full">
              {loading ? <Loader2 className="animate-spin mx-auto"/> : "Carica Lezione"}
            </button>
          </form>
        </div>
      )}

      {activeTab === 'products' && (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold mb-6">Crea nuovo Corso, Ebook o Lezione Live</h2>
          <form onSubmit={handleCreateProduct} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome Prodotto</label>
                <input required type="text" className="input-field" value={productData.title} onChange={e => setProductData({...productData, title: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prezzo (es. 35.000)</label>
                <input required type="text" className="input-field" value={productData.price} onChange={e => setProductData({...productData, price: e.target.value})} />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipologia</label>
                <select className="input-field" value={productData.type} onChange={e => setProductData({...productData, type: e.target.value})}>
                  <option value="course">Video Corso (LMS)</option>
                  <option value="ebook">Ebook / File (Download)</option>
                  <option value="standalone">Lezione Live Singola</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID Univoco</label>
                <input type="text" className="input-field" value={productData.id} onChange={e => setProductData({...productData, id: e.target.value})} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Immagine Copertina URL</label>
              <input type="url" className="input-field" value={productData.image_url} onChange={e => setProductData({...productData, image_url: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrizione</label>
              <textarea rows="3" className="input-field" value={productData.description} onChange={e => setProductData({...productData, description: e.target.value})} />
            </div>
            <button disabled={loading} type="submit" className="btn-primary w-full">
              {loading ? <Loader2 className="animate-spin mx-auto"/> : "Crea Prodotto"}
            </button>
          </form>
        </div>
      )}

      <style>{
        .input-field { width: 100%; padding: 0.5rem 1rem; border: 1px solid #e5e7eb; border-radius: 0.5rem; outline: none; transition: all 0.2s; }
        .input-field:focus { border-color: #6a11cb; ring: 2px solid #6a11cb; }
        .btn-primary { background: #192335; color: white; font-weight: bold; padding: 0.75rem; border-radius: 0.5rem; transition: opacity 0.2s; }
        .btn-primary:hover { opacity: 0.9; }
      }</style>
    </div>
  )
}
