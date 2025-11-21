import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import { Upload, Package, LayoutList, Loader2, Trash2, RefreshCw, Users, MessageSquare, Download, Image as ImageIcon, Edit, X, FileText, Video, Mic, Shield, GraduationCap, PlusCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { extractTag, cleanDescription, generateFilePath } from '../../lib/helpers'

export default function AdminDashboard() {
  const { isAdmin, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  
  const [activeTab, setActiveTab] = useState('lessons')
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState(null)
  
  // Data State
  const [courses, setCourses] = useState([])
  const [allLessons, setAllLessons] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [leads, setLeads] = useState([])
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])

  // Lesson Form State
  const [lessonData, setLessonData] = useState({ 
    title: "", course_id: "", video_url: "", quizlet_url: "", description: "", type: "video", pdf_url: "" 
  })
  const [lessonMediaFile, setLessonMediaFile] = useState(null)
  const [lessonPdfFile, setLessonPdfFile] = useState(null)
  
  // Product Form State
  const [productData, setProductData] = useState({ 
    id: "", title: "", price: "", type: "course", description: "", image_url: "", zoom_link: "", download_link: "" 
  })
  const [productCoverFile, setProductCoverFile] = useState(null)
  const [productEbookFile, setProductEbookFile] = useState(null)

  // Enrollment State
  const [selectedCourseToEnroll, setSelectedCourseToEnroll] = useState("")

  useEffect(() => {
    if (!authLoading && !isAdmin) navigate('/dashboard')
    fetchData()
  }, [isAdmin, authLoading, navigate])

  const fetchData = async () => {
    setLoading(true)
    try {
      // Fetch Products
      const { data: prodData } = await supabase.from('products').select('*').order('created_at', {ascending: false})
      if (prodData) {
        setAllProducts(prodData)
        const courseList = prodData.filter(p => p.type === 'course')
        setCourses(courseList)
        if(courseList.length > 0) {
            if(!lessonData.course_id) setLessonData(prev => ({ ...prev, course_id: courseList[0].id }))
            if(!selectedCourseToEnroll) setSelectedCourseToEnroll(courseList[0].id)
        }
      }
      // Fetch Lessons
      const { data: lessData } = await supabase.from('lessons').select('*, products(title)').order('created_at', {ascending: false})
      if (lessData) setAllLessons(lessData)
      
      // Fetch Leads
      const { data: leadsData } = await supabase.from('webinar_leads').select('*').order('created_at', {ascending: false})
      if (leadsData) setLeads(leadsData)
      
      // Fetch Messages
      const { data: msgData } = await supabase.from('contact_messages').select('*').order('created_at', {ascending: false})
      if (msgData) setMessages(msgData)

      // Fetch Users (Profiles)
      const { data: usersData } = await supabase.from('profiles').select('*').order('created_at', {ascending: false})
      if (usersData) setUsers(usersData)

    } catch(e) { console.error(e) }
    setLoading(false)
  }

  const uploadToStorage = async (file, bucket, folder) => {
    if (!file) return null
    const path = generateFilePath(folder, file)
    const { error } = await supabase.storage.from(bucket).upload(path, file)
    if (error) throw error
    const { data } = supabase.storage.from(bucket).getPublicUrl(path)
    return data.publicUrl
  }

  const handleManualEnroll = async (userId) => {
    if (!selectedCourseToEnroll) return alert("Select a course first")
    const confirm = window.confirm("Are you sure you want to give FREE access to this user?")
    if (!confirm) return

    setLoading(true)
    const { error } = await supabase.from('purchases').insert([
        { user_id: userId, product_id: selectedCourseToEnroll, status: 'completed' }
    ])
    setLoading(false)

    if (error) alert("Error enrolling user: " + error.message)
    else alert("User enrolled successfully!")
  }

  const startEditProduct = (p) => {
    setEditingId(p.id)
    setProductData({
      id: p.id,
      title: p.title,
      price: p.price,
      type: p.type,
      description: cleanDescription(p.description),
      image_url: p.image_url || "",
      zoom_link: extractTag(p.description, 'ZOOM') || "",
      download_link: extractTag(p.description, 'DOWNLOAD_URL') || ""
    })
    window.scrollTo(0,0)
  }

  const startEditLesson = (l) => {
    setEditingId(l.id)
    setLessonData({
      title: l.title,
      course_id: l.course_id,
      type: l.type || 'video',
      video_url: l.video_url || "",
      pdf_url: l.pdf_url || "",
      quizlet_url: l.quizlet_url || "",
      description: l.description || ""
    })
    window.scrollTo(0,0)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setProductData({ id: "", title: "", price: "", type: "course", description: "", image_url: "", zoom_link: "", download_link: "" })
    setLessonData({ ...lessonData, title: "", video_url: "", pdf_url: "", quizlet_url: "", description: "" })
    setLessonMediaFile(null)
    setLessonPdfFile(null)
    setProductCoverFile(null)
    setProductEbookFile(null)
  }

  // --- HANDLERS (Save Product/Lesson/Delete) Same as before ---
  const handleSaveProduct = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      let finalImage = productData.image_url
      if (productCoverFile) finalImage = await uploadToStorage(productCoverFile, 'course-materials', 'covers')

      let finalDownload = productData.download_link
      if (productEbookFile) finalDownload = await uploadToStorage(productEbookFile, 'course-materials', 'ebooks')

      let finalDesc = productData.description
      if (productData.type === 'standalone' && productData.zoom_link) finalDesc += `\n\n[[ZOOM::${productData.zoom_link}]]`
      if (productData.type === 'ebook' && finalDownload) finalDesc += `\n\n[[DOWNLOAD_URL::${finalDownload}]]`

      const payload = { title: productData.title, price: productData.price, type: productData.type, description: finalDesc, image_url: finalImage }
      const pid = productData.id || productData.title.toLowerCase().replace(/[^a-z0-9]/g, '-')

      if (editingId) {
        const { error } = await supabase.from('products').update(payload).eq('id', editingId)
        if (error) throw error
      } else {
        const { error } = await supabase.from('products').insert([{ ...payload, id: pid }])
        if (error) throw error
      }
      alert("Product saved!")
      cancelEdit()
      fetchData()
    } catch (err) { alert("Error: " + err.message) } 
    finally { setLoading(false) }
  }

  const handleSaveLesson = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      let finalVideoUrl = lessonData.video_url
      if (lessonData.type === 'audio' && lessonMediaFile) finalVideoUrl = await uploadToStorage(lessonMediaFile, 'course-materials', 'lessons/audio')
      let finalPdfUrl = lessonData.pdf_url
      if (lessonPdfFile) finalPdfUrl = await uploadToStorage(lessonPdfFile, 'course-materials', 'lessons/pdf')

      const payload = { course_id: lessonData.course_id, title: lessonData.title, type: lessonData.type, video_url: finalVideoUrl, pdf_url: finalPdfUrl, quizlet_url: lessonData.quizlet_url, description: lessonData.description }

      if (editingId) {
        const { error } = await supabase.from('lessons').update(payload).eq('id', editingId)
        if (error) throw error
      } else {
        const { error } = await supabase.from('lessons').insert([payload])
        if (error) throw error
      }
      alert("Lesson saved!")
      cancelEdit()
      fetchData()
    } catch (err) { alert("Error: " + err.message) } 
    finally { setLoading(false) }
  }

  const handleDelete = async (table, id) => {
    if(!window.confirm("Irreversible action. Are you sure?")) return;
    await supabase.from(table).delete().eq('id', id)
    fetchData()
  }

  if (authLoading || !isAdmin) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-brand-purple"/></div>

  return (
    <div className="max-w-7xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-brand-dark">Admin Dashboard</h1>
        <button onClick={fetchData} className="p-2 bg-white shadow-sm rounded-full hover:bg-gray-50 text-brand-purple"><RefreshCw size={20}/></button>
      </div>

      <div className="flex gap-2 mb-8 border-b border-gray-200 overflow-x-auto pb-1">
        {[
          { id: 'lessons', icon: LayoutList, label: 'Lessons' },
          { id: 'products', icon: Package, label: 'Products' },
          { id: 'students', icon: GraduationCap, label: 'Students' },
          { id: 'leads', icon: Users, label: 'Leads' },
          { id: 'messages', icon: MessageSquare, label: 'Messages' }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)} 
            className={`flex items-center gap-2 px-4 py-2 font-bold rounded-t-lg transition whitespace-nowrap ${activeTab === tab.id ? 'bg-brand-purple text-white' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <tab.icon size={18}/> {tab.label}
          </button>
        ))}
      </div>

      {/* --- STUDENTS TAB (NEW) --- */}
      {activeTab === 'students' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
             <div className="p-6 border-b border-gray-100 bg-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h3 className="font-bold text-lg text-gray-700">Registered Users ({users.length})</h3>
                <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-gray-200 shadow-sm">
                    <span className="text-xs font-bold text-gray-500 uppercase">Enroll User In:</span>
                    <select 
                        className="text-sm border-none outline-none font-bold text-brand-dark bg-transparent"
                        value={selectedCourseToEnroll}
                        onChange={(e) => setSelectedCourseToEnroll(e.target.value)}
                    >
                        <option value="">Select Course...</option>
                        {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                        {allProducts.filter(p => p.type === 'standalone').map(c => <option key={c.id} value={c.id}>[LIVE] {c.title}</option>)}
                    </select>
                </div>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-sm text-left">
                  <thead className="text-gray-400 font-bold uppercase border-b border-gray-100 bg-white">
                     <tr><th className="p-4">User</th><th className="p-4">Role</th><th className="p-4 text-right">Actions</th></tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                     {users.map(u => (
                        <tr key={u.id} className="hover:bg-gray-50">
                           <td className="p-4">
                               <div className="flex items-center gap-3">
                                   <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                                       {u.avatar_url ? <img src={u.avatar_url} className="w-full h-full object-cover"/> : <Users size={18} className="m-auto mt-1.5 text-gray-400"/>}
                                   </div>
                                   <div>
                                       <p className="font-bold text-gray-800">{u.full_name || 'No Name'}</p>
                                       <p className="text-xs text-gray-400 font-mono">{u.id}</p>
                                   </div>
                               </div>
                           </td>
                           <td className="p-4">
                               {u.role === 'admin' ? (
                                   <span className="flex items-center gap-1 text-purple-600 font-bold bg-purple-50 px-2 py-1 rounded text-xs w-fit"><Shield size={12}/> Admin</span>
                               ) : (
                                   <span className="text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded text-xs">Student</span>
                               )}
                           </td>
                           <td className="p-4 text-right">
                               <button 
                                   onClick={() => handleManualEnroll(u.id)}
                                   disabled={!selectedCourseToEnroll || loading}
                                   className="inline-flex items-center gap-1 bg-green-50 text-green-700 hover:bg-green-100 px-3 py-1.5 rounded-lg text-xs font-bold transition disabled:opacity-50"
                               >
                                   <PlusCircle size={14}/> Enroll
                               </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
             </div>
          </div>
      )}

      {/* --- LESSONS TAB --- */}
      {activeTab === 'lessons' && (
        <div className="grid lg:grid-cols-3 gap-8">
           <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg border-t-4 border-brand-purple h-fit sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-lg text-gray-800">{editingId ? 'Edit Lesson' : 'New Lesson'}</h2>
                {editingId && <button onClick={cancelEdit}><X size={20} className="text-gray-400 hover:text-red-500"/></button>}
              </div>
              <form onSubmit={handleSaveLesson} className="space-y-4">
                <div>
                  <label className="label">Course</label>
                  <select className="input-field" value={lessonData.course_id} onChange={e => setLessonData({...lessonData, course_id: e.target.value})}>
                    {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                  </select>
                </div>
                
                <input required type="text" className="input-field" placeholder="Lesson Title" value={lessonData.title} onChange={e => setLessonData({...lessonData, title: e.target.value})} />
                
                <div>
                   <label className="label">Lesson Type</label>
                   <select className="input-field" value={lessonData.type} onChange={e => setLessonData({...lessonData, type: e.target.value})}><option value="video">Video</option><option value="audio">Audio</option></select>
                </div>

                {lessonData.type === 'video' ? (
                  <input type="url" className="input-field" placeholder="YouTube/Vimeo URL" value={lessonData.video_url} onChange={e => setLessonData({...lessonData, video_url: e.target.value})} />
                ) : (
                  <div className="file-input-wrapper">
                    <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600"><Mic size={16}/> {lessonMediaFile ? lessonMediaFile.name : "Upload MP3"}</label>
                    <input type="file" accept="audio/*" className="hidden" onChange={e => setLessonMediaFile(e.target.files[0])} />
                  </div>
                )}

                <div className="file-input-wrapper">
                  <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600"><FileText size={16}/> {lessonPdfFile ? lessonPdfFile.name : "Attach PDF (Optional)"}</label>
                  <input type="file" accept=".pdf" className="hidden" onChange={e => setLessonPdfFile(e.target.files[0])} />
                </div>
                
                <input type="url" className="input-field" placeholder="Quizlet Link" value={lessonData.quizlet_url} onChange={e => setLessonData({...lessonData, quizlet_url: e.target.value})} />
                <textarea className="input-field" placeholder="Description..." rows="3" value={lessonData.description} onChange={e => setLessonData({...lessonData, description: e.target.value})} />
                
                <button disabled={loading} type="submit" className="btn-primary w-full">{loading ? <Loader2 className="animate-spin mx-auto"/> : "Save Lesson"}</button>
              </form>
           </div>

           <div className="lg:col-span-2 space-y-3">
              {allLessons.map(l => (
                  <div key={l.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center hover:shadow-md transition">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${l.type === 'audio' ? 'bg-purple-100 text-brand-purple' : 'bg-blue-100 text-brand-blue'}`}>
                           {l.type === 'audio' ? <Mic size={20}/> : <Video size={20}/>}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800">{l.title}</h4>
                          <p className="text-xs text-gray-500">{l.products?.title || 'No Course'} • {l.pdf_url ? '📎 PDF Included' : 'No PDF'}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => startEditLesson(l)} className="action-btn text-blue-500 bg-blue-50"><Edit size={18}/></button>
                        <button onClick={() => handleDelete('lessons', l.id)} className="action-btn text-red-500 bg-red-50"><Trash2 size={18}/></button>
                      </div>
                  </div>
              ))}
           </div>
        </div>
      )}

      {/* --- PRODUCTS TAB --- */}
      {activeTab === 'products' && (
        <div className="grid lg:grid-cols-3 gap-8">
           <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg border-t-4 border-brand-blue h-fit sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-lg text-gray-800">{editingId ? 'Edit Product' : 'New Product'}</h2>
                {editingId && <button onClick={cancelEdit}><X size={20} className="text-gray-400 hover:text-red-500"/></button>}
              </div>
              <form onSubmit={handleSaveProduct} className="space-y-4">
                <input required type="text" className="input-field" placeholder="Product Title" value={productData.title} onChange={e => setProductData({...productData, title: e.target.value})} />
                
                <div className="grid grid-cols-2 gap-3">
                   <input required type="text" className="input-field" placeholder="Price (e.g. 15.000 Ft)" value={productData.price} onChange={e => setProductData({...productData, price: e.target.value})} />
                   <select className="input-field" value={productData.type} onChange={e => setProductData({...productData, type: e.target.value})}>
                      <option value="course">Course (Video)</option>
                      <option value="ebook">Ebook (Download)</option>
                      <option value="standalone">Live (Zoom)</option>
                   </select>
                </div>

                {!editingId && <input type="text" className="input-field text-sm font-mono" placeholder="ID (e.g. coreano-base)" value={productData.id} onChange={e => setProductData({...productData, id: e.target.value})} />}

                {productData.type === 'standalone' && (
                   <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                      <label className="label text-brand-blue">Zoom Link</label>
                      <input type="url" className="input-field bg-white" placeholder="https://zoom.us/..." value={productData.zoom_link} onChange={e => setProductData({...productData, zoom_link: e.target.value})} />
                   </div>
                )}

                {productData.type === 'ebook' && (
                   <div className="file-input-wrapper border-dashed border-2 border-purple-200 bg-purple-50">
                      <label className="flex items-center gap-2 cursor-pointer text-sm text-brand-purple font-bold"><Upload size={16}/> {productEbookFile ? productEbookFile.name : "Upload PDF Ebook"}</label>
                      <input type="file" accept=".pdf" className="hidden" onChange={e => setProductEbookFile(e.target.files[0])} />
                   </div>
                )}

                <div className="file-input-wrapper">
                   <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600"><ImageIcon size={16}/> {productCoverFile ? productCoverFile.name : "Upload Cover Image"}</label>
                   <input type="file" accept="image/*" className="hidden" onChange={e => setProductCoverFile(e.target.files[0])} />
                </div>

                <textarea className="input-field" placeholder="Description..." rows="4" value={productData.description} onChange={e => setProductData({...productData, description: e.target.value})} />
                
                <button disabled={loading} type="submit" className="btn-primary w-full bg-brand-blue">{loading ? <Loader2 className="animate-spin mx-auto"/> : "Save Product"}</button>
              </form>
           </div>

           <div className="lg:col-span-2 space-y-3">
              {allProducts.map(p => (
                  <div key={p.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center hover:shadow-md transition">
                      <div className="flex items-center gap-4">
                        <img src={p.image_url || 'https://placehold.co/50'} className="w-12 h-12 rounded-md object-cover bg-gray-200" />
                        <div>
                          <h4 className="font-bold text-gray-800">{p.title}</h4>
                          <div className="flex items-center gap-2 text-xs text-gray-500 uppercase font-bold">
                            <span className={`px-2 py-0.5 rounded ${p.type === 'course' ? 'bg-purple-100 text-brand-purple' : p.type === 'ebook' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>{p.type}</span>
                            <span>{p.price}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => startEditProduct(p)} className="action-btn text-blue-500 bg-blue-50"><Edit size={18}/></button>
                        <button onClick={() => handleDelete('products', p.id)} className="action-btn text-red-500 bg-red-50"><Trash2 size={18}/></button>
                      </div>
                  </div>
              ))}
           </div>
        </div>
      )}

      {/* --- LEADS TAB --- */}
      {activeTab === 'leads' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
           <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-lg text-gray-700">Webinar Signups ({leads.length})</h3>
           </div>
           <div className="overflow-x-auto">
             <table className="w-full text-sm text-left">
                <thead className="text-gray-400 font-bold uppercase border-b border-gray-100 bg-white">
                   <tr><th className="p-4">Date</th><th className="p-4">Name</th><th className="p-4">Email</th><th className="p-4">Preference</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                   {leads.map(lead => (
                      <tr key={lead.id} className="hover:bg-gray-50">
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

      {/* --- MESSAGES TAB --- */}
      {activeTab === 'messages' && (
        <div className="grid md:grid-cols-2 gap-4">
           {messages.map(msg => (
              <div key={msg.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative group hover:shadow-md transition">
                 <div className="flex justify-between items-start mb-2">
                    <div>
                       <h4 className="font-bold text-gray-800">{msg.name}</h4>
                       <p className="text-xs text-brand-purple font-mono">{msg.email}</p>
                    </div>
                    <span className="text-xs text-gray-400">{new Date(msg.created_at).toLocaleDateString()}</span>
                 </div>
                 <p className="text-gray-600 bg-gray-50 p-3 rounded-lg text-sm mt-3 italic">"{msg.message}"</p>
                 <button onClick={() => handleDelete('contact_messages', msg.id)} className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition"><Trash2 size={16}/></button>
              </div>
           ))}
           {messages.length === 0 && <p className="text-gray-400 col-span-2 text-center p-10">No messages received.</p>}
        </div>
      )}

      <style>{`
        .label { display: block; font-size: 0.85rem; font-weight: bold; color: #4b5563; margin-bottom: 0.3rem; }
        .input-field { width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 0.5rem; outline: none; font-size: 0.9rem; transition: all 0.2s; }
        .input-field:focus { border-color: #6a11cb; ring: 2px solid #6a11cb33; }
        .btn-primary { background: #192335; color: white; font-weight: bold; padding: 0.8rem; border-radius: 0.5rem; transition: opacity 0.2s; }
        .btn-primary:hover { opacity: 0.9; }
        .file-input-wrapper { border: 1px solid #e5e7eb; padding: 0.75rem; border-radius: 0.5rem; background: #f9fafb; }
        .action-btn { padding: 0.5rem; border-radius: 0.5rem; transition: background 0.2s; }
      `}</style>
    </div>
  )
}
