import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, LogIn } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToForm = () => {
    const form = document.getElementById('registration')
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <nav className={\ixed top-0 left-0 w-full z-50 transition-all duration-300 \\}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-purple">
            Annyeong AkadÃ©mia
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/about" className="text-gray-600 hover:text-brand-purple font-medium transition">Chi Siamo</Link>
          <Link to="/tutors" className="text-gray-600 hover:text-brand-purple font-medium transition">Insegnanti</Link>
          
          <div className="h-6 w-px bg-gray-300"></div>
          
          <Link to="/login" className="flex items-center gap-2 text-brand-dark font-bold hover:text-brand-purple transition">
            <LogIn size={18} /> Accedi
          </Link>
          
          <button 
            onClick={scrollToForm}
            className="px-6 py-2 bg-brand-dark text-white rounded-full font-semibold hover:bg-gray-800 transition shadow-lg hover:shadow-xl"
          >
            Prenota Webinar
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl p-6 flex flex-col gap-4">
          <Link to="/about" className="text-lg font-medium text-gray-700" onClick={() => setMobileMenuOpen(false)}>Chi Siamo</Link>
          <Link to="/tutors" className="text-lg font-medium text-gray-700" onClick={() => setMobileMenuOpen(false)}>Insegnanti</Link>
          <Link to="/login" className="text-lg font-bold text-brand-purple" onClick={() => setMobileMenuOpen(false)}>Area Studenti</Link>
          <button 
            onClick={scrollToForm}
            className="w-full py-3 bg-brand-dark text-white rounded-xl font-bold"
          >
            Prenota Webinar
          </button>
        </div>
      )}
    </nav>
  )
}
