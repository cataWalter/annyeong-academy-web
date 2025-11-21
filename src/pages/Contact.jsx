import { useState } from 'react'
import Navbar from '../components/sections/Navbar'
import Footer from '../components/sections/Footer'
import { Mail, MapPin, Phone } from 'lucide-react'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    // Qui integreresti Supabase insert
  }

  return (
    <>
      <Navbar />
      <div className="pt-32 pb-20 px-4 bg-[#F8F9FC]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          
          {/* Info */}
          <div>
            <h1 className="text-4xl font-bold text-brand-dark mb-6">Contattaci</h1>
            <p className="text-gray-600 mb-8">Hai domande sui corsi o sul webinar? Siamo qui per aiutarti.</p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-brand-purple"><Mail /></div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-bold text-brand-dark">info@annyeong-akademia.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-brand-blue"><Phone /></div>
                <div>
                  <p className="text-sm text-gray-500">Telefono</p>
                  <p className="font-bold text-brand-dark">+39 02 123 4567</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 rounded-3xl shadow-lg">
            {sent ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">âœ…</div>
                <h3 className="text-xl font-bold text-brand-dark">Messaggio Inviato!</h3>
                <p className="text-gray-500">Ti risponderemo entro 24 ore.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                  <input required type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-purple outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input required type="email" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-purple outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Messaggio</label>
                  <textarea required rows="4" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-purple outline-none"></textarea>
                </div>
                <button type="submit" className="w-full bg-brand-dark text-white font-bold py-3 rounded-xl hover:opacity-90 transition">
                  Invia Messaggio
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
      <Footer />
    </>
  )
}
