import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useLayoutEffect } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'

// Pages Public
import LandingPage from './pages/LandingPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import About from './pages/About'
import Contact from './pages/Contact'
import Tutors from './pages/Tutors'
import FAQ from './pages/FAQ'

// Pages Auth
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

// Pages App
import AppLayout from './components/layout/AppLayout'
import Dashboard from './pages/app/Dashboard'
import Courses from './pages/app/Courses'
import Store from './pages/app/Store'
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
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/tutors" element={<Tutors />} />
            <Route path="/faq" element={<FAQ />} />
            
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected App Routes */}
            <Route path="/" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="corsi" element={<Courses />} />
              <Route path="store" element={<Store />} />
              <Route path="corsi/:id" element={<CoursePlayer />} />
              <Route path="lezioni-live" element={<LiveLessons />} />
              <Route path="admin" element={<AdminDashboard />} />
            </Route>

          </Routes>
        </Wrapper>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
