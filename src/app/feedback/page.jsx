"use client";
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import { Star, Gift, Send, Loader2, CheckCircle } from 'lucide-react'

export default function FeedbackPage() {
  const { user } = useAuth()
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [isGiveaway, setIsGiveaway] = useState(true)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) return alert("Please log in first.")
    
    setLoading(true)
    const { error } = await supabase.from('feedback').insert([{
      user_id: user.id,
      rating,
      comment,
      is_giveaway_entry: isGiveaway
    }])
    setLoading(false)
    
    if (error) alert("Error submitting feedback")
    else setSubmitted(true)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FC]">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-4">
        <div className="max-w-lg mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-lg border-t-8 border-brand-purple">
          {submitted ? (
            <div className="text-center py-10">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-brand-dark mb-2">Thank You!</h2>
              <p className="text-gray-600">Your feedback has been recorded.</p>
              {isGiveaway && <p className="text-brand-purple font-bold mt-4">You are entered into the giveaway! 🎁</p>}
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-brand-dark mb-2">Event Feedback</h1>
                <p className="text-gray-500">Tell us what you thought about the webinar.</p>
              </div>

              <div className="mb-6 text-center">
                <label className="block text-sm font-bold text-gray-700 mb-3">Rate your experience</label>
                <div className="flex justify-center gap-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button type="button" key={star} onClick={() => setRating(star)} className="focus:outline-none transition transform hover:scale-110">
                      <Star size={36} className={star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">Your Comments</label>
                <textarea 
                  required
                  className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-brand-purple bg-gray-50 focus:bg-white transition"
                  rows="4"
                  placeholder="What did you learn? What can we improve?"
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                ></textarea>
              </div>

              <div className="mb-8 p-4 bg-purple-50 rounded-xl flex items-center gap-3 border border-purple-100">
                <input 
                  type="checkbox" 
                  id="giveaway" 
                  checked={isGiveaway} 
                  onChange={e => setIsGiveaway(e.target.checked)}
                  className="w-5 h-5 text-brand-purple rounded focus:ring-brand-purple cursor-pointer"
                />
                <label htmlFor="giveaway" className="text-sm font-bold text-brand-purple cursor-pointer flex items-center gap-2">
                  <Gift size={18}/> Enter me in the Giveaway!
                </label>
              </div>

              <button disabled={loading} className="btn btn-plum-gradient w-full py-4 shadow-lg flex items-center justify-center gap-2">
                {loading ? <Loader2 className="animate-spin"/> : <><Send size={18}/> Submit Feedback</>}
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
