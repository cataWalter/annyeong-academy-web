import { useState } from 'react'
import Navbar from '../components/sections/Navbar'
import Footer from '../components/sections/Footer'
import { Mail, MapPin, Phone, Loader2 } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([formData])
        
      if (error) throw error
      setSent(true)
    } catch (error) {
      alert("Error sending message: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <div className="pt-32 pb-20 px-4 bg-[#F8F9FC]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          
          <div>
            <h1 className="text-4xl font-bold text-brand-dark mb-6">Contact Us</h1>
            <p className="text-gray-600 mb-8">Have questions about courses or the webinar? We are here to help.</p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-brand-purple"><Mail /></div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-bold text-brand-dark">info@annyeong-academy.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-brand-blue"><Phone /></div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-bold text-brand-dark">+36 30 123 4567</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg">
            {sent ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-brand-dark">Message Sent!</h3>
                <p className="text-gray-500">We will reply within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input 
                    required 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-purple outline-none"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    required 
                    type="email" 
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-purple outline-none"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea 
                    required 
                    rows="4" 
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-purple outline-none"
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>
                <button 
                  disabled={loading}
                  type="submit" 
                  className="w-full bg-brand-dark text-white font-bold py-3 rounded-xl hover:opacity-90 transition flex justify-center"
                >
                  {loading ? <Loader2 className="animate-spin" /> : "Send Message"}
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
