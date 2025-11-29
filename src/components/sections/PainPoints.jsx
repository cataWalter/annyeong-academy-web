"use client";
import Section from '../ui/Section'
import { Tv, Music, Frown, ArrowDown } from 'lucide-react'

export default function PainPoints() {
  const scrollToForm = () => {
    document.getElementById('registration').scrollIntoView({ behavior: 'smooth' });
  };

  const cards = [
    {
      icon: <Tv size={40} className="text-brand-purple" />,
      title: "The Subtitle Addict",
      text: "Do you love K-dramas but hate constantly reading subtitles, missing the actors' expressions? Do you want to finally understand the nuances that get lost in translation?"
    },
    {
      icon: <Music size={40} className="text-brand-teal" />,
      title: "The Music Lover",
      text: "Is your playlist full of BTS or Stray Kids songs? Do you want to understand what they are singing about, write them a fan letter, or ask them a question they can actually understand?"
    },
    {
      icon: <Frown size={40} className="text-plum-500" />,
      title: "The Hesitant Beginner",
      text: "Do you think you have no talent for languages? Did you struggle with languages in school and fear Korean will be the same? With us, that’s no longer an obstacle!"
    }
  ];

  return (
    <Section className="bg-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gradient-brand">Does this feeling sound familiar?</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {cards.map((card, idx) => (
          <div key={idx} className="bg-gray-50 rounded-3xl p-8 hover:shadow-xl transition duration-300 border border-transparent hover:border-brand-purple/20">
            <div className="bg-white w-20 h-20 rounded-2xl flex items-center justify-center shadow-sm mb-6 mx-auto">
              {card.icon}
            </div>
            <h3 className="text-xl font-bold text-brand-dark mb-4 text-center">{card.title}</h3>
            <p className="text-gray-600 leading-relaxed text-center">{card.text}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <button 
          onClick={scrollToForm}
          className="btn btn-plum-gradient gap-2 px-10 py-4"
        >
          I need this! <ArrowDown size={20} />
        </button>
      </div>
    </Section>
  )
}
