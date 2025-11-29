"use client";
import { useRouter, usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, LogIn, LayoutDashboard, ShoppingCart, Search } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import NotificationBell from '@/components/ui/NotificationBell'
import GlobalSearch from '@/components/ui/GlobalSearch'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher' // NEW

export default function Navbar() {
  const { user } = useAuth()
  const { cart } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    
    const handleKeydown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
      if (e.key === 'Escape') setSearchOpen(false)
    }
    window.addEventListener('keydown', handleKeydown)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [])

  const scrollToForm = () => {
    setMobileMenuOpen(false)
    if (pathname !== '/') {
      router.push('/')
      setTimeout(() => {
        const form = document.getElementById('registration')
        if (form) form.scrollIntoView({ behavior: 'smooth' })
      }, 500)
    } else {
      const form = document.getElementById('registration')
      if (form) form.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gradient-brand">
                Annyeong Academy
              </span>
            </Link>
            {/* Desktop Lang Switcher */}
            <div className="hidden md:block"><LanguageSwitcher /></div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/about" className="text-gray-600 hover:text-brand-purple font-medium transition">About</Link>
            <Link href="/corsi" className="text-gray-600 hover:text-brand-purple font-medium transition">Courses</Link>
            <Link href="/tutors" className="text-gray-600 hover:text-brand-purple font-medium transition">Teachers</Link>
            
            <button onClick={() => setSearchOpen(true)} className="p-2 text-gray-500 hover:text-brand-purple transition">
              <Search size={20} />
            </button>

            <div className="flex items-center gap-4 border-l border-gray-300 pl-6">
              {user && <NotificationBell />}
              
              <Link href="/cart" className="relative text-gray-600 hover:text-brand-purple transition">
                <ShoppingCart size={22} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {cart.length}
                  </span>
                )}
              </Link>

              {user ? (
                <Link href="/dashboard" className="flex items-center gap-2 text-brand-dark font-bold hover:text-brand-purple transition">
                  <div className="bg-brand-purple text-white p-1 rounded-md"><LayoutDashboard size={16} /></div>
                  Dash
                </Link>
              ) : (
                <Link href="/login" className="flex items-center gap-2 text-brand-dark font-bold hover:text-brand-purple transition">
                  <LogIn size={18} /> Login
                </Link>
              )}
              
              <button 
                onClick={scrollToForm}
                className="btn btn-plum-gradient px-5 py-2 text-sm"
              >
                Join Free
              </button>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <LanguageSwitcher />
            <button onClick={() => setSearchOpen(true)} className="text-gray-700">
              <Search size={24} />
            </button>
            <button className="text-gray-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl p-6 flex flex-col gap-4 animate-slide-in">
            <Link href="/about" className="text-lg font-medium text-gray-700" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
            <Link href="/corsi" className="text-lg font-medium text-gray-700" onClick={() => setMobileMenuOpen(false)}>Courses</Link>
            <Link href="/tutors" className="text-lg font-medium text-gray-700" onClick={() => setMobileMenuOpen(false)}>Teachers</Link>
            <Link href="/blog" className="text-lg font-medium text-gray-700" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
            <Link href="/cart" className="text-lg font-medium text-gray-700 flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
              <ShoppingCart size={20}/> Cart ({cart.length})
            </Link>
            
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
              className="btn btn-plum-gradient w-full"
            >
              Book Webinar
            </button>
          </div>
        )}
      </nav>
      {searchOpen && <GlobalSearch onClose={() => setSearchOpen(false)} />}
    </>
  )
}
