import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import { User, Save, Loader2, Camera, Lock, CheckCircle } from 'lucide-react'
import { generateFilePath } from '../../lib/helpers'

export default function Profile() {
  const { user, refreshProfile } = useAuth()
  const [loading, setLoading] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)
  
  // Profile State
  const [fullName, setFullName] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [uploading, setUploading] = useState(false)

  // Password State
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordMsg, setPasswordMsg] = useState('')

  useEffect(() => {
    if (user) getProfile()
  }, [user])

  const getProfile = async () => {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('full_name, avatar_url')
        .eq('id', user.id)
        .single()

      if (data) {
        setFullName(data.full_name || '')
        setAvatarUrl(data.avatar_url || '')
      }
    } catch (error) { console.error(error) }
  }

  const handleAvatarUpload = async (event) => {
    try {
      setUploading(true)
      const file = event.target.files[0]
      if (!file) return

      const path = generateFilePath('avatars', file)
      const { error: uploadError } = await supabase.storage.from('avatars').upload(path, file)
      if (uploadError) throw uploadError

      const { data } = supabase.storage.from('avatars').getPublicUrl(path)
      setAvatarUrl(data.publicUrl)
    } catch (error) {
      alert('Upload error: ' + error.message)
    } finally {
      setUploading(false)
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
      
      await refreshProfile() 
      alert('Profile updated successfully!')
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordUpdate = async (e) => {
    e.preventDefault()
    setPasswordMsg('')

    if (newPassword.length < 6) {
      setPasswordMsg('Password must be at least 6 characters.')
      return
    }
    if (newPassword !== confirmPassword) {
      setPasswordMsg('Passwords do not match.')
      return
    }

    setPasswordLoading(true)
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    
    if (error) {
      setPasswordMsg('Error: ' + error.message)
    } else {
      setPasswordMsg('Success: Password updated successfully!')
      setNewPassword('')
      setConfirmPassword('')
    }
    setPasswordLoading(false)
  }

  return (
    <div className="max-w-3xl mx-auto pb-20">
      <h1 className="text-2xl font-bold text-brand-dark mb-2">Your Profile</h1>
      <p className="text-gray-500 mb-8">Manage your personal information and security.</p>

      <div className="grid gap-8">
        {/* 1. Personal Info Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-blue to-brand-purple"></div>
          
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <div className="relative group">
              <div className="w-32 h-32 bg-purple-100 rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                 {avatarUrl ? (
                   <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                 ) : (
                   <User size={48} className="text-brand-purple opacity-50" />
                 )}
                 {uploading && <div className="absolute inset-0 bg-black/50 flex items-center justify-center"><Loader2 className="animate-spin text-white"/></div>}
              </div>
              <label className="absolute bottom-0 right-0 bg-brand-dark text-white p-2 rounded-full cursor-pointer hover:bg-brand-purple transition shadow-md">
                 <Camera size={18} />
                 <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} disabled={uploading} />
              </label>
            </div>
            
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-500 uppercase tracking-wider font-bold mb-1">Student</p>
              <p className="text-xl font-bold text-brand-dark">{fullName || "Unnamed User"}</p>
              <p className="text-gray-400">{user?.email}</p>
            </div>
          </div>

          <form onSubmit={updateProfile} className="space-y-6 border-t border-gray-100 pt-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
              <input 
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-purple outline-none bg-gray-50 focus:bg-white transition"
                placeholder="Your name"
              />
            </div>

            <button 
              disabled={loading}
              type="submit" 
              className="w-full md:w-auto flex items-center justify-center gap-2 bg-brand-purple text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition shadow-lg"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <><Save size={20} /> Save Profile</>}
            </button>
          </form>
        </div>

        {/* 2. Security Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gray-100 p-2 rounded-lg text-gray-600"><Lock size={20} /></div>
            <h3 className="text-lg font-bold text-brand-dark">Security</h3>
          </div>
          
          <form onSubmit={handlePasswordUpdate} className="space-y-4 max-w-md">
            <p className="text-sm text-gray-500 mb-4">If you forgot your password and logged in via the recovery link, set your new password here.</p>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">New Password</label>
              <input 
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-purple outline-none bg-gray-50 focus:bg-white transition"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Confirm Password</label>
              <input 
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-purple outline-none bg-gray-50 focus:bg-white transition"
                placeholder="••••••••"
              />
            </div>

            {passwordMsg && (
              <div className={`p-3 rounded-lg text-sm font-bold flex items-center gap-2 ${passwordMsg.startsWith('Success') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {passwordMsg.startsWith('Success') && <CheckCircle size={16} />}
                {passwordMsg}
              </div>
            )}

            <button 
              disabled={passwordLoading || !newPassword}
              type="submit" 
              className="w-full md:w-auto flex items-center justify-center gap-2 bg-brand-dark text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {passwordLoading ? <Loader2 className="animate-spin" size={20} /> : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
