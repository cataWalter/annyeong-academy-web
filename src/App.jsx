import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useLayoutEffect } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import { PaymentProvider } from './context/PaymentContext'
import { LanguageProvider } from './context/LanguageContext'

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
import SupabaseConfigWarning from './components/auth/SupabaseConfigWarning'
import LegalNotice from "./components/ui/LegalNotice"

import Dashboard from './pages/app/Dashboard'
import Courses from './pages/app/Courses'
import Store from './pages/app/Store'
import MyDownloads from './pages/app/MyDownloads'
import LiveLessons from './pages/app/LiveLessons'
import CoursePlayer from './pages/app/CoursePlayer'
import AdminDashboard from './pages/admin/AdminDashboard'
import Profile from './pages/app/Profile'
import Leaderboard from './pages/app/Leaderboard'
import MyNotebook from './pages/app/MyNotebook'

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
    <LanguageProvider>
      <SupabaseConfigWarning />
      <ToastProvider>
        <AuthProvider>
          <PaymentProvider>
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
                    <Route path="leaderboard" element={<Leaderboard />} />
                    <Route path="notebook" element={<MyNotebook />} />
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
                <LegalNotice />
              </Wrapper>
            </BrowserRouter>
          </PaymentProvider>
        </AuthProvider>
      </ToastProvider>
    </LanguageProvider>
  )
}

export default App
