import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import { Upload, Package, LayoutList, Loader2, Trash2, RefreshCw, Users, MessageSquare, Image as ImageIcon, Edit, X, FileText, Video, Mic, GraduationCap, PlusCircle, DollarSign, Megaphone, Calendar, HelpCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { extractTag, cleanDescription, generateFilePath } from '../../lib/helpers'

export default function AdminDashboard() {
  const { isAdmin, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  
  const [activeTab, setActiveTab] = useState('lessons')
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState(null)
  
  // Data
  const [courses, setCourses] = useState([])
  const [allLessons, setAllLessons] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [leads, setLeads] = useState([])
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])
  const [purchases, setPurchases] = useState([])
  const [announcements, setAnnouncements] = useState([])

  // Forms
  const [lessonData, setLessonData] = useState({ 
    title: "", course_id: "", video_url: "", quizlet_url: "", description: "", type: "video", pdf_url: "",
    quiz_data: "" // JSON string for quiz
  })
  const [lessonMediaFile, setLessonMediaFile] = useState(null)
  const [lessonPdfFile, setLessonPdfFile] = useState(null)
  
  const [productData, setProductData] = useState({ id: "", title: "", price: "", type: "course", description: "", image_url: "", zoom_link: "", download_link: "", event_date: "" })
  const [productCoverFile, setProductCoverFile] = useState(null)
  const [productEbookFile, setProductEbookFile] = useState(null)

  const [announcementData, setAnnouncementData] = useState({ title: "", message: "", type: "info", active: true })
  const [selectedCourseToEnroll, setSelectedCourseToEnroll] = useState("")

  useEffect(() => {
    if (!authLoading && !isAdmin) navigate('/dashboard')
    fetchData()
  }, [isAdmin, authLoading, navigate])

  const fetchData = async () => {
    setLoading(true)
    try {
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
      const { data: usersData } = await supabase.from('profiles').select('*').order('created_at', {ascending: false})
      if (usersData) setUsers(usersData)
      const { data: purchaseData } = await supabase.from('purchases').select('user_id, product_id')
      if (purchaseData) setPurchases(purchaseData)
      const { data: annData } = await supabase.from('announcements').select('*').order('created_at', {ascending: false})
      if (annData) setAnnouncements(annData)
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
    if (!window.confirm("Enroll user for free?")) return
    setLoading(true)
    const { error } = await supabase.from('purchases').insert([{ user_id: userId, product_id: selectedCourseToEnroll, status: 'completed' }])
    setLoading(false)
    if (error) alert(error.message)
    else { alert("Enrolled!"); fetchData(); }
  }

  const handleSaveAnnouncement = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.from('announcements').insert([announcementData])
    setLoading(false)
    if (error) alert(error.message)
    else { alert("Announcement posted!"); setAnnouncementData({ title: "", message: "", type: "info", active: true }); fetchData(); }
  }

  const toggleAnnouncement = async (id, currentStatus) => {
    await supabase.from('announcements').update({ active: !currentStatus }).eq('id', id)
    fetchData()
  }

  const startEditLesson = (l) => {
    setEditingId(l.id)
    setLessonData({
      title: l.title, course_id: l.course_id, type: l.type || 'video',
      video_url: l.video_url || "", pdf_url: l.pdf_url || "", quizlet_url: l.quizlet_url || "", description: l.description || "",
      quiz_data: l.quiz_data ? JSON.stringify(l.quiz_data, null, 2) : ""
    })
    window.scrollTo(0,0)
  }

  const startEditProduct = (p) => {
    setEditingId(p.id)
    setProductData({
      id: p.id, title: p.title, price: p.price, type: p.type,
      description: cleanDescription(p.description),
      image_url: p.image_url || "",
      zoom_link: extractTag(p.description, 'ZOOM') || "",
      download_link: extractTag(p.description, 'DOWNLOAD_URL') || "",
      event_date: p.event_date ? new Date(p.event_date).toISOString().slice(0, 16) : ""
    })
    window.scrollTo(0,0)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setProductData({ id: "", title: "", price: "", type: "course", description: "", image_url: "", zoom_link: "", download_link: "", event_date: "" })
    setLessonData({ ...lessonData, title: "", video_url: "", pdf_url: "", quizlet_url: "", description: "", quiz_data: "" })
    setLessonMediaFile(null); setLessonPdfFile(null); setProductCoverFile(null); setProductEbookFile(null)
  }

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
      
      const payload = { 
        title: productData.title, price: productData.price, type: productData.type, 
        description: finalDesc, image_url: finalImage,
        event_date: productData.event_date || null 
      }
      const pid = productData.id || productData.title.toLowerCase().replace(/[^a-z0-9]/g, '-')
      if (editingId) await supabase.from('products').update(payload).eq('id', editingId)
      else await supabase.from('products').insert([{ ...payload, id: pid }])
      alert("Product saved!"); cancelEdit(); fetchData()
    } catch (err) { alert(err.message) } finally { setLoading(false) }
  }

  const handleSaveLesson = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      let finalVideo = lessonData.video_url
      if (lessonData.type === 'audio' && lessonMediaFile) finalVideo = await uploadToStorage(lessonMediaFile, 'course-materials', 'lessons/audio')
      let finalPdf = lessonData.pdf_url
      if (lessonPdfFile) finalPdf = await uploadToStorage(lessonPdfFile, 'course-materials', 'lessons/pdf')
      
      let parsedQuiz = null
      if (lessonData.quiz_data.trim()) {
        try { parsedQuiz = JSON.parse(lessonData.quiz_data) } catch { throw new Error("Invalid JSON for Quiz Data") }
      }

      const payload = { 
        course_id: lessonData.course_id, title: lessonData.title, type: lessonData.type, 
        video_url: finalVideo, pdf_url: finalPdf, quizlet_url: lessonData.quizlet_url, 
        description: lessonData.description, quiz_data: parsedQuiz
      }
      
      if (editingId) await supabase.from('lessons').update(payload).eq('id', editingId)
      else await supabase.from('lessons').insert([payload])
      alert("Lesson saved!"); cancelEdit(); fetchData()
    } catch (err) { alert(err.message) } finally { setLoading(false) }
  }

  const handleDelete = async (table, id) => {
    if(!window.confirm("Delete?")) return;
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

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100"><div className="flex items-center gap-3 text-gray-500 mb-1"><GraduationCap size={18}/><span className="text-xs font-bold uppercase">Students</span></div><p className="text-2xl font-bold text-brand-dark">{users.length}</p></div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100"><div className="flex items-center gap-3 text-gray-500 mb-1"><DollarSign size={18}/><span className="text-xs font-bold uppercase">Purchases</span></div><p className="text-2xl font-bold text-brand-dark">{purchases.length}</p></div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100"><div className="flex items-center gap-3 text-gray-500 mb-1"><Users size={18}/><span className="text-xs font-bold uppercase">Leads</span></div><p className="text-2xl font-bold text-brand-dark">{leads.length}</p></div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100"><div className="flex items-center gap-3 text-gray-500 mb-1"><LayoutList size={18}/><span className="text-xs font-bold uppercase">Content</span></div><p className="text-2xl font-bold text-brand-dark">{allLessons.length}</p></div>
      </div>

      <div className="flex gap-2 mb-8 border-b border-gray-200 overflow-x-auto pb-1">
        {[
          { id: 'lessons', icon: LayoutList, label: 'Lessons' },
          { id: 'products', icon: Package, label: 'Products' },
          { id: 'students', icon: GraduationCap, label: 'Students' },
          { id: 'announce', icon: Megaphone, label: 'Announce' },
          { id: 'leads', icon: Users, label: 'Leads' },
          { id: 'messages', icon: MessageSquare, label: 'Msgs' }
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2 font-bold rounded-t-lg transition whitespace-nowrap ${activeTab === tab.id ? 'bg-brand-purple text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
            <tab.icon size={18}/> {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      {activeTab === 'announce' && (
        <div className="grid lg:grid-cols-3 gap-8">
           <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg border-t-4 border-orange-500 h-fit sticky top-24">
              <h2 className="font-bold text-lg text-gray-800 mb-6">New Announcement</h2>
              <form onSubmit={handleSaveAnnouncement} className="space-y-4">
                <input required type="text" className="input-field" placeholder="Title" value={announcementData.title} onChange={e => setAnnouncementData({...announcementData, title: e.target.value})} />
                <textarea required className="input-field" placeholder="Message..." rows="3" value={announcementData.message} onChange={e => setAnnouncementData({...announcementData, message: e.target.value})} />
                <select className="input-field" value={announcementData.type} onChange={e => setAnnouncementData({...announcementData, type: e.target.value})}><option value="info">Info</option><option value="warning">Warning</option><option value="success">Success</option></select>
                <button disabled={loading} type="submit" className="btn-primary w-full bg-orange-500 hover:bg-orange-600">{loading ? "..." : "Post"}</button>
              </form>
           </div>
           <div className="lg:col-span-2 space-y-3">{announcements.map(ann => (<div key={ann.id} className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center"><div><h4 className="font-bold">{ann.title}</h4><p className="text-sm text-gray-600">{ann.message}</p></div><button onClick={() => handleDelete('announcements', ann.id)} className="text-red-500"><Trash2 size={18}/></button></div>))}</div>
        </div>
      )}

      {activeTab === 'students' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 overflow-x-auto">
             <div className="flex items-center gap-2 mb-4"><select className="input-field" value={selectedCourseToEnroll} onChange={(e) => setSelectedCourseToEnroll(e.target.value)}><option value="">Select Course...</option>{courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}</select></div>
             <table className="w-full text-sm text-left"><thead className="text-gray-400 font-bold bg-gray-50"><tr><th className="p-4">User</th><th className="p-4">Role</th><th className="p-4 text-right">Action</th></tr></thead>
             <tbody>{users.map(u => (<tr key={u.id} className="border-t"><td className="p-4"><p className="font-bold">{u.full_name}</p><p className="text-xs text-gray-400">{u.email}</p></td><td className="p-4">{u.role}</td><td className="p-4 text-right"><button onClick={() => handleManualEnroll(u.id)} className="text-green-600 bg-green-50 px-3 py-1 rounded font-bold text-xs">Enroll</button></td></tr>))}</tbody></table>
          </div>
      )}

      {activeTab === 'lessons' && (
        <div className="grid lg:grid-cols-3 gap-8">
           <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg border-t-4 border-brand-purple h-fit sticky top-24">
              <h2 className="font-bold text-lg text-gray-800 mb-6">{editingId ? 'Edit' : 'New'} Lesson</h2>
              <form onSubmit={handleSaveLesson} className="space-y-4">
                <select className="input-field" value={lessonData.course_id} onChange={e => setLessonData({...lessonData, course_id: e.target.value})}>{courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}</select>
                <input required type="text" className="input-field" placeholder="Title" value={lessonData.title} onChange={e => setLessonData({...lessonData, title: e.target.value})} />
                <select className="input-field" value={lessonData.type} onChange={e => setLessonData({...lessonData, type: e.target.value})}><option value="video">Video</option><option value="audio">Audio</option></select>
                {lessonData.type === 'video' ? <input type="url" className="input-field" placeholder="Video URL" value={lessonData.video_url} onChange={e => setLessonData({...lessonData, video_url: e.target.value})} /> : <input type="file" className="input-field" onChange={e => setLessonMediaFile(e.target.files[0])} />}
                <input type="file" className="input-field" onChange={e => setLessonPdfFile(e.target.files[0])} />
                <textarea className="input-field" placeholder="Desc" rows="3" value={lessonData.description} onChange={e => setLessonData({...lessonData, description: e.target.value})} />
                
                {/* Quiz Editor */}
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                   <label className="label flex items-center gap-1 text-brand-purple"><HelpCircle size={14}/> Quiz Data (JSON)</label>
                   <textarea className="input-field text-xs font-mono" placeholder='[{"question":"...","options":["..."],"correct":0}]' rows="3" value={lessonData.quiz_data} onChange={e => setLessonData({...lessonData, quiz_data: e.target.value})} />
                </div>

                <button disabled={loading} type="submit" className="btn-primary w-full">{loading ? "Saving..." : "Save"}</button>
                {editingId && <button type="button" onClick={cancelEdit} className="w-full text-sm text-gray-500 mt-2">Cancel</button>}
              </form>
           </div>
           <div className="lg:col-span-2 space-y-3">{allLessons.map(l => (<div key={l.id} className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center"><div><h4 className="font-bold">{l.title}</h4><p className="text-xs text-gray-500">{l.products?.title} {l.quiz_data && '• Quiz Active'}</p></div><div className="flex gap-2"><button onClick={() => startEditLesson(l)} className="text-blue-500"><Edit size={18}/></button><button onClick={() => handleDelete('lessons', l.id)} className="text-red-500"><Trash2 size={18}/></button></div></div>))}</div>
        </div>
      )}

      {activeTab === 'products' && (
        <div className="grid lg:grid-cols-3 gap-8">
           <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg border-t-4 border-brand-blue h-fit sticky top-24">
              <h2 className="font-bold text-lg text-gray-800 mb-6">{editingId ? 'Edit' : 'New'} Product</h2>
              <form onSubmit={handleSaveProduct} className="space-y-4">
                <input required type="text" className="input-field" placeholder="Title" value={productData.title} onChange={e => setProductData({...productData, title: e.target.value})} />
                <input required type="text" className="input-field" placeholder="Price" value={productData.price} onChange={e => setProductData({...productData, price: e.target.value})} />
                <select className="input-field" value={productData.type} onChange={e => setProductData({...productData, type: e.target.value})}><option value="course">Course</option><option value="ebook">Ebook</option><option value="standalone">Live</option></select>
                {!editingId && <input type="text" className="input-field" placeholder="ID" value={productData.id} onChange={e => setProductData({...productData, id: e.target.value})} />}
                
                {productData.type === 'standalone' && (
                   <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                      <label className="label text-brand-blue flex items-center gap-1"><Calendar size={14}/> Event Date</label>
                      <input type="datetime-local" className="input-field bg-white" value={productData.event_date} onChange={e => setProductData({...productData, event_date: e.target.value})} />
                      <input type="url" className="input-field bg-white mt-2" placeholder="Zoom Link" value={productData.zoom_link} onChange={e => setProductData({...productData, zoom_link: e.target.value})} />
                   </div>
                )}

                <div className="file-input-wrapper"><label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600"><ImageIcon size={16}/> {productCoverFile ? productCoverFile.name : "Cover Img"}</label><input type="file" className="hidden" onChange={e => setProductCoverFile(e.target.files[0])} /></div>
                <textarea className="input-field" placeholder="Desc" rows="4" value={productData.description} onChange={e => setProductData({...productData, description: e.target.value})} />
                <button disabled={loading} type="submit" className="btn-primary w-full bg-brand-blue">{loading ? "Saving..." : "Save"}</button>
                {editingId && <button type="button" onClick={cancelEdit} className="w-full text-sm text-gray-500 mt-2">Cancel</button>}
              </form>
           </div>
           <div className="lg:col-span-2 space-y-3">{allProducts.map(p => (
              <div key={p.id} className="bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center">
                 <div>
                    <h4 className="font-bold">{p.title}</h4>
                    <p className="text-xs text-gray-500">{p.type} • {p.price}</p>
                    {p.event_date && <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-bold mt-1 inline-block">{new Date(p.event_date).toLocaleString()}</span>}
                 </div>
                 <div className="flex gap-2"><button onClick={() => startEditProduct(p)} className="text-blue-500"><Edit size={18}/></button><button onClick={() => handleDelete('products', p.id)} className="text-red-500"><Trash2 size={18}/></button></div>
              </div>
           ))}</div>
        </div>
      )}

      {activeTab === 'leads' && <div className="bg-white p-6 rounded-2xl shadow-sm">{leads.map(l => <div key={l.id} className="border-b py-2">{l.full_name} ({l.email})</div>)}</div>}
      {activeTab === 'messages' && <div className="bg-white p-6 rounded-2xl shadow-sm">{messages.map(m => <div key={m.id} className="border-b py-2 font-bold">{m.name}: <span className="font-normal">{m.message}</span></div>)}</div>}

      <style>{`
        .label { display: block; font-size: 0.85rem; font-weight: bold; color: #4b5563; margin-bottom: 0.3rem; }
        .input-field { width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 0.5rem; outline: none; font-size: 0.9rem; transition: all 0.2s; }
        .input-field:focus { border-color: #6a11cb; ring: 2px solid #6a11cb33; }
        .btn-primary { background: #192335; color: white; font-weight: bold; padding: 0.8rem; border-radius: 0.5rem; transition: opacity 0.2s; }
        .btn-primary:hover { opacity: 0.9; }
        .file-input-wrapper { border: 1px solid #e5e7eb; padding: 0.75rem; border-radius: 0.5rem; background: #f9fafb; }
      `}</style>
    </div>
  )
}
