"use client";
import Section from '../ui/Section'
import { Quote } from 'lucide-react'

export default function Testimonials() {
  return (
    <Section className="bg-[#F8F9FC]">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-brand-dark">Social Proof</h2>
      </div>
      
      <div className="flex flex-wrap justify-center gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md flex-1 min-w-[300px] relative">
          <Quote className="w-10 h-10 text-brand-purple absolute top-6 left-6 opacity-20" />
          <p className="text-gray-700 italic mb-6 text-lg relative z-10 pt-4">
            "Finally, I don't need to be fluent in English to learn Korean! This technology is incredible."
          </p>
          <div className="font-bold text-brand-dark border-l-4 border-brand-purple pl-3">
            – Susie
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md flex-1 min-w-[300px] relative">
          <Quote className="w-10 h-10 text-brand-blue absolute top-6 left-6 opacity-20" />
          <p className="text-gray-700 italic mb-6 text-lg relative z-10 pt-4">
            "I love that the teacher connects live from Seoul. It feels like I'm actually there."
          </p>
          <div className="font-bold text-brand-dark border-l-4 border-brand-blue pl-3">
            – Esther
          </div>
        </div>
      </div>
    </Section>
  )
}
