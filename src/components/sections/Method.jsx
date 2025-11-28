"use client";
import Section from '../ui/Section'
import { Clapperboard, MapPin, MessageCircle, Rocket } from 'lucide-react'

export default function Method() {
  const scrollToForm = () => {
    document.getElementById('registration').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Section className="bg-[#F8F9FC]">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">How does it work in practice?</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        {/* Item 1 */}
        <div className="flex gap-6 items-start">
          <div className="flex-shrink-0 w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-brand-purple">
            <Clapperboard size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-brand-dark mb-2">K-Culture instead of Textbooks</h3>
            <p className="text-gray-600 leading-relaxed">
              We don’t fill out boring worksheets! The curriculum is built on your favorite K-pop songs, K-drama scenes, and variety shows. Since your teacher is Korean and lives in Seoul, they bring you real daily life, the freshest slang, and vibrant culture, not dry theory.
            </p>
          </div>
        </div>

        {/* Item 2 */}
        <div className="flex gap-6 items-start">
          <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-brand-blue">
            <MapPin size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-brand-dark mb-2">Native Environment</h3>
            <p className="text-gray-600 leading-relaxed">
              Immerse yourself completely in the language! Your teacher speaks in Korean and explains concepts in English, ensuring you hear the purest, most authentic pronunciation from day one. You will pick up the natural rhythm and intonation.
            </p>
          </div>
        </div>

        {/* Item 3 */}
        <div className="flex gap-6 items-start">
          <div className="flex-shrink-0 w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
            <MessageCircle size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-brand-dark mb-2">Real-Time Translation</h3>
            <p className="text-gray-600 leading-relaxed">
              Don't worry about getting lost! Every explanation appears instantly on your screen as translated subtitles in real-time. It feels just like watching your favorite series with subs, bridging the gap between you and the teacher.
            </p>
          </div>
        </div>

        {/* Item 4 */}
        <div className="flex gap-6 items-start">
          <div className="flex-shrink-0 w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-500">
            <Rocket size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-brand-dark mb-2">Simple Technology</h3>
            <p className="text-gray-600 leading-relaxed">
              You don’t need to be a tech genius. Our smart platform runs smoothly in your web browser, handling the live connection and subtitles automatically. If you can click a link, you are ready to go!
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mt-16">
        <button 
          onClick={scrollToForm}
          className="bg-gradient-to-r from-brand-blue to-brand-purple text-white font-bold py-4 px-12 rounded-full shadow-lg hover:opacity-90 transition transform hover:scale-105"
        >
          Hwaiting, I'll be there!
        </button>
      </div>
    </Section>
  )
}
