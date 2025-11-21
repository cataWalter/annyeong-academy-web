import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { Loader2, ArrowLeft } from 'lucide-react'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleReset = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/profile',
    })
    setLoading(false)
    if (error) {
      alert(error.message)
    } else {
      setSent(true)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FC] px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full border-t-4 border-gray-800">
        <Link to="/login" className="text-gray-400 hover:text-gray-600 flex items-center gap-2 mb-6 text-sm">
          <ArrowLeft size={16} /> Back to Login
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-brand-dark">Reset Password 🔒</h1>
          <p className="text-gray-500">Enter your email to recover access.</p>
        </div>
        
        {sent ? (
          <div className="text-center bg-green-50 p-6 rounded-xl">
            <p className="text-green-700 font-bold mb-2">Check your email!</p>
            <p className="text-sm text-green-600">We sent you a link to reset your password.</p>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-purple outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <button 
              disabled={loading}
              type="submit" 
              className="w-full bg-brand-dark text-white font-bold py-3 rounded-lg hover:opacity-90 flex justify-center"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Send Reset Link"}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
