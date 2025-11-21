import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-gray-400 py-12 text-center">
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-2xl font-bold text-white mb-6">Annyeong Academy</h3>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8 text-sm">
          <Link to="/about" className="hover:text-white transition">About Us</Link>
          <Link to="/tutors" className="hover:text-white transition">Teachers</Link>
          <Link to="/faq" className="hover:text-white transition">FAQ</Link>
          <Link to="/contact" className="hover:text-white transition">Contact</Link>
          <span className="text-gray-600">|</span>
          <Link to="/privacy" className="hover:text-white transition">Privacy</Link>
          <Link to="/termini" className="hover:text-white transition">Terms</Link>
        </div>
        <p className="text-xs opacity-50">&copy; 2025 Annyeong Academy. All rights reserved.</p>
      </div>
    </footer>
  )
}
