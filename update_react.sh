#!/bin/bash

echo "Starting final project configuration..."

# ------------------------------------------------------------------------------
# 1. CREATE FINAL DATABASE SETUP SQL
# ------------------------------------------------------------------------------
echo "Generating final_db_setup.sql (Schema + RLS Policies)..."

cat <<EOF > final_db_setup.sql
-- ============================================================
-- ANNYEONG ACADEMY - COMPLETE DATABASE SETUP
-- Run this in the Supabase SQL Editor
-- ============================================================

-- 1. EXTENSIONS
create extension if not exists "uuid-ossp";

-- 2. TABLES
-- PROFILES
create table if not exists profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  full_name text,
  avatar_url text,
  role text default 'student'
);

-- PRODUCTS
create table if not exists products (
  id text primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text,
  price text not null,
  type text not null, -- 'course', 'ebook', 'standalone'
  image_url text
);

-- LESSONS
create table if not exists lessons (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  course_id text references products(id) on delete cascade not null,
  title text not null,
  description text,
  video_url text,
  pdf_url text,
  quizlet_url text,
  type text default 'video'
);

-- PURCHASES
create table if not exists purchases (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users on delete cascade not null,
  product_id text references products(id) on delete cascade not null,
  status text default 'completed'
);

-- WEBINAR LEADS
create table if not exists webinar_leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  full_name text not null,
  email text not null,
  webinar_date text,
  gdpr_consent boolean default false
);

-- CONTACT MESSAGES
create table if not exists contact_messages (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text,
  email text,
  message text
);

-- 3. ENABLE ROW LEVEL SECURITY
alter table profiles enable row level security;
alter table products enable row level security;
alter table lessons enable row level security;
alter table purchases enable row level security;
alter table webinar_leads enable row level security;
alter table contact_messages enable row level security;

-- 4. RLS POLICIES

-- PROFILES: Public can view (for reviews/comments if needed), Users update own
create policy "Public profiles are viewable by everyone." on profiles for select using ( true );
create policy "Users can insert their own profile." on profiles for insert with check ( auth.uid() = id );
create policy "Users can update own profile." on profiles for update using ( auth.uid() = id );

-- PRODUCTS: Public read, Admin write
create policy "Public can view products" on products for select using ( true );
create policy "Admin can insert products" on products for insert with check ( exists (select 1 from profiles where id = auth.uid() and role = 'admin') );
create policy "Admin can update products" on products for update using ( exists (select 1 from profiles where id = auth.uid() and role = 'admin') );
create policy "Admin can delete products" on products for delete using ( exists (select 1 from profiles where id = auth.uid() and role = 'admin') );

-- LESSONS: Authenticated read (simple logic), Admin write
-- (In a stricter app, you'd check 'purchases' table in the 'using' clause, but for now app logic handles it)
create policy "Authenticated users view lessons" on lessons for select using ( auth.role() = 'authenticated' );
create policy "Admin manage lessons" on lessons for all using ( exists (select 1 from profiles where id = auth.uid() and role = 'admin') );

-- PURCHASES: Users view own, Admin view all
create policy "Users view own purchases" on purchases for select using ( auth.uid() = user_id );
create policy "Users can insert own purchase" on purchases for insert with check ( auth.uid() = user_id );
create policy "Admin view all purchases" on purchases for select using ( exists (select 1 from profiles where id = auth.uid() and role = 'admin') );

-- WEBINAR LEADS: Public insert (form), Admin select
create policy "Public insert leads" on webinar_leads for insert with check ( true );
create policy "Admin view leads" on webinar_leads for select using ( exists (select 1 from profiles where id = auth.uid() and role = 'admin') );

-- CONTACT MESSAGES: Public insert, Admin select
create policy "Public insert messages" on contact_messages for insert with check ( true );
create policy "Admin view messages" on contact_messages for select using ( exists (select 1 from profiles where id = auth.uid() and role = 'admin') );

-- 5. HANDLERS & TRIGGERS
-- Auto-create profile on signup
create or replace function public.handle_new_user() 
returns trigger as \$\$
begin
  insert into public.profiles (id, full_name, avatar_url, role)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', 'student');
  return new;
end;
\$\$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
EOF


# ------------------------------------------------------------------------------
# 2. CREATE FORGOT PASSWORD PAGE
# ------------------------------------------------------------------------------
echo "Creating src/pages/auth/ForgotPassword.jsx..."

cat <<EOF > src/pages/auth/ForgotPassword.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { Loader2, ArrowLeft } from 'lucide-react'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleReset = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/profile',
    })
    setLoading(false)
    if (error) {
      alert(error.message)
    } else {
      setSent(true)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FC] px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full border-t-4 border-gray-800">
        <Link to="/login" className="text-gray-400 hover:text-gray-600 flex items-center gap-2 mb-6 text-sm">
          <ArrowLeft size={16} /> Back to Login
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-brand-dark">Reset Password 🔒</h1>
          <p className="text-gray-500">Enter your email to recover access.</p>
        </div>
        
        {sent ? (
          <div className="text-center bg-green-50 p-6 rounded-xl">
            <p className="text-green-700 font-bold mb-2">Check your email!</p>
            <p className="text-sm text-green-600">We sent you a link to reset your password.</p>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-purple outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <button 
              disabled={loading}
              type="submit" 
              className="w-full bg-brand-dark text-white font-bold py-3 rounded-lg hover:opacity-90 flex justify-center"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Send Reset Link"}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
EOF

# ------------------------------------------------------------------------------
# 3. UPDATE APP.JSX (Routing)
# ------------------------------------------------------------------------------
echo "Updating src/App.jsx to include Forgot Password route..."

# We simply overwrite App.jsx to ensure cleaner insertion
cat <<EOF > src/App.jsx
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useLayoutEffect } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'

// Pages
import LandingPage from './pages/LandingPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import About from './pages/About'
import Contact from './pages/Contact'
import Tutors from './pages/Tutors'
import FAQ from './pages/FAQ'
import NotFound from './pages/NotFound'

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'

import AppLayout from './components/layout/AppLayout'
import AdminRoute from './components/auth/AdminRoute'

import Dashboard from './pages/app/Dashboard'
import Courses from './pages/app/Courses'
import Store from './pages/app/Store'
import MyDownloads from './pages/app/MyDownloads'
import LiveLessons from './pages/app/LiveLessons'
import CoursePlayer from './pages/app/CoursePlayer'
import AdminDashboard from './pages/admin/AdminDashboard'
import Profile from './pages/app/Profile'

const Wrapper = ({children}) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children
}

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>
  if (!user) return <Navigate to="/login" />
  return children
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Wrapper>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/termini" element={<TermsPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/tutors" element={<Tutors />} />
            <Route path="/faq" element={<FAQ />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Protected App Routes */}
            <Route path="/" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="corsi" element={<Courses />} />
              <Route path="store" element={<Store />} />
              <Route path="downloads" element={<MyDownloads />} />
              <Route path="corsi/:id" element={<CoursePlayer />} />
              <Route path="lezioni-live" element={<LiveLessons />} />
              
              {/* Admin Routes Protected */}
              <Route element={<AdminRoute />}>
                <Route path="admin" element={<AdminDashboard />} />
              </Route>
            </Route>

            {/* Catch All */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Wrapper>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
EOF

# ------------------------------------------------------------------------------
# 4. UPDATE LOGIN.JSX (Add link to Forgot Password)
# ------------------------------------------------------------------------------
echo "Updating src/pages/auth/Login.jsx..."

cat <<EOF > src/pages/auth/Login.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Loader2 } from 'lucide-react'
import { supabase } from '../../lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { data, error } = await signIn({ email, password })
    
    if (error) {
      alert("Login error: " + error.message)
    } else {
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', data.user.id).single()
      if (profile?.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/dashboard')
      }
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FC] px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full border-t-4 border-brand-purple">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-brand-dark">Welcome Back! 👋</h1>
          <p className="text-gray-500">Access your student area</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-purple outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <Link to="/forgot-password" class="text-xs text-brand-purple font-bold hover:underline">Forgot?</Link>
            </div>
            <input 
              type="password" 
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-purple outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button 
            disabled={loading}
            type="submit" 
            className="w-full bg-brand-purple text-white font-bold py-3 rounded-lg hover:opacity-90 flex justify-center"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Login"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Don't have an account? <Link to="/register" className="text-brand-purple font-bold hover:underline">Register</Link>
        </p>
        <p className="text-center mt-2 text-sm">
          <Link to="/" className="text-gray-400 hover:text-gray-600">← Back to Home</Link>
        </p>
      </div>
    </div>
  )
}
EOF

# ------------------------------------------------------------------------------
# 5. UPDATE ADMIN DASHBOARD (Add CSV Export)
# ------------------------------------------------------------------------------
echo "Updating src/pages/admin/AdminDashboard.jsx with CSV Export..."

# We rewrite the file to inject the CSV logic cleanly
cat <<EOF > src/pages/admin/AdminDashboard.jsx
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import { Upload, Package, LayoutList, Loader2, Trash2, RefreshCw, Users, MessageSquare, Download, Image as ImageIcon, Edit, X, FileText, Video, Mic } from 'lucide-react'
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

  const downloadCSV = () => {
    if(leads.length === 0) return;
    const headers = ["Name", "Email", "Date", "Webinar Preference"];
    const rows = leads.map(l => [l.full_name, l.email, new Date(l.created_at).toLocaleDateString(), l.webinar_date]);
    
    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(e => e.join(",")).join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "webinar_leads.csv");
    document.body.appendChild(link);
    link.click();
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

  const handleSaveProduct = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      let finalImage = productData.image_url
      if (productCoverFile) finalImage = await uploadToStorage(productCoverFile, 'course-materials', 'covers')

      let finalDownload = productData.download_link
      if (productEbookFile) finalDownload = await uploadToStorage(productEbookFile, 'course-materials', 'ebooks')

      let finalDesc = productData.description
      if (productData.type === 'standalone' && productData.zoom_link) {
        finalDesc += \`\n\n[[ZOOM::\${productData.zoom_link}]]\`
      }
      if (productData.type === 'ebook' && finalDownload) {
        finalDesc += \`\n\n[[DOWNLOAD_URL::\${finalDownload}]]\`
      }

      const payload = {
        title: productData.title,
        price: productData.price,
        type: productData.type,
        description: finalDesc,
        image_url: finalImage
      }

      const pid = productData.id || productData.title.toLowerCase().replace(/[^a-z0-9]/g, '-')

      if (editingId) {
        const { error } = await supabase.from('products').update(payload).eq('id', editingId)
        if (error) throw error
      } else {
        const { error } = await supabase.from('products').insert([{ ...payload, id: pid }])
        if (error) throw error
      }

      alert("Prodotto salvato!")
      cancelEdit()
      fetchData()
    } catch (err) { alert("Errore: " + err.message) } 
    finally { setLoading(false) }
  }

  const handleSaveLesson = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      let finalVideoUrl = lessonData.video_url
      if (lessonData.type === 'audio' && lessonMediaFile) {
        finalVideoUrl = await uploadToStorage(lessonMediaFile, 'course-materials', 'lessons/audio')
      }
      let finalPdfUrl = lessonData.pdf_url
      if (lessonPdfFile) {
        finalPdfUrl = await uploadToStorage(lessonPdfFile, 'course-materials', 'lessons/pdf')
      }

      const payload = {
        course_id: lessonData.course_id,
        title: lessonData.title,
        type: lessonData.type,
        video_url: finalVideoUrl,
        pdf_url: finalPdfUrl,
        quizlet_url: lessonData.quizlet_url,
        description: lessonData.description
      }

      if (editingId) {
        const { error } = await supabase.from('lessons').update(payload).eq('id', editingId)
        if (error) throw error
      } else {
        const { error } = await supabase.from('lessons').insert([payload])
        if (error) throw error
      }

      alert("Lezione salvata!")
      cancelEdit()
      fetchData()
    } catch (err) { alert("Errore: " + err.message) } 
    finally { setLoading(false) }
  }

  const handleDelete = async (table, id) => {
    if(!window.confirm("Sei sicuro? L'azione è irreversibile.")) return;
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

      <div className="flex gap-4 mb-8 border-b border-gray-200 overflow-x-auto pb-1">
        {[
          { id: 'lessons', icon: LayoutList, label: 'Lezioni' },
          { id: 'products', icon: Package, label: 'Prodotti' },
          { id: 'leads', icon: Users, label: 'Iscritti' },
          { id: 'messages', icon: MessageSquare, label: 'Messaggi' }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)} 
            className={\`flex items-center gap-2 px-4 py-2 font-bold rounded-t-lg transition \${activeTab === tab.id ? 'bg-brand-purple text-white' : 'text-gray-500 hover:bg-gray-100'}\`}
          >
            <tab.icon size={18}/> {tab.label}
          </button>
        ))}
      </div>

      {/* --- LESSONS TAB --- */}
      {activeTab === 'lessons' && (
        <div className="grid lg:grid-cols-3 gap-8">
           <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg border-t-4 border-brand-purple h-fit sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-lg text-gray-800">{editingId ? 'Modifica Lezione' : 'Nuova Lezione'}</h2>
                {editingId && <button onClick={cancelEdit}><X size={20} className="text-gray-400 hover:text-red-500"/></button>}
              </div>
              <form onSubmit={handleSaveLesson} className="space-y-4">
                <div>
                  <label className="label">Corso di appartenenza</label>
                  <select className="input-field" value={lessonData.course_id} onChange={e => setLessonData({...lessonData, course_id: e.target.value})}>
                    {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                  </select>
                </div>
                
                <input required type="text" className="input-field" placeholder="Titolo Lezione" value={lessonData.title} onChange={e => setLessonData({...lessonData, title: e.target.value})} />
                
                <div>
                   <label className="label">Tipo Lezione</label>
                   <select className="input-field" value={lessonData.type} onChange={e => setLessonData({...lessonData, type: e.target.value})}><option value="video">Video</option><option value="audio">Audio</option></select>
                </div>

                {lessonData.type === 'video' ? (
                  <input type="url" className="input-field" placeholder="YouTube/Vimeo URL" value={lessonData.video_url} onChange={e => setLessonData({...lessonData, video_url: e.target.value})} />
                ) : (
                  <div className="file-input-wrapper">
                    <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600"><Mic size={16}/> {lessonMediaFile ? lessonMediaFile.name : "Carica file MP3"}</label>
                    <input type="file" accept="audio/*" className="hidden" onChange={e => setLessonMediaFile(e.target.files[0])} />
                  </div>
                )}

                <div className="file-input-wrapper">
                  <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600"><FileText size={16}/> {lessonPdfFile ? lessonPdfFile.name : "Allega PDF (Opzionale)"}</label>
                  <input type="file" accept=".pdf" className="hidden" onChange={e => setLessonPdfFile(e.target.files[0])} />
                </div>
                
                <input type="url" className="input-field" placeholder="Link Quizlet (Flashcards)" value={lessonData.quizlet_url} onChange={e => setLessonData({...lessonData, quizlet_url: e.target.value})} />
                <textarea className="input-field" placeholder="Descrizione lezione..." rows="3" value={lessonData.description} onChange={e => setLessonData({...lessonData, description: e.target.value})} />
                
                <button disabled={loading} type="submit" className="btn-primary w-full">{loading ? <Loader2 className="animate-spin mx-auto"/> : "Salva Lezione"}</button>
              </form>
           </div>

           <div className="lg:col-span-2 space-y-3">
              {allLessons.map(l => (
                  <div key={l.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center hover:shadow-md transition">
                      <div className="flex items-center gap-3">
                        <div className={\`p-2 rounded-lg \${l.type === 'audio' ? 'bg-purple-100 text-brand-purple' : 'bg-blue-100 text-brand-blue'}\`}>
                           {l.type === 'audio' ? <Mic size={20}/> : <Video size={20}/>}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800">{l.title}</h4>
                          <p className="text-xs text-gray-500">{l.products?.title || 'Nessun Corso'} • {l.pdf_url ? '📎 PDF Incluso' : 'Nessun PDF'}</p>
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
                <h2 className="font-bold text-lg text-gray-800">{editingId ? 'Modifica Prodotto' : 'Nuovo Prodotto'}</h2>
                {editingId && <button onClick={cancelEdit}><X size={20} className="text-gray-400 hover:text-red-500"/></button>}
              </div>
              <form onSubmit={handleSaveProduct} className="space-y-4">
                <input required type="text" className="input-field" placeholder="Titolo Prodotto" value={productData.title} onChange={e => setProductData({...productData, title: e.target.value})} />
                
                <div className="grid grid-cols-2 gap-3">
                   <input required type="text" className="input-field" placeholder="Prezzo (es. 15.000 Ft)" value={productData.price} onChange={e => setProductData({...productData, price: e.target.value})} />
                   <select className="input-field" value={productData.type} onChange={e => setProductData({...productData, type: e.target.value})}>
                      <option value="course">Corso (Video)</option>
                      <option value="ebook">Ebook (Download)</option>
                      <option value="standalone">Live (Zoom)</option>
                   </select>
                </div>

                {!editingId && <input type="text" className="input-field text-sm font-mono" placeholder="ID Univoco (es. coreano-base)" value={productData.id} onChange={e => setProductData({...productData, id: e.target.value})} />}

                {productData.type === 'standalone' && (
                   <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                      <label className="label text-brand-blue">Link Zoom Lezione</label>
                      <input type="url" className="input-field bg-white" placeholder="https://zoom.us/..." value={productData.zoom_link} onChange={e => setProductData({...productData, zoom_link: e.target.value})} />
                   </div>
                )}

                {productData.type === 'ebook' && (
                   <div className="file-input-wrapper border-dashed border-2 border-purple-200 bg-purple-50">
                      <label className="flex items-center gap-2 cursor-pointer text-sm text-brand-purple font-bold"><Upload size={16}/> {productEbookFile ? productEbookFile.name : "Carica PDF Ebook"}</label>
                      <input type="file" accept=".pdf" className="hidden" onChange={e => setProductEbookFile(e.target.files[0])} />
                   </div>
                )}

                <div className="file-input-wrapper">
                   <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600"><ImageIcon size={16}/> {productCoverFile ? productCoverFile.name : "Carica Copertina (Image)"}</label>
                   <input type="file" accept="image/*" className="hidden" onChange={e => setProductCoverFile(e.target.files[0])} />
                </div>

                <textarea className="input-field" placeholder="Descrizione..." rows="4" value={productData.description} onChange={e => setProductData({...productData, description: e.target.value})} />
                
                <button disabled={loading} type="submit" className="btn-primary w-full bg-brand-blue">{loading ? <Loader2 className="animate-spin mx-auto"/> : "Salva Prodotto"}</button>
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
                            <span className={\`px-2 py-0.5 rounded \${p.type === 'course' ? 'bg-purple-100 text-brand-purple' : p.type === 'ebook' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}\`}>{p.type}</span>
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
              <h3 className="font-bold text-lg text-gray-700">Iscritti Webinar ({leads.length})</h3>
              <button onClick={downloadCSV} className="flex items-center gap-2 bg-brand-dark text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800"><Download size={16}/> Export CSV</button>
           </div>
           <div className="overflow-x-auto">
             <table className="w-full text-sm text-left">
                <thead className="text-gray-400 font-bold uppercase border-b border-gray-100 bg-white">
                   <tr><th className="p-4">Data Reg.</th><th className="p-4">Nome</th><th className="p-4">Email</th><th className="p-4">Preferenza</th></tr>
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
           {messages.length === 0 && <p className="text-gray-400 col-span-2 text-center p-10">Nessun messaggio ricevuto.</p>}
        </div>
      )}

      <style>{\`
        .label { display: block; font-size: 0.85rem; font-weight: bold; color: #4b5563; margin-bottom: 0.3rem; }
        .input-field { width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 0.5rem; outline: none; font-size: 0.9rem; transition: all 0.2s; }
        .input-field:focus { border-color: #6a11cb; ring: 2px solid #6a11cb33; }
        .btn-primary { background: #192335; color: white; font-weight: bold; padding: 0.8rem; border-radius: 0.5rem; transition: opacity 0.2s; }
        .btn-primary:hover { opacity: 0.9; }
        .file-input-wrapper { border: 1px solid #e5e7eb; padding: 0.75rem; border-radius: 0.5rem; background: #f9fafb; }
        .action-btn { padding: 0.5rem; border-radius: 0.5rem; transition: background 0.2s; }
      \`}</style>
    </div>
  )
}
EOF

echo "-----------------------------------------------------------------"
echo "✅ Project Setup Finished!"
echo "-----------------------------------------------------------------"
echo "1. Run the SQL in 'final_db_setup.sql' in your Supabase SQL Editor."
echo "   (This fixes RLS policies so users can actually see content)"
echo ""
echo "2. You must also manually create two storage buckets in Supabase:"
echo "   - 'course-materials' (Public)"
echo "   - 'avatars' (Public)"
echo "   (The SQL only sets policies, creating buckets via SQL is cleaner in Dashboard)"
echo ""
echo "3. Run 'npm run dev' to start."
echo "-----------------------------------------------------------------"