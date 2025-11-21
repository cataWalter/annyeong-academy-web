import { BookOpen, Star, Video, Users, Calendar } from 'lucide-react'
import { initiateCheckout } from '../../lib/payment'

export default function Courses() {
  const courses = [
    {
      id: 'c1',
      title: "Coreano Base 1 (Live)",
      type: "live",
      level: "Principiante",
      price: "35.000 Ft",
      image: "https://placehold.co/600x400/6a11cb/ffffff?text=Live+Class",
      lessons: 12,
      schedule: "Lun/Mer 18:00",
      start_date: "10 Dicembre"
    },
    {
      id: 'c2',
      title: "K-Drama Listening (VOD)",
      type: "video",
      level: "Intermedio",
      price: "25.000 Ft",
      image: "https://placehold.co/600x400/2575fc/ffffff?text=Video+Course",
      lessons: 8,
      desc: "Impara con le scene dei tuoi drama preferiti."
    },
    {
      id: 'c3',
      title: "Hangul Masterclass (VOD)",
      type: "video",
      level: "Principiante",
      price: "15.000 Ft",
      image: "https://placehold.co/600x400/ff9900/ffffff?text=Hangul",
      lessons: 4,
      desc: "Impara a leggere e scrivere in 4 ore."
    }
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-dark mb-2">Catalogo Corsi</h1>
      <p className="text-gray-500 mb-8">Scegli tra corsi in diretta o video on-demand.</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition group flex flex-col">
            <div className="h-48 overflow-hidden relative">
              <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-brand-dark flex items-center gap-1">
                {course.type === 'live' ? <Users size={12} className="text-red-500" /> : <Video size={12} className="text-blue-500" />}
                {course.type === 'live' ? 'LIVE' : 'VIDEO'}
              </div>
              <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-white">
                {course.level}
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-brand-dark mb-2">{course.title}</h3>
              
              <div className="space-y-2 text-sm text-gray-500 mb-6 flex-1">
                <div className="flex items-center gap-2">
                  <BookOpen size={16} /> {course.lessons} Lezioni
                </div>
                {course.type === 'live' && (
                  <div className="flex items-center gap-2 text-brand-purple font-medium">
                    <Calendar size={16} /> Inizio: {course.start_date}
                  </div>
                )}
                <div className="flex items-center gap-2">
                   <Star size={16} className="text-yellow-400" /> 5.0 (24 recensioni)
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <span className="text-2xl font-bold text-brand-purple">{course.price}</span>
                <button 
                  onClick={() => initiateCheckout(course.id, course.title)}
                  className="bg-brand-dark text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition"
                >
                  Iscriviti
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
