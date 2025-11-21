import { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { LayoutDashboard, BookOpen, Calendar, LogOut, User, ShieldCheck, ShoppingBag, Settings, Download, Menu, X, Trophy, StickyNote } from 'lucide-react'
import AnnouncementBanner from '../ui/AnnouncementBanner'

export default function AppLayout() {
  const { signOut, user, profile, isAdmin } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  const NavItem = ({ to, icon: Icon, label }) => {
    const isActive = location.pathname === to
    return (
      <Link 
        to={to} 
        onClick={() => setMobileOpen(false)}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
          isActive ? 'bg-brand-purple text-white shadow-md' : 'text-gray-600 hover:bg-purple-50 hover:text-brand-purple'
        }`}
      >
        <Icon size={20} />
        <span className="font-medium">{label}</span>
      </Link>
    )
  }

  return (
    <div className="flex min-h-screen bg-[#F8F9FC]">
      <div className="md:hidden fixed top-0 left-0 w-full bg-white z-30 px-4 py-3 shadow-sm flex justify-between items-center">
        <span className="font-bold text-brand-purple text-lg">Annyeong LMS</span>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-gray-700"><X size={24} className={!mobileOpen && "hidden"}/><Menu size={24} className={mobileOpen && "hidden"}/></button>
      </div>

      {mobileOpen && <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => setMobileOpen(false)}></div>}

      <aside className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-30 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 hidden md:block">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-purple">Annyeong LMS</span>
        </div>
        
        <div className="md:hidden p-6 border-b border-gray-100 flex items-center justify-between">
           <span className="font-bold text-brand-dark">Menu</span>
           <button onClick={() => setMobileOpen(false)}><X size={20}/></button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
          <NavItem to="/corsi" icon={BookOpen} label="All Courses" />
          <NavItem to="/notebook" icon={StickyNote} label="My Notebook" />
          <NavItem to="/leaderboard" icon={Trophy} label="Leaderboard" />
          <NavItem to="/lezioni-live" icon={Calendar} label="Live Lessons" />
          <NavItem to="/store" icon={ShoppingBag} label="Store & Ebooks" />
          <NavItem to="/downloads" icon={Download} label="My Downloads" />
          <NavItem to="/profile" icon={Settings} label="Profile" />
          
          {isAdmin && (
            <div className="pt-4 mt-4 border-t border-gray-100">
               <p className="px-4 text-xs font-bold text-gray-400 uppercase mb-2">Admin Area</p>
               <NavItem to="/admin" icon={ShieldCheck} label="Management" />
            </div>
          )}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 overflow-hidden">
              {profile?.avatar_url ? <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover"/> : <User size={16} />}
            </div>
            <div className="text-sm overflow-hidden">
              <p className="font-bold text-gray-700 truncate">{profile?.full_name || 'Student'}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition text-sm font-medium">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 md:ml-64 pt-16 md:pt-0 flex flex-col min-h-screen">
        <AnnouncementBanner />
        <main className="p-4 md:p-8 max-w-6xl mx-auto w-full flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
