import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Loader2 } from 'lucide-react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = async (userId) => {
    try {
      const { data } = await supabase.from('profiles').select('*').eq('id', userId).single()
      setProfile(data)
    } catch (error) {
      console.error('Profile fetch error:', error)
    }
  }

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user)
        if (!profile || profile.id !== session.user.id) {
            await fetchProfile(session.user.id)
        }
      } else {
        setUser(null)
        setProfile(null)
      }
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const value = {
    signUp: (data) => supabase.auth.signUp(data),
    signIn: (data) => supabase.auth.signInWithPassword(data),
    signOut: () => supabase.auth.signOut(),
    refreshProfile: () => user && fetchProfile(user.id),
    user,
    profile,
    isAdmin: profile?.role === 'admin',
    loading
  }

  // Show a spinner while checking auth status
  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-white text-brand-purple">
        <Loader2 size={48} className="animate-spin mb-4" />
        <p className="font-bold text-lg">Loading Academy...</p>
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
