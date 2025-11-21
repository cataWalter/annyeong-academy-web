import Section from '../ui/Section'
import { Quote } from 'lucide-react'

export default function Testimonials() {
  return (
    <Section className="bg-[#F8F9FC]">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-brand-dark">What students say?</h2>
      </div>
      
      <div className="flex flex-wrap justify-center gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm max-w-md flex-1 min-w-[300px]">
          <Quote className="w-8 h-8 text-brand-purple mb-4 opacity-20" />
          <p className="text-gray-600 italic mb-6 text-lg">
            "I was afraid I wouldn't understand anything, but with the subtitles I felt immediately comfortable! It was incredible."
          </p>
          <div className="font-bold text-brand-dark border-l-4 border-brand-purple pl-3">
            - Esther, K-Drama Fan
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm max-w-md flex-1 min-w-[300px]">
          <Quote className="w-8 h-8 text-brand-blue mb-4 opacity-20" />
          <p className="text-gray-600 italic mb-6 text-lg">
            "Finally I don't have to learn English to study Korean! This method is a lifesaver. The teachers are super funny."
          </p>
          <div className="font-bold text-brand-dark border-l-4 border-brand-blue pl-3">
            - David, Absolute Beginner
          </div>
        </div>
      </div>
    </Section>
  )
}
