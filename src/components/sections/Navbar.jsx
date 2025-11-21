import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToForm = () => {
    document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={ixed top-0 left-0 w-full z-50 transition-all duration-300 \}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-purple">
            Annyeong AkadÃ©mia
          </span>
        </div>
        <button 
          onClick={scrollToForm}
          className="hidden md:block px-6 py-2 bg-brand-dark text-white rounded-full font-semibold hover:bg-gray-800 transition"
        >
          Prenota il tuo posto
        </button>
      </div>
    </nav>
  )
}
