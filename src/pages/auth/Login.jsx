import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Loader2 } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await signIn({ email, password })
    if (error) alert("Errore login: " + error.message)
    else navigate('/dashboard')
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FC] px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full border-t-4 border-brand-purple">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-brand-dark">Bentornato! ðŸ‘‹</h1>
          <p className="text-gray-500">Accedi alla tua area studenti</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-purple outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-purple outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button 
            disabled={loading}
            type="submit" 
            className="w-full bg-brand-purple text-white font-bold py-3 rounded-lg hover:opacity-90 flex justify-center"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Accedi"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Non hai un account? <Link to="/register" className="text-brand-purple font-bold hover:underline">Registrati</Link>
        </p>
        <p className="text-center mt-2 text-sm">
          <Link to="/" className="text-gray-400 hover:text-gray-600">â† Torna alla Home</Link>
        </p>
      </div>
    </div>
  )
}
