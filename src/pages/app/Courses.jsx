import { BookOpen, Star } from 'lucide-react'

export default function Courses() {
  const courses = [
    {
      id: 1,
      title: "Coreano Base 1 (A1.1)",
      level: "Principiante",
      price: "35.000 Ft",
      image: "https://placehold.co/600x400/6a11cb/ffffff?text=Corso+Base",
      lessons: 12
    },
    {
      id: 2,
      title: "K-Drama Listening",
      level: "Intermedio",
      price: "25.000 Ft",
      image: "https://placehold.co/600x400/2575fc/ffffff?text=K-Drama",
      lessons: 8
    },
    {
      id: 3,
      title: "Hangul Masterclass",
      level: "Principiante",
      price: "15.000 Ft",
      image: "https://placehold.co/600x400/ff9900/ffffff?text=Hangul",
      lessons: 4
    }
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-dark mb-2">Catalogo Corsi</h1>
      <p className="text-gray-500 mb-8">Scegli il percorso perfetto per te.</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition group">
            <div className="h-48 overflow-hidden relative">
              <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-brand-dark">
                {course.level}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-brand-dark mb-2">{course.title}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <span className="flex items-center gap-1"><BookOpen size={16} /> {course.lessons} Lezioni</span>
                <span className="flex items-center gap-1"><Star size={16} className="text-yellow-400" /> 5.0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-brand-purple">{course.price}</span>
                <button className="bg-brand-dark text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition">
                  Dettagli
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
