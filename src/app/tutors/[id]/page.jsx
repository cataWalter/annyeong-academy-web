"use client";
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import { PlayCircle, Star, MessageCircle, Share2, Loader2, ArrowLeft, Instagram, Youtube, Music2, X, Send, BookOpen, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { getEmbedUrl } from '@/lib/video'

export default function TutorProfile() {
  const { id } = useParams()
  const [tutor, setTutor] = useState(null)
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [msgSent, setMsgSent] = useState(false)

  useEffect(() => {
    const fetchTutor = async () => {
      const { data } = await supabase.from('tutors').select('*').eq('id', id).single()
      setTutor(data)
      
      // Fetch Courses by this Tutor
      if (data) {
        const { data: tutorCourses } = await supabase.from('products').select('*').eq('tutor_id', data.id).eq('type', 'course')
        setCourses(tutorCourses || [])
      }
      setLoading(false)
    }
    if(id) fetchTutor()
  }, [id])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    await supabase.from('contact_messages').insert([{ name: 'Student', email: 'student@internal.com', message: `To ${tutor.name}: ${message}` }])
    setMsgSent(true)
    setTimeout(() => { setModalOpen(false); setMsgSent(false); setMessage('') }, 2000)
  }

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-brand-purple"/></div>
  if (!tutor) return <div className="text-center py-20">Tutor not found</div>

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FC]">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <Link href="/tutors" className="inline-flex items-center gap-2 text-gray-400 hover:text-brand-purple font-bold mb-6"><ArrowLeft size={18}/> Back to Tutors</Link>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8">
            <div className="h-48 bg-gradient-to-r from-brand-blue to-brand-purple"></div>
            <div className="px-8 pb-8">
              <div className="flex flex-col md:flex-row items-end -mt-16 mb-6 gap-6">
                <img src={tutor.image_url || 'https://placehold.co/400'} alt={tutor.name} className="w-32 h-32 rounded-3xl border-4 border-white shadow-lg bg-white object-cover" />
                <div className="flex-1 mb-2">
                  <h1 className="text-3xl font-bold text-brand-dark">{tutor.name}</h1>
                  <p className="text-brand-purple font-bold">{tutor.role}</p>
                  
                  <div className="flex gap-3 mt-3">
                    {tutor.social_links?.instagram && <a href={tutor.social_links.instagram} target="_blank" className="text-pink-600 bg-pink-50 p-2 rounded-full hover:bg-pink-100 transition"><Instagram size={18}/></a>}
                    {tutor.social_links?.youtube && <a href={tutor.social_links.youtube} target="_blank" className="text-red-600 bg-red-50 p-2 rounded-full hover:bg-red-100 transition"><Youtube size={18}/></a>}
                  </div>
                </div>
                <div className="flex gap-3 mb-2">
                  <button onClick={() => setModalOpen(true)} className="bg-brand-dark text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition flex items-center gap-2"><MessageCircle size={18}/> Message</button>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-brand-dark mb-3">About Me</h3>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{tutor.bio}</p>
                  </div>
                  
                  {tutor.video_intro && (
                    <div>
                      <h3 className="text-xl font-bold text-brand-dark mb-3">Introduction</h3>
                      <div className="aspect-video rounded-2xl overflow-hidden bg-black shadow-lg">
                        <iframe src={getEmbedUrl(tutor.video_intro)} className="w-full h-full" allowFullScreen></iframe>
                      </div>
                    </div>
                  )}

                  {courses.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-brand-dark mb-4">My Courses</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {courses.map(course => (
                          <Link href={`/corsi/${course.id}`} key={course.id} className="group bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-brand-purple transition">
                            <div className="flex justify-between items-start mb-2">
                              <span className="bg-white text-xs font-bold px-2 py-1 rounded border border-gray-100 shadow-sm">{course.level || 'General'}</span>
                              <ArrowRight size={16} className="text-gray-400 group-hover:text-brand-purple transition"/>
                            </div>
                            <h4 className="font-bold text-gray-800 group-hover:text-brand-purple transition">{course.title}</h4>
                            <p className="text-sm text-gray-500 mt-1">{course.price}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-brand-dark mb-4">Quick Stats</h3>
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-4">
                    <div className="flex justify-between"><span className="text-gray-500">Students</span><span className="font-bold">1200+</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Courses</span><span className="font-bold">{courses.length}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Rating</span><span className="font-bold text-brand-purple flex gap-1"><Star size={16} fill="currentColor"/> 4.9</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md relative animate-slide-in">
            <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={20}/></button>
            <h3 className="text-xl font-bold text-brand-dark mb-4">Message {tutor.name}</h3>
            {msgSent ? <div className="text-center py-8 text-green-600 font-bold">Message sent!</div> : (
              <form onSubmit={handleSendMessage}>
                <textarea required className="w-full p-4 border border-gray-200 rounded-xl mb-4 h-32 focus:ring-2 focus:ring-brand-purple outline-none" placeholder="Write your question..." value={message} onChange={e => setMessage(e.target.value)}></textarea>
                <button className="btn btn-plum-gradient w-full py-3 flex justify-center items-center gap-2"><Send size={18}/> Send Message</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
