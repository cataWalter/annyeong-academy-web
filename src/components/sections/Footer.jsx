import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-gray-400 py-12 text-center">
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-2xl font-bold text-white mb-6">Annyeong AkadÃ©mia</h3>
        <div className="flex justify-center gap-6 mb-8 text-sm">
          <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link>
          <Link to="/termini" className="hover:text-white transition">Termini di Servizio</Link>
          <a href="mailto:info@annyeong-akademia.com" className="hover:text-white transition">Contattaci</a>
        </div>
        <p className="text-xs opacity-50">&copy; 2025 Annyeong AkadÃ©mia. Tutti i diritti riservati.</p>
      </div>
    </footer>
  )
}
