import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import { Loader2, StickyNote, BookOpen, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function MyNotebook() {
  const { user } = useAuth()
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) fetchNotes()
  }, [user])

  const fetchNotes = async () => {
    try {
      const { data, error } = await supabase
        .from('user_notes')
        .select(`
          id, content, updated_at,
          lessons (
            id, title,
            products ( id, title, image_url )
          )
        `)
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })

      if (error) throw error
      setNotes(data || [])
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-brand-purple" /></div>

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-yellow-100 p-3 rounded-2xl text-yellow-600">
          <StickyNote size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-brand-dark">Study Notebook</h1>
          <p className="text-gray-500">All your notes from every course, collected in one place.</p>
        </div>
      </div>

      {notes.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-dashed border-gray-300 text-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
            <StickyNote size={40} />
          </div>
          <h3 className="text-xl font-bold text-brand-dark mb-2">Your notebook is empty</h3>
          <p className="text-gray-500 mb-6">Start watching lessons and take notes to see them here.</p>
          <Link to="/corsi" className="inline-block bg-brand-purple text-white px-6 py-3 rounded-full font-bold hover:bg-brand-dark transition">
            Go to Courses
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {notes.map(note => (
            <div key={note.id} className="bg-yellow-50 rounded-2xl p-6 border border-yellow-100 hover:shadow-md transition flex flex-col relative group">
              <div className="flex items-start gap-4 mb-4">
                <img 
                  src={note.lessons?.products?.image_url || 'https://placehold.co/50'} 
                  className="w-12 h-12 rounded-lg object-cover bg-white" 
                  alt="Course"
                />
                <div>
                  <h4 className="font-bold text-brand-dark text-sm">{note.lessons?.products?.title}</h4>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <BookOpen size={12}/> {note.lessons?.title}
                  </p>
                </div>
              </div>
              
              <div className="flex-1 bg-white/60 p-4 rounded-xl text-gray-700 text-sm whitespace-pre-wrap font-medium font-mono mb-4">
                {note.content}
              </div>

              <div className="flex justify-between items-center mt-auto pt-4 border-t border-yellow-200/50">
                <span className="text-xs text-gray-400 font-medium">
                  Updated: {new Date(note.updated_at).toLocaleDateString()}
                </span>
                <Link 
                  to={`/corsi/${note.lessons?.products?.id}`} 
                  className="text-xs font-bold text-yellow-700 flex items-center gap-1 hover:underline"
                >
                  Go to Lesson <ArrowRight size={12}/>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
