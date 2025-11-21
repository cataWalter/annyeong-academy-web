import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Loader2 } from 'lucide-react'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await signUp({ email, password })
    if (error) alert("Errore registrazione: " + error.message)
    else {
      alert("Controlla la tua email per confermare l'account!")
      navigate('/login')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FC] px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full border-t-4 border-brand-blue">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-brand-dark">Crea Account ðŸš€</h1>
          <p className="text-gray-500">Inizia a imparare il coreano oggi</p>
        </div>
        
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button 
            disabled={loading}
            type="submit" 
            className="w-full bg-brand-blue text-white font-bold py-3 rounded-lg hover:opacity-90 flex justify-center"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Registrati Gratis"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Hai giÃ  un account? <Link to="/login" className="text-brand-blue font-bold hover:underline">Accedi</Link>
        </p>
      </div>
    </div>
  )
}
