"use client";
import Section from '../ui/Section'

export default function Agenda() {
  return (
    <Section className="bg-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-brand-dark">What awaits you at the free event?</h2>
      </div>

      <div className="max-w-4xl mx-auto space-y-8 relative before:absolute before:left-4 md:before:left-1/2 before:top-2 before:h-full before:w-0.5 before:bg-gray-200 before:-translate-x-1/2">
        
        {/* Item 1 */}
        <div className="relative flex flex-col md:flex-row gap-8 items-center">
          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 bg-brand-purple border-4 border-white rounded-full z-10 shadow-sm"></div>
          <div className="md:w-1/2 md:text-right md:pr-12 pl-12 md:pl-0">
            <span className="inline-block bg-purple-100 text-brand-purple text-xs font-bold px-3 py-1 rounded-full mb-2">Intro</span>
            <h3 className="text-xl font-bold text-brand-dark">🇰🇷 Exclusive Cultural Insight</h3>
            <p className="text-gray-600 mt-2 text-sm italic">What are Koreans like in real life vs. how we see them in K-dramas and K-pop?</p>
          </div>
          <div className="md:w-1/2 pl-12 md:pl-12">
            <div className="bg-gray-50 p-6 rounded-2xl text-sm text-gray-600 border border-gray-100">
              <p className="mb-2">We’ll look at how drama romance differs from Seoul’s reality:</p>
              <ul className="list-disc ml-4 space-y-1">
                <li>The "Oppa" Myth: Are Korean men really romantic?</li>
                <li>Hierarchy & Respect: Age vs. Rank.</li>
                <li>Seoul by Night: The truth about <i>hoesik</i> culture.</li>
                <li>Chaebols & Plastic Surgery: Fact vs. Fiction.</li>
                <li>How exaggerated is the K-pop world?</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Item 2 */}
        <div className="relative flex flex-col md:flex-row-reverse gap-8 items-center">
          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 bg-brand-blue border-4 border-white rounded-full z-10 shadow-sm"></div>
          <div className="md:w-1/2 md:text-left md:pl-12 pl-12">
            <span className="inline-block bg-blue-100 text-brand-blue text-xs font-bold px-3 py-1 rounded-full mb-2">Tutors</span>
            <h3 className="text-xl font-bold text-brand-dark">👋 Meet the Tutors</h3>
            <p className="text-gray-600 mt-2 text-sm">Meet your future mentors who bring the lively, bubbling reality of Korea to you instead of textbook examples.</p>
          </div>
          <div className="md:w-1/2 md:pr-12 pl-12 md:pl-0"></div>
        </div>

        {/* Item 3 */}
        <div className="relative flex flex-col md:flex-row gap-8 items-center">
          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 bg-orange-500 border-4 border-white rounded-full z-10 shadow-sm"></div>
          <div className="md:w-1/2 md:text-right md:pr-12 pl-12 md:pl-0">
            <span className="inline-block bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full mb-2">Lesson</span>
            <h3 className="text-xl font-bold text-brand-dark">🎓 AI-Assisted Trial Lesson</h3>
            <p className="text-gray-600 mt-2 text-sm">Let's learn the first 5 most important phrases together! Test the translation system live.</p>
          </div>
          <div className="md:w-1/2 pl-12 md:pl-12"></div>
        </div>

        {/* Item 4 */}
        <div className="relative flex flex-col md:flex-row-reverse gap-8 items-center">
          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 bg-green-500 border-4 border-white rounded-full z-10 shadow-sm"></div>
          <div className="md:w-1/2 md:text-left md:pl-12 pl-12">
            <span className="inline-block bg-green-100 text-green-600 text-xs font-bold px-3 py-1 rounded-full mb-2">Bonus</span>
            <h3 className="text-xl font-bold text-brand-dark">🎁 Special Offer</h3>
            <p className="text-gray-600 mt-2 text-sm">A surprise reserved only for live participants!</p>
          </div>
          <div className="md:w-1/2 md:pr-12 pl-12 md:pl-0"></div>
        </div>

      </div>
    </Section>
  )
}
