import { Calendar } from 'lucide-react'

export default function LiveLessons() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-dark mb-2">Lezioni Live Singole</h1>
      <p className="text-gray-500 mb-8">Prenota una sessione one-shot per praticare.</p>

      <div className="bg-white rounded-2xl p-8 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="bg-purple-50 p-4 rounded-2xl">
            <Calendar className="w-12 h-12 text-brand-purple" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-brand-dark mb-2">Speaking Club - Dicembre</h3>
            <p className="text-gray-600 mb-4">
              Pratica la conversazione con un insegnante madrelingua. Max 6 studenti.
              Tema: "Ordinare al ristorante".
            </p>
            <div className="flex gap-4 text-sm font-medium text-gray-500">
              <span>ðŸ“… 10 Dicembre</span>
              <span>â° 18:00 - 19:00</span>
            </div>
          </div>
          <div className="text-center min-w-[120px]">
            <div className="text-2xl font-bold text-brand-purple mb-2">5.000 Ft</div>
            <button className="w-full bg-brand-blue text-white px-4 py-2 rounded-lg font-bold hover:opacity-90 transition">
              Prenota
            </button>
            <p className="text-xs text-red-500 mt-2 font-medium">3 posti rimasti</p>
          </div>
        </div>
      </div>
    </div>
  )
}
