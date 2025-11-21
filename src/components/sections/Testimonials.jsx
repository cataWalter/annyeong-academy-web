import Section from '../ui/Section'
import { Quote } from 'lucide-react'

export default function Testimonials() {
  return (
    <Section className="bg-[#F8F9FC]">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-brand-dark">Cosa dicono gli studenti?</h2>
      </div>
      
      <div className="flex flex-wrap justify-center gap-8">
        {/* Testimonial 1 */}
        <div className="bg-white p-8 rounded-2xl shadow-sm max-w-md flex-1 min-w-[300px]">
          <Quote className="w-8 h-8 text-brand-purple mb-4 opacity-20" />
          <p className="text-gray-600 italic mb-6 text-lg">
            "Avevo paura di non capire nulla, ma con i sottotitoli in italiano mi sono sentita subito a mio agio! Ãˆ stato incredibile."
          </p>
          <div className="font-bold text-brand-dark border-l-4 border-brand-purple pl-3">
            - Esther, Fan di K-Drama
          </div>
        </div>

        {/* Testimonial 2 */}
        <div className="bg-white p-8 rounded-2xl shadow-sm max-w-md flex-1 min-w-[300px]">
          <Quote className="w-8 h-8 text-brand-blue mb-4 opacity-20" />
          <p className="text-gray-600 italic mb-6 text-lg">
            "Finalmente non devo imparare l'inglese per studiare il coreano! Questo metodo Ã¨ una salvezza. Gli insegnanti sono simpaticissimi."
          </p>
          <div className="font-bold text-brand-dark border-l-4 border-brand-blue pl-3">
            - David, Principiante Assoluto
          </div>
        </div>
      </div>
    </Section>
  )
}
