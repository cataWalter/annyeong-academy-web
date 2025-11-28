"use client";
import Section from '../ui/Section'

export default function Teachers() {
  return (
    <Section className="bg-[#F8F9FC]">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">Who will you learn from?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Native teachers who currently live in Korea. They don't teach from a 10-year-old textbook but deliver the living language of today. Their mission is to share their love for their culture with you – without language barriers.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-12">
        <div className="bg-white p-0 rounded-3xl shadow-lg max-w-sm text-center overflow-hidden group">
          <div className="h-64 bg-gray-200 relative overflow-hidden">
             {/* Placeholder for Tutor 1 Image */}
             <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100">
               <span className="font-bold">Image Placeholder</span>
             </div>
          </div>
          <div className="p-8">
            <h3 className="text-2xl font-bold text-brand-dark mb-2">Tutor 1</h3>
            <p className="text-gray-600 italic">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>

        <div className="bg-white p-0 rounded-3xl shadow-lg max-w-sm text-center overflow-hidden group">
          <div className="h-64 bg-gray-200 relative overflow-hidden">
             {/* Placeholder for Tutor 2 Image */}
             <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100">
               <span className="font-bold">Image Placeholder</span>
             </div>
          </div>
          <div className="p-8">
            <h3 className="text-2xl font-bold text-brand-dark mb-2">Tutor 2</h3>
            <p className="text-gray-600 italic">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}
