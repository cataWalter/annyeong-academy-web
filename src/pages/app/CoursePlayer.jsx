import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PlayCircle, FileDown, CheckCircle, Lock } from 'lucide-react'

export default function CoursePlayer() {
  const { id } = useParams()
  const [activeLesson, setActiveLesson] = useState(0)

  // Mock Data (In produzione: fetch da Supabase 'lessons' table)
  const course = {
    title: "Coreano Base 1",
    lessons: [
      { id: 1, title: "L'alfabeto Hangul - Parte 1", duration: "15:00", type: "video", locked: false },
      { id: 2, title: "L'alfabeto Hangul - Parte 2", duration: "20:00", type: "video", locked: false },
      { id: 3, title: "Saluti e Presentazioni", duration: "12:00", type: "video", locked: true }, // Demo locked
      { id: 4, title: "Ordinare al ristorante", duration: "18:00", type: "video", locked: true },
    ]
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-100px)]">
      
      {/* Video Player Area */}
      <div className="flex-1 flex flex-col">
        <div className="bg-black rounded-2xl overflow-hidden aspect-video flex items-center justify-center relative shadow-lg">
          <div className="absolute inset-0 bg-[url('https://placehold.co/1280x720/1a1a1a/ffffff?text=Video+Player')] bg-cover opacity-50"></div>
          <PlayCircle className="w-20 h-20 text-white opacity-80 hover:opacity-100 cursor-pointer transition" />
        </div>
        
        <div className="mt-6 bg-white p-6 rounded-2xl border border-gray-100 flex-1">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-2xl font-bold text-brand-dark">
              {course.lessons[activeLesson].title}
            </h1>
            <button className="flex items-center gap-2 text-brand-purple font-bold bg-purple-50 px-4 py-2 rounded-lg hover:bg-purple-100 transition">
              <FileDown size={18} /> Scarica PDF
            </button>
          </div>
          <p className="text-gray-600">
            In questa lezione impareremo le vocali base e come comporre le prime sillabe. 
            Scarica il PDF per gli esercizi di scrittura.
          </p>
        </div>
      </div>

      {/* Playlist Sidebar */}
      <div className="w-full lg:w-80 bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-100 bg-gray-50">
          <h3 className="font-bold text-gray-700">Contenuto del Corso</h3>
          <p className="text-xs text-gray-500">{course.lessons.length} Lezioni</p>
        </div>
        
        <div className="overflow-y-auto flex-1">
          {course.lessons.map((lesson, index) => (
            <button 
              key={lesson.id}
              disabled={lesson.locked}
              onClick={() => setActiveLesson(index)}
              className={\w-full text-left p-4 border-b border-gray-50 hover:bg-gray-50 transition flex items-center gap-3 \ \\}
            >
              {lesson.locked ? (
                <Lock size={16} className="text-gray-400" />
              ) : (
                <PlayCircle size={16} className={activeLesson === index ? "text-brand-purple" : "text-gray-400"} />
              )}
              
              <div className="flex-1">
                <p className={\	ext-sm font-medium \\}>
                  {lesson.title}
                </p>
                <span className="text-xs text-gray-400">{lesson.duration}</span>
              </div>

              {index < activeLesson && <CheckCircle size={16} className="text-green-500" />}
            </button>
          ))}
        </div>
      </div>

    </div>
  )
}
