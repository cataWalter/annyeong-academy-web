import Section from '../ui/Section'
import { Globe, MessageCircle, Utensils } from 'lucide-react'

export default function Benefits() {
  return (
    <Section className="bg-white">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
          Why is this event unmissable?
        </h2>
        <p className="text-gray-600 text-lg">
          We removed the barriers. Focus only on the fun of learning.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="p-8 rounded-3xl bg-gray-50 hover:shadow-xl transition duration-300 border border-transparent hover:border-brand-purple/20 group">
          <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
            <Globe className="w-8 h-8 text-brand-blue" />
          </div>
          <h3 className="text-xl font-bold text-brand-dark mb-3">No English Required</h3>
          <p className="text-gray-600">
            Our AI technology translates teacher's words into your language in real-time. You will never feel lost.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-gray-50 hover:shadow-xl transition duration-300 border border-transparent hover:border-brand-purple/20 group">
          <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
            <MessageCircle className="w-8 h-8 text-brand-purple" />
          </div>
          <h3 className="text-xl font-bold text-brand-dark mb-3">100% Authentic</h3>
          <p className="text-gray-600">
            Live from Seoul. Learn correct pronunciation and intonation directly from the original source.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-gray-50 hover:shadow-xl transition duration-300 border border-transparent hover:border-brand-purple/20 group">
          <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
            <Utensils className="w-8 h-8 text-orange-500" />
          </div>
          <h3 className="text-xl font-bold text-brand-dark mb-3">Cultural Experience</h3>
          <p className="text-gray-600">
            Not just grammar! We will talk about table etiquette, K-Drama slang, and modern culture.
          </p>
        </div>
      </div>
    </Section>
  )
}
