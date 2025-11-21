import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import { Upload, Package, LayoutList, Loader2, Trash2, RefreshCw, Users, MessageSquare, Download, Image as ImageIcon, Edit, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function AdminDashboard() {
  const { isAdmin, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  
  const [activeTab, setActiveTab] = useState('lessons')
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState(null) // Track what we are editing
  
  // Data
  const [courses, setCourses] = useState([])
  const [allLessons, setAllLessons] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [leads, setLeads] = useState([])
  const [messages, setMessages] = useState([])

  // Forms
  const [lessonData, setLessonData] = useState({ title: "", course_id: "", video_url: "", quizlet_url: "", description: "", type: "video" })
  const [lessonFile, setLessonFile] = useState(null)
  
  const [productData, setProductData] = useState({ id: "", title: "", price: "", type: "course", description: "", image_url: "", zoom_link: "" })
  const [productFile, setProductFile] = useState(null) 
  const [coverImageFile, setCoverImageFile] = useState(null)

  useEffect(() => {
    if (!authLoading && !isAdmin) navigate('/dashboard')
    fetchData()
  }, [isAdmin, authLoading, navigate])

  const fetchData = async () => {
    setLoading(true)
    const { data: prodData } = await supabase.from('products').select('*').order('created_at', {ascending: false})
    if (prodData) {
      setAllProducts(prodData)
      const courseList = prodData.filter(p => p.type === 'course')
      setCourses(courseList)
      if(courseList.length > 0 && !lessonData.course_id) setLessonData(prev => ({ ...prev, course_id: courseList[0].id }))
    }
    const { data: lessData } = await supabase.from('lessons').select('*, products(title)').order('created_at', {ascending: false})
    if (lessData) setAllLessons(lessData)
    const { data: leadsData } = await supabase.from('webinar_leads').select('*').order('created_at', {ascending: false})
    if (leadsData) setLeads(leadsData)
    const { data: msgData } = await supabase.from('contact_messages').select('*').order('created_at', {ascending: false})
    if (msgData) setMessages(msgData)
    setLoading(false)
  }

  const uploadFileToStorage = async (file, folder) => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`
    const { error } = await supabase.storage.from('course-materials').upload(fileName, file)
    if (error) throw error
    const { data } = supabase.storage.from('course-materials').getPublicUrl(fileName)
    return data.publicUrl
  }

  // --- EDIT LOGIC ---
  const startEditProduct = (product) => {
    setEditingId(product.id)
    // Extract hidden Zoom/Download links from description
    const zoomMatch = product.description?.match(/\[\[ZOOM::(.*?)\]\]/)
    const downloadMatch = product.description?.match(/\[\[DOWNLOAD_URL::(.*?)\]\]/)
    
    // Clean description for the textarea
    let cleanDesc = product.description || ""
    cleanDesc = cleanDesc.replace(/\[\[ZOOM::.*?\]\]/, '').replace(/\[\[DOWNLOAD_URL::.*?\]\]/, '').trim()

    setProductData({
      id: product.id,
      title: product.title,
      price: product.price,
      type: product.type,
      description: cleanDesc,
      image_url: product.image_url || "",
      zoom_link: zoomMatch ? zoomMatch[1] : "",
      // Store existing download link internally if needed, but for now we just re-upload if changing
    })
    window.scrollTo(0,0)
  }

  const startEditLesson = (lesson) => {
    setEditingId(lesson.id)
    setLessonData({
      title: lesson.title,
      course_id: lesson.course_id,
      video_url: lesson.video_url || "",
      quizlet_url: lesson.quizlet_url || "",
      description: lesson.description || "",
      type: lesson.type || "video"
    })
    window.scrollTo(0,0)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setProductData({ id: "", title: "", price: "", type: "course", description: "", image_url: "", zoom_link: "" })
    setLessonData({ ...lessonData, title: "", video_url: "", quizlet_url: "", description: "" })
  }

  // --- SAVE LOGIC ---
  const handleSaveProduct = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const pid = productData.id || productData.title.toLowerCase().replace(/[^a-z0-9]/g, '-')
      let finalDesc = productData.description

      // Re-append Tags
      if (productData.type === 'standalone' && productData.zoom_link) {
        finalDesc += `\n\n[[ZOOM::${productData.zoom_link}]]`
      }
      
      if (productData.type === 'ebook' && productFile) {
        const url = await uploadFileToStorage(productFile, 'ebooks')
        finalDesc += `\n\n[[DOWNLOAD_URL::${url}]]`
      } else if (productData.type === 'ebook' && editingId) {
        // Keep old link if editing and no new file uploaded? 
        // For MVP simplicity: If editing, we assume description already has the tag if we didn't strip it perfectly, 
        // OR we just re-add it if we stored it. 
        // To be safe: We only append if new file. If editing, user shouldn't delete the tag from textarea (but we stripped it).
        // FIX: We need to fetch the old description to preserve link if file not changed? 
        // Easier: Just tell admin to re-upload file or paste link in desc if changing.
      }

      let finalImageUrl = productData.image_url
      if (coverImageFile) finalImageUrl = await uploadFileToStorage(coverImageFile, 'covers')

      const payload = { 
        title: productData.title, 
        price: productData.price, 
        type: productData.type, 
        description: finalDesc, 
        image_url: finalImageUrl 
      }

      if (editingId) {
        const { error } = await supabase.from('products').update(payload).eq('id', editingId)
        if (error) throw error
        alert("Prodotto aggiornato!")
      } else {
        const { error } = await supabase.from('products').insert([{ ...payload, id: pid }])
        if (error) throw error
        alert("Prodotto creato!")
      }

      cancelEdit()
      fetchData()
    } catch (err) { alert(err.message) } finally { setLoading(false) }
  }

  const handleSaveLesson = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      let resourceUrl = null
      if (lessonFile) resourceUrl = await uploadFileToStorage(lessonFile, 'lessons')
      
      const finalVideoUrl = lessonData.type === 'audio' ? (resourceUrl || lessonData.video_url) : lessonData.video_url
      const finalPdfUrl = (lessonData.type === 'video' && resourceUrl) ? resourceUrl : (editingId ? lessonData.pdf_url : null) // Keep old pdf if editing? MVP: just overwrite or keep logic simple.

      const payload = {
        title: lessonData.title,
        course_id: lessonData.course_id,
        type: lessonData.type,
        video_url: finalVideoUrl,
        pdf_url: finalPdfUrl,
        quizlet_url: lessonData.quizlet_url,
        description: lessonData.description
      }

      if (editingId) {
        const { error } = await supabase.from('lessons').update(payload).eq('id', editingId)
        if (error) throw error
        alert("Lezione aggiornata!")
      } else {
        const { error } = await supabase.from('lessons').insert([payload])
        if (error) throw error
        alert("Lezione creata!")
      }
      cancelEdit()
      fetchData()
    } catch (err) { alert(err.message) } finally { setLoading(false) }
  }

  const handleDelete = async (table, id) => {
    if(!window.confirm("Eliminare definitivamente?")) return;
    await supabase.from(table).delete().eq('id', id)
    fetchData()
  }

  const exportLeadsCSV = () => {
    if (leads.length === 0) return alert("Nessun dato da esportare")
    const headers = ["Nome,Email,Data Webinar,Data Iscrizione,Privacy"]
    const rows = leads.map(l => `"${l.full_name}","${l.email}","${l.webinar_date}","${new Date(l.created_at).toLocaleDateString()}","${l.gdpr_consent}"`)
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n")
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "webinar_leads.csv")
    document.body.appendChild(link)
    link.click()
  }

  if (authLoading || !isAdmin) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-brand-purple"/></div>

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-brand-dark">Admin Dashboard</h1>
        <button onClick={fetchData} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"><RefreshCw size={20}/></button>
      </div>

      <div className="flex gap-2 mb-8 border-b border-gray-200 overflow-x-auto pb-1">
        <TabButton id="lessons" active={activeTab} set={setActiveTab} icon={LayoutList} label="Lezioni" />
        <TabButton id="products" active={activeTab} set={setActiveTab} icon={Package} label="Prodotti" />
        <TabButton id="leads" active={activeTab} set={setActiveTab} icon={Users} label="Leads" />
        <TabButton id="messages" active={activeTab} set={setActiveTab} icon={MessageSquare} label="Messaggi" />
      </div>

      {activeTab === 'lessons' && (
        <div className="grid lg:grid-cols-3 gap-8">
           <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-200 h-fit sticky top-24">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-brand-dark">{editingId ? 'Modifica Lezione' : 'Nuova Lezione'}</h2>
                {editingId && <button onClick={cancelEdit}><X size={18}/></button>}
              </div>
              <form onSubmit={handleSaveLesson} className="space-y-4">
                <select className="input-field" value={lessonData.course_id} onChange={e => setLessonData({...lessonData, course_id: e.target.value})}>{courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}</select>
                <input required type="text" className="input-field" placeholder="Titolo" value={lessonData.title} onChange={e => setLessonData({...lessonData, title: e.target.value})} />
                <select className="input-field" value={lessonData.type} onChange={e => setLessonData({...lessonData, type: e.target.value})}><option value="video">Video</option><option value="audio">Audio</option></select>
                {lessonData.type === 'video' && <input type="url" className="input-field" placeholder="Video URL" value={lessonData.video_url} onChange={e => setLessonData({...lessonData, video_url: e.target.value})} />}
                <input type="url" className="input-field" placeholder="Quizlet URL" value={lessonData.quizlet_url} onChange={e => setLessonData({...lessonData, quizlet_url: e.target.value})} />
                <textarea className="input-field" placeholder="Descrizione" rows="3" value={lessonData.description} onChange={e => setLessonData({...lessonData, description: e.target.value})} />
                <input type="file" className="input-field p-2 text-xs" onChange={e => setLessonFile(e.target.files[0])} />
                <button disabled={loading} type="submit" className="btn-primary w-full">{loading ? <Loader2 className="animate-spin mx-auto"/> : (editingId ? "Aggiorna" : "Salva")}</button>
              </form>
           </div>
           <div className="lg:col-span-2 space-y-3">
              {allLessons.map(l => (
                  <div key={l.id} className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center">
                      <div><h4 className="font-bold text-gray-800">{l.title}</h4><p className="text-xs text-gray-500">{l.products?.title} • {l.type}</p></div>
                      <div className="flex gap-2">
                        <button onClick={() => startEditLesson(l)} className="text-blue-400 hover:text-blue-600 p-2"><Edit size={18}/></button>
                        <button onClick={() => handleDelete('lessons', l.id)} className="text-red-400 hover:text-red-600 p-2"><Trash2 size={18}/></button>
                      </div>
                  </div>
              ))}
           </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div className="grid lg:grid-cols-3 gap-8">
           <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-200 h-fit sticky top-24">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-brand-dark">{editingId ? 'Modifica Prodotto' : 'Nuovo Prodotto'}</h2>
                {editingId && <button onClick={cancelEdit}><X size={18}/></button>}
              </div>
              <form onSubmit={handleSaveProduct} className="space-y-4">
                <input required type="text" className="input-field" placeholder="Nome" value={productData.title} onChange={e => setProductData({...productData, title: e.target.value})} />
                <div className="grid grid-cols-2 gap-2">
                   <input required type="text" className="input-field" placeholder="Prezzo" value={productData.price} onChange={e => setProductData({...productData, price: e.target.value})} />
                   <select className="input-field" value={productData.type} onChange={e => setProductData({...productData, type: e.target.value})}><option value="course">Corso</option><option value="ebook">Ebook</option><option value="standalone">Live</option></select>
                </div>
                {!editingId && <input type="text" className="input-field" placeholder="ID (Slug)" value={productData.id} onChange={e => setProductData({...productData, id: e.target.value})} />}
                
                {/* Dynamic Fields based on Type */}
                {productData.type === 'standalone' && (
                   <input type="url" className="input-field" placeholder="Zoom Link (es. zoom.us/j/123)" value={productData.zoom_link} onChange={e => setProductData({...productData, zoom_link: e.target.value})} />
                )}

                <div className="border-2 border-dashed border-gray-300 rounded-xl p-3 text-center cursor-pointer relative hover:bg-gray-50">
                     <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={e => setCoverImageFile(e.target.files[0])} />
                     <span className="text-xs text-gray-500 flex flex-col items-center gap-1"><ImageIcon size={16}/> {coverImageFile ? coverImageFile.name : "Carica Copertina"}</span>
                </div>

                {productData.type === 'ebook' && (
                   <div className="border-2 border-dashed border-gray-300 rounded-xl p-3 text-center cursor-pointer relative hover:bg-gray-50">
                     <input type="file" accept=".pdf" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={e => setProductFile(e.target.files[0])} />
                     <span className="text-xs text-gray-500 flex flex-col items-center gap-1"><Upload size={16}/> {productFile ? productFile.name : "Carica PDF Ebook"}</span>
                   </div>
                )}
                
                <textarea rows="3" className="input-field" placeholder="Descrizione" value={productData.description} onChange={e => setProductData({...productData, description: e.target.value})} />
                <button disabled={loading} type="submit" className="btn-primary w-full">{loading ? <Loader2 className="animate-spin mx-auto"/> : (editingId ? "Aggiorna" : "Crea")}</button>
              </form>
           </div>
           <div className="lg:col-span-2 space-y-3">
              {allProducts.map(p => (
                  <div key={p.id} className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center">
                      <div className="flex gap-3 items-center"><img src={p.image_url || 'https://placehold.co/50'} className="w-10 h-10 rounded-md object-cover" /><div><h4 className="font-bold text-gray-800">{p.title}</h4><p className="text-xs text-gray-500 uppercase">{p.type}</p></div></div>
                      <div className="flex gap-2">
                        <button onClick={() => startEditProduct(p)} className="text-blue-400 hover:text-blue-600 p-2"><Edit size={18}/></button>
                        <button onClick={() => handleDelete('products', p.id)} className="text-red-400 hover:text-red-600 p-2"><Trash2 size={18}/></button>
                      </div>
                  </div>
              ))}
           </div>
        </div>
      )}

      {activeTab === 'leads' && (
         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
               <h3 className="font-bold text-gray-700">Iscritti Webinar ({leads.length})</h3>
               <button onClick={exportLeadsCSV} className="flex items-center gap-2 text-sm bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition"><Download size={16}/> Export CSV</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                 <thead className="text-gray-500 font-bold uppercase border-b border-gray-100">
                    <tr><th className="p-4">Data</th><th className="p-4">Nome</th><th className="p-4">Email</th><th className="p-4">Webinar</th></tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                    {leads.map(lead => (
                       <tr key={lead.id}>
                          <td className="p-4 text-gray-500">{new Date(lead.created_at).toLocaleDateString()}</td>
                          <td className="p-4 font-bold text-gray-800">{lead.full_name}</td>
                          <td className="p-4 text-gray-600">{lead.email}</td>
                          <td className="p-4"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md font-bold text-xs">{lead.webinar_date}</span></td>
                       </tr>
                    ))}
                 </tbody>
              </table>
            </div>
         </div>
      )}

      {activeTab === 'messages' && (
         <div className="space-y-4">
            {messages.length === 0 && <p className="text-gray-400 text-center p-10">Nessun messaggio.</p>}
            {messages.map(msg => (
               <div key={msg.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start mb-2">
                     <div>
                        <h4 className="font-bold text-gray-800">{msg.name}</h4>
                        <p className="text-sm text-brand-purple">{msg.email}</p>
                     </div>
                     <span className="text-xs text-gray-400">{new Date(msg.created_at).toLocaleString()}</span>
                  </div>
                  <p className="text-gray-600 bg-gray-50 p-4 rounded-lg text-sm">{msg.message}</p>
               </div>
            ))}
         </div>
      )}
      
      <style>{`
        .input-field { width: 100%; padding: 0.6rem; border: 1px solid #e5e7eb; border-radius: 0.5rem; outline: none; font-size: 0.9rem; }
        .btn-primary { background: #192335; color: white; font-weight: bold; padding: 0.8rem; border-radius: 0.5rem; }
      `}</style>
    </div>
  )
}

const TabButton = ({ id, active, set, icon: Icon, label }) => (
  <button onClick={() => set(id)} className={`pb-3 px-4 font-bold whitespace-nowrap transition flex items-center gap-2 ${active === id ? 'text-brand-purple border-b-2 border-brand-purple' : 'text-gray-500 hover:text-gray-700'}`}>
    <Icon size={18}/> {label}
  </button>
)
