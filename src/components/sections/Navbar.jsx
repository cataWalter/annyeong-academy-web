import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, LogIn, LayoutDashboard, Globe } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'

export default function Navbar() {
  const { user } = useAuth()
  const { t, lang, toggleLanguage } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToForm = async () => {
    setMobileMenuOpen(false)
    if (location.pathname !== '/') {
      await navigate('/')
      setTimeout(() => {
        const form = document.getElementById('registration')
        if (form) form.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      const form = document.getElementById('registration')
      if (form) form.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-purple">
            Annyeong Academy
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/about" className="text-gray-600 hover:text-brand-purple font-medium transition">{t('nav_about')}</Link>
          <Link to="/tutors" className="text-gray-600 hover:text-brand-purple font-medium transition">{t('nav_tutors')}</Link>
          
          {/* Language Toggle */}
          <button onClick={toggleLanguage} className="flex items-center gap-1 text-sm font-bold text-gray-500 hover:text-brand-dark uppercase">
            <Globe size={16} /> {lang}
          </button>

          <div className="h-6 w-px bg-gray-300"></div>
          
          {user ? (
            <Link to="/dashboard" className="flex items-center gap-2 text-brand-dark font-bold hover:text-brand-purple transition">
              <div className="bg-brand-purple text-white p-1 rounded-md"><LayoutDashboard size={16} /></div>
              {t('nav_dashboard')}
            </Link>
          ) : (
            <Link to="/login" className="flex items-center gap-2 text-brand-dark font-bold hover:text-brand-purple transition">
              <LogIn size={18} /> {t('nav_login')}
            </Link>
          )}
          
          <button 
            onClick={scrollToForm}
            className="px-6 py-2 bg-brand-dark text-white rounded-full font-semibold hover:bg-gray-800 transition shadow-lg hover:shadow-xl"
          >
            Book Webinar
          </button>
        </div>

        <button className="md:hidden text-gray-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl p-6 flex flex-col gap-4">
          <Link to="/about" className="text-lg font-medium text-gray-700" onClick={() => setMobileMenuOpen(false)}>{t('nav_about')}</Link>
          <Link to="/tutors" className="text-lg font-medium text-gray-700" onClick={() => setMobileMenuOpen(false)}>{t('nav_tutors')}</Link>
          
          <button onClick={toggleLanguage} className="flex items-center gap-2 text-lg font-medium text-gray-700 justify-start">
            <Globe size={20} /> Switch to {lang === 'en' ? 'Hungarian' : 'English'}
          </button>

          {user ? (
             <Link to="/dashboard" className="text-lg font-bold text-brand-purple flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <LayoutDashboard size={20} /> {t('nav_dashboard')}
             </Link>
          ) : (
             <Link to="/login" className="text-lg font-bold text-brand-dark flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <LogIn size={20} /> {t('nav_login')}
             </Link>
          )}

          <button 
            onClick={scrollToForm}
            className="w-full py-3 bg-brand-dark text-white rounded-xl font-bold mt-2"
          >
            Book Webinar
          </button>
        </div>
      )}
    </nav>
  )
}
