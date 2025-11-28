"use client";
import { useRouter, usePathname } from 'next/navigation'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, LogIn, LayoutDashboard } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function Navbar() {
  const { user } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToForm = async () => {
    setMobileMenuOpen(false)
    
    // If not on home page, go there first
    if (pathname !== '/') {
      router.push('/')
      // Small timeout to allow page load before scrolling
      // In Next.js, we might need a more robust way, but this works for simple cases
      setTimeout(() => {
        const form = document.getElementById('registration')
        if (form) form.scrollIntoView({ behavior: 'smooth' })
      }, 500)
    } else {
      // Already on home page
      const form = document.getElementById('registration')
      if (form) form.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-purple">
            Annyeong Academy
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/about" className="text-gray-600 hover:text-brand-purple font-medium transition">About Us</Link>
          <Link href="/tutors" className="text-gray-600 hover:text-brand-purple font-medium transition">Teachers</Link>
          
          <div className="h-6 w-px bg-gray-300"></div>
          
          {user ? (
            <Link href="/dashboard" className="flex items-center gap-2 text-brand-dark font-bold hover:text-brand-purple transition">
              <div className="bg-brand-purple text-white p-1 rounded-md"><LayoutDashboard size={16} /></div>
              Dashboard
            </Link>
          ) : (
            <Link href="/login" className="flex items-center gap-2 text-brand-dark font-bold hover:text-brand-purple transition">
              <LogIn size={18} /> Login
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
          <Link href="/about" className="text-lg font-medium text-gray-700" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
          <Link href="/tutors" className="text-lg font-medium text-gray-700" onClick={() => setMobileMenuOpen(false)}>Teachers</Link>
          
          {user ? (
             <Link href="/dashboard" className="text-lg font-bold text-brand-purple flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <LayoutDashboard size={20} /> Dashboard
             </Link>
          ) : (
             <Link href="/login" className="text-lg font-bold text-brand-dark flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <LogIn size={20} /> Login
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
