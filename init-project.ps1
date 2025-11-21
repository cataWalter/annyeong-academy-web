# update-project.ps1

Write-Host "🔄 RIPRISTINO E AGGIORNAMENTO FILE..." -ForegroundColor Cyan

# --- 1. INSTALLAZIONE DIPENDENZE ---
Write-Host "[1/6] Verifica e installazione pacchetti..." -ForegroundColor Yellow
# Lancia npm install per assicurarsi che tutto sia scaricato
cmd /c "npm install"
cmd /c "npm install -D tailwindcss postcss autoprefixer"
cmd /c "npm install @supabase/supabase-js react-router-dom lucide-react"

# --- 2. CONFIGURAZIONE TAILWIND ---
Write-Host "[2/6] Configurazione Tailwind CSS..." -ForegroundColor Yellow
cmd /c "npx tailwindcss init -p"

# Configurazione Tailwind
$tailwindConfig = @"
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#6a11cb',
          blue: '#2575fc',
          dark: '#192335',
        }
      }
    },
  },
  plugins: [],
}
"@
Set-Content -Path "tailwind.config.js" -Value $tailwindConfig -Encoding UTF8

# CSS Globale
$indexCss = @"
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
    font-family: 'Inter', sans-serif;
    background-color: #F8F9FC;
}
"@
Set-Content -Path "src/index.css" -Value $indexCss -Encoding UTF8

# --- 3. STRUTTURA CARTELLE ---
Write-Host "[3/6] Verifica cartelle..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path "src/lib" | Out-Null
New-Item -ItemType Directory -Force -Path "src/components" | Out-Null
New-Item -ItemType Directory -Force -Path "src/pages" | Out-Null

# --- 4. FILE DI SUPPORTO (Supabase & Env) ---
Write-Host "[4/6] Scrittura file di configurazione..." -ForegroundColor Yellow

$supabaseClient = @"
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
"@
Set-Content -Path "src/lib/supabase.js" -Value $supabaseClient -Encoding UTF8

# Creiamo .env.local solo se non esiste per non sovrascrivere le tue chiavi se le hai già messe
if (-not (Test-Path ".env.local")) {
    $envFile = @"
VITE_SUPABASE_URL=INSERISCI_QUI_URL_SUPABASE
VITE_SUPABASE_ANON_KEY=INSERISCI_QUI_ANON_KEY_SUPABASE
"@
    Set-Content -Path ".env.local" -Value $envFile -Encoding UTF8
}

# --- 5. COMPONENTI REACT ---
Write-Host "[5/6] Scrittura componenti React..." -ForegroundColor Yellow

# WebinarForm.jsx
$WebinarForm = @"
import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Loader2 } from 'lucide-react'

export default function WebinarForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    webinar_date: 'Dec 6',
    gdpr_consent: false
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.gdpr_consent) return alert('Devi accettare la privacy policy')
    
    setLoading(true)
    
    const { error } = await supabase
      .from('webinar_leads')
      .insert([formData])

    setLoading(false)

    if (error) {
      alert('Errore durante l''iscrizione: ' + error.message)
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div className="text-center p-8 bg-green-50 rounded-xl border border-green-200">
        <h3 className="text-2xl font-bold text-green-700 mb-2">Iscrizione Confermata!</h3>
        <p className="text-green-800">Controlla la tua email per il link di Zoom.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-lg max-w-md mx-auto border-t-4 border-brand-purple">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
        <input 
          required
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-purple outline-none"
          value={formData.full_name}
          onChange={e => setFormData({...formData, full_name: e.target.value})}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input 
          required
          type="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-purple outline-none"
          value={formData.email}
          onChange={e => setFormData({...formData, email: e.target.value})}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Scegli una data</label>
        <select 
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-purple outline-none"
          value={formData.webinar_date}
          onChange={e => setFormData({...formData, webinar_date: e.target.value})}
        >
          <option value="Dec 6">6 Dicembre - 18:00</option>
          <option value="Dec 7">7 Dicembre - 18:00</option>
        </select>
      </div>

      <div className="flex items-start gap-3">
        <input 
          required
          type="checkbox" 
          id="gdpr"
          className="mt-1 w-4 h-4 text-brand-purple rounded border-gray-300 focus:ring-brand-purple"
          checked={formData.gdpr_consent}
          onChange={e => setFormData({...formData, gdpr_consent: e.target.checked})}
        />
        <label htmlFor="gdpr" className="text-sm text-gray-600">
          Accetto la <a href="#" className="text-brand-purple underline">Privacy Policy</a>.
        </label>
      </div>

      <button 
        disabled={loading}
        type="submit" 
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-full hover:opacity-90 disabled:opacity-50 flex justify-center items-center"
      >
        {loading ? <Loader2 className="animate-spin mr-2" /> : 'Prenota il mio posto GRATIS'}
      </button>
    </form>
  )
}
"@
Set-Content -Path "src/components/WebinarForm.jsx" -Value $WebinarForm -Encoding UTF8

# LandingPage.jsx
$LandingPage = @"
import WebinarForm from '../components/WebinarForm'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      {/* Navbar semplice */}
      <nav className="p-6 flex justify-center bg-white shadow-sm">
        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Annyeong Akadémia
        </span>
      </nav>

      <main className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
        {/* Hero Text */}
        <div className="space-y-6 text-center md:text-left">
          <span className="inline-block py-1 px-3 rounded-full bg-purple-100 text-brand-purple text-sm font-semibold">
            Unisciti a +500 studenti
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Impara il coreano <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Senza sapere l'inglese!
            </span>
          </h1>
          <p className="text-lg text-gray-600">
            Partecipa alla nostra serata culturale online interattiva. 
            Prova la tecnologia di traduzione AI e impara dai madrelingua.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="text-3xl mb-2">No UK</div>
              <div className="font-bold text-gray-800">No Inglese</div>
              <div className="text-sm text-gray-500">Traduzione diretta in Italiano</div>
            </div>
            <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="text-3xl mb-2">KR</div>
              <div className="font-bold text-gray-800">100% Autentico</div>
              <div className="text-sm text-gray-500">In diretta da Seoul</div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="relative mt-8 md:mt-0">
          <WebinarForm />
          <p className="text-center text-xs text-gray-400 mt-4">
            Posti limitati su Zoom per garantire la qualità.
          </p>
        </div>
      </main>
    </div>
  )
}
"@
Set-Content -Path "src/pages/LandingPage.jsx" -Value $LandingPage -Encoding UTF8

# App.jsx
$AppJsx = @"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
"@
Set-Content -Path "src/App.jsx" -Value $AppJsx -Encoding UTF8

# --- 6. PULIZIA ---
Write-Host "[6/6] Pulizia file inutili..." -ForegroundColor Yellow
if (Test-Path "src/App.css") { Remove-Item "src/App.css" }
if (Test-Path "src/assets/react.svg") { Remove-Item "src/assets/react.svg" }

Write-Host "-------------------------------------------------------"
Write-Host "AGGIORNAMENTO COMPLETATO!" -ForegroundColor Green
Write-Host "Lancia 'npm run dev' per avviare."
Write-Host "-------------------------------------------------------"