import Section from '../ui/Section'
import { Globe, MessageCircle, Utensils } from 'lucide-react'

export default function Benefits() {
  return (
    <Section className="bg-white">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
          PerchÃ© questo Ã¨ l'evento della settimana?
        </h2>
        <p className="text-gray-600 text-lg">
          Abbiamo rimosso le barriere. Concentrati solo sul divertimento di imparare.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="p-8 rounded-3xl bg-gray-50 hover:shadow-xl transition duration-300 border border-transparent hover:border-brand-purple/20 group">
          <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
            <Globe className="w-8 h-8 text-brand-blue" />
          </div>
          <h3 className="text-xl font-bold text-brand-dark mb-3">No Inglese Necessario</h3>
          <p className="text-gray-600">
            La nostra tecnologia AI traduce le parole dell'insegnante in italiano in tempo reale. Non ti sentirai mai perso.
          </p>
        </div>

        {/* Card 2 */}
        <div className="p-8 rounded-3xl bg-gray-50 hover:shadow-xl transition duration-300 border border-transparent hover:border-brand-purple/20 group">
          <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
            <MessageCircle className="w-8 h-8 text-brand-purple" />
          </div>
          <h3 className="text-xl font-bold text-brand-dark mb-3">100% Autentico</h3>
          <p className="text-gray-600">
            In diretta da Seoul. Impara la pronuncia corretta e l'intonazione direttamente dalla fonte originale.
          </p>
        </div>

        {/* Card 3 */}
        <div className="p-8 rounded-3xl bg-gray-50 hover:shadow-xl transition duration-300 border border-transparent hover:border-brand-purple/20 group">
          <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
            <Utensils className="w-8 h-8 text-orange-500" />
          </div>
          <h3 className="text-xl font-bold text-brand-dark mb-3">Esperienza Culturale</h3>
          <p className="text-gray-600">
            Non solo grammatica! Parleremo di etiquette a tavola, slang dei K-Drama e cultura moderna.
          </p>
        </div>
      </div>
    </Section>
  )
}
