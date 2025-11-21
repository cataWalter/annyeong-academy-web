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
        className={\lex items-center gap-3 px-4 py-3 rounded-xl transition-all \\}
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
