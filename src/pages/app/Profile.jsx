import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import { User, Save, Loader2 } from 'lucide-react'

export default function Profile() {
  const { user, refreshProfile } = useAuth()
  const [loading, setLoading] = useState(false)
  const [fullName, setFullName] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')

  useEffect(() => {
    if (user) getProfile()
  }, [user])

  const getProfile = async () => {
    try {
      setLoading(true)
      const { data } = await supabase
        .from('profiles')
        .select('full_name, avatar_url')
        .eq('id', user.id)
        .single()

      if (data) {
        setFullName(data.full_name || '')
        setAvatarUrl(data.avatar_url || '')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const updates = {
        id: user.id,
        full_name: fullName,
        avatar_url: avatarUrl,
        updated_at: new Date(),
      }

      const { error } = await supabase.from('profiles').upsert(updates)
      if (error) throw error
      
      // Update global state immediately
      await refreshProfile() 
      
      alert('Profilo aggiornato con successo!')
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-brand-dark mb-2">Il tuo Profilo</h1>
      <p className="text-gray-500 mb-8">Gestisci le tue informazioni personali.</p>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-md">
             {avatarUrl ? (
               <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
             ) : (
               <span className="text-brand-purple text-2xl font-bold">{fullName ? fullName.charAt(0).toUpperCase() : <User size={32} />}</span>
             )}
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-bold text-brand-dark">{user?.email}</p>
          </div>
        </div>

        <form onSubmit={updateProfile} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
            <input 
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-purple outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Avatar URL (Immagine Profilo)</label>
            <input 
              type="url"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-purple outline-none"
              placeholder="https://..."
            />
          </div>

          <button 
            disabled={loading}
            type="submit" 
            className="flex items-center gap-2 bg-brand-purple text-white px-6 py-2 rounded-lg font-bold hover:opacity-90 transition"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <><Save size={20} /> Salva Modifiche</>}
          </button>
        </form>
      </div>
    </div>
  )
}
