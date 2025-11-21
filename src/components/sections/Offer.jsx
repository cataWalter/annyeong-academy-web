import Section from '../ui/Section'
import { Check } from 'lucide-react'

export default function Offer() {
  return (
    <Section className="bg-brand-dark text-white text-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Assicura il tuo posto ora!</h2>
        <p className="text-gray-300 mb-12">La capacitÃ  della stanza Zoom Ã¨ limitata.</p>

        <div className="bg-white text-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl max-w-lg mx-auto relative transform hover:-translate-y-2 transition duration-300">
          
          {/* Badge */}
          <div className="absolute top-6 right-0 bg-gradient-to-r from-brand-blue to-brand-purple text-white text-xs font-bold px-8 py-2 transform rotate-45 translate-x-8 shadow-md">
            GRATIS
          </div>

          <h3 className="text-2xl font-bold mb-6 text-brand-dark">Open Day Pass</h3>
          
          <div className="flex justify-center items-center gap-4 mb-8">
            <span className="text-gray-400 line-through text-xl">15.000 Ft</span>
            <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">
              0 Ft
            </span>
          </div>

          <ul className="text-left space-y-4 mb-10">
            <li className="flex items-center gap-3">
              <div className="bg-green-100 p-1 rounded-full"><Check className="w-4 h-4 text-green-600" /></div>
              <span>60 minuti di diretta dalla Corea</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="bg-green-100 p-1 rounded-full"><Check className="w-4 h-4 text-green-600" /></div>
              <span>Accesso alla traduzione AI</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="bg-green-100 p-1 rounded-full"><Check className="w-4 h-4 text-green-600" /></div>
              <span>Partecipazione alla mini-lezione</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="bg-purple-100 p-1 rounded-full"><Check className="w-4 h-4 text-brand-purple" /></div>
              <span className="font-bold">BONUS: PDF Vocabolario Survival</span>
            </li>
          </ul>

          <button 
            onClick={() => document.getElementById('registration').scrollIntoView({ behavior: 'smooth' })}
            className="w-full bg-gradient-to-r from-brand-blue to-brand-purple text-white font-bold py-4 rounded-xl shadow-lg hover:opacity-90 transition"
          >
            Richiedi il mio Pass Gratuito
          </button>
          <p className="text-xs text-gray-400 mt-4">Nessuna carta di credito richiesta.</p>
        </div>
      </div>
    </Section>
  )
}
