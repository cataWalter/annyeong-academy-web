import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Loader2, LogOut } from 'lucide-react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  // Helper to fetch profile safely
  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      
      if (error) {
        console.warn("Profile fetch warning (minor):", error.message)
        // If row missing, we can ignore it for now, user is still logged in
      }
      setProfile(data || { full_name: 'Student', role: 'student' })
    } catch (error) {
      console.error('Profile fetch error:', error)
    }
  }

  useEffect(() => {
    let mounted = true;

    // 1. Get Initial Session
    const initSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session?.user) {
          setUser(session.user)
          await fetchProfile(session.user.id)
        }
      } catch (e) {
        console.error("Session check failed", e)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    initSession()

    // 2. Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user)
        // Only fetch profile if we don't have it yet to avoid loops
        // Note: We can't easily check 'profile' state here due to closure, 
        // so we just fetch it to be safe, but we don't block UI.
        fetchProfile(session.user.id) 
      } else {
        setUser(null)
        setProfile(null)
      }
      if (mounted) setLoading(false)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const value = {
    signUp: (data) => supabase.auth.signUp(data),
    signIn: (data) => supabase.auth.signInWithPassword(data),
    signOut: async () => {
      setProfile(null)
      setUser(null)
      await supabase.auth.signOut()
    },
    refreshProfile: () => user && fetchProfile(user.id),
    user,
    profile,
    isAdmin: profile?.role === 'admin',
    loading
  }

  // Emergency Loading Screen
  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-white text-brand-purple px-4 text-center">
        <Loader2 size={48} className="animate-spin mb-4" />
        <p className="font-bold text-lg mb-8">Loading Academy...</p>
        
        <button 
          onClick={async () => {
            await supabase.auth.signOut()
            window.location.reload()
          }}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg text-sm font-bold transition"
        >
          <LogOut size={16} /> Stuck? Click here to Reset
        </button>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
