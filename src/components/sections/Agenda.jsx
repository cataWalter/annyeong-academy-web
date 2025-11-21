import Section from '../ui/Section'
import { Clock, CheckCircle2 } from 'lucide-react'

export default function Agenda() {
  const timeline = [
    { time: '18:00', title: 'Immersione Culturale (Intro)', desc: 'Conosci gli insegnanti, setup tecnologia e introduzione culturale.' },
    { time: '18:15', title: 'La Mini-Lezione (La Prova)', desc: 'Impariamo il primo dialogo reale. Testiamo la traduzione AI dal vivo.' },
    { time: '18:45', title: 'Q&A e Regali Esclusivi', desc: "Rispondiamo alle domande. Ogni partecipante riceve il PDF 'Survival Vocabulary'." }
  ]

  return (
    <Section className="bg-white">
      <div className="grid md:grid-cols-2 gap-16">
        {/* Timeline */}
        <div>
          <h2 className="text-3xl font-bold text-brand-dark mb-8">L'Agenda della Serata</h2>
          <div className="space-y-8 relative before:absolute before:left-4 before:top-2 before:h-full before:w-0.5 before:bg-gray-200">
            {timeline.map((item, i) => (
              <div key={i} className="relative pl-12">
                <div className="absolute left-0 top-1 w-8 h-8 bg-white border-2 border-brand-purple rounded-full flex items-center justify-center z-10">
                  <div className="w-3 h-3 bg-brand-purple rounded-full"></div>
                </div>
                <span className="text-brand-purple font-bold text-sm">{item.time}</span>
                <h3 className="text-xl font-bold text-brand-dark">{item.title}</h3>
                <p className="text-gray-600 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Rapide */}
        <div>
          <h2 className="text-3xl font-bold text-brand-dark mb-8">Domande Frequenti</h2>
          <div className="space-y-4">
            <details className="group bg-gray-50 p-4 rounded-xl cursor-pointer open:bg-purple-50 transition">
              <summary className="font-bold text-brand-dark list-none flex justify-between items-center">
                Serve installare software?
                <span className="text-brand-purple group-open:rotate-180 transition">▼</span>
              </summary>
              <p className="text-gray-600 mt-3 text-sm">No. Riceverai un link Zoom standard. Puoi aprirlo nel browser o nell'app.</p>
            </details>
            <details className="group bg-gray-50 p-4 rounded-xl cursor-pointer open:bg-purple-50 transition">
              <summary className="font-bold text-brand-dark list-none flex justify-between items-center">
                Devo accendere la telecamera?
                <span className="text-brand-purple group-open:rotate-180 transition">▼</span>
              </summary>
              <p className="text-gray-600 mt-3 text-sm">Assolutamente no. Puoi partecipare come spettatore con audio e video spenti.</p>
            </details>
            <details className="group bg-gray-50 p-4 rounded-xl cursor-pointer open:bg-purple-50 transition">
              <summary className="font-bold text-brand-dark list-none flex justify-between items-center">
                Parto da zero, posso venire?
                <span className="text-brand-purple group-open:rotate-180 transition">▼</span>
              </summary>
              <p className="text-gray-600 mt-3 text-sm">Sì! Questo evento è progettato specificamente per chi non ha mai studiato coreano.</p>
            </details>
          </div>
        </div>
      </div>
    </Section>
  )
}