import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import { Link } from 'react-router-dom'
import { BookOpen, Loader2, PlayCircle, Calendar, Download, ArrowRight } from 'lucide-react'

export default function Dashboard() {
  const { user, profile } = useAuth()
  const [loading, setLoading] = useState(true)
  
  const [courses, setCourses] = useState([])
  const [liveLessons, setLiveLessons] = useState([])
  const [ebooks, setEbooks] = useState([])

  useEffect(() => {
    if (user) fetchData()
  }, [user])

  const fetchData = async () => {
    try {
      const { data: purchases } = await supabase.from('purchases')
        .select('product_id').eq('user_id', user.id).eq('status', 'completed')

      if (purchases && purchases.length > 0) {
        const ids = purchases.map(p => p.product_id)
        const { data: products } = await supabase.from('products').select('*').in('id', ids)
        
        if (products) {
          setCourses(products.filter(p => p.type === 'course'))
          setLiveLessons(products.filter(p => p.type === 'standalone'))
          setEbooks(products.filter(p => p.type === 'ebook'))
        }
      }
    } catch (error) { console.error(error) } 
    finally { setLoading(false) }
  }

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-brand-purple" /></div>

  // Use Profile Name if available, fallback to email
  const displayName = profile?.full_name ? profile.full_name.split(' ')[0] : user.email.split('@')[0]

  return (
    <div className="pb-10">
      <h1 className="text-3xl font-bold text-brand-dark mb-2">Hello, {displayName}! 👋</h1>
      <p className="text-gray-500 mb-8">Here is your learning summary.</p>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-32 hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">My Courses</p>
              <p className="text-3xl font-bold text-brand-purple mt-1">{courses.length}</p>
            </div>
            <div className="bg-purple-50 p-2 rounded-lg text-brand-purple"><BookOpen size={20}/></div>
          </div>
          <Link to="/corsi" className="text-xs font-bold text-gray-400 hover:text-brand-purple flex items-center gap-1 transition">View Catalog <ArrowRight size={12}/></Link>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-32 hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Active Lives</p>
              <p className="text-3xl font-bold text-brand-blue mt-1">{liveLessons.length}</p>
            </div>
            <div className="bg-blue-50 p-2 rounded-lg text-brand-blue"><Calendar size={20}/></div>
          </div>
          <Link to="/lezioni-live" className="text-xs font-bold text-gray-400 hover:text-brand-blue flex items-center gap-1 transition">Book New <ArrowRight size={12}/></Link>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-32 hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Ebook & Files</p>
              <p className="text-3xl font-bold text-gray-700 mt-1">{ebooks.length}</p>
            </div>
            <div className="bg-gray-50 p-2 rounded-lg text-gray-600"><Download size={20}/></div>
          </div>
          <Link to="/downloads" className="text-xs font-bold text-gray-400 hover:text-gray-600 flex items-center gap-1 transition">Go to Downloads <ArrowRight size={12}/></Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-brand-dark">Your Courses</h2>
          {courses.length > 0 ? (
            <div className="space-y-4">
              {courses.map(course => (
                <div key={course.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition">
                  <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                     <img src={course.image_url || 'https://placehold.co/150'} alt={course.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-brand-dark truncate">{course.title}</h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{course.description.replace(/\[\[.*?\]\]/g, '')}</p>
                  </div>
                  <Link to={`/corsi/${course.id}`} className="bg-brand-purple/10 text-brand-purple p-3 rounded-full hover:bg-brand-purple hover:text-white transition">
                    <PlayCircle size={24} />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-10 text-center border border-dashed border-gray-300">
              <p className="text-gray-500 mb-4">You haven't started any course yet.</p>
              <Link to="/corsi" className="inline-block bg-brand-purple text-white px-6 py-2 rounded-full font-bold text-sm hover:shadow-lg transition">Start Now</Link>
            </div>
          )}
        </div>

        <div className="space-y-8">
           
           <div>
             <h2 className="text-xl font-bold text-brand-dark mb-4">Upcoming Lives</h2>
             {liveLessons.length > 0 ? (
                <div className="space-y-3">
                  {liveLessons.map(lesson => (
                    <div key={lesson.id} className="bg-white p-4 rounded-xl border border-gray-100 flex gap-3 items-center">
                      <div className="bg-orange-50 text-orange-500 p-3 rounded-lg h-fit"><Calendar size={18}/></div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-800">{lesson.title}</h4>
                        <a href="https://zoom.us/join" target="_blank" className="text-xs text-brand-blue font-bold hover:underline mt-1 block">Join Zoom Session</a>
                      </div>
                    </div>
                  ))}
                </div>
             ) : (
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                    <p className="text-sm text-gray-400 italic mb-2">No live lessons booked.</p>
                    <Link to="/lezioni-live" className="text-xs font-bold text-brand-blue underline">Browse Schedule</Link>
                </div>
             )}
           </div>

           <div>
             <h2 className="text-xl font-bold text-brand-dark mb-4">Recent Materials</h2>
             {ebooks.length > 0 ? (
                <div className="space-y-3">
                  {ebooks.slice(0, 3).map(book => (
                    <Link key={book.id} to="/downloads" className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-3 hover:bg-gray-50 transition">
                      <div className="bg-blue-50 text-brand-blue p-2 rounded-lg"><Download size={16}/></div>
                      <span className="text-sm font-medium text-gray-700 truncate">{book.title}</span>
                    </Link>
                  ))}
                </div>
             ) : (
                <p className="text-sm text-gray-400 italic bg-gray-50 p-4 rounded-xl text-center">No downloads available.</p>
             )}
           </div>

        </div>
      </div>
    </div>
  )
}
