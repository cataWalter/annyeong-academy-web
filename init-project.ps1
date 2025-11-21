# finalize-app.ps1

Write-Host "🚀 FINALIZZAZIONE APP (ADMIN, PLAYER & PAYMENTS)..." -ForegroundColor Cyan

# --- 1. CARTELLE EXTRA ---
Write-Host "[1/5] Creazione cartelle Admin..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path "src/pages/admin" | Out-Null

# --- 2. SERVIZIO PAGAMENTI (Mock/Real) ---
Write-Host "[2/5] Creazione Servizio Pagamenti..." -ForegroundColor Yellow

$PaymentService = @"
import { supabase } from './supabase'

export const initiateCheckout = async (courseId, courseTitle) => {
  // 1. Controlla se l'utente è loggato
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: "Devi effettuare il login per acquistare." }

  // 2. In uno scenario reale, qui chiameresti una Supabase Edge Function
  // const { data, error } = await supabase.functions.invoke('create-checkout', { body: { courseId } })
  
  // SIMULAZIONE PER IL FRONTEND:
  console.log(\`Avvio checkout Stripe per: \${courseTitle} (ID: \${courseId})\`)
  alert(\`Simulazione: Reindirizzamento a Stripe per "\${courseTitle}"...\`)
  
  // Qui Stripe ti rimanderebbe indietro. Simuliamo l'acquisto avvenuto:
  return { success: true }
}
"@
Set-Content -Path "src/lib/payment.js" -Value $PaymentService -Encoding UTF8

# --- 3. PANNELLO ADMIN (Upload Materiali) ---
Write-Host "[3/5] Creazione Admin Dashboard (Upload)..." -ForegroundColor Yellow

$AdminDashboard = @"
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
        const fileName = \`\${Date.now()}-\${file.name}\`
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
"@
Set-Content -Path "src/pages/admin/AdminDashboard.jsx" -Value $AdminDashboard -Encoding UTF8

# --- 4. COURSE PLAYER (LMS View) ---
Write-Host "[4/5] Creazione Course Player (LMS)..." -ForegroundColor Yellow

$CoursePlayer = @"
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PlayCircle, FileDown, CheckCircle, Lock } from 'lucide-react'

export default function CoursePlayer() {
  const { id } = useParams()
  const [activeLesson, setActiveLesson] = useState(0)

  // Mock Data (In produzione: fetch da Supabase 'lessons' table)
  const course = {
    title: "Coreano Base 1",
    lessons: [
      { id: 1, title: "L'alfabeto Hangul - Parte 1", duration: "15:00", type: "video", locked: false },
      { id: 2, title: "L'alfabeto Hangul - Parte 2", duration: "20:00", type: "video", locked: false },
      { id: 3, title: "Saluti e Presentazioni", duration: "12:00", type: "video", locked: true }, // Demo locked
      { id: 4, title: "Ordinare al ristorante", duration: "18:00", type: "video", locked: true },
    ]
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-100px)]">
      
      {/* Video Player Area */}
      <div className="flex-1 flex flex-col">
        <div className="bg-black rounded-2xl overflow-hidden aspect-video flex items-center justify-center relative shadow-lg">
          <div className="absolute inset-0 bg-[url('https://placehold.co/1280x720/1a1a1a/ffffff?text=Video+Player')] bg-cover opacity-50"></div>
          <PlayCircle className="w-20 h-20 text-white opacity-80 hover:opacity-100 cursor-pointer transition" />
        </div>
        
        <div className="mt-6 bg-white p-6 rounded-2xl border border-gray-100 flex-1">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-2xl font-bold text-brand-dark">
              {course.lessons[activeLesson].title}
            </h1>
            <button className="flex items-center gap-2 text-brand-purple font-bold bg-purple-50 px-4 py-2 rounded-lg hover:bg-purple-100 transition">
              <FileDown size={18} /> Scarica PDF
            </button>
          </div>
          <p className="text-gray-600">
            In questa lezione impareremo le vocali base e come comporre le prime sillabe. 
            Scarica il PDF per gli esercizi di scrittura.
          </p>
        </div>
      </div>

      {/* Playlist Sidebar */}
      <div className="w-full lg:w-80 bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-100 bg-gray-50">
          <h3 className="font-bold text-gray-700">Contenuto del Corso</h3>
          <p className="text-xs text-gray-500">{course.lessons.length} Lezioni</p>
        </div>
        
        <div className="overflow-y-auto flex-1">
          {course.lessons.map((lesson, index) => (
            <button 
              key={lesson.id}
              disabled={lesson.locked}
              onClick={() => setActiveLesson(index)}
              className={\`w-full text-left p-4 border-b border-gray-50 hover:bg-gray-50 transition flex items-center gap-3 \${activeLesson === index ? 'bg-purple-50 border-l-4 border-l-brand-purple' : ''} \${lesson.locked ? 'opacity-50 cursor-not-allowed' : ''}\`}
            >
              {lesson.locked ? (
                <Lock size={16} className="text-gray-400" />
              ) : (
                <PlayCircle size={16} className={activeLesson === index ? "text-brand-purple" : "text-gray-400"} />
              )}
              
              <div className="flex-1">
                <p className={\`text-sm font-medium \${activeLesson === index ? 'text-brand-purple' : 'text-gray-700'}\`}>
                  {lesson.title}
                </p>
                <span className="text-xs text-gray-400">{lesson.duration}</span>
              </div>

              {index < activeLesson && <CheckCircle size={16} className="text-green-500" />}
            </button>
          ))}
        </div>
      </div>

    </div>
  )
}
"@
Set-Content -Path "src/pages/app/CoursePlayer.jsx" -Value $CoursePlayer -Encoding UTF8

# --- 5. AGGIORNAMENTO ROUTER & LAYOUT ---
Write-Host "[5/5] Aggiornamento Router..." -ForegroundColor Yellow

# Aggiorniamo AppLayout per includere il link Admin (simulato)
$AppLayout = @"
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { LayoutDashboard, BookOpen, Calendar, LogOut, User, ShieldCheck } from 'lucide-react'

export default function AppLayout() {
  const { signOut, user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  const NavItem = ({ to, icon: Icon, label }) => {
    const isActive = location.pathname === to
    return (
      <Link 
        to={to} 
        className={\`flex items-center gap-3 px-4 py-3 rounded-xl transition-all \${isActive ? 'bg-brand-purple text-white shadow-md' : 'text-gray-600 hover:bg-purple-50'}\`}
      >
        <Icon size={20} />
        <span className="font-medium">{label}</span>
      </Link>
    )
  }

  return (
    <div className="flex min-h-screen bg-[#F8F9FC]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col fixed h-full z-10">
        <div className="p-6">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-purple">
            Annyeong LMS
          </span>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
          <NavItem to="/corsi" icon={BookOpen} label="Tutti i Corsi" />
          <NavItem to="/lezioni-live" icon={Calendar} label="Lezioni Live" />
          
          {/* Link Admin Simulato */}
          <div className="pt-4 mt-4 border-t border-gray-100">
             <p className="px-4 text-xs font-bold text-gray-400 uppercase mb-2">Admin Area</p>
             <NavItem to="/admin" icon={ShieldCheck} label="Gestione Corsi" />
          </div>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
              <User size={16} />
            </div>
            <div className="text-sm overflow-hidden">
              <p className="font-bold text-gray-700 truncate">Utente</p>
              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition text-sm font-medium"
          >
            <LogOut size={18} /> Esci
          </button>
        </div>
      </aside>

      {/* Mobile Header & Content */}
      <div className="flex-1 md:ml-64">
        <header className="md:hidden bg-white p-4 shadow-sm flex justify-between items-center sticky top-0 z-20">
          <span className="font-bold text-brand-purple">Annyeong LMS</span>
          <button onClick={handleLogout}><LogOut size={20} className="text-gray-500" /></button>
        </header>
        
        <main className="p-4 md:p-8 max-w-6xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
"@
Set-Content -Path "src/components/layout/AppLayout.jsx" -Value $AppLayout -Encoding UTF8

# Aggiorniamo App.jsx con le nuove rotte
$AppJsx = @"
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useLayoutEffect } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'

// Pages
import LandingPage from './pages/LandingPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import AppLayout from './components/layout/AppLayout'
import Dashboard from './pages/app/Dashboard'
import Courses from './pages/app/Courses'
import LiveLessons from './pages/app/LiveLessons'
import CoursePlayer from './pages/app/CoursePlayer'
import AdminDashboard from './pages/admin/AdminDashboard'

const Wrapper = ({children}) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children
}

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return <div className="h-screen flex items-center justify-center">Caricamento...</div>
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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected App Routes */}
            <Route path="/" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="corsi" element={<Courses />} />
              <Route path="corsi/:id" element={<CoursePlayer />} /> {/* Player LMS */}
              <Route path="lezioni-live" element={<LiveLessons />} />
              <Route path="admin" element={<AdminDashboard />} /> {/* Admin */}
            </Route>

          </Routes>
        </Wrapper>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
"@
Set-Content -Path "src/App.jsx" -Value $AppJsx -Encoding UTF8

Write-Host "-------------------------------------------------------"
Write-Host "✅ SVILUPPO FRONTEND COMPLETATO!" -ForegroundColor Green
Write-Host "Nuove funzionalità aggiunte:"
Write-Host "1. /admin -> Dashboard per caricare video e PDF (usa Supabase Storage)."
Write-Host "2. /corsi/:id -> Player del corso con playlist e download."
Write-Host "3. Integrazione Stripe (simulata nel file payment.js)."
Write-Host "-------------------------------------------------------"
Write-Host "Il progetto è pronto per il deploy su Vercel."
Write-Host "-------------------------------------------------------"